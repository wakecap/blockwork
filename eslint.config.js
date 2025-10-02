import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import storybook from "eslint-plugin-storybook";

export default tseslint.config(
  { 
    ignores: [
      "dist", 
      "build", 
      "node_modules", 
      ".storybook/static", 
      "coverage",
      // Ignore all components except the ones in main.ts (TopNavigator, MegaDropdown, PageLoading, Avatar, Button, Badge, SearchInput, EmptyState)
      "src/design-system/components/!(TopNavigator|MegaDropdown|PageLoading|Avatar|Button|Badge|SearchInput|EmptyState)/**",
      // Ignore all stories except the ones in main.ts
      "src/stories/**",
      "src/design-system/foundations/**",
      "src/design-system/tokens/**",
      "src/design-system/utils/**"
    ] 
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "prettier/prettier": "error",
      ...prettierConfig.rules,
    },
  },
  ...storybook.configs["flat/recommended"],
);
