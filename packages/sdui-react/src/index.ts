/**
 * @sdui/react - React Components for Server-Driven UI
 * React components and renderers for server-driven UI
 */

// Re-export types from core
export type {
  UINode,
  StreamAction,
  StreamEvent,
  UISchema,
  ComponentRegistry,
  RenderContext,
  ActionHandler,
  StreamingStatus,
  ComponentType,
  ContainerType,
  PrimitiveType,
  HTMLElementType,
  BaseContainerProps,
  ScreenProps,
  AppBarProps,
  StackProps,
  ZStackProps,
  ScrollViewProps,
  GridProps,
  ContainerProps,
  SafeAreaProps,
} from '@sdui/core';

// Re-export hooks from core
export { useStreamingUI } from '@sdui/core';
export type { UseStreamingUIOptions, UseStreamingUIReturn } from '@sdui/core';

// Main Renderer Component
export { StreamingUIRenderer } from './StreamingUIRenderer';

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
} from './containers';

// Component Registries
export { containerRegistry } from './container-registry';
export { primitiveRegistry } from './primitive-registry';
export { htmlRegistry } from './html-registry';

// Create full default registry with all components
import { containerRegistry } from './container-registry';
import { primitiveRegistry } from './primitive-registry';
import { htmlRegistry } from './html-registry';
import type { ComponentRegistry } from '@sdui/core';

export const defaultRegistry: ComponentRegistry = {
  ...containerRegistry,
  ...primitiveRegistry,
  ...htmlRegistry,
};

// Registry utility functions
export function hasComponent(
  type: string,
  registry: ComponentRegistry = defaultRegistry
): boolean {
  return type in registry;
}

export function getComponent(
  type: string,
  registry: ComponentRegistry = defaultRegistry
) {
  return registry[type];
}

export function extendRegistry(
  customComponents: ComponentRegistry
): ComponentRegistry {
  return {
    ...defaultRegistry,
    ...customComponents,
  };
}
