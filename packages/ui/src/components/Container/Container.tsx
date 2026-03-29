import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const containerVariants = cva(
  'mx-auto w-full',
  {
    variants: {
      maxWidth: {
        sm: 'max-w-[640px]',
        md: 'max-w-[768px]',
        lg: 'max-w-[1024px]',
        xl: 'max-w-[1280px]',
        '2xl': 'max-w-[1536px]',
        full: 'max-w-full',
      },
      padding: {
        none: 'px-0',
        sm: 'px-4',
        md: 'px-6',
        lg: 'px-8',
      },
    },
    defaultVariants: {
      maxWidth: 'xl',
      padding: 'md',
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

type MaxWidthValue = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
type PaddingValue = 'none' | 'sm' | 'md' | 'lg';

export interface ContainerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'padding'> {
  maxWidth?: ResponsiveValue<MaxWidthValue>;
  padding?: ResponsiveValue<PaddingValue>;
}

const maxWidthClasses: Record<MaxWidthValue, string> = {
  sm: 'max-w-[640px]',
  md: 'max-w-[768px]',
  lg: 'max-w-[1024px]',
  xl: 'max-w-[1280px]',
  '2xl': 'max-w-[1536px]',
  full: 'max-w-full',
};

const paddingClasses: Record<PaddingValue, string> = {
  none: 'px-0',
  sm: 'px-4',
  md: 'px-6',
  lg: 'px-8',
};

const getResponsiveClasses = <T extends string>(
  value: ResponsiveValue<T> | undefined,
  classMap: Record<T, string>
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
      classes.push(`${bpPrefix}${classMap[val as T]}`);
    }
  });

  return classes.join(' ');
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth, padding, ...props }, ref) => {
    const responsiveMaxWidthClasses = getResponsiveClasses(maxWidth, maxWidthClasses);
    const responsivePaddingClasses = getResponsiveClasses(padding, paddingClasses);

    // Use CVA for simple values
    const simpleMaxWidth = typeof maxWidth !== 'object' ? maxWidth : undefined;
    const simplePadding = typeof padding !== 'object' ? padding : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          containerVariants({
            maxWidth: simpleMaxWidth,
            padding: simplePadding,
          }),
          responsiveMaxWidthClasses,
          responsivePaddingClasses,
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';
