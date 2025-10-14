# 🏷️ Tag Badges Quick Reference

## Usage in Stories

```typescript
export const MyStory: Story = {
  tags: ['new', 'stable'],  // ← Add badges here
  args: { /* ... */ },
};
```

## Available Badge Tags

| Tag | Badge Preview | Color | When to Use |
|-----|---------------|-------|-------------|
| `new` | 🟢 **NEW** | Emerald | Recently added features, new components |
| `beta` | 🔵 **BETA** | Blue | Beta features, experimental, API may change |
| `stable` | 🟢 **STABLE** | Green | Production-ready, fully tested components |
| `ready` | 🟢 **READY** | Emerald | Component is ready for use |
| `deprecated` | 🔴 **DEPRECATED** | Red | Components marked for removal |
| `wip` | 🟠 **WIP** | Amber | Work in progress, incomplete features |
| `v1.2` `v1.3` | 🟣 **V1.2** | Violet | Version numbers (any vX.X format) |

## Examples

### Single Badge
```typescript
export const NewFeature: Story = {
  tags: ['new'],
  // ...
};
```

### Multiple Badges
```typescript
export const BetaFeature: Story = {
  tags: ['beta', 'v1.3', 'wip'],
  // ...
};
```

### Component-Level Tags
```typescript
const meta: Meta = {
  title: "Components/MyComponent",
  tags: ['stable', 'v2.0'],  // All stories inherit these
  // ...
};
```

### Story-Specific Tags
```typescript
export const ExperimentalVariant: Story = {
  tags: ['beta'],  // Only this story gets the badge
  // ...
};
```

## Badge Colors (Hex Values)

```
🟢 Green/Emerald:  #10b981, #22c55e  (new, stable)
🔵 Blue:           #3b82f6           (beta)
🔴 Red:            #ef4444           (deprecated)
🟣 Violet:         #8b5cf6           (versions)
🟠 Amber:          #f59e0b           (wip)
```

## Common Patterns

### Feature Lifecycle
```typescript
// 1. Initial development
tags: ['wip']

// 2. Ready for testing
tags: ['beta', 'v1.0']

// 3. Production release
tags: ['new', 'stable', 'v1.0']

// 4. Mature component
tags: ['stable', 'v2.0']

// 5. Phase out
tags: ['deprecated']
```

### Version Progression
```typescript
// v1.0 release
tags: ['new', 'v1.0']

// v1.2 update
tags: ['stable', 'v1.2']

// v2.0 major update
tags: ['new', 'stable', 'v2.0']
```

## Tips

✅ **Do:**
- Use 1-3 badges per story
- Update badges as features mature
- Use consistent tagging across similar components
- Add tooltips in config for clarity

❌ **Don't:**
- Use too many badges (visual clutter)
- Mix conflicting states (e.g., `stable` + `wip`)
- Forget to remove `new` after a few releases
- Use custom tags without config

## Where Badges Appear

- ✅ **Storybook sidebar** (next to story names)
- ❌ Canvas view
- ❌ Docs pages
- ❌ Addon panels

## Customization

Edit `.storybook/main.ts` to add custom badges:

```typescript
{
  tags: ["custom-tag"],
  badge: {
    text: "CUSTOM",
    bgColor: "#your-hex-color",
    fgColor: "#ffffff",
    tooltip: "Helpful description"
  }
}
```

---

📖 **Full Guide**: See `STORYBOOK_TAG_BADGES_GUIDE.md`  
⚙️ **Configuration**: See `.storybook/main.ts`  
🎯 **Examples**: See `Button.stories.tsx`

