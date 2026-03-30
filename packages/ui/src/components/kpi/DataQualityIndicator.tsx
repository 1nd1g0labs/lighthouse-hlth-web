/**
 * DataQualityIndicator Component
 *
 * Displays data quality/confidence level with visual indicator
 * WCAG 2.1 AA compliant with both color and icon indicators
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { Shield, AlertTriangle, AlertCircle } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { DataQualityIndicatorProps } from '../../types/kpi';

const qualityIndicatorVariants = cva(
  'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      quality: {
        high: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
        medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
        low: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      quality: 'high',
      size: 'sm',
    },
  }
);

const iconSizeMap = {
  sm: 12,
  md: 14,
  lg: 16,
};

export function DataQualityIndicator({
  quality,
  showLabel = true,
  size = 'sm',
  className,
}: DataQualityIndicatorProps) {
  const Icon = quality === 'high' ? Shield : quality === 'medium' ? AlertTriangle : AlertCircle;

  const labels = {
    high: 'High Confidence',
    medium: 'Medium Confidence',
    low: 'Low Confidence',
  };

  const iconSize = iconSizeMap[size];

  return (
    <span
      className={cn(qualityIndicatorVariants({ quality, size }), className)}
      role="status"
      aria-label={`Data quality: ${labels[quality]}`}
    >
      <Icon size={iconSize} className="flex-shrink-0" aria-hidden="true" />
      {showLabel && <span>{labels[quality]}</span>}
    </span>
  );
}

DataQualityIndicator.displayName = 'DataQualityIndicator';

export default DataQualityIndicator;
