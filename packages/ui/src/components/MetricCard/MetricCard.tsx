import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { TrendingUp, TrendingDown, ArrowDown } from 'lucide-react';

const metricCardVariants = cva(
  'flex flex-col gap-2',
  {
    variants: {
      variant: {
        default: '',
        compact: 'gap-1',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface MetricCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricCardVariants> {
  /**
   * The main metric value (e.g., "$4m+", "147t", "330+")
   */
  value: string;

  /**
   * Description/label for the metric (e.g., "Total saved", "CO2e avoided emissions")
   */
  label: string;

  /**
   * Optional trend indicator
   */
  trend?: 'up' | 'down' | 'neutral';

  /**
   * Optional trend value (e.g., "+23%")
   */
  trendValue?: string;

  /**
   * Show arrow icon above the metric
   */
  showArrow?: boolean;

  /**
   * Size of the metric value text
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      className,
      variant,
      value,
      label,
      trend,
      trendValue,
      showArrow = true,
      size = 'lg',
      ...props
    },
    ref
  ) => {
    const valueSize = {
      sm: 'text-2xl md:text-3xl',
      md: 'text-3xl md:text-4xl',
      lg: 'text-4xl md:text-5xl',
      xl: 'text-5xl md:text-6xl',
    }[size];

    const getTrendIcon = () => {
      if (!trend || trend === 'neutral') return null;
      const Icon = trend === 'up' ? TrendingUp : TrendingDown;
      const color = trend === 'up' ? 'text-green-600' : 'text-red-600';
      return <Icon className={cn('w-4 h-4', color)} />;
    };

    return (
      <div
        ref={ref}
        className={cn(metricCardVariants({ variant, className }))}
        {...props}
      >
        {showArrow && (
          <div className="mb-1">
            <ArrowDown className="w-5 h-5 text-gray-400" />
          </div>
        )}

        <div className="flex items-baseline gap-2">
          <span className={cn('font-bold text-gray-900', valueSize)}>
            {value}
          </span>
          {trendValue && (
            <span className="flex items-center gap-1 text-sm font-medium">
              {getTrendIcon()}
              <span className={cn(
                trend === 'up' ? 'text-green-600' :
                trend === 'down' ? 'text-red-600' :
                'text-gray-600'
              )}>
                {trendValue}
              </span>
            </span>
          )}
        </div>

        <p className="text-base text-gray-600 leading-relaxed">
          {label}
        </p>
      </div>
    );
  }
);

MetricCard.displayName = 'MetricCard';
