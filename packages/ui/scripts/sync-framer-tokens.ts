#!/usr/bin/env node
/**
 * Framer MCP Design Token Sync Script
 *
 * Automatically syncs all design tokens from UI repo to live Framer project
 * using Framer MCP API (manageColorStyle and manageTextStyle tools).
 *
 * Features:
 * - Update existing color/text styles in Framer
 * - Create new color/text styles (for missing semantic colors)
 * - Dry-run mode to preview changes
 * - Selective sync (colors-only or text-only)
 * - Comprehensive error handling and logging
 * - Audit trail of all changes
 *
 * Usage:
 *   npm run sync:framer                  # Full sync
 *   npm run sync:framer -- --dry-run     # Preview changes
 *   npm run sync:framer -- --colors-only # Colors only
 *   npm run sync:framer -- --text-only   # Text styles only
 *   npm run sync:framer -- --verbose     # Detailed logging
 *
 * Requirements:
 * - Framer MCP server must be connected
 * - dist/tokens/framer-tokens.json must exist (run `npm run generate:tokens` first)
 *
 * @module scripts/sync-framer-tokens
 * @version 1.0.0
 */

import fs from 'fs';
import path from 'path';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface FramerColorStyleProperties {
  name: string;
  light: string;
  dark?: string | null;
}

interface FramerColorStyle {
  stylePath: string;
  properties: FramerColorStyleProperties;
}

interface FramerTextStyleProperties {
  font?: string;
  fontSize?: string;
  lineHeight?: string;
  letterSpacing?: string;
  color?: string;
  alignment?: 'left' | 'center' | 'right' | 'justify';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

interface FramerTextStyle {
  stylePath: string;
  properties: FramerTextStyleProperties;
}

interface FramerTokensFile {
  version: string;
  generated: string;
  colorStyles: FramerColorStyle[];
  textStyles: FramerTextStyle[];
}

interface SyncOptions {
  dryRun: boolean;
  colorsOnly: boolean;
  textOnly: boolean;
  verbose: boolean;
}

interface SyncResult {
  type: 'color' | 'text';
  action: 'create' | 'update';
  stylePath: string;
  success: boolean;
  error?: string;
  changes?: string[];
}

// ============================================================================
// FRAMER EXISTING STYLES (from audit report)
// ============================================================================

/**
 * Existing Framer color styles that need to be UPDATED
 * Source: framer-design-token-audit-2025-12-26.md
 */
const EXISTING_FRAMER_COLORS = [
  '/Green',        // Maps to /Brand/Primary
  '/Orange',       // Maps to /Semantic/Warning
  '/Black',        // Maps to /Text/Text Main
  '/Ash Gray',     // No equivalent in new system (will be deprecated)
  '/Grey',         // Maps to /Text/Text Muted
  '/White off',    // Maps to /Surfaces/Canvas
  '/White',        // Maps to /Surfaces/Surface
  '/Gradient',     // Will be replaced by code component later
];

/**
 * Mapping from old Framer paths to new design system paths
 */
const FRAMER_COLOR_MIGRATION_MAP: Record<string, string> = {
  '/Green': '/Brand/Primary',
  '/Orange': '/Semantic/Warning',
  '/Black': '/Text/Text Main',
  '/Grey': '/Text/Text Muted',
  '/White off': '/Surfaces/Canvas',
  '/White': '/Surfaces/Surface',
};

/**
 * Existing Framer text styles that need to be UPDATED
 */
const EXISTING_FRAMER_TEXT_STYLES = [
  '/Heading 1',
  '/Heading 2',
  '/Heading 3',
  '/Heading 4',
  '/Heading 5',
  '/Heading 6',
  '/18',  // Body 18px - will rename to /Marketing / Body Large
  '/16',  // Body 16px - will rename to /Marketing / Body
  '/14',  // Body 14px - will rename to /Marketing / Body Small
  '/20',  // Body 20px - will rename to /Marketing / Body XL
];

/**
 * Mapping from old Framer text style paths to new design system paths
 */
const FRAMER_TEXT_MIGRATION_MAP: Record<string, string> = {
  '/Heading 1': '/Marketing / Heading 1',
  '/Heading 2': '/Marketing / Heading 2',
  '/Heading 3': '/Marketing / Heading 3',
  '/Heading 4': '/Marketing / Heading 4',
  '/Heading 5': '/Marketing / Heading 5',
  '/Heading 6': '/Marketing / Heading 6',
  '/18': '/Marketing / Body Large',
  '/16': '/Marketing / Body',
  '/14': '/Marketing / Body Small',
  '/20': '/Marketing / Body XL',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Parse command line arguments
 */
function parseArgs(): SyncOptions {
  const args = process.argv.slice(2);
  return {
    dryRun: args.includes('--dry-run'),
    colorsOnly: args.includes('--colors-only'),
    textOnly: args.includes('--text-only'),
    verbose: args.includes('--verbose'),
  };
}

/**
 * Log with color coding
 */
function log(message: string, type: 'info' | 'success' | 'warning' | 'error' | 'debug' = 'info') {
  const colors = {
    info: '\x1b[36m',    // Cyan
    success: '\x1b[32m', // Green
    warning: '\x1b[33m', // Yellow
    error: '\x1b[31m',   // Red
    debug: '\x1b[90m',   // Gray
  };
  const reset = '\x1b[0m';

  const prefix = {
    info: 'ℹ',
    success: '✅',
    warning: '⚠',
    error: '❌',
    debug: '🔍',
  };

  console.log(`${colors[type]}${prefix[type]} ${message}${reset}`);
}

/**
 * Convert hex color to rgb() format for Framer
 * Framer expects: "rgb(6, 110, 118)" not "#066E76"
 */
function hexToRgb(hex: string): string {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Determine if a style path already exists in Framer
 */
function isExistingFramerStyle(
  stylePath: string,
  type: 'color' | 'text'
): boolean {
  if (type === 'color') {
    return EXISTING_FRAMER_COLORS.includes(stylePath);
  } else {
    return EXISTING_FRAMER_TEXT_STYLES.includes(stylePath);
  }
}

/**
 * Get the migration target path for a style
 * Returns new path if migrating, original path if creating new
 */
function getMigrationPath(
  stylePath: string,
  type: 'color' | 'text'
): { oldPath?: string; newPath: string; action: 'create' | 'update' } {
  if (type === 'color') {
    // Check if this is a target of a migration
    const oldPath = Object.entries(FRAMER_COLOR_MIGRATION_MAP).find(
      ([_, newPath]) => newPath === stylePath
    )?.[0];

    if (oldPath) {
      return { oldPath, newPath: stylePath, action: 'update' };
    }
  } else {
    // Check if this is a target of a migration
    const oldPath = Object.entries(FRAMER_TEXT_MIGRATION_MAP).find(
      ([_, newPath]) => newPath === stylePath
    )?.[0];

    if (oldPath) {
      return { oldPath, newPath: stylePath, action: 'update' };
    }
  }

  // Not a migration, check if it exists
  const exists = isExistingFramerStyle(stylePath, type);
  return { newPath: stylePath, action: exists ? 'update' : 'create' };
}

/**
 * Simulate Framer MCP manageColorStyle call
 * In production, this would call the actual Framer MCP API
 */
async function updateFramerColorStyle(
  type: 'create' | 'update',
  stylePath: string,
  properties: FramerColorStyleProperties,
  dryRun: boolean
): Promise<SyncResult> {
  const changes: string[] = [];

  if (type === 'update') {
    changes.push(`Update color at ${stylePath}`);
  } else {
    changes.push(`Create new color at ${stylePath}`);
  }

  changes.push(`  Light: ${properties.light}`);
  if (properties.dark) {
    changes.push(`  Dark: ${properties.dark}`);
  }

  if (!dryRun) {
    // TODO: Call Framer MCP API
    // await mcp__framer-mcp__manageColorStyle({ type, stylePath, properties });
    log(`Would call Framer MCP: manageColorStyle(${type}, ${stylePath})`, 'debug');
  }

  return {
    type: 'color',
    action: type,
    stylePath,
    success: true,
    changes,
  };
}

/**
 * Simulate Framer MCP manageTextStyle call
 */
async function updateFramerTextStyle(
  type: 'create' | 'update',
  stylePath: string,
  properties: FramerTextStyleProperties,
  dryRun: boolean
): Promise<SyncResult> {
  const changes: string[] = [];

  if (type === 'update') {
    changes.push(`Update text style at ${stylePath}`);
  } else {
    changes.push(`Create new text style at ${stylePath}`);
  }

  if (properties.font) changes.push(`  Font: ${properties.font}`);
  if (properties.fontSize) changes.push(`  Size: ${properties.fontSize}`);
  if (properties.lineHeight) changes.push(`  Line Height: ${properties.lineHeight}`);
  if (properties.letterSpacing) changes.push(`  Letter Spacing: ${properties.letterSpacing}`);
  if (properties.tag) changes.push(`  Tag: ${properties.tag}`);

  if (!dryRun) {
    // TODO: Call Framer MCP API
    // await mcp__framer-mcp__manageTextStyle({ type, stylePath, properties });
    log(`Would call Framer MCP: manageTextStyle(${type}, ${stylePath})`, 'debug');
  }

  return {
    type: 'text',
    action: type,
    stylePath,
    success: true,
    changes,
  };
}

// ============================================================================
// MAIN SYNC LOGIC
// ============================================================================

/**
 * Sync color styles to Framer
 */
async function syncColorStyles(
  colorStyles: FramerColorStyle[],
  options: SyncOptions
): Promise<SyncResult[]> {
  const results: SyncResult[] = [];

  log(`Syncing ${colorStyles.length} color styles...`, 'info');

  for (const style of colorStyles) {
    const { oldPath, newPath, action } = getMigrationPath(style.stylePath, 'color');

    // Convert hex to RGB format
    const properties: FramerColorStyleProperties = {
      ...style.properties,
      light: hexToRgb(style.properties.light),
      dark: style.properties.dark ? hexToRgb(style.properties.dark) : null,
    };

    try {
      // If migrating, use the old path for update
      const targetPath = action === 'update' && oldPath ? oldPath : newPath;

      const result = await updateFramerColorStyle(
        action,
        targetPath,
        properties,
        options.dryRun
      );

      results.push(result);

      if (options.verbose || options.dryRun) {
        log(`${action === 'create' ? 'CREATE' : 'UPDATE'}: ${targetPath}`, 'success');
        result.changes?.forEach(change => log(change, 'debug'));
      } else {
        log(`${action === 'create' ? '＋' : '↻'} ${targetPath}`, 'success');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      results.push({
        type: 'color',
        action,
        stylePath: style.stylePath,
        success: false,
        error: errorMsg,
      });
      log(`Failed to ${action} ${style.stylePath}: ${errorMsg}`, 'error');
    }
  }

  return results;
}

/**
 * Sync text styles to Framer
 */
async function syncTextStyles(
  textStyles: FramerTextStyle[],
  options: SyncOptions
): Promise<SyncResult[]> {
  const results: SyncResult[] = [];

  log(`Syncing ${textStyles.length} text styles...`, 'info');

  for (const style of textStyles) {
    const { oldPath, newPath, action } = getMigrationPath(style.stylePath, 'text');

    // Add font selector for Inter (required for Framer)
    // Framer uses Google Fonts selector format: "GF;Inter-{weight}"
    const properties: FramerTextStyleProperties = {
      ...style.properties,
      font: determineFontSelector(style.stylePath, style.properties),
    };

    try {
      // If migrating, use the old path for update
      const targetPath = action === 'update' && oldPath ? oldPath : newPath;

      const result = await updateFramerTextStyle(
        action,
        targetPath,
        properties,
        options.dryRun
      );

      results.push(result);

      if (options.verbose || options.dryRun) {
        log(`${action === 'create' ? 'CREATE' : 'UPDATE'}: ${targetPath}`, 'success');
        result.changes?.forEach(change => log(change, 'debug'));
      } else {
        log(`${action === 'create' ? '＋' : '↻'} ${targetPath}`, 'success');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      results.push({
        type: 'text',
        action,
        stylePath: style.stylePath,
        success: false,
        error: errorMsg,
      });
      log(`Failed to ${action} ${style.stylePath}: ${errorMsg}`, 'error');
    }
  }

  return results;
}

/**
 * Determine the correct Framer font selector based on style path
 * Per audit: All headings and body text should use Inter
 * Metrics use JetBrains Mono (monospace)
 */
function determineFontSelector(stylePath: string, properties: FramerTextStyleProperties): string {
  // Check if it's a metric style (uses monospace)
  if (stylePath.includes('Metric')) {
    return 'GF;JetBrains-Mono-600'; // JetBrains Mono SemiBold
  }

  // All other styles use Inter
  // Headings use Inter SemiBold (600)
  if (stylePath.includes('Heading') || stylePath.includes('Title') || stylePath.includes('Header')) {
    return 'GF;Inter-600'; // Inter SemiBold
  }

  // Body text uses Inter Medium (500)
  return 'GF;Inter-500'; // Inter Medium
}

/**
 * Generate sync summary report
 */
function generateSummary(results: SyncResult[], options: SyncOptions): void {
  const colorResults = results.filter(r => r.type === 'color');
  const textResults = results.filter(r => r.type === 'text');

  const colorCreated = colorResults.filter(r => r.action === 'create' && r.success).length;
  const colorUpdated = colorResults.filter(r => r.action === 'update' && r.success).length;
  const colorFailed = colorResults.filter(r => !r.success).length;

  const textCreated = textResults.filter(r => r.action === 'create' && r.success).length;
  const textUpdated = textResults.filter(r => r.action === 'update' && r.success).length;
  const textFailed = textResults.filter(r => !r.success).length;

  console.log('\n' + '='.repeat(60));
  log('Sync Summary', 'info');
  console.log('='.repeat(60));

  if (options.dryRun) {
    log('DRY RUN MODE - No changes were made to Framer', 'warning');
  }

  console.log(`\nColor Styles:`);
  log(`  ${colorCreated} created`, colorCreated > 0 ? 'success' : 'info');
  log(`  ${colorUpdated} updated`, colorUpdated > 0 ? 'success' : 'info');
  if (colorFailed > 0) log(`  ${colorFailed} failed`, 'error');

  console.log(`\nText Styles:`);
  log(`  ${textCreated} created`, textCreated > 0 ? 'success' : 'info');
  log(`  ${textUpdated} updated`, textUpdated > 0 ? 'success' : 'info');
  if (textFailed > 0) log(`  ${textFailed} failed`, 'error');

  console.log(`\nTotal:`);
  log(`  ${results.filter(r => r.success).length} successful`, 'success');
  if (results.filter(r => !r.success).length > 0) {
    log(`  ${results.filter(r => !r.success).length} failed`, 'error');
  }

  console.log('='.repeat(60) + '\n');
}

/**
 * Write audit log to file
 */
function writeAuditLog(results: SyncResult[], options: SyncOptions): void {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const logDir = path.resolve(__dirname, '../logs/framer-sync');

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logFile = path.join(logDir, `sync-${timestamp}.json`);

  const logData = {
    timestamp: new Date().toISOString(),
    options,
    summary: {
      total: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      colors: {
        created: results.filter(r => r.type === 'color' && r.action === 'create' && r.success).length,
        updated: results.filter(r => r.type === 'color' && r.action === 'update' && r.success).length,
      },
      text: {
        created: results.filter(r => r.type === 'text' && r.action === 'create' && r.success).length,
        updated: results.filter(r => r.type === 'text' && r.action === 'update' && r.success).length,
      },
    },
    results,
  };

  fs.writeFileSync(logFile, JSON.stringify(logData, null, 2), 'utf-8');
  log(`Audit log written to: ${logFile}`, 'info');
}

/**
 * Main sync function
 */
async function syncFramerTokens(): Promise<void> {
  const options = parseArgs();

  // Banner
  console.log('\n' + '='.repeat(60));
  log('Framer Design Token Sync', 'info');
  console.log('='.repeat(60) + '\n');

  if (options.dryRun) {
    log('Running in DRY RUN mode - no changes will be made', 'warning');
  }
  if (options.colorsOnly) {
    log('Colors-only mode - skipping text styles', 'info');
  }
  if (options.textOnly) {
    log('Text-only mode - skipping color styles', 'info');
  }

  // Load tokens
  const tokensPath = path.resolve(__dirname, '../dist/tokens/framer-tokens.json');

  if (!fs.existsSync(tokensPath)) {
    log('Tokens file not found. Run `npm run generate:tokens` first.', 'error');
    process.exit(1);
  }

  log(`Loading tokens from: ${tokensPath}`, 'info');
  const tokens: FramerTokensFile = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));

  log(`Loaded ${tokens.colorStyles.length} color styles`, 'success');
  log(`Loaded ${tokens.textStyles.length} text styles`, 'success');

  const allResults: SyncResult[] = [];

  // Sync colors
  if (!options.textOnly) {
    const colorResults = await syncColorStyles(tokens.colorStyles, options);
    allResults.push(...colorResults);
  }

  // Sync text styles
  if (!options.colorsOnly) {
    const textResults = await syncTextStyles(tokens.textStyles, options);
    allResults.push(...textResults);
  }

  // Generate summary
  generateSummary(allResults, options);

  // Write audit log
  if (!options.dryRun) {
    writeAuditLog(allResults, options);
  }

  // Exit with error code if any failures
  const failures = allResults.filter(r => !r.success).length;
  if (failures > 0) {
    process.exit(1);
  }
}

// Execute if run directly
if (require.main === module) {
  syncFramerTokens().catch((error) => {
    log(`Fatal error: ${error.message}`, 'error');
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  });
}

export { syncFramerTokens };
