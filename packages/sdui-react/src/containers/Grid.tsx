import React from 'react';
import { cn } from '../utils';
import type { GridProps } from '@sdui/core';

/**
 * Grid 컴포넌트
 * CSS Grid 기반 레이아웃
 */
export function Grid({
  columns = 1,
  rows,
  gap = 4,
  responsive,
  className,
  children,
}: GridProps) {
  const columnsValue = typeof columns === 'number' ? `repeat(${columns}, minmax(0, 1fr))` : columns;
  const rowsValue = rows ? (typeof rows === 'number' ? `repeat(${rows}, minmax(0, 1fr))` : rows) : undefined;
  const gapValue = typeof gap === 'number' ? `${gap * 0.25}rem` : gap;

  // 반응형 클래스 생성
  const responsiveClasses: string[] = [];
  if (responsive) {
    if (responsive.sm?.columns) {
      const smCols = typeof responsive.sm.columns === 'number' ? responsive.sm.columns : 1;
      responsiveClasses.push(`sm:grid-cols-${smCols}`);
    }
    if (responsive.md?.columns) {
      const mdCols = typeof responsive.md.columns === 'number' ? responsive.md.columns : 1;
      responsiveClasses.push(`md:grid-cols-${mdCols}`);
    }
    if (responsive.lg?.columns) {
      const lgCols = typeof responsive.lg.columns === 'number' ? responsive.lg.columns : 1;
      responsiveClasses.push(`lg:grid-cols-${lgCols}`);
    }
    if (responsive.xl?.columns) {
      const xlCols = typeof responsive.xl.columns === 'number' ? responsive.xl.columns : 1;
      responsiveClasses.push(`xl:grid-cols-${xlCols}`);
    }
  }

  return (
    <div
      className={cn('grid', ...responsiveClasses, className)}
      style={{
        gridTemplateColumns: columnsValue,
        gridTemplateRows: rowsValue,
        gap: gapValue,
      }}
    >
      {children}
    </div>
  );
}
