/**
 * Lighthouse Health Design System - Z-Index Tokens
 *
 * Layering system for stacking contexts
 */

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
} as const;

export type ZIndex = typeof zIndex;
