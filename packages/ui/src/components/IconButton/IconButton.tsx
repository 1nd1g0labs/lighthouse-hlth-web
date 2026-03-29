import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ArrowRight } from 'lucide-react';

const iconButtonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'rounded-full',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'select-none',
    'touch-manipulation',
  ].join(' '),
  {
    variants: {
      variant: {
        // Primary - Brand teal circular button with white arrow
        primary: [
          'bg-primary-500 text-white',
          'hover:bg-primary-600',
          'active:bg-primary-700',
          'focus:ring-primary-500/20',
          'shadow-sm hover:shadow-md',
        ].join(' '),

        // Secondary - Green circular button
        secondary: [
          'bg-secondary-500 text-white',
          'hover:bg-secondary-600',
          'active:bg-secondary-700',
          'focus:ring-secondary-500/20',
          'shadow-sm hover:shadow-md',
        ].join(' '),

        // Accent - Coral circular button
        accent: [
          'bg-accent-500 text-white',
          'hover:bg-accent-600',
          'active:bg-accent-700',
          'focus:ring-accent-500/20',
          'shadow-sm hover:shadow-md',
        ].join(' '),

        // Outline - Bordered circular button
        outline: [
          'border-2 border-primary-500 text-primary-500 bg-white',
          'hover:bg-primary-50',
          'active:bg-primary-100',
          'focus:ring-primary-500/20',
        ].join(' '),

        // Ghost - Subtle gray
        ghost: [
          'text-gray-700 bg-gray-100',
          'hover:bg-gray-200',
          'active:bg-gray-300',
          'focus:ring-gray-500/20',
        ].join(' '),
      },
      size: {
        sm: 'h-10 w-10 md:h-8 md:w-8',
        md: 'h-11 w-11 md:h-10 md:w-10',
        lg: 'h-12 w-12',
        xl: 'h-14 w-14',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon?: React.ReactNode;
  ariaLabel?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      ariaLabel,
      disabled,
      ...props
    },
    ref
  ) => {
    const iconSize = size === 'sm' ? 16 : size === 'lg' ? 20 : size === 'xl' ? 24 : 18;

    return (
      <button
        ref={ref}
        className={cn(iconButtonVariants({ variant, size, className }))}
        disabled={disabled}
        aria-label={ariaLabel}
        {...props}
      >
        {icon || <ArrowRight size={iconSize} />}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
