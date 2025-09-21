import { addons } from 'storybook/manager-api';
import { themes } from 'storybook/theming';

// Custom Blockwork theme
const blockworkTheme = {
  ...themes.light,
  
  // Brand configuration - Logo only, no text
  brandTitle: '',
  brandUrl: 'https://github.com/wakecap/blockwork',
  brandImage: './blockwork-logo.png',
  brandTarget: '_self',
  
  // Color scheme
  colorPrimary: '#ea580c', // Orange accent
  colorSecondary: '#171717', // Black primary
  
  // UI colors
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#e5e5e5',
  appBorderRadius: 8,
  
  // Text colors
  textColor: '#171717',
  textInverseColor: '#ffffff',
  textMutedColor: '#737373',
  
  // Toolbar colors
  barTextColor: '#ffffff',
  barSelectedColor: '#ea580c',
  barBg: '#171717',
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e5e5e5',
  inputTextColor: '#171717',
  inputBorderRadius: 4,
  
  // Button colors
  buttonBg: '#ea580c',
  buttonBorder: '#ea580c',
  booleanBg: '#f5f5f5',
  booleanSelectedBg: '#ea580c',
  
  // Typography
  fontBase: '"Figtree", system-ui, -apple-system, sans-serif',
  fontCode: '"SF Mono", Consolas, monospace',
  
  // Layout
  base: 'light',
  borderRadius: 8,
  
  // Custom properties - Logo only
  brand: {
    title: '',
    url: 'https://github.com/wakecap/blockwork',
    image: './blockwork-logo.png',
    target: '_self',
  },
};

addons.setConfig({
  theme: blockworkTheme,
  panelPosition: 'bottom',
  selectedPanel: 'controls',
  initialActive: 'sidebar',
  showNav: true,
  showPanel: true,
  showToolbar: true,
  enableShortcuts: true,
  showCanvas: true,
  showDocsPage: true,
});
