import type { Meta, StoryObj } from '@storybook/react';
import { DataGroomingTable, type LineItem } from './DataGroomingTable';

/**
 * DataGroomingTable is a virtualized table for reviewing and approving
 * emission factor matches with batch operations and keyboard navigation.
 *
 * ## Features
 * - Virtual scrolling for 1000+ rows
 * - Inline emission factor selection
 * - Batch operations (approve/reject multiple)
 * - Keyboard shortcuts: j/k (navigate), Space (select), Enter (approve)
 *
 * ## Accessibility
 * - Full keyboard navigation
 * - Screen reader support
 * - ARIA labels for all actions
 */
const meta = {
  title: 'Operator/DataGroomingTable',
  component: DataGroomingTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Virtualized table for reviewing and approving emission factor matches. Supports inline editing, batch operations, and keyboard navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    density: {
      control: 'select',
      options: ['compact', 'comfortable', 'spacious'],
      description: 'Table density',
    },
  },
} satisfies Meta<typeof DataGroomingTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data
const mockLineItems: LineItem[] = [
  {
    id: '1',
    description: 'Natural Gas - Building A HVAC',
    quantity: 1250,
    unit: 'therms',
    date: '2024-11-01',
    vendor: 'Commonwealth Gas',
    suggestedFactor: {
      id: 'ef-ng-stat',
      name: 'Natural Gas - Stationary Combustion',
      confidence: 92,
      category: 'Scope 1 - Direct Emissions',
    },
    alternativeFactors: [
      {
        id: 'ef-ng-mobile',
        name: 'Natural Gas - Mobile Combustion',
        confidence: 45,
        category: 'Scope 1 - Direct Emissions',
      },
    ],
  },
  {
    id: '2',
    description: 'Electricity - Main Campus',
    quantity: 45000,
    unit: 'kWh',
    date: '2024-11-01',
    vendor: 'Xcel Energy',
    suggestedFactor: {
      id: 'ef-elec-grid',
      name: 'Electricity - Grid Purchase (Colorado)',
      confidence: 88,
      category: 'Scope 2 - Indirect Emissions',
    },
    alternativeFactors: [
      {
        id: 'ef-elec-renewable',
        name: 'Electricity - Renewable Energy',
        confidence: 35,
        category: 'Scope 2 - Indirect Emissions',
      },
    ],
  },
  {
    id: '3',
    description: 'Medical Supplies - IV Sets',
    quantity: 500,
    unit: 'units',
    date: '2024-11-02',
    vendor: 'BD Medical',
    suggestedFactor: {
      id: 'ef-med-plastic',
      name: 'Medical Supplies - Plastic Products',
      confidence: 65,
      category: 'Scope 3 - Value Chain',
    },
    alternativeFactors: [
      {
        id: 'ef-med-disposable',
        name: 'Medical Supplies - Disposable Equipment',
        confidence: 58,
        category: 'Scope 3 - Value Chain',
      },
    ],
  },
  {
    id: '4',
    description: 'Pharmaceuticals - Antibiotics',
    quantity: 150,
    unit: 'kg',
    date: '2024-11-03',
    vendor: 'Cardinal Health',
    suggestedFactor: {
      id: 'ef-pharma-antibiotics',
      name: 'Pharmaceuticals - Antibiotics Production',
      confidence: 42,
      category: 'Scope 3 - Value Chain',
    },
  },
  {
    id: '5',
    description: 'Diesel Fuel - Emergency Generators',
    quantity: 800,
    unit: 'gallons',
    date: '2024-11-05',
    vendor: 'Mountain Fuel',
    suggestedFactor: {
      id: 'ef-diesel-stat',
      name: 'Diesel - Stationary Combustion',
      confidence: 95,
      category: 'Scope 1 - Direct Emissions',
    },
  },
];

/**
 * Default table with sample data
 */
export const Default: Story = {
  args: {
    lineItems: mockLineItems,
    density: 'comfortable',
    onApprove: (itemId, factorId) => console.log('Approved:', itemId, factorId),
    onReject: (itemId) => console.log('Rejected:', itemId),
    onFactorChange: (itemId, factorId) => console.log('Factor changed:', itemId, factorId),
    onBatchApprove: (itemIds) => console.log('Batch approved:', itemIds),
    onBatchReject: (itemIds) => console.log('Batch rejected:', itemIds),
  },
};

/**
 * Compact density for more rows on screen
 */
export const CompactDensity: Story = {
  args: {
    ...Default.args,
    density: 'compact',
  },
};

/**
 * Spacious density for easier reading
 */
export const SpaciousDensity: Story = {
  args: {
    ...Default.args,
    density: 'spacious',
  },
};

/**
 * Empty state when all items are processed
 */
export const EmptyState: Story = {
  args: {
    lineItems: [],
    density: 'comfortable',
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    lineItems: [],
    isLoading: true,
    density: 'comfortable',
  },
};

/**
 * Large dataset (virtualization test)
 */
export const LargeDataset: Story = {
  args: {
    ...Default.args,
    lineItems: Array.from({ length: 100 }, (_, i) => ({
      ...mockLineItems[i % mockLineItems.length],
      id: `item-${i}`,
      description: `${mockLineItems[i % mockLineItems.length].description} - Row ${i + 1}`,
    })),
  },
};

/**
 * Interactive playground
 */
export const Playground: Story = {
  args: {
    ...Default.args,
  },
};
