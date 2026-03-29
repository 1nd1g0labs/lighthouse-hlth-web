import type { Meta, StoryObj } from '@storybook/react';
import { OperatorLayout } from './OperatorLayout';
import { QuickActionMenu } from './QuickActionMenu';
import { AlertList } from './AlertCard';

const meta = {
  title: 'Operator/OperatorLayout',
  component: OperatorLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OperatorLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content components
const SampleNav = () => (
  <div className="p-4 space-y-2">
    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Navigation</h3>
    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
      Dashboard
    </button>
    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
      Data Grooming
    </button>
    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors bg-primary-50 text-primary-600 font-medium">
      Emission Factors
    </button>
    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
      Trends & Analytics
    </button>
    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
      Reports
    </button>
  </div>
);

const SampleMainContent = () => (
  <div className="p-6">
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Emission Factor Matching</h1>
      <p className="text-gray-600">Review and approve suggested emission factors for your data</p>
    </div>
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <p className="text-gray-500 text-center">Main content area</p>
      <p className="text-gray-400 text-sm text-center mt-2">
        The DataGroomingTable component would appear here
      </p>
    </div>
  </div>
);

const SampleRightPanel = () => (
  <div className="flex flex-col h-full">
    <div className="p-4 border-b border-gray-200">
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Context</h3>
    </div>
    <div className="flex-1 overflow-auto">
      <QuickActionMenu showTitle={false} />
      <div className="p-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Alerts</h4>
        <AlertList
          alerts={[
            {
              id: '1',
              severity: 'high',
              title: 'Data Quality Issue',
              message: '15 items need review',
              timestamp: new Date(Date.now() - 3600000).toISOString(),
            },
          ]}
        />
      </div>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    leftNav: <SampleNav />,
    rightPanel: <SampleRightPanel />,
    children: <SampleMainContent />,
  },
};

export const LeftNavOnly: Story = {
  args: {
    leftNav: <SampleNav />,
    children: <SampleMainContent />,
  },
};

export const RightPanelOnly: Story = {
  args: {
    rightPanel: <SampleRightPanel />,
    children: <SampleMainContent />,
  },
};

export const MainContentOnly: Story = {
  args: {
    children: <SampleMainContent />,
  },
};

export const DefaultCollapsed: Story = {
  args: {
    leftNav: <SampleNav />,
    rightPanel: <SampleRightPanel />,
    children: <SampleMainContent />,
    defaultLeftNavOpen: false,
    defaultRightPanelOpen: false,
  },
};

export const CustomWidths: Story = {
  args: {
    leftNav: <SampleNav />,
    rightPanel: <SampleRightPanel />,
    children: <SampleMainContent />,
    leftNavWidth: 200,
    rightPanelWidth: 400,
  },
};

export const NoKeyboardShortcuts: Story = {
  args: {
    leftNav: <SampleNav />,
    rightPanel: <SampleRightPanel />,
    children: <SampleMainContent />,
    enableKeyboardShortcuts: false,
  },
};
