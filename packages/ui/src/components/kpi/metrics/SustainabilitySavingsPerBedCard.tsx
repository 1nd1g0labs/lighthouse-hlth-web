/**
 * SustainabilitySavingsPerBedCard Component
 *
 * Sustainability Savings per Bed KPI card
 * Measures: $/licensed bed/year
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { TrendingUp } from 'lucide-react';
import { NormalizedKpiCard } from '../NormalizedKpiCard';
import type { KpiData } from '../../../types/kpi';

export interface SustainabilitySavingsPerBedCardProps {
  data: KpiData;
  showBenchmark?: boolean;
  showTrend?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SustainabilitySavingsPerBedCard({
  data,
  showBenchmark = true,
  showTrend = true,
  onClick,
  className,
}: SustainabilitySavingsPerBedCardProps) {
  return (
    <NormalizedKpiCard
      data={data}
      icon={TrendingUp}
      subtitle="Annual Savings per Licensed Bed"
      badge="Financial Impact"
      showBenchmark={showBenchmark}
      showTrend={showTrend}
      showDataQuality
      onClick={onClick}
      className={className}
    />
  );
}

SustainabilitySavingsPerBedCard.displayName = 'SustainabilitySavingsPerBedCard';

export default SustainabilitySavingsPerBedCard;
