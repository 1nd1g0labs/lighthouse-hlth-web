# Design Tokens Reference

**Source of truth:** `packages/ui/tailwind.config.js`

This document is a concise reference. All values here are defined in `tailwind.config.js` and available as Tailwind utility classes (e.g., `bg-primary-500`, `text-app-body`).

---

## Color Palette

### Primary — Deep Teal

| Token | Hex | Usage |
|-------|-----|-------|
| `primary-500` | `#057C8B` | Main buttons, links, charts, primary actions |
| `primary-soft-500` | `#0E9BA7` | Hovers, secondary emphasis, gradients |

### Secondary — Sustainability Green

| Token | Hex | Usage |
|-------|-----|-------|
| `sustainability-500` | `#16A34A` | Positive metrics, success states, reduced emissions |
| `lime-500` | `#A3E635` | Accent highlights, gradient terminus (use sparingly) |

### Semantic

| Token | Hex | Usage |
|-------|-----|-------|
| `amber-500` | `#F97316` | Warnings, alerts, attention needed |
| `critical-600` | `#DC2626` | Errors, high emissions, critical alerts |
| `info-500` | `#3B82F6` | Informational states |

### Surfaces & Text

| Token | Hex | Usage |
|-------|-----|-------|
| `canvas` | `#F3F5F7` | Page backgrounds |
| `surface` | `#FFFFFF` | Cards, panels |
| `surface-sunken` | `#EDF2F7` | Inset areas |
| `border-subtle` | `#E2E8F0` | Dividers, card borders |
| `text-main` | `#0F172A` | Primary content, headings |
| `text-secondary` | `#475569` | Secondary content |
| `text-muted` | `#64748B` | Labels, tertiary content |
| `text-disabled` | `#94A3B8` | Disabled states |
| `text-inverse` | `#FFFFFF` | Text on dark backgrounds |

---

## GHG Emission Category Colors

Follows [GHG Protocol](https://ghgprotocol.org/) standards. All meet WCAG 2.1 AA contrast (4.5:1+).

| Category | Token | Hex | Use Case |
|----------|-------|-----|----------|
| Scope 1 — Direct | `scope1` | `#D97706` | On-site combustion, fleet, fugitive emissions |
| Scope 2 — Energy | `scope2` | `#2563EB` | Purchased electricity, steam, chilled water |
| Scope 3 — Supply Chain | `scope3` | `#0D9488` | Goods, services, waste, travel |
| Waste | `waste` | `#059669` | Waste management (Scope 3 subset) |

Each category includes variant tokens: `{token}-light`, `{token}-dark`, `{token}-bg`, `{token}-border`.

Tailwind utility examples:
```html
<div class="bg-scope1 text-white">Scope 1</div>
<div class="bg-scope2-light text-scope2-dark">Energy</div>
<div class="border border-scope3-border">Supply Chain</div>
```

---

## Gradients

```css
/* Primary CTA — hero buttons */
--lh-gradient-lighthouse-beam: linear-gradient(135deg, #0E9BA7 0%, #16A34A 40%, #A3E635 100%);

/* Secondary */
--lh-gradient-primary: linear-gradient(135deg, #057C8B 0%, #0E9BA7 100%);

/* Success state (app only) */
--lh-gradient-success: linear-gradient(135deg, #16A34A 0%, #A3E635 100%);
```

---

## Typography

### Font Stack

```css
--lh-font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--lh-font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
```

Inter is used for all UI text. JetBrains Mono is used sparingly for numeric KPI values.

### Marketing Scale (lighthousehlth.com)

| Token | Size | Line Height | Letter Spacing |
|-------|------|-------------|----------------|
| `text-h1` | 54px | 1.2em | -0.045em |
| `text-h2` | 42px | 1.25em | -0.04em |
| `text-h3` | 38px | 1.25em | -0.03em |
| `text-h4` | 32px | 1.3em | -0.025em |
| `text-body-xl` | 20px | 1.5em | 0 |
| `text-body-lg` | 18px | 1.55em | 0 |
| `text-body` | 16px | 1.6em | 0 |
| `text-body-sm` | 14px | 1.65em | 0 |

### App Scale (app.lighthousehlth.com)

| Token | Size | Usage |
|-------|------|-------|
| `text-app-page-title` | 32px | Dashboard page titles |
| `text-app-card-title` | 20px | Card titles |
| `text-app-body` | 14px | Primary body text |
| `text-app-body-sm` | 13px | Secondary text, metadata |
| `text-app-body-xs` | 12px | Timestamps, tertiary |
| `text-app-metric-hero` | 36px | Hero KPI values (mono) |
| `text-app-metric` | 28px | Standard KPI values (mono) |
| `text-app-metric-sm` | 20px | Secondary metrics (mono) |
| `text-app-table-header` | 12px | Table headers (uppercase) |
| `text-app-label` | 12px | Labels |

---

## Spacing

Base unit: 4px (Tailwind default scale).

| Use | Tailwind values | Pixels |
|-----|-----------------|--------|
| Tight | `2`, `3`, `4` | 8, 12, 16px |
| Standard | `4`, `6`, `8` | 16, 24, 32px |
| Generous | `8`, `12`, `16` | 32, 48, 64px |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 4px | Small elements |
| `rounded` | 8px | Standard |
| `rounded-lg` | 12px | App buttons |
| `rounded-xl` | 16px | Cards, panels |
| `rounded-full` | 999px | Pill buttons (marketing CTAs) |

---

*Proprietary and Confidential — © 2025 Indigo Labs LLC. All rights reserved.*
