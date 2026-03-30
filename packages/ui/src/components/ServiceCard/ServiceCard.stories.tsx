import type { Meta, StoryObj } from '@storybook/react';
import { ServiceCard } from './ServiceCard';
import { Leaf, Zap, Package } from 'lucide-react';

const meta: Meta<typeof ServiceCard> = {
  title: 'Data Display/ServiceCard',
  component: ServiceCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# ServiceCard - Image-Based Service Showcase

A modern service card component for showcasing features and services with compelling imagery and clear calls-to-action.

## Key Features

- **Image-focused**: Beautiful hero images that capture attention
- **Clear hierarchy**: Title, description, and optional action button
- **Icon support**: Brand your services with custom icons
- **Responsive**: Mobile-friendly with proper touch targets
- **Accessible**: WCAG 2.1 AA compliant with keyboard navigation
- **Variants**: Default and elevated styles

## Usage

Use ServiceCard to showcase product features, service offerings, or key platform capabilities. For dashboard metrics and data visualization, use the MetricCard component instead.

## When to Use

- **Service showcases**: Highlighting platform features or offerings
- **Product pages**: Displaying different product tiers or packages
- **Landing pages**: Feature sections and value propositions
- **Marketing**: Service descriptions with visual appeal

## When NOT to Use

- **Dashboard metrics**: Use MetricCard instead
- **Data visualization**: Use charts/graphs
- **Simple content**: Use Card component instead
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The main heading for the service card',
    },
    description: {
      control: 'text',
      description: 'Supporting description text',
    },
    image: {
      control: 'text',
      description: 'URL to the hero image (required)',
    },
    icon: {
      control: false,
      description: 'Optional icon component to display (React.ReactNode)',
    },
    variant: {
      control: 'select',
      options: ['default', 'elevated'],
      description: 'Visual style variant',
    },
    onCardClick: {
      control: false,
      description: 'Callback when the entire card is clicked',
    },
    onActionClick: {
      control: false,
      description: 'Callback for the action button (shows button when provided)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ServiceCard>;

export const Default: Story = {
  args: {
    title: 'Carbon Intelligence',
    description: 'Track and reduce emissions across Scope 1, 2, and 3 with automated GHG Protocol reporting',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80',
    icon: <Leaf className="w-6 h-6" />,
    variant: 'default',
  },
};

export const Elevated: Story = {
  args: {
    title: 'Energy Optimization',
    description: 'AI-powered predictive analytics for HVAC, lighting, and equipment performance optimization',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    icon: <Zap className="w-6 h-6" />,
    variant: 'elevated',
  },
};

export const WithCardAction: Story = {
  args: {
    title: 'Supply Chain Sustainability',
    description: 'Track spend, waste, and carbon footprint across medical supplies and pharmaceuticals',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    icon: <Package className="w-6 h-6" />,
    onCardClick: () => alert('Card clicked! Navigate to supply chain dashboard'),
  },
};

export const WithActionButton: Story = {
  args: {
    title: 'Clinical Decarbonization',
    description: 'Reduce emissions from clinical operations while maintaining quality patient care',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80',
    icon: <Leaf className="w-6 h-6" />,
    onActionClick: (e) => {
      e.stopPropagation();
      alert('Action button clicked! Open detailed view');
    },
  },
};

export const NoIcon: Story = {
  args: {
    title: 'Compliance Reporting',
    description: 'Automated sustainability reporting for Joint Commission, Leapfrog, and Laudato Si goals',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
  },
};

export const ServiceShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      <ServiceCard
        title="Carbon Intelligence"
        description="Real-time emissions tracking with automated reporting"
        image="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80"
        icon={<Leaf className="w-6 h-6" />}
        onCardClick={() => console.log('Navigate to carbon tracking')}
      />
      <ServiceCard
        title="Energy Optimization"
        description="AI-powered predictive analytics for facility operations"
        image="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80"
        icon={<Zap className="w-6 h-6" />}
        variant="elevated"
        onCardClick={() => console.log('Navigate to energy dashboard')}
      />
      <ServiceCard
        title="Supply Chain"
        description="Track sustainability across your entire supply network"
        image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
        icon={<Package className="w-6 h-6" />}
        onActionClick={() => console.log('Open supply chain details')}
      />
    </div>
  ),
};
