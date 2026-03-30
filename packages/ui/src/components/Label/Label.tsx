import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Label Component - Framer Aligned (nodeId: pJf7jULqM)
 *
 * A rating/review label displaying star rating and user count with avatars.
 * Perfect for social proof, testimonials, and review sections.
 *
 * Framer Design Specifications:
 * - Container: 6px border radius, vertical stack
 * - Images section: 4 overlapping avatars (32px) + "+N" badge (green background)
 * - Rating section: 5 stars (14px) + review text
 * - Avatar size: 32px circular
 * - Avatar overlap: -20px margin (stacking effect)
 * - Plus badge: 32px, #057C8B background, white icon
 * - Stars: 14px, #FF833B (accent) color
 * - Text: 14px Inter
 * - Gap between images and rating: 12px
 * - Gap between stars: 1px
 * - Gap between stars and text: 5px
 *
 * WCAG 2.1 AA Compliance:
 * - Color contrast: Stars on light background ✓
 * - ARIA labels: Rating announced to screen readers ✓
 * - Semantic markup: Uses descriptive elements ✓
 * - Alt text: All avatars have descriptive alt text ✓
 *
 * @example
 * ```tsx
 * // 5-star rating with avatars
 * <Label
 *   rating={5}
 *   avatars={['/user1.jpg', '/user2.jpg', '/user3.jpg', '/user4.jpg']}
 *   additionalCount={20}
 *   reviewText="Based on 20K+ Reviews"
 * />
 *
 * // Simple star rating
 * <Label rating={4} reviewText="Based on 500 reviews" />
 *
 * // Compact variant
 * <Label rating={5} variant="compact" reviewText="Verified reviews" />
 * ```
 */
const labelVariants = cva(
  [
    'inline-flex flex-col',
    'rounded-sm', // 6px border radius
    'pb-2.5', // Bottom padding for default variant
  ].join(' '),
  {
    variants: {
      variant: {
        default: '',
        compact: 'pb-0', // No bottom padding for compact
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface LabelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof labelVariants> {
  /**
   * Star rating value (1-5)
   */
  rating: 1 | 2 | 3 | 4 | 5;

  /**
   * Array of avatar image URLs (max 4 shown)
   * @default []
   */
  avatars?: string[];

  /**
   * Number to show in "+N" badge (shown after avatars)
   * @default undefined
   */
  additionalCount?: number;

  /**
   * Review text displayed below stars (e.g., "Based on 20K+ Reviews")
   * @default undefined
   */
  reviewText?: string;

  /**
   * Star color (uses Tailwind color classes)
   * @default 'text-accent-500' (#FF833B)
   */
  starColor?: string;

  /**
   * Visual variant of the label
   * @default 'default'
   */
  variant?: 'default' | 'compact';
}

/**
 * Label - Rating/review label with avatars and stars
 *
 * Provides social proof through visual user representation and star ratings.
 * Designed for healthcare testimonials where trust-building is critical.
 */
export const Label = forwardRef<HTMLDivElement, LabelProps>(
  (
    {
      className,
      variant = 'default',
      rating,
      avatars = [],
      additionalCount,
      reviewText,
      starColor = 'text-accent-500', // Framer orange
      ...props
    },
    ref
  ) => {
    // Show only first 4 avatars (Framer pattern)
    const displayAvatars = avatars.slice(0, 4);
    const hasAvatars = displayAvatars.length > 0 || additionalCount;

    // Generate ARIA label for accessibility
    const ariaLabel = reviewText
      ? `${rating} out of 5 stars. ${reviewText}`
      : `${rating} out of 5 stars`;

    return (
      <div
        ref={ref}
        className={cn(labelVariants({ variant, className }))}
        aria-label={ariaLabel}
        role="img"
        {...props}
      >
        {/* Images Section - Overlapping avatars with +N badge */}
        {hasAvatars && (
          <div className="flex items-center gap-2 mb-3">
            {/* Overlapping avatars */}
            <div className="flex" role="group" aria-label="User avatars">
              {displayAvatars.map((avatar, i) => (
                <img
                  key={i}
                  src={avatar}
                  alt={`Reviewer ${i + 1}`}
                  className={cn(
                    'w-8 h-8 rounded-full', // 32px Framer size
                    'border-2 border-white', // White border for separation
                    i > 0 && '-ml-5' // -20px overlap (Tailwind -ml-5 = -1.25rem = -20px)
                  )}
                />
              ))}

              {/* +N badge */}
              {additionalCount !== undefined && additionalCount > 0 && (
                <div
                  className={cn(
                    'w-8 h-8 rounded-full', // 32px to match avatars
                    'bg-primary-500', // Framer green (#057C8B)
                    'text-white',
                    'flex items-center justify-center',
                    'text-xs font-medium', // Small text for number
                    displayAvatars.length > 0 && '-ml-5' // Overlap if avatars present
                  )}
                  aria-label={`${additionalCount} more reviewers`}
                >
                  +{additionalCount}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Rating Section - Stars and text */}
        <div className="flex flex-col gap-1.25">
          {/* Stars - 5 stars with filled/unfilled based on rating */}
          <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14} // Framer exact size
                fill={i < rating ? 'currentColor' : 'none'}
                className={cn(
                  i < rating ? starColor : 'text-neutral-300',
                  'flex-shrink-0'
                )}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Review text */}
          {reviewText && (
            <p className="font-body text-body-sm text-neutral-700">
              {reviewText}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Label.displayName = 'Label';
