/**
 * Scope1IntensityCard Component
 *
 * Scope 1 Emissions Intensity KPI card
 * Measures: MT CO2e/sq ft/year (direct emissions)
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { Flame } from 'lucide-react';
import { NormalizedKpiCard } from '../NormalizedKpiCard';
import type { KpiData } from '../../../types/kpi';

export interface Scope1IntensityCardProps {
  data: KpiData;
  showBenchmark?: boolean;
  showTrend?: boolean;
  showPercentile?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Scope1IntensityCard({
  data,
  showBenchmark = true,
  showTrend = true,
  showPercentile = true,
  onClick,
  className,
}: Scope1IntensityCardProps) {
  return (
    <NormalizedKpiCard
      data={data}
      icon={Flame}
      subtitle="Direct Emissions (Natural Gas, Generators)"
      badge="Scope 1"
      showBenchmark={showBenchmark}
      showTrend={showTrend}
      showPercentile={showPercentile}
      showDataQuality
      onClick={onClick}
      className={className}
    />
  );
}

Scope1IntensityCard.displayName = 'Scope1IntensityCard';

export default Scope1IntensityCard;
