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
} from './types';

// Hooks
export { useStreamingUI } from './hooks/useStreamingUI';
export type { UseStreamingUIOptions, UseStreamingUIReturn } from './hooks/useStreamingUI';

// Components
export { StreamingUIRenderer } from '@/components/sdui/StreamingUIRenderer';

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
} from './component-registry';
