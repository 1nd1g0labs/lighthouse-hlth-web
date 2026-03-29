/**
 * HB21286ComplianceCard Component
 *
 * Colorado HB 21-1286 Compliance KPI card
 * Tracks progress toward 7% (2026) and 20% (2030) reduction targets
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { Target } from 'lucide-react';
import { NormalizedKpiCard } from '../NormalizedKpiCard';
import type { KpiData } from '../../../types/kpi';

export interface HB21286ComplianceCardProps {
  data: KpiData;
  showBenchmark?: boolean;
  showTrend?: boolean;
  onClick?: () => void;
  className?: string;
}

export function HB21286ComplianceCard({
  data,
  showBenchmark = true,
  showTrend = true,
  onClick,
  className,
}: HB21286ComplianceCardProps) {
  return (
    <NormalizedKpiCard
      data={data}
      icon={Target}
      subtitle="Progress Toward 2026 & 2030 Targets"
      badge="HB 21-1286"
      showBenchmark={showBenchmark}
      showTrend={showTrend}
      showDataQuality
      onClick={onClick}
      className={className}
    />
  );
}

HB21286ComplianceCard.displayName = 'HB21286ComplianceCard';

export default HB21286ComplianceCard;
