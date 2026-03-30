import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';

const meta = {
  title: 'Tier 2/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Star rating display (1-5 stars). Used for service feedback, patient satisfaction scores, and program ratings.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Rating value (1-5)',
    },
    maxRating: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Maximum rating (defaults to 5)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Star size',
    },
    showValue: {
      control: 'boolean',
      description: 'Show numeric rating value',
    },
    starColor: {
      control: 'color',
      description: 'Color for filled stars',
    },
    emptyColor: {
      control: 'color',
      description: 'Color for empty stars',
    },
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OneStar: Story = {
  args: {
    rating: 1,
  },
};

export const TwoStars: Story = {
  args: {
    rating: 2,
  },
};

export const ThreeStars: Story = {
  args: {
    rating: 3,
  },
};

export const FourStars: Story = {
  args: {
    rating: 4,
  },
};

export const FiveStars: Story = {
  args: {
    rating: 5,
  },
};

export const WithValue: Story = {
  args: {
    rating: 4,
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Rating with numeric value displayed.',
      },
    },
  },
};

export const SmallSize: Story = {
  args: {
    rating: 4,
    size: 'sm',
    showValue: true,
  },
};

export const LargeSize: Story = {
  args: {
    rating: 5,
    size: 'lg',
    showValue: true,
  },
};

export const CustomColors: Story = {
  args: {
    rating: 4,
    starColor: '#057C8B',
    emptyColor: '#E5E7EB',
    showValue: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Rating with custom star colors (primary teal instead of accent orange).',
      },
    },
  },
};

export const AllRatings: Story = {
  args: { rating: 5 },
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <Rating rating={5} showValue />
        <span className="text-14 text-gray-600">Excellent</span>
      </div>
      <div className="flex items-center gap-4">
        <Rating rating={4} showValue />
        <span className="text-14 text-gray-600">Good</span>
      </div>
      <div className="flex items-center gap-4">
        <Rating rating={3} showValue />
        <span className="text-14 text-gray-600">Average</span>
      </div>
      <div className="flex items-center gap-4">
        <Rating rating={2} showValue />
        <span className="text-14 text-gray-600">Below Average</span>
      </div>
      <div className="flex items-center gap-4">
        <Rating rating={1} showValue />
        <span className="text-14 text-gray-600">Poor</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All rating levels from 1 to 5 stars with labels.',
      },
    },
  },
};

export const PatientSatisfaction: Story = {
  args: { rating: 5 },
  render: () => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-md">
      <h3 className="text-18 font-semibold text-gray-900 mb-4">
        Patient Satisfaction Survey
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-14 text-gray-700">Care Quality</span>
          <Rating rating={5} size="sm" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-14 text-gray-700">Facility Cleanliness</span>
          <Rating rating={5} size="sm" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-14 text-gray-700">Staff Responsiveness</span>
          <Rating rating={4} size="sm" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-14 text-gray-700">Communication</span>
          <Rating rating={4} size="sm" />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-16 font-semibold text-gray-900">
            Overall Rating
          </span>
          <Rating rating={5} showValue />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example patient satisfaction survey with multiple rating categories.',
      },
    },
  },
};

export const SustainabilityProgram: Story = {
  args: { rating: 5 },
  render: () => (
    <div className="bg-gray-50 p-6 rounded-lg max-w-md">
      <h3 className="text-18 font-semibold text-gray-900 mb-2">
        Sustainability Program Rating
      </h3>
      <p className="text-14 text-gray-600 mb-4">
        Based on 47 hospital systems using Lighthouse HLTH
      </p>
      <div className="flex items-center gap-3 mb-4">
        <Rating rating={5} size="lg" />
        <span className="text-24 font-bold text-gray-900">5.0</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-12 text-gray-600 w-16">Impact</span>
          <Rating rating={5} size="sm" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-12 text-gray-600 w-16">Ease of Use</span>
          <Rating rating={5} size="sm" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-12 text-gray-600 w-16">ROI</span>
          <Rating rating={5} size="sm" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example sustainability program rating with breakdown by category.',
      },
    },
  },
};
