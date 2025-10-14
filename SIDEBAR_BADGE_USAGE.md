# Storybook Sidebar Badge System

A clean badge system for marking component status in the Storybook sidebar.

---

## ✅ Setup Complete

The badge system is now configured and ready to use!

### What's Been Configured:

1. **Custom Sidebar Rendering** (`.storybook/manager.ts`)
   - Automatically detects components with status tags
   - Renders badges next to component names in sidebar

2. **Badge Styling** (`.storybook/manager-head.html`)
   - Green "Ready" badge for production-ready components
   - Orange "In Progress" badge for work-in-progress
   - Blue "New" badge for newly added components

---

## 🚀 How to Use

### Add a Badge to Any Component

Simply add the appropriate tag to your component's story file:

```tsx
// Example: Button.stories.tsx
const meta: Meta<typeof Button> = {
  title: "Components/Button",        // ← Clean title, no emoji needed
  component: Button,
  tags: ["autodocs", "ready"],       // ← Add status tag here
  // ... rest of config
};
```

---

## 📋 Available Badge Tags

| Tag | Badge Text | Color | Use For |
|-----|-----------|-------|---------|
| `ready` | Ready | Green | Production-ready components |
| `in-progress` | In Progress | Orange | Components being worked on |
| `new` | New | Blue | Newly added components |

---

## 🎨 Visual Result

In the Storybook sidebar, you'll see:

```
📁 Components
  ├─ Button Ready         ← Green outlined badge
  ├─ Card In Progress     ← Orange outlined badge
  └─ Modal New            ← Blue outlined badge
```

---

## 📝 Examples

### Ready Component (Production)
```tsx
// Button.stories.tsx
export default {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs", "ready"],  // ✅ Green "Ready" badge
  // ...
} as Meta<typeof Button>;
```

### Work in Progress
```tsx
// Card.stories.tsx
export default {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs", "in-progress"],  // 🟡 Orange "In Progress" badge
  // ...
} as Meta<typeof Card>;
```

### New Component
```tsx
// Modal.stories.tsx
export default {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs", "new"],  // 🔵 Blue "New" badge
  // ...
} as Meta<typeof Modal>;
```

### No Badge
```tsx
// Draft.stories.tsx
export default {
  title: "Components/Draft",
  component: Draft,
  tags: ["autodocs"],  // No status tag = no badge
  // ...
} as Meta<typeof Draft>;
```

---

## 🔧 Adding Custom Badges

To add more badge types, update two files:

### 1. Add CSS Styling (`.storybook/manager-head.html`)
```css
.sb-status-badge.deprecated {
  background: transparent;
  color: #ef4444;
  border-color: #ef4444;
}
```

### 2. Add Detection Logic (`.storybook/manager.ts`)
```ts
if (tags.includes('deprecated')) {
  const badgeElement = document.createElement('span');
  badgeElement.className = 'sb-status-badge deprecated';
  badgeElement.textContent = 'Deprecated';
  labelElement.appendChild(badgeElement);
}
```

---

## 📊 Component Status Tracking

Track which components have which status:

### ✅ Ready (1)
- [x] Button

### 🚧 To Add Badges
- [ ] Badge
- [ ] Alert
- [ ] Input
- [ ] Card
- [ ] Checkbox
- [ ] Avatar
- [ ] (60+ more components)

---

## 💡 Tips

1. **Keep titles clean**: No emojis or text indicators needed in titles
2. **Use appropriate tags**: Choose the tag that best represents component status
3. **Multiple badges**: Components can only show one badge (first tag found)
4. **Autodocs required**: Always include `"autodocs"` tag for documentation
5. **Hot reload**: Changes take effect immediately with HMR

---

## 🔄 Migration Workflow

### Step 1: Component Started
```tsx
tags: ["autodocs", "in-progress"]  // 🟡 Orange badge
```

### Step 2: Ready for Review
```tsx
tags: ["autodocs", "new"]  // 🔵 Blue badge
```

### Step 3: Production Ready
```tsx
tags: ["autodocs", "ready"]  // ✅ Green badge
```

---

## ⚙️ Technical Details

### Files Modified:
- `.storybook/manager.ts` - Sidebar rendering logic
- `.storybook/manager-head.html` - Badge CSS styling
- `src/design-system/components/Button/Button.stories.tsx` - Example implementation

### How It Works:
1. Story file includes status tag in `tags` array
2. Manager detects tag during sidebar rendering
3. Creates badge element with appropriate CSS class
4. Badge appears next to component name in sidebar

### Badge Styles:
- Transparent background
- Colored border (1px solid)
- Colored text
- Small size (11px font, 2px padding)
- 4px border radius
- 8px left margin

---

## 🎯 Best Practices

1. **Use sparingly**: Only add badges to highlight important status
2. **Be consistent**: Use the same tags across similar component states
3. **Update regularly**: Change tags as component status evolves
4. **Document status**: Keep `COMPONENT_STATUS.md` updated with badge info
5. **Clean removal**: Remove status tags once they're no longer relevant

---

**Status**: ✅ Active  
**Last Updated**: October 13, 2025  
**First Component**: Button 🎉




