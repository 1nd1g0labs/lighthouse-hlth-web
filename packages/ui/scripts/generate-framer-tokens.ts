#!/usr/bin/env node
/**
 * Framer Tokens Export Script
 *
 * Generates Framer-compatible JSON for color and text styles
 * that can be imported via Framer MCP manageColorStyle/manageTextStyle tools
 *
 * Output: dist/tokens/framer-tokens.json
 *
 * Usage:
 *   npm run generate:tokens
 *   or
 *   ts-node scripts/generate-framer-tokens.ts
 *
 * @module scripts/generate-framer-tokens
 * @version 1.0.0
 */

import fs from 'fs';
import path from 'path';

// Import Tailwind config
const tailwindConfigPath = path.resolve(__dirname, '../tailwind.config.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tailwindConfig = require(tailwindConfigPath);

interface ColorScale {
  DEFAULT?: string;
  [key: string]: string | undefined;
}

interface Colors {
  [key: string]: string | ColorScale;
}

interface FontSizeValue {
  0: string; // size
  1?: {
    lineHeight?: string;
    letterSpacing?: string;
  };
}

interface TailwindTheme {
  extend: {
    colors: Colors;
    fontFamily: {
      [key: string]: string[];
    };
    fontSize: {
      [key: string]: string | FontSizeValue;
    };
  };
}

const theme = tailwindConfig.theme as TailwindTheme;

interface FramerColorStyle {
  stylePath: string;
  properties: {
    name: string;
    light: string;
    dark?: string | null;
  };
}

interface FramerTextStyle {
  stylePath: string;
  properties: {
    font?: string;
    fontSize?: string;
    lineHeight?: string;
    letterSpacing?: string;
    color?: string;
    alignment?: 'left' | 'center' | 'right' | 'justify';
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  };
}

interface FramerTokensOutput {
  version: string;
  generated: string;
  colorStyles: FramerColorStyle[];
  textStyles: FramerTextStyle[];
}

/**
 * Convert camelCase to Title Case for display names
 * @example primarySoft -> Primary Soft
 */
function toTitleCase(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

/**
 * Generate Framer color styles from Tailwind colors
 */
function generateColorStyles(colors: Colors): FramerColorStyle[] {
  const styles: FramerColorStyle[] = [];

  // Primary brand colors
  const primaryColors = [
    { key: 'primary', name: 'Primary', category: 'Brand' },
    { key: 'primarySoft', name: 'Primary Soft', category: 'Brand' },
    { key: 'sustainability', name: 'Sustainability', category: 'Brand' },
    { key: 'lime', name: 'Lime', category: 'Brand' },
  ];

  primaryColors.forEach(({ key, name, category }) => {
    const colorValue = colors[key];
    if (typeof colorValue === 'object' && colorValue[500]) {
      styles.push({
        stylePath: `/${category}/${name}`,
        properties: {
          name: name,
          light: colorValue[500],
          dark: null, // Dark mode colors to be added in future iteration
        },
      });
    }
  });

  // Semantic colors
  const semanticColors = [
    { key: 'amber', name: 'Warning', shade: 500 },
    { key: 'critical', name: 'Critical', shade: 600 },
    { key: 'success', name: 'Success', shade: 'main' },
    { key: 'error', name: 'Error', shade: 'main' },
    { key: 'info', name: 'Info', shade: 'main' },
  ];

  semanticColors.forEach(({ key, name, shade }) => {
    const colorValue = colors[key];
    if (typeof colorValue === 'object') {
      const color = typeof shade === 'string' ? colorValue[shade] : colorValue[shade];
      if (color) {
        styles.push({
          stylePath: `/Semantic/${name}`,
          properties: {
            name: name,
            light: color,
            dark: null,
          },
        });
      }
    }
  });

  // GHG Scope colors
  const scopeColors = [
    { key: 'scope1', name: 'Scope 1', description: 'Direct Emissions' },
    { key: 'scope2', name: 'Scope 2', description: 'Energy Emissions' },
    { key: 'scope3', name: 'Scope 3', description: 'Supply Chain' },
    { key: 'waste', name: 'Waste', description: 'Waste Management' },
  ];

  scopeColors.forEach(({ key, name }) => {
    const colorValue = colors[key];
    if (typeof colorValue === 'object' && colorValue.DEFAULT) {
      styles.push({
        stylePath: `/GHG/${name}`,
        properties: {
          name: name,
          light: colorValue.DEFAULT,
          dark: null,
        },
      });
    }
  });

  // Surface colors
  const surfaceColors = [
    { key: 'canvas', name: 'Canvas', shade: 'DEFAULT' },
    { key: 'surface', name: 'Surface', shade: 'DEFAULT' },
    { key: 'surface', name: 'Surface Sunken', shade: 'sunken' },
  ];

  surfaceColors.forEach(({ key, name, shade }) => {
    const colorValue = colors[key];
    if (typeof colorValue === 'object') {
      const color = colorValue[shade];
      if (color) {
        styles.push({
          stylePath: `/Surfaces/${name}`,
          properties: {
            name: name,
            light: color,
            dark: null,
          },
        });
      }
    }
  });

  // Text colors
  const textColors = [
    { key: 'text', name: 'Text Main', shade: 'main' },
    { key: 'text', name: 'Text Secondary', shade: 'secondary' },
    { key: 'text', name: 'Text Muted', shade: 'muted' },
    { key: 'text', name: 'Text Disabled', shade: 'disabled' },
  ];

  textColors.forEach(({ key, name, shade }) => {
    const colorValue = colors[key];
    if (typeof colorValue === 'object') {
      const color = colorValue[shade];
      if (color) {
        styles.push({
          stylePath: `/Text/${name}`,
          properties: {
            name: name,
            light: color,
            dark: null,
          },
        });
      }
    }
  });

  // Border colors
  const borderColors = [
    { key: 'border', name: 'Border Subtle', shade: 'subtle' },
    { key: 'border', name: 'Border', shade: 'DEFAULT' },
    { key: 'border', name: 'Border Strong', shade: 'strong' },
  ];

  borderColors.forEach(({ key, name, shade }) => {
    const colorValue = colors[key];
    if (typeof colorValue === 'object') {
      const color = colorValue[shade];
      if (color) {
        styles.push({
          stylePath: `/Borders/${name}`,
          properties: {
            name: name,
            light: color,
            dark: null,
          },
        });
      }
    }
  });

  return styles;
}

/**
 * Generate Framer text styles from Tailwind typography tokens
 */
function generateTextStyles(
  fontSize: { [key: string]: string | FontSizeValue },
  fontFamily: { [key: string]: string[] }
): FramerTextStyle[] {
  const styles: FramerTextStyle[] = [];

  // Get font selectors (Framer needs actual font names)
  // For now, we'll use generic font-family values
  // In production, you'd map to actual Framer font selectors (e.g., "GF;Inter-600")
  const sansFont = fontFamily.sans?.[0] || 'Inter';
  const monoFont = fontFamily.mono?.[0] || 'JetBrains Mono';

  // Marketing scale headings
  const marketingHeadings = [
    { key: 'h1', name: 'Marketing / Heading 1', tag: 'h1' as const },
    { key: 'h2', name: 'Marketing / Heading 2', tag: 'h2' as const },
    { key: 'h3', name: 'Marketing / Heading 3', tag: 'h3' as const },
    { key: 'h4', name: 'Marketing / Heading 4', tag: 'h4' as const },
    { key: 'h5', name: 'Marketing / Heading 5', tag: 'h5' as const },
    { key: 'h6', name: 'Marketing / Heading 6', tag: 'h6' as const },
  ];

  marketingHeadings.forEach(({ key, name, tag }) => {
    const sizeValue = fontSize[key];
    if (Array.isArray(sizeValue)) {
      const [size, config] = sizeValue;
      styles.push({
        stylePath: `/${name}`,
        properties: {
          fontSize: size,
          lineHeight: config?.lineHeight,
          letterSpacing: config?.letterSpacing,
          alignment: 'left',
          tag: tag,
        },
      });
    }
  });

  // Marketing body text
  const marketingBody = [
    { key: 'body-xl', name: 'Marketing / Body XL' },
    { key: 'body-lg', name: 'Marketing / Body Large' },
    { key: 'body', name: 'Marketing / Body' },
    { key: 'body-sm', name: 'Marketing / Body Small' },
  ];

  marketingBody.forEach(({ key, name }) => {
    const sizeValue = fontSize[key];
    if (Array.isArray(sizeValue)) {
      const [size, config] = sizeValue;
      styles.push({
        stylePath: `/${name}`,
        properties: {
          fontSize: size,
          lineHeight: config?.lineHeight,
          letterSpacing: config?.letterSpacing,
          alignment: 'left',
          tag: 'p',
        },
      });
    }
  });

  // App scale headings
  const appHeadings = [
    { key: 'app-page-title', name: 'App / Page Title' },
    { key: 'app-panel-header', name: 'App / Panel Header' },
    { key: 'app-card-title', name: 'App / Card Title' },
    { key: 'app-section-header', name: 'App / Section Header' },
    { key: 'app-widget-title', name: 'App / Widget Title' },
  ];

  appHeadings.forEach(({ key, name }) => {
    const sizeValue = fontSize[key];
    if (Array.isArray(sizeValue)) {
      const [size, config] = sizeValue;
      styles.push({
        stylePath: `/${name}`,
        properties: {
          fontSize: size,
          lineHeight: config?.lineHeight,
          letterSpacing: config?.letterSpacing,
          alignment: 'left',
        },
      });
    }
  });

  // App body text
  const appBody = [
    { key: 'app-body-lg', name: 'App / Body Large' },
    { key: 'app-body', name: 'App / Body' },
    { key: 'app-body-sm', name: 'App / Body Small' },
    { key: 'app-body-xs', name: 'App / Body XSmall' },
  ];

  appBody.forEach(({ key, name }) => {
    const sizeValue = fontSize[key];
    if (Array.isArray(sizeValue)) {
      const [size, config] = sizeValue;
      styles.push({
        stylePath: `/${name}`,
        properties: {
          fontSize: size,
          lineHeight: config?.lineHeight,
          letterSpacing: config?.letterSpacing,
          alignment: 'left',
          tag: 'p',
        },
      });
    }
  });

  // App metrics (use monospace font)
  const appMetrics = [
    { key: 'app-metric-hero', name: 'App / Metric Hero' },
    { key: 'app-metric', name: 'App / Metric' },
    { key: 'app-metric-sm', name: 'App / Metric Small' },
  ];

  appMetrics.forEach(({ key, name }) => {
    const sizeValue = fontSize[key];
    if (Array.isArray(sizeValue)) {
      const [size, config] = sizeValue;
      styles.push({
        stylePath: `/${name}`,
        properties: {
          // Note: In production, map monoFont to actual Framer font selector
          // font: 'GF;JetBrains-Mono-600',
          fontSize: size,
          lineHeight: config?.lineHeight,
          letterSpacing: config?.letterSpacing,
          alignment: 'left',
        },
      });
    }
  });

  return styles;
}

/**
 * Main function to generate Framer tokens JSON
 */
function generateFramerTokens(): void {
  const output: FramerTokensOutput = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    colorStyles: generateColorStyles(theme.extend.colors),
    textStyles: generateTextStyles(theme.extend.fontSize, theme.extend.fontFamily),
  };

  // Ensure output directory exists
  const outputDir = path.resolve(__dirname, '../dist/tokens');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write JSON file
  const outputPath = path.join(outputDir, 'framer-tokens.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

  console.log(`✅ Generated Framer tokens: ${outputPath}`);
  console.log(`   ${output.colorStyles.length} color styles`);
  console.log(`   ${output.textStyles.length} text styles`);
}

// Execute if run directly
if (require.main === module) {
  try {
    generateFramerTokens();
  } catch (error) {
    console.error('❌ Error generating Framer tokens:', error);
    process.exit(1);
  }
}

export { generateFramerTokens };
