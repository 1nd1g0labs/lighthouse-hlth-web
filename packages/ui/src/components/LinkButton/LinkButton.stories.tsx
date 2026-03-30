import type { Meta, StoryObj } from '@storybook/react';
import { LinkButton } from './LinkButton';

/**
 * LinkButton - Framer-aligned text link with animated arrow
 *
 * Framer Component ID: Y9sUo0Uzx
 *
 * **Design Specifications:**
 * - Text: 16px Inter
 * - Arrow: 15px, rotated -45deg (forward) or 135deg (backward)
 * - Gap: 7px default, 12px on hover
 * - Animation: Two-arrow swap effect on hover
 *
 * **4 Variants:**
 * 1. forward-black - Black text, right arrow (default)
 * 2. forward-white - White text, right arrow
 * 3. backward-black - Black text, left arrow
 * 4. backward-white - White text, left arrow
 *
 * **Accessibility:**
 * - Semantic <a> tag with href
 * - Keyboard accessible (Tab, Enter)
 * - Focus indicator (2px ring)
 * - Respects prefers-reduced-motion
 * - Color contrast meets WCAG 2.1 AA
 *
 * **Use Cases:**
 * - "Learn more" links
 * - "Read full story" links
 * - Navigation to detail pages
 * - Secondary CTAs
 * - Back navigation
 */
const meta = {
  title: 'Components/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A text link with animated arrow for navigation. Perfect for secondary CTAs and "Learn more" links. Matches Framer design system exactly (nodeId: Y9sUo0Uzx).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['forward-black', 'forward-white', 'backward-black', 'backward-white'],
      description: 'Visual variant (direction and color)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'forward-black' },
      },
    },
    href: {
      control: 'text',
      description: 'Link destination URL',
      table: {
        type: { summary: 'string' },
      },
    },
    animated: {
      control: 'boolean',
      description: 'Enable/disable arrow animation',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    children: {
      control: 'text',
      description: 'Link text content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Forward Black - Default variant
 * Black text with right-pointing arrow, for light backgrounds
 */
export const ForwardBlack: Story = {
  args: {
    variant: 'forward-black',
    href: '#',
    children: 'Learn more about sustainability',
  },
};

/**
 * Forward White - For dark backgrounds
 * White text with right-pointing arrow
 */
export const ForwardWhite: Story = {
  args: {
    variant: 'forward-white',
    href: '#',
    children: 'View our services',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Backward Black - Back navigation
 * Black text with left-pointing arrow
 */
export const BackwardBlack: Story = {
  args: {
    variant: 'backward-black',
    href: '#',
    children: 'Back to homepage',
  },
};

/**
 * Backward White - Back navigation on dark
 * White text with left-pointing arrow
 */
export const BackwardWhite: Story = {
  args: {
    variant: 'backward-white',
    href: '#',
    children: 'Return to dashboard',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Animation Disabled
 * Static arrow without hover animation
 */
export const AnimationDisabled: Story = {
  args: {
    variant: 'forward-black',
    href: '#',
    children: 'Simple link without animation',
    animated: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disable animation for reduced motion preferences or simpler UI.',
      },
    },
  },
};

/**
 * Interactive Playground
 */
export const Playground: Story = {
  args: {
    variant: 'forward-black',
    href: '#',
    children: 'Learn more',
    animated: true,
  },
};

/**
 * Use Case: Card Footer Links
 * Common pattern with multiple link buttons
 */
export const CardFooterLinks: Story = {
  args: {
    href: '#',
    children: 'Learn more',
  },
  render: () => (
    <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-h6 font-semibold mb-2">
        Sustainability Reporting
      </h3>
      <p className="text-body-sm text-neutral-600 mb-4">
        Track your organization's carbon footprint and energy consumption
        in real-time with comprehensive sustainability metrics.
      </p>
      <div className="flex gap-6">
        <LinkButton variant="forward-black" href="/sustainability">
          Learn more
        </LinkButton>
        <LinkButton variant="forward-black" href="/case-studies">
          View case studies
        </LinkButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case: Multiple links in card footer for related actions.',
      },
    },
  },
};

/**
 * Use Case: Hero Section CTA
 * Secondary CTA below primary button
 */
export const HeroSectionCTA: Story = {
  args: {
    href: '#',
    children: 'Learn more',
  },
  render: () => (
    <div className="max-w-2xl p-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white">
      <h1 className="text-h3 font-bold mb-4">
        Operational Sustainability Meets Financial Health
      </h1>
      <p className="text-body-lg mb-6 text-white/90">
        Join 500+ healthcare organizations reducing costs while advancing
        creation care.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <button className="px-6 py-3 bg-white text-primary-600 font-medium rounded-full hover:bg-neutral-100 transition-colors">
          Schedule a Demo
        </button>
        <LinkButton variant="forward-white" href="/learn-more">
          See how it works
        </LinkButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case: Secondary CTA in hero section alongside primary button.',
      },
    },
  },
};

/**
 * Use Case: Article List
 * Links to full articles or blog posts
 */
export const ArticleList: Story = {
  args: {
    href: '#',
    children: 'Read article',
  },
  render: () => (
    <div className="max-w-2xl space-y-6">
      <article className="p-6 bg-white rounded-lg border border-neutral-200">
        <h3 className="text-h6 font-semibold mb-2">
          5 Ways to Reduce Hospital Energy Costs
        </h3>
        <p className="text-body-sm text-neutral-600 mb-3">
          Discover proven strategies for reducing energy consumption while
          maintaining optimal patient care environments...
        </p>
        <LinkButton variant="forward-black" href="/articles/energy-costs">
          Read full article
        </LinkButton>
      </article>

      <article className="p-6 bg-white rounded-lg border border-neutral-200">
        <h3 className="text-h6 font-semibold mb-2">
          Laudato Si' Goals: A Healthcare Guide
        </h3>
        <p className="text-body-sm text-neutral-600 mb-3">
          Learn how Catholic health systems are integrating Pope Francis's
          creation care vision into daily operations...
        </p>
        <LinkButton variant="forward-black" href="/articles/laudato-si">
          Read full article
        </LinkButton>
      </article>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case: Links to full content in article or blog lists.',
      },
    },
  },
};

/**
 * Use Case: Breadcrumb Navigation
 * Back navigation in multi-step flows
 */
export const BreadcrumbNavigation: Story = {
  args: {
    href: '#',
    children: 'Back to Dashboard',
  },
  render: () => (
    <div className="max-w-2xl">
      <div className="mb-6">
        <LinkButton variant="backward-black" href="/dashboard">
          Back to Dashboard
        </LinkButton>
      </div>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-h4 font-semibold mb-4">
          Sustainability Report Details
        </h2>
        <p className="text-body text-neutral-600">
          View comprehensive metrics for your organization's environmental
          impact and operational efficiency.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case: Back navigation in detail views or multi-step flows.',
      },
    },
  },
};

/**
 * Use Case: Service Cards Grid
 * Multiple service cards with "Learn more" links
 */
export const ServiceCardsGrid: Story = {
  args: {
    href: '#',
    children: 'Learn more',
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
      {[
        {
          title: 'Energy Management',
          description: 'Real-time monitoring and optimization of hospital energy systems.',
          href: '/services/energy',
        },
        {
          title: 'Supply Chain Analytics',
          description: 'Track sustainability impact across your entire supply chain.',
          href: '/services/supply-chain',
        },
        {
          title: 'Carbon Reporting',
          description: 'Automated carbon footprint reporting for compliance and goals.',
          href: '/services/carbon',
        },
      ].map((service, i) => (
        <div key={i} className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-h6 font-semibold mb-2">{service.title}</h3>
          <p className="text-body-sm text-neutral-600 mb-4">
            {service.description}
          </p>
          <LinkButton variant="forward-black" href={service.href}>
            Learn more
          </LinkButton>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case: Service cards grid with consistent "Learn more" links.',
      },
    },
  },
};

/**
 * Accessibility Demo
 * Highlights accessibility features
 */
export const AccessibilityDemo: Story = {
  args: {
    href: '#',
    children: 'Learn more',
  },
  render: () => (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-2">
          Accessibility Features
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700">
          <li>Semantic HTML: Uses proper <code>&lt;a&gt;</code> tag with href attribute</li>
          <li>Keyboard navigation: Fully accessible via Tab and Enter keys</li>
          <li>Focus indicator: 2px ring at 3:1 contrast ratio (WCAG 2.1 AA)</li>
          <li>Motion: Animation respects prefers-reduced-motion setting</li>
          <li>Color contrast: Black on white (21:1), White on dark (varies by bg)</li>
          <li>Screen reader: Link text clearly describes destination</li>
        </ul>
      </div>

      <div className="flex flex-col gap-4 p-4 bg-neutral-50 rounded">
        <p className="text-sm font-medium">
          Try keyboard navigation: Tab to focus, Enter to activate
        </p>
        <LinkButton variant="forward-black" href="#keyboard">
          Keyboard accessible link
        </LinkButton>
      </div>

      <div className="flex flex-col gap-4 p-4 bg-neutral-50 rounded">
        <p className="text-sm font-medium">
          Animation automatically disabled for users with prefers-reduced-motion
        </p>
        <LinkButton variant="forward-black" href="#motion">
          Motion-sensitive link
        </LinkButton>
      </div>

      <div className="flex flex-col gap-4 p-4 bg-primary-600 rounded">
        <p className="text-sm font-medium text-white">
          White variant maintains contrast on dark backgrounds
        </p>
        <LinkButton variant="forward-white" href="#contrast">
          High contrast link
        </LinkButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates accessibility features ensuring LinkButton is usable by all users.',
      },
    },
  },
};
