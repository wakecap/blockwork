# Blockwork Color Tokens - Quick Reference

A quick lookup guide for developers to use the correct Blockwork color tokens.

---

## 🎨 Common Use Cases

### Text Colors

| Use Case | Token | CSS Variable | Light Mode Color |
|----------|-------|--------------|------------------|
| Primary text (headings, body) | `text-bw-text-primary` | `--primary-text-color` | slate-800 #1e293b |
| Secondary text (descriptions, captions) | `text-bw-text-secondary` | `--secondary-text-color` | slate-600 #475569 |
| Text on colored buttons/badges | `text-bw-on-primary` ⭐ | `--text-color-on-primary` | white #FFFFFF |
| Disabled text | `text-bw-text-disabled` | `--disabled-text-color` | slate-400 #94a3b8 |
| Placeholder text | `text-bw-text-placeholder` | `--placeholder-color` | slate-500 #64748b |
| Link text | `text-bw-text-link` | `--link-color` | slate-600 #475569 |

### Background Colors

| Use Case | Token | CSS Variable | Light Mode Color |
|----------|-------|--------------|------------------|
| Page background | `bg-bw-bg-primary` | `--primary-background-color` | white #FFFFFF |
| Card/panel background | `bg-bw-bg-secondary` | `--secondary-background-color` | slate-50 #f8fafc |
| Hover states | `bg-bw-bg-primary-hover` | `--primary-background-hover-color` | slate-100 #f1f5f9 |
| Muted/grey background | `bg-bw-bg-grey` | `--grey-background-color` | slate-200 #e2e8f0 |

### Button Colors

| Button Type | Background | Text | Hover |
|-------------|------------|------|-------|
| Primary | `bg-bw-primary` | `text-bw-on-primary` | `hover:bg-bw-primary-hover` |
| Success | `bg-bw-positive` | `text-bw-on-primary` | `hover:bg-bw-positive-hover` |
| Warning | `bg-bw-warning` | `text-bw-on-primary` | `hover:bg-bw-warning-hover` |
| Destructive | `bg-bw-negative` | `text-bw-on-primary` | `hover:bg-bw-negative-hover` |
| Secondary | `bg-bw-bg-secondary` | `text-bw-text-primary` | `hover:bg-bw-bg-primary-hover` |

### Border Colors

| Use Case | Token | CSS Variable | Light Mode Color |
|----------|-------|--------------|------------------|
| Input borders, dividers | `border-bw-border-ui` | `--ui-border-color` | slate-300 #cbd5e1 |
| Layout borders | `border-bw-border-layout` | `--layout-border-color` | slate-200 #e2e8f0 |

### Semantic Colors

| Purpose | Default | Hover | Selected |
|---------|---------|-------|----------|
| Positive/Success | `bg-bw-positive` | `bg-bw-positive-hover` | `bg-bw-positive-selected` |
| Negative/Error | `bg-bw-negative` | `bg-bw-negative-hover` | `bg-bw-negative-selected` |
| Warning | `bg-bw-warning` | `bg-bw-warning-hover` | `bg-bw-warning-selected` |
| Primary | `bg-bw-primary` | `bg-bw-primary-hover` | `bg-bw-primary-selected` |

### Icon Colors

| Use Case | Token | CSS Variable | Light Mode Color |
|----------|-------|--------------|------------------|
| Default icons | `text-bw-icon` | `--icon-color` | slate-500 #64748b |
| Icons on colored backgrounds | `text-bw-text-on-primary` | `--text-color-on-primary` | white #FFFFFF |

---

## 🚫 Never Use These (Use Design System Tokens Instead)

| ❌ Don't Use | ✅ Use Instead |
|-------------|---------------|
| `text-white` | `text-bw-on-primary` ⭐ |
| `bg-white` | `bg-bw-bg-primary` |
| `text-black` | `text-bw-text-primary` |
| `bg-neutral-*` | `bg-bw-bg-*` tokens |
| `text-neutral-*` | `text-bw-text-*` tokens |
| `border-neutral-*` | `border-bw-border-*` tokens |
| `bg-green-*` | `bg-bw-positive` |
| `bg-red-*` | `bg-bw-negative` |
| `bg-yellow-*` or `bg-orange-*` | `bg-bw-warning` |
| `bg-slate-*` | `bg-bw-primary` (for primary color) |

---

## 🎯 Component-Specific Patterns

### Button Pattern
```tsx
// Primary button
className="bg-bw-primary text-bw-on-primary hover:bg-bw-primary-hover"

// Destructive button
className="bg-bw-negative text-bw-on-primary hover:bg-bw-negative-hover"

// Ghost button
className="bg-transparent text-bw-text-secondary hover:bg-bw-bg-secondary"
```

### Input Pattern
```tsx
// Input field
className="bg-bw-bg-primary text-bw-text-primary border-bw-border-ui 
           placeholder:text-bw-text-placeholder
           focus:border-bw-primary focus:ring-bw-primary
           disabled:bg-bw-bg-secondary disabled:text-bw-text-disabled"

// Error state
className="border-bw-negative focus:ring-bw-negative"

// Success state
className="border-bw-positive focus:ring-bw-positive"
```

### Badge Pattern
```tsx
// Default badge
className="bg-bw-primary text-bw-on-primary"

// Success badge
className="bg-bw-positive-selected text-bw-positive"

// Outline badge
className="bg-transparent text-bw-text-primary border-bw-border-ui"
```

### Card Pattern
```tsx
// Card container
className="bg-bw-bg-primary border-bw-border-ui"

// Card header text
className="text-bw-text-primary"

// Card description text
className="text-bw-text-secondary"
```

### Avatar Pattern
```tsx
// Status indicators
online: "bg-bw-positive"
offline: "bg-bw-text-disabled"
away: "bg-bw-warning"
busy: "bg-bw-negative"

// Initials background
className="bg-bw-bg-secondary text-bw-text-primary"

// Fallback icon
className="bg-bw-bg-grey text-bw-text-secondary"
```

---

## 🌓 Dark Mode Support

All `bw-*` tokens automatically adapt to dark mode through CSS variables defined in `globals.css`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --primary-background-color: ...;
    --primary-text-color: ...;
    /* etc. */
  }
}
```

No need to add `dark:` prefixes when using `bw-*` tokens!

---

## 📋 Content Colors (Visual Coding)

For specialized content/visual coding needs, use these content color tokens:

**Pattern**: `bg-bw-{color-name}` / `bg-bw-{color-name}-hover` / `bg-bw-{color-name}-selected`

Examples:
- `bg-bw-grass-green`, `bg-bw-grass-green-hover`, `bg-bw-grass-green-selected`
- `bg-bw-done-green`, `bg-bw-done-green-hover`, `bg-bw-done-green-selected`
- `bg-bw-navy`, `bg-bw-navy-hover`, `bg-bw-navy-selected`

See `Colors.stories.tsx` for the full content color palette (37 colors × 3 states).

---

## 🔍 Finding the Right Token

1. **For backgrounds**: Use `bg-bw-bg-*` tokens
2. **For text**: Use `text-bw-text-*` tokens
3. **For borders**: Use `border-bw-border-*` tokens
4. **For semantic meaning** (success, error, warning): Use `bw-positive`, `bw-negative`, `bw-warning`
5. **For primary brand color**: Use `bw-primary` (currently Slate palette)
6. **For text on colored backgrounds**: Use `text-bw-on-primary` ⭐

---

## 📚 Additional Resources

- **Full Color Documentation**: See `src/stories/Foundations/Colors.stories.tsx`
- **Migration Guide**: See `COLOR_MIGRATION_GUIDE.md`
- **Recent Fixes**: See `COLOR_CONSISTENCY_AUDIT_FIXES.md`
- **CSS Variables**: See `src/globals.css` (lines 38-241)
- **Tailwind Config**: See `tailwind.config.js` (lines 81-476)

---

**Last Updated**: October 13, 2025

