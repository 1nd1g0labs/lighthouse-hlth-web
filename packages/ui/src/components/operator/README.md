# Operator Workflow Components

Production-ready components for healthcare operator data workflows, designed for the CommonSpirit demo and operational sustainability tracking.

## Components

### 1. **ConfidenceBadge**
Color-coded confidence scores for emission factor matches.

**Features:**
- Automatic level detection (high ≥80%, medium 50-79%, low <50%)
- Size variants: sm, md, lg
- WCAG 2.1 AA compliant colors

**Usage:**
```tsx
import { ConfidenceBadge } from '@1nd1g0labs/lighthouse-hlth-ui';

<ConfidenceBadge score={85} size="sm" />
```

---

### 2. **DataGroomingTable**
Virtualized table for reviewing and approving emission factor matches.

**Features:**
- Virtual scrolling for 1000+ rows (@tanstack/react-virtual)
- Inline factor selection with confidence badges
- Batch operations (select all, approve, reject)
- Keyboard shortcuts: j/k (navigate), Space (select), Enter (approve)
- Density variants: compact, comfortable, spacious

**Usage:**
```tsx
import { DataGroomingTable } from '@1nd1g0labs/lighthouse-hlth-ui';

const lineItems = [
  {
    id: '1',
    description: 'Natural Gas - Building A',
    quantity: 1250,
    unit: 'therms',
    suggestedFactor: {
      id: 'ef-123',
      name: 'Natural Gas - Stationary Combustion',
      confidence: 92
    }
  }
];

<DataGroomingTable
  lineItems={lineItems}
  onApprove={(itemId, factorId) => console.log('Approved')}
  density="comfortable"
/>
```

---

### 3. **EmissionFactorMatcher**
Search and select emission factors with confidence scoring.

**Features:**
- Debounced search (300ms delay)
- Confidence visualization with badges
- Audit trail display (usage count, last used)
- Explanation tooltips
- Modal and inline variants

**Usage:**
```tsx
import { EmissionFactorMatcher } from '@1nd1g0labs/lighthouse-hlth-ui';

const factors = [
  {
    id: 'ef-1',
    name: 'Natural Gas - Stationary Combustion',
    category: 'Scope 1 - Direct Emissions',
    confidence: 92,
    usageCount: 145,
    lastUsed: '2024-11-15',
    explanation: 'Based on description matching and usage patterns'
  }
];

<EmissionFactorMatcher
  factors={factors}
  onSelect={(factor) => console.log('Selected:', factor)}
  variant="inline"
/>
```

---

### 4. **ConsumptionTrendsChart**
Multi-series line chart for tracking emissions trends.

**Features:**
- Scope 1/2/3 with distinct colors (amber/blue/teal)
- Practice Greenhealth benchmark overlay
- Time range toggle: MTD, QTD, YTD, Custom
- Normalization toggle: Total, Per APD, Per sqft
- CSV export functionality
- Responsive design

**Usage:**
```tsx
import { ConsumptionTrendsChart } from '@1nd1g0labs/lighthouse-hlth-ui';

const data = [
  {
    date: '2024-01',
    scope1: 1250,
    scope2: 3420,
    scope3: 8750,
    benchmark: 4200
  }
];

<ConsumptionTrendsChart
  data={data}
  onExport={(data) => downloadCSV(data)}
  size="lg"
/>
```

---

### 5. **AlertCard**
System alerts with severity-based styling and actions.

**Features:**
- Severity variants: critical, high, medium, low, info
- Icon + color coding (accessible)
- Metric display with sparkline
- Actions: Acknowledge, Create Action Plan, Dismiss
- Framer Motion animations
- ARIA live regions

**Usage:**
```tsx
import { AlertCard } from '@1nd1g0labs/lighthouse-hlth-ui';

<AlertCard
  severity="critical"
  title="Energy Consumption Spike"
  message="Natural gas usage increased by 45% in the last hour"
  metric={{
    value: 1850,
    unit: 'therms',
    change: 45,
    trend: 'up'
  }}
  onAcknowledge={() => console.log('Acknowledged')}
/>
```

---

### 6. **OperatorLayout**
Three-column responsive layout with collapsible sidebars.

**Features:**
- Collapsible left nav and right panel
- Keyboard shortcuts: Ctrl+[ (toggle left), Ctrl+] (toggle right)
- Responsive: Mobile overlays, tablet/desktop columns
- Accessibility: Landmark regions, focus management

**Usage:**
```tsx
import { OperatorLayout } from '@1nd1g0labs/lighthouse-hlth-ui';

<OperatorLayout
  leftNav={<NavigationMenu />}
  rightPanel={<ContextPanel />}
>
  <MainContent />
</OperatorLayout>
```

---

### 7. **QuickActionMenu**
Right panel shortcuts for common operator actions.

**Features:**
- Quick access to common actions
- Badge counts for notifications
- Keyboard accessible
- Default actions: Connect Provider, Alert Rules, Export Report, Settings

**Usage:**
```tsx
import { QuickActionMenu } from '@1nd1g0labs/lighthouse-hlth-ui';

const actions = [
  {
    id: 'connect-provider',
    label: 'Connect Provider',
    description: 'Link new data source',
    icon: 'link',
    onClick: () => console.log('Connect')
  }
];

<QuickActionMenu actions={actions} />
```

---

## Accessibility

All components meet WCAG 2.1 AA standards:
- **Color contrast**: 4.5:1 for text, 3:1 for UI components
- **Keyboard navigation**: Full Tab, Enter, Esc, Arrow key support
- **Focus indicators**: Visible 2px ring in primary color
- **Screen reader support**: Semantic HTML, proper ARIA labels
- **Touch targets**: Minimum 44x44px on mobile
- **Motion sensitivity**: Respects `prefers-reduced-motion`

---

## Performance

- **Table virtualization**: Handles 1000+ rows efficiently
- **Chart rendering**: <300ms render time
- **Debounced search**: 300ms delay for optimal UX
- **Optimistic updates**: Instant feedback for mutations
- **Component bundle size**: <50KB per component

---

## Storybook

View interactive documentation and examples:

```bash
npm run storybook
```

Navigate to **Operator/** category to see all components.

---

## Demo Integration

These components are designed for the CommonSpirit demo:
- 3 facilities in dropdown
- 12 months of trend data
- 15-30 pending line items
- 5-10 active alerts

---

## Dependencies

Required peer dependencies:
- `react@^18.0.0`
- `react-dom@^18.0.0`

Included dependencies:
- `@tanstack/react-virtual@^3.0.0` - Table virtualization
- `recharts@^2.0.0` - Charts
- `framer-motion@^11.0.0` - Animations
- `lucide-react@^0.344.0` - Icons
- `class-variance-authority@^0.7.0` - Variant management
