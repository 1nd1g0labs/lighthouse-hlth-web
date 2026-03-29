import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const navlinkVariants = cva(
  'inline-flex items-center font-body text-16 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500/20 px-3 py-2',
  {
    variants: {
      isActive: {
        true: 'text-primary-500 border-b-2 border-primary-500',
        false: 'text-gray-700 hover:text-primary-500',
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

export interface NavlinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navlinkVariants> {
  /**
   * Link destination
   */
  href: string;
  /**
   * Whether the link is currently active (current page)
   */
  isActive?: boolean;
  /**
   * Link text
   */
  children: React.ReactNode;
}

/**
 * Navlink - Navigation link with active state indicator
 *
 * Part of Lighthouse HLTH design system Tier 2 components.
 * Used for main navigation menus in healthcare sustainability dashboards.
 *
 * @example
 * ```tsx
 * <Navlink href="/dashboard" isActive={pathname === '/dashboard'}>
 *   Dashboard
 * </Navlink>
 * ```
 */
export const Navlink = React.forwardRef<HTMLAnchorElement, NavlinkProps>(
  ({ href, isActive, children, className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(navlinkVariants({ isActive }), className)}
        aria-current={isActive ? 'page' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }
);

Navlink.displayName = 'Navlink';
