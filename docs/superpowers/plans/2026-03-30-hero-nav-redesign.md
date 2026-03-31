# Hero + Nav Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the solid-navy centered hero and nav with a glass-effect nav and split-layout hero featuring a Capital Decision Intelligence product card.

**Architecture:** Modify two existing components (`nav.tsx`, `page.tsx` hero section) and add one new component (`capital-card.tsx`). The product card uses a static inline SVG chart — no charting library. Glass effects use Tailwind's `backdrop-blur` utilities. All other homepage sections remain unchanged.

**Tech Stack:** Next.js 15, React 18, Tailwind CSS 3.x, Lucide icons

**Spec:** `docs/superpowers/specs/2026-03-30-hero-nav-redesign.md`

---

### Task 1: Glass Nav

**Files:**
- Modify: `apps/web/components/nav.tsx` (full rewrite, 77 lines)

- [ ] **Step 1: Update nav links and glass styling**

Replace the entire contents of `apps/web/components/nav.tsx`:

```tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/#platform', label: 'Platform' },
  { href: '/colorado-playbook', label: 'Colorado' },
  { href: '/blog', label: 'Blog' },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <nav className="border-b border-white/10 bg-navy/65 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="text-[15px] font-bold tracking-tight text-white">
            + Lighthouse HLTH
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
      {mobileOpen && (
        <div className="border-b border-white/10 bg-navy/80 px-6 py-4 backdrop-blur-xl md:hidden">
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
      )}
    </header>
  );
}
```

Key changes from current:
- `bg-navy` → `bg-navy/65 backdrop-blur-xl` (glass effect)
- `border-b border-white/10` added
- Links: Platform / Colorado / Blog (was Platform / Blog / Contact)
- CTA: `rounded-full` pill (was `rounded-md`)
- Logo: `+ Lighthouse HLTH` (was `Lighthouse HLTH`)
- Mobile toggle: 44px touch target via `h-11 w-11`
- Mobile menu: glass background (`bg-navy/80 backdrop-blur-xl`)

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add apps/web/components/nav.tsx
git commit -m "feat: glass nav with backdrop-blur, updated links, pill CTA"
```

---

### Task 2: Capital Decision Intelligence Card Component

**Files:**
- Create: `apps/web/components/capital-card.tsx`

- [ ] **Step 1: Create the glass product card component**

Create `apps/web/components/capital-card.tsx`:

```tsx
import { ArrowUpRight } from 'lucide-react';

export function CapitalCard() {
  return (
    <div className="relative">
      {/* Background glow */}
      <div className="absolute left-[10%] top-[20%] h-[60%] w-[80%] rounded-full bg-primary/15 blur-3xl" />

      {/* Glass card */}
      <div className="relative rounded-2xl border border-white/60 bg-white/55 p-5 shadow-lg backdrop-blur-xl sm:p-6">
        {/* Chart */}
        <div className="mb-4 rounded-xl bg-white p-4 shadow-sm">
          <svg
            viewBox="0 0 300 100"
            className="h-auto w-full"
            role="img"
            aria-label="Capital margin projection chart showing growth from 2024 to 2030, reaching 1.6 million dollars cumulative margin"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="capital-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d9488" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#0d9488" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <path
              d="M0,85 C30,80 60,70 90,60 C120,50 150,35 180,28 C210,20 240,15 270,10 L300,5 L300,100 L0,100 Z"
              fill="url(#capital-fill)"
            />
            <path
              d="M0,85 C30,80 60,70 90,60 C120,50 150,35 180,28 C210,20 240,15 270,10 L300,5"
              fill="none"
              stroke="#0d9488"
              strokeWidth={2}
            />
            <circle cx={0} cy={85} r={3} fill="#0d9488" />
            <circle cx={60} cy={70} r={3} fill="#0d9488" />
            <circle cx={120} cy={50} r={3} fill="#0d9488" />
            <circle cx={180} cy={28} r={3} fill="#0d9488" />
            <circle cx={240} cy={15} r={3} fill="#0d9488" />
            <circle cx={300} cy={5} r={3} fill="#0d9488" />
          </svg>
          <div className="mt-2 flex items-center justify-between text-[10px] text-gray-400">
            <span>2024</span><span>2025</span><span>2026</span><span>2027</span><span>2028</span><span>2029</span><span>2030</span>
          </div>
          <p className="mt-2 text-right text-xs text-gray-500">
            → $1.6M cumulative margin by 2030
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-medium text-gray-400">Lighthouse HLTH</p>
            <p className="text-[15px] font-bold tracking-tight text-navy">
              Capital Decision Intelligence
            </p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy">
            <ArrowUpRight size={16} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
```

Key details:
- Static SVG chart — zero bundle cost, no charting library
- `backdrop-blur-xl` + `bg-white/55` for glass effect
- `role="img"` + `aria-label` on SVG for screen readers
- Teal radial glow behind card via blurred div
- Uses `text-navy` for dark text — this class already exists in tailwind config

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds (component not yet used, but TypeScript should compile).

- [ ] **Step 3: Commit**

```bash
git add apps/web/components/capital-card.tsx
git commit -m "feat: add Capital Decision Intelligence glass card component"
```

---

### Task 3: Hero Section Redesign

**Files:**
- Modify: `apps/web/app/page.tsx:1-77` (replace hero section and KPI strip, keep everything else)

- [ ] **Step 1: Replace the hero section**

In `apps/web/app/page.tsx`, replace lines 1–89 (imports through end of KPI strip Section) with:

```tsx
import Link from 'next/link';
import { Section } from '@/components/section';
import { CarbonIcon, FootprintIcon, CapitalIcon } from '@/components/icons';
import { Clock, CheckSquare, DollarSign, Users } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import { CapitalCard } from '@/components/capital-card';

const products = [
  {
    icon: CarbonIcon,
    tag: 'Carbon',
    title: 'Emission Factor Intelligence',
    description: 'Scientifically credible healthcare emission factors. CliniCarbon knowledge base with full lineage and audit trail.',
    subdomain: 'carbon.lighthousehlth.com',
  },
  {
    icon: FootprintIcon,
    tag: 'Footprint',
    title: 'Facility Tracking & Reporting',
    description: 'Connect meters, invoices, and care data. Automated compliance reporting for CMS, Joint Commission, and state mandates.',
    subdomain: 'footprint.lighthousehlth.com',
  },
  {
    icon: CapitalIcon,
    tag: 'Capital',
    title: 'Decision Intelligence',
    description: 'ROI-ranked capital projects with incentive stacking. Surface the top five moves by emissions reduction and financial return.',
    subdomain: 'capital.lighthousehlth.com',
  },
];

const features = [
  { icon: Clock, title: 'End-to-end carbon accounting', description: 'Connect environmental and patient data for strategic insights.' },
  { icon: CheckSquare, title: 'Automated compliance generation', description: 'CMS, Joint Commission, state mandates — report-ready.' },
  { icon: DollarSign, title: 'Financial alignment', description: 'Sustainability efforts mapped to cost savings and ROI.' },
  { icon: Users, title: 'Cross-departmental collaboration', description: 'Facilities, clinical, finance — one shared view.' },
];

const expertiseTags = [
  'Healthcare carbon accounting architecture',
  'Pharmaceutical emissions (ECOVAMED)',
  '100+ hospital deployments',
  'Award-winning platform',
];

const heroStats = [
  { value: '$67K', label: 'Avg savings (CAH)', aria: '67 thousand dollars average annual savings for critical access hospitals' },
  { value: '18 mo', label: 'ROI payback', aria: '18 month return on investment payback period' },
  { value: '1-click', label: 'HB21-1286', aria: 'One click H B 21 1286 compliance reporting' },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-teal-50/30 to-teal-100/20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-16 md:py-20 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
          {/* Left: Copy */}
          <div>
            <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
              Colorado Healthcare Sustainability
            </span>

            <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl lg:text-4xl">
              15–20% margin improvement.{' '}
              <span className="text-primary">Compliance built in.</span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600 lg:text-base">
              Platform access included. Audit-ready reporting. Outcome-based pricing that shares your risk.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-soft"
              >
                Calculate Your ROI →
              </Link>
              <Link
                href="/colorado-playbook"
                className="inline-flex h-11 items-center text-sm font-medium text-navy underline underline-offset-4 transition-colors hover:text-primary"
              >
                Colorado Playbook ↗
              </Link>
            </div>

            <div className="mt-10 flex gap-6" role="list" aria-label="Key performance metrics">
              {heroStats.map((stat, i) => (
                <div key={stat.value} className="flex items-start gap-6" role="listitem" aria-label={stat.aria}>
                  {i > 0 && <div className="h-10 w-px bg-gray-200" aria-hidden="true" />}
                  <div>
                    <p className="text-lg font-extrabold text-navy sm:text-xl">{stat.value}</p>
                    <p className="text-[10px] font-medium text-gray-400 sm:text-xs">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Card */}
          <div className="lg:pl-4">
            <CapitalCard />
          </div>
        </div>
      </section>
```

This replaces the old hero (lines 57–77) AND the old KPI strip (lines 79–89). The KPI stats are now inline in the hero. The old `kpis` array and `KpiCard` import are removed.

Everything from `{/* Platform Products */}` (line 92 onward) stays exactly as-is.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds. All 12 pages generate.

- [ ] **Step 3: Visual check**

Run: `npm run dev`
Check at `http://localhost:3000`:
- Glass nav visible with backdrop-blur
- Split hero: copy left, product card right
- KPI stats below CTAs
- Below the hero, Platform Products section and all other sections unchanged
- Resize to 375px: single column, stacked layout, card below copy

- [ ] **Step 4: Commit**

```bash
git add apps/web/app/page.tsx
git commit -m "feat: split hero with glass product card and Colorado-focused copy"
```

---

### Task 4: Tailwind Tokens & Cleanup

**Files:**
- Modify: `apps/web/tailwind.config.ts` (add text-navy utility if missing)
- Delete: unused `KpiCard` import check

- [ ] **Step 1: Verify `text-navy` works**

The tailwind config already has `navy: '#0a2540'` in `theme.extend.colors`. This means `text-navy`, `bg-navy`, and `bg-navy/65` all work out of the box. Tailwind 3.x generates opacity modifiers automatically.

Run: `npx tailwind -c apps/web/tailwind.config.ts --content 'apps/web/components/nav.tsx' | grep navy`

If `text-navy` and `bg-navy` appear, no config changes needed. Skip to Step 2.

If not, add to `apps/web/tailwind.config.ts` inside `theme.extend.colors`:
```ts
navy: '#0a2540',
```
(This is already present — this step is a verification only.)

- [ ] **Step 2: Check for unused imports in page.tsx**

Verify that `apps/web/app/page.tsx` no longer imports `KpiCard`. The old import was:
```tsx
import { KpiCard } from '@/components/kpi-card';
```
This should have been removed in Task 3. If it's still there, remove it.

- [ ] **Step 3: Full build + deploy test**

Run:
```bash
npm run build
```
Expected: Build succeeds, all 12 pages generated, no TypeScript errors.

- [ ] **Step 4: Commit any remaining changes**

```bash
git add -A
git commit -m "chore: verify tailwind tokens and clean up unused imports"
```

(If no changes, skip this commit.)

---

### Task 5: Deploy & Verify Responsive

**Files:** None (deployment task)

- [ ] **Step 1: Deploy preview to Vercel**

```bash
npx vercel deploy --scope lighthouse-hlth
```

Expected: Build succeeds, preview URL returned.

- [ ] **Step 2: Test responsive breakpoints**

Open the preview URL. Test at these widths using browser DevTools responsive mode:

| Width | Expected behavior |
|-------|-------------------|
| 320px | Single column. Copy stacked above card. CTAs full-width stacked. KPIs 3-across compact. Hamburger nav. |
| 375px | Same as 320px but with more breathing room. |
| 768px | Full horizontal nav (no hamburger). Two-column grid starts at lg (1024px), so still single column here. |
| 1024px | Two-column split. Copy left, card right. Full nav. |
| 1440px | Same as 1024px, centered in max-w-7xl container with generous side padding. |

- [ ] **Step 3: Test glass nav scroll behavior**

Scroll down the page. The nav should:
- Stay sticky at top
- Show glass blur effect over page content behind it
- White text remains readable against blurred content

- [ ] **Step 4: Test mobile nav**

At 375px width:
- Tap hamburger icon (should be ≥ 44px tap target)
- Menu slides down with glass background
- Tap a link — menu closes, page navigates
- Tap "Contact us →" — navigates to /contact

---

### Task 6: Cleanup

- [ ] **Step 1: Delete spec file**

After verifying the preview deployment looks correct:

```bash
rm docs/superpowers/specs/2026-03-30-hero-nav-redesign.md
```

- [ ] **Step 2: Delete plan file**

```bash
rm docs/superpowers/plans/2026-03-30-hero-nav-redesign.md
```

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: remove spec and plan files after hero/nav implementation"
```
