import type { Meta, StoryObj } from '@storybook/react';
import { ContactLink } from './ContactLink';

const meta = {
  title: 'Tier 2/ContactLink',
  component: ContactLink,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Contact link with icon (email, phone, location). Used for displaying contact information in healthcare applications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: ['email', 'phone', 'location'],
      description: 'Type of contact link',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary'],
      description: 'Visual style variant',
    },
    href: {
      control: 'text',
      description: 'Link destination (mailto:, tel:, or maps URL)',
    },
  },
} satisfies Meta<typeof ContactLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {
  args: {
    icon: 'email',
    href: 'mailto:hello@lighthousehlth.com',
    children: 'hello@lighthousehlth.com',
    variant: 'default',
  },
};

export const Phone: Story = {
  args: {
    icon: 'phone',
    href: 'tel:+15551234567',
    children: '+1 (555) 123-4567',
    variant: 'default',
  },
};

export const Location: Story = {
  args: {
    icon: 'location',
    href: 'https://maps.google.com/?q=Denver,CO',
    children: 'Denver, Colorado',
    variant: 'default',
  },
};

export const PrimaryVariant: Story = {
  args: {
    icon: 'email',
    href: 'mailto:support@lighthousehlth.com',
    children: 'support@lighthousehlth.com',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary variant with teal text color.',
      },
    },
  },
};

export const ContactSection: Story = {
  args: {
    icon: 'email',
    href: 'mailto:hello@lighthousehlth.com',
    children: 'hello@lighthousehlth.com',
  },
  render: () => (
    <div className="bg-white p-8 rounded-lg border border-gray-200 max-w-md">
      <h3 className="text-20 font-semibold text-gray-900 mb-6">
        Contact Information
      </h3>
      <div className="space-y-4">
        <ContactLink icon="email" href="mailto:hello@lighthousehlth.com">
          hello@lighthousehlth.com
        </ContactLink>
        <ContactLink icon="phone" href="tel:+15551234567">
          +1 (555) 123-4567
        </ContactLink>
        <ContactLink
          icon="location"
          href="https://maps.google.com/?q=Denver,CO"
        >
          123 Healthcare Way, Denver, CO 80202
        </ContactLink>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete contact information section.',
      },
    },
  },
};

export const HospitalContact: Story = {
  args: {
    icon: 'email',
    href: 'mailto:hello@lighthousehlth.com',
    children: 'hello@lighthousehlth.com',
  },
  render: () => (
    <div className="bg-gray-50 p-8 rounded-lg max-w-lg">
      <h2 className="text-24 font-semibold text-gray-900 mb-2">
        Get in Touch
      </h2>
      <p className="text-14 text-gray-600 mb-6">
        Contact our sustainability team to learn how Lighthouse HLTH can help
        your health system.
      </p>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <h4 className="text-12 font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Email
          </h4>
          <ContactLink
            icon="email"
            href="mailto:sustainability@hospital.org"
            variant="primary"
          >
            sustainability@hospital.org
          </ContactLink>
        </div>
        <div>
          <h4 className="text-12 font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Phone
          </h4>
          <ContactLink
            icon="phone"
            href="tel:+15551234567"
            variant="primary"
          >
            +1 (555) 123-4567
          </ContactLink>
        </div>
        <div>
          <h4 className="text-12 font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Address
          </h4>
          <ContactLink
            icon="location"
            href="https://maps.google.com/?q=Denver,CO"
            variant="primary"
          >
            Catholic Health System
            <br />
            456 Mission Drive
            <br />
            Denver, CO 80203
          </ContactLink>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Healthcare organization contact card.',
      },
    },
  },
};

export const FooterContact: Story = {
  args: {
    icon: 'email',
    href: 'mailto:hello@lighthousehlth.com',
    children: 'hello@lighthousehlth.com',
  },
  render: () => (
    <footer className="bg-gray-900 p-8 rounded-lg">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-18 font-semibold text-white mb-4">
            Lighthouse HLTH
          </h3>
          <p className="text-14 text-gray-400 mb-6">
            Advancing sustainable healthcare through operational excellence.
          </p>
        </div>
        <div>
          <h4 className="text-14 font-semibold text-white mb-4">Contact Us</h4>
          <div className="space-y-3">
            <ContactLink
              icon="email"
              href="mailto:hello@lighthousehlth.com"
              className="text-gray-300 hover:text-white"
            >
              hello@lighthousehlth.com
            </ContactLink>
            <ContactLink
              icon="phone"
              href="tel:+15551234567"
              className="text-gray-300 hover:text-white"
            >
              +1 (555) 123-4567
            </ContactLink>
            <ContactLink
              icon="location"
              href="https://maps.google.com/?q=Denver,CO"
              className="text-gray-300 hover:text-white"
            >
              Denver, Colorado
            </ContactLink>
          </div>
        </div>
      </div>
    </footer>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Contact links in dark footer.',
      },
    },
  },
};

export const CompactList: Story = {
  args: {
    icon: 'email',
    href: 'mailto:info@hospital.org',
    children: 'info@hospital.org',
  },
  render: () => (
    <div className="space-y-2">
      <ContactLink icon="email" href="mailto:info@hospital.org" variant="primary">
        info@hospital.org
      </ContactLink>
      <ContactLink icon="phone" href="tel:+15551234567" variant="primary">
        (555) 123-4567
      </ContactLink>
      <ContactLink
        icon="location"
        href="https://maps.google.com/?q=Denver,CO"
        variant="primary"
      >
        View on Map
      </ContactLink>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact contact link list.',
      },
    },
  },
};

export const SupportContact: Story = {
  args: {
    icon: 'email',
    href: 'mailto:support@lighthousehlth.com',
    children: 'support@lighthousehlth.com',
  },
  render: () => (
    <div className="bg-primary-50 border border-primary-200 p-6 rounded-lg max-w-md">
      <h3 className="text-18 font-semibold text-gray-900 mb-2">
        Need Support?
      </h3>
      <p className="text-14 text-gray-700 mb-4">
        Our sustainability experts are here to help your health system succeed.
      </p>
      <div className="space-y-3">
        <ContactLink
          icon="email"
          href="mailto:support@lighthousehlth.com"
          variant="primary"
        >
          support@lighthousehlth.com
        </ContactLink>
        <ContactLink
          icon="phone"
          href="tel:+15551234567"
          variant="primary"
        >
          +1 (555) 123-4567 (Mon-Fri 8am-6pm MT)
        </ContactLink>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Support contact card with highlighted background.',
      },
    },
  },
};
