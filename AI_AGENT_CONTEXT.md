# WakeCap Blockwork Design System - AI Agent Context

> **Purpose**: This document provides comprehensive context for AI agents (like Cursor AI) working on the WakeCap Blockwork Design System. It contains all necessary information about project structure, configuration, development guidelines, and best practices.

## Project Overview

**WakeCap Blockwork Design System** is a comprehensive React component library built for construction project management applications. It features:
- Black-primary design system with orange accents
- Full RTL/Arabic support with IBM Plex Sans Arabic font
- 98+ production-ready components
- Comprehensive accessibility (WCAG 2.1 AA)
- Mobile-first responsive design

## Tech Stack & Architecture

### Core Technologies
- **React 18.2.0** with TypeScript 5.3.3
- **Vite 5.1.3** for build tooling and development
- **TailwindCSS 3.4.1** for styling
- **Storybook 9.1.7** for component documentation
- **ESLint 9.36.0** with TypeScript support for code quality
- **Prettier 3.6.2** for code formatting

### Package Manager
- **npm** is the REQUIRED package manager [[memory:6311109]]
- Node.js version: >=22.0.0

### Key Dependencies
- `class-variance-authority@0.7.1` - Component variants system
- `clsx@2.1.1` and `tailwind-merge@3.3.1` - Conditional styling utilities
- `lucide-react@0.344.0` - Icon library (NOT used for main icons)
- `@radix-ui` components - Accessibility primitives
- `ag-grid-react@34.1.2` - Data grid tables

### Build Tools
- `vite-plugin-dts@4.5.4` - TypeScript declaration generation
- `autoprefixer@10.4.17` - CSS vendor prefixing
- `postcss@8.4.35` - CSS processing

## Project Structure

```
src/
├── components/ui/           # Basic UI components (shadcn/ui based)
├── design-system/
│   ├── components/         # Main component library (98 components)
│   ├── foundations/        # Design tokens and foundations
│   ├── tokens/            # Tailwind configuration
│   └── utils/             # Utility functions
├── stories/               # Storybook stories and assets
└── utils/                 # Shared utilities
```

## Component Development Guidelines

### 1. Component Structure
Each component follows this structure:
```
ComponentName/
├── ComponentName.tsx       # Main component
├── ComponentName.stories.tsx # Storybook stories
└── index.ts               # Exports (if needed)
```

### 2. Styling Requirements
- **Use TailwindCSS 3 class names only**
- Follow the established design token system in `tailwind.config.js`
- Use CSS variables for theming (defined in globals.css)
- Implement responsive design with mobile-first approach

### 3. Icon Usage
- **CRITICAL**: Use FontAwesome 6 class names exclusively for all icons
- Format: `fa-solid fa-icon-name` or `fa-regular fa-icon-name`
- Examples: `fa-solid fa-bell`, `fa-solid fa-cog`, `fa-solid fa-user`, `fa-solid fa-arrow-right`
- **DO NOT** use lucide-react icons in new components (it's a legacy dependency)
- FontAwesome CDN is loaded in the project for icon rendering

### 4. Component Variants
Use `class-variance-authority` for component variants:
```typescript
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        primary: "primary-classes",
        secondary: "secondary-classes",
      },
      size: {
        sm: "small-classes",
        md: "medium-classes",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);
```

### 5. TypeScript Requirements
- Export component props interfaces
- Use proper typing for all props
- Include JSDoc comments for complex props
- Export component and variant types

## Build Configuration Updates

> **CRITICAL**: When adding a new component to the library, you MUST update ALL 6 configuration files/locations. Missing any step will cause build, import, or tree-shaking failures.

### Step-by-Step Configuration Checklist (6 Required Steps)

#### ✅ Step 1: Update package.json Exports

Add your component to the `exports` section in `package.json`:

```json
"exports": {
  "./styles.css": "./dist/styles.css",
  "./components/ComponentName": {
    "types": "./dist/design-system/components/ComponentName.d.ts",
    "import": "./dist/design-system/components/ComponentName.js",
    "require": "./dist/design-system/components/ComponentName.cjs"
  }
}
```

**Current Active Exports:**
- `./components/TopNavigator`

#### ✅ Step 2: Update package.json TypesVersions

Add TypeScript type mappings in `package.json`:

```json
"typesVersions": {
  "*": {
    "./components/ComponentName": [
      "./dist/design-system/components/ComponentName.d.ts"
    ]
  }
}
```

**Current Active TypesVersions:**
- `./components/TopNavigator`

#### ✅ Step 3: Update vite.config.ts

Add the component entry point in `vite.config.ts` under `build.lib.entry`:

```typescript
entry: {
  "design-system/components/ComponentName": resolve(
    __dirname,
    "src/design-system/components/ComponentName/ComponentName.tsx",
  ),
}
```

**Current Active Entries:**
- `design-system/components/TopNavigator`

#### ✅ Step 4: Update .storybook/main.ts

Add the story file to the `stories` array in `.storybook/main.ts`:

```typescript
stories: [
  "../src/design-system/components/ComponentName/ComponentName.stories.tsx",
]
```

**Current Active Stories (8 components):**
1. TopNavigator
2. MegaDropdown
3. PageLoading
4. Avatar
5. Button
6. Badge
7. SearchInput
8. EmptyState

#### ✅ Step 5: Update eslint.config.js

Update the `ignores` section in `eslint.config.js` to include your component:

```javascript
ignores: [
  "dist", 
  "build", 
  "node_modules", 
  ".storybook/static", 
  "storybook-static",
  "coverage",
  // Update this line to include your new component
  "src/design-system/components/!(TopNavigator|MegaDropdown|PageLoading|Avatar|Button|Badge|SearchInput|EmptyState|ComponentName)/**",
  "src/stories/**",
  "src/design-system/foundations/**",
  "src/design-system/tokens/**",
  "src/design-system/utils/**"
]
```

**Current Linted Components:**
- TopNavigator, MegaDropdown, PageLoading, Avatar, Button, Badge, SearchInput, EmptyState

#### ✅ Step 6: Update src/design-system/index.ts

Export your component from the main index file for tree-shaking support:

```typescript
// Re-export components for tree shaking
export { ComponentName } from "./components/ComponentName/ComponentName";
export type { ComponentNameProps } from "./components/ComponentName/ComponentName";
```

**Current Exported Components:**
- TopNavigator (with TopNavigatorProps type)

**Important**: This step enables tree-shaking and provides a cleaner import path for consumers of the library.

## Current Component Library

### Active Components (in Storybook)
- TopNavigator
- MegaDropdown  
- PageLoading
- Avatar
- Button
- Badge
- SearchInput
- EmptyState

### Available Components (98 total)
- Accordion, AdvertisementCard, Alert, Autocomplete
- Badge, BottomSheet, Button
- Calendar, Card, Carousel, ChatBubble, Checkbox
- ColorPicker, CommandPalette, CommentThread, Dropdown
- EmptyState, FileUpload, FontProvider, FormLayout
- Input, ListItem
- MegaDropdown, Modal, MultiSelect
- OTPInput, PageLoading, PasswordInput, Popover
- Progress, Radio, RatingStars, RichTextEditor
- SearchInput, SignatureInput, Skeleton, Slider
- Snackbar, SplitView, StatusIndicator, Stepper
- Table, TextArea, Timeline, Toggler, Tooltip, TopNavigator

## Development Workflow

### 1. Setup
```bash
# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Start development
npm run dev

# Start Storybook
npm run storybook
```

### 2. Building
```bash
# Build library
npm run build

# Build Storybook
npm run build-storybook

# Type check
npm run build:check
```

### 3. Code Quality
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### 4. Prettier Configuration
The project uses Prettier with the following settings (`.prettierrc`):
- **Semi-colons**: Required (true)
- **Trailing commas**: Always (all)
- **Quotes**: Double quotes (false for single)
- **Print width**: 100 characters
- **Tab width**: 2 spaces
- **Arrow parens**: Always
- **End of line**: LF (Unix style)
- **Bracket spacing**: true
- **JSX quotes**: Double quotes

## Design System Principles

### 1. Color System
- **Primary**: Black-based design system
- **Secondary**: Light gray variants
- **Accent**: Orange (#f97316) for brand highlights
- **Semantic**: Success (green), Warning (yellow), Error (red), Info (blue)

### 2. Typography
- **English**: Figtree font family
- **Arabic**: IBM Plex Sans Arabic with RTL support
- Responsive font sizes with proper line heights

### 3. Spacing
- 8pt grid system
- Consistent spacing scale (0.25rem to 24rem)
- Responsive spacing adjustments

### 4. Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators
- ARIA labels for complex components

### 5. Responsive Design
- Mobile-first approach
- Touch-friendly targets (minimum 44px)
- Responsive breakpoints: xs(475px), sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)

## RTL/Arabic Support

### Implementation
- Automatic RTL layout for Arabic text
- Font switching: Figtree → IBM Plex Sans Arabic
- Icon position flipping in RTL
- Proper text alignment and direction

### Usage Example
```typescript
<Button 
  arabicText="زر أساسي" 
  showArabicText={true}
  icon="fa-solid fa-download"
  iconPosition="left"
>
  Primary Button
</Button>
```

## Quality Assurance

### Before Committing
1. **Format files**: `pnpm format`
2. **Check linting**: `pnpm lint`
3. **Build successfully**: `pnpm build`
4. **Storybook builds**: `pnpm build-storybook`
5. **Type checking**: `pnpm build:check`

### Testing
- Use Storybook for component testing
- Test all variants and states
- Verify responsive behavior
- Test accessibility with keyboard navigation
- Validate RTL/Arabic support when applicable

## Common Patterns

### 1. Component Props Interface
```typescript
export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Custom props
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}
```

### 2. Forward Ref Pattern
```typescript
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Component.displayName = "Component";
```

### 3. Storybook Story Structure
```typescript
const meta: Meta<typeof Component> = {
  title: "Components/Component",
  component: Component,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Component description",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // Define controls
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Default: Story = {
  args: {
    // Default props
  },
};
```

## File Naming Conventions

### Component Files
- **Component**: `ComponentName.tsx` (PascalCase)
- **Story**: `ComponentName.stories.tsx` (PascalCase with .stories suffix)
- **Types**: Defined in the component file, exported
- **Utils**: `utilityName.ts` (camelCase)

### Import Paths
- Use absolute imports with `@/` alias (configured in vite.config.ts)
- Example: `import { cn } from "@/src/utils/utils"`
- For components: `import { Button } from "@/src/design-system/components/Button/Button"`

## CSS and Styling Guidelines

### TailwindCSS Usage
- Use utility classes exclusively - no custom CSS unless absolutely necessary
- Follow mobile-first responsive design: `class="text-sm md:text-base lg:text-lg"`
- Use design tokens from `tailwind.config.js` for consistency
- Leverage CSS variables for theming: `bg-primary`, `text-foreground`, etc.

### Common Utility Pattern
```typescript
import { cn } from "@/src/utils/utils";

// Combine classes with conditional logic
className={cn(
  "base-classes",
  variant === "primary" && "primary-classes",
  isActive && "active-classes",
  className // Allow prop override
)}
```

## TypeScript Configuration

The project uses a composite TypeScript configuration:
- `tsconfig.json` - Root configuration (references only)
- `tsconfig.app.json` - Application TypeScript config
- `tsconfig.node.json` - Node.js/build tools config
- `tsconfig.lib.json` - Library build configuration (used by vite-plugin-dts)

### Type Exports
Always export types and interfaces:
```typescript
export interface ComponentProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export type ComponentVariant = ComponentProps["variant"];
```

## Vite Configuration Details

### Build Output Structure
```
dist/
├── design-system/
│   └── components/
│       └── ComponentName/
│           ├── ComponentName.js (ES module)
│           ├── ComponentName.cjs (CommonJS)
│           └── ComponentName.d.ts (TypeScript declarations)
└── styles.css (Compiled Tailwind CSS)
```

### Plugin Configuration
- `@vitejs/plugin-react` - React Fast Refresh and JSX transform
- `vite-plugin-dts` - Generates TypeScript declarations
  - Includes: `src/design-system/**/*`
  - Excludes: Stories, tests, utils
  - Output: `dist/`

## Storybook Configuration Details

### Addons Enabled
1. `@storybook/addon-docs` - Auto-generated documentation
2. `@storybook/addon-a11y` - Accessibility testing
3. `@storybook/addon-links` - Link between stories

### Features
- TypeScript checking disabled for faster builds
- Vite integration for fast HMR
- TailwindCSS processing via PostCSS
- Static assets served from `.storybook/public`

## Publishing Configuration

### Package Information
- **Name**: `@wakecap/blockwork-ui`
- **Version**: 0.2.0
- **Registry**: GitHub Packages (`https://npm.pkg.github.com`)
- **License**: MIT
- **Repository**: `https://github.com/wakecap/blockwork.git`

### Published Files
Only these files/directories are included in the npm package:
- `dist/` - Built components and types
- `components/` - Source components (if needed)
- `index.d.ts` - Root type definitions
- `README.md` - Documentation
- `LICENSE` - License file

## Troubleshooting Guide

### Build Failures

**Issue**: TypeScript errors during build
```bash
# Solution: Run type check first
npm run build:check
```

**Issue**: Vite build fails with "Cannot find module"
```bash
# Solution: Check vite.config.ts entry paths match actual file locations
# Ensure path uses resolve(__dirname, "src/design-system/components/...")
```

**Issue**: Storybook build fails
```bash
# Solution: Verify .storybook/main.ts stories array has correct paths
# Check that all story files exist and are valid
```

### Linting Issues

**Issue**: ESLint errors on new component
```bash
# Solution: Add component to the ignore pattern in eslint.config.js
# OR add it to the allowed list: !(TopNavigator|NewComponent)/**
```

**Issue**: Prettier formatting conflicts
```bash
# Solution: Run format command to auto-fix
npm run format
```

### Import Errors

**Issue**: Cannot import component in consuming app
```bash
# Solution: Verify all 6 configuration steps completed:
# 1. package.json exports
# 2. package.json typesVersions
# 3. vite.config.ts entry
# 4. .storybook/main.ts stories
# 5. eslint.config.js ignores
# 6. src/design-system/index.ts exports
```

**Issue**: Tree-shaking not working properly
```bash
# Solution: Ensure component is exported in src/design-system/index.ts
# This enables proper tree-shaking for consuming applications
```

## Best Practices Checklist

### Before Creating a Component
- [ ] Check if similar component exists
- [ ] Review design tokens in `tailwind.config.js`
- [ ] Plan component variants and sizes
- [ ] Consider RTL/Arabic support requirements
- [ ] Plan accessibility features (ARIA labels, keyboard nav)

### During Component Development
- [ ] Use TypeScript with proper types
- [ ] Implement with TailwindCSS utilities only
- [ ] Use FontAwesome 6 icons (not lucide-react)
- [ ] Add proper ARIA attributes
- [ ] Support keyboard navigation
- [ ] Implement responsive design (mobile-first)
- [ ] Add RTL support if user-facing
- [ ] Use `React.forwardRef` for ref forwarding
- [ ] Export all types and interfaces

### After Component Development
- [ ] Create comprehensive Storybook stories
- [ ] Test all variants and states
- [ ] Test responsive behavior
- [ ] Test keyboard navigation
- [ ] Test with screen reader (if applicable)
- [ ] Run `npm format`
- [ ] Run `npm lint:fix`
- [ ] Run `npm build` successfully
- [ ] Run `npm build-storybook` successfully
- [ ] Update all 6 configuration files (see checklist above)
- [ ] Test import in consuming application
- [ ] Verify tree-shaking works correctly

## Important Notes

1. **Always use npm** for package management (not pnpm or yarn) [[memory:6311109]]
2. **Copy .env.example to .env** during initial setup [[memory:6311116]]
3. **Update ALL 6 configuration files/locations** when adding components (see checklist above):
   - package.json exports
   - package.json typesVersions
   - vite.config.ts entry
   - .storybook/main.ts stories
   - eslint.config.js ignores
   - src/design-system/index.ts exports
4. **Use FontAwesome 6 class names exclusively** for icons (not lucide-react)
5. **Follow TailwindCSS 3 conventions** - no custom CSS
6. **Test builds before committing** - both library and Storybook
7. **Maintain WCAG 2.1 AA accessibility standards**
8. **Support RTL/Arabic** for all user-facing components
9. **Follow Prettier configuration** - 100 char width, double quotes, trailing commas
10. **Use semantic HTML** - proper heading hierarchy, form labels, etc.
11. **Export components in index.ts** - Required for tree-shaking optimization

## Quick Reference Commands

```bash
# Setup
npm install
cp .env.example .env

# Development
npm run dev                 # Start Vite dev server
npm run storybook           # Start Storybook

# Build
npm run build               # Build library
npm run build:check         # Type check + build
npm run build-storybook     # Build Storybook static

# Quality
npm run lint                # Check linting
npm run lint:fix            # Fix linting issues
npm run format              # Format all files
npm run format:check        # Check formatting

# CSS
npm run build:css           # Build Tailwind CSS
```

---

This comprehensive context document should provide AI agents with everything needed to understand and work effectively with the WakeCap Blockwork Design System. Always refer to this document when making changes or adding new components to ensure consistency and quality.
