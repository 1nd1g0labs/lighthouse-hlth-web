/**
 * SustainabilityDirectorDashboard Component
 *
 * Comprehensive dashboard for Sustainability Directors
 * All metrics with Practice Greenhealth benchmarking
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { Grid } from '../../Grid';
import {
  SiteEUICard,
  CarbonIntensityEnergyCard,
  Scope1IntensityCard,
  Scope2IntensityCard,
  WaterUseIntensityCard,
  TotalWasteIntensityCard,
  RMWRatioCard,
  DiversionRateCard,
  HB21286ComplianceCard,
} from '../metrics';
import type { KpiData } from '../../../types/kpi';

export interface SustainabilityDirectorDashboardProps {
  siteEUIData: KpiData;
  carbonIntensityData: KpiData;
  scope1Data: KpiData;
  scope2Data: KpiData;
  waterData: KpiData;
  wasteData: KpiData;
  rmwData: KpiData;
  diversionData: KpiData;
  hb21286Data: KpiData;
  onMetricClick?: (metricId: string) => void;
  className?: string;
}

export function SustainabilityDirectorDashboard({
  siteEUIData,
  carbonIntensityData,
  scope1Data,
  scope2Data,
  waterData,
  wasteData,
  rmwData,
  diversionData,
  hb21286Data,
  onMetricClick,
  className,
}: SustainabilityDirectorDashboardProps) {
  return (
    <div className={className}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Sustainability Performance Dashboard
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Comprehensive environmental metrics with Practice Greenhealth benchmarking
        </p>
      </div>

      {/* Energy Section */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-200">Energy & Emissions</h3>
        <Grid cols={{ base: 1, md: 2, lg: 4 }} gap={6}>
          <SiteEUICard
            data={siteEUIData}
            onClick={() => onMetricClick?.(siteEUIData.id)}
          />
          <CarbonIntensityEnergyCard
            data={carbonIntensityData}
            onClick={() => onMetricClick?.(carbonIntensityData.id)}
          />
          <Scope1IntensityCard
            data={scope1Data}
            onClick={() => onMetricClick?.(scope1Data.id)}
          />
          <Scope2IntensityCard
            data={scope2Data}
            onClick={() => onMetricClick?.(scope2Data.id)}
          />
        </Grid>
      </div>

      {/* Water Section */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-200">Water</h3>
        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
          <WaterUseIntensityCard
            data={waterData}
            onClick={() => onMetricClick?.(waterData.id)}
          />
        </Grid>
      </div>

      {/* Waste Section */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-200">Waste Management</h3>
        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
          <TotalWasteIntensityCard
            data={wasteData}
            onClick={() => onMetricClick?.(wasteData.id)}
          />
          <RMWRatioCard
            data={rmwData}
            onClick={() => onMetricClick?.(rmwData.id)}
          />
          <DiversionRateCard
            data={diversionData}
            onClick={() => onMetricClick?.(diversionData.id)}
          />
        </Grid>
      </div>

      {/* Compliance Section */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-200">Regulatory Compliance</h3>
        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
          <HB21286ComplianceCard
            data={hb21286Data}
            onClick={() => onMetricClick?.(hb21286Data.id)}
          />
        </Grid>
      </div>
    </div>
  );
}

SustainabilityDirectorDashboard.displayName = 'SustainabilityDirectorDashboard';

export default SustainabilityDirectorDashboard;
