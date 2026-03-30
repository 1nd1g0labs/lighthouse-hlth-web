import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const stackVariants = cva(
  'flex',
  {
    variants: {
      direction: {
        row: 'flex-row',
        column: 'flex-col',
        rowReverse: 'flex-row-reverse',
        columnReverse: 'flex-col-reverse',
      },
      spacing: {
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
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      wrap: {
        true: 'flex-wrap',
        false: 'flex-nowrap',
      },
    },
    defaultVariants: {
      direction: 'column',
      spacing: 4,
      align: 'stretch',
      justify: 'start',
      wrap: false,
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

type DirectionValue = 'row' | 'column' | 'rowReverse' | 'columnReverse';
type SpacingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
type AlignValue = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type JustifyValue = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface StackProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'direction'> {
  direction?: ResponsiveValue<DirectionValue>;
  spacing?: ResponsiveValue<SpacingValue>;
  align?: ResponsiveValue<AlignValue>;
  justify?: ResponsiveValue<JustifyValue>;
  wrap?: boolean | ResponsiveValue<boolean>;
}

const getResponsiveClasses = <T extends string | number | boolean>(
  value: ResponsiveValue<T> | undefined,
  getClass: (val: T) => string
): string => {
  if (!value) return '';

  if (typeof value !== 'object') {
    return '';
  }

  const classes: string[] = [];
  const breakpoints = ['base', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

  breakpoints.forEach((bp) => {
    const val = value[bp];
    if (val !== undefined) {
      const bpPrefix = bp === 'base' ? '' : `${bp}:`;
      const className = getClass(val as T);
      classes.push(`${bpPrefix}${className}`);
    }
  });

  return classes.join(' ');
};

const directionClasses: Record<DirectionValue, string> = {
  row: 'flex-row',
  column: 'flex-col',
  rowReverse: 'flex-row-reverse',
  columnReverse: 'flex-col-reverse',
};

const spacingClasses: Record<SpacingValue, string> = {
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
};

const alignClasses: Record<AlignValue, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyClasses: Record<JustifyValue, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, spacing, align, justify, wrap, ...props }, ref) => {
    const responsiveDirectionClasses = getResponsiveClasses(
      direction,
      (val) => directionClasses[val]
    );
    const responsiveSpacingClasses = getResponsiveClasses(
      spacing,
      (val) => spacingClasses[val]
    );
    const responsiveAlignClasses = getResponsiveClasses(
      align,
      (val) => alignClasses[val]
    );
    const responsiveJustifyClasses = getResponsiveClasses(
      justify,
      (val) => justifyClasses[val]
    );
    const responsiveWrapClasses = getResponsiveClasses(
      wrap,
      (val) => val ? 'flex-wrap' : 'flex-nowrap'
    );

    // Use CVA for simple values
    const simpleDirection = typeof direction !== 'object' ? direction : undefined;
    const simpleSpacing = typeof spacing !== 'object' ? spacing : undefined;
    const simpleAlign = typeof align !== 'object' ? align : undefined;
    const simpleJustify = typeof justify !== 'object' ? justify : undefined;
    const simpleWrap = typeof wrap !== 'object' ? wrap : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          stackVariants({
            direction: simpleDirection,
            spacing: simpleSpacing,
            align: simpleAlign,
            justify: simpleJustify,
            wrap: simpleWrap,
          }),
          responsiveDirectionClasses,
          responsiveSpacingClasses,
          responsiveAlignClasses,
          responsiveJustifyClasses,
          responsiveWrapClasses,
          className
        )}
        {...props}
      />
    );
  }
);

Stack.displayName = 'Stack';

// Convenience components with responsive support
export const HStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="row" {...props} />
);

HStack.displayName = 'HStack';

export const VStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="column" {...props} />
);

VStack.displayName = 'VStack';
