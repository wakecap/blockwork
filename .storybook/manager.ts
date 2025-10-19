import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";
// Import renderLabel from tag-badges addon to enable sidebar badges
import {
  renderLabel, defaultConfig,
  type TagBadgeParameters,
} from "storybook-addon-tag-badges";


// Determine if we're in production build (static deployment)
const isProduction = process.env.NODE_ENV === "production";
const baseUrl = isProduction ? "/blockwork" : "";

// Custom Blockwork theme for Storybook 9.x
const blockworkTheme = create({
  base: "light",

  // Brand configuration
  brandTitle: "Blockwork Design System",
  brandUrl: "https://github.com/wakecap/blockwork",
  brandImage: `${baseUrl}/assets/images/blockwork-logo-black.png`,
  brandTarget: "_self",

  // Core colors
  colorPrimary: "#101628",
  colorSecondary: "#171717",

  // App UI colors
  appBg: "#F1F2F4",
  appContentBg: "#F1F2F4",
  appPreviewBg: "#ffffff",
  appBorderColor: "#000000",
  appBorderRadius: 12,

  // Typography
  fontBase: '"Figtree", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  fontCode: '"JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace',

  // Text colors
  textColor: "#171717",
  textInverseColor: "#ffffff",
  textMutedColor: "#737373",

  // Toolbar/Bar colors
  barTextColor: "#D1D6E0",
  barHoverColor: "#262626",
  barSelectedColor: "#000000",
  barBg: "#171717",

  // Button colors
  buttonBg: "#101628",
  buttonBorder: "#101628",

  // Boolean/Toggle colors
  booleanBg: "#f5f5f5",
  booleanSelectedBg: "#101628",

  // Form/Input colors
  inputBg: "#ffffff",
  inputBorder: "#e5e5e5",
  inputTextColor: "#171717",
  inputBorderRadius: 12,

  // Grid
  gridCellSize: 12,

  // Sidebar colors (extended Storybook properties)
  sidebarBg: "#3109C2",
  sidebarTextColor: "#171717",
  sidebarSelectedColor: "#D1D6E0",
  sidebarHoverColor: "#D1D6E0",
  sidebarBorder: "#e5e5e5",
  sidebarBorderRadius: 0,
} as any);

addons.setConfig({
  theme: blockworkTheme,
  panelPosition: "bottom",
  selectedPanel: "controls",
  initialActive: "sidebar",
  showNav: true,
  showPanel: true,
  showToolbar: true,
  enableShortcuts: true,
  showCanvas: true,
  showDocsPage: true,
  // Integrate tag-badges addon's renderLabel for sidebar badges
  sidebar: {
    renderLabel,
  },
  tagBadges: [
    // Add an entry that matches 'frog' and displays a cool badge in the sidebar only
    {
      tags: 'ready',
      badge: {
        text: 'Ready',
        style: {
          backgroundColor: '#001c13',
          color: '#e0eb0b',
        },
        tooltip: 'This component can catch flies!',
      },
      display: {
        sidebar: [{
          type: 'component',
          skipInherited: true,
        }],
        toolbar: false,
        mdx: true,
      },
    },
    // Place the default config after your custom matchers.
    ...defaultConfig,
  ] satisfies TagBadgeParameters,
});

console.log("Blockwork theme loaded:", blockworkTheme);
console.log("Tag badges addon renderLabel integrated");
