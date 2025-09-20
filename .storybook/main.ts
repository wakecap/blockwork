import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

function getDirname(metaUrl: string) {
  return dirname(fileURLToPath(metaUrl));
}

const config: StorybookConfig = {
  stories: [
    "../src/design-system/stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-a11y", 
    '@storybook/addon-docs',
    '@storybook/addon-interactions',
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  core: {
    disableTelemetry: true,
  },

  typescript: {
    check: false,
  },

  async viteFinal(config) {
    const __dirname = getDirname(import.meta.url);
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': join(__dirname, '../'),
        },
      },
    });
  }
};

export default config; 