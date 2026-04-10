# Brand Elevation ("The Journal") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate lighthousehlth.com from generic SaaS to clinical journal / research authority aesthetic, lead with CliniCarbon, add favicon/logo, fix SEO and copy.

**Architecture:** Marketing site only (apps/web). Fraunces serif display font for h1-h3, Inter stays for body. Color palette refined (deeper navy, cooler teal, warm off-white canvas). Lighthouse beam SVG mark + favicon. Homepage restructured to lead with CliniCarbon. No changes to packages/ui or app.lighthousehlth.com.

**Tech Stack:** Next.js 15, Tailwind CSS 3, Framer Motion 11, Google Fonts (Fraunces + Inter)

**Spec:** `docs/superpowers/specs/2026-04-10-brand-elevation-design.md`

---

### Task 1: Typography & Color Foundation

**Files:**
- Modify: `apps/web/app/layout.tsx`
- Modify: `apps/web/tailwind.config.ts`
- Modify: `apps/web/app/globals.css`

- [ ] **Step 1: Add Fraunces font to layout.tsx**

Replace the font imports and html tag in `apps/web/app/layout.tsx`:

```typescript
import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { getOrganizationJsonLd } from '@/lib/metadata';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-fraunces',
});
```

And update the html element:

```tsx
<html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
```

- [ ] **Step 2: Update tailwind.config.ts with display font + color overrides**

Replace the full content of `apps/web/tailwind.config.ts`:

```typescript
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
        display: ['var(--font-fraunces)', 'Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
};

export default config;
```

- [ ] **Step 3: Update globals.css canvas background**

Replace the content of `apps/web/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-canvas text-text-main;
  }
}
```

- [ ] **Step 4: Verify the build succeeds**

Run: `cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web && npm run build --workspace=@lighthouse-hlth/web`

Expected: Build succeeds. Fraunces font is loaded. No Tailwind errors.

- [ ] **Step 5: Commit**

```bash
cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web
git add apps/web/app/layout.tsx apps/web/tailwind.config.ts apps/web/app/globals.css
git commit -m "feat(web): add Fraunces serif display font and refine color palette

Introduces journal-authority typography: Fraunces for h1-h3 display headings,
Inter remains for body text. Color palette deepened: navy #0B1D2E, primary #0A7E8C,
warm off-white canvas #FAFAF7. Sub-product color tokens added."
```

---

### Task 2: Logo SVG Mark + Favicon

**Files:**
- Modify: `apps/web/components/icons.tsx` (add LighthouseBeam component)
- Create: `apps/web/app/icon.tsx` (Next.js dynamic favicon generation)

- [ ] **Step 1: Add LighthouseBeam mark to icons.tsx**

Add the following components to the end of `apps/web/components/icons.tsx`:

```tsx
export function LighthouseBeam({ className, size = 28 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Lighthouse HLTH"
    >
      {/* Beam — angled line from lower-left to upper-right */}
      <line x1="6" y1="26" x2="22" y2="6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {/* Radiating point — circle at beam terminus */}
      <circle cx="22" cy="6" r="4" fill="currentColor" opacity="0.85" />
      <circle cx="22" cy="6" r="7" fill="currentColor" opacity="0.15" />
      {/* Base anchor — short horizontal at foundation */}
      <line x1="2" y1="28" x2="12" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LighthouseBeamSmall({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <line x1="6" y1="26" x2="22" y2="6" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="22" cy="6" r="5" fill="currentColor" opacity="0.9" />
    </svg>
  );
}
```

- [ ] **Step 2: Create Next.js dynamic favicon (app/icon.tsx)**

Create `apps/web/app/icon.tsx`:

```tsx
import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0B1D2E',
          borderRadius: 6,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="6" y1="26" x2="22" y2="6" stroke="#0A7E8C" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="22" cy="6" r="5" fill="#0A7E8C" opacity="0.9" />
          <circle cx="22" cy="6" r="8" fill="#0A7E8C" opacity="0.2" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 3: Verify favicon renders**

Run: `cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web && npm run build --workspace=@lighthouse-hlth/web`

Expected: Build succeeds. Favicon is generated at `/icon` route.

- [ ] **Step 4: Commit**

```bash
cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web
git add apps/web/components/icons.tsx apps/web/app/icon.tsx
git commit -m "feat(web): add Lighthouse beam mark SVG and dynamic favicon

Geometric lighthouse beam mark: angled line with radiating point terminus.
Favicon generated dynamically via Next.js ImageResponse (32x32, navy bg, teal beam)."
```

---

### Task 3: Navigation Update

**Files:**
- Modify: `apps/web/components/nav.tsx`

- [ ] **Step 1: Rewrite nav.tsx with new logo and links**

Replace the full content of `apps/web/components/nav.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LighthouseBeam } from '@/components/icons';

const navLinks = [
  { href: '/carbon', label: 'CliniCarbon' },
  { href: '/#platform', label: 'Platform' },
  { href: '/blog', label: 'Blog' },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <nav className="border-b border-white/10 bg-navy/65 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <LighthouseBeam className="text-primary" size={24} />
            <span className="font-display text-[15px] font-semibold tracking-tight text-white">
              Lighthouse HLTH
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-full bg-primary px-5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-primary-soft"
            >
              Contact us →
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="flex h-11 w-11 items-center justify-center text-white md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden border-b border-white/10 bg-navy/80 backdrop-blur-xl md:hidden"
          >
            <div className="px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 text-sm text-white/80"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-3 block rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Contact us →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 2: Verify nav renders**

Run: `cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web && npx --workspace=@lighthouse-hlth/web next build`

Expected: Build succeeds. Nav shows beam mark + "Lighthouse HLTH" in serif, CliniCarbon link present.

- [ ] **Step 3: Commit**

```bash
cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web
git add apps/web/components/nav.tsx
git commit -m "feat(web): update nav with lighthouse beam mark and CliniCarbon link

Replaces text-only '+ Lighthouse HLTH' with beam mark + Fraunces logotype.
Nav links now: CliniCarbon, Platform, Blog, Contact. Colorado Playbook
removed from top nav (remains accessible at /colorado-playbook)."
```

---

### Task 4: Footer Update

**Files:**
- Modify: `apps/web/components/footer.tsx`

- [ ] **Step 1: Rewrite footer.tsx with new logo and founder attribution**

Replace the full content of `apps/web/components/footer.tsx`:

```tsx
import Link from 'next/link';
import { LighthouseBeam } from '@/components/icons';

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <LighthouseBeam className="text-primary" size={22} />
              <span className="font-display text-sm font-semibold">Lighthouse HLTH</span>
            </Link>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-white/50">
              Founded by Nicolas Vinson. Previously shadow.eco (100+ hospitals, EU &amp; Canada).
            </p>
            <p className="mt-2 text-xs text-white/40">nick@lighthousehlth.com · Boulder, CO</p>
          </div>
          <div className="flex flex-col gap-3 text-xs text-white/60 sm:flex-row sm:gap-8">
            <Link href="/carbon" className="transition-colors hover:text-white">
              CliniCarbon
            </Link>
            <Link href="/#platform" className="transition-colors hover:text-white">
              Platform
            </Link>
            <Link href="/colorado-playbook" className="transition-colors hover:text-white">
              Colorado Playbook
            </Link>
            <Link href="/blog" className="transition-colors hover:text-white">
              Editorial
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white">
              Contact
            </Link>
          </div>
          <div className="text-xs text-white/60 sm:text-right">
            <p>&copy; {new Date().getFullYear()} Indigo Labs LLC</p>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-[10px] text-white/40">
          Healthcare carbon intelligence — from emission factors to funded capital projects.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web && npx --workspace=@lighthouse-hlth/web next build`

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web
git add apps/web/components/footer.tsx
git commit -m "feat(web): update footer with beam mark, CliniCarbon link, founder attribution

Adds explicit shadow.eco credibility line. Links now include CliniCarbon
and Colorado Playbook. Tagline updated to match journal positioning."
```

---

### Task 5: Homepage Restructure

**Files:**
- Modify: `apps/web/app/page.tsx`

This is the largest task. The homepage is rewritten from scratch to lead with CliniCarbon.

- [ ] **Step 1: Rewrite page.tsx**

Replace the full content of `apps/web/app/page.tsx`:

```tsx
import Link from 'next/link';
import { Section } from '@/components/section';
import { CarbonIcon, FootprintIcon, CapitalIcon } from '@/components/icons';
import { Database, Shield, Layers, Stethoscope } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import { FadeIn, StaggerChildren, StaggerItem } from '@/components/motion';

const cliniCarbonStats = [
  { value: '1,413', label: 'Emission Factors' },
  { value: '11', label: 'EPA Sources' },
  { value: '287', label: 'Healthcare-Specific' },
  { value: '2026.1', label: 'Edition' },
];

const differentiators = [
  {
    icon: Layers,
    title: 'Healthcare category mapping',
    description: '60+ NAICS codes mapped to hospital-relevant categories — Pharmaceuticals, Surgical Supplies, Anesthesia, Food Service.',
  },
  {
    icon: Shield,
    title: 'Regulatory framework tags',
    description: 'Every factor marked for GHG Protocol, Colorado HB21-1286, SB 253, Joint Commission, Practice Greenhealth.',
  },
  {
    icon: Database,
    title: 'Audit-ready provenance',
    description: 'Every factor traces to a specific source, version, table, and URL. Copy the citation into your inventory report appendix.',
  },
  {
    icon: Stethoscope,
    title: 'Anesthetic gas quick-reference',
    description: 'The only emission factor reference with clinical context for desflurane, sevoflurane, isoflurane, and N\u2082O.',
  },
];

const products = [
  {
    icon: CarbonIcon,
    tag: 'CliniCarbon',
    title: 'Emission Factor Intelligence',
    status: 'Live',
    statusColor: 'bg-emerald-500',
    description: '1,413 audit-ready healthcare emission factors. Full provenance, healthcare-tagged, regulatory framework mapping.',
    href: '/carbon',
    color: 'text-product-carbon',
    borderColor: 'border-product-carbon/20',
  },
  {
    icon: FootprintIcon,
    tag: 'Footprint',
    title: 'Facility Tracking & Reporting',
    status: 'In development',
    statusColor: 'bg-product-footprint',
    description: 'Connect meters, invoices, and care data. Automated compliance reporting for CMS, Joint Commission, and state mandates.',
    href: '/#platform',
    color: 'text-product-footprint',
    borderColor: 'border-product-footprint/20',
  },
  {
    icon: CapitalIcon,
    tag: 'Capital',
    title: 'Decision Intelligence',
    status: 'Coming',
    statusColor: 'bg-product-capital',
    description: 'ROI-ranked capital projects with incentive stacking. Surface the top five moves by emissions reduction and financial return.',
    href: '/#platform',
    color: 'text-product-capital',
    borderColor: 'border-product-capital/20',
  },
];

const LS_INDIVIDUAL_URL = 'https://lighthousehlth.lemonsqueezy.com/checkout/buy/e18d1771-2464-435d-a082-43009044f595';

export default function Home() {
  return (
    <>
      {/* Hero — lead with CliniCarbon */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy to-primary/30">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/80">
                Edition 2026.1 — Updated March 2026
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                The definitive emission factor reference for healthcare carbon accounting.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
                1,413 audit-ready factors from 11 EPA datasets — curated, healthcare-tagged, and provenance-documented. Built on the same data foundation as the Eckelman et al. study that established US healthcare at 8.5% of national emissions.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={LS_INDIVIDUAL_URL}
                  className="lemonsqueezy-button inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-semibold text-navy transition-colors hover:bg-gray-100"
                >
                  Get CliniCarbon — $750/year
                </a>
                <Link
                  href="/#platform"
                  className="inline-flex h-12 items-center text-sm font-medium text-white/60 underline underline-offset-4 transition-colors hover:text-white"
                >
                  See what we're building →
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Lemon Squeezy overlay checkout */}
      <script src="https://assets.lemonsqueezy.com/lemon.js" defer />

      {/* Stats bar */}
      <section className="border-b border-border-subtle bg-white px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-4 text-center">
          {cliniCarbonStats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div>
                <p className="font-display text-2xl font-bold text-navy">{stat.value}</p>
                <p className="text-xs font-medium text-gray-400">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* What's Inside — CliniCarbon differentiators */}
      <Section className="bg-canvas">
        <FadeIn>
          <div className="mb-10">
            <h2 className="font-display text-h4 font-semibold text-neutral-900 md:text-h3">
              What you get that raw EPA data doesn&apos;t give you.
            </h2>
          </div>
        </FadeIn>
        <StaggerChildren className="grid gap-6 md:grid-cols-2">
          {differentiators.map((d, i) => (
            <StaggerItem key={d.title}>
              <div
                className={`rounded-xl border border-border-subtle p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  i === 0 ? 'bg-navy text-white' : 'bg-white'
                }`}
              >
                <d.icon
                  className={i === 0 ? 'mb-3 text-primary-soft' : 'mb-3 text-primary'}
                  size={24}
                  strokeWidth={1.5}
                />
                <h3 className={`text-sm font-semibold ${i === 0 ? 'text-white' : 'text-neutral-900'}`}>
                  {d.title}
                </h3>
                <p className={`mt-2 text-sm ${i === 0 ? 'text-white/70' : 'text-text-muted'}`}>
                  {d.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
        <FadeIn delay={0.3}>
          <div className="mt-8 text-center">
            <Link
              href="/carbon"
              className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary-soft"
            >
              See full workbook contents and pricing →
            </Link>
          </div>
        </FadeIn>
      </Section>

      {/* Building the Full Stack — platform roadmap */}
      <Section id="platform" className="bg-white">
        <FadeIn>
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Building the full stack</p>
            <h2 className="mt-2 font-display text-h4 font-semibold text-neutral-900 md:text-h3">
              From emission factors to funded capital projects.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-text-muted">
              CliniCarbon is the data foundation. Facility tracking and capital decision support are next — a complete sustainability intelligence stack for health systems.
            </p>
          </div>
        </FadeIn>
        <StaggerChildren className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <StaggerItem key={product.tag}>
              <Link
                href={product.href}
                className={`block rounded-xl border ${product.borderColor} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
              >
                <div className="flex items-center justify-between">
                  <product.icon className={product.color} size={28} />
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white ${product.statusColor}`}>
                    {product.status}
                  </span>
                </div>
                <p className={`mt-4 text-xs font-bold uppercase tracking-widest ${product.color}`}>
                  {product.tag}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-neutral-900">{product.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{product.description}</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Credibility — Eckelman citation + founder origin */}
      <FadeIn>
        <section className="bg-navy px-6 py-16 text-center text-white">
          <div className="mx-auto max-w-2xl">
            <blockquote className="font-display text-lg font-semibold leading-relaxed sm:text-xl">
              US healthcare is responsible for 8.5% of national greenhouse gas emissions — more than the entire agriculture sector.
            </blockquote>
            <p className="mt-4 text-xs text-white/50">
              Eckelman et al., <em>Health Affairs</em>, 2020
            </p>
            <div className="mx-auto mt-8 h-px w-12 bg-white/20" />
            <p className="mt-8 text-sm leading-relaxed text-white/60">
              &ldquo;Lighthouse HLTH exists to give the people reducing that number better tools.&rdquo;
            </p>
            <p className="mt-2 text-xs text-white/40">
              — Nicolas Vinson, Founder
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Origin story */}
      <Section className="bg-white">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Trusted roots</p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-700">
              Founded by Nicolas Vinson, who bootstrapped shadow.eco to 100+ hospitals across Europe and Canada. Lighthouse HLTH brings that operational depth to US healthcare, starting with the data layer.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* Blog Preview */}
      <Section className="bg-canvas">
        <FadeIn>
          <h2 className="mb-8 font-display text-h5 font-semibold text-neutral-900">
            Latest from the editorial
          </h2>
        </FadeIn>
        <StaggerChildren className="grid gap-4 md:grid-cols-3">
          {getAllPosts().slice(0, 3).map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-lg border border-border-subtle bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="p-5">
                  <p className="text-[10px] font-medium text-text-muted">{post.date}</p>
                  <h3 className="mt-1 text-sm font-semibold text-neutral-900 group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs text-text-muted">{post.excerpt}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* Final CTA */}
      <FadeIn>
        <section className="bg-gradient-to-br from-navy to-primary/80 px-6 py-20 text-center text-white">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-h4 font-semibold md:text-h3">
              Stop assembling emission factors from scratch.
            </h2>
            <p className="mt-4 text-sm text-white/60">
              CliniCarbon gives your team the definitive healthcare carbon accounting reference — auditable, complete, and always current.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={LS_INDIVIDUAL_URL}
                className="lemonsqueezy-button inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-semibold text-navy transition-colors hover:bg-gray-100"
              >
                Get the 2026 Reference →
              </a>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center text-sm font-medium text-white/60 transition-colors hover:text-white"
              >
                Questions? nick@lighthousehlth.com
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web && npx --workspace=@lighthouse-hlth/web next build`

Expected: Build succeeds. Homepage restructured with CliniCarbon hero.

- [ ] **Step 3: Commit**

```bash
cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web
git add apps/web/app/page.tsx
git commit -m "feat(web): restructure homepage to lead with CliniCarbon

Hero now drives to CliniCarbon purchase. Three pillars reframed as honest
roadmap (Live / In development / Coming). Fabricated testimonial replaced
with Eckelman et al. citation + founder origin story. All unsubstantiated
claims removed. Journal voice throughout."
```

---

### Task 6: Carbon Page Typography Refresh

**Files:**
- Modify: `apps/web/app/carbon/page.tsx`

- [ ] **Step 1: Apply Fraunces to h1-h3 headings on /carbon page**

In `apps/web/app/carbon/page.tsx`, apply `font-display` class to all h1-h3 elements and replace `font-bold` with `font-semibold` on h2-h3 (keeping `font-bold` on h1 only). The changes are:

Line 91 — hero h1:
```tsx
{/* old */}
<h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
{/* new */}
<h1 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
```

Line 143 — problem h2:
```tsx
{/* old */}
<h2 className="text-h4 font-bold text-neutral-900 md:text-h3">
{/* new */}
<h2 className="font-display text-h4 font-semibold text-neutral-900 md:text-h3">
```

Line 161 — differentiators h2:
```tsx
{/* old */}
<h2 className="text-h4 font-bold text-neutral-900 md:text-h3">What you get that raw EPA data doesn&apos;t give you.</h2>
{/* new */}
<h2 className="font-display text-h4 font-semibold text-neutral-900 md:text-h3">What you get that raw EPA data doesn&apos;t give you.</h2>
```

Line 181 — workbook h2:
```tsx
{/* old */}
<h2 className="text-h4 font-bold text-neutral-900">One workbook. Nine sheets. Full provenance.</h2>
{/* new */}
<h2 className="font-display text-h4 font-semibold text-neutral-900">One workbook. Nine sheets. Full provenance.</h2>
```

Line 232 — who it's for h2:
```tsx
{/* old */}
<h2 className="text-center text-h4 font-bold text-neutral-900 md:text-h3">
{/* new */}
<h2 className="text-center font-display text-h4 font-semibold text-neutral-900 md:text-h3">
```

Line 251 — pricing h2:
```tsx
{/* old */}
<h2 className="text-h4 font-bold text-neutral-900 md:text-h3">Annual reference subscription</h2>
{/* new */}
<h2 className="font-display text-h4 font-semibold text-neutral-900 md:text-h3">Annual reference subscription</h2>
```

Line 314 — FAQ h2:
```tsx
{/* old */}
<h2 className="mb-8 text-center text-h4 font-bold text-neutral-900">Frequently asked questions</h2>
{/* new */}
<h2 className="mb-8 text-center font-display text-h4 font-semibold text-neutral-900">Frequently asked questions</h2>
```

Line 333 — final CTA h2:
```tsx
{/* old */}
<h2 className="text-h4 font-bold md:text-h3">Stop assembling emission factors from scratch.</h2>
{/* new */}
<h2 className="font-display text-h4 font-semibold md:text-h3">Stop assembling emission factors from scratch.</h2>
```

Also update the stats bar metric values to use display font (line ~134):
```tsx
{/* old */}
<p className="text-2xl font-extrabold text-navy">{stat.value}</p>
{/* new */}
<p className="font-display text-2xl font-bold text-navy">{stat.value}</p>
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web && npx --workspace=@lighthouse-hlth/web next build`

Expected: Build succeeds. /carbon page headings now render in Fraunces serif.

- [ ] **Step 3: Commit**

```bash
cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web
git add apps/web/app/carbon/page.tsx
git commit -m "style(web): apply Fraunces serif to /carbon page headings

All h1-h3 headings and stat metrics now use font-display (Fraunces).
No content changes — typography refresh only."
```

---

### Task 7: Blog Page Update

**Files:**
- Modify: `apps/web/app/blog/page.tsx`
- Modify: `apps/web/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Update blog index page**

Replace the full content of `apps/web/app/blog/page.tsx`:

```tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { Section } from '@/components/section';

export const metadata: Metadata = {
  title: 'Editorial',
  description: 'Research, analysis, and perspectives on healthcare carbon accounting and sustainability.',
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <Section className="bg-white">
      <h1 className="font-display text-h3 font-bold text-neutral-900">Editorial</h1>
      <p className="mt-2 text-body-sm text-text-muted">
        Research, analysis, and perspectives on healthcare carbon accounting and sustainability.
      </p>

      <div className="mt-10 divide-y divide-border-subtle">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block py-6">
            <p className="text-xs text-neutral-400">{post.date} &middot; {post.readTime}</p>
            <h2 className="mt-1 font-display text-lg font-semibold text-neutral-900 group-hover:text-primary">{post.title}</h2>
            <p className="mt-1 text-sm text-text-muted">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Update blog post page headings**

In `apps/web/app/blog/[slug]/page.tsx`, update the h1 on line 26:

```tsx
{/* old */}
<h1 className="mt-2 text-h3 font-bold text-neutral-900">{post.title}</h1>
{/* new */}
<h1 className="mt-2 font-display text-h3 font-bold text-neutral-900">{post.title}</h1>
```

- [ ] **Step 3: Verify build**

Run: `cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web && npx --workspace=@lighthouse-hlth/web next build`

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web
git add apps/web/app/blog/page.tsx apps/web/app/blog/\[slug\]/page.tsx
git commit -m "style(web): rename blog to Editorial, apply Fraunces to headings

Blog index title now 'Editorial'. All h1-h2 headings use font-display.
Meta description updated with carbon accounting keywords."
```

---

### Task 8: Contact Page Typography Refresh

**Files:**
- Modify: `apps/web/app/contact/page.tsx`

- [ ] **Step 1: Update contact page headings and metadata**

In `apps/web/app/contact/page.tsx`, update the metadata (line 5) and h1 (line 33):

Metadata:
```tsx
{/* old */}
export const metadata: Metadata = {
  title: 'Contact',
  description: 'Schedule a 30-minute discovery call to map your sustainability starting point.',
};
{/* new */}
export const metadata: Metadata = {
  title: 'Talk to Us',
  description: 'Schedule a 30-minute discovery call to map your sustainability starting point.',
};
```

H1:
```tsx
{/* old */}
<h1 className="text-center text-h4 font-bold text-neutral-900">Let&apos;s Talk</h1>
{/* new */}
<h1 className="text-center font-display text-h4 font-bold text-neutral-900">Let&apos;s Talk</h1>
```

- [ ] **Step 2: Verify build**

Run: `cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web && npx --workspace=@lighthouse-hlth/web next build`

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web
git add apps/web/app/contact/page.tsx
git commit -m "style(web): apply Fraunces to contact page, update title to 'Talk to Us'"
```

---

### Task 9: SEO & Metadata

**Files:**
- Modify: `apps/web/app/layout.tsx` (metadata object)
- Modify: `apps/web/lib/metadata.ts` (JSON-LD)

- [ ] **Step 1: Update root metadata in layout.tsx**

In `apps/web/app/layout.tsx`, update the metadata export:

```tsx
{/* old */}
export const metadata: Metadata = {
  title: {
    default: 'Lighthouse HLTH | Healthcare Sustainability Platform',
    template: '%s | Lighthouse HLTH',
  },
  description:
    'Reduce emissions, improve patient care, and save money — all from one integrated platform.',
  metadataBase: new URL('https://lighthousehlth.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Lighthouse HLTH',
  },
};
{/* new */}
export const metadata: Metadata = {
  title: {
    default: 'Lighthouse HLTH | Healthcare Carbon Intelligence',
    template: '%s | Lighthouse HLTH',
  },
  description:
    '1,413 audit-ready healthcare emission factors from 11 EPA datasets. Built by the team behind 100+ hospital deployments in EU and Canada. CliniCarbon is live — full platform coming.',
  metadataBase: new URL('https://lighthousehlth.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Lighthouse HLTH',
  },
};
```

- [ ] **Step 2: Update JSON-LD schema in lib/metadata.ts**

Replace the full content of `apps/web/lib/metadata.ts`:

```typescript
export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lighthouse HLTH',
    url: 'https://lighthousehlth.com',
    description: 'Healthcare carbon intelligence — from emission factors to funded capital projects. Founded by Nicolas Vinson, previously shadow.eco (100+ hospitals, EU & Canada).',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Boulder',
      addressRegion: 'CO',
      addressCountry: 'US',
    },
    founder: {
      '@type': 'Person',
      name: 'Nicolas Vinson',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'nick@lighthousehlth.com',
      contactType: 'sales',
    },
  };
}
```

Note: The `logo` field is removed — the previous value (`https://lighthousehlth.com/logo.png`) pointed to a file that doesn't exist. Once the beam mark is exported as a static PNG, add it back.

- [ ] **Step 3: Verify build**

Run: `cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web && npx --workspace=@lighthouse-hlth/web next build`

Expected: Build succeeds. JSON-LD embedded in page source.

- [ ] **Step 4: Commit**

```bash
cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web
git add apps/web/app/layout.tsx apps/web/lib/metadata.ts
git commit -m "seo(web): update meta title, description, and JSON-LD schema

Title: 'Healthcare Carbon Intelligence'. Description leads with CliniCarbon
stats and credibility anchor. JSON-LD adds founder info, removes broken
logo reference. OG tags inherit from root metadata."
```

---

### Task 10: Build Verification & Cleanup

**Files:**
- Verify: all modified files
- Remove: `apps/web/components/capital-card.tsx` (no longer imported)

- [ ] **Step 1: Remove unused capital-card.tsx**

The `CapitalCard` component is no longer imported by the homepage. Delete `apps/web/components/capital-card.tsx`.

- [ ] **Step 2: Full build verification**

Run: `cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web && npm run build --workspace=@lighthouse-hlth/web`

Expected: Clean build with no errors or warnings about missing imports.

- [ ] **Step 3: Verify sitemap includes /carbon**

Check `apps/web/app/sitemap.ts` — it already includes `/carbon` with priority 0.9. No changes needed.

- [ ] **Step 4: Commit cleanup**

```bash
cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web
git rm apps/web/components/capital-card.tsx
git commit -m "chore(web): remove unused CapitalCard component

No longer imported after homepage restructure. The hero now uses
typography-driven layout without the illustrated card."
```

- [ ] **Step 5: Start dev server and visually verify all pages**

Run: `cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-web && npm run dev --workspace=@lighthouse-hlth/web`

Manually check:
- `/` — CliniCarbon hero, serif headings, stats bar, differentiators, platform roadmap, Eckelman citation, origin story, blog preview, CTA
- `/carbon` — Serif headings, warm canvas background, same content
- `/blog` — Title says "Editorial", serif headings
- `/contact` — Serif h1, same form
- `/colorado-playbook` — Accessible but not in top nav
- Favicon — small beam mark on navy background in browser tab
- Nav — beam mark + "Lighthouse HLTH" in serif, CliniCarbon link works
- Footer — founder attribution visible, CliniCarbon link works
