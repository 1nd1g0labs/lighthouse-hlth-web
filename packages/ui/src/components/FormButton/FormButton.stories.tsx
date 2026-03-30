import type { Meta, StoryObj } from '@storybook/react';
import { FormButton } from './FormButton';

/**
 * FormButton - Framer-aligned form submission button with comprehensive state management
 *
 * Framer Component ID: u_ERU5JMM
 *
 * **Design Specifications:**
 * - Background: #057C8B (primary-500) for default/success, rgba(255, 34, 68, 0.15) for error
 * - Text: 18px Inter medium
 * - Border radius: fully rounded (1000px in Framer)
 * - Padding: 12px 32px
 * - Minimum height: 48px (WCAG touch target)
 *
 * **7 States:**
 * 1. Default - Ready for interaction
 * 2. Hover - Darker background on hover
 * 3. Loading - Spinner animation, prevents interaction
 * 4. Active - Pressed state
 * 5. Disabled - Reduced opacity, no interaction
 * 6. Success - Checkmark icon + success message
 * 7. Error - Error background + error icon + message
 *
 * **Accessibility:**
 * - WCAG 2.1 AA compliant color contrast
 * - 48px minimum touch target
 * - ARIA attributes for state changes
 * - Keyboard accessible (Tab, Enter, Space)
 * - Screen reader announcements via aria-live
 *
 * **Use Cases:**
 * - Patient registration forms
 * - Sustainability reporting submissions
 * - Contact forms
 * - Survey submissions
 * - Any form requiring clear submission feedback
 */
const meta = {
  title: 'Components/FormButton',
  component: FormButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A healthcare-optimized form submission button with 7 distinct states for clear user feedback. Matches Framer design system exactly (nodeId: u_ERU5JMM).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['default', 'loading', 'disabled', 'success', 'error'],
      description: 'Current button state',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    loadingText: {
      control: 'text',
      description: 'Text displayed during loading state',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Submitting...' },
      },
    },
    successText: {
      control: 'text',
      description: 'Text displayed in success state',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Success!' },
      },
    },
    errorText: {
      control: 'text',
      description: 'Text displayed in error state',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Error. Please try again.' },
      },
    },
    children: {
      control: 'text',
      description: 'Button content (shown in default state)',
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: 'Submit your form' },
      },
    },
  },
} satisfies Meta<typeof FormButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state - Ready for user interaction
 * Teal background (#057C8B), white text, hover effect enabled
 */
export const Default: Story = {
  args: {
    children: 'Submit your form',
    state: 'default',
  },
};

/**
 * Loading state - Animated spinner with loading message
 * Prevents further clicks, provides clear "in-progress" feedback
 */
export const Loading: Story = {
  args: {
    state: 'loading',
    loadingText: 'Submitting...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows animated spinner during form submission. Prevents duplicate submissions.',
      },
    },
  },
};

/**
 * Disabled state - Visually indicates button is unavailable
 * Reduced opacity (0.85), no pointer events
 */
export const Disabled: Story = {
  args: {
    state: 'disabled',
    children: 'Submit your form',
  },
  parameters: {
    docs: {
      description: {
        story: 'Used when form validation fails or required fields are incomplete.',
      },
    },
  },
};

/**
 * Success state - Checkmark icon with success message
 * Provides positive feedback after successful submission
 */
export const Success: Story = {
  args: {
    state: 'success',
    successText: 'Form submitted successfully!',
  },
  parameters: {
    docs: {
      description: {
        story: 'Displayed after successful form submission. Builds user confidence.',
      },
    },
  },
};

/**
 * Error state - Distinct error background with error icon
 * Background: rgba(255, 34, 68, 0.15), red text and icon
 */
export const Error: Story = {
  args: {
    state: 'error',
    errorText: 'Submission failed. Please check your connection and try again.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Displayed when submission fails. Use specific error messages to guide users.',
      },
    },
  },
};

/**
 * Custom Loading Text
 * Personalize the loading message for different form contexts
 */
export const CustomLoadingText: Story = {
  args: {
    state: 'loading',
    loadingText: 'Saving your sustainability report...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Customize loading text to match your form context (e.g., "Saving report...", "Scheduling appointment...").',
      },
    },
  },
};

/**
 * Custom Success Message
 * Personalize success feedback for better user experience
 */
export const CustomSuccessMessage: Story = {
  args: {
    state: 'success',
    successText: 'Appointment scheduled! Check your email for confirmation.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Provide context-specific success messages to inform users of next steps.',
      },
    },
  },
};

/**
 * Specific Error Guidance
 * Help users understand and resolve errors
 */
export const SpecificErrorGuidance: Story = {
  args: {
    state: 'error',
    errorText: 'Email address is already registered. Try logging in instead.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Provide actionable error messages that guide users toward resolution.',
      },
    },
  },
};

/**
 * Interactive Playground
 * Test all states and customize all props
 */
export const Playground: Story = {
  args: {
    children: 'Submit your form',
    state: 'default',
    loadingText: 'Submitting...',
    successText: 'Success!',
    errorText: 'Error. Please try again.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Experiment with all props and states. Use the Controls panel to test different combinations.',
      },
    },
  },
};

/**
 * State Sequence Demo
 * Demonstrates common state progression in a form workflow
 */
export const StateSequenceDemo: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-neutral-700">
          1. Default (ready for submission)
        </p>
        <FormButton state="default">Submit Patient Form</FormButton>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-neutral-700">
          2. Loading (submitting to server)
        </p>
        <FormButton state="loading" loadingText="Submitting patient data..." />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-neutral-700">
          3. Success (submission complete)
        </p>
        <FormButton
          state="success"
          successText="Patient registered successfully!"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-neutral-700">
          4. Error (submission failed)
        </p>
        <FormButton
          state="error"
          errorText="Registration failed. Please verify all required fields."
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common state progression: Default → Loading → Success (or Error if failure occurs).',
      },
    },
  },
};

/**
 * Accessibility Features Demo
 * Highlights WCAG 2.1 AA compliance features
 */
export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-2">
          WCAG 2.1 AA Compliance Features
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700">
          <li>Color contrast: 4.71:1 (primary-500 on white) - Exceeds 4.5:1 requirement</li>
          <li>Touch target: 48px minimum height - Exceeds 44px requirement</li>
          <li>Focus indicator: 2px ring at 3:1 contrast - Meets requirement</li>
          <li>Keyboard navigation: Full Tab, Enter, Space support</li>
          <li>Screen reader: aria-busy, aria-disabled, aria-live announcements</li>
          <li>Motion: Respects prefers-reduced-motion for spinner animation</li>
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium text-neutral-700">
          Try keyboard navigation: Tab to focus, Enter/Space to activate
        </p>
        <FormButton state="default">Keyboard Accessible Button</FormButton>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium text-neutral-700">
          Loading state announces "busy" to screen readers
        </p>
        <FormButton state="loading" loadingText="Processing..." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates accessibility features ensuring FormButton is usable by all users, including those with disabilities.',
      },
    },
  },
};
