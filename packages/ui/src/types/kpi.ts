/**
 * KPI Component Types
 *
 * Comprehensive type definitions for normalized KPI cards
 * with healthcare sustainability metrics support.
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 * @version 1.2.0
 */

/**
 * Performance variant indicating how the metric compares to benchmarks
 */
export type PerformanceVariant = 'excellent' | 'good' | 'fair' | 'poor' | 'neutral';

/**
 * Data quality level for confidence indicators
 */
export type DataQuality = 'high' | 'medium' | 'low';

/**
 * Trend direction for comparison indicators
 */
export type TrendDirection = 'up' | 'down' | 'neutral';

/**
 * Comparison types for benchmarking
 */
export type ComparisonType = 'benchmark' | 'target' | 'previous' | 'baseline';

/**
 * Practice Greenhealth percentile ranking
 */
export interface PercentileRanking {
  /** Percentile value (0-100) */
  value: number;
  /** Descriptive label (e.g., "Top 10%") */
  label: string;
  /** Performance tier */
  tier: 'top-10' | 'top-25' | 'top-50' | 'bottom-50';
}

/**
 * Benchmark comparison data
 */
export interface Benchmark {
  /** Comparison type */
  type: ComparisonType;
  /** Benchmark value */
  value: number;
  /** Comparison label */
  label: string;
  /** Difference from current value (+ or -) */
  difference: number;
  /** Percentage difference */
  percentageDifference: number;
}

/**
 * Trend data point for sparkline visualization
 */
export interface TrendDataPoint {
  /** Timestamp or period label */
  period: string;
  /** Metric value */
  value: number;
}

/**
 * Core KPI data structure
 */
export interface KpiData {
  /** Unique identifier */
  id: string;
  /** Metric name */
  name: string;
  /** Metric category (energy, water, waste, emissions, financial) */
  category: string;
  /** Current value */
  value: number;
  /** Unit of measurement */
  unit: string;
  /** Performance variant */
  performance: PerformanceVariant;
  /** Trend direction */
  trend: TrendDirection;
  /** Trend data for sparkline (7-12 points) */
  trendData: TrendDataPoint[];
  /** Comparison benchmarks */
  benchmarks: Benchmark[];
  /** Practice Greenhealth percentile (optional) */
  percentile?: PercentileRanking;
  /** Data quality indicator */
  dataQuality: DataQuality;
  /** Last updated timestamp */
  lastUpdated: Date;
  /** Additional context or description */
  description?: string;
}

/**
 * Props for NormalizedKpiCard component
 */
export interface NormalizedKpiCardProps {
  /** KPI data */
  data: KpiData;
  /** Icon component from lucide-react */
  icon?: React.ComponentType<{ className?: string }>;
  /** Subtitle text */
  subtitle?: string;
  /** Badge text (e.g., "HB 21-1286 Tracked") */
  badge?: string;
  /** Show benchmark progress bar */
  showBenchmark?: boolean;
  /** Show trend sparkline */
  showTrend?: boolean;
  /** Show percentile badge */
  showPercentile?: boolean;
  /** Show data quality indicator */
  showDataQuality?: boolean;
  /** Click handler for drill-down */
  onClick?: () => void;
  /** Custom class name */
  className?: string;
}

/**
 * Props for KpiHeader component
 */
export interface KpiHeaderProps {
  /** Metric name */
  title: string;
  /** Icon component */
  icon?: React.ComponentType<{ className?: string }>;
  /** Subtitle text */
  subtitle?: string;
  /** Badge text */
  badge?: string;
  /** Custom class name */
  className?: string;
}

/**
 * Props for KpiValue component
 */
export interface KpiValueProps {
  /** Numeric value */
  value: number;
  /** Unit of measurement */
  unit: string;
  /** Performance variant for color theming */
  performance: PerformanceVariant;
  /** Data quality level */
  dataQuality: DataQuality;
  /** Show confidence indicator */
  showDataQuality?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * Props for KpiComparison component
 */
export interface KpiComparisonProps {
  /** Comparison benchmarks */
  benchmarks: Benchmark[];
  /** Trend direction */
  trend: TrendDirection;
  /** Maximum comparisons to display */
  maxComparisons?: number;
  /** Custom class name */
  className?: string;
}

/**
 * Props for KpiTrend component (sparkline)
 */
export interface KpiTrendProps {
  /** Trend data points */
  data: TrendDataPoint[];
  /** Performance variant for color */
  performance: PerformanceVariant;
  /** Width in pixels */
  width?: number;
  /** Height in pixels */
  height?: number;
  /** Custom class name */
  className?: string;
}

/**
 * Props for KpiBenchmark component (progress bar)
 */
export interface KpiBenchmarkProps {
  /** Current value */
  currentValue: number;
  /** Benchmark/target value */
  targetValue: number;
  /** Median/peer value (optional) */
  medianValue?: number;
  /** Baseline value for comparison */
  baselineValue?: number;
  /** Unit of measurement */
  unit: string;
  /** Performance variant */
  performance: PerformanceVariant;
  /** Custom class name */
  className?: string;
}

/**
 * Props for PercentileBadge component
 */
export interface PercentileBadgeProps {
  /** Percentile ranking */
  percentile: PercentileRanking;
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Custom class name */
  className?: string;
}

/**
 * Props for DataQualityIndicator component
 */
export interface DataQualityIndicatorProps {
  /** Data quality level */
  quality: DataQuality;
  /** Show label text */
  showLabel?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom class name */
  className?: string;
}

/**
 * Colorado HB 21-1286 compliance data
 */
export interface HB21286Compliance {
  /** Baseline year emissions (MT CO2e) */
  baselineEmissions: number;
  /** Baseline year */
  baselineYear: number;
  /** Current emissions (MT CO2e) */
  currentEmissions: number;
  /** Current reduction percentage */
  reductionPercentage: number;
  /** 2026 target (7% reduction) */
  target2026: number;
  /** 2030 target (20% reduction) */
  target2030: number;
  /** Compliance status */
  status: 'ahead' | 'on-track' | 'at-risk' | 'behind';
}

/**
 * Pre-built metric card types
 */
export type MetricCardType =
  | 'site-eui'
  | 'energy-cost-intensity'
  | 'carbon-intensity-energy'
  | 'water-use-intensity'
  | 'total-waste-intensity'
  | 'rmw-ratio'
  | 'diversion-rate'
  | 'scope-1-intensity'
  | 'scope-2-intensity'
  | 'sustainability-savings-per-bed'
  | 'hb21286-compliance';

/**
 * Dashboard layout configuration
 */
export interface DashboardConfig {
  /** Dashboard title */
  title: string;
  /** Metric cards to display */
  metrics: MetricCardType[];
  /** Grid columns (responsive) */
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  /** Show filters */
  showFilters?: boolean;
  /** Show export button */
  showExport?: boolean;
}

/**
 * Utility: Calculate performance variant based on value comparison
 */
export function calculatePerformance(
  value: number,
  benchmark: number,
  higherIsBetter: boolean = false
): PerformanceVariant {
  const ratio = value / benchmark;

  if (higherIsBetter) {
    if (ratio >= 1.15) return 'excellent';
    if (ratio >= 1.05) return 'good';
    if (ratio >= 0.95) return 'fair';
    return 'poor';
  } else {
    if (ratio <= 0.85) return 'excellent';
    if (ratio <= 0.95) return 'good';
    if (ratio <= 1.05) return 'fair';
    return 'poor';
  }
}

/**
 * Utility: Calculate trend direction from data points
 */
export function calculateTrend(data: TrendDataPoint[]): TrendDirection {
  if (data.length < 2) return 'neutral';

  const recent = data.slice(-3);
  const older = data.slice(-6, -3);

  if (recent.length === 0 || older.length === 0) return 'neutral';

  const recentAvg = recent.reduce((sum, d) => sum + d.value, 0) / recent.length;
  const olderAvg = older.reduce((sum, d) => sum + d.value, 0) / older.length;

  const change = ((recentAvg - olderAvg) / olderAvg) * 100;

  if (Math.abs(change) < 2) return 'neutral';
  return change > 0 ? 'up' : 'down';
}

/**
 * Utility: Format KPI value with appropriate precision
 */
export function formatKpiValue(value: number, unit: string): string {
  // Integer values for counts
  if (unit === 'count' || unit === '#') {
    return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  // Percentage values
  if (unit === '%') {
    return value.toFixed(1);
  }

  // Currency values
  if (unit === '$' || unit.startsWith('$')) {
    return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  // Large values (>1000)
  if (Math.abs(value) >= 1000) {
    return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  // Small values with precision
  if (Math.abs(value) < 10) {
    return value.toFixed(2);
  }

  // Default: 1 decimal place
  return value.toFixed(1);
}
