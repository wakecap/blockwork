import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const config: StorybookConfig = {
  stories: [
    "../src/design-system/components/TopNavigator/TopNavigator.stories.tsx",
    "../src/design-system/components/MegaDropdown/MegaDropdown.stories.tsx",
    "../src/design-system/components/PageLoading/PageLoading.stories.tsx",
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-links"],
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
