import React from 'react';
import { cn } from '@/lib/utils';
import type { StackProps, ZStackProps } from '@/lib/sdui/types';

/**
 * VStack 컴포넌트
 * 자식을 세로로 배치
 */
export function VStack({
  spacing = 0,
  alignment = 'stretch',
  justify = 'start',
  wrap = false,
  className,
  children,
}: StackProps) {
  const spacingValue = typeof spacing === 'number' ? `${spacing * 0.25}rem` : spacing;

  const alignmentClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }[alignment];

  const justifyClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    'space-between': 'justify-between',
    'space-around': 'justify-around',
    'space-evenly': 'justify-evenly',
  }[justify];

  return (
    <div
      className={cn(
        'flex flex-col',
        alignmentClass,
        justifyClass,
        wrap && 'flex-wrap',
        className
      )}
      style={{
        gap: spacingValue,
      }}
    >
      {children}
    </div>
  );
}

/**
 * HStack 컴포넌트
 * 자식을 가로로 배치
 */
export function HStack({
  spacing = 0,
  alignment = 'stretch',
  justify = 'start',
  wrap = false,
  className,
  children,
}: StackProps) {
  const spacingValue = typeof spacing === 'number' ? `${spacing * 0.25}rem` : spacing;

  const alignmentClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }[alignment];

  const justifyClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    'space-between': 'justify-between',
    'space-around': 'justify-around',
    'space-evenly': 'justify-evenly',
  }[justify];

  return (
    <div
      className={cn(
        'flex flex-row',
        alignmentClass,
        justifyClass,
        wrap && 'flex-wrap',
        className
      )}
      style={{
        gap: spacingValue,
      }}
    >
      {children}
    </div>
  );
}

/**
 * ZStack 컴포넌트
 * 자식을 겹쳐서 배치 (position: relative/absolute)
 */
export function ZStack({
  alignment = 'center',
  className,
  children,
}: ZStackProps) {
  const alignmentClasses = {
    topLeft: 'items-start justify-start',
    topCenter: 'items-start justify-center',
    topRight: 'items-start justify-end',
    centerLeft: 'items-center justify-start',
    center: 'items-center justify-center',
    centerRight: 'items-center justify-end',
    bottomLeft: 'items-end justify-start',
    bottomCenter: 'items-end justify-center',
    bottomRight: 'items-end justify-end',
  }[alignment];

  return (
    <div className={cn('relative', className)}>
      <div className={cn('absolute inset-0 flex', alignmentClasses)}>
        {children}
      </div>
    </div>
  );
}
