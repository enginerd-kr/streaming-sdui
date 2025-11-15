/**
 * @sdui/core - Server-Driven UI Core Library
 * Core types, parsers, hooks, and registry for server-driven UI
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

// Parsers (New Multi-Format Architecture)
export {
  createParser,
  detectFormat,
  getContentType,
  // Base Interface
  type IStreamParser,
  type ParserMetadata,
  type ParserFormat,
  // JSON Parsers
  StreamingJSONParser,
  JSONLinesParser,
  SSEParser,
  // DSL Parser
  DSLParser,
} from './parsers';

// Legacy Parser (Deprecated - use parsers/ instead)
export {
  StreamingJSONParser as LegacyStreamingJSONParser,
  JSONLinesParser as LegacyJSONLinesParser,
  SSEParser as LegacySSEParser,
} from './streaming-parser';

// Component Metadata
export {
  componentMetadata,
  getComponentsByCategory,
  getAllComponentNames,
  searchComponents,
} from './component-metadata';

export type {
  ComponentMetadata,
  PropDefinition,
  ComponentExample,
} from './component-metadata';
