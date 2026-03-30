/**
 * ConnectorCard Component
 *
 * Displays a connector integration with state-aware UI and actions.
 * Follows WCAG 2.1 AA accessibility standards.
 *
 * @example
 * ```tsx
 * <ConnectorCard
 *   provider="utility_api"
 *   name="UtilityAPI"
 *   description="Automated utility bill data"
 *   state="early_access"
 *   tier="professional"
 *   onJoinWaitlist={() => console.log('Join waitlist')}
 * />
 * ```
 */

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Badge } from '../Badge';
import { Button } from '../Button';
import type { ConnectorCardProps } from './types';

/**
 * Connector card style variants using CVA
 */
const connectorCardVariants = cva(
  // Base styles
  'relative rounded-lg border transition-all duration-200',
  {
    variants: {
      state: {
        available: 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md',
        early_access: 'border-amber-200 bg-amber-50/30 hover:border-amber-300 hover:shadow-md',
        discovering: 'border-primary-300 bg-primary-50/30 animate-pulse',
        authorizing: 'border-primary-400 bg-primary-50/50',
        connected: 'border-success-300 bg-success-50/30 hover:shadow-md',
        syncing: 'border-primary-400 bg-primary-50/50',
        error: 'border-danger-300 bg-danger-50/30 hover:border-danger-400',
        disconnected: 'border-gray-300 bg-gray-50 hover:border-gray-400',
      },
      variant: {
        default: 'p-6',
        compact: 'p-4',
      },
      size: {
        md: 'min-h-[240px]',
        lg: 'min-h-[280px]',
      },
    },
    defaultVariants: {
      state: 'available',
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * State badge variants
 */
const getStateBadge = (state: ConnectorCardProps['state']) => {
  switch (state) {
    case 'early_access':
      return { variant: 'warning' as const, label: 'Early Access - Q2 2025' };
    case 'discovering':
      return { variant: 'info' as const, label: 'Discovering...' };
    case 'authorizing':
      return { variant: 'info' as const, label: 'Authorizing...' };
    case 'connected':
      return { variant: 'success' as const, label: 'Connected' };
    case 'syncing':
      return { variant: 'info' as const, label: 'Syncing...' };
    case 'error':
      return { variant: 'danger' as const, label: 'Error' };
    case 'disconnected':
      return { variant: 'neutral' as const, label: 'Disconnected' };
    default:
      return null;
  }
};

/**
 * Format last sync time
 */
const formatLastSync = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

/**
 * ConnectorCard component
 */
export const ConnectorCard = React.forwardRef<HTMLDivElement, ConnectorCardProps>(
  (
    {
      id,
      provider,
      name,
      description,
      state,
      lastSyncedAt,
      dataPreview,
      error,
      tier,
      categories,
      logoUrl,
      docsUrl,
      variant = 'default',
      size = 'md',
      className,
      onConnect,
      onReconnect,
      onConfigure,
      onDisconnect,
      onJoinWaitlist,
      onSync,
      'data-testid': testId,
    },
    ref
  ) => {
    const stateBadge = getStateBadge(state);
    const isInteractive = state === 'connected' || state === 'error' || state === 'available';

    return (
      <div
        ref={ref}
        className={cn(connectorCardVariants({ state, variant, size }), className)}
        data-testid={testId}
        role="article"
        aria-label={`${name} connector ${state}`}
      >
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {logoUrl && (
              <img
                src={logoUrl}
                alt={`${name} logo`}
                className="h-10 w-10 rounded object-contain"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              {tier && (
                <Badge variant="neutral" size="sm" className="mt-1">
                  {tier.charAt(0).toUpperCase() + tier.slice(1)} plan
                </Badge>
              )}
            </div>
          </div>

          {stateBadge && (
            <Badge variant={stateBadge.variant} size="sm" aria-live="polite">
              {stateBadge.label}
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="mb-4 text-sm text-gray-600">{description}</p>

        {/* Data Preview (Connected state) */}
        {state === 'connected' && dataPreview && (
          <div className="mb-4 rounded-md border border-success-200 bg-success-50/50 p-3">
            {dataPreview.summary && (
              <p className="mb-2 text-sm font-medium text-success-900">{dataPreview.summary}</p>
            )}
            <div className="flex flex-wrap gap-3 text-xs text-success-700">
              {dataPreview.recordCount !== undefined && (
                <span>{dataPreview.recordCount.toLocaleString()} records</span>
              )}
              {dataPreview.quality !== undefined && (
                <span>{dataPreview.quality}% quality</span>
              )}
              {lastSyncedAt && (
                <span aria-label={`Last synced ${lastSyncedAt.toLocaleString()}`}>
                  Last sync: {formatLastSync(lastSyncedAt)}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Error State */}
        {state === 'error' && error && (
          <div
            className="mb-4 rounded-md border border-danger-200 bg-danger-50/50 p-3"
            role="alert"
            aria-live="assertive"
          >
            <p className="mb-1 text-sm font-medium text-danger-900">{error.message}</p>
            {error.action && (
              <p className="text-xs text-danger-700">
                Action required: {error.action.replace(/_/g, ' ')}
              </p>
            )}
          </div>
        )}

        {/* Syncing Progress */}
        {state === 'syncing' && (
          <div className="mb-4">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary-100">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-primary-500" />
            </div>
            <p className="mt-2 text-xs text-primary-700">Syncing data...</p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto flex flex-wrap gap-2">
          {state === 'available' && onConnect && (
            <Button
              variant="primary"
              size="sm"
              onClick={onConnect}
              aria-label={`Connect ${name}`}
            >
              Connect
            </Button>
          )}

          {state === 'early_access' && onJoinWaitlist && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onJoinWaitlist}
              aria-label={`Join waitlist for ${name}`}
            >
              Join Waitlist
            </Button>
          )}

          {state === 'connected' && (
            <>
              {onSync && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onSync}
                  aria-label={`Sync ${name} data`}
                >
                  Sync Now
                </Button>
              )}
              {onConfigure && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onConfigure}
                  aria-label={`Configure ${name}`}
                >
                  Configure
                </Button>
              )}
              {onDisconnect && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDisconnect}
                  aria-label={`Disconnect ${name}`}
                  className="text-danger-600 hover:text-danger-700"
                >
                  Disconnect
                </Button>
              )}
            </>
          )}

          {state === 'error' && onReconnect && (
            <Button
              variant="primary"
              size="sm"
              onClick={onReconnect}
              aria-label={`Reconnect ${name}`}
            >
              Reconnect
            </Button>
          )}

          {docsUrl && (
            <Button
              variant="ghost"
              size="sm"
              as="a"
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${name} documentation (opens in new tab)`}
            >
              Learn More
            </Button>
          )}
        </div>

        {/* Categories (optional footer) */}
        {categories && categories.length > 0 && variant === 'default' && (
          <div className="mt-4 flex flex-wrap gap-1 border-t border-gray-100 pt-3">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
);

ConnectorCard.displayName = 'ConnectorCard';
