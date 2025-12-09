import React from 'react';
import { cn } from '../utils';
import type { AppBarProps } from '@sdui/core';

/**
 * AppBar 컴포넌트
 * 상단 네비게이션 바
 */
export function AppBar({
  title,
  leading,
  actions,
  position = 'sticky',
  elevation = 1,
  className,
  children,
}: AppBarProps) {
  const elevationClass = {
    0: '',
    1: 'shadow-sm',
    2: 'shadow-md',
    3: 'shadow-lg',
  }[elevation] || 'shadow-sm';

  return (
    <header
      className={cn(
        'w-full bg-background border-b',
        position === 'fixed' && 'fixed top-0 left-0 right-0 z-50',
        position === 'sticky' && 'sticky top-0 z-40',
        elevationClass,
        className
      )}
    >
      <div className="flex items-center justify-between h-12 md:h-16 px-3 md:px-6">
        {/* Leading (왼쪽) */}
        {leading && <div className="flex items-center shrink-0">{leading}</div>}

        {/* Title (중앙) */}
        <div className="flex-1 flex items-center justify-center px-2 md:px-4 min-w-0">
          {typeof title === 'string' ? (
            <h1 className="text-sm md:text-lg font-semibold truncate">{title}</h1>
          ) : (
            title
          )}
        </div>

        {/* Actions (오른쪽) */}
        {actions && <div className="flex items-center gap-1 md:gap-2 shrink-0">{actions}</div>}
      </div>

      {/* 추가 커스텀 컨텐츠 */}
      {children}
    </header>
  );
}
