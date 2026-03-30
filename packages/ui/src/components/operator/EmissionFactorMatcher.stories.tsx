import type { Meta, StoryObj } from '@storybook/react';
import { EmissionFactorMatcher, type EmissionFactorMatch } from './EmissionFactorMatcher';

const meta = {
  title: 'Operator/EmissionFactorMatcher',
  component: EmissionFactorMatcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmissionFactorMatcher>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockFactors: EmissionFactorMatch[] = [
  {
    id: 'ef-1',
    name: 'Natural Gas - Stationary Combustion',
    category: 'Scope 1 - Direct Emissions',
    confidence: 92,
    unit: 'therm',
    usageCount: 145,
    lastUsed: '2024-11-15',
    explanation: 'Based on description matching "Natural Gas" and usage patterns in similar facilities',
    factor: 5.3,
  },
  {
    id: 'ef-2',
    name: 'Electricity - Grid Purchase (Colorado)',
    category: 'Scope 2 - Indirect Emissions',
    confidence: 88,
    unit: 'kWh',
    usageCount: 230,
    lastUsed: '2024-11-14',
    explanation: 'Regional grid factor for Colorado based on EPA eGRID data',
    factor: 0.52,
  },
  {
    id: 'ef-3',
    name: 'Medical Supplies - Plastic Products',
    category: 'Scope 3 - Value Chain',
    confidence: 65,
    unit: 'kg',
    usageCount: 78,
    lastUsed: '2024-11-10',
    explanation: 'Life cycle analysis for medical grade plastic products',
    factor: 2.8,
  },
  {
    id: 'ef-4',
    name: 'Diesel - Stationary Combustion',
    category: 'Scope 1 - Direct Emissions',
    confidence: 95,
    unit: 'gallon',
    usageCount: 56,
    lastUsed: '2024-11-12',
    explanation: 'EPA emission factor for diesel fuel combustion',
    factor: 10.2,
  },
];

export const Default: Story = {
  args: {
    factors: mockFactors,
    onSelect: (factor) => console.log('Selected:', factor),
  },
};

export const WithSearch: Story = {
  args: {
    factors: mockFactors,
    searchQuery: 'natural',
    onSearchChange: (query) => console.log('Search:', query),
    onSelect: (factor) => console.log('Selected:', factor),
  },
};

export const ModalVariant: Story = {
  args: {
    factors: mockFactors,
    variant: 'modal',
    onSelect: (factor) => console.log('Selected:', factor),
  },
};

export const NoAuditTrail: Story = {
  args: {
    factors: mockFactors,
    showAuditTrail: false,
    onSelect: (factor) => console.log('Selected:', factor),
  },
};

export const Loading: Story = {
  args: {
    factors: [],
    isLoading: true,
  },
};

export const EmptyState: Story = {
  args: {
    factors: [],
  },
};
