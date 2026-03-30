/**
 * Lighthouse Health Design System - Breakpoint Tokens
 *
 * Responsive design breakpoints for consistent layouts
 */

export const breakpoints = {
  xs: '320px',   // Mobile small
  sm: '640px',   // Mobile
  md: '768px',   // Tablet
  lg: '1024px',  // Laptop
  xl: '1280px',  // Desktop
  '2xl': '1536px', // Large desktop
} as const;

export type Breakpoints = typeof breakpoints;
