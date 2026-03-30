import React, { createContext, useContext, useState, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, value: controlledValue, onValueChange, children, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');
    const value = controlledValue ?? uncontrolledValue;

    const handleChange = (newValue: string) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider value={{ value, onChange: handleChange }}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(
          'inline-flex h-10 items-center justify-start rounded-[0.5rem] bg-[#F3F4F6] p-1 gap-1',
          'overflow-x-auto scrollbar-hide max-w-full',
          'md:overflow-x-visible',
          className
        )}
        {...props}
      />
    );
  }
);

TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) {
      throw new Error('TabsTrigger must be used within Tabs');
    }

    const isSelected = context.value === value;

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        aria-selected={isSelected}
        onClick={() => context.onChange(value)}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-[0.375rem]',
          'px-3 py-2 min-h-[44px]',
          'md:px-3 md:py-1.5 md:min-h-0',
          'text-sm font-medium transition-all duration-150',
          'focus:outline-none focus:ring-2 focus:ring-[#0070E0]/20',
          'disabled:pointer-events-none disabled:opacity-50',
          'touch-manipulation',
          isSelected
            ? 'bg-white text-[#111827] shadow-sm'
            : 'text-[#6B7280] hover:text-[#374151]',
          className
        )}
        {...props}
      />
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) {
      throw new Error('TabsContent must be used within Tabs');
    }

    if (context.value !== value) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn('mt-4', className)}
        {...props}
      />
    );
  }
);

TabsContent.displayName = 'TabsContent';
