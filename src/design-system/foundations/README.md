# Design System Foundations

This document outlines the foundational design tokens and systems that form the base of our design system. These tokens ensure consistency, scalability, and maintainability across all components and applications.

## 🎨 Color System

### Primary Brand Colors

Our primary color palette uses orange tones that convey energy, warmth, and enthusiasm:

- **Primary-500**: `#f97316` - Main brand color
- **Primary-600**: `#ea580c` - Interactive states
- **Primary-700**: `#c2410c` - Active states

### Semantic Colors

Semantic colors provide meaning and context:

- **Success**: Green tones for positive actions and states
- **Error**: Red tones for errors and destructive actions
- **Warning**: Yellow/orange tones for caution and alerts
- **Info**: Blue tones for informational content

### Neutral Colors

A comprehensive neutral palette for text, backgrounds, and borders:

- **Neutral-50 to 950**: Complete grayscale from light to dark
- **Secondary-50 to 950**: Cool grays for interfaces

## 📝 Typography

### Font Families

- **Sans**: Figtree (primary) with system font fallbacks
- **Arabic**: IBM Plex Sans Arabic for Arabic text and RTL support
- **Mono**: SF Mono, Consolas for code and data
- **Serif**: Georgia for editorial content

### Multilingual Support

Our typography system supports both English and Arabic languages:

- **English**: Uses Figtree font family for optimal readability
- **Arabic**: Uses IBM Plex Sans Arabic with proper RTL (right-to-left) support
- **Automatic Switching**: FontProvider component handles language switching
- **Fallbacks**: System fonts as backup for optimal performance

### Type Scale

Following a modular scale from 12px to 128px:

- **xs**: 12px - Small captions and labels
- **sm**: 14px - Secondary text
- **base**: 16px - Body text (default)
- **lg**: 18px - Emphasized text
- **xl**: 20px - Small headings
- **2xl-9xl**: 24px-128px - Display headings

### Font Weights

- **Light (300)**: Large headings
- **Normal (400)**: Body text
- **Medium (500)**: Emphasized text
- **Semibold (600)**: Subheadings
- **Bold (700)**: Headings
- **Extrabold (800)**: Display text

## 📏 Spacing System

Based on an 8-point grid system for consistent spacing:

- **Base unit**: 4px (0.25rem)
- **Scale**: 0, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24...
- **Usage**: Padding, margins, gaps, positioning

## 📱 Responsive Breakpoints

Mobile-first responsive design:

- **xs**: 475px - Extra small devices
- **sm**: 640px - Small devices (phones)
- **md**: 768px - Medium devices (tablets)
- **lg**: 1024px - Large devices (laptops)
- **xl**: 1280px - Extra large devices (desktops)
- **2xl**: 1536px - Extra extra large devices

## 🎭 Elevation & Shadows

### Standard Shadows

Progressive elevation levels:

- **xs**: Minimal depth
- **sm**: Subtle elevation
- **md**: Standard cards
- **lg**: Prominent elements
- **xl**: High emphasis
- **2xl**: Maximum elevation

### Material Design Elevation

Semantic elevation levels:

- **elevation-1**: Raised surfaces
- **elevation-2**: App bars, cards
- **elevation-3**: Drawers, modals
- **elevation-4**: Navigation drawer
- **elevation-5**: Highest elevation

## 🔘 Border Radius

Consistent corner rounding:

- **xs**: 2px - Small elements
- **sm**: 4px - Buttons, inputs
- **default**: 6px - Cards, containers
- **md**: 8px - Larger elements
- **lg**: 12px - Prominent containers
- **xl-3xl**: 16px-32px - Large containers
- **full**: Complete rounding

## ⚡ Motion & Animation

### Duration Tokens

- **fast**: 150ms - Micro-interactions
- **base**: 250ms - Standard transitions
- **slow**: 350ms - Complex animations
- **slower**: 500ms - Page transitions

### Easing Functions

- **ease-out-quart**: Snappy exits
- **ease-in-quart**: Smooth entrances
- **ease-in-out-quart**: Balanced motion
- **ease-out-expo**: Dramatic effects

### Animation Presets

- **fade-in/out**: Opacity transitions
- **slide-in**: Directional entrances
- **scale-in**: Growing elements
- **pulse**: Attention-getting

## 👁️ Opacity Scale

Transparency levels from 0-100% in 5% increments:

- Common values: 0, 10, 25, 50, 75, 90, 100
- **Usage**: Disabled states, overlays, emphasis

## 📚 Z-Index Scale

Semantic layering system:

- **hide (-1)**: Hidden elements
- **base (0)**: Default level
- **docked (10)**: Fixed elements
- **dropdown (1000)**: Menus
- **modal (1400)**: Dialogs
- **tooltip (1800)**: Highest priority

## 🎯 Icon System

**Built on FontAwesome 7 Pro** - Licensed for comprehensive icon coverage including premium icons and styles.

### Categories

- **Navigation**: Menu, arrows, navigation
- **Actions**: CRUD operations, interactions
- **Status**: States, feedback, indicators
- **User**: Profiles, authentication
- **Communication**: Messages, notifications
- **Settings**: Configuration, tools

### Icon Styles Available

- **Solid**: Primary style for most use cases
- **Regular**: Lighter weight for subtle interfaces
- **Light**: Thin style for modern, minimal designs
- **Duotone**: Two-tone icons for enhanced visual hierarchy

### Sizes

- **xs-4xl**: 12px-36px following typography scale
- **Usage**: Matches text sizes for alignment

### Colors

- **Neutral**: Default icon color
- **Primary**: Brand actions
- **Success/Error/Warning/Info**: Semantic states

## 🏗️ Grid & Layout

### CSS Grid

- **12-column system**: Flexible layouts
- **Responsive**: Breakpoint-based columns
- **Column spans**: 1-12 flexible sizing

### Flexbox

- **Direction**: Row/column layouts
- **Justification**: Content distribution
- **Alignment**: Cross-axis positioning
- **Gaps**: Consistent spacing

### Containers

- **Responsive padding**: Breakpoint-based
- **Max-width constraints**: Content optimization
- **Centering**: Consistent alignment

## 🌐 FontProvider Component

### Overview

The FontProvider component manages font family switching between English and Arabic languages with automatic RTL support.

### Features

- **Automatic Language Detection**: Switches between Figtree (English) and IBM Plex Sans Arabic (Arabic)
- **RTL Support**: Automatically applies right-to-left layout for Arabic text
- **Context-Based**: Uses React Context for global font management
- **Performance Optimized**: Fonts are loaded only when needed

### Usage

```tsx
import { FontProvider, LanguageSwitcher, useFont } from '../components/FontProvider';

// Wrap your app with FontProvider
<FontProvider defaultLanguage="en">
  <App />
</FontProvider>

// Use the language switcher
<LanguageSwitcher />

// Access font context in components
const { language, fontFamily } = useFont();
```

### Components

- **FontProvider**: Main context provider for font management
- **LanguageSwitcher**: UI component for switching between languages
- **EnglishText**: Wrapper for English text with Figtree font
- **ArabicText**: Wrapper for Arabic text with IBM Plex Sans Arabic font

## 🛠️ Usage Guidelines

### Implementation

1. **Use tokens**: Always use design tokens instead of hardcoded values
2. **Mobile-first**: Start with mobile and enhance upward
3. **Consistency**: Apply tokens consistently across all components
4. **Performance**: Optimize for rendering and accessibility

### Code Examples

```tsx
// Colors
className = "bg-primary-600 text-white hover:bg-primary-700";

// Typography
className = "text-lg font-semibold text-neutral-900";

// Spacing
className = "p-4 mb-6 gap-3";

// Responsive
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

// Elevation
className = "shadow-md hover:shadow-lg";

// Motion
className = "transition-all duration-base ease-out-quart";
```

## 📋 Token Reference

### CSS Custom Properties

Tokens are available as Tailwind classes and can be extended with CSS custom properties for advanced use cases.

### Design Tool Integration

Tokens can be exported for design tools like Figma, Sketch, and Adobe XD to maintain design-development parity.

### Testing

All tokens include accessibility testing for color contrast, motion preferences, and screen reader compatibility.

---

_This foundation system provides the building blocks for creating consistent, accessible, and scalable user interfaces across all platforms and applications._
