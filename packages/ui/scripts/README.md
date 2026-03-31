# Design Token Export Scripts

This directory contains scripts for exporting design tokens from the canonical TypeScript source (`/src/tokens/`) and Tailwind configuration to multiple platform-specific formats.

## Overview

Lighthouse HLTH UI is the **Single Source of Truth (SSOT)** for all design decisions. These scripts enable design token distribution to:

- **CSS Variables** - For vanilla HTML and non-React contexts
- **Email CSS** - For Postmark transactional email templates (inline-safe)

## Architecture

```
lighthouse-hlth-ui (SSOT)
├── tailwind.config.js          # Master configuration
└── scripts/
    ├── generate-css.ts          → dist/tokens/tokens.css
    └── generate-email-css.ts    → dist/tokens/email-tokens.css
```

All scripts read from `tailwind.config.js` and generate platform-specific outputs.

## Scripts

### 1. `generate-css.ts`

**Purpose:** Generate CSS custom properties (CSS variables) for non-React contexts

**Output:** `dist/tokens/tokens.css`

**What it generates:**
- Color variables: `--lh-primary-500`, `--lh-sustainability-500`, etc.
- Typography variables: `--lh-font-sans`, `--lh-text-h1-size`, etc.
- Spacing variables: `--lh-spacing-4`, `--lh-spacing-6`, etc.
- Shadow variables: `--lh-shadow-soft`, `--lh-shadow-card`, etc.
- Gradient variables: `--lh-gradient-lighthouse-beam`, etc.

**Usage:**
```bash
npm run generate:tokens
# or
ts-node scripts/generate-css.ts
```

**Consumer example (vanilla HTML):**
```html
<link rel="stylesheet" href="node_modules/@1nd1g0labs/lighthouse-hlth-ui/dist/tokens/tokens.css">

<style>
  .my-card {
    background-color: var(--lh-surface);
    color: var(--lh-text-main);
    padding: var(--lh-spacing-6);
    border-radius: var(--lh-radius-xl);
    box-shadow: var(--lh-shadow-card);
  }
</style>
```

**Consumer example (Next.js app):**
```typescript
// app/layout.tsx
import '@1nd1g0labs/lighthouse-hlth-ui/dist/tokens/tokens.css';
```

---

### 2. `generate-email-css.ts`

**Purpose:** Generate email-safe inline CSS snippet for Postmark templates

**Output:** `dist/tokens/email-tokens.css`

**What it generates:**
- Email-safe CSS classes (`.email-heading-1`, `.email-body`, `.email-button-primary`, etc.)
- Inline style reference for maximum compatibility
- Email client compatibility notes

**Email client support:**
- Gmail (web, mobile)
- Outlook (2007-2021, 365)
- Apple Mail (macOS, iOS)
- Yahoo Mail, AOL Mail

**Usage:**
```bash
npm run generate:tokens
# or
ts-node scripts/generate-email-css.ts
```

**Consumer example (Postmark template):**
```html
<!-- Option 1: Use class reference from generated CSS -->
<h1 class="email-heading-1">Welcome to Lighthouse HLTH</h1>
<p class="email-body">Your sustainability dashboard is ready.</p>
<a href="{{action_url}}" class="email-button-primary">Get Started</a>

<!-- Option 2: Copy inline styles for maximum compatibility -->
<h1 style="font-family: Inter, Arial, sans-serif; font-size: 32px; line-height: 1.2; color: #0F172A; margin: 0 0 16px 0; font-weight: 600;">
  Welcome to Lighthouse HLTH
</h1>

<a href="{{action_url}}" style="display: inline-block; font-family: Inter, Arial, sans-serif; font-size: 16px; font-weight: 600; color: #FFFFFF; background-color: #066E76; padding: 14px 28px; border-radius: 8px; text-decoration: none; text-align: center; margin: 8px 0;">
  Get Started
</a>
```

**Important constraints:**
- No CSS variables (not supported in email clients)
- No flexbox/grid (limited support)
- No advanced selectors (`:hover` unreliable)
- Inline styles recommended for critical elements
- Use RGB/HEX colors (no `rgba()` with alpha in Outlook 2007-2016)

---

## Running All Scripts

**Quick command:**
```bash
npm run generate:tokens
```

This runs both generators in sequence and outputs to `dist/tokens/`:
```
dist/tokens/
├── tokens.css          # CSS variables
└── email-tokens.css    # Email-safe inline CSS
```

## Build Integration

Token generation is integrated into the build pipeline:

```json
{
  "scripts": {
    "generate:tokens": "ts-node scripts/generate-css.ts && ts-node scripts/generate-email-css.ts",
    "build": "npm run generate:tokens && tsup"
  }
}
```

**When tokens are generated:**
- On `npm run build` - Production builds
- On `npm run generate:tokens` - Manual regeneration
- Pre-commit hook (future) - Ensure tokens stay in sync

## Development Workflow

### Making Design Token Changes

1. **Update source of truth:**
   ```bash
   # Edit tailwind.config.js or src/tokens/*.ts
   vim tailwind.config.js
   ```

2. **Regenerate tokens:**
   ```bash
   npm run generate:tokens
   ```

3. **Verify outputs:**
   ```bash
   cat dist/tokens/tokens.css
   cat dist/tokens/email-tokens.css
   ```

4. **Test consumers:**
   - **Next.js app:** `npm run dev` in consuming project
   - **Email:** Update Postmark templates

5. **Commit and publish:**
   ```bash
   git add .
   git commit -m "feat(tokens): update primary color palette"
   npm version minor  # Bump version (breaking = major, feature = minor, fix = patch)
   npm publish
   ```

### Semantic Versioning for Design Tokens

Follow these guidelines when making changes:

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| **Breaking** (MAJOR) | Remove token, rename token, change token type | `primary-500: #066E76` → `brand-500: #066E76` (rename) |
| **Feature** (MINOR) | Add new token, add new color scale | Add `lime` color scale |
| **Fix** (PATCH) | Adjust token value (non-breaking) | `primary-500: #066E76` → `primary-500: #055B62` (refinement) |

## Testing

### Manual Testing

**Test CSS variables:**
```bash
# Generate and inspect
npm run generate:tokens
cat dist/tokens/tokens.css | grep "primary-500"

# Expected output:
# --lh-primary-500: #066E76;
```

**Test email CSS:**
```bash
npm run generate:tokens
cat dist/tokens/email-tokens.css | grep ".email-button-primary"

# Verify background-color matches primary-500
```

### Automated Testing (Future)

```bash
# Validate generated outputs (planned)
npm run test:tokens

# Test cases:
# - All tokens present in outputs
# - No TypeScript compilation errors
# - Valid CSS syntax (tokens.css, email-tokens.css)
# - Color contrast ratios meet WCAG 2.1 AA
```

## Troubleshooting

### Issue: `Cannot find module 'tailwindcss'`

**Solution:**
```bash
cd lighthouse-hlth-ui
npm install
```

### Issue: `dist/tokens/ directory not created`

**Solution:**
Scripts auto-create the directory. If failing, manually create:
```bash
mkdir -p dist/tokens
npm run generate:tokens
```

### Issue: Email colors not rendering in Outlook

**Possible causes:**
- Using `rgba()` with alpha channel (Outlook 2007-2016 doesn't support)
- Using CSS variables (not supported in any email client)

**Solution:**
- Use solid HEX colors only
- Use inline styles (already done in `email-tokens.css`)
- Test with Litmus or Email on Acid

## File Ownership & Maintenance

| File | Owner | Update Frequency |
|------|-------|------------------|
| `generate-css.ts` | fullstack-engineer | When adding new token categories |
| `generate-email-css.ts` | fullstack-engineer | When email templates need new styles |
| `README.md` (this file) | PM + fullstack-engineer | When workflows change |

## Related Documentation

- **Design Tokens:** `/DESIGN_TOKENS.md` - Color palette, typography, and spacing reference
- **Dark Mode:** `/DARK_MODE_SPECIFICATION.md` - Dark mode token specifications
- **Architecture:** `/docs/product-specs/design-ssot-architecture.md` - SSOT strategy

## Future Enhancements

- [ ] **Dark mode tokens:** Generate dark mode CSS variables
- [ ] **React Native tokens:** Export tokens for mobile app (StyleSheet format)
- [ ] **Tailwind preset:** Export reusable Tailwind preset for consuming apps
- [ ] **Automated testing:** Validate generated outputs in CI/CD
- [ ] **Pre-commit hook:** Auto-regenerate tokens on Tailwind config changes
- [ ] **Design token documentation site:** Interactive token browser (Storybook addon)

---

**Version:** 1.1.0
**Last Updated:** 2026-03-30
**Owner:** fullstack-engineer

---

**Proprietary and Confidential**
© 2025 Indigo Labs LLC. All rights reserved.
