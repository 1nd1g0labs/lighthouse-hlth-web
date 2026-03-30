import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * LinkButton Component - Framer Aligned (nodeId: Y9sUo0Uzx)
 *
 * A text link with animated arrow icon for navigation. Perfect for "Learn more",
 * "Read more", and other secondary call-to-action links.
 *
 * Framer Design Specifications:
 * - Text: /16 text style (16px Inter)
 * - Arrow: 15px icon, rotated -45deg for forward direction
 * - Gap: 7px between text and arrow (increases to 12px on hover)
 * - Layout: Horizontal stack, center aligned
 * - Arrow animation: Two arrow elements swap positions on hover
 *   - One positioned outside view (entrance)
 *   - One in view (exit)
 *   - Smooth transition with gap increase
 *
 * Variants:
 * - forward-black: Black text, arrow pointing right (default)
 * - forward-white: White text, arrow pointing right
 * - backward-black: Black text, arrow pointing left
 * - backward-white: White text, arrow pointing left
 *
 * WCAG 2.1 AA Compliance:
 * - Color contrast: Black/white on appropriate backgrounds ✓
 * - Focus indicator: 2px ring at 3:1 contrast ✓
 * - Keyboard navigation: Full Tab/Enter support ✓
 * - Semantic HTML: Uses <a> tag with href ✓
 * - Motion: Respects prefers-reduced-motion ✓
 *
 * @example
 * ```tsx
 * // Forward black (default)
 * <LinkButton href="/learn-more">Learn more about sustainability</LinkButton>
 *
 * // Forward white (for dark backgrounds)
 * <LinkButton variant="forward-white" href="/services">
 *   View our services
 * </LinkButton>
 *
 * // Backward navigation
 * <LinkButton variant="backward-black" href="/back">
 *   Back to homepage
 * </LinkButton>
 *
 * // Disable animation
 * <LinkButton animated={false} href="/simple">
 *   Simple link
 * </LinkButton>
 * ```
 */
const linkButtonVariants = cva(
  [
    // Base layout
    'inline-flex items-center',
    'font-body text-body', // 16px Inter
    'gap-1.75', // 7px Framer gap

    // Transitions
    'transition-all duration-200',

    // Focus state - WCAG 2.1 AA
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-primary-500/20',

    // Interaction
    'cursor-pointer',
    'group', // For child element hover effects
  ].join(' '),
  {
    variants: {
      variant: {
        // Forward Black - Default, for light backgrounds
        'forward-black': [
          'text-black',
          'hover:gap-3', // 7px → 12px on hover
          'hover:text-primary-600',
        ].join(' '),

        // Forward White - For dark backgrounds
        'forward-white': [
          'text-white',
          'hover:gap-3',
          'hover:text-neutral-200',
        ].join(' '),

        // Backward Black - Navigation back
        'backward-black': [
          'text-black',
          'hover:gap-3',
          'hover:text-primary-600',
          'flex-row-reverse', // Reverse order for backward arrow
        ].join(' '),

        // Backward White - Navigation back on dark
        'backward-white': [
          'text-white',
          'hover:gap-3',
          'hover:text-neutral-200',
          'flex-row-reverse',
        ].join(' '),
      },
    },
    defaultVariants: {
      variant: 'forward-black',
    },
  }
);

export interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkButtonVariants> {
  /**
   * Link destination URL
   */
  href: string;

  /**
   * Visual variant (direction and color)
   * @default 'forward-black'
   */
  variant?: 'forward-black' | 'forward-white' | 'backward-black' | 'backward-white';

  /**
   * Enable/disable arrow animation
   * @default true
   */
  animated?: boolean;

  /**
   * Link text content
   */
  children: React.ReactNode;
}

/**
 * LinkButton - Animated text link with directional arrow
 *
 * Provides visual feedback through smooth arrow animation on hover.
 * Perfect for secondary CTAs and navigation links in healthcare contexts.
 */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      className,
      variant = 'forward-black',
      href,
      animated = true,
      children,
      ...props
    },
    ref
  ) => {
    // Determine arrow direction based on variant
    const isForward = variant?.includes('forward');
    const direction = isForward ? 'forward' : 'backward';

    // Animation variants for arrow swap effect
    const arrowExitVariants = {
      initial: { x: 0, y: 0, opacity: 1 },
      hover: {
        x: direction === 'forward' ? '100%' : '-100%',
        y: direction === 'forward' ? '-100%' : '100%',
        opacity: 0,
        transition: { duration: 0.2, ease: 'easeInOut' },
      },
    };

    const arrowEnterVariants = {
      initial: {
        x: direction === 'forward' ? '-100%' : '100%',
        y: direction === 'forward' ? '100%' : '-100%',
        opacity: 0,
      },
      hover: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: { duration: 0.2, ease: 'easeInOut' },
      },
    };

    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const shouldAnimate = animated && !prefersReducedMotion;

    // Filter out React HTML props that conflict with Framer Motion
    const {
      onDrag,
      onDragStart,
      onDragEnd,
      onAnimationStart,
      onAnimationEnd,
      ...safeProps
    } = props;

    return (
      <motion.a
        ref={ref}
        href={href}
        className={cn(linkButtonVariants({ variant, className }))}
        initial="initial"
        whileHover={shouldAnimate ? 'hover' : undefined}
        {...safeProps}
      >
        {/* Link text */}
        <span>{children}</span>

        {/* Arrow wrapper with animation */}
        <div className="relative w-[15px] h-[15px] overflow-hidden flex items-center justify-center">
          {shouldAnimate ? (
            <>
              {/* Exit arrow - moves out on hover */}
              <motion.div
                variants={arrowExitVariants}
                className="absolute"
                aria-hidden="true"
              >
                <ArrowUpRight
                  size={15}
                  className={cn(
                    direction === 'forward' ? 'rotate-[-45deg]' : 'rotate-[135deg]'
                  )}
                />
              </motion.div>

              {/* Enter arrow - moves in on hover */}
              <motion.div
                variants={arrowEnterVariants}
                className="absolute"
                aria-hidden="true"
              >
                <ArrowUpRight
                  size={15}
                  className={cn(
                    direction === 'forward' ? 'rotate-[-45deg]' : 'rotate-[135deg]'
                  )}
                />
              </motion.div>
            </>
          ) : (
            // Static arrow when animation is disabled
            <ArrowUpRight
              size={15}
              className={cn(
                direction === 'forward' ? 'rotate-[-45deg]' : 'rotate-[135deg]'
              )}
              aria-hidden="true"
            />
          )}
        </div>
      </motion.a>
    );
  }
);

LinkButton.displayName = 'LinkButton';
