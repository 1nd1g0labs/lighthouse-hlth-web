# Lighthouse Health UI

**Version:** 1.0.0
**Status:** Production Ready

Healthcare sustainability design system. Brand-aligned components for carbon tracking, operations dashboards, and mission-driven health systems.

**Design System Alignment:** This component library powers the Lighthouse HLTH Next.js application. Design tokens are maintained in the monorepo to ensure visual consistency across all applications.

**v1.0.0 Milestone:** 11 production-ready components, full WCAG 2.1 AA accessibility compliance, and comprehensive Storybook documentation.

## Quick Start

### Install

**Note:** This package is hosted on GitHub Package Registry.

```bash
npm install @1nd1g0labs/lighthouse-hlth-ui
```

### Use
```tsx
// Import styles in your root file (_app.tsx, layout.tsx, etc.)
import '@1nd1g0labs/lighthouse-hlth-ui/dist/styles.css';

// Import and use components
import { Button, Card, MetricCard, IconButton, ServiceCard } from '@1nd1g0labs/lighthouse-hlth-ui';

function App() {
  return (
    <>
      <Button variant="green-right">Get Started</Button>
      <MetricCard value="$4m+" label="Total saved" />
      <IconButton ariaLabel="View more" />
    </>
  );
}
```

### Develop
```bash
git clone <repo-url>
cd lighthouse-hlth-ui
npm install
npm run storybook    # View components at localhost:6006
npm run build        # Build library
```

## Live Component Catalog

**Explore the live Storybook documentation:**
https://1nd1g0labs.github.io/lighthouse-hlth-ui/

The component catalog is automatically deployed on every push to `main`. View all components, variants, props, and interactive examples without running a local dev server.

Features:
- Interactive component playground
- Complete props documentation
- Accessibility annotations
- Design token reference
- Usage examples

## Production Components (v1.0.0)

### Tier 1: Core Interactive Components

Production-ready design system with full WCAG 2.1 AA compliance.

| Component | Variants | Description |
|-----------|----------|-------------|
| **Button** | green-left, green-right, white-left, white-right, white-static | Primary CTA with animated arrow |
| **FormButton** | 7 states (default, hover, loading, active, disabled, success, error) | Form submission button with state feedback |
| **Label** | default, compact | Rating/review label with avatars and stars |
| **LinkButton** | forward-black, forward-white, backward-black, backward-white | Text link with animated arrow |

### Tier 2: Navigation & Feedback Components

Complete navigation, ratings, and footer components.

| Component | Variants | Description |
|-----------|----------|-------------|
| **FAQButton** | isActive (true/false) | Accordion button with chevron animation |
| **SocialIcon** | default, filled | Social media icons (6 platforms, 40px circular) |
| **Rating** | sm, md, lg | 1-5 star rating display with optional numeric value |
| **Navlink** | isActive (true/false) | Navigation link with active state indicator |
| **FooterLink** | default, light | Footer links with subtle hover effects |
| **ContactLink** | default, primary | Contact links with icons (email, phone, location) |
| **SectionTag** | primary, accent, neutral | Section labels/tags for categorization |

### Additional Components

| Component | Variants | Description | Status |
|-----------|----------|-------------|--------|
| **IconButton** | primary, secondary, accent, outline, ghost | Circular icon CTAs | Production Ready |
| **Card** | default, elevated, outline, ghost, sustainability | Content containers | Production Ready |
| **MetricCard** | - | Large stat display with trends | Production Ready |
| **ServiceCard** | - | Image-based showcase with overlay text | Production Ready |

### Utilities & Layout

Badge, Alert, Progress, Modal, Tooltip, Tabs, Input, Select, Checkbox, Radio, Textarea, Container, Stack, Grid

Available for use. Additional variants planned for future releases.

## Key Info

### Brand Colors (v1.0.0)
- **Primary (Lighthouse Teal)**: `#057C8B` - Trust, healing, environmental stewardship
- **Accent (Orange)**: `#FF833B` - Warmth, energy, action
- **Secondary (Green)**: `#4CAF50` - Sustainability, growth
- **Neutrals**: `black`, `ash-gray`, `grey`, `white`, `white-off`

Use as Tailwind classes: `bg-primary-500`, `text-accent-500`, `border-ash-gray`

### Typography (v1.0.0)
- **Font**: Inter for all text (unified font strategy)
- **Headings**: h1 (54px), h2 (42px), h3 (38px), h4 (32px), h5 (28px), h6 (24px)
- **Body**: xl (20px), lg (18px), base (16px), sm (14px)
- **Line heights and letter spacing**: Negative tracking for headings, precise line heights
- **Use**: `text-h1`, `text-body-lg`, `leading-h2`, `tracking-h1` for design-token-aligned typography

### Spacing (v1.0.0)
- **System**: 4px base unit with additional gaps (5px, 7px, 9px)
- **Tailwind**: `p-4`, `gap-6`, `space-y-8`, `gap-1.25` (5px), `gap-1.75` (7px), `gap-2.25` (9px)

### Tech Requirements
- **React**: 18+
- **Tailwind**: v3.4.0 (styles pre-compiled, no need to install in your app)
- **TypeScript**: Full support included

## Commands

```bash
npm run dev          # Build in watch mode
npm run build        # Build for production
npm run storybook    # Run Storybook at localhost:6006
npm run type-check   # TypeScript validation
npm run lint         # ESLint
npm run format       # Prettier
```

## Examples

### Metric Dashboard
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <MetricCard value="$4m+" label="Total saved" trend="up" trendValue="+23%" />
  <MetricCard value="147t" label="CO2 reduced" trend="down" />
  <MetricCard value="330+" label="Facilities" showArrow />
</div>
```

### Service Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <ServiceCard
    title="Carbon intelligence"
    description="Track and reduce footprint"
    image="/carbon.jpg"
    onActionClick={() => {}}
  />
  <ServiceCard
    title="Energy optimization"
    description="Real-time monitoring"
    image="/energy.jpg"
    onActionClick={() => {}}
  />
</div>
```

### With Framer Motion
```tsx
import { motion } from 'framer-motion';
import { Button } from '@1nd1g0labs/lighthouse-hlth-ui';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  <Button variant="primary">Animated</Button>
</motion.div>
```

## Troubleshooting

**Styles not showing?**
Import in root: `import '@1nd1g0labs/lighthouse-hlth-ui/dist/styles.css'`

**TypeScript errors?**
Update package: `npm install @1nd1g0labs/lighthouse-hlth-ui@latest`

**Tailwind v4 conflicts?**
Styles are pre-compiled, no conflicts. Just import the CSS.

## Design Tokens (v0.3.0)

```tsx
import { colors, spacing, typography } from '@1nd1g0labs/lighthouse-hlth-ui/tokens';

// Access design token values programmatically
colors.primary[500]            // #057C8B
colors.accent[500]             // #FF833B
colors.ashGray                 // #7F8082
spacing[1.25]                  // 0.3125rem (5px)
typography.fontSize.h1         // '54px'
typography.textStyles.heading.h1  // Complete heading text style
typography.fonts.sans          // 'Inter', system fonts

// Text style mappings
typography.textStyles.heading.xl   // Heading xl (54px)
typography.textStyles.body.base    // Paragraph m (16px)
```

### Text Style Reference
- **Headings:** `xl` (h1), `l` (h2), `m` (h3), `s` (h4), `xs` (h5), `xxs` (h6)
- **Paragraphs:** `xl` (20px), `l` (18px), `m` (16px), `s` (14px)

See `src/tokens/` for complete design token documentation.

## Project Structure

```
src/
├── components/          # UI components
│   ├── Button/
│   ├── Card/
│   └── ...
├── tokens/             # Design tokens (colors, spacing, typography)
├── utils/              # Helper functions
├── framer/             # Framer Motion exports
├── styles.css          # Tailwind base + animations
└── index.ts            # Main entry point
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for component template and PR process.

## Publishing (for Maintainers)

This package is published to GitHub Package Registry. See [PUBLISHING.md](./PUBLISHING.md) for:
- One-time authentication setup
- Complete publishing workflow
- Versioning guidelines (semantic versioning)
- Troubleshooting guide

**Quick publish workflow:**
```bash
npm run build:lib           # Build the library
npm version patch          # Bump version (patch/minor/major)
npm publish                # Publish to GitHub Packages
git push --tags            # Push version tags
```

## Mission Alignment

Built for healthcare sustainability:
- Carbon footprint tracking
- Energy efficiency metrics
- Waste reduction dashboards
- Financial sustainability reporting
- Compliance and regulatory tools

**"Be green, feel green. Less is more. Sustainable footprint, sustainable financial health."**

## License

PROPRIETARY - See [LICENSE](./LICENSE)

This software is proprietary to Indigo Labs LLC. While this repository is public for transparency, use is restricted to authorized parties. See LICENSE file for complete terms.

## Disclaimer

**THIS SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.** We are not responsible for any issues, damages, or consequences that may arise from using this repository. This code is provided for transparency and evaluation purposes only and does not indicate any ongoing support, maintenance, or commitment outside of our internal roadmap.

Use at your own risk. See LICENSE for complete legal terms.

---

**Built with care for sustainable healthcare operations**
