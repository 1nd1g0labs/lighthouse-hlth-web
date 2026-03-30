/**
 * KPI Dashboard Stories
 *
 * Pre-configured dashboard layouts for different stakeholders
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import type { Meta, StoryObj } from '@storybook/react';
import { CFOSustainabilityDashboard } from './CFOSustainabilityDashboard';
import { SustainabilityDirectorDashboard } from './SustainabilityDirectorDashboard';
import { COOOperationalDashboard } from './COOOperationalDashboard';
import type { KpiData } from '../../../types/kpi';

const meta: Meta = {
  title: 'KPI/Dashboards',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Pre-configured dashboard layouts for CFO, Sustainability Director, and COO personas.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

// Mock data generator
const createMockKpiData = (
  id: string,
  name: string,
  value: number,
  unit: string,
  performance: 'excellent' | 'good' | 'fair' | 'poor' | 'neutral' = 'good'
): KpiData => ({
  id,
  name,
  category: 'energy',
  value,
  unit,
  performance,
  trend: 'down',
  trendData: Array.from({ length: 7 }, (_, i) => ({
    period: `M${i + 1}`,
    value: value + Math.random() * 20 - 10,
  })),
  benchmarks: [
    {
      type: 'benchmark',
      label: 'National Median',
      value: value * 1.15,
      difference: -value * 0.15,
      percentageDifference: -15,
    },
    {
      type: 'target',
      label: 'Target',
      value: value * 0.9,
      difference: value * 0.1,
      percentageDifference: 11,
    },
  ],
  percentile: {
    value: 85,
    label: 'Top 25%',
    tier: 'top-25',
  },
  dataQuality: 'high',
  lastUpdated: new Date(),
  description: `${name} metric`,
});

export const CFODashboard: StoryObj = {
  render: () => (
    <div className="p-8">
      <CFOSustainabilityDashboard
        energyCostData={createMockKpiData('energy-cost', 'Energy Cost Intensity', 3.42, '$/sq ft/yr', 'good')}
        savingsPerBedData={createMockKpiData('savings', 'Sustainability Savings', 1250, '$/bed/yr', 'excellent')}
        carbonIntensityData={createMockKpiData('carbon', 'Carbon Intensity', 0.032, 'MT CO2e/sq ft/yr', 'good')}
        hb21286Data={createMockKpiData('hb21286', 'HB 21-1286 Progress', 12.3, '%', 'excellent')}
        wasteIntensityData={createMockKpiData('waste', 'Total Waste Intensity', 21.5, 'lbs/APD', 'good')}
        diversionRateData={createMockKpiData('diversion', 'Diversion Rate', 34.2, '%', 'fair')}
        onMetricClick={(id) => console.log('Clicked metric:', id)}
      />
    </div>
  ),
};

export const SustainabilityDirectorDashboard: StoryObj = {
  render: () => (
    <div className="p-8">
      <SustainabilityDirectorDashboard
        siteEUIData={createMockKpiData('site-eui', 'Site EUI', 218, 'kBtu/sq ft/yr', 'excellent')}
        carbonIntensityData={createMockKpiData('carbon', 'Carbon Intensity', 0.032, 'MT CO2e/sq ft/yr', 'good')}
        scope1Data={createMockKpiData('scope1', 'Scope 1 Intensity', 0.012, 'MT CO2e/sq ft/yr', 'good')}
        scope2Data={createMockKpiData('scope2', 'Scope 2 Intensity', 0.020, 'MT CO2e/sq ft/yr', 'good')}
        waterData={createMockKpiData('water', 'Water Use Intensity', 42.5, 'gal/sq ft/yr', 'good')}
        wasteData={createMockKpiData('waste', 'Total Waste Intensity', 21.5, 'lbs/APD', 'good')}
        rmwData={createMockKpiData('rmw', 'RMW Ratio', 8.2, '%', 'good')}
        diversionData={createMockKpiData('diversion', 'Diversion Rate', 34.2, '%', 'fair')}
        hb21286Data={createMockKpiData('hb21286', 'HB 21-1286 Progress', 12.3, '%', 'excellent')}
        onMetricClick={(id) => console.log('Clicked metric:', id)}
      />
    </div>
  ),
};

export const COODashboard: StoryObj = {
  render: () => (
    <div className="p-8">
      <COOOperationalDashboard
        siteEUIData={createMockKpiData('site-eui', 'Site EUI', 218, 'kBtu/sq ft/yr', 'excellent')}
        energyCostData={createMockKpiData('energy-cost', 'Energy Cost Intensity', 3.42, '$/sq ft/yr', 'good')}
        waterData={createMockKpiData('water', 'Water Use Intensity', 42.5, 'gal/sq ft/yr', 'good')}
        wasteData={createMockKpiData('waste', 'Total Waste Intensity', 21.5, 'lbs/APD', 'good')}
        rmwData={createMockKpiData('rmw', 'RMW Ratio', 8.2, '%', 'good')}
        diversionData={createMockKpiData('diversion', 'Diversion Rate', 34.2, '%', 'fair')}
        onMetricClick={(id) => console.log('Clicked metric:', id)}
      />
    </div>
  ),
};
