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

/**
 * Extends the default registry with custom components
 * Use this to add your own design system components while keeping all built-in components
 *
 * @example
 * ```tsx
 * import { extendRegistry } from '@sdui/react';
 * import { MyButton, MyCard } from './my-design-system';
 *
 * const myRegistry = extendRegistry({
 *   MyButton,
 *   MyCard,
 * });
 *
 * <StreamingUIRenderer node={node} context={{ registry: myRegistry }} />
 * ```
 */
export function extendRegistry(
  customComponents: ComponentRegistry
): ComponentRegistry {
  return {
    ...defaultRegistry,
    ...customComponents,
  };
}

/**
 * Creates a completely new registry with only the components you provide
 * Use this when you want full control and don't need the built-in components
 *
 * @example
 * ```tsx
 * import { createComponentRegistry } from '@sdui/react';
 * import * as MyDesignSystem from './my-design-system';
 *
 * const myRegistry = createComponentRegistry({
 *   Button: MyDesignSystem.Button,
 *   Card: MyDesignSystem.Card,
 *   Input: MyDesignSystem.Input,
 *   // Add only the components you need
 * });
 *
 * <StreamingUIRenderer node={node} context={{ registry: myRegistry }} />
 * ```
 */
export function createComponentRegistry(
  components: ComponentRegistry
): ComponentRegistry {
  return { ...components };
}
