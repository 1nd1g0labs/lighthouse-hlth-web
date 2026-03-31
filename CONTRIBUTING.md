# Contributing to Lighthouse HLTH UI

## Important Notice

**This is proprietary software owned by Indigo Labs LLC.**

While this repository is publicly viewable for transparency and educational purposes,
**contributions are restricted to explicitly authorized individuals and organizations**.

This is NOT a traditional open-source project. Unsolicited contributions cannot be accepted.

## Who Can Contribute?

Contributions are accepted ONLY from:

✅ **Authorized Parties:**
- Indigo Labs LLC employees
- Lighthouse HLTH contractors under NDA
- Explicitly approved partners with written agreements
- Organizations with executed Contributor License Agreements (CLA)

❌ **NOT Accepted:**
- Unsolicited pull requests from the general public
- Contributions without prior written authorization
- Fork-based contributions (forking for derivative works violates the LICENSE)

## Before Contributing

If you believe you should have contribution access:

1. **Contact us:** nick@onehealthcto.com
2. **Include:**
   - Your name and organization
   - Reason for contribution request
   - Proposed changes or involvement
3. **Await approval:** Do not submit code until you receive explicit written permission
4. **Sign CLA:** If approved, you'll be asked to sign a Contributor License Agreement

## For Authorized Contributors

If you have received explicit written permission to contribute:

### Getting Started

```bash
git clone https://github.com/1nd1g0labs/lighthouse-hlth-ui.git
cd lighthouse-hlth-ui
npm install
npm run storybook  # View components at localhost:6006
```

### Component Development Template

When adding a new component, follow this structure:

#### Component File

`src/components/MyComponent/MyComponent.tsx`:

```tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const myComponentVariants = cva(
  'inline-flex items-center justify-center rounded-lg transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary: 'bg-secondary-500 text-white hover:bg-secondary-600',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(myComponentVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

MyComponent.displayName = 'MyComponent';
```

#### Exports

`src/components/MyComponent/index.ts`:
```tsx
export { MyComponent, type MyComponentProps } from './MyComponent';
```

`src/index.ts`:
```tsx
export { MyComponent, type MyComponentProps } from './components/MyComponent';
```

#### Storybook Story

`src/components/MyComponent/MyComponent.stories.tsx`:
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './MyComponent';

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Brief description of MyComponent and its use cases.',
      },
    },
  },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'My Component' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'My Component' },
};
```

### Code Standards

**Required:**
- ✅ TypeScript with full type coverage
- ✅ Design system alignment (match design tokens in tailwind.config.js)
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Tailwind CSS classes (e.g., `bg-primary-500`, `text-h1`)
- ✅ `React.forwardRef` for ref support
- ✅ Comprehensive ARIA labels
- ✅ Keyboard navigation support
- ✅ 4.5:1 minimum color contrast
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Storybook documentation with usage examples

**Prohibited:**
- ❌ Inline styles (use Tailwind)
- ❌ Design tokens not defined in tailwind.config.js
- ❌ Accessibility violations
- ❌ Hard-coded colors (use design tokens)
- ❌ Missing TypeScript types
- ❌ Console.log statements in production code

### Development Workflow

1. **Create Branch**
   ```bash
   git checkout -b feature/component-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Develop & Test**
   ```bash
   npm run storybook    # Interactive development
   npm run build        # Ensure builds successfully
   npm run type-check   # No TypeScript errors
   npm run lint         # No ESLint errors
   npm run format       # Format with Prettier
   ```

3. **Test in Consuming App**
   ```bash
   # In lighthouse-hlth-ui
   npm run build && npm link

   # In consuming app (e.g., lighthouse-hlth-app)
   npm link @1nd1g0labs/lighthouse-hlth-ui
   ```

4. **Commit**
   ```bash
   git add .
   git commit -m "feat: add MyComponent with primary/secondary variants"
   # or
   git commit -m "fix: resolve accessibility issue in Button"
   ```

   Use conventional commits:
   - `feat:` - New features
   - `fix:` - Bug fixes
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting)
   - `refactor:` - Code refactoring
   - `test:` - Test additions or changes
   - `chore:` - Build process or tooling changes

5. **Push & Create PR**
   ```bash
   git push origin feature/component-name
   ```

   Open PR on GitHub with:
   - Clear description of changes
   - Screenshots/GIFs of UI changes
   - Breaking changes noted
   - Design system consistency confirmation
   - Accessibility compliance confirmation

6. **Code Review**
   - Indigo Labs LLC team will review
   - Address feedback
   - Await approval and merge

### Contributor License Agreement (CLA)

All authorized contributors must sign a CLA stating:
- Contributions become property of Indigo Labs LLC
- You have the right to contribute the code
- Contributions don't violate third-party rights
- You grant Indigo Labs LLC perpetual license to use contributions

The CLA will be provided upon authorization to contribute.

## Reporting Issues

Even if you're not an authorized contributor, you can report issues:

**Bug Reports (Public):**
- Use GitHub Issues for non-security bugs
- Provide reproducible steps
- Include environment details
- Do not include sensitive information

**Security Issues (Private):**
- Email: nick@onehealthcto.com
- See SECURITY.md for full process
- Do NOT create public issues for security vulnerabilities

## Questions?

- **General Licensing:** nick@onehealthcto.com
- **Security:** nick@onehealthcto.com
- **Partnerships:** Via lighthousehlth.com contact form

## Legal

By contributing, you:
- Acknowledge you've read and agree to the LICENSE terms
- Agree to the Contributor License Agreement
- Grant Indigo Labs LLC ownership of your contributions
- Warrant that contributions don't violate third-party rights

---

**Thank you for your interest in Lighthouse HLTH.**

If you're building healthcare sustainability solutions and want to collaborate,
we'd love to hear from you at nick@onehealthcto.com.

---

© 2025 Indigo Labs LLC. All rights reserved.
