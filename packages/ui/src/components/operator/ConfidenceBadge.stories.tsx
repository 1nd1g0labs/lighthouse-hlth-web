import type { Meta, StoryObj } from '@storybook/react';
import { ConfidenceBadge } from './ConfidenceBadge';

/**
 * ConfidenceBadge displays confidence scores for emission factor matches
 * with color-coded visual indicators.
 *
 * ## Confidence Levels
 * - **High (≥80%)**: Green with checkmark icon
 * - **Medium (50-79%)**: Yellow with warning icon
 * - **Low (<50%)**: Red with X icon
 *
 * ## Accessibility
 * - Icons supplement color (not sole indicator)
 * - Proper ARIA labels for screen readers
 * - WCAG 2.1 AA color contrast compliance
 */
const meta = {
  title: 'Operator/ConfidenceBadge',
  component: ConfidenceBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays confidence score for emission factor matches with color-coded visual indicators. Automatically determines level (high/medium/low) based on score.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    score: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Confidence score (0-100)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show percentage label',
    },
    showIcon: {
      control: 'boolean',
      description: 'Show icon',
    },
  },
} satisfies Meta<typeof ConfidenceBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default medium confidence badge
 */
export const Default: Story = {
  args: {
    score: 65,
    size: 'md',
    showLabel: true,
    showIcon: true,
  },
};

/**
 * High confidence (≥80%) - Green with checkmark
 */
export const HighConfidence: Story = {
  args: {
    score: 92,
  },
};

/**
 * Medium confidence (50-79%) - Yellow with warning
 */
export const MediumConfidence: Story = {
  args: {
    score: 65,
  },
};

/**
 * Low confidence (<50%) - Red with X
 */
export const LowConfidence: Story = {
  args: {
    score: 38,
  },
};

/**
 * Small size variant for tables
 */
export const SmallSize: Story = {
  args: {
    score: 85,
    size: 'sm',
  },
};

/**
 * Large size variant for emphasis
 */
export const LargeSize: Story = {
  args: {
    score: 72,
    size: 'lg',
  },
};

/**
 * Icon only (no percentage label)
 */
export const IconOnly: Story = {
  args: {
    score: 88,
    showLabel: false,
  },
};

/**
 * Label only (no icon)
 */
export const LabelOnly: Story = {
  args: {
    score: 56,
    showIcon: false,
  },
};

/**
 * All confidence levels comparison
 */
export const AllLevels: Story = {
  args: {
    score: 85,
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 w-32">High (95%):</span>
        <ConfidenceBadge score={95} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 w-32">High (80%):</span>
        <ConfidenceBadge score={80} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 w-32">Medium (75%):</span>
        <ConfidenceBadge score={75} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 w-32">Medium (50%):</span>
        <ConfidenceBadge score={50} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 w-32">Low (45%):</span>
        <ConfidenceBadge score={45} />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 w-32">Low (10%):</span>
        <ConfidenceBadge score={10} />
      </div>
    </div>
  ),
};

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  args: {
    score: 85,
  },
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <ConfidenceBadge score={85} size="sm" />
        <span className="text-xs text-gray-600">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ConfidenceBadge score={85} size="md" />
        <span className="text-xs text-gray-600">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ConfidenceBadge score={85} size="lg" />
        <span className="text-xs text-gray-600">Large</span>
      </div>
    </div>
  ),
};
