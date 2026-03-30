import type { Meta, StoryObj } from '@storybook/react';
import { AlertCard, AlertList, type AlertSeverity, type AlertMetric } from './AlertCard';

const meta = {
  title: 'Operator/AlertCard',
  component: AlertCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['critical', 'high', 'medium', 'low', 'info'],
    },
  },
} satisfies Meta<typeof AlertCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockMetric: AlertMetric = {
  value: 1850,
  unit: 'therms',
  change: 45,
  trend: 'up',
  sparklineData: [1200, 1250, 1300, 1400, 1500, 1650, 1750, 1850],
};

export const Critical: Story = {
  args: {
    severity: 'critical',
    title: 'Energy Consumption Spike',
    message: 'Natural gas usage increased by 45% in the last hour',
    metric: mockMetric,
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(), // 5 min ago
    onAcknowledge: () => console.log('Acknowledged'),
    onCreateActionPlan: () => console.log('Create plan'),
    onDismiss: () => console.log('Dismissed'),
  },
};

export const High: Story = {
  args: {
    severity: 'high',
    title: 'Unusual Energy Pattern Detected',
    message: 'Electricity consumption exceeds historical average by 30%',
    metric: {
      value: 52000,
      unit: 'kWh',
      change: 30,
      trend: 'up',
    },
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
    onAcknowledge: () => console.log('Acknowledged'),
    onDismiss: () => console.log('Dismissed'),
  },
};

export const Medium: Story = {
  args: {
    severity: 'medium',
    title: 'Data Quality Issue',
    message: '15 line items require manual factor assignment',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    onAcknowledge: () => console.log('Acknowledged'),
  },
};

export const Low: Story = {
  args: {
    severity: 'low',
    title: 'Monthly Report Ready',
    message: 'Your November emissions report is available for download',
    timestamp: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 days ago
  },
};

export const Info: Story = {
  args: {
    severity: 'info',
    title: 'System Update Scheduled',
    message: 'Planned maintenance window: Saturday 2AM-4AM EST',
    timestamp: new Date(Date.now() - 7 * 86400000).toISOString(), // 1 week ago
  },
};

export const Acknowledged: Story = {
  args: {
    severity: 'high',
    title: 'Issue Acknowledged',
    message: 'This alert has been acknowledged and is being addressed',
    isAcknowledged: true,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
};

export const WithoutActions: Story = {
  args: {
    severity: 'critical',
    title: 'Read-Only Alert',
    message: 'This alert is informational only and requires no action',
    showActions: false,
  },
};

export const MultipleAlerts: Story = {
  args: {
    severity: 'critical',
    title: 'Multiple Alerts',
    message: 'Example alert',
  },
  render: () => (
    <div className="w-full max-w-2xl">
      <AlertList
        alerts={[
          {
            id: '1',
            severity: 'critical',
            title: 'Energy Consumption Spike',
            message: 'Natural gas usage increased by 45% in the last hour',
            metric: mockMetric,
            timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
            onAcknowledge: () => console.log('Acknowledged 1'),
            onDismiss: () => console.log('Dismissed 1'),
          },
          {
            id: '2',
            severity: 'high',
            title: 'Unusual Energy Pattern',
            message: 'Electricity consumption exceeds historical average',
            timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
            onAcknowledge: () => console.log('Acknowledged 2'),
          },
          {
            id: '3',
            severity: 'medium',
            title: 'Data Quality Issue',
            message: '15 line items require manual factor assignment',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: '4',
            severity: 'info',
            title: 'System Update Scheduled',
            message: 'Planned maintenance window: Saturday 2AM-4AM EST',
            timestamp: new Date(Date.now() - 7 * 86400000).toISOString(),
          },
        ]}
      />
    </div>
  ),
};
