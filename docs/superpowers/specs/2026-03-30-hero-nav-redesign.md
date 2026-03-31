# Hero + Nav Redesign — Glass UI & Product Preview

**Date:** 2026-03-30
**Status:** Approved
**Scope:** Homepage hero section and global nav only

## Summary

Redesign the homepage hero and navigation to match the Webflow site's glass aesthetic and Colorado-focused product marketing, while keeping copy broad enough for multi-state hospital network prospects.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Hero layout | Split — copy left, product card right | Matches Webflow; lets product visual sell without reading |
| Copy tone | Direct ROI | Multi-state prospects; Colorado specificity via badge + playbook link |
| Headline | "15–20% margin improvement. Compliance built in." | CFO language, financial outcome first |
| Nav links | Platform · Colorado · Blog · Contact us → | Product-forward; Colorado gets top-level visibility |
| Nav style | Glass (backdrop-blur) over light gradient | Matches Webflow aesthetic; modern, healthcare-appropriate |
| CTA shape | Pill (border-radius: 24px) | Webflow style; softer, more approachable |
| Background | Light gradient (off-white to soft teal) with subtle topo texture | Clean, professional; avoids dark hero that clashes with glass nav |

## Nav Component (`components/nav.tsx`)

### Current
- Solid `bg-navy` background
- Links: Platform, Blog, Contact
- CTA: "Book a Demo" (rounded rect)
- Sticky top-0

### Target
- `backdrop-filter: blur(16px)` + `bg-navy/65` (glass effect)
- `border-b border-white/10`
- Links: Platform (anchor `/#platform`), Colorado (`/colorado-playbook`), Blog (`/blog`)
- CTA: "Contact us →" pill linking to `/contact`
- Logo: "+ Lighthouse HLTH" (with plus symbol per Webflow branding)
- Mobile: same links in slide-down menu, glass background
- Remains `sticky top-0 z-50`

### Accessibility
- Glass nav must maintain WCAG 2.1 AA contrast (4.5:1) for text on blurred background
- The `bg-navy/65` ensures white text contrast regardless of scroll position
- Focus indicators remain visible on glass background

## Hero Section (`app/page.tsx` — top section)

### Layout
Two-column grid on desktop (md+), single column stacked on mobile.

**Left column:**
1. Badge pill: "Colorado Healthcare Sustainability" (teal bg, teal text, rounded-full)
2. Headline: `<h1>` "15–20% margin improvement. Compliance built in."
3. Sub-copy: "Platform access included. Audit-ready reporting. Outcome-based pricing that shares your risk."
4. CTAs: "Calculate Your ROI →" (solid teal button) + "Colorado Playbook ↗" (text link with underline)
5. KPI stat bar: $67K avg savings (CAH) | 18 mo ROI payback | 1-click HB21-1286

**Right column:**
Glass card containing a Capital Decision Intelligence product preview.

### Glass Product Card
- `backdrop-filter: blur(20px)` + `bg-white/55`
- `border border-white/60` + `rounded-2xl`
- `shadow-lg` + subtle inner highlight (`inset shadow`)
- Soft teal radial glow behind the card (CSS, not image)

**Card contents:**
1. Inner white card with SVG area chart showing upward margin trajectory (2024–2030)
2. Annotation: "→ $1.6M cumulative margin by 2030"
3. Card footer: "Lighthouse HLTH" label + "Capital Decision Intelligence" title + circle arrow link icon

The chart is a static SVG — not a charting library. Keeps bundle size zero for this component.

### Background
- Light gradient: `bg-gradient-to-br from-gray-50 via-teal-50/30 to-teal-100/20`
- Optional: subtle topographic SVG pattern at very low opacity (0.03–0.05)

### Responsive Behavior

**Mobile (< 640px / sm):**
- Single column stack: badge → headline → sub-copy → CTAs → KPIs → product card
- All text left-aligned (not centered — avoids ragged centered lines on narrow screens)
- Headline drops to `text-2xl` (24px)
- CTAs stack vertically, full-width buttons
- KPI stats: 3-across row, compact sizing (`text-base` values)
- Product card: full width, glass effect preserved
- Nav: hamburger menu, glass slide-down panel
- Touch targets: all interactive elements ≥ 44px tap target

**Tablet (640px–1024px / sm to lg):**
- Two-column grid, but narrower gap (16px vs 32px)
- Product card slightly smaller
- Nav: full horizontal links (no hamburger)

**Desktop (> 1024px / lg+):**
- Full split layout as designed
- Max-width container (max-w-7xl) centers content
- Generous padding (px-8 to px-12)

### Accessibility
- All KPI stats have `aria-label` combining value + label (e.g., "67 thousand dollars average savings for critical access hospitals")
- Chart SVG includes `role="img"` + `aria-label` describing the trend
- CTAs are `<Link>` or `<a>` elements (not buttons) for proper semantics
- Color contrast: all text meets 4.5:1 on the light gradient background

## Files Changed

| File | Change |
|------|--------|
| `apps/web/components/nav.tsx` | Glass styling, updated links, pill CTA, + logo |
| `apps/web/app/page.tsx` | Replace hero section with split layout + product card |
| `apps/web/app/globals.css` | Add glass utility classes if needed |
| `apps/web/tailwind.config.ts` | Add any missing color tokens (teal-50, etc.) |

## Out of Scope

- Other homepage sections below the hero (keep as-is)
- Other pages (Colorado Playbook, Blog, Contact — unchanged)
- About, Services, Leaders pages (not being built)
- OG images, favicon, analytics (separate task)
- FAQ section port (separate task)

## Success Criteria

1. Glass nav renders correctly on Chrome, Safari, Firefox (backdrop-filter support)
2. Hero loads with zero layout shift (no CLS)
3. Product card glass effect visible on all backgrounds during scroll
4. All text meets WCAG 2.1 AA contrast requirements
5. Responsive: tested at 320px, 375px, 768px, 1024px, 1440px — no overflow, no broken layout
6. Touch targets ≥ 44px on mobile
7. Build succeeds and deploys to Vercel preview

## Cleanup

Delete this spec file (`docs/superpowers/specs/2026-03-30-hero-nav-redesign.md`) once implementation is complete and the migration is verified on Vercel production.
