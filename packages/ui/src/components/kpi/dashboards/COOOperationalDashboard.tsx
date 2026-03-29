/**
 * COOOperationalDashboard Component
 *
 * Operations-focused dashboard for COOs
 * Emphasizes efficiency, costs, and actionable metrics
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { Grid } from '../../Grid';
import {
  SiteEUICard,
  EnergyCostIntensityCard,
  WaterUseIntensityCard,
  TotalWasteIntensityCard,
  RMWRatioCard,
  DiversionRateCard,
} from '../metrics';
import type { KpiData } from '../../../types/kpi';

export interface COOOperationalDashboardProps {
  siteEUIData: KpiData;
  energyCostData: KpiData;
  waterData: KpiData;
  wasteData: KpiData;
  rmwData: KpiData;
  diversionData: KpiData;
  onMetricClick?: (metricId: string) => void;
  className?: string;
}

export function COOOperationalDashboard({
  siteEUIData,
  energyCostData,
  waterData,
  wasteData,
  rmwData,
  diversionData,
  onMetricClick,
  className,
}: COOOperationalDashboardProps) {
  return (
    <div className={className}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Operational Efficiency Dashboard
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Key metrics for operational excellence and cost management
        </p>
      </div>

      {/* Energy Efficiency */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-200">Energy Efficiency</h3>
        <Grid cols={{ base: 1, md: 2 }} gap={6}>
          <SiteEUICard
            data={siteEUIData}
            onClick={() => onMetricClick?.(siteEUIData.id)}
          />
          <EnergyCostIntensityCard
            data={energyCostData}
            onClick={() => onMetricClick?.(energyCostData.id)}
          />
        </Grid>
      </div>

      {/* Resource Management */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-200">Resource Management</h3>
        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
          <WaterUseIntensityCard
            data={waterData}
            onClick={() => onMetricClick?.(waterData.id)}
          />
          <TotalWasteIntensityCard
            data={wasteData}
            onClick={() => onMetricClick?.(wasteData.id)}
          />
          <DiversionRateCard
            data={diversionData}
            onClick={() => onMetricClick?.(diversionData.id)}
          />
        </Grid>
      </div>

      {/* Compliance Risk */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-slate-200">Compliance & Risk</h3>
        <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
          <RMWRatioCard
            data={rmwData}
            onClick={() => onMetricClick?.(rmwData.id)}
          />
        </Grid>
      </div>
    </div>
  );
}

COOOperationalDashboard.displayName = 'COOOperationalDashboard';

export default COOOperationalDashboard;
