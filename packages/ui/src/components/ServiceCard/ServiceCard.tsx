import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { IconButton } from '../IconButton';

const serviceCardVariants = cva(
  [
    'group relative',
    'rounded-xl overflow-hidden',
    'bg-white',
    'transition-all duration-300',
    'cursor-pointer',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'shadow-sm hover:shadow-lg',
        elevated: 'shadow-md hover:shadow-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ServiceCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof serviceCardVariants> {
  /**
   * Service title (e.g., "Carbon intelligence", "Energy & facilities optimization")
   */
  title: string;

  /**
   * Optional service description
   */
  description?: string;

  /**
   * Background image URL
   */
  image: string;

  /**
   * Icon element to display in the title area
   */
  icon?: React.ReactNode;

  /**
   * Callback when card is clicked
   */
  onCardClick?: () => void;

  /**
   * Callback when action button is clicked
   */
  onActionClick?: (e: React.MouseEvent) => void;
}

export const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
  (
    {
      className,
      variant,
      title,
      description,
      image,
      icon,
      onCardClick,
      onActionClick,
      ...props
    },
    ref
  ) => {
    const handleActionClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onActionClick?.(e);
    };

    return (
      <div
        ref={ref}
        className={cn(serviceCardVariants({ variant, className }))}
        onClick={onCardClick}
        {...props}
      >
        {/* Background Image */}
        <div className="relative h-56 sm:h-64 md:h-80 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
            {/* Icon (if provided) */}
            {icon && (
              <div className="flex items-start">
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl text-white">
                  {icon}
                </div>
              </div>
            )}

            {/* Title and Action Button */}
            <div className="flex items-end justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white leading-tight">
                  {title}
                </h3>
                {description && (
                  <p className="mt-2 text-sm text-white/90 line-clamp-2">
                    {description}
                  </p>
                )}
              </div>

              {/* Action Button */}
              <div
                onClick={handleActionClick}
                className="flex-shrink-0"
              >
                <IconButton
                  variant="outline"
                  size="md"
                  ariaLabel={`View ${title}`}
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ServiceCard.displayName = 'ServiceCard';
