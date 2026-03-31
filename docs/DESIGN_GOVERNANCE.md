# Design System Governance Framework

**Version:** 1.0.0
**Status:** Active
**Owner:** Product Manager
**Created:** 2025-12-23

---

## 1. Purpose

This document establishes governance for the Lighthouse HLTH design system (`lighthouse-hlth-ui`), ensuring:
- Consistent brand expression across all platforms
- Clear ownership and decision rights
- Lightweight process that does not slow down a small team
- Traceability of design decisions

---

## 2. Governance Principles

1. **UI Repo is the Single Source of Truth (SSOT):** All design tokens, components, and specifications originate from `lighthouse-hlth-ui`
2. **Downstream Consumers Sync, Not Fork:** Marketing site, emails, forms, and apps import from SSOT; they do not create independent styles
3. **Changes Flow One Direction:** UI Repo changes propagate downstream; downstream platforms do not define new tokens
4. **Lightweight for Speed:** Governance adds clarity, not bureaucracy
5. **Document Decisions:** Design rationale is captured for future reference

---

## 3. Ownership & Decision Rights

### Roles

| Role | Owner | Responsibilities |
|------|-------|------------------|
| **Design System Owner** | Product Manager | Final approval on design system changes, governs token additions/modifications |
| **Design Lead** | healthtech-ui-designer | Proposes design changes, validates accessibility, maintains visual consistency |
| **Engineering Lead** | fullstack-engineer | Implements token exports, maintains build pipeline, reviews technical feasibility |
| **Brand Guardian** | Founder/CEO | Approves major brand changes (logo, primary colors, core typography) |

### Decision Matrix

| Change Type | Proposer | Approver | Timeline |
|-------------|----------|----------|----------|
| **Minor:** Bug fixes, typos, clarifications | Any | Auto-approved via PR | Same day |
| **Standard:** New component variant, new semantic token | Design Lead | Design System Owner | 1-2 days |
| **Major:** New color palette, typography overhaul, new token category | Design System Owner | Brand Guardian + Design System Owner | 1 week |
| **Breaking:** Remove token, rename fundamental tokens | Design System Owner | Brand Guardian + Full team review | 2 weeks with migration plan |

---

## 4. Change Request Process

### Step 1: Proposal

Create a GitHub Issue using the template below:

```markdown
## Design Change Request

### Summary
[One sentence describing the change]

### Type
- [ ] Minor (bug fix, clarification)
- [ ] Standard (new variant, new semantic token)
- [ ] Major (new palette, typography change)
- [ ] Breaking (removal, fundamental rename)

### Motivation
[Why is this change needed? What problem does it solve?]

### Proposal
[Detailed description of the change]

### Affected Touchpoints
- [ ] Next.js App
- [ ] Marketing Website (Next.js)
- [ ] Email Templates
- [ ] Forms
- [ ] Mobile App
- [ ] Other: ___

### Alternatives Considered
[What other approaches were considered?]

### Migration Path (if breaking)
[How will existing consumers adapt?]

### Accessibility Impact
[How does this affect WCAG 2.1 AA compliance?]
```

### Step 2: Review

1. **Design Lead** reviews for visual consistency and accessibility
2. **Engineering Lead** reviews for technical feasibility
3. **Approver** (based on change type) gives final approval

### Step 3: Implementation

1. Implement in `lighthouse-hlth-ui` repo
2. Update `CHANGELOG.md` with change description
3. Bump version per semantic versioning (see below)
4. Publish new version

### Step 4: Downstream Sync

1. Update downstream consumers (see sync checklist)
2. Verify changes across all affected touchpoints
3. Close the change request issue

---

## 5. Semantic Versioning for Design Tokens

Design tokens follow [Semantic Versioning](https://semver.org/):

| Version Bump | When to Use | Example |
|--------------|-------------|---------|
| **MAJOR (x.0.0)** | Breaking changes: token removed, token renamed, value change that breaks layouts | Removing `primary-500`, renaming `text-main` to `text-primary` |
| **MINOR (0.x.0)** | New features: new token added, new component, new variant | Adding `primarySoft-600`, new `Alert` component |
| **PATCH (0.0.x)** | Bug fixes: color value correction, typo fix, documentation update | Correcting `#066E76` to `#066E77`, fixing typo in docs |

### Token Naming Conventions

Tokens must follow these conventions:

```
[category]-[element]-[variant]-[state]

Examples:
- color-primary-500 (category: color, element: primary, variant: 500)
- text-main (category: text, element: main)
- shadow-card-hover (category: shadow, element: card, state: hover)
- spacing-component-lg (category: spacing, element: component, variant: lg)
```

---

## 6. Downstream Sync Checklist

When design tokens are updated, sync to downstream consumers:

### After Every Release

- [ ] **Next.js App:** Update `@1nd1g0labs/lighthouse-hlth-ui` package version
- [ ] **Storybook:** Verify changes render correctly in Storybook

### After Token Changes

- [ ] **Marketing Website (Next.js):**
  - [ ] Verify tokens in apps/web/tailwind.config.ts
  - [ ] Verify pages render correctly
- [ ] **Email Templates:**
  - [ ] Regenerate email CSS snippet
  - [ ] Update Postmark templates with new values
  - [ ] Test email rendering across clients
- [ ] **Forms:**
  - [ ] Update form CSS/styling if platform supports
  - [ ] Verify brand consistency

### After Breaking Changes

- [ ] **Migration Guide:** Written and linked in CHANGELOG
- [ ] **Deprecation Warning:** Previous version warns about upcoming removal (if applicable)
- [ ] **All Consumers Updated:** Every downstream consumer is verified

---

## 7. Changelog Format

All changes are documented in `/CHANGELOG.md`:

```markdown
# Changelog

All notable changes to the Lighthouse HLTH Design System will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Description of new features

### Changed
- Description of changes to existing functionality

### Deprecated
- Description of soon-to-be removed features

### Removed
- Description of removed features

### Fixed
- Description of bug fixes

### Security
- Description of security-related changes

## [1.3.0] - 2025-12-XX

### Added
- CSS Variables export for non-React consumers
- Tailwind design tokens export

### Changed
- Updated primary-500 from #057C8B to #066E76 (Luminous Climate Clinical)
```

---

## 8. Brand Guidelines Summary

### What Cannot Change Without Brand Guardian Approval

1. **Primary Color Palette:** primary-500 (#066E76), sustainability-500 (#16A34A), lime-500 (#A3E635)
2. **Logo and Logo Usage Rules**
3. **Primary Typeface:** Inter (sans), JetBrains Mono (monospace for metrics)
4. **Brand Name:** "Lighthouse HLTH" (HLTH is all caps)
5. **Tagline:** "Operational intelligence for healthcare sustainability"

### What Can Change with Standard Approval

1. **Extended Color Scales:** Adding 50-900 variants of existing palette
2. **Semantic Tokens:** New purpose-based token mappings
3. **Component Variants:** New size, style, or state variants
4. **Typography Variants:** New text styles within the dual-scale system
5. **Spacing, Shadows, Radii:** Adjustments within established philosophy

---

## 9. Accessibility Requirements

All design changes must maintain:

1. **WCAG 2.1 AA Compliance**
   - Color contrast ratio minimum 4.5:1 for normal text
   - Color contrast ratio minimum 3:1 for large text and UI components
   - Focus indicators must have minimum 3:1 contrast

2. **Testing Requirements**
   - All components must pass axe-core audit
   - New components require screen reader testing
   - Color changes require contrast ratio verification

3. **Documentation**
   - Accessibility implications noted in change request
   - Accessible usage patterns documented in Storybook

---

## 10. Emergency Changes

In rare cases, immediate changes may be needed (security vulnerability, critical bug affecting production).

### Emergency Process

1. **Make the fix** immediately in UI repo
2. **Document afterward** - create issue with `emergency` label explaining the change
3. **Notify team** in primary communication channel
4. **Sync downstream** as soon as feasible
5. **Retrospective** - review if process needs improvement to prevent similar emergencies

---

## 11. Review Cadence

### Quarterly Design System Review

Every quarter, the team reviews:
- Token additions/changes since last quarter
- Downstream sync status
- Technical debt in design system
- Governance process effectiveness

### Annual Brand Review

Once per year:
- Full brand alignment check
- Competitive analysis of design trends
- Major version planning if needed

---

*Document Version: 1.0.0*
*Last Updated: 2025-12-23*

---

**Proprietary and Confidential**
(C) 2025 Indigo Labs LLC. All rights reserved.
