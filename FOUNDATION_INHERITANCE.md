# Foundation Inheritance System

## Overview

All components in the Blockwork Design System now inherit colors and typography from a centralized foundation. This ensures consistency across the entire system and makes it easy to maintain a unified look and feel.

## 🎨 Color Inheritance

### Global Base Styles

All HTML elements automatically inherit Blockwork colors through global CSS:

```css
/* Body inherits primary background and text */
body {
  @apply bg-bw-bg-primary text-bw-text-primary;
}

/* Headings inherit primary text color */
h1, h2, h3, h4, h5, h6 {
  @apply text-bw-text-primary font-heading;
}

/* Paragraphs and spans inherit primary text */
p, span, div {
  @apply text-bw-text-primary;
}

/* Links use link color */
a {
  @apply text-bw-text-link;
}

/* Form elements inherit appropriate colors */
input, textarea, select {
  @apply bg-bw-bg-primary text-bw-text-primary border-bw-border-ui;
}

/* And much more... */
```

### What This Means

✅ **Automatic Consistency**: Components automatically get the right colors without explicit styling  
✅ **Dark Mode Support**: All colors adapt when `.dark` class is applied  
✅ **Easy Maintenance**: Change colors in one place, affects entire system  
✅ **Semantic Meaning**: Colors have clear purposes (primary, secondary, success, error, etc.)

## 📝 Typography Components

### Foundation Text Components

We've created reusable typography components that all inherit from Blockwork color tokens:

#### **Heading**
```tsx
import { Heading } from '@/design-system';

<Heading level="h1" color="primary">Main Title</Heading>
<Heading level="h2" color="secondary">Subtitle</Heading>
```

**Props:**
- `level`: h1, h2, h3, h4, h5, h6
- `color`: primary, secondary, disabled, onPrimary, onInverted, link
- `as`: Override the HTML element (e.g., use h1 but style as h3)

#### **Text**
```tsx
import { Text } from '@/design-system';

<Text size="base" weight="normal" color="primary">
  Body text automatically inherits proper colors
</Text>

<Text size="sm" color="secondary">
  Secondary information
</Text>
```

**Props:**
- `size`: xs, sm, base, lg, xl
- `weight`: light, normal, medium, semibold, bold
- `color`: primary, secondary, disabled, placeholder, link, positive, negative, warning
- `align`: left, center, right, justify
- `truncate`: boolean
- `lineClamp`: 1-6
- `as`: p, span, div, label

#### **Label**
```tsx
import { Label } from '@/design-system';

<Label htmlFor="email" required>
  Email Address
</Label>
```

**Props:**
- `size`: sm, base, lg
- `color`: primary, secondary, disabled
- `required`: Shows asterisk

#### **Link**
```tsx
import { Link } from '@/design-system';

<Link href="/about" variant="default">About Us</Link>
<Link href="https://example.com" external>External Link</Link>
```

**Props:**
- `variant`: default, inline, subtle, navigation
- `size`: sm, base, lg
- `external`: Adds target="_blank" and icon

#### **Code**
```tsx
import { Code } from '@/design-system';

<Text>This is <Code>inline code</Code> example</Text>

<Code variant="block">
  {`function hello() {
    return "world";
  }`}
</Code>
```

#### **Caption**
```tsx
import { Caption } from '@/design-system';

<Caption color="secondary">
  Published on October 13, 2025
</Caption>
```

#### **Blockquote**
```tsx
import { Blockquote } from '@/design-system';

<Blockquote>
  "Design is not just what it looks like and feels like. 
   Design is how it works." - Steve Jobs
</Blockquote>
```

#### **List**
```tsx
import { List } from '@/design-system';

<List variant="unordered" items={[
  "First item",
  "Second item",
  "Third item"
]} />

<List variant="ordered" items={[
  "Step one",
  "Step two",
  "Step three"
]} />
```

## 🔗 How Components Should Use the Foundation

### ✅ CORRECT: Use Foundation Components

```tsx
import { Heading, Text, Button } from '@/design-system';

export const MyComponent = () => (
  <div>
    <Heading level="h2">Section Title</Heading>
    <Text color="secondary">
      This description automatically gets the right color
    </Text>
    <Button variant="primary">Click Me</Button>
  </div>
);
```

### ✅ CORRECT: Use Blockwork Color Classes

```tsx
export const MyComponent = () => (
  <div className="bg-bw-bg-primary border border-bw-border-ui">
    <h2 className="text-bw-text-primary">Title</h2>
    <p className="text-bw-text-secondary">Description</p>
  </div>
);
```

### ❌ INCORRECT: Hard-coded Colors

```tsx
// DON'T DO THIS
export const MyComponent = () => (
  <div className="bg-neutral-100 border border-gray-300">
    <h2 className="text-neutral-900">Title</h2>
    <p className="text-neutral-600">Description</p>
  </div>
);
```

## 🎯 Color Token Reference

### Semantic Colors

| Token | Usage | Tailwind Class |
|-------|-------|----------------|
| Primary | Main actions, buttons | `bg-bw-primary` |
| Primary Hover | Interactive hover | `bg-bw-primary-hover` |
| Primary Selected | Selected state | `bg-bw-primary-selected` |
| Positive | Success states | `bg-bw-positive` |
| Negative | Error states | `bg-bw-negative` |
| Warning | Warning states | `bg-bw-warning` |

### Text Colors

| Token | Usage | Tailwind Class |
|-------|-------|----------------|
| Primary Text | Main content | `text-bw-text-primary` |
| Secondary Text | Supporting content | `text-bw-text-secondary` |
| Disabled Text | Disabled states | `text-bw-text-disabled` |
| Placeholder | Input placeholders | `text-bw-text-placeholder` |
| Link | Hyperlinks | `text-bw-text-link` |
| On Primary | Text on colored backgrounds | `text-bw-text-on-primary` |

### Background Colors

| Token | Usage | Tailwind Class |
|-------|-------|----------------|
| Primary BG | Main background | `bg-bw-bg-primary` |
| Secondary BG | Secondary surfaces | `bg-bw-bg-secondary` |
| UI BG | Component backgrounds | `bg-bw-bg-ui` |
| Grey BG | Neutral backgrounds | `bg-bw-bg-grey` |

### Border Colors

| Token | Usage | Tailwind Class |
|-------|-------|----------------|
| UI Border | Component borders | `border-bw-border-ui` |
| Layout Border | Section separators | `border-bw-border-layout` |

## 📋 Component Migration Checklist

When creating or updating components:

- [ ] Use foundation `<Heading>`, `<Text>`, `<Label>` components for text
- [ ] Use `bw-*` color classes instead of `neutral-*`, `gray-*`, etc.
- [ ] Ensure semantic colors are used correctly (positive = success, negative = error)
- [ ] Test in both light and dark modes
- [ ] Verify text contrast meets accessibility standards
- [ ] Use content colors (`bw-done-green`, `bw-navy`, etc.) ONLY for visual coding
- [ ] Check that hover/focus/disabled states use proper color tokens
- [ ] Export component from `src/design-system/index.ts`

## 🧪 Testing

### Visual Testing
1. View component in Storybook
2. Toggle dark mode
3. Check all interactive states (hover, focus, active, disabled)
4. Verify semantic variants (success, error, warning, info)

### Accessibility Testing
1. Run contrast checker on text colors
2. Ensure WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
3. Test with screen reader
4. Verify keyboard navigation

## 📚 Documentation

- **Colors**: See `Foundation > Colors` in Storybook
- **Typography**: See `Foundation > Typography` in Storybook
- **Migration Guide**: `/COLOR_MIGRATION_GUIDE.md`
- **Status**: `/COLOR_SYSTEM_STATUS.md`

## 🎨 Examples

### Complete Component Example

```tsx
import { Heading, Text, Label, Button, Input } from '@/design-system';

export const ContactForm = () => (
  <form className="bg-bw-bg-primary border border-bw-border-ui rounded-lg p-6">
    {/* Title automatically gets primary text color */}
    <Heading level="h2" className="mb-4">
      Contact Us
    </Heading>

    {/* Description gets secondary color */}
    <Text color="secondary" className="mb-6">
      Fill out the form below and we'll get back to you soon.
    </Text>

    {/* Form field with proper label and input colors */}
    <div className="mb-4">
      <Label htmlFor="email" required>
        Email Address
      </Label>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email"
        className="mt-1"
      />
    </div>

    {/* Buttons use semantic colors */}
    <div className="flex gap-2">
      <Button variant="primary">Submit</Button>
      <Button variant="ghost">Cancel</Button>
    </div>
  </form>
);
```

### Card with Proper Inheritance

```tsx
import { Heading, Text, Caption, Button } from '@/design-system';

export const ArticleCard = ({ article }) => (
  <article className="bg-bw-bg-primary border border-bw-border-ui rounded-lg p-6 hover:border-bw-primary-hover transition-colors">
    {/* All text inherits proper colors */}
    <Heading level="h3" className="mb-2">
      {article.title}
    </Heading>

    <Caption color="secondary" className="mb-4">
      {article.date} • {article.readTime}
    </Caption>

    <Text color="secondary" className="mb-4" lineClamp={3}>
      {article.excerpt}
    </Text>

    <Button variant="outline" size="sm">
      Read More
    </Button>
  </article>
);
```

## 🚀 Benefits

### For Developers
- ✅ Less code to write
- ✅ Consistent styling automatically
- ✅ Type-safe with TypeScript
- ✅ Easy to maintain
- ✅ Clear semantic meaning

### For Users
- ✅ Consistent visual experience
- ✅ Better accessibility
- ✅ Smooth dark mode transitions
- ✅ Professional appearance

### For Design
- ✅ Single source of truth
- ✅ Easy to update globally
- ✅ Enforces design system rules
- ✅ Scales with the product

---

**Last Updated**: October 13, 2025  
**Foundation Components**: Heading, Text, Label, Link, Code, Caption, Blockquote, List  
**Color Tokens**: 150+ variables covering all use cases  
**Components Migrated**: 6/66 (Button, Badge, Alert, Input, Card, Checkbox)




