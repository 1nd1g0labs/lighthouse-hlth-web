/**
 * Lighthouse Health Design System - Design Tokens
 *
 * A comprehensive design token system embodying the brand values:
 * - "Be green, feel green" - Sustainable, environmental consciousness
 * - "Less is more" - Minimalist, purposeful design
 * - "Sustainable footprint, sustainable financial health" - Dual sustainability focus
 *
 * Inspired by forward-thinking healthcare sustainability leaders like Providence Health
 */

export { colors, type Colors } from './colors';
export { typography, type Typography } from './typography';
export { spacing, semanticSpacing, type Spacing, type SemanticSpacing } from './spacing';
export { shadows, type Shadows } from './shadows';
export { radii, type Radii } from './radii';
export { breakpoints, type Breakpoints } from './breakpoints';
export { zIndex, type ZIndex } from './zIndex';
export { animation, type Animation } from './animation';

// Complete design token export
export const tokens = {
  colors: require('./colors').colors,
  typography: require('./typography').typography,
  spacing: require('./spacing').spacing,
  semanticSpacing: require('./spacing').semanticSpacing,
  shadows: require('./shadows').shadows,
  radii: require('./radii').radii,
  breakpoints: require('./breakpoints').breakpoints,
  zIndex: require('./zIndex').zIndex,
  animation: require('./animation').animation,
} as const;
