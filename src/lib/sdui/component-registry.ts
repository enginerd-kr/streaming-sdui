import type { ComponentRegistry } from './types';

// shadcn/ui 컴포넌트 임포트
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * 기본 HTML 요소를 위한 래퍼 컴포넌트
 */
const HTMLComponents = {
  div: 'div',
  span: 'span',
  p: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  a: 'a',
  img: 'img',
  ul: 'ul',
  ol: 'ol',
  li: 'li',
  section: 'section',
  article: 'article',
  header: 'header',
  footer: 'footer',
  main: 'main',
  nav: 'nav',
} as const;

/**
 * 기본 컴포넌트 레지스트리
 * shadcn/ui 컴포넌트와 HTML 요소를 매핑
 */
export const defaultRegistry: ComponentRegistry = {
  // shadcn/ui 컴포넌트
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,

  // HTML 요소
  ...HTMLComponents,
} as any;

/**
 * 커스텀 컴포넌트를 레지스트리에 추가
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
 * 컴포넌트 타입이 레지스트리에 존재하는지 확인
 */
export function hasComponent(type: string, registry: ComponentRegistry = defaultRegistry): boolean {
  return type in registry;
}

/**
 * 레지스트리에서 컴포넌트 가져오기
 */
export function getComponent(type: string, registry: ComponentRegistry = defaultRegistry) {
  return registry[type];
}
