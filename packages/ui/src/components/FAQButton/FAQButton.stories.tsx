import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FAQButton } from './FAQButton';

const meta = {
  title: 'Tier 2/FAQButton',
  component: FAQButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accordion button for FAQ items with active/inactive states. Used for patient education materials and healthcare sustainability FAQs.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isActive: {
      control: 'boolean',
      description: 'Whether the FAQ item is expanded',
    },
    onToggle: {
      action: 'toggled',
      description: 'Callback when the button is toggled',
    },
  },
} satisfies Meta<typeof FAQButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'What is operational sustainability in healthcare?',
    isActive: false,
  },
};

export const Active: Story = {
  args: {
    children: 'How does Lighthouse HLTH help reduce carbon emissions?',
    isActive: true,
  },
};

export const Interactive: Story = {
  args: {
    children: 'FAQ Question',
  },
  render: () => {
    const FAQInteractive = () => {
      const [activeIndex, setActiveIndex] = useState<number | null>(null);

      const faqs = [
        'What is operational sustainability?',
        'How can healthcare reduce waste?',
        'What is the Laudato Si\' framework?',
        'How does sustainability improve margins?',
      ];

      return (
        <div className="w-[600px] space-y-2">
          {faqs.map((question, index) => (
            <FAQButton
              key={index}
              isActive={activeIndex === index}
              onToggle={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            >
              {question}
            </FAQButton>
          ))}
        </div>
      );
    };

    return <FAQInteractive />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive accordion where only one FAQ can be open at a time.',
      },
    },
  },
};

export const PatientEducation: Story = {
  args: {
    children: 'FAQ Question',
  },
  render: () => {
    const PatientFAQ = () => {
      const [open1, setOpen1] = useState(false);
      const [open2, setOpen2] = useState(false);

      return (
        <div className="w-[600px] space-y-4">
          <div>
            <FAQButton isActive={open1} onToggle={() => setOpen1(!open1)}>
              How does sustainable healthcare benefit patients?
            </FAQButton>
            {open1 && (
              <div className="mt-2 px-4 py-3 text-14 text-gray-700 bg-gray-50 rounded-md">
                Sustainable healthcare practices reduce environmental toxins,
                improve air quality, and create healthier healing environments
                for patients and staff.
              </div>
            )}
          </div>

          <div>
            <FAQButton isActive={open2} onToggle={() => setOpen2(!open2)}>
              What is the connection between sustainability and charity care?
            </FAQButton>
            {open2 && (
              <div className="mt-2 px-4 py-3 text-14 text-gray-700 bg-gray-50 rounded-md">
                By reducing operational waste and improving efficiency, health
                systems can redirect savings toward charity care and serving
                vulnerable populations.
              </div>
            )}
          </div>
        </div>
      );
    };

    return <PatientFAQ />;
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example FAQ section for patient education with expandable answers.',
      },
    },
  },
};

export const LongQuestions: Story = {
  args: {
    children:
      'How can Catholic health systems align their operations with the creation care principles outlined in Laudato Si\' while maintaining financial sustainability?',
    isActive: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'FAQ button handles long questions gracefully with text wrapping.',
      },
    },
  },
};
