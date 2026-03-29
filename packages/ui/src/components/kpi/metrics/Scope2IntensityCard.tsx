/**
 * Scope2IntensityCard Component
 *
 * Scope 2 Emissions Intensity KPI card
 * Measures: MT CO2e/sq ft/year (purchased electricity)
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { Zap } from 'lucide-react';
import { NormalizedKpiCard } from '../NormalizedKpiCard';
import type { KpiData } from '../../../types/kpi';

export interface Scope2IntensityCardProps {
  data: KpiData;
  showBenchmark?: boolean;
  showTrend?: boolean;
  showPercentile?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Scope2IntensityCard({
  data,
  showBenchmark = true,
  showTrend = true,
  showPercentile = true,
  onClick,
  className,
}: Scope2IntensityCardProps) {
  return (
    <NormalizedKpiCard
      data={data}
      icon={Zap}
      subtitle="Purchased Electricity Emissions"
      badge="Scope 2"
      showBenchmark={showBenchmark}
      showTrend={showTrend}
      showPercentile={showPercentile}
      showDataQuality
      onClick={onClick}
      className={className}
    />
  );
}

Scope2IntensityCard.displayName = 'Scope2IntensityCard';

export default Scope2IntensityCard;
