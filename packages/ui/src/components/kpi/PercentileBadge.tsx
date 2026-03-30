/**
 * PercentileBadge Component
 *
 * Displays Practice Greenhealth percentile ranking
 * with visual tier indicators
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { Award } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type { PercentileBadgeProps } from '../../types/kpi';

const percentileBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold transition-colors',
  {
    variants: {
      tier: {
        'top-10': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
        'top-25': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
        'top-50': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
        'bottom-50': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      tier: 'top-50',
      size: 'md',
    },
  }
);

const iconSizeMap = {
  sm: 14,
  md: 16,
  lg: 18,
};

export function PercentileBadge({ percentile, size = 'md', className }: PercentileBadgeProps) {
  const iconSize = iconSizeMap[size];

  return (
    <div
      className={cn(percentileBadgeVariants({ tier: percentile.tier, size }), className)}
      role="status"
      aria-label={`Practice Greenhealth ranking: ${percentile.label}`}
    >
      <Award size={iconSize} className="flex-shrink-0" aria-hidden="true" />
      <span>{percentile.label}</span>
    </div>
  );
}

PercentileBadge.displayName = 'PercentileBadge';

export default PercentileBadge;
