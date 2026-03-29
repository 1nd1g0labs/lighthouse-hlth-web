import type { Meta, StoryObj } from '@storybook/react';
import { GHGCategoryBadge } from './GHGCategoryBadge';
import { Factory, Zap, ShoppingCart, Trash2 } from 'lucide-react';

/**
 * GHGCategoryBadge displays emission categories following GHG Protocol standards.
 *
 * ## Usage Guidelines
 *
 * ### Color Semantics
 * - **Scope 1 (Amber)**: Direct emissions - on-site fuel, company vehicles
 * - **Scope 2 (Blue)**: Energy emissions - purchased electricity, heating/cooling
 * - **Scope 3 (Teal)**: Supply chain - purchased goods, transportation, waste
 * - **Waste (Emerald)**: Waste management - disposal, treatment, recycling
 *
 * ### Accessibility
 * - All color combinations meet WCAG 2.1 AA standards
 * - Includes aria-label for screen readers
 * - Role="status" for semantic clarity
 *
 * ### Use Cases
 * - Dashboard metric cards
 * - Chart legends and labels
 * - Emission breakdowns
 * - Facility comparison tables
 */
const meta = {
  title: 'Components/GHGCategoryBadge',
  component: GHGCategoryBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Healthcare sustainability badge component for GHG emission categories. Follows GHG Protocol standards with WCAG 2.1 AA compliant colors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'select',
      options: ['scope1', 'scope2', 'scope3', 'waste'],
      description: 'GHG emission category',
      table: {
        type: { summary: 'scope1 | scope2 | scope3 | waste' },
        defaultValue: { summary: 'scope1' },
      },
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'light'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'solid | outline | light' },
        defaultValue: { summary: 'solid' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    pill: {
      control: 'boolean',
      description: 'Apply pill-shaped border radius',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
} satisfies Meta<typeof GHGCategoryBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default badge with Scope 1 (Direct Emissions) styling.
 * Use for on-site fuel combustion, company vehicles.
 */
export const Default: Story = {
  args: {
    category: 'scope1',
    children: 'Scope 1',
  },
};

/**
 * All four emission categories in solid style.
 * Standard display for charts and dashboards.
 */
export const AllCategories: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <GHGCategoryBadge category="scope1">Scope 1: Direct</GHGCategoryBadge>
      <GHGCategoryBadge category="scope2">Scope 2: Energy</GHGCategoryBadge>
      <GHGCategoryBadge category="scope3">Scope 3: Supply Chain</GHGCategoryBadge>
      <GHGCategoryBadge category="waste">Waste Management</GHGCategoryBadge>
    </div>
  ),
};

/**
 * Outline variant with border only.
 * Use for secondary emphasis or light backgrounds.
 */
export const OutlineVariant: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <GHGCategoryBadge category="scope1" variant="outline">
        Scope 1
      </GHGCategoryBadge>
      <GHGCategoryBadge category="scope2" variant="outline">
        Scope 2
      </GHGCategoryBadge>
      <GHGCategoryBadge category="scope3" variant="outline">
        Scope 3
      </GHGCategoryBadge>
      <GHGCategoryBadge category="waste" variant="outline">
        Waste
      </GHGCategoryBadge>
    </div>
  ),
};

/**
 * Light variant with tinted background.
 * Use for subtle emphasis on white backgrounds.
 */
export const LightVariant: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <GHGCategoryBadge category="scope1" variant="light">
        Scope 1
      </GHGCategoryBadge>
      <GHGCategoryBadge category="scope2" variant="light">
        Scope 2
      </GHGCategoryBadge>
      <GHGCategoryBadge category="scope3" variant="light">
        Scope 3
      </GHGCategoryBadge>
      <GHGCategoryBadge category="waste" variant="light">
        Waste
      </GHGCategoryBadge>
    </div>
  ),
};

/**
 * Size variations: small, medium, large.
 * Choose based on context (charts vs. headers).
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <GHGCategoryBadge category="scope2" size="sm">
          Small
        </GHGCategoryBadge>
        <GHGCategoryBadge category="scope2" size="md">
          Medium
        </GHGCategoryBadge>
        <GHGCategoryBadge category="scope2" size="lg">
          Large
        </GHGCategoryBadge>
      </div>
    </div>
  ),
};

/**
 * Pill-shaped badges with rounded borders.
 * Modern appearance for contemporary dashboards.
 */
export const PillShape: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <GHGCategoryBadge category="scope1" pill>
        Scope 1
      </GHGCategoryBadge>
      <GHGCategoryBadge category="scope2" pill>
        Scope 2
      </GHGCategoryBadge>
      <GHGCategoryBadge category="scope3" pill>
        Scope 3
      </GHGCategoryBadge>
      <GHGCategoryBadge category="waste" pill>
        Waste
      </GHGCategoryBadge>
    </div>
  ),
};

/**
 * Badges with icons for enhanced context.
 * Icons help quick visual identification.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <GHGCategoryBadge category="scope1" leftIcon={<Factory className="h-3 w-3" />}>
        Direct
      </GHGCategoryBadge>
      <GHGCategoryBadge category="scope2" leftIcon={<Zap className="h-3 w-3" />}>
        Energy
      </GHGCategoryBadge>
      <GHGCategoryBadge category="scope3" leftIcon={<ShoppingCart className="h-3 w-3" />}>
        Supply Chain
      </GHGCategoryBadge>
      <GHGCategoryBadge category="waste" leftIcon={<Trash2 className="h-3 w-3" />}>
        Waste
      </GHGCategoryBadge>
    </div>
  ),
};

/**
 * Usage in dashboard metric cards.
 * Shows how badges integrate with real metrics.
 */
export const InMetricCard: Story = {
  render: () => (
    <div className="w-80 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">Total Emissions</p>
          <GHGCategoryBadge category="scope2" size="sm">
            Energy
          </GHGCategoryBadge>
        </div>
        <p className="text-2xl font-bold tabular-nums">1,234</p>
        <p className="text-xs text-gray-500">tons CO2e / year</p>
        <div className="pt-4 flex flex-wrap gap-2">
          <GHGCategoryBadge category="scope1" variant="light" size="sm">
            450 tons
          </GHGCategoryBadge>
          <GHGCategoryBadge category="scope2" variant="light" size="sm">
            584 tons
          </GHGCategoryBadge>
          <GHGCategoryBadge category="scope3" variant="light" size="sm">
            200 tons
          </GHGCategoryBadge>
        </div>
      </div>
    </div>
  ),
};

/**
 * Chart legend example.
 * Use for donut/pie charts showing emission breakdown.
 */
export const ChartLegend: Story = {
  render: () => (
    <div className="w-80 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Emissions Breakdown</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-scope1" />
            <span className="text-sm">Scope 1: Direct</span>
          </div>
          <span className="text-sm font-medium tabular-nums">36.5%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-scope2" />
            <span className="text-sm">Scope 2: Energy</span>
          </div>
          <span className="text-sm font-medium tabular-nums">47.3%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-scope3" />
            <span className="text-sm">Scope 3: Supply Chain</span>
          </div>
          <span className="text-sm font-medium tabular-nums">16.2%</span>
        </div>
      </div>
    </div>
  ),
};

/**
 * Stacked badge combinations.
 * Shows multiple categories together in constrained spaces.
 */
export const StackedCombinations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium mb-2">All Variants - Scope 1</p>
        <div className="flex flex-wrap gap-2">
          <GHGCategoryBadge category="scope1" variant="solid">
            Solid
          </GHGCategoryBadge>
          <GHGCategoryBadge category="scope1" variant="outline">
            Outline
          </GHGCategoryBadge>
          <GHGCategoryBadge category="scope1" variant="light">
            Light
          </GHGCategoryBadge>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">All Variants - Scope 2</p>
        <div className="flex flex-wrap gap-2">
          <GHGCategoryBadge category="scope2" variant="solid">
            Solid
          </GHGCategoryBadge>
          <GHGCategoryBadge category="scope2" variant="outline">
            Outline
          </GHGCategoryBadge>
          <GHGCategoryBadge category="scope2" variant="light">
            Light
          </GHGCategoryBadge>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">All Variants - Scope 3</p>
        <div className="flex flex-wrap gap-2">
          <GHGCategoryBadge category="scope3" variant="solid">
            Solid
          </GHGCategoryBadge>
          <GHGCategoryBadge category="scope3" variant="outline">
            Outline
          </GHGCategoryBadge>
          <GHGCategoryBadge category="scope3" variant="light">
            Light
          </GHGCategoryBadge>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium mb-2">All Variants - Waste</p>
        <div className="flex flex-wrap gap-2">
          <GHGCategoryBadge category="waste" variant="solid">
            Solid
          </GHGCategoryBadge>
          <GHGCategoryBadge category="waste" variant="outline">
            Outline
          </GHGCategoryBadge>
          <GHGCategoryBadge category="waste" variant="light">
            Light
          </GHGCategoryBadge>
        </div>
      </div>
    </div>
  ),
};

/**
 * Accessibility validation example.
 * All variants meet WCAG 2.1 AA contrast requirements.
 */
export const AccessibilityCompliant: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <p className="text-sm font-medium text-green-800 mb-3">
          All color combinations meet WCAG 2.1 AA standards (4.5:1 contrast ratio)
        </p>
        <div className="flex flex-wrap gap-2">
          <GHGCategoryBadge category="scope1">Amber - Pass</GHGCategoryBadge>
          <GHGCategoryBadge category="scope2">Blue - Pass</GHGCategoryBadge>
          <GHGCategoryBadge category="scope3">Teal - Pass</GHGCategoryBadge>
          <GHGCategoryBadge category="waste">Emerald - Pass</GHGCategoryBadge>
        </div>
      </div>
      <div className="text-xs text-gray-600">
        <p className="font-medium mb-1">Accessibility Features:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>aria-label provides context for screen readers</li>
          <li>role="status" for semantic clarity</li>
          <li>High contrast text on colored backgrounds</li>
          <li>Consistent sizing for touch targets</li>
        </ul>
      </div>
    </div>
  ),
};

/**
 * Multi-facility comparison table.
 * Shows how badges work in data tables.
 */
export const InDataTable: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-semibold">Facility</th>
            <th className="text-left py-3 px-4 text-sm font-semibold">Category</th>
            <th className="text-right py-3 px-4 text-sm font-semibold">Emissions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="py-3 px-4 text-sm">Main Hospital</td>
            <td className="py-3 px-4">
              <GHGCategoryBadge category="scope1" size="sm" variant="light">
                Scope 1
              </GHGCategoryBadge>
            </td>
            <td className="py-3 px-4 text-sm text-right tabular-nums">450 tons</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-3 px-4 text-sm">Main Hospital</td>
            <td className="py-3 px-4">
              <GHGCategoryBadge category="scope2" size="sm" variant="light">
                Scope 2
              </GHGCategoryBadge>
            </td>
            <td className="py-3 px-4 text-sm text-right tabular-nums">584 tons</td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="py-3 px-4 text-sm">Outpatient Center</td>
            <td className="py-3 px-4">
              <GHGCategoryBadge category="scope3" size="sm" variant="light">
                Scope 3
              </GHGCategoryBadge>
            </td>
            <td className="py-3 px-4 text-sm text-right tabular-nums">200 tons</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};
