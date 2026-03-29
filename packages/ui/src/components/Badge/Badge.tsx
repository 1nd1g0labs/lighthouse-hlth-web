import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-medium',
    'transition-colors duration-150',
    'select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-gray-200 text-gray-700',
        primary: 'bg-primary-500 text-white',
        secondary: 'bg-secondary-500 text-white',
        accent: 'bg-accent-500 text-white',
        success: 'bg-green-500 text-white',
        warning: 'bg-amber-500 text-gray-900',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white',
        outline: 'border-2 border-gray-200 text-gray-700 bg-transparent',
        // Sustainability badges
        emissionsHigh: 'bg-red-600 text-white',
        emissionsMedium: 'bg-amber-500 text-white',
        emissionsLow: 'bg-green-500 text-white',
      },
      size: {
        sm: 'text-xs px-2 py-0.5 rounded-[0.25rem]',
        md: 'text-sm px-2.5 py-0.5 rounded-[0.375rem]',
        lg: 'text-base px-3 py-1 rounded-[0.5rem]',
      },
      pill: {
        true: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, pill, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, pill, className }))}
        {...props}
      >
        {leftIcon && <span className="mr-1">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-1">{rightIcon}</span>}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
