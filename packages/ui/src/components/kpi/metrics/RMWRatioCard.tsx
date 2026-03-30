/**
 * RMWRatioCard Component
 *
 * Regulated Medical Waste (RMW) Ratio KPI card
 * Measures: % of total waste
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { AlertTriangle } from 'lucide-react';
import { NormalizedKpiCard } from '../NormalizedKpiCard';
import type { KpiData } from '../../../types/kpi';

export interface RMWRatioCardProps {
  data: KpiData;
  showBenchmark?: boolean;
  showTrend?: boolean;
  showPercentile?: boolean;
  onClick?: () => void;
  className?: string;
}

export function RMWRatioCard({
  data,
  showBenchmark = true,
  showTrend = true,
  showPercentile = true,
  onClick,
  className,
}: RMWRatioCardProps) {
  return (
    <NormalizedKpiCard
      data={data}
      icon={AlertTriangle}
      subtitle="Regulated Medical Waste Percentage"
      showBenchmark={showBenchmark}
      showTrend={showTrend}
      showPercentile={showPercentile}
      showDataQuality
      onClick={onClick}
      className={className}
    />
  );
}

RMWRatioCard.displayName = 'RMWRatioCard';

export default RMWRatioCard;
