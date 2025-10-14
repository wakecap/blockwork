# Blockwork Color System

## Overview

Blockwork is very visual and our color system helps users identify status, see actions, locate help, and to indicate next steps. The consistent use of color in our product keeps cognitive loads low, and makes for a unified and engaging user experience. The colors are designed to be clear and accessible.

## Color Categories

### 1. Semantic Colors

These colors are used to emphasize main UI components and indicate various states:

#### Primary Colors
- **primary-color** - Use to emphasise main UI components
- **primary-hover-color** - Use only as a hover on primary color
- **primary-selected-color** - Use to indicate selected state of primary items
- **primary-selected-hover-color** - Use to indicate hover state on a primary-selected-color items
- **primary-highlighted-color** - Use this to indicate highlighted components of primary items
- **primary-surface-color** - Use this as the surface of the main layout appearance

**Tailwind Classes**: `bg-bw-primary`, `bg-bw-primary-hover`, `bg-bw-primary-selected`, etc.

#### Positive Colors (Success/Green)
- **positive-color** - Use to indicate a positive action/state (success, completion, approval)
- **positive-color-hover** - Use only as hover color on positive color
- **positive-color-selected** - Use only as selected indication for a positive colors
- **positive-color-selected-hover** - Use to indicate hover state on a positive-color-selected items

**Tailwind Classes**: `bg-bw-positive`, `bg-bw-positive-hover`, `bg-bw-positive-selected`, etc.

#### Negative Colors (Error/Red)
- **negative-color** - Use to indicate a negative action/state (delete, error)
- **negative-color-hover** - Use only as hover color on negative color
- **negative-color-selected** - Use as selected indication for negative colors
- **negative-color-selected-hover** - Use to indicate hover state on a negative-selected items

**Tailwind Classes**: `bg-bw-negative`, `bg-bw-negative-hover`, `bg-bw-negative-selected`, etc.

#### Warning Colors (Yellow/Orange)
- **warning-color** - Use to indicate a warning action/state (severity, alert, caution)
- **warning-color-hover** - Use only as hover color on warning color
- **warning-color-selected** - Use only as selected indication for warning colors
- **warning-color-selected-hover** - Use to indicate hover state on a warning-selected items

**Tailwind Classes**: `bg-bw-warning`, `bg-bw-warning-hover`, `bg-bw-warning-selected`, etc.

#### Other Semantic Colors
- **inverted-color-background** - Inverted background color (opposite of primary background color)
- **icon-color** - Default color for icons
- **fixed-light-color** - Use as color that should remain light in all themes
- **fixed-dark-color** - Use as color that should remain dark in all themes

**Tailwind Classes**: `bg-bw-inverted-background`, `text-bw-icon`, `bg-bw-fixed-light`, `bg-bw-fixed-dark`

---

### 2. Background Colors

Background colors for different UI layers:

- **primary-background-color** - Primary background color
- **secondary-background-color** - Secondary background color
- **primary-background-hover-color** - Use as hover color
- **grey-background-color** - Grey background color
- **allgrey-background-color** - Grey background color, stays grey in dark and black themes
- **ui-background-color** - Background color for UI elements and components

**Tailwind Classes**: `bg-bw-bg-primary`, `bg-bw-bg-secondary`, `bg-bw-bg-grey`, `bg-bw-bg-ui`

---

### 3. Text Colors

Text colors for different hierarchies and contexts:

- **primary-text-color** - Use for default text color
- **secondary-text-color** - Use when you need text with lesser importance
- **secondary-text-on-secondary-color** - Use when you need text with lesser importance (on secondary background color)
- **text-color-on-inverted** - Inverted text color (opposite of primary text color)
- **text-color-on-primary** - Use for text on primary color
- **disabled-text-color** - Use as text in disabled components
- **placeholder-color** - Use for placeholder text in inputs fields
- **link-color** - Use only for links

**Tailwind Classes**: `text-bw-text-primary`, `text-bw-text-secondary`, `text-bw-text-disabled`, `text-bw-text-link`

---

### 4. Border Colors

Border colors for UI elements and layouts:

- **ui-border-color** - Border color for UI elements and components (Button, Input...)
- **layout-border-color** - Border color for general layout and separators (Leftpane, Menu Divider...)

**Tailwind Classes**: `border-bw-border-ui`, `border-bw-border-layout`

---

### 5. Content Colors

These colors are used **only** for color coding purposes like groups colors, statuses timeline bars etc. This gives understanding and indication of orientation and belonging. The board's main strength is its simple and visual appearance. That's why the status colors should appear on the board and nowhere else in the UI.

#### Available Content Colors

Each color comes with three states: **Default**, **Hover**, and **Selected**

**Green Shades:**
- grass-green
- done-green
- bright-green
- saladish

**Yellow & Orange Shades:**
- egg-yolk
- working-orange
- dark-orange
- peach

**Red & Pink Shades:**
- sunset
- stuck-red
- dark-red
- sofia-pink
- lipstick
- bubble

**Purple Shades:**
- purple
- dark-purple
- berry
- lavender
- lilac
- orchid

**Blue Shades:**
- dark-indigo
- indigo
- navy
- royal
- bright-blue
- dark-blue
- aquamarine
- chili-blue
- river
- winter
- sky
- teal

**Neutral & Others:**
- explosive
- american-gray
- steel
- blackish
- brown
- coffee
- tan

**Tailwind Classes Example**: 
```tsx
<div className="bg-bw-grass-green">Default</div>
<div className="bg-bw-grass-green-hover">Hover</div>
<div className="bg-bw-grass-green-selected">Selected</div>
```

---

## Usage Guidelines

### When to Use Semantic Colors

1. **Primary Colors**: 
   - Main actions and primary buttons
   - Links and interactive elements that need emphasis
   - Active navigation items

2. **Positive Colors**: 
   - Success messages ("Saved successfully")
   - Completion states ("Task completed")
   - Approval indicators ("Approved")

3. **Negative Colors**: 
   - Error messages
   - Destructive actions (delete, remove)
   - Failed states
   - Always pair with clear messaging

4. **Warning Colors**: 
   - Warnings and cautions
   - Pending actions
   - States requiring attention

### When to Use Content Colors

Content colors should be used ONLY for:
- Status indicators on boards and timelines
- Group headers and category labels
- Progress bars and timeline segments
- Tags and labels for visual organization

❌ **Don't** use content colors for:
- Buttons
- General UI components
- Text colors (except on colored backgrounds)
- Borders (use border colors instead)

### Accessibility Considerations

1. **Contrast Ratios**: All text colors meet WCAG AA standards
2. **Never rely on color alone**: Always pair color with text or icons
3. **Distinct States**: Hover and selected states are visually distinct
4. **Colorblind Friendly**: System designed to work for colorblind users

---

## Implementation Examples

### Basic Usage

```tsx
// Semantic colors
<button className="bg-bw-primary hover:bg-bw-primary-hover text-white">
  Primary Action
</button>

<div className="bg-bw-positive text-white p-4 rounded">
  Success! Your changes have been saved.
</div>

// Background colors
<div className="bg-bw-bg-primary text-bw-text-primary">
  Main content area
</div>

// Text colors
<p className="text-bw-text-primary">Main text</p>
<p className="text-bw-text-secondary">Secondary text</p>
<p className="text-bw-text-disabled">Disabled text</p>

// Border colors
<div className="border-2 border-bw-border-ui rounded p-4">
  Card with UI border
</div>

// Content colors for status badges
<span className="bg-bw-done-green text-white px-3 py-1 rounded-full text-sm">
  Done
</span>
<span className="bg-bw-working-orange text-white px-3 py-1 rounded-full text-sm">
  In Progress
</span>
<span className="bg-bw-stuck-red text-white px-3 py-1 rounded-full text-sm">
  Blocked
</span>
```

### Interactive States

```tsx
// Button with all states
<button className="
  bg-bw-primary 
  hover:bg-bw-primary-hover 
  active:bg-bw-primary-selected
  text-white px-4 py-2 rounded
  transition-colors
">
  Interactive Button
</button>

// Status badge with hover effect
<span className="
  bg-bw-navy 
  hover:bg-bw-navy-hover 
  text-white px-3 py-1 rounded cursor-pointer
  transition-colors
">
  Status Tag
</span>
```

### Dark Mode Support

All colors automatically adapt to dark mode. The system uses CSS variables that change based on the `.dark` class:

```tsx
// This will automatically work in both light and dark mode
<div className="bg-bw-bg-primary text-bw-text-primary">
  Content that adapts to theme
</div>
```

---

## Color Naming Convention

All Blockwork colors use the `bw-` prefix to distinguish them from other color systems:

- **Semantic**: `bw-primary`, `bw-positive`, `bw-negative`, `bw-warning`
- **Background**: `bw-bg-*`
- **Text**: `bw-text-*`
- **Border**: `bw-border-*`
- **Content**: `bw-{color-name}` (e.g., `bw-grass-green`, `bw-navy`)

Each color with states includes:
- `bw-{color}` - Default state
- `bw-{color}-hover` - Hover state
- `bw-{color}-selected` - Selected state
- `bw-{color}-selected-hover` - Selected + Hover state (for semantic colors)

---

## CSS Variables

All colors are defined as CSS variables in `globals.css` and can be accessed directly:

```css
/* Example CSS variable usage */
.custom-element {
  background-color: hsl(var(--primary-color));
  color: hsl(var(--text-color-on-primary));
  border: 1px solid hsl(var(--ui-border-color));
}

.custom-element:hover {
  background-color: hsl(var(--primary-hover-color));
}
```

---

## Migration Guide

If migrating from the old color system:

| Old Class | New Class |
|-----------|-----------|
| `bg-orange-600` | `bg-bw-primary` or `bg-bw-working-orange` (depending on usage) |
| `bg-green-600` | `bg-bw-positive` or `bg-bw-done-green` (depending on usage) |
| `bg-red-600` | `bg-bw-negative` or `bg-bw-stuck-red` (depending on usage) |
| `bg-yellow-500` | `bg-bw-warning` or `bg-bw-egg-yolk` (depending on usage) |
| `text-gray-600` | `text-bw-text-secondary` |
| `text-gray-900` | `text-bw-text-primary` |
| `border-gray-300` | `border-bw-border-ui` or `border-bw-border-layout` |

---

## Resources

- **Storybook**: See the Colors story in Foundation section for visual examples
- **Design Tokens**: All colors are defined in `src/globals.css`
- **Tailwind Config**: Color mappings in `tailwind.config.js`

---

## Questions?

For questions about the color system or to suggest improvements, please reach out to the design system team.




