import React from 'react';
import { cn } from '../utils';
import type { StackProps, ZStackProps } from '@sdui/core';

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
 * 첫 번째 자식이 배경/기준이 되고, 나머지 자식들이 그 위에 겹쳐집니다.
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

  const childArray = React.Children.toArray(children);

  return (
    <div className={cn('relative', className)}>
      {/* 첫 번째 자식 - 배경/기준 레이어 */}
      {childArray[0]}

      {/* 나머지 자식들 - 오버레이 레이어들 */}
      {childArray.slice(1).map((child, index) => (
        <div
          key={index}
          className={cn('absolute inset-0 flex pointer-events-none', alignmentClasses)}
        >
          <div className="pointer-events-auto">
            {child}
          </div>
        </div>
      ))}
    </div>
  );
}
