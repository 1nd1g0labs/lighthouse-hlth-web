# Brand Elevation Design Spec: "The Journal"

**Date:** 2026-04-10
**Author:** Brand design session (Nick + Claude)
**Scope:** lighthousehlth.com marketing site only (not app.lighthousehlth.com or packages/ui)

---

## 1. Positioning

**Primary narrative:** Lead with CliniCarbon as the concrete, purchasable product. Frame it within a larger narrative — "this is the first building block of a full healthcare sustainability intelligence stack."

**Brand archetype:** Clinical journal / research authority with a dash of data intelligence (Bloomberg). Not "modern SaaS company." The site should feel like a trusted publication that happens to sell products, not a startup that happens to have content.

**Trust model:** CDC/WHO institutional trust — trusted by end-users in climatehealth. Credibility anchored in founder's 100+ hospital track record (shadow.eco) and rigorous source citation.

---

## 2. Typography

### Display: Fraunces (Google Fonts)
- Variable serif with optical sizing
- "Wonky" axis set to 0 (serious/institutional)
- **Usage:** h1, h2, h3 only
- **Weights:** 700 (bold) for h1, 600 (semibold) for h2-h3

### Body: Inter (already loaded)
- **Usage:** h4-h6 (semibold), all body text, nav, buttons, labels
- **No change** to current Inter implementation

### Implementation
```typescript
// layout.tsx — add Fraunces alongside Inter
import { Inter } from 'next/font/google';
import { Fraunces } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-fraunces',
});

// Apply both variables to <html>
<html className={`${inter.variable} ${fraunces.variable}`}>
```

```typescript
// tailwind.config.ts — add display font family
fontFamily: {
  sans: ['var(--font-inter)', ...],
  display: ['var(--font-fraunces)', 'Georgia', 'serif'],
}
```

### Heading Classes
- `h1`: `font-display text-h1 font-bold` (Fraunces 700)
- `h2`: `font-display text-h2 font-semibold` (Fraunces 600)
- `h3`: `font-display text-h3 font-semibold` (Fraunces 600)
- `h4`+: `font-sans text-h4 font-semibold` (Inter, same as current)

---

## 3. Color Palette

### Refined Tokens

| Token | Current Hex | New Hex | Rationale |
|-------|------------|---------|-----------|
| `navy` | `#0a2540` | `#0B1D2E` | Deeper, more ink-like |
| `primary` | `#066E76` | `#0A7E8C` | Cooler, more institutional |
| `primary-soft` | `#0E9BA7` | `#1A9FAB` | Hover state, adjusted |
| `canvas` | `#F3F5F7` | `#FAFAF7` | Warm off-white (paper, not screen) |
| `surface` | `#FFFFFF` | `#FFFFFF` | No change — cards stay white |

### Sub-Product Accent Colors

| Product | Token | Hex | Usage |
|---------|-------|-----|-------|
| CliniCarbon | `product-carbon` | `#0A7E8C` | Same as primary (lead product) |
| Footprint | `product-footprint` | `#2563EB` | Facility blue |
| Capital | `product-capital` | `#D97706` | Decision amber |

### Dark Data Panels
- Background: `navy` (`#0B1D2E`)
- Text: `#FAFAF7`
- Metric accents: product-specific color at full brightness
- Usage: 1-2 per page for stats/metrics sections

---

## 4. Logo System

### Parent Mark: Lighthouse Beam
- Minimal geometric mark: upward-angled wedge (~45 degrees) terminating in a radiating point
- Base: subtle horizontal anchor line (drops at small sizes)
- Rendered as inline SVG (scalable, no external asset dependencies)
- Colors: teal on light backgrounds, white on dark backgrounds

### Favicon
- 32x32 and 16x16 derived from the beam mark (beam + point only, no base, no text)
- Generated as favicon.ico from SVG source

### Logotype (Nav)
- Beam mark + "Lighthouse HLTH" in Fraunces 600
- Replaces current `+ Lighthouse HLTH` text treatment
- The `+` prefix is removed — the mark replaces it

### Product Suite Extensions (Google-style)
Each product shares the beam stroke but has a unique terminus element:

| Product | Terminus Element | Color |
|---------|-----------------|-------|
| Lighthouse HLTH (parent) | Radiating point (default) | `#0A7E8C` |
| CliniCarbon | Molecular/hex node at beam point | `#0A7E8C` |
| Footprint | Grid/meter element at beam point | `#2563EB` |
| Capital | Upward arrow/chart element at beam point | `#D97706` |

---

## 5. Homepage Structure (Revised)

### Section 1: Hero
- **Headline (Fraunces h1):** "The definitive emission factor reference for healthcare carbon accounting."
- **Sub (Inter body):** One line about CliniCarbon being live, grounded in 100+ hospitals track record
- **Primary CTA:** Drives to CliniCarbon purchase (links to /carbon or direct Lemon Squeezy)
- **Secondary CTA:** "See what we're building" — anchor to platform roadmap section
- **Stats bar beneath hero:** 1,413 factors | 11 EPA sources | 287 healthcare-specific | Edition 2026.1
- **No hero illustration/card** — let the numbers and typography carry authority

### Section 2: "What's Inside" Preview
- 3-4 cards showing CliniCarbon differentiators (healthcare mapping, regulatory tags, provenance, anesthetic gas reference)
- One card rendered as dark data panel for visual break
- Journal-style: "featured findings" not "feature grid"

### Section 3: "Building the Full Stack" Teaser
- Replaces "One platform. Three pillars."
- Three product cards with product-colored marks
- Honest status labels: CliniCarbon = "Live", Footprint = "In development", Capital = "Coming"
- Framed as roadmap/upcoming, not current offering
- Styled like a journal's "forthcoming publications"

### Section 4: Origin Story / Credibility
- Replaces fabricated testimonial and borrowed credibility
- Part A (dark navy band): Eckelman et al. data callout
  > "US healthcare is responsible for 8.5% of national greenhouse gas emissions — more than the entire agriculture sector."
  > Eckelman et al., *Health Affairs*, 2020
  > "Lighthouse HLTH exists to give the people reducing that number better tools." — Nicolas Vinson, Founder
- Part B (white): Explicit origin story naming shadow.eco
  > "Founded by Nicolas Vinson, who bootstrapped shadow.eco to 100+ hospitals across Europe and Canada. Lighthouse HLTH brings that operational depth to US healthcare, starting with the data layer."

### Section 5: Blog / Insights Preview
- Restyled as "Latest from the editorial"
- Reinforces journal metaphor
- Same 3-post grid, cleaner card treatment

### Section 6: CTA Footer
- Primary: drives to CliniCarbon purchase
- Secondary: "Subscribe for updates" for platform interest capture
- Gradient treatment: navy to primary (keep current)

---

## 6. Navigation

### Header
```
[Beam Mark] Lighthouse HLTH    CliniCarbon    Platform    Blog    Contact us ->
```
- "CliniCarbon" = link to /carbon (the live product, prominent placement)
- "Platform" = anchor to homepage #platform section (roadmap)
- "Blog" = /blog
- "Contact us" = /contact (pill button, primary color)
- Colorado Playbook page stays at /colorado-playbook but loses top-nav link. Linked from the Platform roadmap section and footer instead.

### Footer
- Beam mark + "Lighthouse HLTH" logotype (Fraunces)
- Product links: CliniCarbon, Platform, Blog, Contact
- "Boulder, CO" + nick@lighthousehlth.com
- Founder line: "Founded by Nicolas Vinson. Previously shadow.eco (100+ hospitals, EU & Canada)."
- Copyright: Indigo Labs LLC

---

## 7. SEO & Metadata

### Page Titles
| Page | Title |
|------|-------|
| Homepage | "Lighthouse HLTH \| Healthcare Carbon Intelligence" |
| /carbon | "CliniCarbon — Healthcare Emission Factor Reference \| Lighthouse HLTH" (no change) |
| /contact | "Talk to Us \| Lighthouse HLTH" |
| /blog | "Editorial \| Lighthouse HLTH" |
| /colorado-playbook | "Colorado Healthcare Sustainability Playbook \| Lighthouse HLTH" |

### Homepage Meta Description
"1,413 audit-ready healthcare emission factors from 11 EPA datasets. Built by the team behind 100+ hospital deployments in EU and Canada. CliniCarbon is live — full platform coming."

### JSON-LD
Update organization schema: name, description, logo URL (point to actual SVG/PNG once generated), founder info.

---

## 8. Copy Voice Rules

1. **State facts, not aspirations.** "1,413 emission factors from 11 EPA datasets" not "comprehensive sustainability intelligence."
2. **Cite sources inline.** Parenthetical citations for data claims: (Eckelman et al., Health Affairs, 2020).
3. **Name versions and editions.** "Edition 2026.1" language. The site should feel maintained and versioned.
4. **Institutional third person.** "Lighthouse HLTH publishes..." not "We believe..." Founder voice only in the origin story section.
5. **Remove all unsubstantiated claims.** No "15-20% margin improvement" without methodology. No "$67K avg savings" without the math. If you wouldn't put it in a peer-reviewed abstract, don't put it on the homepage.

---

## 9. Removals

- Fabricated "Alex Morgan, Chief Environmental Officer" testimonial
- "Award-winning platform" expertise tag
- Hero stats ($67K, 18mo ROI, 1-click HB21-1286) — replaced with CliniCarbon stats
- `+ ` prefix on logo text
- CapitalCard hero component (replaced by typography-driven hero)
- Colorado Playbook from top nav (content stays, just not top-level)

---

## 10. What Does NOT Change

- `/carbon` page content (strongest page — gets visual refresh only)
- `/contact` page structure (visual refresh only)
- `/colorado-playbook` page content (stays at same URL, just removed from top nav)
- Tech stack: Next.js, Tailwind, Framer Motion
- `packages/ui` design system — NO changes (shared by app.lighthousehlth.com). All color/font overrides go in the web app's tailwind.config.ts.
- Framer Motion animations (FadeIn, StaggerChildren stay)
- Lemon Squeezy checkout integration

---

## 11. Files to Modify

| File | Changes |
|------|---------|
| `apps/web/app/layout.tsx` | Add Fraunces font import, update metadata |
| `apps/web/tailwind.config.ts` | Add display font family, update color tokens (navy, primary, canvas overrides) |
| `apps/web/app/globals.css` | Update canvas/body defaults |
| `apps/web/app/page.tsx` | Full homepage restructure |
| `apps/web/components/nav.tsx` | New logo mark, updated nav links |
| `apps/web/components/footer.tsx` | New logo, updated links, founder attribution |
| `apps/web/components/icons.tsx` | Add LighthouseBeam mark SVG |
| `apps/web/app/favicon.ico` | New — generated from beam mark SVG |
| `apps/web/app/carbon/page.tsx` | Typography refresh (Fraunces headings) |
| `apps/web/app/contact/page.tsx` | Typography refresh |
| `apps/web/app/blog/page.tsx` | Title update ("Editorial"), typography refresh |
| `apps/web/app/sitemap.ts` | Verify /carbon is included |
| `apps/web/app/robots.ts` | No change expected |
| `apps/web/lib/metadata.ts` | Update JSON-LD schema |
