'use client';

import React from 'react';
import type { UINode, RenderContext } from '@/lib/sdui/types';
import { defaultRegistry, getComponent, hasComponent } from '@/lib/sdui/component-registry';

interface StreamingUIRendererProps {
  node: UINode | null;
  context?: Partial<RenderContext>;
}

/**
 * 서버드리븐 UI를 동적으로 렌더링하는 컴포넌트
 * LLM이 생성한 UI JSON을 실제 React 컴포넌트로 변환
 */
export function StreamingUIRenderer({
  node,
  context,
}: StreamingUIRendererProps) {
  if (!node) {
    return null;
  }

  const registry = context?.registry || defaultRegistry;

  // 스트리밍 상태에 따른 처리
  if (node.streaming?.status === 'pending') {
    // pending 상태: 아무것도 렌더링하지 않음
    // replace 액션으로 실제 컴포넌트가 한 번에 나타남
    return null;
  }

  if (node.streaming?.status === 'error') {
    return (
      <div className="rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
        <p className="font-semibold">Error</p>
        <p className="text-sm">{node.streaming.error || 'An error occurred while loading this component'}</p>
      </div>
    );
  }

  // 조건부 렌더링 처리
  if (node.condition && context?.state) {
    const shouldRender = evaluateCondition(node.condition, context.state);
    if (!shouldRender) {
      return null;
    }
  }

  // 컴포넌트 타입 확인
  if (!hasComponent(node.type, registry)) {
    console.warn(`Component type "${node.type}" not found in registry`);
    return (
      <div className="rounded-md border border-yellow-500 bg-yellow-50 p-2 text-yellow-900">
        Unknown component: {node.type}
      </div>
    );
  }

  const Component = getComponent(node.type, registry);

  // Props 처리
  const props = processProps(node.props, node.actions, context);

  // 자식 요소 렌더링
  const children = renderChildren(node.children, context);

  const finalProps = {
    ...props,
  };

  return <Component {...finalProps}>{children}</Component>;
}

/**
 * 자식 노드 렌더링
 */
function renderChildren(
  children: UINode['children'],
  context?: Partial<RenderContext>
): React.ReactNode {
  if (!children || children.length === 0) {
    return null;
  }

  return children.map((child, index) => {
    if (typeof child === 'string') {
      return child;
    }

    return (
      <StreamingUIRenderer
        key={child.id || `child-${index}`}
        node={child}
        context={context}
      />
    );
  });
}

/**
 * Props 처리 및 액션 핸들러 바인딩
 */
function processProps(
  props: UINode['props'],
  actions: UINode['actions'],
  context?: Partial<RenderContext>
): Record<string, any> {
  if (!props) {
    return {};
  }

  const processedProps = { ...props };

  // 액션 핸들러 바인딩
  if (actions && context?.executeAction) {
    Object.entries(actions).forEach(([eventName, actionHandler]) => {
      processedProps[eventName] = async (event?: any) => {
        // 기본 이벤트 방지 (폼 제출 등)
        if (event?.preventDefault) {
          event.preventDefault();
        }

        try {
          await context.executeAction!(actionHandler.type, actionHandler.payload);
        } catch (error) {
          console.error('Action execution failed:', error);
        }
      };
    });
  }

  return processedProps;
}

/**
 * 조건 평가
 */
function evaluateCondition(
  condition: NonNullable<UINode['condition']>,
  state: Record<string, any>
): boolean {
  const fieldValue = getNestedValue(state, condition.field);

  switch (condition.operator) {
    case 'equals':
      return fieldValue === condition.value;
    case 'not_equals':
      return fieldValue !== condition.value;
    case 'greater_than':
      return fieldValue > condition.value;
    case 'less_than':
      return fieldValue < condition.value;
    case 'contains':
      if (Array.isArray(fieldValue)) {
        return fieldValue.includes(condition.value);
      }
      if (typeof fieldValue === 'string') {
        return fieldValue.includes(condition.value);
      }
      return false;
    case 'exists':
      return fieldValue !== undefined && fieldValue !== null;
    default:
      return true;
  }
}

/**
 * 중첩된 객체에서 값 가져오기
 */
function getNestedValue(obj: Record<string, any>, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}
