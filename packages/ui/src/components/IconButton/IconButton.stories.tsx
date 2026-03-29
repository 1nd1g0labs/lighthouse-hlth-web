import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { Search } from 'lucide-react';

const meta: Meta<typeof IconButton> = {
  title: 'Core/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Circular icon button used for CTAs and navigation. Prominent in service cards and action areas.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    ariaLabel: 'Continue',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    ariaLabel: 'Next',
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    ariaLabel: 'Action',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    ariaLabel: 'View more',
  },
};

export const WithCustomIcon: Story = {
  args: {
    variant: 'primary',
    icon: <Search size={18} />,
    ariaLabel: 'Search',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton size="sm" ariaLabel="Small" />
      <IconButton size="md" ariaLabel="Medium" />
      <IconButton size="lg" ariaLabel="Large" />
      <IconButton size="xl" ariaLabel="Extra large" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton variant="primary" ariaLabel="Primary" />
      <IconButton variant="secondary" ariaLabel="Secondary" />
      <IconButton variant="accent" ariaLabel="Accent" />
      <IconButton variant="outline" ariaLabel="Outline" />
      <IconButton variant="ghost" ariaLabel="Ghost" />
    </div>
  ),
};

export const ServiceCardExample: Story = {
  render: () => (
    <div className="relative w-64 h-64 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl p-6 flex items-end justify-between">
      <div className="text-white">
        <h3 className="text-2xl font-semibold">Service Name</h3>
      </div>
      <IconButton variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white" ariaLabel="View service" />
    </div>
  ),
  parameters: {
    backgrounds: { default: 'gray' },
  },
};
