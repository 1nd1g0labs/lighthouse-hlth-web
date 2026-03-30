import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Github } from 'lucide-react';
import { cn } from '../../utils/cn';

const socialIconVariants = cva(
  'inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500/20',
  {
    variants: {
      variant: {
        default:
          'bg-white text-primary-500 hover:bg-primary-500 hover:text-white border border-gray-200',
        filled: 'bg-primary-500 text-white hover:bg-primary-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const platformIcons = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  github: Github,
};

const platformLabels = {
  facebook: 'Facebook',
  twitter: 'Twitter',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  youtube: 'YouTube',
  github: 'GitHub',
};

export interface SocialIconProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'>,
    VariantProps<typeof socialIconVariants> {
  /**
   * Social media platform
   */
  platform: 'facebook' | 'twitter' | 'linkedin' | 'instagram' | 'youtube' | 'github';
  /**
   * Link destination URL
   */
  href: string;
  /**
   * Custom ARIA label (defaults to platform name)
   */
  ariaLabel?: string;
}

/**
 * SocialIcon - Social media icon button with hover effect
 *
 * Part of Lighthouse HLTH design system Tier 2 components.
 * Used for connecting healthcare communities and sharing sustainability initiatives.
 *
 * @example
 * ```tsx
 * <SocialIcon
 *   platform="linkedin"
 *   href="https://linkedin.com/company/lighthouse-hlth"
 *   variant="default"
 * />
 * ```
 */
export const SocialIcon = React.forwardRef<HTMLAnchorElement, SocialIconProps>(
  ({ platform, href, variant, ariaLabel, className, ...props }, ref) => {
    const Icon = platformIcons[platform];
    const label = ariaLabel || platformLabels[platform];

    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(socialIconVariants({ variant }), className)}
        aria-label={label}
        {...props}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </a>
    );
  }
);

SocialIcon.displayName = 'SocialIcon';
