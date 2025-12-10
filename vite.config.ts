import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src/design-system/**/*"],
      exclude: [
        "src/**/*.stories.tsx",
        "src/**/*.test.tsx",
        "src/**/*.spec.tsx",
        "src/design-system/utils/**/*",
      ],
      outDir: "dist",
      insertTypesEntry: true,
      copyDtsFiles: false,
      tsconfigPath: "./tsconfig.lib.json",
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/design-system/index.ts"),
        "design-system/components/TopNavigator": resolve(
          __dirname,
          "src/design-system/components/TopNavigator/TopNavigator.tsx",
        ),
        "design-system/components/Button": resolve(
          __dirname,
          "src/design-system/components/Button/Button.tsx",
        ),
        // UI Components
        "design-system/components/Avatar": resolve(
          __dirname,
          "src/design-system/components/Avatar/Avatar.tsx",
        ),
        "design-system/components/Badge": resolve(
          __dirname,
          "src/design-system/components/Badge/Badge.tsx",
        ),
        "design-system/components/EmptyState": resolve(
          __dirname,
          "src/design-system/components/EmptyState/EmptyState.tsx",
        ),
        "design-system/components/PageLoading": resolve(
          __dirname,
          "src/design-system/components/PageLoading/PageLoading.tsx",
        ),
        // Input Fields
        "design-system/components/Input": resolve(
          __dirname,
          "src/design-system/components/Input/Input.tsx",
        ),
        "design-system/components/PasswordInput": resolve(
          __dirname,
          "src/design-system/components/PasswordInput/PasswordInput.tsx",
        ),
        "design-system/components/SearchInput": resolve(
          __dirname,
          "src/design-system/components/SearchInput/SearchInput.tsx",
        ),
        "design-system/components/TextArea": resolve(
          __dirname,
          "src/design-system/components/TextArea/TextArea.tsx",
        ),
        "design-system/components/OTPInput": resolve(
          __dirname,
          "src/design-system/components/OTPInput/OTPInput.tsx",
        ),
        // Selection Controls
        "design-system/components/Dropdown": resolve(
          __dirname,
          "src/design-system/components/Dropdown/Dropdown.tsx",
        ),
        "design-system/components/Autocomplete": resolve(
          __dirname,
          "src/design-system/components/Autocomplete/Autocomplete.tsx",
        ),
        "design-system/components/MultiSelect": resolve(
          __dirname,
          "src/design-system/components/MultiSelect/MultiSelect.tsx",
        ),
        "design-system/components/Checkbox": resolve(
          __dirname,
          "src/design-system/components/Checkbox/Checkbox.tsx",
        ),
        "design-system/components/Radio": resolve(
          __dirname,
          "src/design-system/components/Radio/Radio.tsx",
        ),
        "design-system/components/Toggler": resolve(
          __dirname,
          "src/design-system/components/Toggler/Toggler.tsx",
        ),
        // Specialized Inputs
        "design-system/components/Calendar": resolve(
          __dirname,
          "src/design-system/components/Calendar/Calendar.tsx",
        ),
        "design-system/components/ColorPicker": resolve(
          __dirname,
          "src/design-system/components/ColorPicker/ColorPicker.tsx",
        ),
        "design-system/components/Slider": resolve(
          __dirname,
          "src/design-system/components/Slider/Slider.tsx",
        ),
        "design-system/components/RatingStars": resolve(
          __dirname,
          "src/design-system/components/RatingStars/RatingStars.tsx",
        ),
        "design-system/components/FileUpload": resolve(
          __dirname,
          "src/design-system/components/FileUpload/FileUpload.tsx",
        ),
        "design-system/components/SignatureInput": resolve(
          __dirname,
          "src/design-system/components/SignatureInput/SignatureInput.tsx",
        ),
        "design-system/components/RichTextEditor": resolve(
          __dirname,
          "src/design-system/components/RichTextEditor/RichTextEditor.tsx",
        ),
        // Form Layout
        "design-system/components/FormLayout": resolve(
          __dirname,
          "src/design-system/components/FormLayout/FormLayout.tsx",
        ),
      },
      name: "BlockworkUI",
      fileName: (format, entryName) => {
        if (format === "es") return `${entryName}.js`;
        if (format === "cjs") return `${entryName}.cjs`;
        return `${entryName}.${format}.js`;
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "react/jsx-runtime",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "styles.css";
          }
          return assetInfo.name || "assets/[name]-[hash][extname]";
        },
      },
    },
    sourcemap: true,
    minify: true,
    cssCodeSplit: false,
  },
});
