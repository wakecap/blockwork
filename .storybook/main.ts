import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    '../src/design-system/stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
  ],
  features: {
    storyStoreV7: true,
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: [path.resolve(__dirname, '../public')],
  typescript: {
    check: false,
  },
  viteFinal: async (config) => {
    // Fix acorn parsing issues
    config.esbuild = {
      ...config.esbuild,
      target: 'es2020',
    };
    
    // Add PostCSS configuration for Tailwind
    config.css = {
      ...config.css,
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    };
    
    // Add additional configuration for better parsing
    config.define = {
      ...config.define,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    };
    
    return config;
  },
};

export default config;