# Storybook Tag Badges Guide

This guide explains how to use tag badges in your Storybook sidebar to highlight component status, versions, and other metadata.

## 📦 Package Used

**storybook-addon-tag-badges** - Automatically displays badges next to story items in the Storybook sidebar based on story tags.

## ✅ Setup Complete

The addon is already configured in `.storybook/main.ts` with predefined badge styles for common use cases.

## 🎯 How to Use

### Basic Usage

Add tags to any story to show badges in the sidebar:

```typescript
export const MyStory: Story = {
  tags: ['new', 'stable'],
  args: {
    // your story args
  },
};
```

### Multiple Badges

You can add multiple tags to a single story:

```typescript
export const ComplexFeature: Story = {
  tags: ['beta', 'v1.3', 'wip'],
  args: {
    // ...
  },
};
```

### Component-Level Tags

Add tags at the meta level to apply them to all stories in a component:

```typescript
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["stable", "v1.2"], // Applied to all Button stories
  // ...
};
```

## 🎨 Pre-configured Badges

The following badges are already configured and ready to use:

| Tag          | Badge Text     | Color        | Use Case                              |
|--------------|----------------|--------------|---------------------------------------|
| `new`        | NEW            | Green        | Recently added features               |
| `beta`       | BETA           | Blue         | Beta features, API may change         |
| `stable`     | STABLE         | Green        | Production-ready components           |
| `ready`      | READY          | Emerald      | Component is ready for use            |
| `deprecated` | DEPRECATED     | Red          | Components to be removed              |
| `wip`        | WIP            | Amber        | Work in progress                      |
| `v1.2`, etc. | V1.2 (dynamic) | Violet       | Version numbers                       |

## 🛠️ Customizing Badges

To add or modify badges, edit `.storybook/main.ts`:

```typescript
{
  name: "storybook-addon-tag-badges",
  options: {
    badges: [
      {
        tags: ["your-tag"],
        badge: {
          text: "YOUR LABEL",
          bgColor: "#hex-color",
          fgColor: "#ffffff",
          tooltip: "Helpful description shown on hover",
        },
      },
    ],
  },
}
```

### Advanced: Dynamic Badge Text

You can use a function to generate badge text dynamically:

```typescript
{
  tags: ["v1.0", "v1.1", "v1.2", "v2.0"],
  badge: {
    text: (tag: string) => tag.toUpperCase(),
    bgColor: "#8b5cf6",
    fgColor: "#ffffff",
    tooltip: "Version number",
  },
}
```

### Badge Configuration Options

- **tags**: Array of tag strings to match
- **badge.text**: String or function `(tag: string) => string`
- **badge.bgColor**: Background color (hex, rgb, or CSS color name)
- **badge.fgColor**: Text color (hex, rgb, or CSS color name)
- **badge.tooltip**: Optional hover tooltip text

## 📋 Live Examples

Check these Button component stories to see badges in action:

1. **Playground** - Shows `NEW` and `STABLE` badges
2. **IconShowcase** - Shows `BETA` and `V1.2` badges
3. **StateCombinations** - Shows `WIP` badge

## 🎨 Color Palette (Tailwind CSS)

Pre-configured badges use Tailwind colors for consistency:

- 🟢 Green/Emerald (`#10b981`, `#22c55e`) - Positive, stable, new
- 🔵 Blue (`#3b82f6`) - Beta, informational
- 🔴 Red (`#ef4444`) - Deprecated, warnings
- 🟣 Violet (`#8b5cf6`) - Versions, special features
- 🟠 Amber (`#f59e0b`) - In progress, attention needed

## 🚀 Best Practices

1. **Use sparingly** - Too many badges create visual clutter
2. **Be consistent** - Use the same tags across similar stories
3. **Update regularly** - Remove `new` tags after a few releases
4. **Clear tooltips** - Add helpful tooltips to explain badge meaning
5. **Version tags** - Use semantic versioning (v1.0, v2.0, etc.)

## 🔄 Badge Lifecycle Example

```typescript
// Initial release
tags: ['new', 'beta']

// After testing
tags: ['stable', 'v1.0']

// Later version
tags: ['stable', 'v1.2']

// Before removal
tags: ['deprecated']
```

## 📝 TypeScript Support

The addon is fully compatible with TypeScript and Storybook 8+. Tags are typed as string arrays:

```typescript
import type { StoryObj } from "@storybook/react-vite";

export const MyStory: StoryObj<typeof Component> = {
  tags: ['new', 'stable'], // Type-safe
  // ...
};
```

## 🐛 Troubleshooting

### Badges not appearing?

1. Make sure the addon is in your `.storybook/main.ts` addons array
2. Verify tag names match the configuration exactly (case-sensitive)
3. Restart Storybook after configuration changes
4. Check browser console for any errors

### Badge colors not working?

- Use hex colors (`#10b981`) instead of CSS variables
- Ensure colors have proper contrast for readability
- Test in both light and dark modes if applicable

## 📚 Additional Resources

- [storybook-addon-tag-badges on npm](https://www.npmjs.com/package/storybook-addon-tag-badges)
- [Storybook Tags Documentation](https://storybook.js.org/docs/react/writing-stories/tags)

---

**Note**: Badges appear only in the Storybook sidebar navigation, not in the canvas or docs pages.

