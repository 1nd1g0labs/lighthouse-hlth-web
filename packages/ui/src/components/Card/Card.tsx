import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const cardVariants = cva(
  'rounded-xl transition-all duration-300 overflow-hidden',
  {
    variants: {
      variant: {
        default: [
          'bg-white',
          'border border-gray-200',
          'shadow-sm',
        ].join(' '),
        elevated: [
          'bg-white',
          'shadow-md',
        ].join(' '),
        outline: [
          'bg-white',
          'border-2 border-gray-200',
        ].join(' '),
        ghost: [
          'bg-gray-50',
        ].join(' '),
        sustainability: [
          'bg-gradient-to-br from-primary-500/5 to-secondary-500/5',
          'border border-secondary-500/20',
        ].join(' '),
      },
      padding: {
        none: 'p-0',
        sm: 'p-3 md:p-4',
        md: 'p-4 md:p-6',
        lg: 'p-6 md:p-8',
      },
      hoverable: {
        true: 'hover:shadow-lg hover:scale-[1.02] cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hoverable, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, hoverable, className }))}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-xl md:text-2xl font-semibold leading-tight tracking-tight text-gray-900',
      className
    )}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-600 leading-relaxed', className)}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-0', className)} {...props} />
));

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';
