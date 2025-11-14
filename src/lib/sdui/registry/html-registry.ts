/**
 * HTML 요소 레지스트리
 * 기본 HTML 요소들
 */

import type { ComponentRegistry } from '../types';

/**
 * HTML 요소 레지스트리
 * 기본 HTML 태그들을 문자열로 매핑
 */
export const htmlRegistry: ComponentRegistry = {
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
} as any;
