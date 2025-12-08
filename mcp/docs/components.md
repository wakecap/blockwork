# Component Catalog

Complete catalog of production-ready UI components exposed through the MCP server.

## Overview

The Blockwork MCP Server exposes **production-ready** components from the design system. Components are only added to the MCP server once they meet production quality standards.

**Currently Available**: 1 component

## Production-Ready Components

### TopNavigator

**Category**: Navigation
**Status**: ✅ Production Ready
**Path**: `src/design-system/components/TopNavigator/TopNavigator.tsx`

#### Description

Full-featured top navigation bar designed for construction project applications. Includes project selector, menu dropdown with pinnable items, avatar menu, and settings integration.

#### Features

- ✅ Project selection with search and organization grouping
- ✅ Pinnable menu items with drag-and-drop support
- ✅ Avatar menu with user info display
- ✅ Settings menu integration
- ✅ Responsive design with mobile optimization
- ✅ Overflow handling for pinned items
- ✅ Blur backdrop when mega menu is open
- ✅ Click-away detection for all dropdowns
- ✅ Keyboard navigation support
- ✅ Arabic/RTL support ready

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `menu` | `MenuItem[]` | Yes | Array of menu items to display in the mega dropdown |
| `avatarMenu` | `MenuItem[]` | Yes | Array of items for the avatar dropdown menu |
| `projectsData` | `ProjectsData` | No | Project data organized by organizations |
| `maxVisibleItems` | `number` | No | Maximum number of pinned items visible (default: 4) |
| `settingsMenu` | `MenuItem[]` | No | Settings menu items |
| `selectedProject` | `string` | No | ID of the currently selected project |
| `selectedMenuItem` | `string` | No | ID of the currently selected menu item |
| `initialPinnedItems` | `string[]` | No | Array of menu item IDs to pin initially |
| `onProjectSelect` | `(project: {id: string, name: string}) => void` | No | Callback when project is selected |
| `onAvatarMenuItemClick` | `(item: MenuItem) => void` | No | Callback for avatar menu clicks |
| `onMenuItemClick` | `(item: MenuItem) => void` | No | Callback for menu item clicks |
| `onSettingsMenuItemClick` | `(item: MenuItem) => void` | No | Callback for settings menu clicks |
| `onPinnedItemsChange` | `(pinnedIds: string[]) => void` | No | Callback when pinned items change |
| `onPinnedItemClick` | `(item: {id: string, icon: string, label: string}) => void` | No | Callback for pinned item clicks |

#### Dependencies

This component uses these sub-components:
- `MegaDropdown`
- `Button`
- `Avatar`
- `SearchInput`
- `EmptyState`

#### Usage Example

```tsx
import { TopNavigator } from '@wakecap/blockwork-ui';

const menuItems = [
  { id: '1', label: 'Dashboard', icon: 'fa-solid fa-home', category: 'Main' },
  { id: '2', label: 'Projects', icon: 'fa-solid fa-folder', category: 'Main' },
  { id: '3', label: 'Reports', icon: 'fa-solid fa-chart-bar', category: 'Analytics' },
];

const avatarMenuItems = [
  { id: 'profile', label: 'Profile', icon: 'fa-solid fa-user' },
  { id: 'settings', label: 'Settings', icon: 'fa-solid fa-cog' },
  { id: 'logout', label: 'Logout', icon: 'fa-solid fa-sign-out' },
];

const projectsData = [
  {
    organizationId: 'org1',
    organizationName: 'WakeCap Construction',
    projects: [
      { id: 'proj1', name: 'Construction Site Alpha' },
      { id: 'proj2', name: 'Construction Site Beta' },
    ],
  },
];

function App() {
  return (
    <TopNavigator
      menu={menuItems}
      avatarMenu={avatarMenuItems}
      projectsData={projectsData}
      selectedProject="proj1"
      onMenuItemClick={(item) => console.log('Menu clicked:', item)}
      onProjectSelect={(project) => console.log('Project selected:', project)}
    />
  );
}
```

#### When to Use

**Use TopNavigator when**:
- Building a multi-project application
- Need project switching functionality
- Want consistent navigation across pages
- Require user authentication menu
- Building construction/project management apps

**Don't use when**:
- Simple single-page applications
- No project context needed
- Mobile-only applications (consider mobile-specific nav)

---

## Coming Soon

More components will be added as they reach production quality:

- **Button** - Multi-variant button component
- **Badge** - Status and category badges
- **Avatar** - User avatar with fallbacks
- **Input** - Form input components
- **Modal** - Dialog and modal windows
- **Table** - Data table with sorting/filtering

Check the [Development Guide](./development.md) to learn how components are added to the MCP server.

---

## Component Lifecycle

Components go through these stages before being exposed via MCP:

1. **Development** - Component is being built
2. **Review** - Code review and testing
3. **Storybook** - Documentation and visual testing
4. **Beta** - Used in limited production
5. **Production** - ✅ **Exposed via MCP Server**

Only **Production** level components appear in this catalog.

---

## Requesting Access to MCP

To get a component added to the MCP server:

1. Ensure component is **production-ready**
2. Add component metadata to `mcp/server/src/server.ts`
3. Include complete documentation
4. Test with AI agents
5. Submit pull request

See [Development Guide](./development.md) for step-by-step instructions.

---

## Component Metadata Structure

Each component in the MCP registry includes:

```typescript
{
  name: string;              // Component name
  description: string;       // Brief description
  category: string;          // Category (Navigation, Forms, etc.)
  path: string;              // Source file path
  props?: {                  // Component props documentation
    [propName: string]: string;
  };
  features?: string[];       // List of features
  dependencies?: string[];   // Sub-component dependencies
}
```

---

## Querying Components via MCP

### Using Resources

```typescript
// Get all components
const response = await mcp.readResource({
  uri: 'blockwork://design-system/components'
});

// Get specific component
const response = await mcp.readResource({
  uri: 'blockwork://components/TopNavigator'
});
```

### Using Tools

```typescript
// Search for components
const results = await mcp.callTool({
  name: 'search_components',
  arguments: { query: 'navigation' }
});

// Get component code
const code = await mcp.callTool({
  name: 'get_component_code',
  arguments: { componentName: 'TopNavigator' }
});

// Get usage example
const example = await mcp.callTool({
  name: 'get_usage_example',
  arguments: {
    componentName: 'TopNavigator',
    variant: 'default'
  }
});
```

See [API Tools Reference](./api/tools.md) for complete tool documentation.

---

## Support

- **Component Issues**: [GitHub Issues](https://github.com/wakecap/blockwork/issues)
- **Storybook**: View live examples at the Storybook deployment
- **Development**: See [Development Guide](./development.md)
