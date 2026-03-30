/**
 * Connector Card Types
 *
 * Type definitions for the ConnectorCard component used in the
 * Lighthouse HLTH connector integration system.
 *
 * @packageDocumentation
 */

/**
 * Connector provider identifiers
 */
export type ConnectorProvider =
  | 'utility_api'
  | 'energystar_pm'
  | 'epic_fhir'
  | 'cerner'
  | 'siemens_bms'
  | 'johnson_controls'
  | 'custom';

/**
 * Connector connection states
 *
 * State machine flow:
 * available → discovering → authorizing → connected → syncing
 *                                      ↓
 *                                   error → disconnected
 */
export type ConnectorState =
  | 'available' // Not connected, can be connected
  | 'early_access' // Feature-flagged, join waitlist
  | 'discovering' // Discovering available accounts
  | 'authorizing' // OAuth flow in progress
  | 'connected' // Successfully connected, idle
  | 'syncing' // Actively syncing data
  | 'error' // Connection or sync error
  | 'disconnected'; // Previously connected, now disconnected

/**
 * Subscription tier access levels
 */
export type ConnectorTier = 'free' | 'professional' | 'enterprise';

/**
 * Connector card display variants
 */
export type ConnectorCardVariant = 'default' | 'compact';

/**
 * Connector card sizes
 */
export type ConnectorCardSize = 'md' | 'lg';

/**
 * Data preview for connected connectors
 */
export interface ConnectorDataPreview {
  /** Number of records synced */
  recordCount?: number;

  /** Date range of data */
  dateRange?: {
    start: Date;
    end: Date;
  };

  /** Data quality percentage */
  quality?: number;

  /** Human-readable summary */
  summary?: string;
}

/**
 * Error information for failed connectors
 */
export interface ConnectorError {
  /** Error code for programmatic handling */
  code: string;

  /** Human-readable error message */
  message: string;

  /** Technical details for debugging */
  details?: Record<string, unknown>;

  /** Suggested recovery action */
  action?: 'reconnect' | 'reconfigure' | 'contact_support';
}

/**
 * Connector metadata
 */
export interface ConnectorMetadata {
  /** Unique connector ID */
  id?: string;

  /** Provider identifier */
  provider: ConnectorProvider;

  /** Display name */
  name: string;

  /** Short description */
  description: string;

  /** Current state */
  state: ConnectorState;

  /** Last successful sync timestamp */
  lastSyncedAt?: Date;

  /** Data preview (for connected connectors) */
  dataPreview?: ConnectorDataPreview;

  /** Error information (for error state) */
  error?: ConnectorError;

  /** Required subscription tier */
  tier?: ConnectorTier;

  /** Categories for filtering */
  categories?: string[];

  /** Provider logo URL */
  logoUrl?: string;

  /** External documentation URL */
  docsUrl?: string;
}

/**
 * Connector card action handlers
 */
export interface ConnectorCardActions {
  /** Handle initial connection */
  onConnect?: () => void;

  /** Handle reconnection after error */
  onReconnect?: () => void;

  /** Handle configuration changes */
  onConfigure?: () => void;

  /** Handle disconnection */
  onDisconnect?: () => void;

  /** Handle joining waitlist for early access */
  onJoinWaitlist?: () => void;

  /** Handle manual sync trigger */
  onSync?: () => void;
}

/**
 * Complete connector card props
 */
export interface ConnectorCardProps extends ConnectorMetadata, ConnectorCardActions {
  /** Display variant */
  variant?: ConnectorCardVariant;

  /** Component size */
  size?: ConnectorCardSize;

  /** Additional CSS classes */
  className?: string;

  /** Test ID for automated testing */
  'data-testid'?: string;
}
