import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'Core/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Flexible card component with header, content, and footer sections. Supports multiple variants and responsive design.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outline', 'ghost', 'sustainability'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    hoverable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">This is the card content area where you can place any content.</p>
        </CardContent>
      </>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Emissions Report</CardTitle>
          <CardDescription>Monthly carbon footprint analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">Your facility has reduced emissions by 23% this quarter.</p>
        </CardContent>
        <CardFooter>
          <Button variant="primary">View Details</Button>
          <Button variant="outline">Download</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>With more prominent shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">This card has an elevated appearance with stronger shadows.</p>
        </CardContent>
      </>
    ),
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: (
      <>
        <CardHeader>
          <CardTitle>Outline Card</CardTitle>
          <CardDescription>With border emphasis</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">This card uses a border instead of shadow for definition.</p>
        </CardContent>
      </>
    ),
  },
};

export const Sustainability: Story = {
  args: {
    variant: 'sustainability',
    children: (
      <>
        <CardHeader>
          <CardTitle>Sustainability Score</CardTitle>
          <CardDescription>Your environmental impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-primary-500">85%</p>
            <p className="text-gray-700">Above target for the quarter</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="secondary">View Breakdown</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Hover to see the effect</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">This card has hover effects and acts as a clickable element.</p>
        </CardContent>
      </>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: (
      <>
        <div className="aspect-video bg-gradient-to-br from-primary-500 to-secondary-500" />
        <div className="p-6">
          <CardHeader>
            <CardTitle>No Padding Card</CardTitle>
            <CardDescription>Perfect for images</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">Use padding='none' for full-bleed images or custom layouts.</p>
          </CardContent>
        </div>
      </>
    ),
  },
};

export const Dashboard: Story = {
  args: {},
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 max-w-7xl">
      <Card variant="sustainability">
        <CardHeader>
          <CardTitle>Carbon Footprint</CardTitle>
          <CardDescription>Current month</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-primary-500">147t</p>
          <p className="text-sm text-green-600 mt-1">↓ 23% vs last month</p>
        </CardContent>
      </Card>

      <Card hoverable>
        <CardHeader>
          <CardTitle>Energy Usage</CardTitle>
          <CardDescription>Real-time monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-gray-900">$2,100</p>
          <p className="text-sm text-gray-600 mt-1">Per tCO₂e saved</p>
        </CardContent>
      </Card>

      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Facilities</CardTitle>
          <CardDescription>Under management</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold text-gray-900">330+</p>
          <p className="text-sm text-gray-600 mt-1">Across 12 states</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'gray' },
  },
};
