/**
 * GHG Emission Category Colors for Charts
 *
 * Provides standardized color constants for charting libraries (Recharts, Chart.js, D3, etc.)
 * following GHG Protocol standards with WCAG 2.1 AA compliance.
 *
 * @example
 * ```tsx
 * import { ghgColors, ghgChartColors, ghgStackingOrder } from '@lighthouse-hlth/ui';
 *
 * // In Recharts
 * <BarChart data={data}>
 *   <Bar dataKey="scope1" fill={ghgChartColors.scope1} />
 *   <Bar dataKey="scope2" fill={ghgChartColors.scope2} />
 * </BarChart>
 *
 * // In Chart.js
 * const config = {
 *   datasets: [{
 *     backgroundColor: ghgChartColors.all,
 *   }]
 * };
 * ```
 */

/**
 * Core GHG category colors with all variants
 * Use for component styling and Tailwind classes
 */
export const ghgColors = {
  scope1: {
    DEFAULT: '#D97706', // Amber-600
    light: '#FCD34D', // Amber-300
    dark: '#B45309', // Amber-700
    bg: '#FEF3C7', // Amber-100
    border: '#F59E0B', // Amber-500
  },
  scope2: {
    DEFAULT: '#2563EB', // Blue-600
    light: '#60A5FA', // Blue-400
    dark: '#1E40AF', // Blue-700
    bg: '#DBEAFE', // Blue-100
    border: '#3B82F6', // Blue-500
  },
  scope3: {
    DEFAULT: '#0D9488', // Teal-600
    light: '#5EEAD4', // Teal-300
    dark: '#115E59', // Teal-700
    bg: '#CCFBF1', // Teal-100
    border: '#14B8A6', // Teal-500
  },
  waste: {
    DEFAULT: '#059669', // Emerald-600
    light: '#6EE7B7', // Emerald-300
    dark: '#047857', // Emerald-700
    bg: '#D1FAE5', // Emerald-100
    border: '#10B981', // Emerald-500
  },
} as const;

/**
 * Chart-ready color constants
 * Use directly in chart library configurations
 */
export const ghgChartColors = {
  scope1: ghgColors.scope1.DEFAULT,
  scope2: ghgColors.scope2.DEFAULT,
  scope3: ghgColors.scope3.DEFAULT,
  waste: ghgColors.waste.DEFAULT,

  // Array of all colors for multi-series charts
  all: [
    ghgColors.scope1.DEFAULT,
    ghgColors.scope2.DEFAULT,
    ghgColors.scope3.DEFAULT,
    ghgColors.waste.DEFAULT,
  ],

  // Light variants for secondary series or backgrounds
  light: {
    scope1: ghgColors.scope1.light,
    scope2: ghgColors.scope2.light,
    scope3: ghgColors.scope3.light,
    waste: ghgColors.waste.light,
    all: [
      ghgColors.scope1.light,
      ghgColors.scope2.light,
      ghgColors.scope3.light,
      ghgColors.waste.light,
    ],
  },

  // Dark variants for hover states or emphasis
  dark: {
    scope1: ghgColors.scope1.dark,
    scope2: ghgColors.scope2.dark,
    scope3: ghgColors.scope3.dark,
    waste: ghgColors.waste.dark,
    all: [
      ghgColors.scope1.dark,
      ghgColors.scope2.dark,
      ghgColors.scope3.dark,
      ghgColors.waste.dark,
    ],
  },
} as const;

/**
 * Recommended stacking order for stacked charts
 * Orders categories by typical magnitude in healthcare settings
 */
export const ghgStackingOrder = [
  'scope2', // Largest: Energy/electricity (typically 40-50% of total)
  'scope1', // Second: Direct emissions (typically 30-40%)
  'scope3', // Third: Supply chain (typically 15-25%)
  'waste', // Smallest: Waste management (typically 5-10%)
] as const;

/**
 * Category metadata for labels and descriptions
 * Use for tooltips, legends, and documentation
 */
export const ghgCategoryMetadata = {
  scope1: {
    label: 'Scope 1',
    fullLabel: 'Scope 1: Direct Emissions',
    description: 'On-site fuel combustion, company vehicles, fugitive emissions',
    examples: [
      'Natural gas for heating',
      'Fleet vehicles',
      'Emergency generators',
      'Anesthetic gases',
    ],
    color: ghgColors.scope1.DEFAULT,
  },
  scope2: {
    label: 'Scope 2',
    fullLabel: 'Scope 2: Energy Emissions',
    description: 'Purchased electricity, steam, heating, and cooling',
    examples: [
      'Grid electricity',
      'Purchased steam',
      'District heating/cooling',
      'Medical equipment power',
    ],
    color: ghgColors.scope2.DEFAULT,
  },
  scope3: {
    label: 'Scope 3',
    fullLabel: 'Scope 3: Supply Chain Emissions',
    description: 'All other indirect emissions in the value chain',
    examples: [
      'Purchased goods (medical supplies)',
      'Transportation and distribution',
      'Business travel',
      'Employee commuting',
    ],
    color: ghgColors.scope3.DEFAULT,
  },
  waste: {
    label: 'Waste',
    fullLabel: 'Waste Management',
    description: 'Waste disposal, treatment, and recycling',
    examples: [
      'Medical waste incineration',
      'Landfill disposal',
      'Hazardous waste treatment',
      'Recycling programs',
    ],
    color: ghgColors.waste.DEFAULT,
  },
} as const;

/**
 * Chart.js configuration helper
 * Returns Chart.js compatible color configuration
 */
export const getChartJsColors = (categories: Array<keyof typeof ghgColors>) => ({
  backgroundColor: categories.map((cat) => ghgColors[cat].DEFAULT),
  borderColor: categories.map((cat) => ghgColors[cat].border),
  hoverBackgroundColor: categories.map((cat) => ghgColors[cat].dark),
  hoverBorderColor: categories.map((cat) => ghgColors[cat].dark),
});

/**
 * Recharts configuration helper
 * Returns Recharts compatible color configuration
 */
export const getRechartsColors = (categories: Array<keyof typeof ghgColors>) => {
  return categories.reduce(
    (acc, cat) => ({
      ...acc,
      [cat]: {
        fill: ghgColors[cat].DEFAULT,
        stroke: ghgColors[cat].border,
      },
    }),
    {} as Record<keyof typeof ghgColors, { fill: string; stroke: string }>
  );
};

/**
 * D3 color scale helper
 * Returns function compatible with D3 scale patterns
 */
export const getD3ColorScale = () => {
  const categoryToColor = new Map<string, string>([
    ['scope1', ghgColors.scope1.DEFAULT],
    ['scope2', ghgColors.scope2.DEFAULT],
    ['scope3', ghgColors.scope3.DEFAULT],
    ['waste', ghgColors.waste.DEFAULT],
  ]);

  return (category: string) => categoryToColor.get(category) || ghgColors.scope1.DEFAULT;
};

/**
 * CSS variable names for dynamic theming
 * Use in CSS/Tailwind when you need custom property access
 */
export const ghgCssVars = {
  scope1: {
    DEFAULT: '--color-scope1',
    light: '--color-scope1-light',
    dark: '--color-scope1-dark',
    bg: '--color-scope1-bg',
    border: '--color-scope1-border',
  },
  scope2: {
    DEFAULT: '--color-scope2',
    light: '--color-scope2-light',
    dark: '--color-scope2-dark',
    bg: '--color-scope2-bg',
    border: '--color-scope2-border',
  },
  scope3: {
    DEFAULT: '--color-scope3',
    light: '--color-scope3-light',
    dark: '--color-scope3-dark',
    bg: '--color-scope3-bg',
    border: '--color-scope3-border',
  },
  waste: {
    DEFAULT: '--color-waste',
    light: '--color-waste-light',
    dark: '--color-waste-dark',
    bg: '--color-waste-bg',
    border: '--color-waste-border',
  },
} as const;

/**
 * Typical emission percentages for healthcare facilities
 * Use for example data or validation
 */
export const typicalHealthcareEmissionSplit = {
  scope1: 0.35, // 35%
  scope2: 0.45, // 45%
  scope3: 0.15, // 15%
  waste: 0.05, // 5%
} as const;

/**
 * Format category name for display
 */
export const formatCategoryLabel = (
  category: keyof typeof ghgColors,
  format: 'short' | 'full' | 'description' = 'short'
): string => {
  const metadata = ghgCategoryMetadata[category];
  switch (format) {
    case 'short':
      return metadata.label;
    case 'full':
      return metadata.fullLabel;
    case 'description':
      return metadata.description;
    default:
      return metadata.label;
  }
};

/**
 * Get color by category with optional variant
 */
export const getCategoryColor = (
  category: keyof typeof ghgColors,
  variant: 'DEFAULT' | 'light' | 'dark' | 'bg' | 'border' = 'DEFAULT'
): string => {
  return ghgColors[category][variant];
};

// Type exports for TypeScript consumers
export type GHGCategory = keyof typeof ghgColors;
export type GHGColorVariant = keyof (typeof ghgColors)['scope1'];
export type GHGStackingOrder = (typeof ghgStackingOrder)[number];
