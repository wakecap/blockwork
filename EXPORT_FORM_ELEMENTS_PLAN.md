# Export All Components - Implementation Plan

> **✅ STATUS: COMPLETED** (2025-12-10)
>
> All 24 components have been successfully:
> - ✅ Exported from main entry point (`src/design-system/index.ts`)
> - ✅ Added to Vite build configuration
> - ✅ Registered in package.json exports
> - ✅ Registered in MCP server with full metadata
> - ✅ Added to Storybook configuration
> - ✅ Added to ESLint configuration
> - ✅ All linting errors fixed
> - ✅ Documentation updated

---

## Objective
Export all production-ready components from the Blockwork UI library following a consistent pattern, making them available for:
1. NPM package consumers via main entry and tree-shakable imports
2. MCP server for AI assistant integration
3. TypeScript type definitions

## Current State - All Components Exported ✅

### Phase 1: Navigation & Core (2 components)
- ✅ **TopNavigator** - Top navigation bar
- ✅ **Button** - Multi-variant button component

### Phase 2: Form Elements (18 components)
- ✅ **Input Fields (5):** Input, PasswordInput, SearchInput, TextArea, OTPInput
- ✅ **Selection Controls (6):** Dropdown, Autocomplete, MultiSelect, Checkbox, Radio, Toggler
- ✅ **Specialized Inputs (7):** Calendar, ColorPicker, Slider, RatingStars, FileUpload, SignatureInput, RichTextEditor
- ✅ **Form Layout (1):** FormLayout

### Phase 3: UI Components (4 components)
- ✅ **Avatar** - User avatar with status indicators
- ✅ **Badge** - Label/status badge
- ✅ **EmptyState** - Empty state display
- ✅ **PageLoading** - Full-screen loading component

**Total: 24 components** now available in the public API and MCP server

## Components to Export

### Input Fields (5 components)

| Component | Exports | Category | Priority |
|-----------|---------|----------|----------|
| **Input** | `Input`, `InputProps` | Input Fields | High |
| **PasswordInput** | `PasswordInput`, `PasswordInputProps` | Input Fields | High |
| **SearchInput** | `SearchInput`, `SearchInputProps` | Input Fields | High |
| **TextArea** | `TextArea`, `TextAreaProps` | Input Fields | High |
| **OTPInput** | `OTPInput`, `OTPInputProps`, `PINInput`, `VerificationCode`, `PasswordOTP`, `useOTP` | Input Fields | High |

### Selection Controls (6 components)

| Component | Exports | Category | Priority |
|-----------|---------|----------|----------|
| **Dropdown** | `Dropdown`, `DropdownProps`, `DropdownOption` | Selection | High |
| **Autocomplete** | `Autocomplete`, `AutocompleteProps`, `AutocompleteOption` | Selection | High |
| **MultiSelect** | `MultiSelect`, `MultiSelectProps`, `MultiSelectOption` | Selection | High |
| **Checkbox** | `Checkbox`, `CheckboxProps` | Selection | High |
| **Radio** | `Radio`, `RadioProps` | Selection | High |
| **Toggler** | `Toggler`, `TogglerProps` | Selection | High |

### Specialized Inputs (7 components)

| Component | Exports | Category | Priority |
|-----------|---------|----------|----------|
| **Calendar** | `Calendar`, `CalendarProps`, `DatePicker`, `DateRangePicker` | Date & Time | High |
| **ColorPicker** | `ColorPicker`, `ColorPickerProps`, `SimpleColorPicker`, `AdvancedColorPicker`, `ThemeColorPicker`, `useColorPicker` | Visual | Medium |
| **Slider** | `Slider`, `SliderProps` | Numeric | High |
| **RatingStars** | `RatingStars`, `RatingStarsProps`, `ProductRating`, `ReviewRating`, `CompactRating`, `TenStarRating`, `useRating` | Rating | Medium |
| **FileUpload** | `FileUpload`, `FileUploadProps`, `FileUploadFile`, `ImageUpload`, `DocumentUpload`, `VideoUpload`, `useFileUpload` | File | High |
| **SignatureInput** | `SignatureInput`, `SignatureInputProps`, `DocumentSignature`, `CompactSignature` | Document | Medium |
| **RichTextEditor** | `RichTextEditor`, `RichTextEditorProps`, `WYSIWYGEditor`, `MarkdownEditor`, `SimpleEditor` | Text | High |

### Form Layout (1 component)

| Component | Exports | Category | Priority |
|-----------|---------|----------|----------|
| **FormLayout** | `FormLayout`, `FormLayoutProps`, `FormField`, `FormSection`, `FormGroup`, `UserProfileForm`, `SettingsForm` | Layout | High |

---

## Implementation Steps

### Step 1: Export from Main Entry Point

**File:** `src/design-system/index.ts`

Add all form component exports after the existing Button and TopNavigator exports:

```typescript
// ============================================
// FORM ELEMENTS
// ============================================

// Input Fields
export { Input } from "./components/Input/Input";
export type { InputProps } from "./components/Input/Input";

export { PasswordInput } from "./components/PasswordInput/PasswordInput";
export type { PasswordInputProps } from "./components/PasswordInput/PasswordInput";

export { SearchInput } from "./components/SearchInput/SearchInput";
export type { SearchInputProps } from "./components/SearchInput/SearchInput";

export { TextArea } from "./components/TextArea/TextArea";
export type { TextAreaProps } from "./components/TextArea/TextArea";

export {
  OTPInput,
  PINInput,
  VerificationCode,
  PasswordOTP,
  useOTP
} from "./components/OTPInput/OTPInput";
export type { OTPInputProps } from "./components/OTPInput/OTPInput";

// Selection Controls
export { Dropdown } from "./components/Dropdown/Dropdown";
export type { DropdownProps, DropdownOption } from "./components/Dropdown/Dropdown";

export { Autocomplete } from "./components/Autocomplete/Autocomplete";
export type { AutocompleteProps, AutocompleteOption } from "./components/Autocomplete/Autocomplete";

export { MultiSelect } from "./components/MultiSelect/MultiSelect";
export type { MultiSelectProps, MultiSelectOption } from "./components/MultiSelect/MultiSelect";

export { Checkbox } from "./components/Checkbox/Checkbox";
export type { CheckboxProps } from "./components/Checkbox/Checkbox";

export { Radio } from "./components/Radio/Radio";
export type { RadioProps } from "./components/Radio/Radio";

export { Toggler } from "./components/Toggler/Toggler";
export type { TogglerProps } from "./components/Toggler/Toggler";

// Specialized Inputs
export { Calendar, DatePicker, DateRangePicker } from "./components/Calendar/Calendar";
export type { CalendarProps } from "./components/Calendar/Calendar";

export {
  ColorPicker,
  SimpleColorPicker,
  AdvancedColorPicker,
  ThemeColorPicker,
  useColorPicker
} from "./components/ColorPicker/ColorPicker";
export type { ColorPickerProps } from "./components/ColorPicker/ColorPicker";

export { Slider } from "./components/Slider/Slider";
export type { SliderProps } from "./components/Slider/Slider";

export {
  RatingStars,
  ProductRating,
  ReviewRating,
  CompactRating,
  TenStarRating,
  useRating
} from "./components/RatingStars/RatingStars";
export type { RatingStarsProps } from "./components/RatingStars/RatingStars";

export {
  FileUpload,
  ImageUpload,
  DocumentUpload,
  VideoUpload,
  useFileUpload
} from "./components/FileUpload/FileUpload";
export type { FileUploadProps, FileUploadFile } from "./components/FileUpload/FileUpload";

export {
  SignatureInput,
  DocumentSignature,
  CompactSignature
} from "./components/SignatureInput/SignatureInput";
export type { SignatureInputProps } from "./components/SignatureInput/SignatureInput";

export {
  RichTextEditor,
  WYSIWYGEditor,
  MarkdownEditor,
  SimpleEditor
} from "./components/RichTextEditor/RichTextEditor";
export type { RichTextEditorProps } from "./components/RichTextEditor/RichTextEditor";

// Form Layout
export {
  FormLayout,
  UserProfileForm,
  SettingsForm
} from "./components/FormLayout/FormLayout";
export type {
  FormLayoutProps,
  FormField,
  FormSection,
  FormGroup
} from "./components/FormLayout/FormLayout";
```

---

### Step 2: Update Vite Build Configuration

**File:** `vite.config.ts`

Add all form components to the `build.lib.entry` object:

```typescript
entry: {
  index: resolve(__dirname, "src/design-system/index.ts"),

  // Existing
  "design-system/components/TopNavigator": resolve(__dirname, "src/design-system/components/TopNavigator/TopNavigator.tsx"),
  "design-system/components/Button": resolve(__dirname, "src/design-system/components/Button/Button.tsx"),

  // Input Fields
  "design-system/components/Input": resolve(__dirname, "src/design-system/components/Input/Input.tsx"),
  "design-system/components/PasswordInput": resolve(__dirname, "src/design-system/components/PasswordInput/PasswordInput.tsx"),
  "design-system/components/SearchInput": resolve(__dirname, "src/design-system/components/SearchInput/SearchInput.tsx"),
  "design-system/components/TextArea": resolve(__dirname, "src/design-system/components/TextArea/TextArea.tsx"),
  "design-system/components/OTPInput": resolve(__dirname, "src/design-system/components/OTPInput/OTPInput.tsx"),

  // Selection Controls
  "design-system/components/Dropdown": resolve(__dirname, "src/design-system/components/Dropdown/Dropdown.tsx"),
  "design-system/components/Autocomplete": resolve(__dirname, "src/design-system/components/Autocomplete/Autocomplete.tsx"),
  "design-system/components/MultiSelect": resolve(__dirname, "src/design-system/components/MultiSelect/MultiSelect.tsx"),
  "design-system/components/Checkbox": resolve(__dirname, "src/design-system/components/Checkbox/Checkbox.tsx"),
  "design-system/components/Radio": resolve(__dirname, "src/design-system/components/Radio/Radio.tsx"),
  "design-system/components/Toggler": resolve(__dirname, "src/design-system/components/Toggler/Toggler.tsx"),

  // Specialized Inputs
  "design-system/components/Calendar": resolve(__dirname, "src/design-system/components/Calendar/Calendar.tsx"),
  "design-system/components/ColorPicker": resolve(__dirname, "src/design-system/components/ColorPicker/ColorPicker.tsx"),
  "design-system/components/Slider": resolve(__dirname, "src/design-system/components/Slider/Slider.tsx"),
  "design-system/components/RatingStars": resolve(__dirname, "src/design-system/components/RatingStars/RatingStars.tsx"),
  "design-system/components/FileUpload": resolve(__dirname, "src/design-system/components/FileUpload/FileUpload.tsx"),
  "design-system/components/SignatureInput": resolve(__dirname, "src/design-system/components/SignatureInput/SignatureInput.tsx"),
  "design-system/components/RichTextEditor": resolve(__dirname, "src/design-system/components/RichTextEditor/RichTextEditor.tsx"),

  // Form Layout
  "design-system/components/FormLayout": resolve(__dirname, "src/design-system/components/FormLayout/FormLayout.tsx"),
}
```

---

### Step 3: Update Package.json Exports

**File:** `package.json`

#### 3a. Add to `exports` section (after Button entry):

```json
"./components/Input": {
  "types": "./dist/design-system/components/Input.d.ts",
  "import": "./dist/design-system/components/Input.js",
  "require": "./dist/design-system/components/Input.cjs"
},
"./components/PasswordInput": {
  "types": "./dist/design-system/components/PasswordInput.d.ts",
  "import": "./dist/design-system/components/PasswordInput.js",
  "require": "./dist/design-system/components/PasswordInput.cjs"
},
"./components/SearchInput": {
  "types": "./dist/design-system/components/SearchInput.d.ts",
  "import": "./dist/design-system/components/SearchInput.js",
  "require": "./dist/design-system/components/SearchInput.cjs"
},
"./components/TextArea": {
  "types": "./dist/design-system/components/TextArea.d.ts",
  "import": "./dist/design-system/components/TextArea.js",
  "require": "./dist/design-system/components/TextArea.cjs"
},
"./components/OTPInput": {
  "types": "./dist/design-system/components/OTPInput.d.ts",
  "import": "./dist/design-system/components/OTPInput.js",
  "require": "./dist/design-system/components/OTPInput.cjs"
},
"./components/Dropdown": {
  "types": "./dist/design-system/components/Dropdown.d.ts",
  "import": "./dist/design-system/components/Dropdown.js",
  "require": "./dist/design-system/components/Dropdown.cjs"
},
"./components/Autocomplete": {
  "types": "./dist/design-system/components/Autocomplete.d.ts",
  "import": "./dist/design-system/components/Autocomplete.js",
  "require": "./dist/design-system/components/Autocomplete.cjs"
},
"./components/MultiSelect": {
  "types": "./dist/design-system/components/MultiSelect.d.ts",
  "import": "./dist/design-system/components/MultiSelect.js",
  "require": "./dist/design-system/components/MultiSelect.cjs"
},
"./components/Checkbox": {
  "types": "./dist/design-system/components/Checkbox.d.ts",
  "import": "./dist/design-system/components/Checkbox.js",
  "require": "./dist/design-system/components/Checkbox.cjs"
},
"./components/Radio": {
  "types": "./dist/design-system/components/Radio.d.ts",
  "import": "./dist/design-system/components/Radio.js",
  "require": "./dist/design-system/components/Radio.cjs"
},
"./components/Toggler": {
  "types": "./dist/design-system/components/Toggler.d.ts",
  "import": "./dist/design-system/components/Toggler.js",
  "require": "./dist/design-system/components/Toggler.cjs"
},
"./components/Calendar": {
  "types": "./dist/design-system/components/Calendar.d.ts",
  "import": "./dist/design-system/components/Calendar.js",
  "require": "./dist/design-system/components/Calendar.cjs"
},
"./components/ColorPicker": {
  "types": "./dist/design-system/components/ColorPicker.d.ts",
  "import": "./dist/design-system/components/ColorPicker.js",
  "require": "./dist/design-system/components/ColorPicker.cjs"
},
"./components/Slider": {
  "types": "./dist/design-system/components/Slider.d.ts",
  "import": "./dist/design-system/components/Slider.js",
  "require": "./dist/design-system/components/Slider.cjs"
},
"./components/RatingStars": {
  "types": "./dist/design-system/components/RatingStars.d.ts",
  "import": "./dist/design-system/components/RatingStars.js",
  "require": "./dist/design-system/components/RatingStars.cjs"
},
"./components/FileUpload": {
  "types": "./dist/design-system/components/FileUpload.d.ts",
  "import": "./dist/design-system/components/FileUpload.js",
  "require": "./dist/design-system/components/FileUpload.cjs"
},
"./components/SignatureInput": {
  "types": "./dist/design-system/components/SignatureInput.d.ts",
  "import": "./dist/design-system/components/SignatureInput.js",
  "require": "./dist/design-system/components/SignatureInput.cjs"
},
"./components/RichTextEditor": {
  "types": "./dist/design-system/components/RichTextEditor.d.ts",
  "import": "./dist/design-system/components/RichTextEditor.js",
  "require": "./dist/design-system/components/RichTextEditor.cjs"
},
"./components/FormLayout": {
  "types": "./dist/design-system/components/FormLayout.d.ts",
  "import": "./dist/design-system/components/FormLayout.js",
  "require": "./dist/design-system/components/FormLayout.cjs"
}
```

#### 3b. Add to `typesVersions` section:

```json
"./components/Input": ["./dist/design-system/components/Input.d.ts"],
"./components/PasswordInput": ["./dist/design-system/components/PasswordInput.d.ts"],
"./components/SearchInput": ["./dist/design-system/components/SearchInput.d.ts"],
"./components/TextArea": ["./dist/design-system/components/TextArea.d.ts"],
"./components/OTPInput": ["./dist/design-system/components/OTPInput.d.ts"],
"./components/Dropdown": ["./dist/design-system/components/Dropdown.d.ts"],
"./components/Autocomplete": ["./dist/design-system/components/Autocomplete.d.ts"],
"./components/MultiSelect": ["./dist/design-system/components/MultiSelect.d.ts"],
"./components/Checkbox": ["./dist/design-system/components/Checkbox.d.ts"],
"./components/Radio": ["./dist/design-system/components/Radio.d.ts"],
"./components/Toggler": ["./dist/design-system/components/Toggler.d.ts"],
"./components/Calendar": ["./dist/design-system/components/Calendar.d.ts"],
"./components/ColorPicker": ["./dist/design-system/components/ColorPicker.d.ts"],
"./components/Slider": ["./dist/design-system/components/Slider.d.ts"],
"./components/RatingStars": ["./dist/design-system/components/RatingStars.d.ts"],
"./components/FileUpload": ["./dist/design-system/components/FileUpload.d.ts"],
"./components/SignatureInput": ["./dist/design-system/components/SignatureInput.d.ts"],
"./components/RichTextEditor": ["./dist/design-system/components/RichTextEditor.d.ts"],
"./components/FormLayout": ["./dist/design-system/components/FormLayout.d.ts"]
```

---

### Step 4: Register in MCP Server

**File:** `mcp/server/src/server.ts`

Add all 18 form components to the `COMPONENTS` object. Each component needs comprehensive metadata following the Button pattern.

**Note:** This is a large addition. The MCP registration includes detailed props, features, and descriptions for each component. See the detailed component metadata in the appendix at the end of this plan.

---

### Step 5: Rebuild MCP Server

**Command:** `npm run mcp:build`

This compiles the TypeScript MCP server source to `mcp/server/dist/` with all 18 new component registrations.

---

### Step 6: Update Documentation

**File:** `mcp/docs/slack-announcement.md` and `mcp/docs/slack-announcement-formatted.txt`

Update the "Available Components" section:

```markdown
Currently available: **20** component(s) - TopNavigator, Button, Input, PasswordInput, SearchInput, TextArea, OTPInput, Dropdown, Autocomplete, MultiSelect, Checkbox, Radio, Toggler, Calendar, ColorPicker, Slider, RatingStars, FileUpload, SignatureInput, RichTextEditor, FormLayout
```

---

## Critical Files to Modify

1. `src/design-system/index.ts` - Add all form component exports
2. `vite.config.ts` - Add 18 build entries
3. `package.json` - Add 18 entries to exports and typesVersions
4. `mcp/server/src/server.ts` - Register 18 components in COMPONENTS
5. `mcp/server/dist/*` - Rebuild (via npm run mcp:build)
6. `mcp/docs/slack-announcement.md` - Update component count

---

## Import Patterns After Implementation

### Main Entry (Simple)
```typescript
import {
  Input,
  PasswordInput,
  SearchInput,
  Button,
  Dropdown
} from "@wakecap/blockwork-ui";

import type {
  InputProps,
  PasswordInputProps,
  ButtonProps
} from "@wakecap/blockwork-ui";
```

### Component-Specific (Tree-Shaking)
```typescript
import { Input } from "@wakecap/blockwork-ui/components/Input";
import { Calendar } from "@wakecap/blockwork-ui/components/Calendar";
import type { InputProps } from "@wakecap/blockwork-ui/components/Input";
```

### MCP Server Access
Once deployed, AI assistants can query:
- Resource: `blockwork://components/Input`
- Search: "input component blockwork"
- Usage: "Show me how to use the Calendar component"

---

## Testing Checklist

After implementation:
- [ ] Build library: `npm run build:library`
- [ ] Verify no TypeScript errors
- [ ] Check dist/ folder contains all 18 component files (.js, .d.ts, .cjs)
- [ ] Build MCP server: `npm run mcp:build`
- [ ] Verify mcp/server/dist/ updated
- [ ] Test main entry import: `import { Input, Calendar } from "@wakecap/blockwork-ui"`
- [ ] Test tree-shaking import: `import { Input } from "@wakecap/blockwork-ui/components/Input"`
- [ ] Commit compiled MCP dist files to git (zero-build Vercel deployment)
- [ ] Update FORM_ELEMENTS.md with export status

---

## Implementation Strategy

### Phase 1: Input Fields (Highest Priority)
Export 5 components: Input, PasswordInput, SearchInput, TextArea, OTPInput

**Reason:** Most commonly used, fundamental to any form

### Phase 2: Selection Controls (High Priority)
Export 6 components: Dropdown, Autocomplete, MultiSelect, Checkbox, Radio, Toggler

**Reason:** Essential for form functionality

### Phase 3: Core Specialized Inputs (High Priority)
Export 4 components: Calendar, Slider, FileUpload, RichTextEditor

**Reason:** Frequently used in forms

### Phase 4: Remaining Specialized Inputs (Medium Priority)
Export 3 components: ColorPicker, RatingStars, SignatureInput

**Reason:** Use-case specific, less common

### Phase 5: Form Layout (Final)
Export 1 component: FormLayout

**Reason:** Depends on other components being available

**Alternative:** Export all 18 components at once if time permits.

---

## Notes

- All components are production-ready with comprehensive features
- Stories already exist in Storybook for 8 components (no changes needed)
- Following exact same pattern as Button and TopNavigator for consistency
- MCP server will automatically expose all components via resources and tools
- Compiled MCP dist/ must be committed to git for Vercel deployment
- This significantly expands the library's public API from 2 to 20 components
- Some components export multiple variants (e.g., OTPInput exports 5 items, Calendar exports 3)
- Total exports: ~60+ items (components, types, hooks, variants)

---

## Appendix: MCP Component Metadata (Sample)

Due to length, here's the pattern for MCP registration. Each component follows this structure:

```typescript
ComponentName: {
  name: "ComponentName",
  description: "Brief description with key features",
  category: "Input Fields" | "Selection" | "Date & Time" | "Visual" | "Numeric" | "Rating" | "File" | "Document" | "Text" | "Layout",
  path: "src/design-system/components/ComponentName/ComponentName.tsx",
  props: {
    propName: "type - description (default: value)",
    // ... all props documented
  },
  features: [
    "Feature 1",
    "Feature 2",
    // ... all features listed
  ],
  dependencies: ["Button"] // if any internal dependencies
}
```

Full metadata for all 18 components will be added during implementation based on the exploration data.
