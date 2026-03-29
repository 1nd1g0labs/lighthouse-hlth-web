import type { Meta, StoryObj } from '@storybook/react';
import { ConsumptionTrendsChart, type EmissionTrendDataPoint } from './ConsumptionTrendsChart';

const meta = {
  title: 'Operator/ConsumptionTrendsChart',
  component: ConsumptionTrendsChart,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConsumptionTrendsChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockData: EmissionTrendDataPoint[] = [
  { date: '2024-01', scope1: 1250, scope2: 3420, scope3: 8750, benchmark: 4200 },
  { date: '2024-02', scope1: 1180, scope2: 3350, scope3: 8620, benchmark: 4200 },
  { date: '2024-03', scope1: 1220, scope2: 3280, scope3: 8450, benchmark: 4200 },
  { date: '2024-04', scope1: 1100, scope2: 3100, scope3: 8200, benchmark: 4200 },
  { date: '2024-05', scope1: 1050, scope2: 2950, scope3: 7950, benchmark: 4200 },
  { date: '2024-06', scope1: 980, scope2: 2850, scope3: 7800, benchmark: 4200 },
  { date: '2024-07', scope1: 950, scope2: 2780, scope3: 7650, benchmark: 4200 },
  { date: '2024-08', scope1: 920, scope2: 2720, scope3: 7500, benchmark: 4200 },
  { date: '2024-09', scope1: 900, scope2: 2680, scope3: 7400, benchmark: 4200 },
  { date: '2024-10', scope1: 880, scope2: 2650, scope3: 7300, benchmark: 4200 },
  { date: '2024-11', scope1: 850, scope2: 2600, scope3: 7200, benchmark: 4200 },
  { date: '2024-12', scope1: 820, scope2: 2550, scope3: 7100, benchmark: 4200 },
];

export const Default: Story = {
  args: {
    data: mockData,
    onExport: (data) => console.log('Export:', data),
    onTimeRangeChange: (range) => console.log('Time range:', range),
    onNormalizationChange: (mode) => console.log('Normalization:', mode),
  },
};

export const WithoutBenchmark: Story = {
  args: {
    data: mockData,
    showBenchmark: false,
  },
};

export const Scope1Only: Story = {
  args: {
    data: mockData,
    showScope1: true,
    showScope2: false,
    showScope3: false,
    showBenchmark: false,
  },
};

export const SmallSize: Story = {
  args: {
    data: mockData,
    size: 'sm',
  },
};

export const ExtraLargeSize: Story = {
  args: {
    data: mockData,
    size: 'xl',
  },
};

export const Loading: Story = {
  args: {
    data: [],
    isLoading: true,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
  },
};
