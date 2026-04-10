import type { Config } from 'tailwindcss';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const uiConfig = require('../../packages/ui/tailwind.config.js');

const config: Config = {
  presets: [uiConfig as Config],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B1D2E',
        primary: {
          DEFAULT: '#0A7E8C',
          50: '#E6F4F5',
          100: '#CCE8EB',
          200: '#99D1D6',
          300: '#66BAC2',
          400: '#33A3AD',
          500: '#0A7E8C',
          600: '#086974',
          700: '#06545C',
          800: '#043F45',
          900: '#022A2D',
        },
        'primary-soft': '#1A9FAB',
        canvas: '#FAFAF7',
        'product-carbon': '#0A7E8C',
        'product-footprint': '#2563EB',
        'product-capital': '#D97706',
      },
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-serif)', 'Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
};

export default config;
