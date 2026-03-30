import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'aria-invalid'> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, helperText, error, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <div className="relative">
            <input
              id={checkboxId}
              type="checkbox"
              ref={ref}
              className={cn(
                'peer h-6 w-6 md:h-5 md:w-5 shrink-0',
                'appearance-none rounded-[0.375rem]',
                'border-2 border-gray-300',
                'bg-white',
                'transition-all duration-150',
                'checked:bg-primary-500 checked:border-primary-500',
                'focus:outline-none focus:ring-2 focus:ring-primary-500/20',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'cursor-pointer',
                error && 'border-red-500',
                className
              )}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={
                error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined
              }
              {...props}
            />
            <Check
              className="absolute top-0 left-0 h-6 w-6 md:h-5 md:w-5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none p-0.5"
              strokeWidth={3}
            />
          </div>
        </div>

        {(label || helperText || error) && (
          <div className="ml-3 text-sm">
            {label && (
              <label
                htmlFor={checkboxId}
                className="font-medium text-gray-700 cursor-pointer select-none"
              >
                {label}
              </label>
            )}

            {helperText && !error && (
              <p id={`${checkboxId}-helper`} className="text-gray-500">
                {helperText}
              </p>
            )}

            {error && (
              <p id={`${checkboxId}-error`} className="text-red-500">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
