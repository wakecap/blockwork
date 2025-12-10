import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const config: StorybookConfig = {
  stories: [
    "../src/design-system/foundations/DesignSystem.stories.tsx",
    "../src/design-system/components/TopNavigator/TopNavigator.stories.tsx",
    "../src/design-system/components/MegaDropdown/MegaDropdown.stories.tsx",
    "../src/design-system/components/PageLoading/PageLoading.stories.tsx",
    "../src/design-system/components/Avatar/Avatar.stories.tsx",
    "../src/design-system/components/Button/Button.stories.tsx",
    "../src/design-system/components/Badge/Badge.stories.tsx",
    "../src/design-system/components/EmptyState/EmptyState.stories.tsx",
    // Input Fields
    "../src/design-system/components/Input/Input.stories.tsx",
    "../src/design-system/components/PasswordInput/PasswordInput.stories.tsx",
    "../src/design-system/components/SearchInput/SearchInput.stories.tsx",
    "../src/design-system/components/TextArea/TextArea.stories.tsx",
    "../src/design-system/components/OTPInput/OTPInput.stories.tsx",
    // Selection Controls
    "../src/design-system/components/Dropdown/Dropdown.stories.tsx",
    "../src/design-system/components/Autocomplete/Autocomplete.stories.tsx",
    "../src/design-system/components/MultiSelect/MultiSelect.stories.tsx",
    "../src/design-system/components/Checkbox/Checkbox.stories.tsx",
    "../src/design-system/components/Radio/Radio.stories.tsx",
    "../src/design-system/components/Toggler/Toggler.stories.tsx",
    // Specialized Inputs
    "../src/design-system/components/Calendar/Calendar.stories.tsx",
    "../src/design-system/components/ColorPicker/ColorPicker.stories.tsx",
    "../src/design-system/components/Slider/Slider.stories.tsx",
    "../src/design-system/components/RatingStars/RatingStars.stories.tsx",
    "../src/design-system/components/FileUpload/FileUpload.stories.tsx",
    "../src/design-system/components/SignatureInput/SignatureInput.stories.tsx",
    "../src/design-system/components/RichTextEditor/RichTextEditor.stories.tsx",
    // Form Layout
    "../src/design-system/components/FormLayout/FormLayout.stories.tsx",
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
