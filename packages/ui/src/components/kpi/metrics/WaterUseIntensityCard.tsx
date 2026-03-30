/**
 * WaterUseIntensityCard Component
 *
 * Water Use Intensity KPI card
 * Measures: gallons/sq ft/year
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { Droplets } from 'lucide-react';
import { NormalizedKpiCard } from '../NormalizedKpiCard';
import type { KpiData } from '../../../types/kpi';

export interface WaterUseIntensityCardProps {
  data: KpiData;
  showBenchmark?: boolean;
  showTrend?: boolean;
  showPercentile?: boolean;
  onClick?: () => void;
  className?: string;
}

export function WaterUseIntensityCard({
  data,
  showBenchmark = true,
  showTrend = true,
  showPercentile = true,
  onClick,
  className,
}: WaterUseIntensityCardProps) {
  return (
    <NormalizedKpiCard
      data={data}
      icon={Droplets}
      subtitle="Water Use per Square Foot"
      showBenchmark={showBenchmark}
      showTrend={showTrend}
      showPercentile={showPercentile}
      showDataQuality
      onClick={onClick}
      className={className}
    />
  );
}

WaterUseIntensityCard.displayName = 'WaterUseIntensityCard';

export default WaterUseIntensityCard;
