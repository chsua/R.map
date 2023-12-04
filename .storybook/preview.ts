import type { Preview } from '@storybook/react';
import { worker } from '../mocks/worker';
import '../app/globals.css';

if (typeof global.process === 'undefined') {
  worker.start();
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
