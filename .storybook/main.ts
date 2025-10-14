import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

/**
 * Storybook Configuration with Tag Badges
 * 
 * Tag Badges Configuration:
 * - Tags added to stories will automatically appear as badges in the sidebar
 * - Customize badge colors and labels using the config below
 * 
 * How to use in stories:
 * ```ts
 * export const MyStory = {
 *   tags: ['new', 'beta', 'v1.2', 'stable'],
 * };
 * ```
 * 
 * Customization options in storybook-addon-tag-badges config:
 * - badges: Array of badge definitions
 *   - tags: Array of tag strings to match
 *   - badge: Display configuration
 *     - text: Label to show in sidebar
 *     - bgColor: Background color (hex/rgb/css color)
 *     - fgColor: Text color (hex/rgb/css color)
 *     - tooltip: Optional hover tooltip text
 * 
 * Example custom badge:
 * {
 *   tags: ['experimental'],
 *   badge: {
 *     text: '🧪 EXPERIMENTAL',
 *     bgColor: '#9333ea',
 *     fgColor: '#ffffff',
 *     tooltip: 'This feature is experimental and may change'
 *   }
 * }
 */
const config: StorybookConfig = {
  stories: [
    // Match all story files using glob patterns
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    {
      name: "storybook-addon-tag-badges",
      options: {
        badges: [
          {
            tags: ["new"],
            badge: {
              text: "NEW",
              bgColor: "#10b981", // emerald-500
              fgColor: "#ffffff",
              tooltip: "Recently added component or feature",
            },
          },
          {
            tags: ["beta"],
            badge: {
              text: "BETA",
              bgColor: "#3b82f6", // blue-500
              fgColor: "#ffffff",
              tooltip: "Beta version - API may change",
            },
          },
          {
            tags: ["deprecated"],
            badge: {
              text: "DEPRECATED",
              bgColor: "#ef4444", // red-500
              fgColor: "#ffffff",
              tooltip: "This component will be removed in a future version",
            },
          },
          {
            tags: ["stable"],
            badge: {
              text: "STABLE",
              bgColor: "#22c55e", // green-500
              fgColor: "#ffffff",
              tooltip: "Production ready and stable",
            },
          },
          {
            tags: ["v1.2", "v1.3", "v1.4"],
            badge: {
              text: (tag: string) => tag.toUpperCase(),
              bgColor: "#8b5cf6", // violet-500
              fgColor: "#ffffff",
              tooltip: "Version number",
            },
          },
          {
            tags: ["wip"],
            badge: {
              text: "WIP",
              bgColor: "#f59e0b", // amber-500
              fgColor: "#ffffff",
              tooltip: "Work in progress",
            },
          },
          {
            tags: ["ready"],
            badge: {
              text: "READY",
              bgColor: "#10b981", // emerald-500
              fgColor: "#ffffff",
              tooltip: "Component is ready for use",
            },
          },
        ],
      },
    },
  ],
  features: {},
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["./public"],
  typescript: {
    check: false,
  },
  viteFinal: async (config) => {
    // Fix acorn parsing issues
    config.esbuild = {
      ...config.esbuild,
      target: "es2020",
    };

    // Add PostCSS configuration for Tailwind
    config.css = {
      ...config.css,
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    };

    // Add additional configuration for better parsing
    config.define = {
      ...config.define,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    };

    return config;
  },
};

export default config;
