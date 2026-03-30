import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Mail, Phone, MapPin } from 'lucide-react';
import { cn } from '../../utils/cn';

const contactLinkVariants = cva(
  'inline-flex items-center gap-2 font-body text-16 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500/20',
  {
    variants: {
      variant: {
        default: 'text-gray-900 hover:text-primary-500',
        primary: 'text-primary-500 hover:text-primary-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const iconMap = {
  email: Mail,
  phone: Phone,
  location: MapPin,
};

const iconColorMap = {
  default: 'text-primary-500',
  primary: 'text-primary-500',
};

export interface ContactLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof contactLinkVariants> {
  /**
   * Type of contact link
   */
  icon: 'email' | 'phone' | 'location';
  /**
   * Link destination (mailto:, tel:, or maps URL)
   */
  href: string;
  /**
   * Contact information text
   */
  children: React.ReactNode;
}

/**
 * ContactLink - Contact link with icon (email, phone, location)
 *
 * Part of Lighthouse HLTH design system Tier 2 components.
 * Used for displaying contact information in healthcare applications.
 *
 * @example
 * ```tsx
 * <ContactLink icon="email" href="mailto:hello@lighthousehlth.com">
 *   hello@lighthousehlth.com
 * </ContactLink>
 * ```
 */
export const ContactLink = React.forwardRef<HTMLAnchorElement, ContactLinkProps>(
  ({ icon, href, variant, children, className, ...props }, ref) => {
    const Icon = iconMap[icon];

    return (
      <a
        ref={ref}
        href={href}
        className={cn(contactLinkVariants({ variant }), className)}
        {...props}
      >
        <Icon
          className={cn('h-5 w-5 flex-shrink-0', iconColorMap[variant || 'default'])}
          aria-hidden="true"
        />
        <span>{children}</span>
      </a>
    );
  }
);

ContactLink.displayName = 'ContactLink';
