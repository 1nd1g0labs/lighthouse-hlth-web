import type { Meta, StoryObj } from '@storybook/react';
import { MetricCard } from './MetricCard';

const meta: Meta<typeof MetricCard> = {
  title: 'Data Display/MetricCard',
  component: MetricCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Displays key metrics and statistics with optional trend indicators. Used for showcasing impact data on the homepage.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
    },
    showArrow: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const TotalSaved: Story = {
  args: {
    value: '$4m+',
    label: 'Total saved',
    showArrow: true,
  },
};

export const EmissionsAvoided: Story = {
  args: {
    value: '147t',
    label: 'CO₂e avoided emissions',
    showArrow: true,
  },
};

export const FacilitiesManaged: Story = {
  args: {
    value: '330+',
    label: 'Facilities under management',
    showArrow: true,
  },
};

export const WithTrendUp: Story = {
  args: {
    value: '93%+',
    label: 'Chronic conditions in remission',
    trend: 'up',
    trendValue: '+12%',
    showArrow: true,
  },
};

export const WithTrendDown: Story = {
  args: {
    value: '$2,100',
    label: 'Cost per patient',
    trend: 'down',
    trendValue: '-23%',
    showArrow: true,
  },
};

export const NoArrow: Story = {
  args: {
    value: '20K+',
    label: 'Medical supply chain emission factors',
    showArrow: false,
  },
};

export const SmallSize: Story = {
  args: {
    value: '42%',
    label: 'Reduction in waste',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    value: '$10M+',
    label: 'Annual savings generated',
    size: 'xl',
  },
};

export const Dashboard: Story = {
  render: () => (
    <div className="w-full max-w-6xl p-8 bg-white rounded-xl">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Sustainability is no longer a cost center — it's a cure
        </h2>
        <p className="text-xl text-gray-600">for patients, providers, and payers.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <MetricCard value="$4m+" label="Total saved" />
        <MetricCard value="147t" label="CO₂e avoided emissions" />
        <MetricCard value="330+" label="Facilities under management" />
        <MetricCard value="93%+" label="Chronic conditions in remission" trend="up" trendValue="+8%" />
        <MetricCard value="$2,100" label="Per tCO₂e grid energy usage saved" />
        <MetricCard value="20K+" label="Medical supply chain emission factors" showArrow={false} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'gray' },
  },
};
