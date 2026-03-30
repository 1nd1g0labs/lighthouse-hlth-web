import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'aria-invalid'> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, helperText, error, id, ...props }, ref) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <div className="relative">
            <input
              id={radioId}
              type="radio"
              ref={ref}
              className={cn(
                'peer h-6 w-6 md:h-5 md:w-5 shrink-0',
                'appearance-none rounded-full',
                'border-2 border-gray-300',
                'bg-white',
                'transition-all duration-150',
                'checked:border-[7px] md:checked:border-[6px] checked:border-primary-500',
                'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'cursor-pointer',
                error && 'border-red-500',
                className
              )}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={
                error ? `${radioId}-error` : helperText ? `${radioId}-helper` : undefined
              }
              {...props}
            />
          </div>
        </div>

        {(label || helperText || error) && (
          <div className="ml-3 text-sm">
            {label && (
              <label
                htmlFor={radioId}
                className="font-medium text-gray-700 cursor-pointer select-none"
              >
                {label}
              </label>
            )}

            {helperText && !error && (
              <p id={`${radioId}-helper`} className="text-gray-500">
                {helperText}
              </p>
            )}

            {error && (
              <p id={`${radioId}-error`} className="text-red-500">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

// RadioGroup component for managing multiple radios
export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
  helperText?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, label, error, helperText, orientation = 'vertical', children, ...props }, ref) => {
    const groupId = `radio-group-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div ref={ref} className="w-full" {...props}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}

        <div
          role="radiogroup"
          className={cn(
            'flex',
            orientation === 'horizontal' ? 'flex-col md:flex-row gap-4 md:gap-6' : 'flex-col gap-3',
            className
          )}
        >
          {children}
        </div>

        {error && (
          <p id={`${groupId}-error`} className="mt-1.5 text-sm text-red-500">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${groupId}-helper`} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
