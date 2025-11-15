import React from 'react';
import { cn } from '../utils';
import type { ScrollViewProps } from '@sdui/core';

/**
 * ScrollView 컴포넌트
 * 스크롤 가능한 컨테이너
 */
export function ScrollView({
  direction = 'vertical',
  showScrollbar = true,
  onScroll,
  className,
  children,
}: ScrollViewProps) {
  const overflowClass = {
    vertical: 'overflow-y-auto overflow-x-hidden',
    horizontal: 'overflow-x-auto overflow-y-hidden',
    both: 'overflow-auto',
  }[direction];

  return (
    <div
      className={cn(
        overflowClass,
        !showScrollbar && 'scrollbar-hide',
        className
      )}
      onScroll={onScroll}
    >
      {children}
    </div>
  );
}
