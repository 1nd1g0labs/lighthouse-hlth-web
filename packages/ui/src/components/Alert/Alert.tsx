import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

const alertVariants = cva(
  [
    'relative w-full rounded-[0.5rem] border',
    'p-3 md:p-4',
    'transition-all duration-250',
  ].join(' '),
  {
    variants: {
      variant: {
        info: [
          'bg-blue-100 border-blue-500 text-blue-900',
        ].join(' '),
        success: [
          'bg-green-100 border-green-500 text-green-900',
        ].join(' '),
        warning: [
          'bg-amber-100 border-amber-500 text-amber-900',
        ].join(' '),
        error: [
          'bg-red-100 border-red-500 text-red-900',
        ].join(' '),
        sustainability: [
          'bg-gradient-to-r from-primary-500/10 to-secondary-500/10',
          'border-secondary-500',
          'text-green-900',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
  sustainability: CheckCircle2,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  onClose?: () => void;
  icon?: React.ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, onClose, icon, children, ...props }, ref) => {
    const Icon = iconMap[variant as keyof typeof iconMap] || iconMap.info;

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, className }))}
        {...props}
      >
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            {icon || <Icon className="h-5 w-5" />}
          </div>

          <div className="flex-1">
            {title && (
              <h5 className="mb-1 font-semibold leading-none tracking-tight">
                {title}
              </h5>
            )}
            <div className="text-sm leading-relaxed">{children}</div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity p-1 -m-1 touch-manipulation"
              aria-label="Close alert"
            >
              <X className="h-5 w-5 md:h-4 md:w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
