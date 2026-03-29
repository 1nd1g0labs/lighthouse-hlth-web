import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const faqButtonVariants = cva(
  'inline-flex items-center justify-between w-full font-body text-16 rounded-md px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500/20',
  {
    variants: {
      isActive: {
        true: 'bg-primary-500 text-white',
        false: 'bg-transparent text-black hover:bg-gray-50',
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

export interface FAQButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>,
    VariantProps<typeof faqButtonVariants> {
  /**
   * Whether the FAQ item is expanded
   */
  isActive?: boolean;
  /**
   * Callback when the button is toggled
   */
  onToggle?: () => void;
  /**
   * The question text to display
   */
  children: React.ReactNode;
}

/**
 * FAQButton - Accordion button for FAQ items with active/inactive states
 *
 * Part of Lighthouse HLTH design system Tier 2 components.
 * Used for patient education materials and healthcare sustainability FAQs.
 *
 * @example
 * ```tsx
 * <FAQButton isActive={isOpen} onToggle={() => setIsOpen(!isOpen)}>
 *   What is operational sustainability?
 * </FAQButton>
 * ```
 */
export const FAQButton = React.forwardRef<HTMLButtonElement, FAQButtonProps>(
  ({ isActive, onToggle, children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(faqButtonVariants({ isActive }), className)}
        onClick={onToggle}
        aria-expanded={isActive}
        {...props}
      >
        <span className="flex-1 text-left">{children}</span>
        <ChevronDown
          className={cn(
            'ml-2 h-5 w-5 flex-shrink-0 transition-transform duration-200',
            isActive && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>
    );
  }
);

FAQButton.displayName = 'FAQButton';
