/**
 * NormalizedKpiCard Component
 *
 * Production-ready KPI card with benchmarking, trends, and data quality indicators
 * Designed for healthcare sustainability metrics with WCAG 2.1 AA compliance
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Card } from '../Card';
import { KpiHeader } from './KpiHeader';
import { KpiValue } from './KpiValue';
import { KpiComparison } from './KpiComparison';
import { KpiTrend } from './KpiTrend';
import { KpiBenchmark } from './KpiBenchmark';
import { PercentileBadge } from './PercentileBadge';
import type { NormalizedKpiCardProps } from '../../types/kpi';

const kpiCardVariants = cva(
  'transition-all duration-200',
  {
    variants: {
      performance: {
        excellent: 'border-l-4 border-l-emerald-600 dark:border-l-emerald-500',
        good: 'border-l-4 border-l-teal-600 dark:border-l-teal-500',
        fair: 'border-l-4 border-l-blue-600 dark:border-l-blue-500',
        poor: 'border-l-4 border-l-red-600 dark:border-l-red-500',
        neutral: 'border-l-4 border-l-slate-400 dark:border-l-slate-600',
      },
      clickable: {
        true: 'cursor-pointer hover:shadow-lg hover:scale-[1.02]',
        false: '',
      },
    },
    defaultVariants: {
      performance: 'neutral',
      clickable: false,
    },
  }
);

export function NormalizedKpiCard({
  data,
  icon,
  subtitle,
  badge,
  showBenchmark = false,
  showTrend = true,
  showPercentile = false,
  showDataQuality = false,
  onClick,
  className,
}: NormalizedKpiCardProps) {
  const isClickable = !!onClick;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={cn(
        kpiCardVariants({ performance: data.performance, clickable: isClickable }),
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `View details for ${data.name}` : undefined}
    >
      <Card className="h-full p-6">
        <div className="space-y-6">
          {/* Header */}
          <KpiHeader
            title={data.name}
            icon={icon}
            subtitle={subtitle || data.description}
            badge={badge}
          />

          {/* Main Value */}
          <KpiValue
            value={data.value}
            unit={data.unit}
            performance={data.performance}
            dataQuality={data.dataQuality}
            showDataQuality={showDataQuality}
          />

          {/* Trend Sparkline */}
          {showTrend && data.trendData.length > 0 && (
            <div className="pt-2">
              <KpiTrend
                data={data.trendData}
                performance={data.performance}
                width={280}
                height={60}
              />
            </div>
          )}

          {/* Benchmark Progress Bar */}
          {showBenchmark && data.benchmarks.length > 0 && (
            <KpiBenchmark
              currentValue={data.value}
              targetValue={data.benchmarks.find((b) => b.type === 'target')?.value || data.value}
              medianValue={data.benchmarks.find((b) => b.type === 'benchmark')?.value}
              baselineValue={data.benchmarks.find((b) => b.type === 'baseline')?.value}
              unit={data.unit}
              performance={data.performance}
            />
          )}

          {/* Comparison Metrics */}
          {data.benchmarks.length > 0 && (
            <KpiComparison benchmarks={data.benchmarks} trend={data.trend} maxComparisons={2} />
          )}

          {/* Footer: Percentile & Data Quality */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              {showPercentile && data.percentile && (
                <PercentileBadge percentile={data.percentile} size="sm" />
              )}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Updated {data.lastUpdated.toLocaleDateString()}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

NormalizedKpiCard.displayName = 'NormalizedKpiCard';

export default NormalizedKpiCard;
