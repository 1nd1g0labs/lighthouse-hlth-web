import type { Meta, StoryObj } from '@storybook/react';
import { QuickActionMenu, type QuickAction } from './QuickActionMenu';

const meta = {
  title: 'Operator/QuickActionMenu',
  component: QuickActionMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuickActionMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockActions: QuickAction[] = [
  {
    id: 'connect-provider',
    label: 'Connect Provider',
    description: 'Link new data source',
    icon: 'link',
    onClick: () => console.log('Connect provider'),
  },
  {
    id: 'set-alert',
    label: 'Alert Rules',
    description: 'Configure notifications',
    icon: 'bell',
    badge: 3,
    onClick: () => console.log('Set alert rules'),
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

export const Default: Story = {
  args: {},
};

export const CustomActions: Story = {
  args: {
    actions: mockActions,
  },
};

export const WithBadges: Story = {
  args: {
    actions: [
      ...mockActions.slice(0, 1),
      {
        id: 'notifications',
        label: 'Notifications',
        description: 'Unread alerts',
        icon: 'bell',
        badge: 12,
        onClick: () => console.log('Notifications'),
      },
      {
        id: 'reports',
        label: 'Reports',
        description: 'Pending reviews',
        icon: 'file',
        badge: 5,
        onClick: () => console.log('Reports'),
      },
    ],
  },
};

export const WithDisabledAction: Story = {
  args: {
    actions: [
      ...mockActions.slice(0, 2),
      {
        id: 'export-disabled',
        label: 'Export Report',
        description: 'No data available',
        icon: 'file',
        isDisabled: true,
        onClick: () => console.log('Export (disabled)'),
      },
      ...mockActions.slice(3),
    ],
  },
};

export const NoTitle: Story = {
  args: {
    actions: mockActions,
    showTitle: false,
  },
};

export const CustomTitle: Story = {
  args: {
    actions: mockActions,
    title: 'Common Tasks',
  },
};
