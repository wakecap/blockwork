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
      "storybook-static",
      "coverage",
      "mcp/server/dist/**",
      // Ignore all components except the ones in main.ts (26 components: 8 core + 18 form elements)
      "src/design-system/components/!(TopNavigator|MegaDropdown|PageLoading|Avatar|Button|Badge|SearchInput|EmptyState|Input|PasswordInput|TextArea|OTPInput|Dropdown|Autocomplete|MultiSelect|Checkbox|Radio|Toggler|Calendar|ColorPicker|Slider|RatingStars|FileUpload|SignatureInput|RichTextEditor|FormLayout)/**",
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
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  ...storybook.configs["flat/recommended"],
);
