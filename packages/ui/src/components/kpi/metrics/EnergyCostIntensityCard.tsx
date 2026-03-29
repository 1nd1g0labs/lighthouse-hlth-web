/**
 * EnergyCostIntensityCard Component
 *
 * Energy Cost Intensity KPI card
 * Measures: $/sq ft/year
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { DollarSign } from 'lucide-react';
import { NormalizedKpiCard } from '../NormalizedKpiCard';
import type { KpiData } from '../../../types/kpi';

export interface EnergyCostIntensityCardProps {
  data: KpiData;
  showBenchmark?: boolean;
  showTrend?: boolean;
  onClick?: () => void;
  className?: string;
}

export function EnergyCostIntensityCard({
  data,
  showBenchmark = true,
  showTrend = true,
  onClick,
  className,
}: EnergyCostIntensityCardProps) {
  return (
    <NormalizedKpiCard
      data={data}
      icon={DollarSign}
      subtitle="Energy Cost per Square Foot"
      showBenchmark={showBenchmark}
      showTrend={showTrend}
      showDataQuality
      onClick={onClick}
      className={className}
    />
  );
}

EnergyCostIntensityCard.displayName = 'EnergyCostIntensityCard';

export default EnergyCostIntensityCard;
