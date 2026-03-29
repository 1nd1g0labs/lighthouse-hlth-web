/**
 * KpiBenchmark Component
 *
 * Progress bar with benchmark/target/median markers
 * Shows current value relative to comparison points
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { useMemo } from 'react';
import { Target, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { KpiBenchmarkProps } from '../../types/kpi';

const performanceColors = {
  excellent: 'bg-emerald-600 dark:bg-emerald-500',
  good: 'bg-teal-600 dark:bg-teal-500',
  fair: 'bg-blue-600 dark:bg-blue-500',
  poor: 'bg-red-600 dark:bg-red-500',
  neutral: 'bg-slate-600 dark:bg-slate-500',
};

export function KpiBenchmark({
  currentValue,
  targetValue,
  medianValue,
  baselineValue,
  unit,
  performance,
  className,
}: KpiBenchmarkProps) {
  const { minValue, maxValue, currentPercent, targetPercent, medianPercent, baselinePercent } = useMemo(() => {
    const values = [currentValue, targetValue];
    if (medianValue !== undefined) values.push(medianValue);
    if (baselineValue !== undefined) values.push(baselineValue);

    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const calculatePercent = (value: number) => ((value - min) / range) * 100;

    return {
      minValue: min,
      maxValue: max,
      currentPercent: calculatePercent(currentValue),
      targetPercent: calculatePercent(targetValue),
      medianPercent: medianValue !== undefined ? calculatePercent(medianValue) : null,
      baselinePercent: baselineValue !== undefined ? calculatePercent(baselineValue) : null,
    };
  }, [currentValue, targetValue, medianValue, baselineValue]);

  const formatValue = (value: number) => {
    if (unit === '%') return `${value.toFixed(1)}%`;
    if (unit.startsWith('$')) return `$${value.toLocaleString()}`;
    return `${value.toFixed(1)} ${unit}`;
  };

  return (
    <div className={cn('space-y-2', className)}>
      {/* Progress bar */}
      <div className="relative h-3 w-full rounded-full bg-slate-200 dark:bg-slate-700">
        {/* Baseline marker (if provided) */}
        {baselinePercent !== null && (
          <div
            className="absolute top-0 h-full w-1 bg-slate-400 dark:bg-slate-500"
            style={{ left: `${baselinePercent}%` }}
            title={`Baseline: ${formatValue(baselineValue!)}`}
          />
        )}

        {/* Current value progress */}
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            performanceColors[performance]
          )}
          style={{ width: `${currentPercent}%` }}
          role="progressbar"
          aria-valuenow={currentValue}
          aria-valuemin={minValue}
          aria-valuemax={maxValue}
          aria-label={`Current value: ${formatValue(currentValue)}`}
        />

        {/* Median marker (if provided) */}
        {medianPercent !== null && (
          <div
            className="absolute top-0 flex h-full flex-col items-center"
            style={{ left: `${medianPercent}%` }}
            title={`Median: ${formatValue(medianValue!)}`}
          >
            <div className="h-full w-0.5 bg-amber-500 dark:bg-amber-400" />
            <TrendingDown
              size={12}
              className="absolute -top-4 text-amber-600 dark:text-amber-400"
            />
          </div>
        )}

        {/* Target marker */}
        <div
          className="absolute top-0 flex h-full flex-col items-center"
          style={{ left: `${targetPercent}%` }}
          title={`Target: ${formatValue(targetValue)}`}
        >
          <div className="h-full w-0.5 bg-emerald-600 dark:bg-emerald-400" />
          <Target
            size={12}
            className="absolute -top-4 text-emerald-600 dark:text-emerald-400"
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <div className={cn('h-2 w-2 rounded-full', performanceColors[performance])} />
          <span>Current: {formatValue(currentValue)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Target size={12} className="text-emerald-600 dark:text-emerald-400" />
          <span>Target: {formatValue(targetValue)}</span>
        </div>
        {medianValue !== undefined && (
          <div className="flex items-center gap-1.5">
            <TrendingDown size={12} className="text-amber-600 dark:text-amber-400" />
            <span>Median: {formatValue(medianValue)}</span>
          </div>
        )}
        {baselineValue !== undefined && (
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-0.5 bg-slate-400" />
            <span>Baseline: {formatValue(baselineValue)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

KpiBenchmark.displayName = 'KpiBenchmark';

export default KpiBenchmark;
