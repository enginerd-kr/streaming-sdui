import React from 'react';
import { cn } from '@/lib/utils';
import type { SafeAreaProps } from '@/lib/sdui/types';

/**
 * SafeArea 컴포넌트
 * 노치, 하단 바 등을 고려한 안전 영역
 */
export function SafeArea({
  edges = ['top', 'bottom', 'left', 'right'],
  className,
  children,
}: SafeAreaProps) {
  const safeAreaClasses = edges.map(edge => {
    switch (edge) {
      case 'top':
        return 'pt-safe';
      case 'bottom':
        return 'pb-safe';
      case 'left':
        return 'pl-safe';
      case 'right':
        return 'pr-safe';
      default:
        return '';
    }
  }).filter(Boolean);

  return (
    <div className={cn(...safeAreaClasses, className)}>
      {children}
    </div>
  );
}
