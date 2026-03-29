import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const textareaVariants = cva(
  [
    'flex w-full rounded-[0.5rem]',
    'border border-gray-300',
    'bg-white px-3 py-3',
    'text-base text-gray-900',
    'placeholder:text-gray-400',
    'min-h-[120px]',
    'transition-colors duration-150',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100',
    'resize-y',
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
        error: [
          'border-red-500',
          'focus:ring-red-500/20 focus:border-red-500',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'aria-invalid'>,
    VariantProps<typeof textareaVariants> {
  error?: string;
  helperText?: string;
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, error, helperText, label, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = error || variant === 'error';

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}

        <textarea
          id={textareaId}
          className={cn(
            textareaVariants({
              variant: hasError ? 'error' : variant,
              className,
            })
          )}
          ref={ref}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helperText
              ? `${textareaId}-helper`
              : undefined
          }
          {...props}
        />

        {error && (
          <p id={`${textareaId}-error`} className="mt-1.5 text-sm text-red-500">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
