/** @type {import('tailwindcss').Config} */

/**
 * Lighthouse Health Design System - Tailwind Configuration
 *
 * Version 1.0.0 - Luminous Climate Clinical
 *
 * Design Language: Premium, clinical, climate-forward
 * Supports both lighthousehlth.com (marketing) and app.lighthousehlth.com (product)
 */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './examples/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // ========================================================================
      // COLORS - "Luminous Climate Clinical" Palette
      // ========================================================================
      colors: {
        // PRIMARY - Deep Teal (Clinical Trust)
        primary: {
          50: '#E6F4F5',
          100: '#CCE8EB',
          200: '#99D1D6',
          300: '#66BAC2',
          400: '#33A3AD',
          500: '#066E76',  // MAIN - Deep Teal
          600: '#055B62',
          700: '#04494E',
          800: '#03363A',
          900: '#022427',
          DEFAULT: '#066E76',
        },

        // PRIMARY SOFT - Soft Teal (Hovers, Secondary)
        'primary-soft': {
          50: '#E7F6F8',
          100: '#CFEDF0',
          200: '#9FDBE2',
          300: '#6FC9D3',
          400: '#3FB7C5',
          500: '#0E9BA7',  // MAIN - Soft Teal
          600: '#0B7F89',
          700: '#09636B',
          800: '#06474D',
          900: '#042B2F',
          DEFAULT: '#0E9BA7',
        },

        // SUSTAINABILITY - Green (Positive Metrics)
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

        // LIME - "Lighthouse Beam" Accent
        lime: {
          50: '#F7FDE5',
          100: '#EFFBCC',
          200: '#DFF799',
          300: '#CFF366',
          400: '#BFEF33',
          500: '#A3E635',  // MAIN - Lighthouse Beam
          600: '#85BD2B',
          700: '#679421',
          800: '#496B17',
          900: '#2B420D',
          DEFAULT: '#A3E635',
        },

        // AMBER - Warning (replacing orange)
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

        // CRITICAL - Red (Errors, High Emissions)
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

        // SURFACES
        canvas: {
          light: '#F3F5F7',
          DEFAULT: '#F3F5F7',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          elevated: '#FFFFFF',
          sunken: '#EDF2F7',
        },

        // BORDERS
        border: {
          subtle: '#E2E8F0',
          DEFAULT: '#E2E8F0',
          muted: '#CBD5E1',
          strong: '#94A3B8',
        },

        // TEXT
        text: {
          main: '#0F172A',
          DEFAULT: '#0F172A',
          secondary: '#475569',
          muted: '#64748B',
          disabled: '#94A3B8',
          inverse: '#FFFFFF',
        },

        // NEUTRAL SCALE
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

        // SEMANTIC COLORS
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

        // GHG EMISSION CATEGORIES
        scope1: {
          DEFAULT: '#D97706',
          light: '#FCD34D',
          dark: '#B45309',
          bg: '#FEF3C7',
          border: '#F59E0B',
        },
        scope2: {
          DEFAULT: '#2563EB',
          light: '#60A5FA',
          dark: '#1E40AF',
          bg: '#DBEAFE',
          border: '#3B82F6',
        },
        scope3: {
          DEFAULT: '#0D9488',
          light: '#5EEAD4',
          dark: '#115E59',
          bg: '#CCFBF1',
          border: '#14B8A6',
        },
        waste: {
          DEFAULT: '#059669',
          light: '#6EE7B7',
          dark: '#047857',
          bg: '#D1FAE5',
          border: '#10B981',
        },

        // LEGACY (backward compatibility)
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
        accent: {
          50: '#FFF8EB',
          100: '#FEF0D6',
          200: '#FDE1AD',
          300: '#FCD285',
          400: '#FBC35C',
          500: '#F97316',
          600: '#E06614',
          700: '#C85912',
          800: '#A04710',
          900: '#78350F',
          DEFAULT: '#F97316',
        },
      },

      // ========================================================================
      // TYPOGRAPHY
      // ========================================================================
      fontFamily: {
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'Monaco', '"Courier New"', 'monospace'],
      },

      fontSize: {
        // MARKETING SCALE (generous)
        'h1': ['54px', { lineHeight: '1.2em', letterSpacing: '-0.045em' }],
        'h2': ['42px', { lineHeight: '1.25em', letterSpacing: '-0.04em' }],
        'h3': ['38px', { lineHeight: '1.25em', letterSpacing: '-0.03em' }],
        'h4': ['32px', { lineHeight: '1.3em', letterSpacing: '-0.025em' }],
        'h5': ['28px', { lineHeight: '1.35em', letterSpacing: '-0.02em' }],
        'h6': ['24px', { lineHeight: '1.4em', letterSpacing: '-0.015em' }],
        'body-xl': ['20px', { lineHeight: '1.5em', letterSpacing: '0em' }],
        'body-lg': ['18px', { lineHeight: '1.55em', letterSpacing: '0em' }],
        'body': ['16px', { lineHeight: '1.6em', letterSpacing: '0em' }],
        'body-sm': ['14px', { lineHeight: '1.65em', letterSpacing: '0em' }],

        // APP SCALE (dense)
        'app-page-title': ['32px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'app-panel-header': ['24px', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        'app-card-title': ['20px', { lineHeight: '1.3', letterSpacing: '-0.015em' }],
        'app-section-header': ['18px', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        'app-widget-title': ['16px', { lineHeight: '1.4', letterSpacing: '0em' }],
        'app-small-header': ['14px', { lineHeight: '1.4', letterSpacing: '0em' }],
        'app-body-lg': ['15px', { lineHeight: '1.5', letterSpacing: '0em' }],
        'app-body': ['14px', { lineHeight: '1.5', letterSpacing: '0em' }],
        'app-body-sm': ['13px', { lineHeight: '1.5', letterSpacing: '0em' }],
        'app-body-xs': ['12px', { lineHeight: '1.4', letterSpacing: '0em' }],
        'app-metric-hero': ['36px', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'app-metric': ['28px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'app-metric-sm': ['20px', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'app-metric-unit': ['14px', { lineHeight: '1.2', letterSpacing: '0em' }],
        'app-table-header': ['12px', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'app-table-cell': ['13px', { lineHeight: '1.4', letterSpacing: '0em' }],
        'app-label': ['12px', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'app-badge': ['11px', { lineHeight: '1.2', letterSpacing: '0.03em' }],
        'app-caption': ['11px', { lineHeight: '1.4', letterSpacing: '0.01em' }],

        // Standard sizes (backward compatibility)
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
      },

      lineHeight: {
        'h1': '1.2em',
        'h2': '1.25em',
        'h3': '1.25em',
        'h4': '1.3em',
        'h5': '1.35em',
        'h6': '1.4em',
        'body-xl': '1.5em',
        'body-lg': '1.55em',
        'body': '1.6em',
        'body-sm': '1.65em',
        'none': '1',
        'tight': '1.25',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
      },

      letterSpacing: {
        'h1': '-0.045em',
        'h2': '-0.04em',
        'h3': '-0.03em',
        'h4': '-0.025em',
        'h5': '-0.02em',
        'h6': '-0.015em',
        'body': '0em',
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },

      // ========================================================================
      // BORDER RADIUS - Soft Layered Surfaces
      // ========================================================================
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',      // 4px - Small elements
        DEFAULT: '0.5rem',    // 8px - Standard
        'md': '0.625rem',     // 10px
        'lg': '0.75rem',      // 12px - Standard buttons
        'xl': '1rem',         // 16px - Cards, panels
        '2xl': '1.25rem',     // 20px - Large cards
        '3xl': '1.5rem',      // 24px
        'full': '9999px',     // Pill buttons (CTAs)
      },

      // ========================================================================
      // SPACING - 4px Base Unit + Framer Gaps
      // ========================================================================
      spacing: {
        '0.5': '0.125rem',   // 2px
        '1.25': '0.3125rem', // 5px - Framer gap
        '1.75': '0.4375rem', // 7px - Framer gap
        '2.25': '0.5625rem', // 9px - Framer gap
        '0': '0',
        '1': '0.25rem',      // 4px
        '1.5': '0.375rem',   // 6px
        '2': '0.5rem',       // 8px
        '2.5': '0.625rem',   // 10px
        '3': '0.75rem',      // 12px
        '3.5': '0.875rem',   // 14px
        '4': '1rem',         // 16px
        '5': '1.25rem',      // 20px
        '6': '1.5rem',       // 24px
        '7': '1.75rem',      // 28px
        '8': '2rem',         // 32px
        '9': '2.25rem',      // 36px
        '10': '2.5rem',      // 40px
        '11': '2.75rem',     // 44px
        '12': '3rem',        // 48px
        '14': '3.5rem',      // 56px
        '16': '4rem',        // 64px
        '20': '5rem',        // 80px
        '24': '6rem',        // 96px
        '28': '7rem',        // 112px
        '32': '8rem',        // 128px
        '36': '9rem',        // 144px
        '40': '10rem',       // 160px
        '44': '11rem',       // 176px
        '48': '12rem',       // 192px
        '52': '13rem',       // 208px
        '56': '14rem',       // 224px
        '60': '15rem',       // 240px
        '64': '16rem',       // 256px
        '72': '18rem',       // 288px
        '80': '20rem',       // 320px
        '96': '24rem',       // 384px
      },

      // ========================================================================
      // BOX SHADOW - Soft Layered Surfaces
      // ========================================================================
      boxShadow: {
        // Standard elevation
        'sm': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        DEFAULT: '0 2px 8px 0 rgba(15, 23, 42, 0.08)',
        'md': '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.1)',
        'lg': '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.1)',
        'xl': '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.1)',
        '2xl': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',

        // SOFT LAYERED SURFACES (bi-directional)
        'soft': '10px 10px 30px rgba(15, 23, 42, 0.12), -8px -8px 20px rgba(255, 255, 255, 0.9)',
        'soft-sm': '6px 6px 16px rgba(15, 23, 42, 0.08), -4px -4px 12px rgba(255, 255, 255, 0.9)',
        'soft-lg': '14px 14px 40px rgba(15, 23, 42, 0.15), -10px -10px 28px rgba(255, 255, 255, 0.9)',

        // INSET (inputs, inactive controls)
        'inset': 'inset 1px 1px 3px rgba(148, 163, 184, 0.4), inset -1px -1px 3px rgba(255, 255, 255, 0.9)',
        'inset-deep': 'inset 2px 2px 5px rgba(148, 163, 184, 0.5), inset -2px -2px 5px rgba(255, 255, 255, 0.95)',
        'inset-subtle': 'inset 1px 1px 2px rgba(148, 163, 184, 0.25), inset -1px -1px 2px rgba(255, 255, 255, 0.8)',

        // COMPONENT-SPECIFIC
        'card': '10px 10px 30px rgba(15, 23, 42, 0.12), -8px -8px 20px rgba(255, 255, 255, 0.9)',
        'card-hover': '12px 12px 35px rgba(15, 23, 42, 0.14), -10px -10px 24px rgba(255, 255, 255, 0.92)',
        'button': '4px 4px 12px rgba(15, 23, 42, 0.15), -2px -2px 8px rgba(255, 255, 255, 0.8)',
        'button-hover': '6px 6px 16px rgba(15, 23, 42, 0.18), -3px -3px 10px rgba(255, 255, 255, 0.85)',
        'button-pressed': 'inset 2px 2px 4px rgba(15, 23, 42, 0.15), inset -1px -1px 3px rgba(255, 255, 255, 0.5)',
        'input': 'inset 1px 1px 3px rgba(148, 163, 184, 0.4), inset -1px -1px 3px rgba(255, 255, 255, 0.9)',
        'input-focus': 'inset 1px 1px 3px rgba(148, 163, 184, 0.4), inset -1px -1px 3px rgba(255, 255, 255, 0.9), 0 0 0 2px rgba(34, 197, 94, 0.6)',
        'dropdown': '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.1)',
        'modal': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
        'tooltip': '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.1)',
        'toast': '0 10px 15px -3px rgba(15, 23, 42, 0.15), 0 4px 6px -4px rgba(15, 23, 42, 0.1)',
        'nav': '4px 0 12px rgba(15, 23, 42, 0.08)',
        'context-panel': '-4px 0 12px rgba(15, 23, 42, 0.08)',
        'kpi-card': '8px 8px 24px rgba(15, 23, 42, 0.1), -6px -6px 18px rgba(255, 255, 255, 0.9)',
        'facility-node': '6px 6px 16px rgba(15, 23, 42, 0.1), -4px -4px 12px rgba(255, 255, 255, 0.9)',

        // FOCUS STATES
        'focus': '0 0 0 2px rgba(34, 197, 94, 0.6)',
        'focus-offset': '0 0 0 2px #FFFFFF, 0 0 0 4px rgba(34, 197, 94, 0.6)',
        'focus-error': '0 0 0 2px rgba(220, 38, 38, 0.5)',
        'focus-secondary': '0 0 0 2px rgba(6, 110, 118, 0.5)',

        // NONE
        'none': 'none',
      },

      // ========================================================================
      // ANIMATION
      // ========================================================================
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out',
        'slide-in-bottom': 'slideInBottom 0.3s ease-out',
        'slide-in-top': 'slideInTop 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInBottom: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInTop: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      // ========================================================================
      // BACKGROUND IMAGE (Gradients)
      // ========================================================================
      backgroundImage: {
        'lighthouse-beam': 'linear-gradient(135deg, #0E9BA7 0%, #16A34A 40%, #A3E635 100%)',
        'gradient-primary': 'linear-gradient(135deg, #066E76 0%, #0E9BA7 100%)',
        'gradient-sustainability': 'linear-gradient(135deg, #066E76 0%, #16A34A 100%)',
        'gradient-success': 'linear-gradient(135deg, #16A34A 0%, #A3E635 100%)',
        'gradient-canvas': 'linear-gradient(180deg, #EDF2F7 0%, #F3F5F7 100%)',
      },

      // ========================================================================
      // Z-INDEX (Layering System)
      // ========================================================================
      zIndex: {
        'base': '0',
        'dropdown': '1000',
        'sticky': '1100',
        'fixed': '1200',
        'modal-backdrop': '1300',
        'modal': '1400',
        'popover': '1500',
        'tooltip': '1600',
        'toast': '1700',
      },

      // ========================================================================
      // OUTLINE (Focus States)
      // ========================================================================
      outlineOffset: {
        '3': '3px',
      },
    },
  },
  plugins: [],
};
