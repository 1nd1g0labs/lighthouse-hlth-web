/**
 * KpiTrend Component
 *
 * SVG sparkline visualization for KPI trend data
 * Pure SVG implementation - no external chart dependencies
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { useMemo } from 'react';
import { cn } from '../../utils/cn';
import type { KpiTrendProps } from '../../types/kpi';

// Performance variant color mapping
const performanceColors = {
  excellent: 'stroke-emerald-600 dark:stroke-emerald-400',
  good: 'stroke-teal-600 dark:stroke-teal-400',
  fair: 'stroke-blue-600 dark:stroke-blue-400',
  poor: 'stroke-red-600 dark:stroke-red-400',
  neutral: 'stroke-slate-600 dark:stroke-slate-400',
};

const performanceFillColors = {
  excellent: 'fill-emerald-600/10',
  good: 'fill-teal-600/10',
  fair: 'fill-blue-600/10',
  poor: 'fill-red-600/10',
  neutral: 'fill-slate-600/10',
};

export function KpiTrend({
  data,
  performance,
  width = 120,
  height = 40,
  className,
}: KpiTrendProps) {
  const { pathData, areaPathData } = useMemo(() => {
    if (data.length === 0) {
      return { pathData: '', areaPathData: '' };
    }

    const values = data.map((d) => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue || 1; // Prevent division by zero

    const padding = height * 0.1;
    const chartHeight = height - padding * 2;

    // Generate path points
    const points = data.map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const normalizedValue = (d.value - minValue) / range;
      const y = height - padding - normalizedValue * chartHeight;
      return { x, y };
    });

    // Create line path
    const linePath = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)},${p.y.toFixed(2)}`)
      .join(' ');

    // Create area path (for filled area under line)
    const areaPath = [
      linePath,
      `L ${width},${height}`,
      `L 0,${height}`,
      'Z',
    ].join(' ');

    return {
      pathData: linePath,
      areaPathData: areaPath,
    };
  }, [data, width, height]);

  if (data.length === 0) {
    return (
      <div
        className={cn('flex items-center justify-center text-xs text-slate-400', className)}
        style={{ width, height }}
      >
        No data
      </div>
    );
  }

  return (
    <svg
      width={width}
      height={height}
      className={cn('overflow-visible', className)}
      role="img"
      aria-label={`Trend chart showing ${data.length} data points`}
    >
      {/* Area fill */}
      <path
        d={areaPathData}
        className={performanceFillColors[performance]}
        strokeWidth={0}
      />
      {/* Line stroke */}
      <path
        d={pathData}
        className={performanceColors[performance]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Data points */}
      {data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const values = data.map((pt) => pt.value);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        const range = maxValue - minValue || 1;
        const padding = height * 0.1;
        const chartHeight = height - padding * 2;
        const normalizedValue = (d.value - minValue) / range;
        const y = height - padding - normalizedValue * chartHeight;

        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={2}
            className={performanceColors[performance]}
            fill="currentColor"
          />
        );
      })}
    </svg>
  );
}

KpiTrend.displayName = 'KpiTrend';

export default KpiTrend;
