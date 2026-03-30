/**
 * NormalizedKpiCard Stories
 *
 * Interactive documentation for KPI card components
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import type { Meta, StoryObj } from '@storybook/react';
import { NormalizedKpiCard } from './NormalizedKpiCard';
import { Zap, Droplets, Trash2, Cloud } from 'lucide-react';
import type { KpiData } from '../../types/kpi';

const meta: Meta<typeof NormalizedKpiCard> = {
  title: 'KPI/NormalizedKpiCard',
  component: NormalizedKpiCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Production-ready KPI card with benchmarking, trends, and data quality indicators. Designed for healthcare sustainability metrics with WCAG 2.1 AA compliance.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NormalizedKpiCard>;

// Sample trend data
const sampleTrendData = [
  { period: 'Jan', value: 245 },
  { period: 'Feb', value: 238 },
  { period: 'Mar', value: 232 },
  { period: 'Apr', value: 228 },
  { period: 'May', value: 225 },
  { period: 'Jun', value: 220 },
  { period: 'Jul', value: 218 },
];

// Excellent performance example
const excellentKpiData: KpiData = {
  id: 'site-eui-1',
  name: 'Site EUI',
  category: 'energy',
  value: 218,
  unit: 'kBtu/sq ft/yr',
  performance: 'excellent',
  trend: 'down',
  trendData: sampleTrendData,
  benchmarks: [
    {
      type: 'benchmark',
      label: 'National Median',
      value: 256,
      difference: -38,
      percentageDifference: -14.8,
    },
    {
      type: 'target',
      label: '2026 Target',
      value: 225,
      difference: -7,
      percentageDifference: -3.1,
    },
  ],
  percentile: {
    value: 92,
    label: 'Top 10%',
    tier: 'top-10',
  },
  dataQuality: 'high',
  lastUpdated: new Date(),
  description: 'Energy efficiency normalized by building area',
};

// Poor performance example
const poorKpiData: KpiData = {
  id: 'waste-intensity-1',
  name: 'Total Waste Intensity',
  category: 'waste',
  value: 28.5,
  unit: 'lbs/APD',
  performance: 'poor',
  trend: 'up',
  trendData: [
    { period: 'Jan', value: 24.2 },
    { period: 'Feb', value: 25.1 },
    { period: 'Mar', value: 26.3 },
    { period: 'Apr', value: 27.2 },
    { period: 'May', value: 27.8 },
    { period: 'Jun', value: 28.1 },
    { period: 'Jul', value: 28.5 },
  ],
  benchmarks: [
    {
      type: 'benchmark',
      label: 'National Median',
      value: 21.5,
      difference: 7.0,
      percentageDifference: 32.6,
    },
    {
      type: 'target',
      label: 'Reduction Target',
      value: 20.0,
      difference: 8.5,
      percentageDifference: 42.5,
    },
  ],
  dataQuality: 'medium',
  lastUpdated: new Date(),
  description: 'Waste generation per adjusted patient day',
};

// Financial metric example
const financialKpiData: KpiData = {
  id: 'savings-per-bed-1',
  name: 'Sustainability Savings',
  category: 'financial',
  value: 1250,
  unit: '$/bed/yr',
  performance: 'good',
  trend: 'up',
  trendData: [
    { period: 'Q1', value: 980 },
    { period: 'Q2', value: 1050 },
    { period: 'Q3', value: 1180 },
    { period: 'Q4', value: 1250 },
  ],
  benchmarks: [
    {
      type: 'benchmark',
      label: 'Peer Average',
      value: 1100,
      difference: 150,
      percentageDifference: 13.6,
    },
  ],
  dataQuality: 'high',
  lastUpdated: new Date(),
  description: 'Annual sustainability cost savings per licensed bed',
};

export const Excellent: Story = {
  args: {
    data: excellentKpiData,
    icon: Zap,
    subtitle: 'Energy Use Intensity',
    badge: 'Energy Star Tracked',
    showBenchmark: true,
    showTrend: true,
    showPercentile: true,
    showDataQuality: true,
  },
};

export const Poor: Story = {
  args: {
    data: poorKpiData,
    icon: Trash2,
    subtitle: 'Waste per Adjusted Patient Day',
    showBenchmark: true,
    showTrend: true,
    showDataQuality: true,
  },
};

export const Financial: Story = {
  args: {
    data: financialKpiData,
    icon: Droplets,
    subtitle: 'Annual Savings per Licensed Bed',
    badge: 'Financial Impact',
    showBenchmark: true,
    showTrend: true,
    showDataQuality: true,
  },
};

export const Clickable: Story = {
  args: {
    data: excellentKpiData,
    icon: Zap,
    subtitle: 'Energy Use Intensity',
    showBenchmark: true,
    showTrend: true,
    showPercentile: true,
    onClick: () => alert('KPI card clicked! Navigate to detail view.'),
  },
};

export const MinimalConfiguration: Story = {
  args: {
    data: {
      ...excellentKpiData,
      benchmarks: [],
      percentile: undefined,
    },
    showBenchmark: false,
    showTrend: false,
    showPercentile: false,
    showDataQuality: false,
  },
};

export const WithBenchmarkOnly: Story = {
  args: {
    data: excellentKpiData,
    icon: Cloud,
    subtitle: 'GHG Emissions Intensity',
    badge: 'HB 21-1286',
    showBenchmark: true,
    showTrend: false,
    showPercentile: false,
    showDataQuality: true,
  },
};

export const LowDataQuality: Story = {
  args: {
    data: {
      ...excellentKpiData,
      dataQuality: 'low',
    },
    icon: Zap,
    subtitle: 'Estimated values - awaiting meter data',
    showBenchmark: true,
    showTrend: true,
    showDataQuality: true,
  },
};

export const AllPerformanceVariants: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {(['excellent', 'good', 'fair', 'poor', 'neutral'] as const).map((performance) => (
        <NormalizedKpiCard
          key={performance}
          data={{
            ...excellentKpiData,
            id: `perf-${performance}`,
            performance,
            name: `${performance.charAt(0).toUpperCase() + performance.slice(1)} Performance`,
          }}
          icon={Zap}
          subtitle={`${performance} variant example`}
          showBenchmark={true}
          showTrend={true}
        />
      ))}
    </div>
  ),
};
