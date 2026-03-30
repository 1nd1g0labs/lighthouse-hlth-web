import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const sectionTagVariants = cva(
  'inline-flex items-center font-body text-14 font-medium rounded-sm px-3 py-1',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500/10 text-primary-500',
        accent: 'bg-accent-500/10 text-accent-500',
        neutral: 'bg-gray-100 text-gray-700',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface SectionTagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof sectionTagVariants> {
  /**
   * Tag content
   */
  children: React.ReactNode;
}

/**
 * SectionTag - Section label/tag for categorization
 *
 * Part of Lighthouse HLTH design system Tier 2 components.
 * Used for categorizing content, features, and initiatives in healthcare applications.
 *
 * @example
 * ```tsx
 * <SectionTag variant="primary">Energy</SectionTag>
 * ```
 */
export const SectionTag = React.forwardRef<HTMLSpanElement, SectionTagProps>(
  ({ variant, children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(sectionTagVariants({ variant }), className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

SectionTag.displayName = 'SectionTag';
