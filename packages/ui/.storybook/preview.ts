import type { Preview } from '@storybook/react';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FFFFFF',
        },
        {
          name: 'gray',
          value: '#F9FAFB',
        },
        {
          name: 'dark',
          value: '#111827',
        },
      ],
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;
