/**
 * 통합 컴포넌트 레지스트리
 * Container, Primitive, HTML 레지스트리를 통합
 */

import { containerRegistry } from './container-registry';
import { primitiveRegistry } from './primitive-registry';
import { htmlRegistry } from './html-registry';
import type { ComponentRegistry } from '../types';

/**
 * 기본 통합 레지스트리
 * 모든 컴포넌트 타입을 포함
 */
export const defaultRegistry: ComponentRegistry = {
  ...containerRegistry,
  ...primitiveRegistry,
  ...htmlRegistry,
};

/**
 * 커스텀 컴포넌트를 레지스트리에 추가
 *
 * @param customComponents 추가할 커스텀 컴포넌트
 * @returns 확장된 레지스트리
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
 * 특정 카테고리의 레지스트리만 가져오기
 *
 * @param categories 포함할 카테고리
 * @returns 선택된 카테고리의 레지스트리
 */
export function createRegistry(
  categories: ('container' | 'primitive' | 'html')[]
): ComponentRegistry {
  const registry: ComponentRegistry = {};

  if (categories.includes('container')) {
    Object.assign(registry, containerRegistry);
  }
  if (categories.includes('primitive')) {
    Object.assign(registry, primitiveRegistry);
  }
  if (categories.includes('html')) {
    Object.assign(registry, htmlRegistry);
  }

  return registry;
}

/**
 * 컴포넌트 타입이 레지스트리에 존재하는지 확인
 *
 * @param type 컴포넌트 타입
 * @param registry 확인할 레지스트리 (기본값: defaultRegistry)
 * @returns 존재 여부
 */
export function hasComponent(
  type: string,
  registry: ComponentRegistry = defaultRegistry
): boolean {
  return type in registry;
}

/**
 * 레지스트리에서 컴포넌트 가져오기
 *
 * @param type 컴포넌트 타입
 * @param registry 검색할 레지스트리 (기본값: defaultRegistry)
 * @returns 컴포넌트 또는 undefined
 */
export function getComponent(
  type: string,
  registry: ComponentRegistry = defaultRegistry
) {
  return registry[type];
}

/**
 * 컴포넌트가 어느 카테고리에 속하는지 확인
 *
 * @param type 컴포넌트 타입
 * @returns 카테고리 또는 undefined
 */
export function getComponentCategory(
  type: string
): 'container' | 'primitive' | 'html' | undefined {
  if (type in containerRegistry) return 'container';
  if (type in primitiveRegistry) return 'primitive';
  if (type in htmlRegistry) return 'html';
  return undefined;
}

// Export individual registries
export { containerRegistry } from './container-registry';
export { primitiveRegistry } from './primitive-registry';
export { htmlRegistry } from './html-registry';
