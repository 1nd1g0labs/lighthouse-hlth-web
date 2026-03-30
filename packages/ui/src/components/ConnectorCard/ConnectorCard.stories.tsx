/**
 * ConnectorCard Storybook Stories
 *
 * Interactive documentation and testing for all connector states
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ConnectorCard } from './ConnectorCard';
import type { ConnectorCardProps } from './types';

const meta: Meta<typeof ConnectorCard> = {
  title: 'Components/ConnectorCard',
  component: ConnectorCard,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: [
        'available',
        'early_access',
        'discovering',
        'authorizing',
        'connected',
        'syncing',
        'error',
        'disconnected',
      ],
    },
    variant: {
      control: 'select',
      options: ['default', 'compact'],
    },
    size: {
      control: 'select',
      options: ['md', 'lg'],
    },
    tier: {
      control: 'select',
      options: ['free', 'professional', 'enterprise'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConnectorCard>;

/**
 * Available - Ready to connect
 */
export const Available: Story = {
  args: {
    provider: 'energystar_pm',
    name: 'Energy Star Portfolio Manager',
    description: 'Track building energy performance and get ENERGY STAR certification.',
    state: 'available',
    tier: 'free',
    categories: ['Energy', 'Building Management', 'Compliance'],
    onConnect: () => console.log('Connect clicked'),
    docsUrl: 'https://www.energystar.gov/buildings/tools-and-resources/portfolio-manager',
  },
};

/**
 * Early Access - Feature flagged connector
 */
export const EarlyAccess: Story = {
  args: {
    provider: 'utility_api',
    name: 'UtilityAPI',
    description: 'Automated utility bill data collection from 95% of US utilities.',
    state: 'early_access',
    tier: 'professional',
    categories: ['Energy', 'Utilities', 'Automation'],
    onJoinWaitlist: () => console.log('Join waitlist clicked'),
    docsUrl: 'https://utilityapi.com/docs',
  },
};

/**
 * Discovering - Finding available accounts
 */
export const Discovering: Story = {
  args: {
    provider: 'utility_api',
    name: 'UtilityAPI',
    description: 'Automated utility bill data collection from 95% of US utilities.',
    state: 'discovering',
    tier: 'professional',
  },
};

/**
 * Authorizing - OAuth flow in progress
 */
export const Authorizing: Story = {
  args: {
    provider: 'utility_api',
    name: 'UtilityAPI',
    description: 'Automated utility bill data collection from 95% of US utilities.',
    state: 'authorizing',
    tier: 'professional',
  },
};

/**
 * Connected - Successfully linked
 */
export const Connected: Story = {
  args: {
    provider: 'utility_api',
    name: 'UtilityAPI',
    description: 'Automated utility bill data collection from 95% of US utilities.',
    state: 'connected',
    tier: 'professional',
    lastSyncedAt: new Date(Date.now() - 3600000), // 1 hour ago
    dataPreview: {
      recordCount: 1247,
      dateRange: {
        start: new Date('2023-01-01'),
        end: new Date('2024-12-31'),
      },
      quality: 98,
      summary: '24 months of energy data across 3 facilities',
    },
    categories: ['Energy', 'Utilities', 'Automation'],
    onSync: () => console.log('Sync clicked'),
    onConfigure: () => console.log('Configure clicked'),
    onDisconnect: () => console.log('Disconnect clicked'),
    docsUrl: 'https://utilityapi.com/docs',
  },
};

/**
 * Syncing - Actively syncing data
 */
export const Syncing: Story = {
  args: {
    provider: 'utility_api',
    name: 'UtilityAPI',
    description: 'Automated utility bill data collection from 95% of US utilities.',
    state: 'syncing',
    tier: 'professional',
    lastSyncedAt: new Date(Date.now() - 3600000),
  },
};

/**
 * Error - Connection or sync failed
 */
export const Error: Story = {
  args: {
    provider: 'utility_api',
    name: 'UtilityAPI',
    description: 'Automated utility bill data collection from 95% of US utilities.',
    state: 'error',
    tier: 'professional',
    error: {
      code: 'AUTH_EXPIRED',
      message: 'Authentication credentials have expired.',
      action: 'reconnect',
    },
    onReconnect: () => console.log('Reconnect clicked'),
    docsUrl: 'https://utilityapi.com/docs',
  },
};

/**
 * Disconnected - Previously connected
 */
export const Disconnected: Story = {
  args: {
    provider: 'utility_api',
    name: 'UtilityAPI',
    description: 'Automated utility bill data collection from 95% of US utilities.',
    state: 'disconnected',
    tier: 'professional',
    lastSyncedAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
    onConnect: () => console.log('Reconnect clicked'),
  },
};

/**
 * Compact Variant - Space-efficient display
 */
export const CompactVariant: Story = {
  args: {
    ...Connected.args,
    variant: 'compact',
    size: 'md',
  },
};

/**
 * Large Size - Expanded card
 */
export const LargeSize: Story = {
  args: {
    ...Connected.args,
    size: 'lg',
  },
};

/**
 * Interactive Demo - All states in grid
 */
export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ConnectorCard
        provider="energystar_pm"
        name="Energy Star PM"
        description="Building energy performance tracking."
        state="available"
        tier="free"
        onConnect={() => console.log('Connect')}
      />
      <ConnectorCard
        provider="utility_api"
        name="UtilityAPI"
        description="Automated utility bill data."
        state="early_access"
        tier="professional"
        onJoinWaitlist={() => console.log('Waitlist')}
      />
      <ConnectorCard
        provider="epic_fhir"
        name="Epic FHIR"
        description="Electronic health records integration."
        state="connected"
        tier="enterprise"
        lastSyncedAt={new Date(Date.now() - 1800000)}
        dataPreview={{
          recordCount: 5432,
          quality: 99,
          summary: 'Clinical data synced successfully',
        }}
        onSync={() => console.log('Sync')}
        onConfigure={() => console.log('Configure')}
        onDisconnect={() => console.log('Disconnect')}
      />
      <ConnectorCard
        provider="siemens_bms"
        name="Siemens BMS"
        description="Building management system integration."
        state="syncing"
        tier="professional"
      />
      <ConnectorCard
        provider="cerner"
        name="Cerner"
        description="Healthcare data platform."
        state="error"
        tier="enterprise"
        error={{
          code: 'NETWORK_ERROR',
          message: 'Unable to connect to Cerner API.',
          action: 'contact_support',
        }}
        onReconnect={() => console.log('Reconnect')}
      />
      <ConnectorCard
        provider="johnson_controls"
        name="Johnson Controls"
        description="HVAC and facilities management."
        state="disconnected"
        tier="professional"
        onConnect={() => console.log('Connect')}
      />
    </div>
  ),
};

/**
 * Compact Grid - Space-efficient marketplace view
 */
export const CompactGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {[
        { name: 'UtilityAPI', state: 'early_access' as const },
        { name: 'Energy Star PM', state: 'connected' as const },
        { name: 'Epic FHIR', state: 'available' as const },
        { name: 'Siemens BMS', state: 'connected' as const },
        { name: 'Cerner', state: 'available' as const },
        { name: 'Johnson Controls', state: 'error' as const },
      ].map((item, i) => (
        <ConnectorCard
          key={i}
          provider="custom"
          name={item.name}
          description="Integration connector"
          state={item.state}
          variant="compact"
          tier="professional"
          onConnect={() => console.log('Connect')}
        />
      ))}
    </div>
  ),
};

/**
 * Error Handling - Different error scenarios
 */
export const ErrorScenarios: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ConnectorCard
        provider="utility_api"
        name="UtilityAPI"
        description="Authentication expired"
        state="error"
        error={{
          code: 'AUTH_EXPIRED',
          message: 'Your authentication has expired.',
          action: 'reconnect',
        }}
        onReconnect={() => console.log('Reconnect')}
      />
      <ConnectorCard
        provider="epic_fhir"
        name="Epic FHIR"
        description="Configuration error"
        state="error"
        error={{
          code: 'CONFIG_INVALID',
          message: 'Invalid API configuration detected.',
          action: 'reconfigure',
        }}
        onReconnect={() => console.log('Reconnect')}
      />
      <ConnectorCard
        provider="siemens_bms"
        name="Siemens BMS"
        description="Network connectivity issue"
        state="error"
        error={{
          code: 'NETWORK_ERROR',
          message: 'Unable to reach the Siemens API.',
          action: 'contact_support',
        }}
        onReconnect={() => console.log('Reconnect')}
      />
      <ConnectorCard
        provider="johnson_controls"
        name="Johnson Controls"
        description="Rate limit exceeded"
        state="error"
        error={{
          code: 'RATE_LIMIT',
          message: 'API rate limit exceeded. Please try again later.',
          action: 'reconnect',
        }}
        onReconnect={() => console.log('Reconnect')}
      />
    </div>
  ),
};
