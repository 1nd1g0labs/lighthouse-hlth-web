import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

const ratingVariants = cva('inline-flex items-center gap-0.5', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface RatingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ratingVariants> {
  /**
   * Rating value (1-5)
   */
  rating: 1 | 2 | 3 | 4 | 5;
  /**
   * Maximum rating (defaults to 5)
   */
  maxRating?: number;
  /**
   * Color for filled stars
   */
  starColor?: string;
  /**
   * Color for empty stars
   */
  emptyColor?: string;
  /**
   * Show numeric rating value
   */
  showValue?: boolean;
}

/**
 * Rating - Star rating display (1-5 stars)
 *
 * Part of Lighthouse HLTH design system Tier 2 components.
 * Used for service feedback, patient satisfaction scores, and program ratings.
 *
 * @example
 * ```tsx
 * <Rating rating={4} showValue />
 * ```
 */
export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      rating,
      maxRating = 5,
      starColor = '#FF833B',
      emptyColor = '#D1D5DB',
      showValue = false,
      size,
      className,
      ...props
    },
    ref
  ) => {
    const stars = Array.from({ length: maxRating }, (_, index) => index + 1);

    return (
      <div
        ref={ref}
        className={cn(ratingVariants({ size }), className)}
        role="img"
        aria-label={`${rating} out of ${maxRating} stars`}
        {...props}
      >
        {stars.map((star) => (
          <Star
            key={star}
            className="h-5 w-5"
            fill={star <= rating ? starColor : emptyColor}
            stroke={star <= rating ? starColor : emptyColor}
            aria-hidden="true"
          />
        ))}
        {showValue && (
          <span className="ml-2 font-body text-14 text-gray-700">
            {rating}/{maxRating}
          </span>
        )}
      </div>
    );
  }
);

Rating.displayName = 'Rating';
