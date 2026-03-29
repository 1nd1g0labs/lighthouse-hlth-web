import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { cn } from '../../utils/cn';

/**
 * Button - Framer-aligned button with animated arrow hover effect
 *
 * Framer Component ID: Jobckk162
 *
 * **Design Specifications:**
 * - Background: #057C8B (green) or #FFFFFF (white)
 * - Text: 16px Inter medium
 * - Border radius: fully rounded (999px)
 * - Padding: 16px 8px
 * - Gap: 9px default, 12px on hover
 * - Minimum height: 44px (WCAG)
 * - Arrow: 15px, animated on hover
 *
 * **5 Variants:**
 * 1. green-left - Green bg, white text, arrow from left
 * 2. green-right - Green bg, white text, arrow from right (default)
 * 3. white-left - White bg, green text/border, arrow from left
 * 4. white-right - White bg, green text/border, arrow from right
 * 5. white-static - White bg, green text/border, no animation
 *
 * **Accessibility:**
 * - WCAG 2.1 AA color contrast
 * - 44px minimum touch target
 * - Keyboard accessible (Tab, Enter, Space)
 * - Focus indicator (2px ring)
 * - Respects prefers-reduced-motion
 *
 * **Use Cases:**
 * - Primary CTAs
 * - Hero section buttons
 * - Form submissions
 * - Navigation actions
 * - Download/signup buttons
 */
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Primary interactive button with animated arrow hover effect. Framer-aligned component matching marketing site exactly (nodeId: Jobckk162).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['green-left', 'green-right', 'white-left', 'white-right', 'white-static'],
      description: 'Visual variant (color and arrow direction)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'green-right' },
      },
    },
    arrowDirection: {
      control: 'select',
      options: ['left', 'right', 'none'],
      description: 'Arrow direction (auto-detected from variant if not specified)',
      table: {
        type: { summary: 'string' },
      },
    },
    animated: {
      control: 'boolean',
      description: 'Enable/disable arrow animation',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true (false for white-static)' },
      },
    },
    href: {
      control: 'text',
      description: 'If provided, renders as <a> tag',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: 'text',
      description: 'Button content',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Green Right - Default variant
 * Green background, white text, arrow from right
 */
export const GreenRight: Story = {
  args: {
    variant: 'green-right',
    children: 'Get Started',
  },
};

/**
 * Green Left
 * Green background, white text, arrow from left
 */
export const GreenLeft: Story = {
  args: {
    variant: 'green-left',
    children: 'Schedule Demo',
  },
};

/**
 * White Right
 * White background, green text/border, arrow from right
 */
export const WhiteRight: Story = {
  args: {
    variant: 'white-right',
    children: 'Learn More',
  },
};

/**
 * White Left
 * White background, green text/border, arrow from left
 */
export const WhiteLeft: Story = {
  args: {
    variant: 'white-left',
    children: 'View Services',
  },
};

/**
 * White Static
 * White background, no animation - simple outline button
 */
export const WhiteStatic: Story = {
  args: {
    variant: 'white-static',
    children: 'Contact Us',
  },
};

/**
 * Disabled State
 * Reduced opacity, no interaction
 */
export const Disabled: Story = {
  args: {
    variant: 'green-right',
    children: 'Unavailable',
    disabled: true,
  },
};

/**
 * As Link
 * Renders as <a> tag when href is provided
 */
export const AsLink: Story = {
  args: {
    variant: 'green-right',
    href: '/signup',
    children: 'Sign Up Now',
  },
  parameters: {
    docs: {
      description: {
        story: 'Provide href prop to render as semantic <a> tag for navigation.',
      },
    },
  },
};

/**
 * Animation Disabled
 * Static arrow without hover animation
 */
export const AnimationDisabled: Story = {
  args: {
    variant: 'green-right',
    animated: false,
    children: 'Simple Button',
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
    variant: 'green-right',
    children: 'Get Started',
    animated: true,
    disabled: false,
  },
};

/**
 * Variant Comparison
 * Shows all 5 variants side by side
 */
export const VariantComparison: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="flex flex-col gap-4">
      <Button variant="green-right">Green Right (default)</Button>
      <Button variant="green-left">Green Left</Button>
      <Button variant="white-right">White Right</Button>
      <Button variant="white-left">White Left</Button>
      <Button variant="white-static">White Static (no animation)</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All 5 variants displayed together for comparison.',
      },
    },
  },
};

/**
 * Use Case: Hero Section
 * Primary and secondary CTAs in hero
 */
export const HeroSection: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="max-w-4xl p-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white">
      <h1 className="text-h2 font-bold mb-4">
        Transform Healthcare Operations
      </h1>
      <p className="text-body-lg mb-8 text-white/90">
        Join 500+ hospitals achieving sustainability goals while reducing
        operational costs by 15-20%.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="white-right">Schedule a Demo</Button>
        <Button variant="white-static">Learn More</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case: Primary and secondary CTAs in hero section.',
      },
    },
  },
};

/**
 * Use Case: Feature Cards
 * Buttons in feature card grid
 */
export const FeatureCards: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      {[
        {
          title: 'Energy Management',
          description: 'Reduce energy costs by 30% with AI-powered optimization.',
          cta: 'Start Saving',
        },
        {
          title: 'Supply Chain',
          description: 'Track sustainability across your entire supply network.',
          cta: 'View Analytics',
        },
      ].map((feature, i) => (
        <div key={i} className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-h6 font-semibold mb-2">{feature.title}</h3>
          <p className="text-body-sm text-neutral-600 mb-4">
            {feature.description}
          </p>
          <Button variant="green-right">{feature.cta}</Button>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case: CTAs in feature card grid.',
      },
    },
  },
};

/**
 * Use Case: Form Actions
 * Primary and secondary actions in forms
 */
export const FormActions: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-h5 font-semibold mb-6">Request a Demo</h2>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Organization Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-neutral-300 rounded-md"
            placeholder="Sacred Heart Medical Center"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-neutral-300 rounded-md"
            placeholder="cfo@hospital.org"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="green-right" className="flex-1">
          Schedule Demo
        </Button>
        <Button variant="white-static" className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case: Primary and secondary actions in forms.',
      },
    },
  },
};

/**
 * Use Case: Pricing Tiers
 * CTA buttons in pricing cards
 */
export const PricingTiers: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
      {[
        {
          name: 'Starter',
          price: '$5,000',
          period: '/month',
          features: ['1 hospital', 'Energy tracking', 'Basic reporting'],
          cta: 'Get Started',
          variant: 'white-right' as const,
        },
        {
          name: 'Professional',
          price: '$12,000',
          period: '/month',
          features: ['5 hospitals', 'Full sustainability suite', 'Advanced analytics'],
          cta: 'Most Popular',
          variant: 'green-right' as const,
          highlighted: true,
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: '',
          features: ['Unlimited hospitals', 'White-glove support', 'Custom integrations'],
          cta: 'Contact Sales',
          variant: 'white-right' as const,
        },
      ].map((tier, i) => (
        <div
          key={i}
          className={cn(
            'p-6 bg-white rounded-lg border-2',
            tier.highlighted ? 'border-primary-500 shadow-lg' : 'border-neutral-200'
          )}
        >
          <h3 className="text-h6 font-semibold mb-2">{tier.name}</h3>
          <div className="mb-4">
            <span className="text-h4 font-bold">{tier.price}</span>
            <span className="text-neutral-600">{tier.period}</span>
          </div>
          <ul className="space-y-2 mb-6">
            {tier.features.map((feature, j) => (
              <li key={j} className="text-body-sm text-neutral-600 flex items-center gap-2">
                <svg className="w-5 h-5 text-success-main" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <Button variant={tier.variant} className="w-full">
            {tier.cta}
          </Button>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case: CTA buttons in pricing tier cards.',
      },
    },
  },
};

/**
 * Use Case: Modal Actions
 * Buttons in confirmation modal
 */
export const ModalActions: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="max-w-md p-6 bg-white rounded-lg shadow-xl">
      <h3 className="text-h6 font-semibold mb-2">Confirm Deletion</h3>
      <p className="text-body-sm text-neutral-600 mb-6">
        Are you sure you want to delete this sustainability report? This action
        cannot be undone.
      </p>
      <div className="flex justify-end gap-3">
        <Button variant="white-static">Cancel</Button>
        <Button variant="green-right">Delete Report</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case: Confirmation and cancel actions in modals.',
      },
    },
  },
};

/**
 * Accessibility Demo
 * Highlights accessibility features
 */
export const AccessibilityDemo: Story = {
  args: { children: 'Button' },
  render: () => (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-2">
          Accessibility Features
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700">
          <li>Color contrast: 4.71:1 (primary-500 on white) - Exceeds WCAG 2.1 AA requirement</li>
          <li>Touch target: 44px minimum height - Meets WCAG requirement</li>
          <li>Focus indicator: 2px ring at 3:1 contrast - Meets WCAG requirement</li>
          <li>Keyboard navigation: Full Tab, Enter, Space support</li>
          <li>Motion: Animation respects prefers-reduced-motion setting</li>
          <li>Semantic HTML: Uses <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code> appropriately</li>
          <li>Disabled state: Visual and functional (pointer-events-none)</li>
        </ul>
      </div>

      <div className="flex flex-col gap-4 p-4 bg-neutral-50 rounded">
        <p className="text-sm font-medium">
          Try keyboard navigation: Tab to focus, Enter/Space to activate
        </p>
        <Button variant="green-right">Keyboard Accessible</Button>
      </div>

      <div className="flex flex-col gap-4 p-4 bg-neutral-50 rounded">
        <p className="text-sm font-medium">
          Focus indicator visible on keyboard focus
        </p>
        <Button variant="white-right">Focus Me</Button>
      </div>

      <div className="flex flex-col gap-4 p-4 bg-neutral-50 rounded">
        <p className="text-sm font-medium">
          Disabled state prevents interaction and shows visual feedback
        </p>
        <Button variant="green-right" disabled>
          Disabled Button
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates accessibility features ensuring Button is usable by all users.',
      },
    },
  },
};
