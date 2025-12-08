# Blockwork Design System

A comprehensive design system built with React, TypeScript, Tailwind CSS, and Storybook. Features black primary colors, orange accents, and full RTL/Arabic support.

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start Storybook:
```bash
npm run storybook
```

## 📝 Creating New Components

1. Navigate to `/design-system/prompts/instructions.md`
2. Follow the template to create your component prompt
3. The system will generate:
   - React component with TypeScript
   - Tailwind CSS styling
   - Storybook story with variants and controls

## 🎨 Design Tokens

The design system includes predefined tokens for:
- Colors (primary, secondary)
- Spacing
- Typography
- Border Radius

These tokens are available in the Tailwind configuration and can be used in your components.

## 📚 Component Structure

Each component includes:
- TypeScript types
- Tailwind CSS styling
- Storybook documentation
- Accessibility features
- Responsive design
- **Arabic (RTL) support** with IBM Plex Sans Arabic font

## 🤖 AI Agent Integration (MCP Server)

This repository includes a Model Context Protocol (MCP) server that exposes production-ready components to AI agents like Claude.

**Features**: Component discovery, source code access, usage examples, design tokens, full documentation

**Available Components**: TopNavigator (more coming as they reach production quality)

### Documentation
- **[Getting Started](./mcp/docs/getting-started.md)** - Quick setup guide for all deployment modes
- **[Deployment Options](./mcp/docs/deployment/README.md)** - Choose between Local STDIO, Railway, Vercel, or Docker
- **[API Reference](./mcp/docs/api/README.md)** - Complete API documentation
- **[Architecture](./mcp/docs/architecture.md)** - System design and how it works

### Quick Start (Local)
```bash
npm run mcp:build && npm run mcp:start
```

See the [complete MCP documentation](./mcp/README.md) for details.

## 🌐 Arabic & RTL Support

The design system provides comprehensive Arabic language support:

### Features
- **Bilingual Components**: All components support both English and Arabic text
- **RTL Layout**: Automatic right-to-left layout for Arabic
- **Font Management**: Figtree (English) + IBM Plex Sans Arabic (Arabic)
- **Icon Positioning**: Automatic icon flipping for RTL layouts
- **Language Switching**: Built-in language switcher component

### Usage
```tsx
// Components automatically support Arabic
<Button 
  variant="primary"
  arabicText="زر أساسي"
  showArabicText={true}
>
  Primary Button
</Button>

<Input
  label="Username"
  arabicLabel="اسم المستخدم"
  arabicPlaceholder="أدخل اسم المستخدم"
  showArabicText={true}
/>
```

### FontProvider
Wrap your app with FontProvider to enable language switching:
```tsx
<FontProvider defaultLanguage="en">
  <App />
</FontProvider>
```

## 🛠️ Tech Stack

- React
- TypeScript
- Tailwind CSS
- Storybook
- Lucide Icons

## 📖 Documentation

For detailed documentation on creating components and using the design system, refer to:
- `/design-system/prompts/instructions.md`
- Storybook documentation for each component 