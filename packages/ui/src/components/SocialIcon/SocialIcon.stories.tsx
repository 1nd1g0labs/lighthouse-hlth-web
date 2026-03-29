import type { Meta, StoryObj } from '@storybook/react';
import { SocialIcon } from './SocialIcon';

const meta = {
  title: 'Tier 2/SocialIcon',
  component: SocialIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Social media icon button with hover effect. Used for connecting healthcare communities and sharing sustainability initiatives.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    platform: {
      control: 'select',
      options: ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube', 'github'],
      description: 'Social media platform',
    },
    variant: {
      control: 'select',
      options: ['default', 'filled'],
      description: 'Visual style variant',
    },
    href: {
      control: 'text',
      description: 'Link destination URL',
    },
  },
} satisfies Meta<typeof SocialIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LinkedIn: Story = {
  args: {
    platform: 'linkedin',
    href: 'https://linkedin.com/company/lighthouse-hlth',
    variant: 'default',
  },
};

export const Facebook: Story = {
  args: {
    platform: 'facebook',
    href: 'https://facebook.com/lighthousehlth',
    variant: 'default',
  },
};

export const Twitter: Story = {
  args: {
    platform: 'twitter',
    href: 'https://twitter.com/lighthousehlth',
    variant: 'default',
  },
};

export const FilledVariant: Story = {
  args: {
    platform: 'linkedin',
    href: 'https://linkedin.com/company/lighthouse-hlth',
    variant: 'filled',
  },
  parameters: {
    docs: {
      description: {
        story: 'Filled variant with primary background color.',
      },
    },
  },
};

export const AllPlatforms: Story = {
  args: { platform: 'linkedin', href: '#' },
  render: () => (
    <div className="flex gap-3">
      <SocialIcon platform="facebook" href="#" variant="default" />
      <SocialIcon platform="twitter" href="#" variant="default" />
      <SocialIcon platform="linkedin" href="#" variant="default" />
      <SocialIcon platform="instagram" href="#" variant="default" />
      <SocialIcon platform="youtube" href="#" variant="default" />
      <SocialIcon platform="github" href="#" variant="default" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available social media platforms in default variant.',
      },
    },
  },
};

export const AllPlatformsFilled: Story = {
  args: { platform: 'linkedin', href: '#' },
  render: () => (
    <div className="flex gap-3">
      <SocialIcon platform="facebook" href="#" variant="filled" />
      <SocialIcon platform="twitter" href="#" variant="filled" />
      <SocialIcon platform="linkedin" href="#" variant="filled" />
      <SocialIcon platform="instagram" href="#" variant="filled" />
      <SocialIcon platform="youtube" href="#" variant="filled" />
      <SocialIcon platform="github" href="#" variant="filled" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available social media platforms in filled variant.',
      },
    },
  },
};

export const FooterSocialLinks: Story = {
  args: { platform: 'linkedin', href: '#' },
  render: () => (
    <div className="bg-gray-50 p-8 rounded-lg">
      <div className="text-center mb-4">
        <h3 className="text-18 font-semibold text-gray-900 mb-2">
          Connect With Us
        </h3>
        <p className="text-14 text-gray-600">
          Join our community advancing sustainable healthcare
        </p>
      </div>
      <div className="flex justify-center gap-3">
        <SocialIcon
          platform="linkedin"
          href="https://linkedin.com/company/lighthouse-hlth"
          variant="default"
        />
        <SocialIcon
          platform="twitter"
          href="https://twitter.com/lighthousehlth"
          variant="default"
        />
        <SocialIcon
          platform="facebook"
          href="https://facebook.com/lighthousehlth"
          variant="default"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example footer social links section for healthcare organization.',
      },
    },
  },
};

export const DarkBackground: Story = {
  args: { platform: 'linkedin', href: '#' },
  render: () => (
    <div className="bg-gray-900 p-8 rounded-lg">
      <div className="flex justify-center gap-3">
        <SocialIcon platform="linkedin" href="#" variant="default" />
        <SocialIcon platform="twitter" href="#" variant="default" />
        <SocialIcon platform="instagram" href="#" variant="default" />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Social icons on dark background (common for footers).',
      },
    },
  },
};
