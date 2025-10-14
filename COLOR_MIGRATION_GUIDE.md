# Blockwork Color System Migration Guide

## Overview
This guide helps migrate components from old Tailwind color classes to the new Blockwork color system with the `bw-` prefix.

## Color Class Mapping

### Primary & Neutral Colors

| Old Class | New Class | Usage |
|-----------|-----------|-------|
| `bg-neutral-900` | `bg-bw-primary` | Primary backgrounds, buttons |
| `bg-neutral-800` | `bg-bw-primary-hover` | Primary hover state |
| `bg-neutral-700` | `bg-bw-primary-selected` | Selected state |
| `bg-neutral-600` | `bg-bw-text-secondary` | Secondary text |
| `bg-neutral-500` | `bg-bw-text-placeholder` | Placeholder text |
| `bg-neutral-400` | `bg-bw-text-disabled` | Disabled states, icons |
| `bg-neutral-300` | `bg-bw-border-ui` | UI borders |
| `bg-neutral-200` | `bg-bw-border-layout` | Layout borders |
| `bg-neutral-100` | `bg-bw-bg-secondary` | Secondary backgrounds |
| `bg-neutral-50` | `bg-bw-primary-highlighted` | Highlights |

### Text Colors

| Old Class | New Class | Usage |
|-----------|-----------|-------|
| `text-neutral-900` | `text-bw-text-primary` | Primary text |
| `text-neutral-700` | `text-bw-text-secondary` | Secondary text |
| `text-neutral-600` | `text-bw-text-secondary` | Secondary text alt |
| `text-neutral-500` | `text-bw-text-placeholder` | Placeholder/meta text |
| `text-neutral-400` | `text-bw-text-disabled` | Disabled text/icons |
| `text-black` | `text-bw-text-primary` | Primary text |
| `text-white` | `text-white` or `text-bw-text-on-primary` | Text on colored backgrounds |

### Border Colors

| Old Class | New Class | Usage |
|-----------|-----------|-------|
| `border-neutral-900` | `border-bw-primary` | Primary borders |
| `border-neutral-800` | `border-bw-primary-hover` | Hover state borders |
| `border-neutral-300` | `border-bw-border-ui` | Component borders |
| `border-neutral-200` | `border-bw-border-layout` | Layout separators |
| `border-neutral-100` | `border-bw-border-layout` | Subtle dividers |
| `border-gray-800` | `border-bw-border-ui` | UI borders |

### Semantic Colors

#### Success (Green)

| Old Class | New Class | Usage |
|-----------|-----------|-------|
| `bg-green-600` | `bg-bw-positive` | Success button/badge |
| `bg-green-700` | `bg-bw-positive-hover` | Success hover |
| `bg-green-500` | `bg-bw-positive` | Success state |
| `bg-green-100` | `bg-bw-positive-selected` | Success background |
| `bg-green-50` | `bg-bw-positive-selected` | Light success |
| `text-green-700` | `text-bw-positive` | Success text |
| `text-green-600` | `text-bw-positive` | Success text alt |
| `border-green-600` | `border-bw-positive` | Success border |
| `border-green-500` | `border-bw-positive` | Success border alt |

#### Error (Red)

| Old Class | New Class | Usage |
|-----------|-----------|-------|
| `bg-red-600` | `bg-bw-negative` | Error button/badge |
| `bg-red-700` | `bg-bw-negative-hover` | Error hover |
| `bg-red-500` | `bg-bw-negative` | Error state |
| `bg-red-100` | `bg-bw-negative-selected` | Error background |
| `bg-red-50` | `bg-bw-negative-selected` | Light error |
| `text-red-600` | `text-bw-negative` | Error text |
| `text-red-500` | `text-bw-negative` | Error text alt |
| `border-red-600` | `border-bw-negative` | Error border |
| `border-red-500` | `border-bw-negative` | Error border alt |

#### Warning (Yellow/Orange)

| Old Class | New Class | Usage |
|-----------|-----------|-------|
| `bg-yellow-500` | `bg-bw-warning` | Warning button |
| `bg-yellow-600` | `bg-bw-warning-hover` | Warning hover |
| `bg-yellow-100` | `bg-bw-warning-selected` | Warning background |
| `bg-orange-600` | `bg-bw-warning` | Accent/Warning |
| `bg-orange-700` | `bg-bw-warning-hover` | Accent hover |
| `bg-orange-100` | `bg-bw-warning-selected` | Accent background |
| `text-yellow-700` | `text-bw-warning` | Warning text |
| `text-orange-600` | `text-bw-warning` | Accent text |
| `border-yellow-500` | `border-bw-warning` | Warning border |

#### Info (Blue)

| Old Class | New Class | Usage |
|-----------|-----------|-------|
| `bg-blue-600` | `bg-bw-primary` | Info button |
| `bg-blue-700` | `bg-bw-primary-hover` | Info hover |
| `bg-blue-100` | `bg-bw-primary-selected` | Info background |
| `bg-blue-50` | `bg-bw-primary-selected` | Light info |
| `text-blue-700` | `text-bw-primary` | Info text |
| `text-blue-600` | `text-bw-primary` | Info text alt |
| `border-blue-600` | `border-bw-primary` | Info border |

### Background Colors

| Old Class | New Class | Usage |
|-----------|-----------|-------|
| `bg-white` | `bg-bw-bg-primary` | Main background |
| `bg-gray-50` | `bg-bw-bg-secondary` | Secondary background |
| `bg-gray-100` | `bg-bw-bg-grey` | Grey background |
| `bg-gray-200` | `bg-bw-bg-primary-hover` | Hover backgrounds |

### Ring/Focus Colors

| Old Class | New Class | Usage |
|-----------|-----------|-------|
| `focus:ring-neutral-500` | `focus:ring-bw-primary` | Focus rings |
| `focus:ring-green-500` | `focus:ring-bw-positive` | Success focus |
| `focus:ring-red-500` | `focus:ring-bw-negative` | Error focus |
| `focus:ring-orange-500` | `focus:ring-bw-warning` | Warning focus |
| `focus:ring-blue-500` | `focus:ring-bw-primary` | Info focus |
| `ring-primary-500` | `ring-bw-primary` | Active rings |

## Component-Specific Patterns

### Buttons

```tsx
// OLD
className="bg-neutral-900 text-white border border-neutral-900 hover:bg-neutral-800"

// NEW
className="bg-bw-primary text-bw-text-on-primary border border-bw-primary hover:bg-bw-primary-hover"
```

### Inputs

```tsx
// OLD
className="border-neutral-300 text-neutral-900 focus:ring-primary-500"

// NEW
className="border-bw-border-ui text-bw-text-primary focus:ring-bw-primary"
```

### Cards

```tsx
// OLD
className="bg-white border border-neutral-200 hover:border-neutral-300"

// NEW
className="bg-bw-bg-primary border border-bw-border-ui hover:border-bw-primary-hover"
```

### Alerts/Badges

```tsx
// OLD
className="bg-green-100 text-green-700 border-green-200"

// NEW
className="bg-bw-positive-selected text-bw-positive border-bw-positive"
```

## Content Colors

For visual coding (status badges, timeline bars, group colors), use content colors:

```tsx
// Status badges
<span className="bg-bw-done-green text-white">Done</span>
<span className="bg-bw-working-orange text-white">In Progress</span>
<span className="bg-bw-stuck-red text-white">Blocked</span>
<span className="bg-bw-navy text-white">Pending</span>
```

Available content colors: `grass-green`, `done-green`, `bright-green`, `saladish`, `egg-yolk`, `working-orange`, `dark-orange`, `peach`, `sunset`, `stuck-red`, `dark-red`, `sofia-pink`, `lipstick`, `bubble`, `purple`, `dark-purple`, `berry`, `lavender`, `lilac`, `orchid`, `dark-indigo`, `indigo`, `navy`, `royal`, `bright-blue`, `dark-blue`, `aquamarine`, `chili-blue`, `river`, `winter`, `sky`, `teal`, `explosive`, `american-gray`, `steel`, `blackish`, `brown`, `coffee`, `tan`.

## Search and Replace Tips

Use these patterns to find old classes:

```bash
# Find neutral colors
grep -r "text-neutral-" src/
grep -r "bg-neutral-" src/
grep -r "border-neutral-" src/

# Find semantic colors
grep -r "bg-green-" src/
grep -r "bg-red-" src/
grep -r "bg-yellow-" src/
grep -r "bg-orange-" src/
grep -r "bg-blue-" src/
```

## Quick Reference

### Most Common Replacements

1. **Primary Button**: `bg-neutral-900` → `bg-bw-primary`
2. **Primary Text**: `text-neutral-900` → `text-bw-text-primary`
3. **Secondary Text**: `text-neutral-600` → `text-bw-text-secondary`
4. **Borders**: `border-neutral-300` → `border-bw-border-ui`
5. **Success**: `bg-green-600` → `bg-bw-positive`
6. **Error**: `bg-red-600` → `bg-bw-negative`
7. **Warning**: `bg-yellow-500` or `bg-orange-600` → `bg-bw-warning`
8. **Disabled**: `text-neutral-400` → `text-bw-text-disabled`
9. **Placeholder**: `placeholder-neutral-500` → `placeholder-bw-text-placeholder`
10. **White BG**: `bg-white` → `bg-bw-bg-primary`

## Components Already Migrated

✅ Button
✅ Badge  
✅ Alert
✅ Input
✅ Card (including ProductCard, UserCard, ArticleCard)

## Components Pending Migration

See the grep output for full list of 60+ components that still need updating.

## Testing

After migration, test:

1. **Light mode** - all colors should be visible
2. **Dark mode** - colors should adapt (if `.dark` class is used)
3. **Interactive states** - hover, focus, active, disabled
4. **Semantic variants** - success, error, warning, info
5. **Accessibility** - contrast ratios meet WCAG AA standards

## Need Help?

- Check the Colors story in Storybook: `Foundation > Colors`
- Review `src/globals.css` for CSS variable definitions
- See `tailwind.config.js` for Tailwind class mappings




