import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ChevronDown } from 'lucide-react';

const selectVariants = cva(
  [
    'flex w-full appearance-none rounded-[0.5rem]',
    'border border-gray-300',
    'bg-white px-3 py-2 pr-10',
    'text-base text-gray-900',
    'transition-colors duration-150',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100',
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
      selectSize: {
        sm: 'min-h-[44px] md:h-8 text-sm px-2 pr-8',
        md: 'min-h-[44px] md:h-10 text-base px-3 pr-10',
        lg: 'min-h-[48px] md:h-12 text-lg px-4 pr-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      selectSize: 'md',
    },
  }
);

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'aria-invalid'>,
    VariantProps<typeof selectVariants> {
  error?: string;
  helperText?: string;
  label?: string;
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      selectSize,
      error,
      helperText,
      label,
      id,
      options,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = error || variant === 'error';

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            id={selectId}
            className={cn(
              selectVariants({
                variant: hasError ? 'error' : variant,
                selectSize,
                className,
              })
            )}
            ref={ref}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={
              error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
            }
            {...props}
          >
            {options
              ? options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))
              : children}
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        {error && (
          <p id={`${selectId}-error`} className="mt-1.5 text-sm text-red-500">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${selectId}-helper`} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
