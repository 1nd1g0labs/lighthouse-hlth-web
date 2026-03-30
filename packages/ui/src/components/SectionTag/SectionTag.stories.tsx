import type { Meta, StoryObj } from '@storybook/react';
import { SectionTag } from './SectionTag';

const meta = {
  title: 'Tier 2/SectionTag',
  component: SectionTag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Section label/tag for categorization. Used for categorizing content, features, and initiatives in healthcare applications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'accent', 'neutral'],
      description: 'Visual style variant',
    },
  },
} satisfies Meta<typeof SectionTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Energy',
    variant: 'primary',
  },
};

export const Accent: Story = {
  args: {
    children: 'Featured',
    variant: 'accent',
  },
};

export const Neutral: Story = {
  args: {
    children: 'General',
    variant: 'neutral',
  },
};

export const AllVariants: Story = {
  args: { children: 'Tag' },
  render: () => (
    <div className="flex items-center gap-3">
      <SectionTag variant="primary">Sustainability</SectionTag>
      <SectionTag variant="accent">Action Required</SectionTag>
      <SectionTag variant="neutral">Informational</SectionTag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All three variant styles.',
      },
    },
  },
};

export const SustainabilityCategories: Story = {
  args: { children: 'Tag' },
  render: () => (
    <div className="flex flex-wrap gap-2">
      <SectionTag variant="primary">Energy</SectionTag>
      <SectionTag variant="primary">Water</SectionTag>
      <SectionTag variant="primary">Waste</SectionTag>
      <SectionTag variant="primary">Supply Chain</SectionTag>
      <SectionTag variant="primary">Transportation</SectionTag>
      <SectionTag variant="primary">Building</SectionTag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sustainability categories using primary variant.',
      },
    },
  },
};

export const BlogPost: Story = {
  args: { children: 'Tag' },
  render: () => (
    <article className="bg-white p-6 rounded-lg border border-gray-200 max-w-2xl">
      <div className="flex items-center gap-2 mb-3">
        <SectionTag variant="primary">Case Study</SectionTag>
        <SectionTag variant="accent">New</SectionTag>
      </div>
      <h2 className="text-24 font-semibold text-gray-900 mb-2">
        Catholic Health System Reduces Carbon Emissions by 30%
      </h2>
      <p className="text-14 text-gray-600 mb-4">
        Learn how one health system used Lighthouse HLTH to achieve their
        Laudato Si' goals while improving operational margins.
      </p>
      <div className="flex items-center gap-2">
        <SectionTag variant="neutral">Energy Management</SectionTag>
        <SectionTag variant="neutral">ROI</SectionTag>
        <SectionTag variant="neutral">Mission Impact</SectionTag>
      </div>
    </article>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Blog post with multiple categorization tags.',
      },
    },
  },
};

export const FeatureCard: Story = {
  args: { children: 'Tag' },
  render: () => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-sm">
      <SectionTag variant="accent" className="mb-3">
        Premium Feature
      </SectionTag>
      <h3 className="text-20 font-semibold text-gray-900 mb-2">
        Predictive Analytics
      </h3>
      <p className="text-14 text-gray-600 mb-4">
        AI-powered insights to optimize energy usage and predict maintenance
        needs before they become costly problems.
      </p>
      <button className="text-14 font-medium text-primary-500 hover:text-primary-600">
        Learn More →
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Feature card with premium tag.',
      },
    },
  },
};

export const InitiativeList: Story = {
  args: { children: 'Tag' },
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
        <SectionTag variant="primary">Energy</SectionTag>
        <div className="flex-1">
          <h4 className="text-16 font-semibold text-gray-900 mb-1">
            LED Lighting Retrofit
          </h4>
          <p className="text-14 text-gray-600">
            Replace 2,400 fluorescent fixtures with LED lighting
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
        <SectionTag variant="primary">Waste</SectionTag>
        <div className="flex-1">
          <h4 className="text-16 font-semibold text-gray-900 mb-1">
            Composting Program
          </h4>
          <p className="text-14 text-gray-600">
            Divert food waste from cafeteria and patient services
          </p>
        </div>
      </div>
      <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200">
        <SectionTag variant="primary">Water</SectionTag>
        <div className="flex-1">
          <h4 className="text-16 font-semibold text-gray-900 mb-1">
            Low-Flow Fixtures
          </h4>
          <p className="text-14 text-gray-600">
            Install water-saving faucets and toilets throughout facility
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'List of sustainability initiatives with category tags.',
      },
    },
  },
};

export const DashboardMetrics: Story = {
  args: { children: 'Tag' },
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <SectionTag variant="primary" className="mb-3">
          Energy
        </SectionTag>
        <div className="text-32 font-bold text-gray-900 mb-1">-23%</div>
        <div className="text-14 text-gray-600">vs. baseline</div>
      </div>
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <SectionTag variant="primary" className="mb-3">
          Waste
        </SectionTag>
        <div className="text-32 font-bold text-gray-900 mb-1">847 tons</div>
        <div className="text-14 text-gray-600">diverted YTD</div>
      </div>
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <SectionTag variant="primary" className="mb-3">
          Carbon
        </SectionTag>
        <div className="text-32 font-bold text-gray-900 mb-1">-30%</div>
        <div className="text-14 text-gray-600">emissions reduced</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dashboard metric cards with category tags.',
      },
    },
  },
};

export const StatusTags: Story = {
  args: { children: 'Tag' },
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <SectionTag variant="accent">In Progress</SectionTag>
        <span className="text-14 text-gray-700">
          HVAC Optimization Project
        </span>
      </div>
      <div className="flex items-center gap-2">
        <SectionTag variant="primary">Completed</SectionTag>
        <span className="text-14 text-gray-700">Solar Panel Installation</span>
      </div>
      <div className="flex items-center gap-2">
        <SectionTag variant="neutral">Planned</SectionTag>
        <span className="text-14 text-gray-700">
          Water Recycling System
        </span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status tags for project tracking.',
      },
    },
  },
};

export const MultiTagging: Story = {
  args: { children: 'Tag' },
  render: () => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-xl">
      <div className="flex flex-wrap gap-2 mb-4">
        <SectionTag variant="primary">Energy</SectionTag>
        <SectionTag variant="primary">Cost Savings</SectionTag>
        <SectionTag variant="accent">High Impact</SectionTag>
        <SectionTag variant="neutral">12 Months</SectionTag>
      </div>
      <h3 className="text-20 font-semibold text-gray-900 mb-2">
        Smart Building Management System
      </h3>
      <p className="text-14 text-gray-600">
        Automated controls for HVAC, lighting, and equipment scheduling to
        optimize energy use based on occupancy and weather patterns.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple tags for comprehensive categorization.',
      },
    },
  },
};
