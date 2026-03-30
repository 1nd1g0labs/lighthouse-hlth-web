import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const footerLinkVariants = cva(
  'inline-flex items-center font-body text-14 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500/20',
  {
    variants: {
      variant: {
        default: 'text-gray-600 hover:text-primary-500',
        light: 'text-gray-400 hover:text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface FooterLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof footerLinkVariants> {
  /**
   * Link destination
   */
  href: string;
  /**
   * Link text
   */
  children: React.ReactNode;
}

/**
 * FooterLink - Footer link with subtle hover effect
 *
 * Part of Lighthouse HLTH design system Tier 2 components.
 * Used for footer navigation in healthcare sustainability applications.
 *
 * @example
 * ```tsx
 * <FooterLink href="/privacy" variant="default">
 *   Privacy Policy
 * </FooterLink>
 * ```
 */
export const FooterLink = React.forwardRef<HTMLAnchorElement, FooterLinkProps>(
  ({ href, variant, children, className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(footerLinkVariants({ variant }), className)}
        {...props}
      >
        {children}
      </a>
    );
  }
);

FooterLink.displayName = 'FooterLink';
