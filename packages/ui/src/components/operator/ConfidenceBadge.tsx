import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * ConfidenceBadge Component
 *
 * Displays confidence score for emission factor matches with color-coded visual indicators.
 *
 * Confidence Levels:
 * - High (≥80%): Green with CheckCircle2 icon
 * - Medium (50-79%): Yellow with AlertTriangle icon
 * - Low (<50%): Red with XCircle icon
 *
 * WCAG 2.1 AA Compliance:
 * - Color contrast: 4.5:1+ for all color combinations ✓
 * - Icons supplement color (not sole indicator) ✓
 * - Semantic HTML with proper ARIA labels ✓
 *
 * @example
 * ```tsx
 * // Auto-detect level from score
 * <ConfidenceBadge score={85} />
 *
 * // Compact variant for tables
 * <ConfidenceBadge score={62} size="sm" />
 *
 * // With custom label
 * <ConfidenceBadge score={45} showLabel={true} />
 * ```
 */
const confidenceBadgeVariants = cva(
  [
    'inline-flex items-center gap-1.5',
    'rounded-md',
    'font-medium',
    'transition-all duration-200',
  ].join(' '),
  {
    variants: {
      level: {
        high: [
          'bg-success-light text-success-dark',
          'border border-success-main/20',
        ].join(' '),
        medium: [
          'bg-warning-light text-warning-dark',
          'border border-warning-main/20',
        ].join(' '),
        low: [
          'bg-error-light text-error-dark',
          'border border-error-main/20',
        ].join(' '),
      },
      size: {
        sm: 'px-2 py-0.5 text-app-badge',
        md: 'px-2.5 py-1 text-app-body-sm',
        lg: 'px-3 py-1.5 text-app-body',
      },
    },
    defaultVariants: {
      level: 'medium',
      size: 'md',
    },
  }
);

interface ConfidenceBadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    Omit<VariantProps<typeof confidenceBadgeVariants>, 'level'> {
  /**
   * Confidence score (0-100)
   */
  score: number;

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Show percentage label
   * @default true
   */
  showLabel?: boolean;

  /**
   * Show icon
   * @default true
   */
  showIcon?: boolean;
}

/**
 * Get confidence level from score
 */
function getConfidenceLevel(score: number): 'high' | 'medium' | 'low' {
  if (score >= 80) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}

/**
 * Get icon for confidence level
 */
function getConfidenceIcon(
  level: 'high' | 'medium' | 'low',
  size: 'sm' | 'md' | 'lg'
) {
  const iconSize = size === 'sm' ? 12 : size === 'md' ? 14 : 16;

  switch (level) {
    case 'high':
      return <CheckCircle2 size={iconSize} aria-hidden="true" />;
    case 'medium':
      return <AlertTriangle size={iconSize} aria-hidden="true" />;
    case 'low':
      return <XCircle size={iconSize} aria-hidden="true" />;
  }
}

/**
 * Get accessibility label for confidence level
 */
function getConfidenceA11yLabel(score: number, level: 'high' | 'medium' | 'low'): string {
  const levelText = level === 'high' ? 'High' : level === 'medium' ? 'Medium' : 'Low';
  return `${levelText} confidence: ${score}%`;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({
  score,
  size = 'md',
  showLabel = true,
  showIcon = true,
  className,
  ...props
}) => {
  const level = getConfidenceLevel(score);
  const icon = showIcon ? getConfidenceIcon(level, size) : null;
  const a11yLabel = getConfidenceA11yLabel(score, level);

  return (
    <div
      className={cn(confidenceBadgeVariants({ level, size }), className)}
      role="status"
      aria-label={a11yLabel}
      {...props}
    >
      {icon}
      {showLabel && <span>{score}%</span>}
    </div>
  );
};

ConfidenceBadge.displayName = 'ConfidenceBadge';
