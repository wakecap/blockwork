import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import fs from 'fs';

// Check if public directory exists before adding it to staticDirs
// Try multiple possible locations for the public directory
const possiblePublicDirs = [
  path.resolve(__dirname, '../public'),
  path.resolve(process.cwd(), 'public'),
  path.resolve(process.cwd(), './public'),
];

const publicDir = possiblePublicDirs.find(dir => fs.existsSync(dir));
const staticDirs = publicDir ? [publicDir] : [];

// Debug information for CI environments
if (process.env.CI || process.env.GITHUB_ACTIONS) {
  console.log('🔍 Storybook CI Debug Info:');
  console.log('Current working directory:', process.cwd());
  console.log('__dirname:', __dirname);
  console.log('Possible public directories:', possiblePublicDirs);
  console.log('Public directory exists:', publicDir);
  console.log('Static dirs:', staticDirs);
}

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
  features: {},
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs,
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