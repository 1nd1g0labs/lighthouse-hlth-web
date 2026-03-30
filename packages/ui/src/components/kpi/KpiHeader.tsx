/**
 * KpiHeader Component
 *
 * Header section for KPI cards with title, icon, subtitle, and badge
 *
 * @package @1nd1g0labs/lighthouse-hlth-ui
 */

import { cn } from '../../utils/cn';
import type { KpiHeaderProps } from '../../types/kpi';

export function KpiHeader({ title, icon: Icon, subtitle, badge, className }: KpiHeaderProps) {
  return (
    <div className={cn('flex items-start justify-between gap-3', className)}>
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="flex-shrink-0 rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
            <Icon className="h-5 w-5 text-slate-700 dark:text-slate-300" aria-hidden="true" />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          {subtitle && (
            <p className="text-xs text-slate-600 dark:text-slate-400">{subtitle}</p>
          )}
        </div>
      </div>
      {badge && (
        <span className="flex-shrink-0 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          {badge}
        </span>
      )}
    </div>
  );
}

KpiHeader.displayName = 'KpiHeader';

export default KpiHeader;
