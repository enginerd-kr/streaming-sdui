// 서버 컴포넌트용 메타데이터 (정적 데이터만 복사)
// @sdui/core에서 직접 import하면 'use client' 충돌이 발생하므로
// generateStaticParams에서 사용할 수 있도록 여기에 정적 데이터를 복사

export const componentNames = [
  // Container Components
  'Screen',
  'AppBar',
  'VStack',
  'HStack',
  'ZStack',
  'ScrollView',
  'Grid',
  'Container',
  'SafeArea',
  // Primitive Components
  'Button',
  'Input',
  'Label',
  'Card',
  'Tabs',
  'Skeleton',
  // HTML Components
  'div',
  'h1',
  'p',
  'a',
  'img',
] as const;

export type ComponentName = (typeof componentNames)[number];
