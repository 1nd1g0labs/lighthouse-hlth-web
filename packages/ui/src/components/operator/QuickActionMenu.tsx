import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Link as LinkIcon,
  Bell,
  FileText,
  Settings,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * QuickActionMenu Component
 *
 * Right panel shortcuts menu for common operator actions.
 *
 * Features:
 * - Quick access to common actions
 * - Badge counts for notifications
 * - Hover states with Tailwind
 * - Keyboard accessible
 *
 * Actions:
 * - Connect Provider
 * - Set Alert Rule
 * - Export Report
 * - Settings
 *
 * WCAG 2.1 AA Compliance:
 * - Semantic HTML with proper button elements ✓
 * - Keyboard accessible (Tab, Enter) ✓
 * - Focus indicators visible ✓
 * - ARIA labels for actions ✓
 * - Color contrast 4.5:1+ ✓
 *
 * @example
 * ```tsx
 * const actions = [
 *   {
 *     id: 'connect-provider',
 *     label: 'Connect Provider',
 *     description: 'Link new data source',
 *     icon: 'link',
 *     onClick: () => console.log('Connect provider')
 *   },
 *   {
 *     id: 'alerts',
 *     label: 'Alert Rules',
 *     description: 'Configure notifications',
 *     icon: 'bell',
 *     badge: 3,
 *     onClick: () => console.log('Set alert rules')
 *   }
 * ];
 *
 * <QuickActionMenu actions={actions} />
 * ```
 */

export type QuickActionIcon = 'link' | 'bell' | 'file' | 'settings';

export interface QuickAction {
  id: string;
  label: string;
  description?: string;
  icon: QuickActionIcon;
  badge?: number;
  onClick: () => void;
  isDisabled?: boolean;
}

const menuVariants = cva(
  [
    'flex flex-col',
    'bg-white',
  ].join(' '),
  {
    variants: {},
    defaultVariants: {},
  }
);

const actionVariants = cva(
  [
    'flex items-start gap-3 w-full',
    'p-4',
    'text-left',
    'border-b border-border-subtle last:border-b-0',
    'transition-all duration-200',
    'group',
  ].join(' '),
  {
    variants: {
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: 'hover:bg-neutral-50 cursor-pointer',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

export interface QuickActionMenuProps
  extends VariantProps<typeof menuVariants> {
  /**
   * Quick action items
   */
  actions?: QuickAction[];

  /**
   * Menu title
   * @default 'Quick Actions'
   */
  title?: string;

  /**
   * Show title
   * @default true
   */
  showTitle?: boolean;

  /**
   * Custom className
   */
  className?: string;
}

/**
 * Get icon component for action
 */
function getActionIcon(icon: QuickActionIcon, size: number = 20) {
  switch (icon) {
    case 'link':
      return <LinkIcon size={size} aria-hidden="true" />;
    case 'bell':
      return <Bell size={size} aria-hidden="true" />;
    case 'file':
      return <FileText size={size} aria-hidden="true" />;
    case 'settings':
      return <Settings size={size} aria-hidden="true" />;
  }
}

export const QuickActionMenu: React.FC<QuickActionMenuProps> = ({
  actions = [],
  title = 'Quick Actions',
  showTitle = true,
  className,
}) => {
  // Default actions if none provided
  const defaultActions: QuickAction[] = [
    {
      id: 'connect-provider',
      label: 'Connect Provider',
      description: 'Link new data source',
      icon: 'link',
      onClick: () => console.log('Connect provider'),
    },
    {
      id: 'set-alert',
      label: 'Set Alert Rule',
      description: 'Configure notifications',
      icon: 'bell',
      onClick: () => console.log('Set alert rule'),
    },
    {
      id: 'export-report',
      label: 'Export Report',
      description: 'Download emissions data',
      icon: 'file',
      onClick: () => console.log('Export report'),
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'Configure dashboard',
      icon: 'settings',
      onClick: () => console.log('Settings'),
    },
  ];

  const displayActions = actions.length > 0 ? actions : defaultActions;

  return (
    <div className={cn(menuVariants(), className)} role="menu" aria-label={title}>
      {/* Header */}
      {showTitle && (
        <div className="p-4 border-b border-border-subtle">
          <h3 className="text-app-section-header font-semibold text-text-main">
            {title}
          </h3>
        </div>
      )}

      {/* Action Items */}
      <div>
        {displayActions.map((action) => (
          <QuickActionItem
            key={action.id}
            action={action}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * QuickActionItem - Individual action button
 */
interface QuickActionItemProps {
  action: QuickAction;
}

const QuickActionItem: React.FC<QuickActionItemProps> = ({ action }) => {
  const iconComponent = getActionIcon(action.icon, 20);

  return (
    <button
      onClick={action.onClick}
      disabled={action.isDisabled}
      className={cn(actionVariants({ disabled: action.isDisabled }))}
      role="menuitem"
      aria-label={action.label}
      aria-disabled={action.isDisabled}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5 text-primary-500 group-hover:text-primary-600 transition-colors">
        {iconComponent}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-app-body font-semibold text-text-main group-hover:text-primary-600 transition-colors">
            {action.label}
          </h4>

          {/* Badge */}
          {action.badge !== undefined && action.badge > 0 && (
            <span
              className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-critical-600 text-white text-app-badge font-semibold rounded-full"
              aria-label={`${action.badge} notifications`}
            >
              {action.badge > 99 ? '99+' : action.badge}
            </span>
          )}
        </div>

        {action.description && (
          <p className="text-app-body-sm text-text-secondary mt-0.5">
            {action.description}
          </p>
        )}
      </div>

      {/* Chevron */}
      {!action.isDisabled && (
        <div className="flex-shrink-0 text-text-muted group-hover:text-text-secondary group-hover:translate-x-0.5 transition-all">
          <ChevronRight size={16} aria-hidden="true" />
        </div>
      )}
    </button>
  );
};

QuickActionMenu.displayName = 'QuickActionMenu';
