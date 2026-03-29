/**
 * Lighthouse Health Design System - Shadow Tokens
 *
 * Version 1.0.0 - Luminous Climate Clinical
 *
 * Design Philosophy: "Soft Layered Surfaces"
 * - Bi-directional shadows for premium depth without harsh edges
 * - Professional appearance supporting healthcare credibility
 * - "Grown-up neumorphism" - soft depth without accessibility issues
 * - Elevation hierarchy for interactive elements
 *
 * Shadow Strategy:
 * - Cards: Soft bi-directional shadows (light from top-left)
 * - Inputs/Inactive: Subtle inset shadows
 * - Interactive: Progressive elevation on hover/focus
 * - Focus states: Sustainability green glow
 */

export const shadows = {
  // ============================================================================
  // NONE - Flat Elements
  // ============================================================================
  none: 'none',

  // ============================================================================
  // SOFT LAYERED SURFACES - Primary card treatment
  // ============================================================================
  // Bi-directional shadows create depth without harsh edges
  // Dark shadow (bottom-right) + light highlight (top-left)

  // Standard soft surface (cards, panels)
  soft: '10px 10px 30px rgba(15, 23, 42, 0.12), -8px -8px 20px rgba(255, 255, 255, 0.9)',

  // Smaller soft shadow for compact elements
  softSm: '6px 6px 16px rgba(15, 23, 42, 0.08), -4px -4px 12px rgba(255, 255, 255, 0.9)',

  // Larger soft shadow for elevated elements (hover states, modals)
  softLg: '14px 14px 40px rgba(15, 23, 42, 0.15), -10px -10px 28px rgba(255, 255, 255, 0.9)',

  // ============================================================================
  // INSET SHADOWS - Inputs, inactive controls, sunken areas
  // ============================================================================
  // Creates subtle "pressed in" effect for form controls

  // Standard inset for inputs and inactive widgets
  inset: 'inset 1px 1px 3px rgba(148, 163, 184, 0.4), inset -1px -1px 3px rgba(255, 255, 255, 0.9)',

  // Deeper inset for active/pressed states
  insetDeep: 'inset 2px 2px 5px rgba(148, 163, 184, 0.5), inset -2px -2px 5px rgba(255, 255, 255, 0.95)',

  // Subtle inset for sunken areas (secondary backgrounds)
  insetSubtle: 'inset 1px 1px 2px rgba(148, 163, 184, 0.25), inset -1px -1px 2px rgba(255, 255, 255, 0.8)',

  // ============================================================================
  // ELEVATION SCALE - Progressive depth hierarchy
  // ============================================================================
  // Use for interactive elements that need clear elevation

  // xs: Subtle lift (badges, tags)
  xs: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',

  // sm: Small lift (buttons, small cards)
  sm: '0 1px 3px 0 rgba(15, 23, 42, 0.1), 0 1px 2px -1px rgba(15, 23, 42, 0.1)',

  // md: Medium elevation (cards, dropdowns)
  md: '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.1)',

  // lg: High elevation (popovers, floating panels)
  lg: '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.1)',

  // xl: Very high elevation (modals, drawers)
  xl: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.1)',

  // 2xl: Maximum elevation (critical overlays)
  '2xl': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',

  // ============================================================================
  // FOCUS STATES - Accessibility-compliant focus indicators
  // ============================================================================
  // Using sustainability green (#22C55E) for focus glow
  // Ensures 3:1 contrast ratio for focus indicators

  focus: {
    // Primary focus ring (sustainability green)
    primary: '0 0 0 2px rgba(34, 197, 94, 0.6)',

    // Primary with offset (for dark backgrounds)
    primaryOffset: '0 0 0 2px #FFFFFF, 0 0 0 4px rgba(34, 197, 94, 0.6)',

    // Deep teal focus (alternative for green-heavy contexts)
    secondary: '0 0 0 2px rgba(6, 110, 118, 0.5)',

    // Error focus (for validation states)
    error: '0 0 0 2px rgba(220, 38, 38, 0.5)',

    // Soft teal focus (for subtle emphasis)
    soft: '0 0 0 2px rgba(14, 155, 167, 0.4)',
  },

  // ============================================================================
  // SEMANTIC SHADOWS - Component-specific patterns
  // ============================================================================

  // Card: Standard soft surface treatment
  card: '10px 10px 30px rgba(15, 23, 42, 0.12), -8px -8px 20px rgba(255, 255, 255, 0.9)',

  // Card hover: Slightly elevated on interaction
  cardHover: '12px 12px 35px rgba(15, 23, 42, 0.14), -10px -10px 24px rgba(255, 255, 255, 0.92)',

  // Input default: Subtle inset
  input: 'inset 1px 1px 3px rgba(148, 163, 184, 0.4), inset -1px -1px 3px rgba(255, 255, 255, 0.9)',

  // Input focused: Inset + focus ring
  inputFocus: 'inset 1px 1px 3px rgba(148, 163, 184, 0.4), inset -1px -1px 3px rgba(255, 255, 255, 0.9), 0 0 0 2px rgba(34, 197, 94, 0.6)',

  // Button primary: Soft shadow with slight lift
  button: '4px 4px 12px rgba(15, 23, 42, 0.15), -2px -2px 8px rgba(255, 255, 255, 0.8)',

  // Button hover: More pronounced lift
  buttonHover: '6px 6px 16px rgba(15, 23, 42, 0.18), -3px -3px 10px rgba(255, 255, 255, 0.85)',

  // Button pressed: Slight inset effect
  buttonPressed: 'inset 2px 2px 4px rgba(15, 23, 42, 0.15), inset -1px -1px 3px rgba(255, 255, 255, 0.5)',

  // Dropdown/select menus
  dropdown: '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.1)',

  // Modal/dialog overlay
  modal: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',

  // Tooltip (small floating element)
  tooltip: '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.1)',

  // Toast notifications
  toast: '0 10px 15px -3px rgba(15, 23, 42, 0.15), 0 4px 6px -4px rgba(15, 23, 42, 0.1)',

  // Navigation sidebar (elevated panel)
  nav: '4px 0 12px rgba(15, 23, 42, 0.08)',

  // Right context panel (shifting context builder)
  contextPanel: '-4px 0 12px rgba(15, 23, 42, 0.08)',

  // ============================================================================
  // DATA VISUALIZATION - Chart-specific shadows
  // ============================================================================

  // KPI card: Prominent for key metrics
  kpiCard: '8px 8px 24px rgba(15, 23, 42, 0.1), -6px -6px 18px rgba(255, 255, 255, 0.9)',

  // Alert card: Slightly elevated to draw attention
  alert: '0 4px 12px rgba(15, 23, 42, 0.12)',

  // Table header: Subtle bottom shadow
  tableHeader: '0 1px 3px rgba(15, 23, 42, 0.08)',

  // Facility node (hierarchy visualization)
  facilityNode: '6px 6px 16px rgba(15, 23, 42, 0.1), -4px -4px 12px rgba(255, 255, 255, 0.9)',

} as const;

export type Shadows = typeof shadows;

/**
 * SHADOW USAGE GUIDE - "Soft Layered Surfaces"
 *
 * WORKSPACE PANELS (Facility Director / CFO views):
 * - Left Nav: shadows.nav
 * - Center Content: shadows.soft or shadows.card
 * - Right Context Panel: shadows.contextPanel
 *
 * CARDS & CONTAINERS:
 * - Standard cards: shadows.soft or shadows.card
 * - Hover state: shadows.cardHover
 * - KPI metrics: shadows.kpiCard
 * - Alert cards: shadows.alert
 *
 * FORM CONTROLS:
 * - Input default: shadows.input (inset)
 * - Input focused: shadows.inputFocus (inset + green ring)
 * - Buttons: shadows.button
 * - Button hover: shadows.buttonHover
 * - Button pressed: shadows.buttonPressed
 *
 * OVERLAYS (use sparingly in workshop model):
 * - Dropdowns: shadows.dropdown
 * - Tooltips: shadows.tooltip
 * - Toasts: shadows.toast
 * - Modals (if needed): shadows.modal
 *
 * FOCUS STATES (accessibility):
 * - Primary focus: shadows.focus.primary
 * - On dark bg: shadows.focus.primaryOffset
 * - Error context: shadows.focus.error
 *
 * CSS CUSTOM PROPERTY USAGE:
 * :root {
 *   --lh-shadow-soft: 10px 10px 30px rgba(15, 23, 42, 0.12), -8px -8px 20px rgba(255, 255, 255, 0.9);
 *   --lh-shadow-inset: inset 1px 1px 3px rgba(148, 163, 184, 0.4), inset -1px -1px 3px rgba(255, 255, 255, 0.9);
 *   --lh-shadow-focus: 0 0 0 2px rgba(34, 197, 94, 0.6);
 * }
 */
