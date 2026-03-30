/**
 * Lighthouse Health Design System - Spacing Tokens
 *
 * Version 0.3.0 - Framer Aligned
 *
 * Design Philosophy:
 * - 4px base unit for mathematical consistency
 * - "Less is more" - generous whitespace for clarity
 * - Harmonious rhythm throughout the interface
 *
 * Framer Alignment:
 * Added Framer-specific gap values (5px, 7px, 9px) while maintaining
 * the standard 4px-based spacing scale for backward compatibility.
 */

export const spacing = {
  // Base spacing scale (4px increments)
  0: '0',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.25: '0.3125rem', // 5px - Framer gap
  1.5: '0.375rem',   // 6px
  1.75: '0.4375rem', // 7px - Framer gap
  2: '0.5rem',       // 8px
  2.25: '0.5625rem', // 9px - Framer gap
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  11: '2.75rem',     // 44px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
  36: '9rem',        // 144px
  40: '10rem',       // 160px
  44: '11rem',       // 176px
  48: '12rem',       // 192px
  52: '13rem',       // 208px
  56: '14rem',       // 224px
  60: '15rem',       // 240px
  64: '16rem',       // 256px
  72: '18rem',       // 288px
  80: '20rem',       // 320px
  96: '24rem',       // 384px
} as const;

// Semantic spacing for common UI patterns
export const semanticSpacing = {
  // Component internal padding
  componentPadding: {
    xs: spacing[1],      // 4px
    sm: spacing[2],      // 8px
    md: spacing[4],      // 16px
    lg: spacing[6],      // 24px
    xl: spacing[8],      // 32px
  },

  // Gaps between elements
  gap: {
    xs: spacing[1],      // 4px
    sm: spacing[2],      // 8px
    md: spacing[4],      // 16px
    lg: spacing[6],      // 24px
    xl: spacing[8],      // 32px

    // Framer-specific gaps
    framer5: spacing[1.25],  // 5px - Framer gap
    framer7: spacing[1.75],  // 7px - Framer gap
    framer9: spacing[2.25],  // 9px - Framer gap
  },

  // Section spacing
  section: {
    xs: spacing[8],      // 32px
    sm: spacing[12],     // 48px
    md: spacing[16],     // 64px
    lg: spacing[24],     // 96px
    xl: spacing[32],     // 128px
  },

  // Container padding
  container: {
    xs: spacing[4],      // 16px
    sm: spacing[6],      // 24px
    md: spacing[8],      // 32px
    lg: spacing[12],     // 48px
    xl: spacing[16],     // 64px
  },
} as const;

export type Spacing = typeof spacing;
export type SemanticSpacing = typeof semanticSpacing;

/**
 * FRAMER ALIGNMENT NOTES:
 *
 * v0.3.0 adds Framer-specific spacing values:
 * - spacing[1.25] = 5px (Framer gap)
 * - spacing[1.75] = 7px (Framer gap)
 * - spacing[2.25] = 9px (Framer gap)
 *
 * These are accessible in Tailwind via:
 * - gap-1.25 (5px)
 * - gap-1.75 (7px)
 * - gap-2.25 (9px)
 * - p-1.25, m-1.75, etc.
 *
 * All existing spacing values remain unchanged for backward compatibility.
 */
