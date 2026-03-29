/**
 * KpiComparison Component
 *
 * Displays benchmark comparisons with trend indicators
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { KpiComparisonProps } from '../../types/kpi';

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

const trendColors = {
  up: 'text-red-600 dark:text-red-400',
  down: 'text-emerald-600 dark:text-emerald-400',
  neutral: 'text-slate-600 dark:text-slate-400',
};

export function KpiComparison({
  benchmarks,
  trend,
  maxComparisons = 2,
  className,
}: KpiComparisonProps) {
  const TrendIcon = trendIcons[trend];
  const displayBenchmarks = benchmarks.slice(0, maxComparisons);

  if (displayBenchmarks.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-2', className)}>
      {/* Trend indicator */}
      <div className={cn('flex items-center gap-1.5 text-sm font-medium', trendColors[trend])}>
        <TrendIcon size={16} aria-hidden="true" />
        <span className="capitalize">
          {trend === 'neutral' ? 'Stable' : `Trending ${trend}`}
        </span>
      </div>

      {/* Benchmark comparisons */}
      <div className="space-y-1.5">
        {displayBenchmarks.map((benchmark, index) => {
          const isPositive = benchmark.difference < 0; // Lower is better for most sustainability metrics
          const sign = benchmark.difference > 0 ? '+' : '';

          return (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">{benchmark.label}</span>
              <span
                className={cn(
                  'font-medium',
                  isPositive
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-red-600 dark:text-red-400'
                )}
              >
                {sign}
                {benchmark.percentageDifference.toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

KpiComparison.displayName = 'KpiComparison';

export default KpiComparison;
