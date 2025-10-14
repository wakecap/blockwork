# Storybook Component Badge Guide

A guide for adding status badges to components in Storybook.

---

## ✅ Ready Components Pattern

Use this pattern for components that are **fully migrated** and **production-ready**.

### Example: Button Component

```tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { Badge } from "../Badge/Badge";

const meta: Meta<typeof Button> = {
  title: "Components/Button 🟢",  // Green dot in sidebar
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: (
          <>
            <Badge variant="success" size="sm" style={{ marginRight: '8px' }}>
              ✅ Ready
            </Badge>
            <span>Your component description here...</span>
          </>
        ) as any,
      },
    },
  },
  tags: ["autodocs"],
  // ... rest of config
};
```

---

## 🚧 Status Badge Options

### Sidebar Indicators (in title)

| Status | Emoji | Title Example |
|--------|-------|---------------|
| Ready | 🟢 | `"Components/Button 🟢"` |
| In Progress | 🟡 | `"Components/Card 🟡"` |
| Needs Review | 🟠 | `"Components/Modal 🟠"` |
| Draft | ⚪ | `"Components/Input ⚪"` |
| Deprecated | 🔴 | `"Components/OldButton 🔴"` |
| New | ✨ | `"Components/NewFeature ✨"` |
| Beta | 🧪 | `"Components/BetaFeature 🧪"` |

### Docs Page Badges (using Badge component)

| Status | Badge Code |
|--------|-----------|
| Ready | `<Badge variant="success" size="sm">✅ Ready</Badge>` |
| In Progress | `<Badge variant="warning" size="sm">🚧 In Progress</Badge>` |
| Needs Review | `<Badge variant="warning" size="sm">⚠️ Review</Badge>` |
| Draft | `<Badge variant="secondary" size="sm">📝 Draft</Badge>` |
| Deprecated | `<Badge variant="destructive" size="sm">❌ Deprecated</Badge>` |
| New | `<Badge variant="info" size="sm">✨ New</Badge>` |
| Beta | `<Badge variant="info" size="sm">🧪 Beta</Badge>` |
| Stable | `<Badge variant="success" size="sm">🎯 Stable</Badge>` |

---

## 📋 Full Template

Copy this template for any component:

```tsx
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { YourComponent } from "./YourComponent";
import { Badge } from "../Badge/Badge";

const meta: Meta<typeof YourComponent> = {
  // 1. Add emoji to title for sidebar indicator
  title: "Components/YourComponent 🟢",
  
  component: YourComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: (
          <>
            {/* 2. Add Badge component for docs page */}
            <Badge variant="success" size="sm" style={{ marginRight: '8px' }}>
              ✅ Ready
            </Badge>
            <span>Your component description here...</span>
          </>
        ) as any,
      },
    },
  },
  tags: ["autodocs"],
  // ... rest of your config
};

export default meta;
type Story = StoryObj<typeof YourComponent>;

// Your stories here...
```

---

## 🎨 Badge Variant Mapping

| Badge Status | Badge Variant | Color Scheme |
|--------------|---------------|--------------|
| Ready / Stable | `success` | Green |
| In Progress | `warning` | Orange/Yellow |
| Review / Beta | `info` | Blue |
| Draft | `secondary` | Gray |
| Deprecated / Error | `destructive` | Red |

---

## 🔄 Migration Workflow

### Step 1: Component Not Started
```tsx
title: "Components/MyComponent ⚪"
<Badge variant="secondary" size="sm">📝 Draft</Badge>
```

### Step 2: Work In Progress
```tsx
title: "Components/MyComponent 🟡"
<Badge variant="warning" size="sm">🚧 In Progress</Badge>
```

### Step 3: Ready for Review
```tsx
title: "Components/MyComponent 🟠"
<Badge variant="warning" size="sm">⚠️ Review</Badge>
```

### Step 4: Production Ready
```tsx
title: "Components/MyComponent 🟢"
<Badge variant="success" size="sm">✅ Ready</Badge>
```

---

## 📊 Current Status Overview

### ✅ Ready Components (Blockwork Colors Applied)
- Button 🟢
- Badge (add badge to its own stories)
- Alert (add badge)
- Input (add badge)
- Card (add badge)
- Checkbox (add badge)
- Avatar (add badge)

### 🟡 In Progress
- _(Add components currently being migrated)_

### ⚪ Not Started
- _(60+ components to migrate)_

---

## 💡 Tips

1. **Consistency**: Always use the same emoji for the same status across all components
2. **Import Badge**: Don't forget to import `{ Badge } from "../Badge/Badge"`
3. **Type Cast**: Use `as any` on the component description to avoid TypeScript issues with JSX
4. **Style Override**: Use inline `style` prop for custom spacing: `style={{ marginRight: '8px' }}`
5. **Multiple Badges**: You can add multiple badges for different statuses

### Example: Multiple Badges
```tsx
<>
  <Badge variant="success" size="sm" style={{ marginRight: '4px' }}>
    ✅ Ready
  </Badge>
  <Badge variant="info" size="sm" style={{ marginRight: '8px' }}>
    ✨ New
  </Badge>
  <span>Component description...</span>
</>
```

---

## 🚀 Quick Add Script

To quickly add badges to multiple components, use this pattern:

```tsx
// 1. Import Badge at top
import { Badge } from "../Badge/Badge";

// 2. Update title
title: "Components/YourComponent 🟢",

// 3. Update description
component: (
  <>
    <Badge variant="success" size="sm" style={{ marginRight: '8px' }}>
      ✅ Ready
    </Badge>
    <span>Original description...</span>
  </>
) as any,
```

---

## 📝 Component Status Tracking

Create a simple tracking file to manage component migration:

```markdown
# Component Migration Status

## ✅ Ready (7)
- [x] Button 🟢
- [x] Badge 🟢
- [x] Alert 🟢
- [x] Input 🟢
- [x] Card 🟢
- [x] Checkbox 🟢
- [x] Avatar 🟢

## 🟡 In Progress (0)
- [ ] Modal
- [ ] Dropdown

## ⚪ Not Started (60+)
- [ ] Popover
- [ ] Stepper
- [ ] ... (continue list)
```

---

**Last Updated**: October 13, 2025  
**Pattern Status**: ✅ Active & Recommended




