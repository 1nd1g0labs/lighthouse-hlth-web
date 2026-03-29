import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const progressVariants = cva(
  'relative h-2 w-full overflow-hidden rounded-full bg-gray-200',
  {
    variants: {
      size: {
        sm: 'h-1.5 md:h-1',
        md: 'h-2.5 md:h-2',
        lg: 'h-3.5 md:h-3',
        xl: 'h-5 md:h-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const progressBarVariants = cva(
  'h-full transition-all duration-500 ease-out',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500',
        secondary: 'bg-secondary-500',
        accent: 'bg-accent-500',
        success: 'bg-green-500',
        warning: 'bg-amber-500',
        error: 'bg-red-500',
        // Sustainability variants based on emission levels
        emissionsLow: 'bg-green-500',
        emissionsMedium: 'bg-amber-500',
        emissionsHigh: 'bg-red-600',
        sustainability: 'bg-gradient-to-r from-primary-500 to-secondary-500',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  variant?: VariantProps<typeof progressBarVariants>['variant'];
  showLabel?: boolean;
  label?: string;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      size,
      value = 0,
      max = 100,
      variant = 'primary',
      showLabel = false,
      label,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div className="w-full">
        {(showLabel || label) && (
          <div className="flex justify-between mb-1.5">
            <span className="text-sm font-medium text-gray-700">
              {label || 'Progress'}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {Math.round(percentage)}%
            </span>
          </div>
        )}

        <div
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={value}
          className={cn(progressVariants({ size, className }))}
          {...props}
        >
          <div
            className={cn(progressBarVariants({ variant }))}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';
