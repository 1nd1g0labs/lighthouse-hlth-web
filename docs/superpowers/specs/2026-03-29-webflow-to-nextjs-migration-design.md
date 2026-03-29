# Webflow-to-Next.js Migration: lighthousehlth.com

## Summary

Migrate lighthousehlth.com from Webflow to a Next.js 15 application within the existing lighthouse-hlth-ui repository, converting it from a standalone design system package into a monorepo that houses both the marketing site and the shared UI/token system. The site serves as the commercial GTM gateway for the Lighthouse HLTH platform ecosystem.

## Motivation

- No non-technical teammates; Claude Code handles all content and deployment
- Webflow MCP integration is broken (`update_style` times out 100%, `setText`/`setStyle` return empty arrays)
- Webflow site is not under version control
- Monthly Webflow cost ($39/mo) provides no value for a solo technical founder
- The site must evolve into a multi-product platform gateway (Carbon, Footprint, Capital) — impossible on any website builder
- Next.js gives full SEO control (programmatic metadata, JSON-LD, SSG), code ownership, and the architectural foundation for product subdomains

## Architecture

### Repository Structure

Convert `lighthouse-hlth-ui` from a standalone npm package to an npm workspaces monorepo:

```
lighthouse-hlth-ui/
  apps/
    web/                              Next.js 15, App Router, static export
      app/
        layout.tsx                    Global nav + footer shell
        page.tsx                      Homepage
        blog/
          page.tsx                    Blog index
          [slug]/page.tsx             Individual post (MDX)
        contact/
          page.tsx                    Contact form
        colorado-playbook/
          page.tsx                    Colorado-specific landing page
      content/
        blog/                         .mdx files
      public/
        assets/                       Images, white paper PDF (future placeholder)
      next.config.ts
      tailwind.config.ts              Extends packages/ui tailwind config
  packages/
    ui/                               Existing design system (moved from src/)
      src/
        components/                   33 existing components
        tokens/                       Color, typography, spacing tokens
        framer/                       Framer exports (retain for now)
        types/
        utils/
        index.ts
      tailwind.config.js              Existing config (source of truth)
      tsup.config.ts
      package.json                    @1nd1g0labs/lighthouse-hlth-ui
  package.json                        Workspaces root: ["apps/*", "packages/*"]
  tsconfig.json                       Base TypeScript config
```

### Tech Stack

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS v3 (match existing config — no mid-migration upgrade)
- **Component variants:** CVA (class-variance-authority, already in use)
- **Blog:** MDX files in `apps/web/content/blog/`
- **Icons:** Lucide React (already a dependency) — minimalist line icons, 1.5px stroke
- **Animations:** Framer Motion (already a dependency)
- **Hosting:** Cloudflare Pages, static export ($0/mo)
- **Form submission:** Formspree free tier (50 submissions/mo) → nick@lighthousehlth.com
- **White paper gate:** Email-gated download via same Formspree endpoint, PDF in `/public/assets/` (placeholder for now)

### Monorepo Migration

The existing `src/` directory moves to `packages/ui/src/`. The package.json, tsup config, Storybook config, and tailwind config move alongside. The root `package.json` becomes the workspaces root. The npm package `@1nd1g0labs/lighthouse-hlth-ui` continues to publish from `packages/ui/`.

The `apps/web/` Tailwind config extends `packages/ui/tailwind.config.js` so all design tokens (colors, typography, spacing, shadows) are inherited. Components from `packages/ui` are imported directly via workspace resolution.

## Pages

### Homepage (`/`)

Layout foundation: earlier Webflow iteration (lighthouse-health.webflow.io) — KPI-forward, evidence-first, white paper lead magnet.

**Section flow (10 sections):**

1. **Navigation** — Lighthouse HLTH logo | Platform, Blog, Contact | "Book a Demo" CTA button (links to /contact)
2. **Hero** — "Healthcare Sustainability Platform" eyebrow, "Your hospital's climate impact — now clinically actionable" headline, subtext, dual CTAs: "Schedule a Call" (primary) + "Download White Paper" (secondary/ghost)
3. **KPI Strip** — 4 metric cards with green left-border accent:
   - 92% anesthetic gas reduction ($84K saved)
   - $220K HVAC retrofit savings (during wildfires)
   - 47% less hazardous waste (procurement shift)
   - 8.5% hospital emissions share (often invisible to ops)
4. **Platform Products** — "One platform. Three pillars." heading. Three cards with minimalist SVG line icons (brand teal, 1.5px stroke):
   - **Carbon** (bar chart icon): Emission Factor Intelligence — CliniCarbon knowledge base. Subdomain hint: carbon.lighthousehlth.com
   - **Footprint** (dashboard grid icon): Facility Tracking & Reporting — meters, invoices, care data, compliance. Subdomain hint: footprint.lighthousehlth.com
   - **Capital** (trend line icon): Decision Intelligence — ROI-ranked projects, incentive stacking. Subdomain hint: capital.lighthousehlth.com
5. **Features** — "Transforming climate data into actionable healthcare insights" heading. 4 centered cards with small SVG icons:
   - End-to-end carbon accounting (clock icon)
   - Automated compliance generation (checkmark icon)
   - Financial alignment (dollar icon)
   - Cross-departmental collaboration (people icon)
6. **Traction / Origin Story** — Three-column header: "Trusted roots. | Proven experience. | A new chapter for US healthcare." Body copy about shadow.eco heritage (100+ hospitals, EU/Canada), US market opportunity. Expertise tags: Healthcare carbon accounting architecture, Pharmaceutical emissions (ECOVAMED), 100+ hospital deployments, Award-winning platform
7. **Testimonial** — Quote block on brand teal (#066E76) background: "Connecting climate metrics to patient care has revolutionized our sustainability strategy." — Alex Morgan, Chief Environmental Officer
8. **Blog Preview** — "Latest Insights" heading, 3-card grid of latest blog posts with image placeholder, title, excerpt
9. **Final CTA** — Gradient block (navy → teal): "Ready for clinically actionable sustainability?" + "Schedule a Call" button
10. **Footer** — Lighthouse HLTH, nick@lighthousehlth.com, Boulder CO | Privacy, Terms | copyright Indigo Labs LLC

### Colorado Playbook (`/colorado-playbook`)

Repositioned around the full platform product suite (not the previous contingency-fee consulting model). Colorado-specific regulatory and climate pressures as the driver.

**Section flow:**

1. **Nav** (shared layout)
2. **Hero** — "Colorado Healthcare" eyebrow, "Sustainability Intelligence for Colorado Health Systems" headline, dual CTAs: "Start Free Assessment" (links to /contact) + "Download CFO's Guide" (gated download, same Formspree flow — PDF placeholder for now)
3. **Why Colorado, Why Now** — 3 cards with color-coded top borders:
   - Regulatory Mandate (red): HB21-1266 GHG reporting requirements
   - Wildfire & Climate Risk (amber): HVAC, air quality, facility resilience
   - Incentive Landscape (green): Federal IRA + state rebate stacking
4. **The Lighthouse Platform for Colorado** — 3 product cards (Carbon, Footprint, Capital) mapped to Colorado-specific use cases (HB21-1266 compliance, CMS/Joint Commission reporting, IRA incentive stacking)
5. **Colorado-specific FAQ**
6. **Final CTA** — "Schedule Discovery Call"
7. **Footer** (shared layout)

### Blog (`/blog`)

Clean list layout. No categories or tags at launch.

- **Index page:** List of posts with date, read time, title, excerpt
- **Post pages:** MDX rendered with shared layout, nav, footer
- **Content source:** `.mdx` files in `apps/web/content/blog/`
- **Metadata:** Frontmatter (title, date, excerpt, readTime, slug)
- **Initial content:** Migrate 3 existing Webflow blog stubs (Climate and Health, Cutting Emissions, Data Integration)

### Contact (`/contact`)

Full-page dark background with topographic contour lines (SVG) — nods to environmental data and the lighthouse navigational metaphor. Form card floats on top with glass-morphism/elevated treatment.

- **Form fields:** Name, Email, Organization, Role, Message (optional)
- **Submission:** Formspree → nick@lighthousehlth.com
- **Below form:** Direct contact info (nick@lighthousehlth.com, Boulder CO)
- **Role field** helps pre-qualify leads (sustainability officer vs. CFO vs. facilities)

## Design System Integration

### Colors (from existing Tailwind config)

- Primary Deep Teal: `#066E76` — buttons, links, headings, icons
- Primary Soft Teal: `#0E9BA7` — hovers, gradients
- Sustainability Green: `#16A34A` — positive metrics, KPI accents
- Navy: `#0a2540` — nav, footer, hero gradients, dark backgrounds
- Canvas: `#F3F5F7` — page backgrounds
- Surface: `#FFFFFF` — cards

### Typography

- Font: Inter var (existing config)
- Headings: font-weight 700-800, text-main color (#0F172A)
- Body: font-weight 400, text-secondary color (#64748b)
- Labels/eyebrows: uppercase, letter-spacing 1-2px, font-weight 600-700

### Icons

- Library: Lucide React (already a dependency)
- Style: 1.5px stroke, brand teal (#066E76), geometric
- Custom SVGs where Lucide doesn't have the right metaphor (platform product cards)

### Spacing & Layout

- Max content width: ~1200px centered
- Section padding: 64-96px vertical on desktop
- Card grid gaps: 16-24px
- Mobile responsive with Tailwind breakpoints (existing config)

## SEO

- Programmatic metadata via Next.js Metadata API (per-page titles, descriptions, Open Graph)
- `sitemap.ts` for auto-generated XML sitemap
- `robots.ts` for search engine directives
- JSON-LD structured data: Organization schema on homepage
- Static export produces pre-rendered HTML — instant LCP
- Canonical URLs set per page

## Hosting & Deployment

- **Platform:** Cloudflare Pages (free tier)
- **Build:** `next build` with `output: 'export'` in next.config
- **Deploy:** Git push triggers Cloudflare Pages build
- **Domain:** lighthousehlth.com DNS pointed to Cloudflare Pages
- **Upgrade path:** Vercel Pro ($20/mo) or Cloudflare Workers when SSR is needed for product subdomains

## Future Product Subdomains

The monorepo structure supports adding product apps later:

```
apps/
  web/          → lighthousehlth.com (this migration)
  capital/      → capital.lighthousehlth.com (future)
  footprint/    → footprint.lighthousehlth.com (future)
  carbon/       → carbon.lighthousehlth.com (future)
```

Each product app imports from `packages/ui` for shared components and tokens. The homepage platform product cards link to these subdomains when they go live.

## Out of Scope

- Dark mode (existing design system supports it, but not needed for marketing site launch)
- Analytics integration (can be added post-launch)
- CMS integration (Claude Code is the CMS)
- About page (covered on homepage traction section)
- Services page (replaced by platform product cards)
- Leaders/Thought Leaders page
- White paper content (PDF placeholder — gated download flow is built, content comes later)
- Product subdomain apps (future, post-launch)
