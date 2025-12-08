# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Blockwork UI (`@wakecap/blockwork-ui`) is a React component library and design system built with TypeScript, Tailwind CSS, and Storybook. It provides construction-focused UI components with comprehensive Arabic/RTL support.

## Common Commands

### Development
```bash
npm run storybook          # Start Storybook dev server on port 6006
npm run dev                # Start Vite dev server
```

### Building
```bash
npm run build              # Build library (Vite) + compile CSS
npm run build:check        # Type check (tsc) then build
npm run build-storybook    # Build static Storybook for deployment
```

### Code Quality
```bash
npm run lint               # Run ESLint
npm run lint:fix           # Auto-fix ESLint issues
npm run format             # Format code with Prettier
npm run format:check       # Check formatting without modifying files
```

### MCP Server (AI Agent Integration)
```bash
npm run mcp:build         # Build MCP server
npm run mcp:dev           # Build and run MCP server
npm run mcp:start         # Run built MCP server
```

### Publishing
Published to GitHub Packages (`@wakecap/blockwork-ui`) at `https://npm.pkg.github.com`

## Architecture

### Build Configuration

The library uses a **dual-entry build system**:

1. **Main entry** (`src/design-system/index.ts`): Currently only exports TopNavigator component and types
2. **Component-specific entries**: Individual exports for tree-shaking (e.g., `./components/TopNavigator`)

**Important**: When adding new components to the public API:
- Update `src/design-system/index.ts` with exports
- Add entry in `vite.config.ts` build.lib.entry
- Add to package.json `exports` and `typesVersions`
- Add story to `.storybook/main.ts` stories array
- Update ESLint ignore patterns in `eslint.config.js` if component should be linted

### Component Structure

Components live in `src/design-system/components/[ComponentName]/`:
- `[ComponentName].tsx` - Component implementation
- `[ComponentName].stories.tsx` - Storybook documentation

All components follow these patterns:
- TypeScript with strict typing
- Tailwind CSS for styling (using design tokens from `tailwind.config.js`)
- Class variance authority (`cva`) for variant management
- `clsx` and `tailwind-merge` via `utils/utils.ts` for className composition

### Arabic & RTL Support

The design system provides first-class Arabic/RTL support:

**Font System**:
- English: Figtree font family (`font-sans`)
- Arabic: IBM Plex Sans Arabic (`font-arabic`)
- FontProvider context manages language switching

**RTL Implementation**:
- Components automatically adapt layout direction
- Icons flip for RTL contexts
- Text alignment adjusts based on language
- Use `dir="rtl"` attribute for Arabic content

**Key Components**:
- `FontProvider` - Wrap app for language management
- `language-toggle.tsx` - Language switcher UI
- `arabicLocalization.ts` - Localization utilities

### Styling System

**Design Tokens** (defined in `tailwind.config.js`):

1. **Colors**:
   - Primary: Orange scale (50-950)
   - Semantic: success, error, warning, info
   - Neutrals: gray and neutral scales
   - WakeCap brand colors via CSS variables
   - shadcn/ui compatible CSS variables

2. **Typography**:
   - Scale: xs to 9xl with line-height and letter-spacing
   - Weights: thin (100) to black (900)
   - Families: sans (Figtree), arabic, mono, serif

3. **Spacing**: 8pt grid system (0 to 96)

4. **Shadows**: Elevation system (xs, sm, md, lg, xl, 2xl + custom elevation-1 through elevation-5)

5. **Border Radius**: xs (2px) to 3xl (32px), plus full

6. **Motion**:
   - Durations: fast (150ms), base (250ms), slow (350ms), slower (500ms)
   - Easings: Custom cubic-bezier functions (ease-out-expo, ease-in-out-quart, etc.)
   - Keyframes: fade-in/out, slide-in, scale-in, pulse, bounce-subtle

7. **Z-Index**: Semantic layers (dropdown: 1000, modal: 1400, tooltip: 1800, etc.)

### TypeScript Configuration

Three config files:
- `tsconfig.json` - Root references other configs
- `tsconfig.app.json` - App/Storybook development
- `tsconfig.lib.json` - Library build (excludes stories/tests, includes only `src/design-system/**/*`)

### Storybook

Currently showcases **8 core components** (see `.storybook/main.ts`):
- TopNavigator
- MegaDropdown
- PageLoading
- Avatar
- Button
- Badge
- SearchInput
- EmptyState

**To add a new story**: Add the story path to the `stories` array in `.storybook/main.ts`

### ESLint Configuration

The codebase uses **selective linting** - only the 8 core components listed in Storybook are linted. All other components in `src/design-system/components/` are ignored, as are `src/stories/`, `src/design-system/foundations/`, and utility folders.

## Claude Instructions

This repository includes **automated instruction files** for MCP server tasks:

- **`mcp/claude-instructions/add-component.md`** - Complete guide for adding components to the MCP server
  - Trigger: "Add [ComponentName] to the MCP server"
  - Handles: Reading component, extracting metadata, updating docs, building, testing

See `mcp/claude-instructions/README.md` for how to use these automated instructions.

## Key Files

- `src/design-system/index.ts` - Main library entry point (public API)
- `vite.config.ts` - Build configuration with library entries
- `tailwind.config.js` - Complete design token system
- `.storybook/main.ts` - Storybook configuration and story list
- `eslint.config.js` - Linting rules and ignore patterns
- `src/globals.css` - Global styles and CSS variables
- `src/utils/utils.ts` - Utility functions (cn for className merging)
- `mcp/server/src/index.ts` - MCP server component registry
- `mcp/claude-instructions/` - Automated task instructions for Claude

## Component Development Workflow

1. Create component in `src/design-system/components/[Name]/`
2. Implement with TypeScript + Tailwind using design tokens
3. Create Storybook story with variants and controls
4. **If exposing publicly**:
   - Export from `src/design-system/index.ts`
   - Add build entry in `vite.config.ts`
   - Update `package.json` exports
   - Add story to `.storybook/main.ts`
   - Remove from ESLint ignore list if needed
5. Test in Storybook (`npm run storybook`)
6. Verify build (`npm run build:check`)

## Dependencies

**UI Framework**:
- React 18+ (peer dependency)
- Radix UI primitives (Label, Slot)
- Lucide React (icons)
- AG Grid (Table component)

**Styling**:
- Tailwind CSS with custom config
- class-variance-authority (variant management)
- clsx + tailwind-merge (className utilities)

**Build Tools**:
- Vite (bundler)
- TypeScript (types)
- vite-plugin-dts (declaration generation)

## Node Version

Requires **Node.js >= 22.0.0** (see package.json engines)

## MCP Server (Model Context Protocol)

This repository includes an **MCP server** (`mcp/`) that exposes production-ready components to AI agents like Claude.

**Currently Exposed Components**: TopNavigator (more coming as they reach production quality)

### Documentation
For complete MCP server documentation, see:
- **[Getting Started](./mcp/docs/getting-started.md)** - Quick setup for all deployment modes
- **[Architecture](./mcp/docs/architecture.md)** - System design and implementation details
- **[API Reference](./mcp/docs/api/README.md)** - Complete API documentation with resources and tools
- **[Deployment Options](./mcp/docs/deployment/README.md)** - Local STDIO, Railway, Vercel, Docker

### Quick Start
```bash
npm run mcp:build && npm run mcp:start
```

See [mcp/README.md](./mcp/README.md) for full documentation.

## Deployment

Storybook auto-deploys to GitHub Pages via GitHub Actions:
- **Automatic**: Pushes to `main` branch
- **Manual**: Via Actions tab (see `.github/DEPLOYMENT.md`)
- Live URL: `https://wakecap.github.io/blockwork/`
