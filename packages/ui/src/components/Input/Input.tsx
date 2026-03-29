import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputVariants = cva(
  [
    'flex w-full rounded-[0.5rem]',
    'border border-gray-300',
    'bg-white px-3 py-2',
    'text-base text-gray-900',
    'placeholder:text-gray-400',
    'transition-colors duration-150',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
        error: [
          'border-red-500',
          'focus:ring-red-500/20 focus:border-red-500',
        ].join(' '),
        success: [
          'border-green-500',
          'focus:ring-green-500/20 focus:border-green-500',
        ].join(' '),
      },
      inputSize: {
        sm: 'min-h-[44px] md:h-8 text-sm px-2',
        md: 'min-h-[44px] md:h-10 text-base px-3',
        lg: 'min-h-[48px] md:h-12 text-lg px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'aria-invalid'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  helperText?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      type = 'text',
      leftIcon,
      rightIcon,
      error,
      helperText,
      label,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = error || variant === 'error';

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            className={cn(
              inputVariants({
                variant: hasError ? 'error' : variant,
                inputSize,
                className
              }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10'
            )}
            ref={ref}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-500">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
