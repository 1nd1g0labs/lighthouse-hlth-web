/**
 * DiversionRateCard Component
 *
 * Waste Diversion Rate KPI card
 * Measures: % of waste recycled/composted
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { Recycle } from 'lucide-react';
import { NormalizedKpiCard } from '../NormalizedKpiCard';
import type { KpiData } from '../../../types/kpi';

export interface DiversionRateCardProps {
  data: KpiData;
  showBenchmark?: boolean;
  showTrend?: boolean;
  showPercentile?: boolean;
  onClick?: () => void;
  className?: string;
}

export function DiversionRateCard({
  data,
  showBenchmark = true,
  showTrend = true,
  showPercentile = true,
  onClick,
  className,
}: DiversionRateCardProps) {
  return (
    <NormalizedKpiCard
      data={data}
      icon={Recycle}
      subtitle="Recycling & Composting Rate"
      showBenchmark={showBenchmark}
      showTrend={showTrend}
      showPercentile={showPercentile}
      showDataQuality
      onClick={onClick}
      className={className}
    />
  );
}

DiversionRateCard.displayName = 'DiversionRateCard';

export default DiversionRateCard;
