/**
 * KpiValue Component
 *
 * Large value display with units and optional data quality indicator
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { cn } from '../../utils/cn';
import { formatKpiValue } from '../../types/kpi';
import { DataQualityIndicator } from './DataQualityIndicator';
import type { KpiValueProps } from '../../types/kpi';

const performanceTextColors = {
  excellent: 'text-emerald-700 dark:text-emerald-400',
  good: 'text-teal-700 dark:text-teal-400',
  fair: 'text-blue-700 dark:text-blue-400',
  poor: 'text-red-700 dark:text-red-400',
  neutral: 'text-slate-900 dark:text-slate-100',
};

export function KpiValue({
  value,
  unit,
  performance,
  dataQuality,
  showDataQuality = false,
  className,
}: KpiValueProps) {
  const formattedValue = formatKpiValue(value, unit);

  // Determine if unit should be prefix or suffix
  const isPrefix = unit === '$' || unit.startsWith('$');
  const displayUnit = unit === '$' ? '$' : unit;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-baseline gap-1.5">
        {isPrefix && (
          <span className={cn('text-2xl font-semibold', performanceTextColors[performance])}>
            {displayUnit}
          </span>
        )}
        <span
          className={cn('text-4xl font-bold tracking-tight', performanceTextColors[performance])}
          aria-label={`${formattedValue} ${displayUnit}`}
        >
          {formattedValue}
        </span>
        {!isPrefix && (
          <span className={cn('text-2xl font-semibold', performanceTextColors[performance])}>
            {displayUnit}
          </span>
        )}
      </div>
      {showDataQuality && <DataQualityIndicator quality={dataQuality} showLabel={false} />}
    </div>
  );
}

KpiValue.displayName = 'KpiValue';

export default KpiValue;
