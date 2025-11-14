/**
 * Server-Driven UI Library
 * shadcn/ui 컴포넌트를 활용한 스트리밍 서버드리븐 UI
 */

// Types
export type {
  UINode,
  StreamAction,
  StreamEvent,
  UISchema,
  ComponentRegistry,
  RenderContext,
  ActionHandler,
  Condition,
  StreamingStatus,
  // Component Categories
  ComponentCategory,
  ContainerType,
  PrimitiveType,
  HTMLElementType,
  ComponentType,
  // Container Props
  BaseContainerProps,
  ScreenProps,
  AppBarProps,
  StackProps,
  ZStackProps,
  ScrollViewProps,
  GridProps,
  ContainerProps,
  SafeAreaProps,
} from './types';

// Hooks
export { useStreamingUI } from './hooks/useStreamingUI';
export type { UseStreamingUIOptions, UseStreamingUIReturn } from './hooks/useStreamingUI';

// Components
export { StreamingUIRenderer } from '@/components/sdui/StreamingUIRenderer';

// Container Components
export {
  Screen,
  AppBar,
  VStack,
  HStack,
  ZStack,
  ScrollView,
  Grid,
  Container,
  SafeArea,
} from '@/components/sdui/containers';

// Parsers
export {
  StreamingJSONParser,
  JSONLinesParser,
  SSEParser,
  createParser,
} from './streaming-parser';

// Component Registry
export {
  defaultRegistry,
  extendRegistry,
  hasComponent,
  getComponent,
  getComponentCategory,
  createRegistry,
  containerRegistry,
  primitiveRegistry,
  htmlRegistry,
} from './registry';
