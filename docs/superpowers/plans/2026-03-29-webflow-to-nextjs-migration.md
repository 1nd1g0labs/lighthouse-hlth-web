# Webflow-to-Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate lighthousehlth.com from Webflow to a Next.js 15 static site within the lighthouse-hlth-ui repo, converting it to a monorepo with the design system as a shared package.

**Architecture:** npm workspaces monorepo — `apps/web` (Next.js 15 App Router, static export) consumes `packages/ui` (existing design system moved from `src/`). Tailwind v3 config shared via preset. Cloudflare Pages for hosting ($0/mo). Formspree for form submission.

**Tech Stack:** Next.js 15, React 18, Tailwind CSS 3, CVA, Lucide React, Framer Motion, MDX, Formspree

**Spec:** `docs/superpowers/specs/2026-03-29-webflow-to-nextjs-migration-design.md`

---

## File Map

### Root (modified)
- `package.json` — converted to workspaces root
- `tsconfig.json` — base config referenced by apps/packages
- `.gitignore` — add Next.js entries

### packages/ui/ (moved from root)
- `packages/ui/package.json` — existing, path updated
- `packages/ui/tsconfig.json` — existing, moved
- `packages/ui/tsup.config.ts` — existing, moved
- `packages/ui/tailwind.config.js` — existing, moved (source of truth for tokens)
- `packages/ui/src/` — all existing components, tokens, styles (moved from `src/`)
- `packages/ui/.storybook/` — existing, moved
- `packages/ui/postcss.config.js` — existing, moved
- `packages/ui/.eslintrc.js` — existing, moved

### apps/web/ (new)
- `apps/web/package.json` — Next.js app dependencies
- `apps/web/tsconfig.json` — extends root, adds Next.js types
- `apps/web/next.config.ts` — static export, image optimization off
- `apps/web/tailwind.config.ts` — extends packages/ui config as preset
- `apps/web/postcss.config.js` — tailwindcss + autoprefixer
- `apps/web/app/globals.css` — Tailwind directives + Inter font import
- `apps/web/app/layout.tsx` — root layout with nav + footer + metadata
- `apps/web/app/page.tsx` — homepage (10 sections)
- `apps/web/app/contact/page.tsx` — contact form with topographic background
- `apps/web/app/colorado-playbook/page.tsx` — Colorado landing page
- `apps/web/app/blog/page.tsx` — blog index
- `apps/web/app/blog/[slug]/page.tsx` — individual blog post
- `apps/web/app/sitemap.ts` — auto-generated XML sitemap
- `apps/web/app/robots.ts` — robots.txt
- `apps/web/lib/blog.ts` — MDX loading utilities
- `apps/web/lib/metadata.ts` — shared metadata helpers
- `apps/web/components/nav.tsx` — site navigation
- `apps/web/components/footer.tsx` — site footer
- `apps/web/components/icons.tsx` — custom SVG icons for platform products
- `apps/web/components/kpi-card.tsx` — KPI metric card
- `apps/web/components/section.tsx` — reusable section wrapper
- `apps/web/components/contact-form.tsx` — Formspree form component
- `apps/web/content/blog/climate-and-health.mdx` — blog stub
- `apps/web/content/blog/cutting-emissions.mdx` — blog stub
- `apps/web/content/blog/data-integration.mdx` — blog stub

---

### Task 1: Convert Repository to Monorepo

**Files:**
- Modify: `package.json` (root)
- Modify: `tsconfig.json` (root)
- Modify: `.gitignore`
- Move: `src/` → `packages/ui/src/`
- Move: `tailwind.config.js` → `packages/ui/tailwind.config.js`
- Move: `tsup.config.ts` → `packages/ui/tsup.config.ts`
- Move: `postcss.config.js` → `packages/ui/postcss.config.js`
- Move: `.eslintrc.js` → `packages/ui/.eslintrc.js`
- Move: `.storybook/` → `packages/ui/.storybook/`
- Move: `examples/` → `packages/ui/examples/`
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`

- [ ] **Step 1: Create monorepo directory structure**

```bash
cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-ui
mkdir -p apps packages/ui
```

- [ ] **Step 2: Move design system files into packages/ui**

```bash
# Move source and config files
mv src packages/ui/
mv tailwind.config.js packages/ui/
mv tsup.config.ts packages/ui/
mv postcss.config.js packages/ui/
mv .eslintrc.js packages/ui/
mv .storybook packages/ui/
mv examples packages/ui/
mv .prettierrc packages/ui/
mv scripts packages/ui/
mv preview.html packages/ui/
mv dist packages/ui/
```

- [ ] **Step 3: Create packages/ui/package.json**

Copy the existing root `package.json` to `packages/ui/package.json`. Keep all dependencies, scripts, exports, and publish config. The `name` stays `@1nd1g0labs/lighthouse-hlth-ui`.

```json
{
  "name": "@1nd1g0labs/lighthouse-hlth-ui",
  "version": "1.3.1",
  "description": "Lighthouse Health Design System - A comprehensive branded UI component library for healthcare sustainability applications",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "repository": {
    "type": "git",
    "url": "https://github.com/1nd1g0labs/lighthouse-hlth-ui.git"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com",
    "access": "restricted"
  },
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./dist/styles.css": "./dist/styles.css",
    "./styles.css": "./dist/styles.css",
    "./tokens": {
      "types": "./dist/tokens/index.d.ts",
      "import": "./dist/tokens/index.mjs",
      "require": "./dist/tokens/index.js"
    },
    "./tokens/tokens.css": "./dist/tokens/tokens.css",
    "./tokens/framer-tokens.json": "./dist/tokens/framer-tokens.json",
    "./tokens/email-tokens.css": "./dist/tokens/email-tokens.css",
    "./framer": {
      "types": "./dist/framer/index.d.ts",
      "import": "./dist/framer/index.mjs",
      "require": "./dist/framer/index.js"
    }
  },
  "files": ["dist", "README.md", "LICENSE", "NOTICE"],
  "scripts": {
    "dev": "tsup --watch",
    "build": "tsup && npm run generate:tokens",
    "build:lib": "tsup && npm run generate:tokens",
    "generate:tokens": "ts-node --project scripts/tsconfig.json scripts/generate-css.ts && ts-node --project scripts/tsconfig.json scripts/generate-framer-tokens.ts && ts-node --project scripts/tsconfig.json scripts/generate-email-css.ts",
    "sync:framer": "ts-node --project scripts/tsconfig.json scripts/sync-framer-tokens.ts",
    "type-check": "tsc --noEmit",
    "lint": "eslint . --ext .ts,.tsx",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,css}\"",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build && touch ./storybook-static/.nojekyll",
    "prepublishOnly": "npm run build:lib"
  },
  "keywords": ["react", "nextjs", "framer", "design-system", "ui-library", "healthcare", "sustainability", "lighthouse-health"],
  "author": "Indigo Labs LLC",
  "license": "SEE LICENSE IN LICENSE",
  "private": false,
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "dependencies": {
    "@tanstack/react-virtual": "^3.13.13",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.344.0",
    "recharts": "^3.6.0"
  },
  "devDependencies": {
    "@storybook/addon-essentials": "^8.6.14",
    "@storybook/addon-interactions": "^8.6.14",
    "@storybook/addon-links": "^8.6.14",
    "@storybook/blocks": "^8.6.14",
    "@storybook/react": "^8.6.14",
    "@storybook/react-vite": "^8.6.14",
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@typescript-eslint/eslint-plugin": "^6.19.0",
    "@typescript-eslint/parser": "^6.19.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^8.56.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "postcss": "^8.5.6",
    "prettier": "^3.2.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "storybook": "^8.6.14",
    "tailwindcss": "^3.4.18",
    "ts-node": "^10.9.2",
    "tsup": "^8.0.1",
    "typescript": "^5.3.3",
    "vite": "^5.4.21"
  }
}
```

- [ ] **Step 4: Create packages/ui/tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 5: Convert root package.json to workspaces root**

Replace the root `package.json` with:

```json
{
  "name": "lighthouse-hlth",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "npm run dev --workspace=apps/web",
    "build": "npm run build --workspace=apps/web",
    "build:ui": "npm run build --workspace=packages/ui",
    "storybook": "npm run storybook --workspace=packages/ui"
  }
}
```

- [ ] **Step 6: Update root tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "jsx": "react-jsx"
  }
}
```

- [ ] **Step 7: Update .gitignore**

Add Next.js entries to `.gitignore`:

```
# Next.js
.next/
out/

# Superpowers brainstorm sessions
.superpowers/
```

- [ ] **Step 8: Delete old node_modules and reinstall**

```bash
rm -rf node_modules package-lock.json
npm install
```

- [ ] **Step 9: Verify packages/ui builds**

```bash
npm run build:ui
```

Expected: tsup completes successfully, `packages/ui/dist/` is populated.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "refactor: convert to npm workspaces monorepo

Move design system from root src/ to packages/ui/.
Root becomes workspaces root for apps/* and packages/*.
Existing @1nd1g0labs/lighthouse-hlth-ui package unchanged."
```

---

### Task 2: Scaffold Next.js App

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/next.config.ts`
- Create: `apps/web/tailwind.config.ts`
- Create: `apps/web/postcss.config.js`
- Create: `apps/web/app/globals.css`
- Create: `apps/web/app/layout.tsx` (minimal, no nav/footer yet)
- Create: `apps/web/app/page.tsx` (placeholder)

- [ ] **Step 1: Create apps/web/package.json**

```json
{
  "name": "@lighthouse-hlth/web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@1nd1g0labs/lighthouse-hlth-ui": "*",
    "next": "^15.3.1",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.344.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "framer-motion": "^11.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "typescript": "^5.3.3",
    "tailwindcss": "^3.4.18",
    "autoprefixer": "^10.4.21",
    "postcss": "^8.5.6",
    "@next/mdx": "^15.3.1",
    "@mdx-js/loader": "^3.0.0",
    "@mdx-js/react": "^3.0.0",
    "gray-matter": "^4.0.3"
  }
}
```

- [ ] **Step 2: Create apps/web/tsconfig.json**

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowJs": true,
    "noEmit": true,
    "incremental": true,
    "jsx": "preserve",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@ui/*": ["../../packages/ui/src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.mdx"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create apps/web/next.config.ts**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@1nd1g0labs/lighthouse-hlth-ui'],
};

export default nextConfig;
```

- [ ] **Step 4: Create apps/web/tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss';
import uiConfig from '../../packages/ui/tailwind.config.js';

const config: Config = {
  presets: [uiConfig],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0a2540',
      },
    },
  },
};

export default config;
```

- [ ] **Step 5: Create apps/web/postcss.config.js**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Create apps/web/app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

@layer base {
  html {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-canvas text-text-main;
  }
}
```

- [ ] **Step 7: Create minimal apps/web/app/layout.tsx**

```tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lighthouse HLTH | Healthcare Sustainability Platform',
  description:
    'Reduce emissions, improve patient care, and save money — all from one integrated platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 8: Create placeholder apps/web/app/page.tsx**

```tsx
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-h3 font-bold text-primary">Lighthouse HLTH</h1>
    </main>
  );
}
```

- [ ] **Step 9: Install dependencies and verify**

```bash
cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-ui
rm -rf node_modules package-lock.json apps/web/node_modules
npm install
```

- [ ] **Step 10: Verify dev server starts**

```bash
npm run dev
```

Expected: Next.js dev server starts on `http://localhost:3000`. Page shows "Lighthouse HLTH" in primary teal. Tailwind classes resolve correctly (text color is `#066E76`, background is `#F3F5F7`).

- [ ] **Step 11: Verify static export**

```bash
npm run build
```

Expected: `apps/web/out/` directory created with `index.html`. No build errors.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 app with static export

apps/web configured with App Router, Tailwind extending
packages/ui tokens, and Cloudflare Pages-ready static export."
```

---

### Task 3: Navigation and Footer Components

**Files:**
- Create: `apps/web/components/nav.tsx`
- Create: `apps/web/components/footer.tsx`
- Modify: `apps/web/app/layout.tsx`

- [ ] **Step 1: Create apps/web/components/nav.tsx**

```tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/#platform', label: 'Platform' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-white">
          Lighthouse HLTH
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-soft"
          >
            Book a Demo
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-navy px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm text-white/80"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-3 block rounded-md bg-primary px-5 py-2 text-center text-sm font-semibold text-white"
            onClick={() => setMobileOpen(false)}
          >
            Book a Demo
          </Link>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Create apps/web/components/footer.tsx**

```tsx
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold">Lighthouse HLTH</p>
          <p className="mt-2 text-xs text-white/60">nick@lighthousehlth.com</p>
          <p className="text-xs text-white/60">Boulder, CO</p>
        </div>
        <div className="flex gap-8 text-xs text-white/60">
          <Link href="/blog" className="hover:text-white">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-white">
            Contact
          </Link>
          <Link href="/colorado-playbook" className="hover:text-white">
            Colorado Playbook
          </Link>
        </div>
        <div className="text-right text-xs text-white/60">
          <p>Privacy &middot; Terms</p>
          <p className="mt-1">&copy; {new Date().getFullYear()} Indigo Labs LLC</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Update apps/web/app/layout.tsx to include Nav and Footer**

```tsx
import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Lighthouse HLTH | Healthcare Sustainability Platform',
    template: '%s | Lighthouse HLTH',
  },
  description:
    'Reduce emissions, improve patient care, and save money — all from one integrated platform.',
  metadataBase: new URL('https://lighthousehlth.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Expected: Nav with "Lighthouse HLTH" logo, Platform/Blog/Contact links, "Book a Demo" button on dark navy background. Footer at bottom. Mobile menu toggles on narrow viewport.

- [ ] **Step 5: Commit**

```bash
git add apps/web/components/nav.tsx apps/web/components/footer.tsx apps/web/app/layout.tsx
git commit -m "feat: add navigation and footer components

Sticky nav with mobile hamburger menu. Footer with contact info
and legal links. Both use design system tokens."
```

---

### Task 4: Homepage — All 10 Sections

**Files:**
- Create: `apps/web/components/icons.tsx`
- Create: `apps/web/components/kpi-card.tsx`
- Create: `apps/web/components/section.tsx`
- Modify: `apps/web/app/page.tsx`

- [ ] **Step 1: Create apps/web/components/section.tsx**

Reusable section wrapper with max-width, padding, and optional background color.

```tsx
import { cn } from 'clsx';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('px-6 py-16 md:py-24', className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
```

- [ ] **Step 2: Create apps/web/components/kpi-card.tsx**

```tsx
interface KpiCardProps {
  value: string;
  label: string;
  detail: string;
}

export function KpiCard({ value, label, detail }: KpiCardProps) {
  return (
    <div className="rounded-lg border-l-[3px] border-l-sustainability bg-white p-5 text-center shadow-sm">
      <p className="text-3xl font-extrabold text-primary">{value}</p>
      <p className="mt-1 text-sm font-semibold text-neutral-700">{label}</p>
      <p className="mt-0.5 text-xs text-neutral-400">{detail}</p>
    </div>
  );
}
```

- [ ] **Step 3: Create apps/web/components/icons.tsx**

Custom SVG icons for the three platform product cards. Minimalist line style, 1.5px stroke.

```tsx
interface IconProps {
  className?: string;
  size?: number;
}

export function CarbonIcon({ className, size = 32 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 20V10" />
      <path d="M18 20V4" />
      <path d="M6 20v-4" />
    </svg>
  );
}

export function FootprintIcon({ className, size = 32 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export function CapitalIcon({ className, size = 32 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2 20h20" />
      <path d="M5 20v-8l4-4 4 4v8" />
      <path d="M17 20V8l4 4" />
    </svg>
  );
}
```

- [ ] **Step 4: Build the full homepage in apps/web/app/page.tsx**

This is a long file — all 10 sections as described in the spec. Build it with the section components and design tokens.

```tsx
import Link from 'next/link';
import { Section } from '@/components/section';
import { KpiCard } from '@/components/kpi-card';
import { CarbonIcon, FootprintIcon, CapitalIcon } from '@/components/icons';
import { Clock, CheckSquare, DollarSign, Users } from 'lucide-react';

const kpis = [
  { value: '92%', label: 'Anesthetic gas reduction', detail: '$84K saved' },
  { value: '$220K', label: 'HVAC retrofit savings', detail: 'During wildfire events' },
  { value: '47%', label: 'Less hazardous waste', detail: 'Procurement shift' },
  { value: '8.5%', label: 'Hospital emissions share', detail: 'Often invisible to ops' },
];

const products = [
  {
    icon: CarbonIcon,
    tag: 'Carbon',
    title: 'Emission Factor Intelligence',
    description:
      'Scientifically credible healthcare emission factors. CliniCarbon knowledge base with full lineage and audit trail.',
    subdomain: 'carbon.lighthousehlth.com',
  },
  {
    icon: FootprintIcon,
    tag: 'Footprint',
    title: 'Facility Tracking & Reporting',
    description:
      'Connect meters, invoices, and care data. Automated compliance reporting for CMS, Joint Commission, and state mandates.',
    subdomain: 'footprint.lighthousehlth.com',
  },
  {
    icon: CapitalIcon,
    tag: 'Capital',
    title: 'Decision Intelligence',
    description:
      'ROI-ranked capital projects with incentive stacking. Surface the top five moves by emissions reduction and financial return.',
    subdomain: 'capital.lighthousehlth.com',
  },
];

const features = [
  {
    icon: Clock,
    title: 'End-to-end carbon accounting',
    description: 'Connect environmental and patient data for strategic insights.',
  },
  {
    icon: CheckSquare,
    title: 'Automated compliance generation',
    description: 'CMS, Joint Commission, state mandates — report-ready.',
  },
  {
    icon: DollarSign,
    title: 'Financial alignment',
    description: 'Sustainability efforts mapped to cost savings and ROI.',
  },
  {
    icon: Users,
    title: 'Cross-departmental collaboration',
    description: 'Facilities, clinical, finance — one shared view.',
  },
];

const expertiseTags = [
  'Healthcare carbon accounting architecture',
  'Pharmaceutical emissions (ECOVAMED)',
  '100+ hospital deployments',
  'Award-winning platform',
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-primary px-6 py-20 text-center text-white md:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
            Healthcare Sustainability Platform
          </p>
          <h1 className="text-h3 font-bold md:text-h2">
            Your hospital&apos;s climate impact — now clinically actionable
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-body text-white/80">
            Reduce emissions, improve patient care, and save money — all from one
            integrated platform.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-md bg-primary-soft px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary"
            >
              Schedule a Call
            </Link>
            <Link
              href="#whitepaper"
              className="rounded-md border border-white/30 px-6 py-3 text-sm text-white transition-colors hover:bg-white/10"
            >
              Download White Paper
            </Link>
          </div>
        </div>
      </section>

      {/* KPI Strip */}
      <Section className="bg-canvas">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
          Proven Results
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.value} {...kpi} />
          ))}
        </div>
      </Section>

      {/* Platform Products */}
      <Section id="platform" className="bg-white">
        <div className="mb-10 text-center">
          <h2 className="text-h4 font-bold text-neutral-900 md:text-h3">
            One platform. Three pillars.
          </h2>
          <p className="mt-2 text-body-sm text-text-muted">
            Full lifecycle sustainability intelligence for health systems.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.tag}
              className="rounded-xl border border-border-subtle p-6 text-center transition-shadow hover:shadow-card"
            >
              <product.icon className="mx-auto mb-3 text-primary" />
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                {product.tag}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-neutral-900">
                {product.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted">{product.description}</p>
              <p className="mt-4 text-xs font-semibold text-primary">
                {product.subdomain}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Features */}
      <Section className="bg-canvas">
        <h2 className="mb-10 text-center text-h4 font-bold text-neutral-900 md:text-h3">
          Transforming climate data into actionable healthcare insights
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg bg-white p-6 text-center shadow-sm"
            >
              <feature.icon
                className="mx-auto mb-3 text-primary"
                size={28}
                strokeWidth={1.5}
              />
              <h3 className="text-sm font-semibold text-primary">{feature.title}</h3>
              <p className="mt-1 text-sm text-text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Traction / Origin Story */}
      <Section className="border-t border-border-subtle bg-white">
        <div className="mb-8 grid text-center md:grid-cols-3">
          {['Trusted roots.', 'Proven experience.', 'A new chapter for US healthcare.'].map(
            (text) => (
              <p
                key={text}
                className="py-2 text-xs font-bold uppercase tracking-widest text-primary"
              >
                {text}
              </p>
            ),
          )}
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-body-sm leading-relaxed text-neutral-700">
            Lighthouse HLTH evolves the foundation of an award-winning sustainability
            platform founded and architected by a team serving over 100 hospitals across
            Europe and Canada.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            From that experience, an opportunity was born — to bring the same precision,
            transparency, and ROI-driven sustainability tools to the U.S. healthcare
            system, where environmental and operational health are deeply intertwined.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {expertiseTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </Section>

      {/* Testimonial */}
      <section className="bg-primary px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <blockquote className="text-lg italic leading-relaxed">
            &ldquo;Connecting climate metrics to patient care has revolutionized our
            sustainability strategy. The insights are clear and actionable.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-white/70">
            — Alex Morgan, Chief Environmental Officer
          </p>
        </div>
      </section>

      {/* Blog Preview */}
      <Section className="bg-canvas">
        <h2 className="mb-8 text-center text-h5 font-bold text-neutral-900">
          Latest Insights
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              slug: 'climate-and-health',
              title: 'Climate and Health',
              excerpt: 'The impact of climate on healthcare systems',
            },
            {
              slug: 'cutting-emissions',
              title: 'Cutting Emissions in Healthcare',
              excerpt: 'Methods to reduce emissions while enhancing care quality',
            },
            {
              slug: 'data-integration',
              title: 'Merging Environmental and Clinical Data',
              excerpt: 'Integrating environmental insights with healthcare data',
            },
          ].map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-lg border border-border-subtle bg-white transition-shadow hover:shadow-card"
            >
              <div className="h-32 bg-neutral-200" />
              <div className="p-4">
                <h3 className="text-sm font-semibold text-primary group-hover:text-primary-soft">
                  {post.title}
                </h3>
                <p className="mt-1 text-xs text-text-muted">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-navy to-primary px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-h4 font-bold md:text-h3">
            Ready for clinically actionable sustainability?
          </h2>
          <p className="mt-4 text-body-sm text-white/80">
            Connect your meters, invoices, and care data — then surface the top five
            moves by ROI.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-md bg-white px-8 py-3 text-sm font-bold text-primary transition-colors hover:bg-neutral-100"
          >
            Schedule a Call
          </Link>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 5: Verify in browser**

```bash
npm run dev
```

Expected: Full homepage renders with all 10 sections. Design tokens apply correctly — teal headings, green KPI accents, navy backgrounds, proper typography scale. Mobile responsive at 320px.

- [ ] **Step 6: Verify static build**

```bash
npm run build
```

Expected: Build succeeds. `apps/web/out/index.html` contains the full homepage markup.

- [ ] **Step 7: Commit**

```bash
git add apps/web/components/icons.tsx apps/web/components/kpi-card.tsx apps/web/components/section.tsx apps/web/app/page.tsx
git commit -m "feat: build complete homepage with 10 sections

Hero, KPI strip, platform products (Carbon/Footprint/Capital),
features, traction/origin story, testimonial, blog preview, CTA.
All sections use design system tokens from packages/ui."
```

---

### Task 5: Blog Infrastructure and Content

**Files:**
- Create: `apps/web/lib/blog.ts`
- Create: `apps/web/app/blog/page.tsx`
- Create: `apps/web/app/blog/[slug]/page.tsx`
- Create: `apps/web/content/blog/climate-and-health.mdx`
- Create: `apps/web/content/blog/cutting-emissions.mdx`
- Create: `apps/web/content/blog/data-integration.mdx`

- [ ] **Step 1: Create apps/web/lib/blog.ts**

Utility to load MDX files from the content directory. Uses `gray-matter` for frontmatter parsing and `fs` for file reading (runs at build time only for static export).

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf-8');
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        readTime: data.readTime,
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
```

- [ ] **Step 2: Create three MDX blog stubs**

`apps/web/content/blog/climate-and-health.mdx`:

```mdx
---
title: "Climate and Health: The Impact on Healthcare Systems"
date: "2026-03-15"
excerpt: "Investigate how climate factors affect patient care and hospital efficiency."
readTime: "5 min read"
---

Healthcare systems face mounting pressure from climate change — from wildfire smoke disrupting HVAC systems to extreme heat increasing emergency department visits. Understanding these connections is the first step toward operational resilience.

## The Climate-Health Nexus

Hospitals contribute approximately 8.5% of national greenhouse gas emissions. Yet the same climate instability they contribute to directly threatens their ability to deliver care.

## What Health Systems Can Do

Forward-thinking health systems are integrating climate data into their operational planning, connecting environmental metrics to patient outcomes and facility performance.
```

`apps/web/content/blog/cutting-emissions.mdx`:

```mdx
---
title: "Cutting Emissions in Healthcare"
date: "2026-03-01"
excerpt: "Explore methods to reduce emissions while enhancing care quality."
readTime: "4 min read"
---

Emission reduction in healthcare doesn't mean compromising patient care. The most impactful interventions — anesthetic gas management, HVAC optimization, and procurement shifts — often improve both environmental and clinical outcomes.

## Anesthetic Gas Management

Switching from desflurane to sevoflurane can reduce anesthetic-related emissions by up to 92%, with documented savings of $84,000 annually per facility.

## HVAC and Energy

Facility retrofits targeting HVAC systems have demonstrated $220K in cost reductions, with the added benefit of improved air quality resilience during wildfire events.
```

`apps/web/content/blog/data-integration.mdx`:

```mdx
---
title: "Merging Environmental and Clinical Data"
date: "2026-02-15"
excerpt: "Uncover the advantages of integrating environmental insights with healthcare data."
readTime: "6 min read"
---

The gap between environmental data and clinical operations is where the largest sustainability opportunities hide. When facilities, clinical, and finance teams share a single view of their environmental impact, decision-making accelerates.

## Breaking Down Data Silos

Most health systems track energy consumption in facilities, waste volumes in environmental services, and supply costs in procurement — but rarely connect these streams to clinical outcomes.

## The Integrated View

A unified platform that maps emissions to patient encounters, cost centers, and compliance requirements enables health systems to prioritize interventions by both environmental and financial impact.
```

- [ ] **Step 3: Create apps/web/app/blog/page.tsx**

```tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import { Section } from '@/components/section';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Research, analysis, and perspectives on healthcare sustainability.',
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <Section className="bg-white">
      <h1 className="text-h3 font-bold text-neutral-900">Insights</h1>
      <p className="mt-2 text-body-sm text-text-muted">
        Research, analysis, and perspectives on healthcare sustainability.
      </p>

      <div className="mt-10 divide-y divide-border-subtle">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block py-6"
          >
            <p className="text-xs text-neutral-400">
              {post.date} &middot; {post.readTime}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-primary group-hover:text-primary-soft">
              {post.title}
            </h2>
            <p className="mt-1 text-sm text-text-muted">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Create apps/web/app/blog/[slug]/page.tsx**

For static export, `generateStaticParams` provides all slugs at build time. Content is rendered as HTML (simple markdown-to-HTML, no full MDX runtime needed for these stubs).

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllSlugs, getPost } from '@/lib/blog';
import { Section } from '@/components/section';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <Section className="bg-white">
      <article className="mx-auto max-w-2xl">
        <p className="text-xs text-neutral-400">
          {post.date} &middot; {post.readTime}
        </p>
        <h1 className="mt-2 text-h3 font-bold text-neutral-900">{post.title}</h1>
        <p className="mt-4 text-body text-text-muted">{post.excerpt}</p>

        <div className="prose prose-neutral mt-8 max-w-none prose-headings:text-neutral-900 prose-h2:text-h5 prose-h2:font-bold prose-p:text-text-secondary prose-a:text-primary">
          {/* Render MDX content as simple paragraphs for now */}
          {post.content.split('\n\n').map((block, i) => {
            if (block.startsWith('## ')) {
              return (
                <h2 key={i} className="mt-8 mb-4 text-h5 font-bold text-neutral-900">
                  {block.replace('## ', '')}
                </h2>
              );
            }
            if (block.trim() === '') return null;
            return (
              <p key={i} className="mb-4 text-body leading-relaxed text-text-secondary">
                {block}
              </p>
            );
          })}
        </div>
      </article>
    </Section>
  );
}
```

- [ ] **Step 5: Verify blog pages**

```bash
npm run dev
```

Visit `http://localhost:3000/blog` — should show 3 posts sorted by date.
Visit `http://localhost:3000/blog/climate-and-health` — should render the full post.

- [ ] **Step 6: Verify static export includes blog pages**

```bash
npm run build
ls apps/web/out/blog/
```

Expected: `index.html`, `climate-and-health/index.html`, `cutting-emissions/index.html`, `data-integration/index.html`.

- [ ] **Step 7: Commit**

```bash
git add apps/web/lib/blog.ts apps/web/app/blog/ apps/web/content/
git commit -m "feat: add MDX blog with 3 initial posts

Blog index page, individual post pages, static export via
generateStaticParams. Posts: climate-and-health, cutting-emissions,
data-integration."
```

---

### Task 6: Contact Page

**Files:**
- Create: `apps/web/components/contact-form.tsx`
- Create: `apps/web/app/contact/page.tsx`

- [ ] **Step 1: Create apps/web/components/contact-form.tsx**

Client component with Formspree submission. Form fields: Name, Email, Organization, Role, Message (optional).

```tsx
'use client';

import { useState, type FormEvent } from 'react';

const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle',
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <p className="text-lg font-semibold text-primary">Message sent.</p>
        <p className="mt-2 text-sm text-text-muted">
          We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-xs font-semibold text-neutral-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-md border border-border-subtle bg-canvas px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-neutral-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-border-subtle bg-canvas px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="you@hospital.org"
        />
      </div>
      <div>
        <label
          htmlFor="organization"
          className="block text-xs font-semibold text-neutral-700"
        >
          Organization
        </label>
        <input
          id="organization"
          name="organization"
          type="text"
          required
          className="mt-1 w-full rounded-md border border-border-subtle bg-canvas px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Health system name"
        />
      </div>
      <div>
        <label htmlFor="role" className="block text-xs font-semibold text-neutral-700">
          Role
        </label>
        <input
          id="role"
          name="role"
          type="text"
          required
          className="mt-1 w-full rounded-md border border-border-subtle bg-canvas px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Your role"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-xs font-semibold text-neutral-700"
        >
          Message <span className="font-normal text-neutral-400">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="mt-1 w-full rounded-md border border-border-subtle bg-canvas px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="What are you looking to solve?"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-soft disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'error' && (
        <p className="text-center text-xs text-critical">
          Something went wrong. Please email nick@lighthousehlth.com directly.
        </p>
      )}
    </form>
  );
}
```

**Note:** Replace `YOUR_FORM_ID` with the actual Formspree form ID after creating the form at formspree.io. Until then, the form renders correctly but submission won't work.

- [ ] **Step 2: Create apps/web/app/contact/page.tsx**

Full-page topographic contour background with floating form card.

```tsx
import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Schedule a 30-minute discovery call to map your sustainability starting point.',
};

function TopoBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.12]"
      viewBox="0 0 800 600"
      fill="none"
      stroke="#0E9BA7"
      strokeWidth="0.8"
      preserveAspectRatio="xMidYMid slice"
    >
      <ellipse cx="500" cy="380" rx="120" ry="80" />
      <ellipse cx="500" cy="380" rx="180" ry="120" />
      <ellipse cx="500" cy="380" rx="240" ry="160" />
      <ellipse cx="500" cy="380" rx="310" ry="210" />
      <ellipse cx="500" cy="380" rx="390" ry="270" />
      <ellipse cx="240" cy="160" rx="80" ry="60" />
      <ellipse cx="240" cy="160" rx="140" ry="100" />
      <ellipse cx="240" cy="160" rx="210" ry="150" />
      <ellipse cx="700" cy="120" rx="60" ry="45" />
      <ellipse cx="700" cy="120" rx="110" ry="80" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center bg-navy px-6 py-20">
      <TopoBackground />

      {/* Accent dot */}
      <div className="absolute left-[60%] top-[55%] h-2 w-2 rounded-full bg-sustainability shadow-[0_0_12px_rgba(22,163,74,0.4)]" />

      <div className="relative z-10 w-full max-w-md rounded-xl bg-white/95 p-8 shadow-2xl backdrop-blur">
        <h1 className="text-center text-h4 font-bold text-neutral-900">
          Let&apos;s Talk
        </h1>
        <p className="mt-2 text-center text-sm text-text-muted">
          30-minute discovery call to map your sustainability starting point.
        </p>

        <div className="mt-8">
          <ContactForm />
        </div>

        <div className="mt-8 border-t border-border-subtle pt-4 text-center text-xs text-text-muted">
          nick@lighthousehlth.com &middot; Boulder, CO
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Visit `http://localhost:3000/contact`. Expected: Dark navy background with subtle teal topographic contour lines. White form card floats in center with all 5 fields. Form validates required fields. Success/error states display.

- [ ] **Step 4: Commit**

```bash
git add apps/web/components/contact-form.tsx apps/web/app/contact/
git commit -m "feat: add contact page with topographic background

Formspree form with name, email, org, role, message fields.
Topo contour SVG background on navy. Floating glass card."
```

---

### Task 7: Colorado Playbook Page

**Files:**
- Create: `apps/web/app/colorado-playbook/page.tsx`

- [ ] **Step 1: Create apps/web/app/colorado-playbook/page.tsx**

```tsx
import Link from 'next/link';
import type { Metadata } from 'next';
import { Section } from '@/components/section';
import { CarbonIcon, FootprintIcon, CapitalIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Colorado Playbook',
  description:
    'Sustainability intelligence for Colorado health systems — regulatory compliance, wildfire resilience, and incentive stacking.',
};

const pressures = [
  {
    title: 'Regulatory Mandate',
    color: 'border-t-critical',
    textColor: 'text-critical',
    description:
      'HB21-1266 GHG reporting requirements. State-level climate accountability for large emitters including health systems.',
  },
  {
    title: 'Wildfire & Climate Risk',
    color: 'border-t-amber',
    textColor: 'text-amber',
    description:
      'Increasing operational disruption. HVAC, air quality, and facility resilience under growing pressure from wildfire seasons.',
  },
  {
    title: 'Incentive Landscape',
    color: 'border-t-sustainability',
    textColor: 'text-sustainability',
    description:
      'Federal IRA credits and Colorado state rebates create significant capital project incentive stacking opportunities.',
  },
];

const coloradoProducts = [
  {
    icon: CarbonIcon,
    tag: 'Carbon',
    description: 'HB21-1266 compliant emission factors. Audit-ready GHG inventory with full data lineage.',
  },
  {
    icon: FootprintIcon,
    tag: 'Footprint',
    description: 'Automated facility tracking. CMS and Joint Commission compliance reporting.',
  },
  {
    icon: CapitalIcon,
    tag: 'Capital',
    description: 'IRA + Colorado state rebate stacking. ROI-ranked project prioritization.',
  },
];

const faqs = [
  {
    q: 'How does Lighthouse HLTH handle HB21-1266 reporting?',
    a: 'Our Carbon module provides emission factors aligned with Colorado state requirements. The Footprint module automates data collection and generates audit-ready reports in the format regulators expect.',
  },
  {
    q: 'What kind of savings can Colorado health systems expect?',
    a: 'Results vary by facility size and current efficiency. Across our 100+ hospital deployments, we have seen 15-20% operational cost reduction in the first year through energy optimization, waste reduction, and procurement improvements.',
  },
  {
    q: 'How do you handle incentive stacking?',
    a: 'The Capital module identifies all applicable federal (IRA) and Colorado state incentives for each capital project, then ranks projects by combined ROI from emissions reduction, cost savings, and incentive capture.',
  },
  {
    q: 'What data do you need to get started?',
    a: '12-24 months of utility bills, waste hauling invoices, and basic facility data. We handle the data integration — most health systems are operational within 30 days.',
  },
];

export default function ColoradoPlaybook() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-primary px-6 py-20 text-center text-white md:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
            Colorado Healthcare
          </p>
          <h1 className="text-h3 font-bold md:text-h2">
            Sustainability Intelligence for Colorado Health Systems
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-body text-white/80">
            Colorado&apos;s regulatory landscape demands action. Our platform gives you
            the tools to comply, reduce costs, and lead.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-neutral-100"
            >
              Start Free Assessment
            </Link>
            <Link
              href="#"
              className="rounded-md border border-white/30 px-6 py-3 text-sm text-white transition-colors hover:bg-white/10"
            >
              Download CFO&apos;s Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Why Colorado, Why Now */}
      <Section className="bg-canvas">
        <h2 className="mb-8 text-center text-h4 font-bold text-neutral-900">
          Why Colorado, Why Now
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {pressures.map((item) => (
            <div
              key={item.title}
              className={`rounded-lg border-t-2 ${item.color} bg-white p-6 text-center shadow-sm`}
            >
              <p className={`text-sm font-semibold ${item.textColor}`}>{item.title}</p>
              <p className="mt-2 text-sm text-text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Platform for Colorado */}
      <Section className="bg-white">
        <h2 className="mb-8 text-center text-h4 font-bold text-neutral-900">
          The Lighthouse Platform for Colorado
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {coloradoProducts.map((product) => (
            <div
              key={product.tag}
              className="rounded-xl border border-border-subtle p-6 text-center"
            >
              <product.icon className="mx-auto mb-3 text-primary" size={28} />
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                {product.tag}
              </p>
              <p className="mt-3 text-sm text-text-muted">{product.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-canvas">
        <h2 className="mb-8 text-center text-h4 font-bold text-neutral-900">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto max-w-2xl divide-y divide-border-subtle">
          {faqs.map((faq) => (
            <div key={faq.q} className="py-5">
              <h3 className="text-sm font-semibold text-neutral-900">{faq.q}</h3>
              <p className="mt-2 text-sm text-text-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-navy to-primary px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-h4 font-bold">
            Ready to lead Colorado&apos;s healthcare sustainability transformation?
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-md bg-white px-8 py-3 text-sm font-bold text-primary transition-colors hover:bg-neutral-100"
          >
            Schedule Discovery Call
          </Link>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Visit `http://localhost:3000/colorado-playbook`. Expected: All sections render — hero with Colorado eyebrow, 3 pressure cards with color-coded borders, 3 product cards, FAQ accordion, CTA.

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/colorado-playbook/
git commit -m "feat: add Colorado Playbook landing page

Colorado-specific pressures (HB21-1266, wildfire, incentives),
platform products mapped to Colorado use cases, FAQ section."
```

---

### Task 8: SEO — Sitemap, Robots, JSON-LD

**Files:**
- Create: `apps/web/app/sitemap.ts`
- Create: `apps/web/app/robots.ts`
- Create: `apps/web/lib/metadata.ts`
- Modify: `apps/web/app/layout.tsx` (add JSON-LD)

- [ ] **Step 1: Create apps/web/app/sitemap.ts**

```typescript
import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lighthousehlth.com';

  const blogPosts = getAllSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/colorado-playbook`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...blogPosts,
  ];
}
```

- [ ] **Step 2: Create apps/web/app/robots.ts**

```typescript
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://lighthousehlth.com/sitemap.xml',
  };
}
```

- [ ] **Step 3: Create apps/web/lib/metadata.ts**

JSON-LD Organization schema for the homepage.

```typescript
export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lighthouse HLTH',
    url: 'https://lighthousehlth.com',
    logo: 'https://lighthousehlth.com/logo.png',
    description:
      'Healthcare sustainability platform — reduce emissions, improve patient care, and save money.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Boulder',
      addressRegion: 'CO',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'nick@lighthousehlth.com',
      contactType: 'sales',
    },
  };
}
```

- [ ] **Step 4: Add JSON-LD to apps/web/app/layout.tsx**

Add the JSON-LD script tag to the `<head>` via the layout:

```tsx
import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { getOrganizationJsonLd } from '@/lib/metadata';
import './globals.css';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getOrganizationJsonLd();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Verify static export includes SEO files**

```bash
npm run build
cat apps/web/out/sitemap.xml | head -20
cat apps/web/out/robots.txt
```

Expected: `sitemap.xml` lists all pages. `robots.txt` allows all crawlers and references the sitemap.

- [ ] **Step 6: Commit**

```bash
git add apps/web/app/sitemap.ts apps/web/app/robots.ts apps/web/lib/metadata.ts apps/web/app/layout.tsx
git commit -m "feat: add SEO — sitemap, robots.txt, JSON-LD schema

Auto-generated sitemap from pages + blog posts. Organization
schema in JSON-LD. Open Graph metadata. robots.txt allows all."
```

---

### Task 9: Final Build Verification and Cleanup

**Files:**
- Modify: `apps/web/app/page.tsx` (minor: wire blog preview to real data)

- [ ] **Step 1: Update homepage blog preview to use real blog data**

In `apps/web/app/page.tsx`, import `getAllPosts` and replace the hardcoded blog preview array:

Replace the static blog array in the Blog Preview section with:

```tsx
import { getAllPosts } from '@/lib/blog';
```

And in the component body, before the return:

```tsx
const posts = getAllPosts().slice(0, 3);
```

And update the Blog Preview section JSX to use `posts`:

```tsx
{/* Blog Preview */}
<Section className="bg-canvas">
  <h2 className="mb-8 text-center text-h5 font-bold text-neutral-900">
    Latest Insights
  </h2>
  <div className="grid gap-4 md:grid-cols-3">
    {posts.map((post) => (
      <Link
        key={post.slug}
        href={`/blog/${post.slug}`}
        className="group overflow-hidden rounded-lg border border-border-subtle bg-white transition-shadow hover:shadow-card"
      >
        <div className="h-32 bg-neutral-200" />
        <div className="p-4">
          <h3 className="text-sm font-semibold text-primary group-hover:text-primary-soft">
            {post.title}
          </h3>
          <p className="mt-1 text-xs text-text-muted">{post.excerpt}</p>
        </div>
      </Link>
    ))}
  </div>
</Section>
```

- [ ] **Step 2: Run full static build**

```bash
cd /Users/nmvinson/Projects/IndigoLabs/lighthouse_hlth/lighthouse-hlth-ui
npm run build
```

Expected: Build completes with zero errors. All pages generated in `apps/web/out/`.

- [ ] **Step 3: Verify all output pages exist**

```bash
ls -la apps/web/out/index.html
ls -la apps/web/out/contact/index.html
ls -la apps/web/out/colorado-playbook/index.html
ls -la apps/web/out/blog/index.html
ls -la apps/web/out/blog/climate-and-health/index.html
ls -la apps/web/out/blog/cutting-emissions/index.html
ls -la apps/web/out/blog/data-integration/index.html
ls -la apps/web/out/sitemap.xml
ls -la apps/web/out/robots.txt
```

Expected: All 9 files exist.

- [ ] **Step 4: Serve the static output locally and verify**

```bash
npx serve apps/web/out -p 3001
```

Open `http://localhost:3001` and verify:
- Homepage: all 10 sections render, nav links work, teal/navy theme correct
- `/blog`: 3 posts listed, links work
- `/blog/climate-and-health`: post content renders
- `/contact`: topo background, form renders
- `/colorado-playbook`: all sections render
- Mobile: hamburger menu works at narrow viewport

- [ ] **Step 5: Commit**

```bash
git add apps/web/app/page.tsx
git commit -m "feat: wire blog preview to real MDX data, final verification

Homepage blog preview now reads from content/blog/ MDX files.
All pages verified in static export build."
```

- [ ] **Step 6: Update .gitignore and commit**

Ensure `apps/web/out/` and `apps/web/.next/` are in `.gitignore` (should already be from Task 1 step 7), then:

```bash
git add .gitignore
git commit -m "chore: migration complete — ready for Cloudflare Pages deployment"
```
