#!/usr/bin/env node
/**
 * CSS Variables Export Script
 *
 * Generates CSS custom properties from design tokens (Tailwind config)
 * for use in non-React contexts (vanilla HTML, Framer, etc.)
 *
 * Output: dist/tokens/tokens.css
 *
 * Usage:
 *   npm run generate:tokens
 *   or
 *   ts-node scripts/generate-css.ts
 *
 * @module scripts/generate-css
 * @version 1.0.0
 */

import fs from 'fs';
import path from 'path';

// Import Tailwind config (typed)
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
    spacing: {
      [key: string]: string;
    };
    borderRadius: {
      [key: string]: string;
    };
    boxShadow: {
      [key: string]: string;
    };
    backgroundImage: {
      [key: string]: string;
    };
  };
}

const theme = tailwindConfig.theme as TailwindTheme;

/**
 * Convert camelCase or kebab-case to CSS variable naming
 * @example primarySoft -> primary-soft
 * @example primary-soft -> primary-soft
 */
function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Generate CSS custom properties for colors
 */
function generateColorVariables(colors: Colors): string[] {
  const lines: string[] = [];

  Object.entries(colors).forEach(([colorName, colorValue]) => {
    const kebabName = toKebabCase(colorName);

    if (typeof colorValue === 'string') {
      // Simple color value
      lines.push(`  --lh-${kebabName}: ${colorValue};`);
    } else if (typeof colorValue === 'object') {
      // Color scale object
      Object.entries(colorValue).forEach(([shade, hex]) => {
        if (shade === 'DEFAULT') {
          lines.push(`  --lh-${kebabName}: ${hex};`);
        } else {
          lines.push(`  --lh-${kebabName}-${shade}: ${hex};`);
        }
      });
    }
  });

  return lines;
}

/**
 * Generate CSS custom properties for font families
 */
function generateFontFamilyVariables(fontFamily: { [key: string]: string[] }): string[] {
  const lines: string[] = [];

  Object.entries(fontFamily).forEach(([name, stack]) => {
    const kebabName = toKebabCase(name);
    // Join font stack with commas
    const fontStack = stack.map(font => {
      // Already quoted fonts stay quoted, others get quoted if they contain spaces
      if (font.startsWith('"') || font.startsWith("'")) {
        return font;
      } else if (font.includes(' ')) {
        return `"${font}"`;
      }
      return font;
    }).join(', ');

    lines.push(`  --lh-font-${kebabName}: ${fontStack};`);
  });

  return lines;
}

/**
 * Generate CSS custom properties for font sizes
 */
function generateFontSizeVariables(fontSize: { [key: string]: string | FontSizeValue }): string[] {
  const lines: string[] = [];

  Object.entries(fontSize).forEach(([name, value]) => {
    const kebabName = toKebabCase(name);

    if (typeof value === 'string') {
      lines.push(`  --lh-text-${kebabName}: ${value};`);
    } else if (Array.isArray(value)) {
      // Array format: [size, { lineHeight, letterSpacing }]
      const [size, config] = value;
      lines.push(`  --lh-text-${kebabName}-size: ${size};`);

      if (config?.lineHeight) {
        lines.push(`  --lh-text-${kebabName}-line-height: ${config.lineHeight};`);
      }
      if (config?.letterSpacing) {
        lines.push(`  --lh-text-${kebabName}-letter-spacing: ${config.letterSpacing};`);
      }
    }
  });

  return lines;
}

/**
 * Generate CSS custom properties for spacing
 */
function generateSpacingVariables(spacing: { [key: string]: string }): string[] {
  const lines: string[] = [];

  Object.entries(spacing).forEach(([name, value]) => {
    lines.push(`  --lh-spacing-${name}: ${value};`);
  });

  return lines;
}

/**
 * Generate CSS custom properties for border radius
 */
function generateRadiusVariables(borderRadius: { [key: string]: string }): string[] {
  const lines: string[] = [];

  Object.entries(borderRadius).forEach(([name, value]) => {
    if (name === 'DEFAULT') {
      lines.push(`  --lh-radius: ${value};`);
    } else {
      const kebabName = toKebabCase(name);
      lines.push(`  --lh-radius-${kebabName}: ${value};`);
    }
  });

  return lines;
}

/**
 * Generate CSS custom properties for shadows
 */
function generateShadowVariables(boxShadow: { [key: string]: string }): string[] {
  const lines: string[] = [];

  Object.entries(boxShadow).forEach(([name, value]) => {
    if (name === 'DEFAULT') {
      lines.push(`  --lh-shadow: ${value};`);
    } else {
      const kebabName = toKebabCase(name);
      lines.push(`  --lh-shadow-${kebabName}: ${value};`);
    }
  });

  return lines;
}

/**
 * Generate CSS custom properties for gradients
 */
function generateGradientVariables(backgroundImage: { [key: string]: string }): string[] {
  const lines: string[] = [];

  Object.entries(backgroundImage).forEach(([name, value]) => {
    const kebabName = toKebabCase(name);
    lines.push(`  --lh-gradient-${kebabName}: ${value};`);
  });

  return lines;
}

/**
 * Main function to generate complete CSS file
 */
function generateCSSFile(): void {
  const lines: string[] = [
    '/**',
    ' * Lighthouse Health Design System - CSS Custom Properties',
    ' *',
    ' * Version: 1.0.0 - Luminous Climate Clinical',
    ' * Generated from: tailwind.config.js',
    ' *',
    ' * DO NOT EDIT THIS FILE MANUALLY',
    ' * Run `npm run generate:tokens` to regenerate',
    ' *',
    ' * Usage:',
    ' *   @import "~@1nd1g0labs/lighthouse-hlth-ui/dist/tokens/tokens.css";',
    ' *',
    ' *   .my-element {',
    ' *     color: var(--lh-primary-500);',
    ' *     font-family: var(--lh-font-sans);',
    ' *   }',
    ' */',
    '',
    ':root {',
    '  /* ========================================================================',
    '   * COLORS - Luminous Climate Clinical Palette',
    '   * ======================================================================== */',
  ];

  // Generate color variables
  lines.push(...generateColorVariables(theme.extend.colors));

  lines.push('');
  lines.push('  /* ========================================================================');
  lines.push('   * TYPOGRAPHY');
  lines.push('   * ======================================================================== */');

  // Generate font family variables
  lines.push(...generateFontFamilyVariables(theme.extend.fontFamily));

  lines.push('');
  lines.push('  /* Font Sizes (Marketing & App Scales) */');

  // Generate font size variables
  lines.push(...generateFontSizeVariables(theme.extend.fontSize));

  lines.push('');
  lines.push('  /* ========================================================================');
  lines.push('   * SPACING');
  lines.push('   * ======================================================================== */');

  // Generate spacing variables
  lines.push(...generateSpacingVariables(theme.extend.spacing));

  lines.push('');
  lines.push('  /* ========================================================================');
  lines.push('   * BORDER RADIUS');
  lines.push('   * ======================================================================== */');

  // Generate radius variables
  lines.push(...generateRadiusVariables(theme.extend.borderRadius));

  lines.push('');
  lines.push('  /* ========================================================================');
  lines.push('   * SHADOWS - Soft Layered Surfaces');
  lines.push('   * ======================================================================== */');

  // Generate shadow variables
  lines.push(...generateShadowVariables(theme.extend.boxShadow));

  lines.push('');
  lines.push('  /* ========================================================================');
  lines.push('   * GRADIENTS');
  lines.push('   * ======================================================================== */');

  // Generate gradient variables
  lines.push(...generateGradientVariables(theme.extend.backgroundImage));

  lines.push('}');
  lines.push('');

  // Join all lines
  const cssContent = lines.join('\n');

  // Ensure output directory exists
  const outputDir = path.resolve(__dirname, '../dist/tokens');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write CSS file
  const outputPath = path.join(outputDir, 'tokens.css');
  fs.writeFileSync(outputPath, cssContent, 'utf-8');

  console.log(`✅ Generated CSS variables: ${outputPath}`);
  console.log(`   ${lines.length} lines written`);
}

// Execute if run directly
if (require.main === module) {
  try {
    generateCSSFile();
  } catch (error) {
    console.error('❌ Error generating CSS variables:', error);
    process.exit(1);
  }
}

export { generateCSSFile };
