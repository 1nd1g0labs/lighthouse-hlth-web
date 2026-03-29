import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * GHGCategoryBadge Component
 *
 * Display badge for Greenhouse Gas emission categories following healthcare sustainability standards.
 * Implements WCAG 2.1 AA compliant color palette for accessibility.
 *
 * Categories:
 * - Scope 1: Direct emissions (on-site fuel combustion, company vehicles)
 * - Scope 2: Indirect emissions from purchased energy/electricity
 * - Scope 3: All other indirect emissions in supply chain
 * - Waste: Waste management related emissions
 *
 * @example
 * ```tsx
 * <GHGCategoryBadge category="scope1" size="md">
 *   Scope 1 Emissions
 * </GHGCategoryBadge>
 *
 * <GHGCategoryBadge category="scope2" variant="outline" size="sm">
 *   Energy
 * </GHGCategoryBadge>
 * ```
 */

const ghgCategoryBadgeVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-medium',
    'transition-colors duration-150',
    'select-none',
  ].join(' '),
  {
    variants: {
      category: {
        scope1: '',
        scope2: '',
        scope3: '',
        waste: '',
      },
      variant: {
        solid: '',
        outline: 'border-2 bg-transparent',
        light: '',
      },
      size: {
        sm: 'text-xs px-2 py-0.5 rounded-[0.25rem]',
        md: 'text-sm px-2.5 py-0.5 rounded-[0.375rem]',
        lg: 'text-base px-3 py-1 rounded-[0.5rem]',
      },
      pill: {
        true: 'rounded-full',
      },
    },
    compoundVariants: [
      // Scope 1 (Amber) - Direct Emissions
      {
        category: 'scope1',
        variant: 'solid',
        className: 'bg-scope1 text-white',
      },
      {
        category: 'scope1',
        variant: 'outline',
        className: 'border-scope1-border text-scope1-dark',
      },
      {
        category: 'scope1',
        variant: 'light',
        className: 'bg-scope1-bg text-scope1-dark',
      },
      // Scope 2 (Blue) - Energy/Electricity
      {
        category: 'scope2',
        variant: 'solid',
        className: 'bg-scope2 text-white',
      },
      {
        category: 'scope2',
        variant: 'outline',
        className: 'border-scope2-border text-scope2-dark',
      },
      {
        category: 'scope2',
        variant: 'light',
        className: 'bg-scope2-bg text-scope2-dark',
      },
      // Scope 3 (Teal) - Supply Chain
      {
        category: 'scope3',
        variant: 'solid',
        className: 'bg-scope3 text-white',
      },
      {
        category: 'scope3',
        variant: 'outline',
        className: 'border-scope3-border text-scope3-dark',
      },
      {
        category: 'scope3',
        variant: 'light',
        className: 'bg-scope3-bg text-scope3-dark',
      },
      // Waste (Emerald) - Waste Management
      {
        category: 'waste',
        variant: 'solid',
        className: 'bg-waste text-white',
      },
      {
        category: 'waste',
        variant: 'outline',
        className: 'border-waste-border text-waste-dark',
      },
      {
        category: 'waste',
        variant: 'light',
        className: 'bg-waste-bg text-waste-dark',
      },
    ],
    defaultVariants: {
      category: 'scope1',
      variant: 'solid',
      size: 'md',
    },
  }
);

export interface GHGCategoryBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ghgCategoryBadgeVariants> {
  /**
   * Icon to display on the left side of the badge
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon to display on the right side of the badge
   */
  rightIcon?: React.ReactNode;
  /**
   * GHG emission category
   * - scope1: Direct emissions (on-site fuel, vehicles)
   * - scope2: Energy/electricity emissions
   * - scope3: Supply chain emissions
   * - waste: Waste management
   */
  category?: 'scope1' | 'scope2' | 'scope3' | 'waste';
  /**
   * Visual variant style
   * - solid: Filled background with white text
   * - outline: Border only with colored text
   * - light: Light background with dark text
   */
  variant?: 'solid' | 'outline' | 'light';
  /**
   * Badge size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Apply pill-shaped border radius
   */
  pill?: boolean;
}

/**
 * GHGCategoryBadge - Display badge for GHG emission categories
 *
 * Healthcare sustainability component with WCAG 2.1 AA compliance.
 * Use for emission tracking, charts, and dashboards.
 */
export const GHGCategoryBadge = forwardRef<HTMLDivElement, GHGCategoryBadgeProps>(
  ({ className, category, variant, size, pill, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(ghgCategoryBadgeVariants({ category, variant, size, pill, className }))}
        role="status"
        aria-label={`GHG Category: ${category}`}
        {...props}
      >
        {leftIcon && <span className="mr-1">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-1">{rightIcon}</span>}
      </div>
    );
  }
);

GHGCategoryBadge.displayName = 'GHGCategoryBadge';
