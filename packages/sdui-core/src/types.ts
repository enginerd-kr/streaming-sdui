/**
 * 서버드리븐 UI 핵심 타입 정의
 */

// ============================================
// 컴포넌트 분류 시스템
// ============================================

/**
 * 컴포넌트 카테고리
 * - container: 레이아웃과 구조를 담당하는 컴포넌트
 * - primitive: shadcn/ui 기반의 UI 요소
 * - html: 기본 HTML 요소
 */
export type ComponentCategory = 'container' | 'primitive' | 'html';

/**
 * Container 컴포넌트 타입
 * 화면의 레이아웃과 구조를 담당
 */
export type ContainerType =
  | 'Screen'
  | 'AppBar'
  | 'VStack'
  | 'HStack'
  | 'ZStack'
  | 'ScrollView'
  | 'Grid'
  | 'Container'
  | 'SafeArea';

/**
 * Primitive 컴포넌트 타입
 * shadcn/ui 컴포넌트
 */
export type PrimitiveType =
  | 'Button'
  | 'Input'
  | 'Label'
  | 'Card'
  | 'CardHeader'
  | 'CardContent'
  | 'CardFooter'
  | 'CardTitle'
  | 'CardDescription'
  | 'Tabs'
  | 'TabsList'
  | 'TabsTrigger'
  | 'TabsContent'
  | 'Skeleton';

/**
 * HTML 요소 타입
 */
export type HTMLElementType =
  | 'div'
  | 'span'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'a'
  | 'img'
  | 'ul'
  | 'ol'
  | 'li'
  | 'section'
  | 'article'
  | 'header'
  | 'footer'
  | 'main'
  | 'nav';

/**
 * 통합 컴포넌트 타입
 */
export type ComponentType = ContainerType | PrimitiveType | HTMLElementType;

// ============================================
// 스트리밍 시스템
// ============================================

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

// ============================================
// Container 컴포넌트 Props 타입
// ============================================

/**
 * 공통 Container Props
 */
export interface BaseContainerProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Screen Props
 * 화면 전체를 담는 최상위 컨테이너
 */
export interface ScreenProps extends BaseContainerProps {
  /** 배경색 */
  backgroundColor?: string;
  /** SafeArea 적용 여부 */
  safeArea?: boolean;
  /** 스크롤 가능 여부 */
  scrollable?: boolean;
  /** 패딩 */
  padding?: number | string;
}

/**
 * AppBar Props
 * 상단 네비게이션 바
 */
export interface AppBarProps extends BaseContainerProps {
  /** 타이틀 */
  title?: string | React.ReactNode;
  /** 왼쪽 버튼 (보통 뒤로가기) */
  leading?: React.ReactNode;
  /** 오른쪽 액션들 */
  actions?: React.ReactNode;
  /** 위치 고정 방식 */
  position?: 'fixed' | 'sticky' | 'static';
  /** 그림자 깊이 */
  elevation?: number;
}

/**
 * Stack Props (VStack, HStack 공통)
 */
export interface StackProps extends BaseContainerProps {
  /** 자식 간 간격 */
  spacing?: number | string;
  /** 정렬 방향 */
  alignment?: 'start' | 'center' | 'end' | 'stretch';
  /** justify-content */
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  /** wrap 여부 */
  wrap?: boolean;
}

/**
 * ZStack Props
 * 자식을 겹쳐서 배치
 */
export interface ZStackProps extends BaseContainerProps {
  /** 정렬 위치 */
  alignment?:
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'centerLeft'
    | 'center'
    | 'centerRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight';
}

/**
 * ScrollView Props
 */
export interface ScrollViewProps extends BaseContainerProps {
  /** 스크롤 방향 */
  direction?: 'vertical' | 'horizontal' | 'both';
  /** 스크롤바 표시 여부 */
  showScrollbar?: boolean;
  /** 스크롤 이벤트 핸들러 */
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
}

/**
 * Grid Props
 */
export interface GridProps extends BaseContainerProps {
  /** 컬럼 수 또는 템플릿 */
  columns?: number | string;
  /** 로우 수 또는 템플릿 */
  rows?: number | string;
  /** 간격 */
  gap?: number | string;
  /** 반응형 설정 */
  responsive?: {
    sm?: Partial<GridProps>;
    md?: Partial<GridProps>;
    lg?: Partial<GridProps>;
    xl?: Partial<GridProps>;
  };
}

/**
 * Container Props
 * 최대 너비를 제한하고 중앙 정렬
 */
export interface ContainerProps extends BaseContainerProps {
  /** 최대 너비 */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | number;
  /** 중앙 정렬 여부 */
  center?: boolean;
  /** 패딩 */
  padding?: number | string;
}

/**
 * SafeArea Props
 */
export interface SafeAreaProps extends BaseContainerProps {
  /** 적용할 엣지 */
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}
