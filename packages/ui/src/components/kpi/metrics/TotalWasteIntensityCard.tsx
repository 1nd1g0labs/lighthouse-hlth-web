/**
 * TotalWasteIntensityCard Component
 *
 * Total Waste Intensity KPI card
 * Measures: lbs/adjusted patient day (APD)
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { Trash2 } from 'lucide-react';
import { NormalizedKpiCard } from '../NormalizedKpiCard';
import type { KpiData } from '../../../types/kpi';

export interface TotalWasteIntensityCardProps {
  data: KpiData;
  showBenchmark?: boolean;
  showTrend?: boolean;
  showPercentile?: boolean;
  onClick?: () => void;
  className?: string;
}

export function TotalWasteIntensityCard({
  data,
  showBenchmark = true,
  showTrend = true,
  showPercentile = true,
  onClick,
  className,
}: TotalWasteIntensityCardProps) {
  return (
    <NormalizedKpiCard
      data={data}
      icon={Trash2}
      subtitle="Waste per Adjusted Patient Day"
      showBenchmark={showBenchmark}
      showTrend={showTrend}
      showPercentile={showPercentile}
      showDataQuality
      onClick={onClick}
      className={className}
    />
  );
}

TotalWasteIntensityCard.displayName = 'TotalWasteIntensityCard';

export default TotalWasteIntensityCard;
