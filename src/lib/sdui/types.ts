/**
 * 서버드리븐 UI 핵심 타입 정의
 */

/**
 * 스트리밍 상태
 */
export type StreamingStatus = 'pending' | 'streaming' | 'complete' | 'error';

/**
 * UI 노드의 기본 구조
 */
export interface UINode {
  /** 고유 식별자 (스트리밍 업데이트 추적용) */
  id: string;

  /** shadcn/ui 컴포넌트 타입 (예: "Button", "Card", "Input") */
  type: string;

  /** 컴포넌트 props */
  props?: Record<string, any>;

  /** 자식 노드 또는 텍스트 */
  children?: (UINode | string)[];

  /** 스트리밍 관련 메타데이터 */
  streaming?: {
    status: StreamingStatus;
    placeholder?: UINode;
    error?: string;
  };

  /** 액션 핸들러 */
  actions?: Record<string, ActionHandler>;

  /** 조건부 렌더링 */
  condition?: Condition;
}

/**
 * 액션 핸들러 정의
 */
export interface ActionHandler {
  /** 액션 타입 */
  type: 'submit' | 'navigate' | 'api_call' | 'custom';

  /** 액션 페이로드 */
  payload?: Record<string, any>;

  /** 서버 엔드포인트 (api_call인 경우) */
  endpoint?: string;

  /** HTTP 메서드 */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

/**
 * 조건부 렌더링 조건
 */
export interface Condition {
  /** 비교할 필드 경로 (예: "user.role") */
  field: string;

  /** 비교 연산자 */
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'exists';

  /** 비교 값 */
  value?: any;
}

/**
 * 스트리밍 액션
 */
export type StreamAction =
  | { action: 'create'; component: UINode }
  | { action: 'append'; parentId: string; component: UINode }
  | { action: 'update'; componentId: string; updates: Partial<UINode> }
  | { action: 'replace'; componentId: string; component: UINode }
  | { action: 'remove'; componentId: string }
  | { action: 'complete'; componentId?: string }
  | { action: 'error'; componentId?: string; error: string };

/**
 * 스트리밍 이벤트
 */
export interface StreamEvent {
  /** 이벤트 타입 */
  type: 'action' | 'data' | 'error' | 'done';

  /** 이벤트 데이터 */
  data: StreamAction | string | Error;

  /** 타임스탬프 */
  timestamp: number;
}

/**
 * UI 스키마 (서버에서 전송)
 */
export interface UISchema {
  /** 스키마 버전 */
  version: string;

  /** 페이지/컴포넌트 메타데이터 */
  metadata?: {
    title?: string;
    description?: string;
    [key: string]: any;
  };

  /** 루트 레이아웃 */
  layout: UINode;

  /** 전역 상태 */
  state?: Record<string, any>;

  /** 전역 액션 핸들러 */
  actions?: Record<string, ActionHandler>;
}

/**
 * 컴포넌트 레지스트리 타입
 */
export type ComponentRegistry = Record<string, React.ComponentType<any>>;

/**
 * 렌더 컨텍스트
 */
export interface RenderContext {
  /** 전역 상태 */
  state: Record<string, any>;

  /** 상태 업데이트 함수 */
  setState: (updates: Record<string, any>) => void;

  /** 액션 실행 함수 */
  executeAction: (actionId: string, payload?: any) => Promise<void>;

  /** 컴포넌트 레지스트리 */
  registry: ComponentRegistry;
}
