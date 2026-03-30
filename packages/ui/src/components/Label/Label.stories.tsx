import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

/**
 * Label - Framer-aligned rating/review label with avatars and stars
 *
 * Framer Component ID: pJf7jULqM
 *
 * **Design Specifications:**
 * - Container: 6px border radius, vertical stack
 * - Avatars: 32px circular, overlapping with -20px margin
 * - Plus badge: 32px, #057C8B background, white text
 * - Stars: 14px, #FF833B (accent) color
 * - Text: 14px Inter (text-body-sm)
 * - Gaps: 12px (images to rating), 5px (stars to text), 1px (between stars)
 *
 * **Use Cases:**
 * - Social proof on landing pages
 * - Testimonial sections
 * - Review displays
 * - Trust indicators
 * - Service ratings
 *
 * **Accessibility:**
 * - ARIA labels for star ratings
 * - Descriptive alt text for avatars
 * - Semantic HTML structure
 * - Screen reader friendly
 */
const meta = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A rating/review label displaying star rating and user count with avatars. Perfect for social proof and testimonials in healthcare contexts. Matches Framer design system exactly (nodeId: pJf7jULqM).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    rating: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5],
      description: 'Star rating value (1-5)',
      table: {
        type: { summary: '1 | 2 | 3 | 4 | 5' },
      },
    },
    avatars: {
      control: 'object',
      description: 'Array of avatar image URLs (max 4 shown)',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    additionalCount: {
      control: 'number',
      description: 'Number shown in "+N" badge',
      table: {
        type: { summary: 'number' },
      },
    },
    reviewText: {
      control: 'text',
      description: 'Review text displayed below stars',
      table: {
        type: { summary: 'string' },
      },
    },
    starColor: {
      control: 'text',
      description: 'Tailwind color class for stars',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text-accent-500' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Visual variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample avatar URLs (using placeholder service)
const sampleAvatars = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
];

/**
 * 5-Star Rating - Perfect score with social proof
 * Shows 4 avatars + "+20" badge indicating many reviewers
 */
export const FiveStars: Story = {
  args: {
    rating: 5,
    avatars: sampleAvatars,
    additionalCount: 20,
    reviewText: 'Based on 20K+ Reviews',
  },
};

/**
 * 4-Star Rating - High rating with good social proof
 */
export const FourStars: Story = {
  args: {
    rating: 4,
    avatars: sampleAvatars.slice(0, 3),
    additionalCount: 15,
    reviewText: 'Based on 500+ verified reviews',
  },
};

/**
 * 3-Star Rating - Average rating
 */
export const ThreeStars: Story = {
  args: {
    rating: 3,
    avatars: sampleAvatars.slice(0, 2),
    additionalCount: 10,
    reviewText: 'Based on 100 reviews',
  },
};

/**
 * Simple Rating - Stars and text only, no avatars
 */
export const SimpleRating: Story = {
  args: {
    rating: 5,
    reviewText: 'Verified Healthcare Reviews',
  },
};

/**
 * With Few Avatars - Shows 2 avatars without badge
 */
export const WithFewAvatars: Story = {
  args: {
    rating: 5,
    avatars: sampleAvatars.slice(0, 2),
    reviewText: 'Trusted by healthcare professionals',
  },
};

/**
 * Maximum Avatars - Shows all 4 avatars
 */
export const MaximumAvatars: Story = {
  args: {
    rating: 5,
    avatars: sampleAvatars,
    reviewText: 'Based on patient feedback',
  },
};

/**
 * Large Additional Count - Shows +1000 badge
 */
export const LargeAdditionalCount: Story = {
  args: {
    rating: 5,
    avatars: sampleAvatars,
    additionalCount: 1000,
    reviewText: 'Based on 1,000+ healthcare organizations',
  },
};

/**
 * Compact Variant - Reduced bottom padding
 */
export const CompactVariant: Story = {
  args: {
    rating: 5,
    avatars: sampleAvatars.slice(0, 3),
    additionalCount: 50,
    reviewText: 'Verified reviews',
    variant: 'compact',
  },
};

/**
 * Custom Star Color - Uses success green instead of accent orange
 */
export const CustomStarColor: Story = {
  args: {
    rating: 5,
    avatars: sampleAvatars,
    additionalCount: 25,
    reviewText: 'Sustainability certified',
    starColor: 'text-success-main',
  },
  parameters: {
    docs: {
      description: {
        story: 'Customize star color using Tailwind color classes (e.g., text-success-main, text-primary-500).',
      },
    },
  },
};

/**
 * No Review Text - Just stars and avatars
 */
export const NoReviewText: Story = {
  args: {
    rating: 5,
    avatars: sampleAvatars,
    additionalCount: 100,
  },
};

/**
 * Interactive Playground
 */
export const Playground: Story = {
  args: {
    rating: 5,
    avatars: sampleAvatars,
    additionalCount: 20,
    reviewText: 'Based on 20K+ Reviews',
    starColor: 'text-accent-500',
    variant: 'default',
  },
};

/**
 * Use Case: Landing Page Hero
 * Shows how Label is used for social proof on landing pages
 */
export const LandingPageHero: Story = {
  args: {
    rating: 5,
  },
  render: () => (
    <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-h5 font-semibold mb-4">
        Trusted by Healthcare Leaders
      </h2>
      <p className="text-body-sm text-neutral-600 mb-4">
        Join thousands of hospitals achieving sustainability goals while
        reducing operational costs.
      </p>
      <Label
        rating={5}
        avatars={sampleAvatars}
        additionalCount={500}
        reviewText="Based on 500+ healthcare organizations"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case: Social proof in hero section of landing page.',
      },
    },
  },
};

/**
 * Use Case: Testimonial Section
 * Shows Label with testimonial content
 */
export const TestimonialSection: Story = {
  args: {
    rating: 5,
  },
  render: () => (
    <div className="max-w-2xl p-8 bg-neutral-50 rounded-lg">
      <blockquote className="text-body-lg text-neutral-800 mb-6 italic">
        "Lighthouse HLTH transformed our operations. We reduced energy costs by
        30% while improving patient care quality. The sustainability dashboard
        made it easy to track our Laudato Si' goals."
      </blockquote>
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/150?img=5"
          alt="Dr. Sarah Martinez"
          className="w-16 h-16 rounded-full"
        />
        <div>
          <p className="font-semibold text-neutral-900">Dr. Sarah Martinez</p>
          <p className="text-body-sm text-neutral-600 mb-2">
            CFO, Sacred Heart Medical Center
          </p>
          <Label
            rating={5}
            reviewText="Verified healthcare professional"
            variant="compact"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case: Rating with testimonial content.',
      },
    },
  },
};

/**
 * Use Case: Multiple Ratings Display
 * Shows different rating levels side by side
 */
export const MultipleRatingsDisplay: Story = {
  args: {
    rating: 5,
  },
  render: () => (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md max-w-md">
      <h3 className="text-h6 font-semibold">Service Ratings</h3>

      <div className="flex items-center justify-between">
        <span className="text-body-sm font-medium">Ease of Use</span>
        <Label rating={5} variant="compact" />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-body-sm font-medium">Customer Support</span>
        <Label rating={5} variant="compact" />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-body-sm font-medium">ROI Achievement</span>
        <Label rating={4} variant="compact" />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-body-sm font-medium">Data Accuracy</span>
        <Label rating={5} variant="compact" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case: Display multiple service ratings in a list.',
      },
    },
  },
};

/**
 * Accessibility Demo
 * Highlights accessibility features
 */
export const AccessibilityDemo: Story = {
  args: {
    rating: 5,
  },
  render: () => (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-2">
          Accessibility Features
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700">
          <li>ARIA labels describe ratings for screen readers</li>
          <li>All avatar images have descriptive alt text</li>
          <li>Semantic HTML structure for proper document outline</li>
          <li>Color contrast meets WCAG 2.1 AA standards</li>
          <li>Star icons use currentColor for theme compatibility</li>
        </ul>
      </div>

      <div className="flex flex-col gap-4 p-4 bg-neutral-50 rounded">
        <p className="text-sm font-medium">
          Screen reader announcement: "5 out of 5 stars. Based on 20K+ Reviews"
        </p>
        <Label
          rating={5}
          avatars={sampleAvatars}
          additionalCount={20}
          reviewText="Based on 20K+ Reviews"
        />
      </div>

      <div className="flex flex-col gap-4 p-4 bg-neutral-50 rounded">
        <p className="text-sm font-medium">
          Avatar alt text: "Reviewer 1", "Reviewer 2", etc.
        </p>
        <Label
          rating={5}
          avatars={sampleAvatars}
          reviewText="Verified reviewers"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates accessibility features ensuring Label is usable by all users.',
      },
    },
  },
};
