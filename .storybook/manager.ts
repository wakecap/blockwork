import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

// Custom Blockwork theme for Storybook 9
const blockworkTheme = create({
  base: 'light',
  
  // Brand configuration - Logo only, no text
  brandTitle: '',
  brandUrl: 'https://github.com/wakecap/blockwork',
  brandImage: '/blockwork-logo.png',
  brandTarget: '_self',
  
  // Color scheme
  colorPrimary: '#ea580c', // Orange accent
  colorSecondary: '#171717', // Black primary
  
  // UI colors
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#e5e5e5',
  appBorderRadius: 12,
  
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
  inputBorderRadius: 12,
  
  // Button colors
  buttonBg: '#ea580c',
  buttonBorder: '#ea580c',
  booleanBg: '#f5f5f5',
  booleanSelectedBg: '#ea580c',
  
  // Typography
  fontBase: '"Figtree", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  fontCode: '"JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace',
  
  // Layout
  borderRadius: 12,
  
  // Additional Storybook 9 properties
  colorAddonSupport: '#ea580c',
  colorAddonSupportHover: '#c2410c',
  colorAddonSupportText: '#ffffff',
  colorAddonSupportIcon: '#ffffff',
  
  // Sidebar colors
  sidebarBg: '#ffffff',
  sidebarTextColor: '#171717',
  sidebarSelectedColor: '#ea580c',
  sidebarHoverColor: '#f5f5f5',
  
  // Canvas colors
  canvasBg: '#ffffff',
  canvasToolbarBg: '#f8f9fa',
  
  // Toolbar colors
  toolbarBg: '#171717',
  toolbarTextColor: '#ffffff',
  toolbarSelectedColor: '#ea580c',
  toolbarHoverColor: '#404040',
});

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
