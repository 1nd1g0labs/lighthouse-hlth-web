import type { Meta, StoryObj } from '@storybook/react';
import { Navlink } from './Navlink';

const meta = {
  title: 'Tier 2/Navlink',
  component: Navlink,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Navigation link with active state indicator. Used for main navigation menus in healthcare sustainability dashboards.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'Link destination',
    },
    isActive: {
      control: 'boolean',
      description: 'Whether the link is currently active (current page)',
    },
  },
} satisfies Meta<typeof Navlink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '/dashboard',
    children: 'Dashboard',
    isActive: false,
  },
};

export const Active: Story = {
  args: {
    href: '/dashboard',
    children: 'Dashboard',
    isActive: true,
  },
};

export const NavigationMenu: Story = {
  args: {
    href: '#',
    children: 'Link',
  },
  render: () => (
    <nav className="flex items-center gap-1 border-b border-gray-200 pb-px">
      <Navlink href="/dashboard" isActive>
        Dashboard
      </Navlink>
      <Navlink href="/sustainability" isActive={false}>
        Sustainability
      </Navlink>
      <Navlink href="/energy" isActive={false}>
        Energy
      </Navlink>
      <Navlink href="/waste" isActive={false}>
        Waste
      </Navlink>
      <Navlink href="/reports" isActive={false}>
        Reports
      </Navlink>
    </nav>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example navigation menu with active state on Dashboard.',
      },
    },
  },
};

export const HealthcareNav: Story = {
  args: {
    href: '#',
    children: 'Link',
  },
  render: () => (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center gap-1">
          <Navlink href="/overview" isActive>
            Overview
          </Navlink>
          <Navlink href="/carbon-footprint" isActive={false}>
            Carbon Footprint
          </Navlink>
          <Navlink href="/supply-chain" isActive={false}>
            Supply Chain
          </Navlink>
          <Navlink href="/laudato-si" isActive={false}>
            Laudato Si'
          </Navlink>
          <Navlink href="/mission" isActive={false}>
            Mission Impact
          </Navlink>
        </nav>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example healthcare sustainability navigation.',
      },
    },
  },
};

export const VerticalNav: Story = {
  args: {
    href: '#',
    children: 'Link',
  },
  render: () => (
    <nav className="flex flex-col items-start gap-1 w-64 border-r border-gray-200 pr-4">
      <Navlink href="/home" isActive>
        Home
      </Navlink>
      <Navlink href="/analytics" isActive={false}>
        Analytics
      </Navlink>
      <Navlink href="/goals" isActive={false}>
        Sustainability Goals
      </Navlink>
      <Navlink href="/initiatives" isActive={false}>
        Initiatives
      </Navlink>
      <Navlink href="/settings" isActive={false}>
        Settings
      </Navlink>
    </nav>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vertical sidebar navigation layout.',
      },
    },
  },
};

export const MobileNav: Story = {
  args: {
    href: '#',
    children: 'Link',
  },
  render: () => (
    <nav className="flex flex-col items-stretch gap-2 w-full bg-white rounded-lg p-4 shadow-lg">
      <Navlink href="/dashboard" isActive className="justify-start">
        Dashboard
      </Navlink>
      <Navlink href="/metrics" isActive={false} className="justify-start">
        Metrics
      </Navlink>
      <Navlink href="/reports" isActive={false} className="justify-start">
        Reports
      </Navlink>
      <Navlink href="/team" isActive={false} className="justify-start">
        Team
      </Navlink>
    </nav>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mobile navigation menu with full-width links.',
      },
    },
  },
};

export const WithIconNav: Story = {
  args: {
    href: '#',
    children: 'Link',
  },
  render: () => (
    <nav className="flex items-center gap-1 border-b border-gray-200 pb-px">
      <Navlink href="/home" isActive>
        <svg
          className="w-4 h-4 mr-1.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        Home
      </Navlink>
      <Navlink href="/chart" isActive={false}>
        <svg
          className="w-4 h-4 mr-1.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        Analytics
      </Navlink>
      <Navlink href="/settings" isActive={false}>
        <svg
          className="w-4 h-4 mr-1.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Settings
      </Navlink>
    </nav>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation links with icons for enhanced visual clarity.',
      },
    },
  },
};
