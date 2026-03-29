/**
 * SiteEUICard Component
 *
 * Site Energy Use Intensity (EUI) KPI card
 * Measures: kBtu/sq ft/year
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { Zap } from 'lucide-react';
import { NormalizedKpiCard } from '../NormalizedKpiCard';
import type { KpiData } from '../../../types/kpi';

export interface SiteEUICardProps {
  data: KpiData;
  showBenchmark?: boolean;
  showTrend?: boolean;
  showPercentile?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SiteEUICard({
  data,
  showBenchmark = true,
  showTrend = true,
  showPercentile = true,
  onClick,
  className,
}: SiteEUICardProps) {
  return (
    <NormalizedKpiCard
      data={data}
      icon={Zap}
      subtitle="Energy Use Intensity"
      badge="Energy Star Tracked"
      showBenchmark={showBenchmark}
      showTrend={showTrend}
      showPercentile={showPercentile}
      showDataQuality
      onClick={onClick}
      className={className}
    />
  );
}

SiteEUICard.displayName = 'SiteEUICard';

export default SiteEUICard;
