import React from 'react';
import { cn } from '@/lib/utils';
import type { ScreenProps } from '@/lib/sdui/types';

/**
 * Screen 컴포넌트
 * 화면 전체를 담는 최상위 컨테이너
 */
export function Screen({
  backgroundColor,
  safeArea = true,
  scrollable = false,
  padding,
  className,
  children,
}: ScreenProps) {
  const paddingValue = typeof padding === 'number' ? `${padding}px` : padding;

  return (
    <div
      className={cn(
        'min-h-screen w-full',
        safeArea && 'safe-area',
        scrollable ? 'overflow-auto' : 'overflow-hidden',
        className
      )}
      style={{
        backgroundColor,
        padding: paddingValue,
      }}
    >
      {children}
    </div>
  );
}
