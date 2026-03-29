/**
 * Lighthouse Health Design System - Color Tokens
 *
 * Version 1.0.0 - Luminous Climate Clinical
 *
 * Brand Philosophy:
 * - "Guidance, not gadgets" – Lighthouse as metaphor for operational clarity
 * - "Environmental intelligence" – Connecting ops metrics with sustainability impact
 * - "Clinical trust" – Premium healthcare tool aesthetic, not consumer wellness app
 * - "Quiet confidence" – Understated, premium, zero cartoon vibes
 *
 * Design Language: "Luminous Climate Clinical"
 * Keywords: luminous, precise, calm, intelligent, sustainable, clinical-but-warm
 *
 * This palette supports both lighthousehlth.com (marketing) and app.lighthousehlth.com (product)
 */

export const colors = {
  // ============================================================================
  // PRIMARY - Deep Teal (Clinical Trust)
  // ============================================================================
  // Conveys trust, healing, environmental stewardship
  // Main brand color: #066E76
  primary: {
    50: '#E6F4F5',
    100: '#CCE8EB',
    200: '#99D1D6',
    300: '#66BAC2',
    400: '#33A3AD',
    500: '#066E76',  // MAIN - Deep Teal (primary buttons, links, charts)
    600: '#055B62',
    700: '#04494E',
    800: '#03363A',
    900: '#022427',
    DEFAULT: '#066E76',
  },

  // ============================================================================
  // PRIMARY SOFT - Soft Teal (Hovers, Secondary Emphasis)
  // ============================================================================
  // Lighter variant for hovers, gradients, secondary elements
  primarySoft: {
    50: '#E7F6F8',
    100: '#CFEDF0',
    200: '#9FDBE2',
    300: '#6FC9D3',
    400: '#3FB7C5',
    500: '#0E9BA7',  // MAIN - Soft Teal (hovers, secondary emphasis)
    600: '#0B7F89',
    700: '#09636B',
    800: '#06474D',
    900: '#042B2F',
    DEFAULT: '#0E9BA7',
  },

  // ============================================================================
  // SUSTAINABILITY - Green (Positive Metrics)
  // ============================================================================
  // For positive metrics: reduced emissions, improved efficiency, success states
  sustainability: {
    50: '#E8F9EE',
    100: '#D1F3DD',
    200: '#A3E7BB',
    300: '#75DB99',
    400: '#47CF77',
    500: '#16A34A',  // MAIN - Sustainability Green
    600: '#12863D',
    700: '#0E6930',
    800: '#0A4C23',
    900: '#062F16',
    DEFAULT: '#16A34A',
  },

  // ============================================================================
  // ACCENT LIME - "Lighthouse Beam" Highlight
  // ============================================================================
  // Sparingly used for hero elements, CTAs, success celebrations
  // Part of the "lighthouse beam" gradient
  lime: {
    50: '#F7FDE5',
    100: '#EFFBCC',
    200: '#DFF799',
    300: '#CFF366',
    400: '#BFEF33',
    500: '#A3E635',  // MAIN - Lighthouse Beam Accent
    600: '#85BD2B',
    700: '#679421',
    800: '#496B17',
    900: '#2B420D',
    DEFAULT: '#A3E635',
  },

  // ============================================================================
  // WARNING - Amber (Attention Needed)
  // ============================================================================
  // Replacing orange with amber for more clinical, B2B feel
  amber: {
    50: '#FFF8EB',
    100: '#FEF0D6',
    200: '#FDE1AD',
    300: '#FCD285',
    400: '#FBC35C',
    500: '#F97316',  // MAIN - Warning Amber
    600: '#E06614',
    700: '#C85912',
    800: '#A04710',
    900: '#78350F',
    DEFAULT: '#F97316',
  },

  // ============================================================================
  // ERROR - Critical Red
  // ============================================================================
  // For critical alerts, errors, high-emission indicators
  critical: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',  // MAIN - Critical Red
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    DEFAULT: '#DC2626',
  },

  // ============================================================================
  // SURFACE & CANVAS - Neutral Backgrounds
  // ============================================================================
  // Clinical, clean surfaces for the "workshop" workspace model
  canvas: {
    light: '#F3F5F7',     // Page backgrounds (slightly warm neutral)
    DEFAULT: '#F3F5F7',
  },
  surface: {
    DEFAULT: '#FFFFFF',   // Cards, panels, content areas
    elevated: '#FFFFFF',  // Elevated cards, modals
    sunken: '#EDF2F7',    // Inset areas, secondary backgrounds
  },

  // ============================================================================
  // BORDERS - Subtle Dividers
  // ============================================================================
  border: {
    subtle: '#E2E8F0',    // Default borders
    DEFAULT: '#E2E8F0',
    muted: '#CBD5E1',     // Slightly more visible borders
    strong: '#94A3B8',    // High contrast borders
  },

  // ============================================================================
  // TEXT - Typography Colors
  // ============================================================================
  text: {
    main: '#0F172A',      // Primary text (slate-900)
    DEFAULT: '#0F172A',
    secondary: '#475569', // Secondary text (slate-600)
    muted: '#64748B',     // Muted text (slate-500)
    disabled: '#94A3B8',  // Disabled text (slate-400)
    inverse: '#FFFFFF',   // Text on dark backgrounds
  },

  // ============================================================================
  // NEUTRAL SCALE - Extended Grays (Backward Compatibility)
  // ============================================================================
  neutral: {
    0: '#FFFFFF',
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
    950: '#020617',
  },

  // ============================================================================
  // SEMANTIC COLORS - Feedback & Status
  // ============================================================================
  semantic: {
    success: {
      light: '#DCFCE7',
      main: '#16A34A',   // Uses sustainability green
      dark: '#14532D',
      contrast: '#FFFFFF',
    },
    warning: {
      light: '#FEF3C7',
      main: '#F97316',   // Uses amber
      dark: '#78350F',
      contrast: '#000000',
    },
    error: {
      light: '#FEE2E2',
      main: '#DC2626',   // Uses critical red
      dark: '#7F1D1D',
      contrast: '#FFFFFF',
    },
    info: {
      light: '#DBEAFE',
      main: '#3B82F6',
      dark: '#1E40AF',
      contrast: '#FFFFFF',
    },
  },

  // ============================================================================
  // GHG EMISSION CATEGORIES - Healthcare Sustainability
  // ============================================================================
  // WCAG 2.1 AA compliant palette for GHG Protocol emission tracking
  // Facility-first model: Scope 1 (on-site), Scope 2 (energy), Scope 3 (supply chain)
  ghg: {
    // Scope 1: Direct Emissions (Stationary/Mobile Combustion, Fugitive)
    // Natural gas, diesel generators, fleet vehicles, anesthetic gases, refrigerants
    scope1: {
      DEFAULT: '#D97706',     // Amber-600 - Direct "burn"
      light: '#FCD34D',
      dark: '#B45309',
      bg: '#FEF3C7',
      border: '#F59E0B',
    },
    // Scope 2: Energy Emissions (Purchased Electricity, Steam, Chilled Water)
    scope2: {
      DEFAULT: '#2563EB',     // Blue-600 - Grid "plug-in"
      light: '#60A5FA',
      dark: '#1E40AF',
      bg: '#DBEAFE',
      border: '#3B82F6',
    },
    // Scope 3: Supply Chain Emissions (Purchased Goods, Waste, Travel)
    // Pharmaceuticals, devices, food, biohazardous waste, commuting
    scope3: {
      DEFAULT: '#0D9488',     // Teal-600 - Supply chain
      light: '#5EEAD4',
      dark: '#115E59',
      bg: '#CCFBF1',
      border: '#14B8A6',
    },
    // Waste Management (subset of Scope 3, Category 5)
    waste: {
      DEFAULT: '#059669',     // Emerald-600
      light: '#6EE7B7',
      dark: '#047857',
      bg: '#D1FAE5',
      border: '#10B981',
    },
  },

  // ============================================================================
  // DATA VISUALIZATION
  // ============================================================================
  dataViz: {
    // Emission severity levels
    emissions: {
      high: '#DC2626',        // Critical red
      medium: '#F97316',      // Warning amber
      low: '#16A34A',         // Sustainability green
      neutral: '#64748B',     // Muted gray
    },
    // Sustainability score thresholds
    sustainability: {
      excellent: '#14532D',   // Dark green (top performer)
      good: '#16A34A',        // Sustainability green
      fair: '#F97316',        // Warning amber
      poor: '#DC2626',        // Critical red
    },
    // Chart palette (use 1-2 colors primarily, expand as needed)
    chart: [
      '#066E76',  // Primary deep teal (primary data series)
      '#16A34A',  // Sustainability green (secondary)
      '#0E9BA7',  // Soft teal (tertiary)
      '#F97316',  // Amber (attention)
      '#3B82F6',  // Info blue
      '#A3E635',  // Lime accent (highlights only)
      '#8B5CF6',  // Purple (extended palette)
      '#EC4899',  // Pink (extended palette)
    ],
  },

  // ============================================================================
  // GRADIENTS - "Lighthouse Beam"
  // ============================================================================
  // Use sparingly: hero CTAs, header accents, success states
  gradients: {
    // Primary lighthouse beam - teal to green to lime
    lighthouseBeam: 'linear-gradient(135deg, #0E9BA7 0%, #16A34A 40%, #A3E635 100%)',
    // Simpler teal gradient for less prominent elements
    primary: 'linear-gradient(135deg, #066E76 0%, #0E9BA7 100%)',
    // Sustainability gradient
    sustainability: 'linear-gradient(135deg, #066E76 0%, #16A34A 100%)',
    // Subtle canvas gradient for backgrounds
    canvas: 'linear-gradient(180deg, #EDF2F7 0%, #F3F5F7 100%)',
    // Success state gradient (app only)
    success: 'linear-gradient(135deg, #16A34A 0%, #A3E635 100%)',
  },

  // ============================================================================
  // LEGACY MAPPINGS (Backward Compatibility)
  // ============================================================================
  // @deprecated - Use new semantic names above
  secondary: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50',
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
    DEFAULT: '#4CAF50',
  },
  // @deprecated - Replaced with amber
  accent: {
    50: '#FFF8EB',
    100: '#FEF0D6',
    200: '#FDE1AD',
    300: '#FCD285',
    400: '#FBC35C',
    500: '#F97316',  // Now using amber instead of orange
    600: '#E06614',
    700: '#C85912',
    800: '#A04710',
    900: '#78350F',
    DEFAULT: '#F97316',
  },
  success: {
    light: '#DCFCE7',
    main: '#16A34A',
    dark: '#14532D',
    DEFAULT: '#16A34A',
  },
  warning: {
    light: '#FEF3C7',
    main: '#F97316',
    dark: '#78350F',
    DEFAULT: '#F97316',
  },
  error: {
    light: '#FEE2E2',
    main: '#DC2626',
    dark: '#7F1D1D',
    DEFAULT: '#DC2626',
  },
  info: {
    light: '#DBEAFE',
    main: '#3B82F6',
    dark: '#1E40AF',
    DEFAULT: '#3B82F6',
  },
} as const;

export type Colors = typeof colors;

/**
 * DESIGN TOKENS - v1.0.0 "Luminous Climate Clinical"
 *
 * BRAND PALETTE:
 * - Primary Deep Teal: #066E76 (buttons, links, primary actions)
 * - Primary Soft Teal: #0E9BA7 (hovers, secondary emphasis, gradients)
 * - Sustainability Green: #16A34A (positive metrics, success states)
 * - Lighthouse Beam Lime: #A3E635 (accent highlights, gradient terminus)
 * - Warning Amber: #F97316 (attention, alerts)
 * - Critical Red: #DC2626 (errors, high emissions)
 *
 * SURFACES:
 * - Canvas: #F3F5F7 (page backgrounds)
 * - Surface: #FFFFFF (cards, panels)
 * - Border Subtle: #E2E8F0 (dividers)
 *
 * TEXT:
 * - Main: #0F172A (primary content)
 * - Muted: #64748B (secondary content)
 *
 * GRADIENT (use sparingly):
 * - Lighthouse Beam: linear-gradient(135deg, #0E9BA7 0%, #16A34A 40%, #A3E635 100%)
 *
 * GHG PROTOCOL CATEGORIES:
 * - Scope 1 (Direct): #D97706 - On-site combustion, fleet, fugitive emissions
 * - Scope 2 (Energy): #2563EB - Purchased electricity, steam, chilled water
 * - Scope 3 (Supply Chain): #0D9488 - Goods, services, waste, travel
 */
