/**
 * Framer Motion Compatible Exports
 *
 * These exports are optimized for use in Framer sites and prototypes.
 * All components include proper motion support and Framer-friendly APIs.
 *
 * @example
 * ```tsx
 * import { Button, Card } from '@lighthouse-hlth/ui/framer'
 *
 * // Use in Framer with full motion support
 * export function Component() {
 *   return (
 *     <Card hoverable>
 *       <Button variant="primary">Animated Button</Button>
 *     </Card>
 *   )
 * }
 * ```
 */

// Re-export all components (they already use framer-motion internally)
export * from '../index';

// Framer-specific utilities and presets
export const framerAnimations = {
  // Page transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },

  // Card hover animations
  cardHover: {
    whileHover: { y: -4, transition: { duration: 0.2 } },
    whileTap: { scale: 0.98 },
  },

  // Button animations
  buttonHover: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  },

  // Fade in animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 },
  },

  // Slide in from bottom
  slideInBottom: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Slide in from left
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Slide in from right
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Scale in
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  // Stagger children
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
} as const;

// Framer Code Component helpers
export const FramerCodeComponentProps = {
  Button: {
    variant: {
      type: 'enum',
      options: ['primary', 'secondary', 'accent', 'outline', 'ghost', 'destructive'],
      defaultValue: 'primary',
    },
    size: {
      type: 'enum',
      options: ['sm', 'md', 'lg', 'xl'],
      defaultValue: 'md',
    },
    children: {
      type: 'string',
      defaultValue: 'Button',
    },
  },
  Card: {
    variant: {
      type: 'enum',
      options: ['default', 'elevated', 'outline', 'ghost', 'sustainability'],
      defaultValue: 'default',
    },
    padding: {
      type: 'enum',
      options: ['none', 'sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    hoverable: {
      type: 'boolean',
      defaultValue: false,
    },
  },
  Badge: {
    variant: {
      type: 'enum',
      options: [
        'default',
        'primary',
        'secondary',
        'accent',
        'success',
        'warning',
        'error',
        'emissionsLow',
        'emissionsMedium',
        'emissionsHigh',
      ],
      defaultValue: 'default',
    },
    size: {
      type: 'enum',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
  },
} as const;
