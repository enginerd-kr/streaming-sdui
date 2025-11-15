/**
 * HTML 기본 요소 레지스트리
 * 표준 HTML 태그들
 */

import type { ComponentRegistry } from '@sdui/core';

/**
 * HTML 기본 요소 레지스트리
 */
export const htmlRegistry: Record<string, any> = {
  // Text Elements
  div: 'div',
  span: 'span',
  p: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',

  // List Elements
  ul: 'ul',
  ol: 'ol',
  li: 'li',

  // Form Elements
  form: 'form',
  input: 'input',
  button: 'button',
  label: 'label',
  textarea: 'textarea',
  select: 'select',
  option: 'option',

  // Semantic Elements
  header: 'header',
  footer: 'footer',
  nav: 'nav',
  main: 'main',
  section: 'section',
  article: 'article',
  aside: 'aside',

  // Media Elements
  img: 'img',
  video: 'video',
  audio: 'audio',

  // Other Elements
  a: 'a',
  br: 'br',
  hr: 'hr',
  strong: 'strong',
  em: 'em',
  code: 'code',
  pre: 'pre',
};
