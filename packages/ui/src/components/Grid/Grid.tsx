import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const gridVariants = cva(
  'grid',
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        12: 'grid-cols-12',
      },
      gap: {
        0: 'gap-0',
        1: 'gap-1',
        2: 'gap-2',
        3: 'gap-3',
        4: 'gap-4',
        5: 'gap-5',
        6: 'gap-6',
        8: 'gap-8',
        10: 'gap-10',
        12: 'gap-12',
        16: 'gap-16',
      },
      rows: {
        1: 'grid-rows-1',
        2: 'grid-rows-2',
        3: 'grid-rows-3',
        4: 'grid-rows-4',
        5: 'grid-rows-5',
        6: 'grid-rows-6',
      },
    },
    defaultVariants: {
      cols: 1,
      gap: 4,
    },
  }
);

type ResponsiveValue<T> = T | {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
};

type ColsValue = 1 | 2 | 3 | 4 | 5 | 6 | 12;
type GapValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
type RowsValue = 1 | 2 | 3 | 4 | 5 | 6;

export interface GridProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'cols' | 'gap'> {
  cols?: ResponsiveValue<ColsValue>;
  gap?: ResponsiveValue<GapValue>;
  rows?: ResponsiveValue<RowsValue>;
}

const getResponsiveClasses = <T extends string | number>(
  value: ResponsiveValue<T> | undefined,
  prefix: 'grid-cols' | 'gap' | 'grid-rows'
): string => {
  if (!value) return '';

  if (typeof value !== 'object') {
    // Single value - use CVA
    return '';
  }

  const classes: string[] = [];
  const breakpoints = ['base', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

  breakpoints.forEach((bp) => {
    const val = value[bp];
    if (val !== undefined) {
      const bpPrefix = bp === 'base' ? '' : `${bp}:`;
      classes.push(`${bpPrefix}${prefix}-${val}`);
    }
  });

  return classes.join(' ');
};

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, rows, ...props }, ref) => {
    const responsiveColsClasses = getResponsiveClasses(cols, 'grid-cols');
    const responsiveGapClasses = getResponsiveClasses(gap, 'gap');
    const responsiveRowsClasses = getResponsiveClasses(rows, 'grid-rows');

    // Use CVA for simple values
    const simpleCols = typeof cols !== 'object' ? cols : undefined;
    const simpleGap = typeof gap !== 'object' ? gap : undefined;
    const simpleRows = typeof rows !== 'object' ? rows : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          gridVariants({
            cols: simpleCols,
            gap: simpleGap,
            rows: simpleRows
          }),
          responsiveColsClasses,
          responsiveGapClasses,
          responsiveRowsClasses,
          className
        )}
        {...props}
      />
    );
  }
);

Grid.displayName = 'Grid';
