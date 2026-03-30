/**
 * CarbonIntensityEnergyCard Component
 *
 * Carbon Intensity (Energy) KPI card with HB 21-1286 compliance
 * Measures: MT CO2e/sq ft/year
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { Cloud } from 'lucide-react';
import { NormalizedKpiCard } from '../NormalizedKpiCard';
import type { KpiData } from '../../../types/kpi';

export interface CarbonIntensityEnergyCardProps {
  data: KpiData;
  showBenchmark?: boolean;
  showTrend?: boolean;
  showPercentile?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CarbonIntensityEnergyCard({
  data,
  showBenchmark = true,
  showTrend = true,
  showPercentile = true,
  onClick,
  className,
}: CarbonIntensityEnergyCardProps) {
  return (
    <NormalizedKpiCard
      data={data}
      icon={Cloud}
      subtitle="GHG Emissions Intensity"
      badge="HB 21-1286 Tracked"
      showBenchmark={showBenchmark}
      showTrend={showTrend}
      showPercentile={showPercentile}
      showDataQuality
      onClick={onClick}
      className={className}
    />
  );
}

CarbonIntensityEnergyCard.displayName = 'CarbonIntensityEnergyCard';

export default CarbonIntensityEnergyCard;
