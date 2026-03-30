/**
 * Lighthouse Health Design System - Typography Tokens
 *
 * Version 1.0.0 - Luminous Climate Clinical
 *
 * Design Philosophy:
 * - Clean, professional sans-serif for healthcare credibility
 * - Excellent readability for clinical and data-heavy content
 * - Clear hierarchy supporting "quiet confidence" brand
 * - Two scales: Marketing (generous) + App (dense but readable)
 *
 * Typography Strategy:
 * - Marketing (lighthousehlth.com): Framer-aligned scale, generous line heights
 * - App (app.lighthousehlth.com): Tighter scale for information density
 * - Both use Inter as the primary typeface
 */

export const typography = {
  // ============================================================================
  // FONT FAMILIES
  // ============================================================================
  fonts: {
    sans: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", Consolas, Monaco, "Courier New", monospace',
    display: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  // ============================================================================
  // FONT SIZES - Dual Scale System
  // ============================================================================

  // MARKETING SCALE (lighthousehlth.com)
  // Generous sizes for landing pages, hero sections, storytelling
  fontSize: {
    // Marketing Headings (Framer-aligned)
    h1: '54px',      // Framer /Heading xl - Hero headlines
    h2: '42px',      // Framer /Heading l - Section titles
    h3: '38px',      // Framer /Heading m - Subsections
    h4: '32px',      // Framer /Heading s - Card headers
    h5: '28px',      // Framer /Heading xs - Secondary headers
    h6: '24px',      // Framer /Heading xxs - Tertiary headers

    // Marketing Body (Framer-aligned)
    bodyXl: '20px',  // Framer /Paragraph xl - Lead paragraphs
    bodyLg: '18px',  // Framer /Paragraph l - Large body text
    body: '16px',    // Framer /Paragraph m - Standard body
    bodySm: '14px',  // Framer /Paragraph s - Small body

    // Standard sizes (backward compatibility)
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },

  // APP SCALE (app.lighthousehlth.com)
  // Denser typography for data-heavy dashboards
  // Optimized for healthcare professionals scanning KPIs
  appFontSize: {
    // App Headings (more compact)
    h1: '32px',      // Page titles (Dashboard, Reports)
    h2: '24px',      // Panel headers
    h3: '20px',      // Card titles, section headers
    h4: '18px',      // Subsection headers
    h5: '16px',      // Widget titles
    h6: '14px',      // Small headers, labels

    // App Body (readable at smaller sizes)
    bodyLg: '15px',  // Large body, descriptions
    body: '14px',    // Standard body (default for app)
    bodySm: '13px',  // Secondary text, metadata
    bodyXs: '12px',  // Tertiary text, timestamps

    // Data Display
    metric: '28px',    // KPI values (prominent)
    metricLg: '36px',  // Hero KPI values
    metricSm: '20px',  // Secondary metrics
    table: '13px',     // Table cell content
    badge: '11px',     // Badge/tag text
    caption: '11px',   // Captions, footnotes
  },

  // ============================================================================
  // FONT WEIGHTS
  // ============================================================================
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // ============================================================================
  // LINE HEIGHTS
  // ============================================================================

  // Marketing line heights (generous for readability)
  lineHeight: {
    h1: '1.2em',     // Tight for large headlines
    h2: '1.25em',
    h3: '1.25em',
    h4: '1.3em',
    h5: '1.35em',
    h6: '1.4em',
    bodyXl: '1.5em',
    bodyLg: '1.55em',
    body: '1.6em',
    bodySm: '1.65em',

    // Standard values
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // App line heights (tighter for density)
  appLineHeight: {
    h1: '1.2',       // 38.4px for 32px
    h2: '1.25',      // 30px for 24px
    h3: '1.3',       // 26px for 20px
    h4: '1.35',      // 24.3px for 18px
    h5: '1.4',       // 22.4px for 16px
    h6: '1.4',       // 19.6px for 14px
    body: '1.5',     // 21px for 14px
    bodySm: '1.5',   // 19.5px for 13px
    bodyXs: '1.4',   // 16.8px for 12px
    metric: '1.1',   // Tight for numbers
    table: '1.4',    // Comfortable for data rows
    badge: '1.2',    // Tight for badges
  },

  // ============================================================================
  // LETTER SPACING
  // ============================================================================

  letterSpacing: {
    // Marketing headings (negative for polish)
    h1: '-0.045em',
    h2: '-0.04em',
    h3: '-0.03em',
    h4: '-0.025em',
    h5: '-0.02em',
    h6: '-0.015em',
    body: '0em',

    // Standard values
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // App letter spacing (slightly tighter for density)
  appLetterSpacing: {
    heading: '-0.02em',   // Subtle tightening for headings
    body: '0em',          // Normal for readability
    metric: '-0.03em',    // Tight for metric numbers
    label: '0.02em',      // Slightly wide for legibility
    badge: '0.03em',      // Wide for small text clarity
  },

  // ============================================================================
  // TEXT STYLES - Pre-composed type scales
  // ============================================================================

  textStyles: {
    // ========================================
    // MARKETING STYLES (lighthousehlth.com)
    // ========================================
    heading: {
      xl: {
        fontSize: '54px',
        fontWeight: 600,
        lineHeight: '1.2em',
        letterSpacing: '-0.045em',
        fontFamily: 'Inter',
      },
      l: {
        fontSize: '42px',
        fontWeight: 600,
        lineHeight: '1.25em',
        letterSpacing: '-0.04em',
        fontFamily: 'Inter',
      },
      m: {
        fontSize: '38px',
        fontWeight: 600,
        lineHeight: '1.25em',
        letterSpacing: '-0.03em',
        fontFamily: 'Inter',
      },
      s: {
        fontSize: '32px',
        fontWeight: 600,
        lineHeight: '1.3em',
        letterSpacing: '-0.025em',
        fontFamily: 'Inter',
      },
      xs: {
        fontSize: '28px',
        fontWeight: 600,
        lineHeight: '1.35em',
        letterSpacing: '-0.02em',
        fontFamily: 'Inter',
      },
      xxs: {
        fontSize: '24px',
        fontWeight: 600,
        lineHeight: '1.4em',
        letterSpacing: '-0.015em',
        fontFamily: 'Inter',
      },
      // h1-h6 aliases
      h1: {
        fontSize: '54px',
        fontWeight: 600,
        lineHeight: '1.2em',
        letterSpacing: '-0.045em',
        fontFamily: 'Inter',
      },
      h2: {
        fontSize: '42px',
        fontWeight: 600,
        lineHeight: '1.25em',
        letterSpacing: '-0.04em',
        fontFamily: 'Inter',
      },
      h3: {
        fontSize: '38px',
        fontWeight: 600,
        lineHeight: '1.25em',
        letterSpacing: '-0.03em',
        fontFamily: 'Inter',
      },
      h4: {
        fontSize: '32px',
        fontWeight: 600,
        lineHeight: '1.3em',
        letterSpacing: '-0.025em',
        fontFamily: 'Inter',
      },
      h5: {
        fontSize: '28px',
        fontWeight: 600,
        lineHeight: '1.35em',
        letterSpacing: '-0.02em',
        fontFamily: 'Inter',
      },
      h6: {
        fontSize: '24px',
        fontWeight: 600,
        lineHeight: '1.4em',
        letterSpacing: '-0.015em',
        fontFamily: 'Inter',
      },
    },

    body: {
      xl: {
        fontSize: '20px',
        fontWeight: 400,
        lineHeight: '1.5em',
        letterSpacing: '0em',
        fontFamily: 'Inter',
      },
      lg: {
        fontSize: '18px',
        fontWeight: 400,
        lineHeight: '1.55em',
        letterSpacing: '0em',
        fontFamily: 'Inter',
      },
      base: {
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '1.6em',
        letterSpacing: '0em',
        fontFamily: 'Inter',
      },
      sm: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '1.65em',
        letterSpacing: '0em',
        fontFamily: 'Inter',
      },
      xs: {
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '1.5em',
        fontFamily: 'Inter',
      },
    },

    // ========================================
    // APP STYLES (app.lighthousehlth.com)
    // ========================================
    // Denser typography for healthcare dashboards
    app: {
      // Page and panel headers
      pageTitle: {
        fontSize: '32px',
        fontWeight: 600,
        lineHeight: '1.2',
        letterSpacing: '-0.02em',
        fontFamily: 'Inter',
      },
      panelHeader: {
        fontSize: '24px',
        fontWeight: 600,
        lineHeight: '1.25',
        letterSpacing: '-0.02em',
        fontFamily: 'Inter',
      },
      cardTitle: {
        fontSize: '20px',
        fontWeight: 600,
        lineHeight: '1.3',
        letterSpacing: '-0.015em',
        fontFamily: 'Inter',
      },
      sectionHeader: {
        fontSize: '18px',
        fontWeight: 600,
        lineHeight: '1.35',
        letterSpacing: '-0.01em',
        fontFamily: 'Inter',
      },
      widgetTitle: {
        fontSize: '16px',
        fontWeight: 600,
        lineHeight: '1.4',
        letterSpacing: '0em',
        fontFamily: 'Inter',
      },
      smallHeader: {
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: '1.4',
        letterSpacing: '0em',
        fontFamily: 'Inter',
      },

      // Body text
      bodyLg: {
        fontSize: '15px',
        fontWeight: 400,
        lineHeight: '1.5',
        letterSpacing: '0em',
        fontFamily: 'Inter',
      },
      body: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '1.5',
        letterSpacing: '0em',
        fontFamily: 'Inter',
      },
      bodySm: {
        fontSize: '13px',
        fontWeight: 400,
        lineHeight: '1.5',
        letterSpacing: '0em',
        fontFamily: 'Inter',
      },
      bodyXs: {
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: '1.4',
        letterSpacing: '0em',
        fontFamily: 'Inter',
      },

      // Metrics and KPIs (prominent numbers)
      // Using JetBrains Mono for technical precision and visual "pop"
      metricHero: {
        fontSize: '36px',
        fontWeight: 600,
        lineHeight: '1.1',
        letterSpacing: '-0.02em',
        fontFamily: 'JetBrains Mono',
      },
      metric: {
        fontSize: '28px',
        fontWeight: 600,
        lineHeight: '1.1',
        letterSpacing: '-0.01em',
        fontFamily: 'JetBrains Mono',
      },
      metricSm: {
        fontSize: '20px',
        fontWeight: 500,
        lineHeight: '1.2',
        letterSpacing: '0em',
        fontFamily: 'JetBrains Mono',
      },
      metricUnit: {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '1.2',
        letterSpacing: '0.01em',
        fontFamily: 'Inter',  // Units stay in Inter for readability
      },

      // Data display (tables, lists)
      tableHeader: {
        fontSize: '12px',
        fontWeight: 600,
        lineHeight: '1.4',
        letterSpacing: '0.02em',
        textTransform: 'uppercase' as const,
        fontFamily: 'Inter',
      },
      tableCell: {
        fontSize: '13px',
        fontWeight: 400,
        lineHeight: '1.4',
        letterSpacing: '0em',
        fontFamily: 'Inter',
      },

      // Labels and badges
      label: {
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '1.4',
        letterSpacing: '0.02em',
        fontFamily: 'Inter',
      },
      labelSm: {
        fontSize: '11px',
        fontWeight: 500,
        lineHeight: '1.3',
        letterSpacing: '0.03em',
        fontFamily: 'Inter',
      },
      badge: {
        fontSize: '11px',
        fontWeight: 600,
        lineHeight: '1.2',
        letterSpacing: '0.03em',
        fontFamily: 'Inter',
      },

      // Supporting text
      caption: {
        fontSize: '11px',
        fontWeight: 400,
        lineHeight: '1.4',
        letterSpacing: '0.01em',
        fontFamily: 'Inter',
      },
      timestamp: {
        fontSize: '11px',
        fontWeight: 400,
        lineHeight: '1.3',
        letterSpacing: '0em',
        fontFamily: 'JetBrains Mono',
      },
    },

    // ========================================
    // Labels & UI (backward compatibility)
    // ========================================
    label: {
      lg: {
        fontSize: '14px',
        fontWeight: 600,
        lineHeight: '1.5em',
        letterSpacing: '0.025em',
        textTransform: 'uppercase' as const,
        fontFamily: 'Inter',
      },
      base: {
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '1.5em',
        fontFamily: 'Inter',
      },
      sm: {
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: '1.5em',
        fontFamily: 'Inter',
      },
    },

    // ========================================
    // Code & Data (backward compatibility)
    // ========================================
    code: {
      inline: {
        fontSize: '0.875em',
        fontWeight: 400,
        lineHeight: 1,
      },
      block: {
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '1.625em',
      },
    },

    // ========================================
    // Display - Large headlines
    // ========================================
    display: {
      '2xl': {
        fontSize: '72px',
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: '-0.025em',
        fontFamily: 'Inter',
      },
      xl: {
        fontSize: '60px',
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: '-0.025em',
        fontFamily: 'Inter',
      },
      lg: {
        fontSize: '48px',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.025em',
        fontFamily: 'Inter',
      },
      md: {
        fontSize: '36px',
        fontWeight: 700,
        lineHeight: 1.25,
        letterSpacing: '-0.025em',
        fontFamily: 'Inter',
      },
      sm: {
        fontSize: '30px',
        fontWeight: 600,
        lineHeight: 1.3,
        fontFamily: 'Inter',
      },
    },
  },
} as const;

export type Typography = typeof typography;

/**
 * TYPOGRAPHY USAGE GUIDE - "Luminous Climate Clinical"
 *
 * MARKETING SITE (lighthousehlth.com):
 * Use the standard heading/body styles for generous, storytelling layouts.
 *
 * - Hero: text-h1 (54px) with tight leading
 * - Section titles: text-h2 (42px)
 * - Body copy: text-body (16px) with 1.6em line-height
 * - CTAs: text-body-lg (18px) semibold
 *
 * APP (app.lighthousehlth.com):
 * Use the app-prefixed styles for dense, data-rich dashboards.
 *
 * - Page title: app-page-title (32px)
 * - Panel headers: app-panel-header (24px)
 * - Card titles: app-card-title (20px)
 * - Body text: app-body (14px) - PRIMARY BODY SIZE FOR APP
 * - KPI values: app-metric (28px) or app-metric-hero (36px)
 * - Table content: app-table-cell (13px)
 * - Labels/badges: app-label (12px) or app-badge (11px)
 *
 * FACILITY DIRECTOR WORKFLOW:
 * - Energy data tables: app-table-header + app-table-cell
 * - Alert items: app-body-sm (13px)
 * - Metric cards: app-metric + app-metric-unit
 *
 * CFO/CSO ACTION PLANNING:
 * - Scenario titles: app-card-title (20px)
 * - Comparison values: app-metric-sm (20px)
 * - Budget figures: app-metric with mono font override
 *
 * TAILWIND CLASSES (after config update):
 * Marketing: text-h1, text-h2, text-body, etc.
 * App: text-app-page-title, text-app-body, text-app-metric, etc.
 */
