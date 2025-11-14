import React from 'react';
import { cn } from '@/lib/utils';
import type { ContainerProps } from '@/lib/sdui/types';

/**
 * Container 컴포넌트
 * 최대 너비를 제한하고 중앙 정렬하는 컨테이너
 */
export function Container({
  maxWidth = 'lg',
  center = true,
  padding,
  className,
  children,
}: ContainerProps) {
  const maxWidthClass = typeof maxWidth === 'string' ? {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  }[maxWidth] : '';

  const paddingValue = typeof padding === 'number' ? `${padding * 0.25}rem` : padding;

  return (
    <div
      className={cn(
        'w-full',
        maxWidthClass,
        center && 'mx-auto',
        className
      )}
      style={{
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : undefined,
        padding: paddingValue,
      }}
    >
      {children}
    </div>
  );
}
