'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { UINode, StreamAction } from '../types';
import { createParser, type ParserFormat } from '../parsers';

export interface UseStreamingUIOptions {
  /** 스트리밍 형식 (json, jsonl, dsl, sse) */
  format?: ParserFormat;

  /** 자동 시작 여부 */
  autoStart?: boolean;

  /** 에러 핸들러 */
  onError?: (error: Error) => void;

  /** 완료 핸들러 */
  onComplete?: () => void;

  /** 스트리밍 시작 핸들러 */
  onStart?: () => void;
}

export interface UseStreamingUIReturn {
  /** 현재 UI 트리 */
  uiTree: UINode | null;

  /** 스트리밍 진행 중 여부 */
  isStreaming: boolean;

  /** 에러 */
  error: Error | null;

  /** 스트리밍 시작 */
  start: (endpoint: string, payload?: any) => Promise<void>;

  /** 스트리밍 중단 */
  stop: () => void;

  /** 초기화 */
  reset: () => void;
}

/**
 * LLM 스트리밍 UI를 처리하는 React Hook
 */
export function useStreamingUI(options: UseStreamingUIOptions = {}): UseStreamingUIReturn {
  const {
    format = 'jsonl',
    onError,
    onComplete,
    onStart,
  } = options;

  const [uiTree, setUITree] = useState<UINode | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const parserRef = useRef(createParser(format));

  /**
   * 스트리밍 시작
   */
  const start = useCallback(async (endpoint: string, payload?: any) => {
    try {
      setIsStreaming(true);
      setError(null);
      setUITree(null);
      parserRef.current.reset();

      onStart?.();

      // AbortController 생성
      abortControllerRef.current = new AbortController();

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...payload, format }), // 서버에 포맷 전달
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('ReadableStream not supported');
      }

      const decoder = new TextDecoder();

      // 스트림 읽기
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          setIsStreaming(false);
          onComplete?.();
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const actions = parserRef.current.append(chunk);

        // 파싱된 액션들을 순차적으로 처리
        for (const action of actions) {
          setUITree(prev => applyStreamAction(prev, action));
        }
      }
    } catch (err) {
      const error = err as Error;
      if (error.name !== 'AbortError') {
        setError(error);
        setIsStreaming(false);
        onError?.(error);
      }
    }
  }, [format, onError, onComplete, onStart]);

  /**
   * 스트리밍 중단
   */
  const stop = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsStreaming(false);
  }, []);

  /**
   * 초기화
   */
  const reset = useCallback(() => {
    stop();
    setUITree(null);
    setError(null);
    parserRef.current.reset();
  }, [stop]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return {
    uiTree,
    isStreaming,
    error,
    start,
    stop,
    reset,
  };
}

/**
 * 스트림 액션을 UI 트리에 적용
 */
function applyStreamAction(tree: UINode | null, action: StreamAction): UINode | null {
  switch (action.action) {
    case 'create':
      return action.component;

    case 'append':
      if (!tree) return tree;
      return appendToNode(tree, action.parentId, action.component);

    case 'update':
      if (!tree) return tree;
      return updateNode(tree, action.componentId, action.updates);

    case 'replace':
      if (!tree) return tree;
      return replaceNode(tree, action.componentId, action.component);

    case 'remove':
      if (!tree) return tree;
      return removeNode(tree, action.componentId);

    case 'complete':
      if (!tree) return tree;
      if (action.componentId) {
        return markComplete(tree, action.componentId);
      }
      return markComplete(tree, tree.id);

    case 'error':
      if (!tree) return tree;
      if (action.componentId) {
        return markError(tree, action.componentId, action.error);
      }
      return tree;

    default:
      return tree;
  }
}

/**
 * 노드에 자식 추가
 */
function appendToNode(tree: UINode, parentId: string, component: UINode): UINode {
  if (tree.id === parentId) {
    return {
      ...tree,
      children: [...(tree.children || []), component],
    };
  }

  if (tree.children && Array.isArray(tree.children)) {
    return {
      ...tree,
      children: tree.children.map(child =>
        typeof child === 'string' ? child : appendToNode(child, parentId, component)
      ),
    };
  }

  return tree;
}

/**
 * 노드 업데이트
 */
function updateNode(tree: UINode, nodeId: string, updates: Partial<UINode>): UINode {
  if (tree.id === nodeId) {
    return { ...tree, ...updates };
  }

  if (tree.children && Array.isArray(tree.children)) {
    return {
      ...tree,
      children: tree.children.map(child =>
        typeof child === 'string' ? child : updateNode(child, nodeId, updates)
      ),
    };
  }

  return tree;
}

/**
 * 노드 교체
 */
function replaceNode(tree: UINode, nodeId: string, component: UINode): UINode {
  if (tree.id === nodeId) {
    return component;
  }

  if (tree.children && Array.isArray(tree.children)) {
    return {
      ...tree,
      children: tree.children.map(child =>
        typeof child === 'string' ? child : replaceNode(child, nodeId, component)
      ),
    };
  }

  return tree;
}

/**
 * 노드 제거
 */
function removeNode(tree: UINode, nodeId: string): UINode {
  if (tree.children && Array.isArray(tree.children)) {
    return {
      ...tree,
      children: tree.children
        .filter(child => typeof child === 'string' || child.id !== nodeId)
        .map(child => (typeof child === 'string' ? child : removeNode(child, nodeId))),
    };
  }

  return tree;
}

/**
 * 노드를 완료 상태로 표시
 */
function markComplete(tree: UINode, nodeId: string): UINode {
  if (tree.id === nodeId) {
    return {
      ...tree,
      streaming: {
        ...tree.streaming,
        status: 'complete',
      },
    };
  }

  if (tree.children && Array.isArray(tree.children)) {
    return {
      ...tree,
      children: tree.children.map(child =>
        typeof child === 'string' ? child : markComplete(child, nodeId)
      ),
    };
  }

  return tree;
}

/**
 * 노드를 에러 상태로 표시
 */
function markError(tree: UINode, nodeId: string, error: string): UINode {
  if (tree.id === nodeId) {
    return {
      ...tree,
      streaming: {
        ...tree.streaming,
        status: 'error',
        error,
      },
    };
  }

  if (tree.children && Array.isArray(tree.children)) {
    return {
      ...tree,
      children: tree.children.map(child =>
        typeof child === 'string' ? child : markError(child, nodeId, error)
      ),
    };
  }

  return tree;
}
