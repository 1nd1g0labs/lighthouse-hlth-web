/**
 * CFOSustainabilityDashboard Component
 *
 * Financial-focused sustainability dashboard for CFOs
 * Emphasizes cost savings, ROI, and compliance
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { Grid } from '../../Grid';
import {
  EnergyCostIntensityCard,
  SustainabilitySavingsPerBedCard,
  CarbonIntensityEnergyCard,
  HB21286ComplianceCard,
  TotalWasteIntensityCard,
  DiversionRateCard,
} from '../metrics';
import type { KpiData } from '../../../types/kpi';

export interface CFOSustainabilityDashboardProps {
  energyCostData: KpiData;
  savingsPerBedData: KpiData;
  carbonIntensityData: KpiData;
  hb21286Data: KpiData;
  wasteIntensityData: KpiData;
  diversionRateData: KpiData;
  onMetricClick?: (metricId: string) => void;
  className?: string;
}

export function CFOSustainabilityDashboard({
  energyCostData,
  savingsPerBedData,
  carbonIntensityData,
  hb21286Data,
  wasteIntensityData,
  diversionRateData,
  onMetricClick,
  className,
}: CFOSustainabilityDashboardProps) {
  return (
    <div className={className}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Financial & Compliance Dashboard
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Key sustainability metrics impacting margin and regulatory compliance
        </p>
      </div>

      <Grid cols={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {/* Top priority: Financial metrics */}
        <SustainabilitySavingsPerBedCard
          data={savingsPerBedData}
          onClick={() => onMetricClick?.(savingsPerBedData.id)}
        />
        <EnergyCostIntensityCard
          data={energyCostData}
          onClick={() => onMetricClick?.(energyCostData.id)}
        />

        {/* Compliance tracking */}
        <HB21286ComplianceCard
          data={hb21286Data}
          onClick={() => onMetricClick?.(hb21286Data.id)}
        />
        <CarbonIntensityEnergyCard
          data={carbonIntensityData}
          onClick={() => onMetricClick?.(carbonIntensityData.id)}
        />

        {/* Operational efficiency */}
        <TotalWasteIntensityCard
          data={wasteIntensityData}
          onClick={() => onMetricClick?.(wasteIntensityData.id)}
        />
        <DiversionRateCard
          data={diversionRateData}
          onClick={() => onMetricClick?.(diversionRateData.id)}
        />
      </Grid>
    </div>
  );
}

CFOSustainabilityDashboard.displayName = 'CFOSustainabilityDashboard';

export default CFOSustainabilityDashboard;
