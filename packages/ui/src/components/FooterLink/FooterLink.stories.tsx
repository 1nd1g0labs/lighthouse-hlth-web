import type { Meta, StoryObj } from '@storybook/react';
import { FooterLink } from './FooterLink';

const meta = {
  title: 'Tier 2/FooterLink',
  component: FooterLink,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Footer link with subtle hover effect. Used for footer navigation in healthcare sustainability applications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'Link destination',
    },
    variant: {
      control: 'select',
      options: ['default', 'light'],
      description: 'Visual style variant',
    },
  },
} satisfies Meta<typeof FooterLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '/privacy',
    children: 'Privacy Policy',
    variant: 'default',
  },
};

export const LightVariant: Story = {
  args: {
    href: '/terms',
    children: 'Terms of Service',
    variant: 'light',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Light variant for use on dark backgrounds.',
      },
    },
  },
};

export const FooterNavigation: Story = {
  args: {
    href: '#',
    children: 'Link',
  },
  render: () => (
    <footer className="bg-gray-50 p-8 rounded-lg">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h4 className="text-14 font-semibold text-gray-900 mb-3">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/features">Features</FooterLink>
              </li>
              <li>
                <FooterLink href="/pricing">Pricing</FooterLink>
              </li>
              <li>
                <FooterLink href="/demo">Request Demo</FooterLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-14 font-semibold text-gray-900 mb-3">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/about">About Us</FooterLink>
              </li>
              <li>
                <FooterLink href="/mission">Our Mission</FooterLink>
              </li>
              <li>
                <FooterLink href="/careers">Careers</FooterLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-14 font-semibold text-gray-900 mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/privacy">Privacy</FooterLink>
              </li>
              <li>
                <FooterLink href="/terms">Terms</FooterLink>
              </li>
              <li>
                <FooterLink href="/security">Security</FooterLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-200">
          <p className="text-12 text-gray-500 text-center">
            © 2025 Lighthouse HLTH. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete footer navigation with multiple columns.',
      },
    },
  },
};

export const DarkFooter: Story = {
  args: {
    href: '#',
    children: 'Link',
  },
  render: () => (
    <footer className="bg-gray-900 p-8 rounded-lg">
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-4 gap-6">
          <div>
            <h4 className="text-14 font-semibold text-white mb-3">
              Solutions
            </h4>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/energy" variant="light">
                  Energy Management
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/waste" variant="light">
                  Waste Reduction
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/supply-chain" variant="light">
                  Supply Chain
                </FooterLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-14 font-semibold text-white mb-3">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/blog" variant="light">
                  Blog
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/case-studies" variant="light">
                  Case Studies
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/docs" variant="light">
                  Documentation
                </FooterLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-14 font-semibold text-white mb-3">Support</h4>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/help" variant="light">
                  Help Center
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/contact" variant="light">
                  Contact Us
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/status" variant="light">
                  System Status
                </FooterLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-14 font-semibold text-white mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <FooterLink href="/privacy" variant="light">
                  Privacy Policy
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/terms" variant="light">
                  Terms of Service
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/hipaa" variant="light">
                  HIPAA Compliance
                </FooterLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-800">
          <p className="text-12 text-gray-500 text-center">
            © 2025 Lighthouse HLTH. Advancing sustainable healthcare.
          </p>
        </div>
      </div>
    </footer>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Dark footer with light variant links.',
      },
    },
  },
};

export const SimpleFooter: Story = {
  args: {
    href: '#',
    children: 'Link',
  },
  render: () => (
    <footer className="bg-white p-6 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <p className="text-12 text-gray-500">
          © 2025 Lighthouse HLTH. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <FooterLink href="/privacy">Privacy</FooterLink>
          <FooterLink href="/terms">Terms</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </div>
      </div>
    </footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Simple single-row footer layout.',
      },
    },
  },
};

export const MobileFooter: Story = {
  args: {
    href: '#',
    children: 'Link',
  },
  render: () => (
    <footer className="bg-gray-50 p-6 rounded-lg max-w-sm">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <h4 className="text-14 font-semibold text-gray-900">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <FooterLink href="/about">About</FooterLink>
            </li>
            <li>
              <FooterLink href="/contact">Contact</FooterLink>
            </li>
            <li>
              <FooterLink href="/help">Help Center</FooterLink>
            </li>
            <li>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
            </li>
          </ul>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <p className="text-12 text-gray-500 text-center">
            © 2025 Lighthouse HLTH
          </p>
        </div>
      </div>
    </footer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mobile-optimized footer with stacked links.',
      },
    },
  },
};
