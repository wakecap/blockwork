# Component Catalog

Complete catalog of production-ready UI components exposed through the MCP server.

## Overview

The Blockwork MCP Server exposes **production-ready** components from the design system. Components are only added to the MCP server once they meet production quality standards.

**Currently Available**: 24 components

### Component Categories

- **Navigation** (1): TopNavigator
- **Forms** (1): Button
- **UI Components** (4): Avatar, Badge, EmptyState, PageLoading
- **Input Fields** (5): Input, PasswordInput, SearchInput, TextArea, OTPInput
- **Selection Controls** (6): Dropdown, Autocomplete, MultiSelect, Checkbox, Radio, Toggler
- **Date & Time** (1): Calendar
- **Visual** (1): ColorPicker
- **Numeric** (1): Slider
- **Rating** (1): RatingStars
- **File** (1): FileUpload
- **Document** (1): SignatureInput
- **Text** (1): RichTextEditor
- **Layout** (1): FormLayout

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

### Avatar

**Category**: UI Components
**Status**: ✅ Production Ready
**Path**: `src/design-system/components/Avatar/Avatar.tsx`

#### Description

User avatar component with multiple sizes, status indicators, fallback support, and click interactions for user profiles and navigation.

#### Features

- ✅ 10 size variants (xs, sm, md, lg, xl + iconXs, iconSm, iconMd, iconLg, iconXl)
- ✅ Automatic initials generation from name prop
- ✅ Status indicators with 4 states (online, offline, away, busy)
- ✅ Configurable status position (4 corners)
- ✅ Image error handling with fallback to initials or icon
- ✅ Click interactions with optional chevron indicator
- ✅ Circular design with proper aspect ratios
- ✅ Accessible with proper ARIA attributes

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `src` | `string` | No | Image source URL |
| `alt` | `string` | No | Alt text for image accessibility |
| `name` | `string` | No | User name (used for generating initials) |
| `initials` | `string` | No | Custom initials to display |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'iconXs' \| 'iconSm' \| 'iconMd' \| 'iconLg' \| 'iconXl'` | No | Avatar size (default: 'md') |
| `status` | `'online' \| 'offline' \| 'away' \| 'busy'` | No | Status indicator |
| `statusPosition` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | No | Position of status indicator (default: 'bottom-right') |
| `fallbackIcon` | `React.ReactNode` | No | Custom fallback icon when image fails |
| `className` | `string` | No | Additional CSS classes |
| `onClick` | `() => void` | No | Click handler |
| `showChevron` | `boolean` | No | Show dropdown chevron indicator (default: false) |

#### Usage Example

```tsx
import { Avatar } from '@wakecap/blockwork-ui';

function UserProfile() {
  return (
    <Avatar
      src="https://example.com/avatar.jpg"
      name="John Doe"
      size="lg"
      status="online"
      statusPosition="bottom-right"
      onClick={() => console.log('Avatar clicked')}
    />
  );
}
```

---

### Badge

**Category**: UI Components
**Status**: ✅ Production Ready
**Path**: `src/design-system/components/Badge/Badge.tsx`

#### Description

Versatile badge component with 7 variants and 3 sizes for labels, status, and categorization.

#### Features

- ✅ 7 style variants: default, secondary, destructive, outline, success, warning, info
- ✅ 3 size options: sm, md, lg
- ✅ Rounded corners with unique bottom-left flat design
- ✅ Hover state transitions
- ✅ Focus ring for accessibility
- ✅ Supports text and icon content
- ✅ Class variance authority (CVA) for variant management
- ✅ Extends all HTML div attributes

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline' \| 'success' \| 'warning' \| 'info'` | No | Badge style variant (default: 'default') |
| `size` | `'sm' \| 'md' \| 'lg'` | No | Badge size (default: 'sm') |
| `children` | `React.ReactNode` | Yes | Badge content (text, icons, etc.) |
| `className` | `string` | No | Additional CSS classes |

#### Usage Example

```tsx
import { Badge } from '@wakecap/blockwork-ui';

function StatusIndicator() {
  return (
    <div>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning" size="md">Pending</Badge>
      <Badge variant="destructive" size="lg">Critical</Badge>
    </div>
  );
}
```

---

### EmptyState

**Category**: UI Components
**Status**: ✅ Production Ready
**Path**: `src/design-system/components/EmptyState/EmptyState.tsx`

#### Description

Empty state component for displaying helpful messages when no content is available, with customizable icons, actions, and variants.

#### Features

- ✅ 5 preset variants with default icons (default, search, files, users, error)
- ✅ Custom icon support via Font Awesome classes
- ✅ 3 size options with responsive scaling
- ✅ Optional action button/element slot
- ✅ Centered layout with icon, title, description, and action
- ✅ Customizable spacing and typography
- ✅ Accessible with proper semantic HTML

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Main heading text |
| `description` | `string` | No | Descriptive text explaining the empty state |
| `icon` | `string` | No | Font Awesome icon class (custom icon) |
| `variant` | `'default' \| 'search' \| 'files' \| 'users' \| 'error'` | No | Preset variant with default icon (default: 'default') |
| `action` | `React.ReactNode` | No | Action button or custom element |
| `size` | `'sm' \| 'md' \| 'lg'` | No | Component size (default: 'md') |
| `className` | `string` | No | Additional CSS classes |

#### Usage Example

```tsx
import { EmptyState, Button } from '@wakecap/blockwork-ui';

function NoResults() {
  return (
    <EmptyState
      variant="search"
      title="No results found"
      description="Try adjusting your search criteria"
      action={<Button>Clear Filters</Button>}
    />
  );
}
```

---

### PageLoading

**Category**: UI Components
**Status**: ✅ Production Ready
**Path**: `src/design-system/components/PageLoading/PageLoading.tsx`

#### Description

Full-screen loading component with WakeCap logo animation and customizable message for app initialization and route transitions.

#### Features

- ✅ Full-screen overlay with high z-index (9999)
- ✅ WakeCap logo with fade animation
- ✅ Two logo variants: geometric symbol or full text logo
- ✅ Customizable animation duration
- ✅ Optional skeleton loading mode
- ✅ Customizable loading message
- ✅ White background for clean appearance
- ✅ Centered layout with proper spacing

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `visible` | `boolean` | No | Controls visibility of loading component (default: true) |
| `message` | `string` | No | Custom loading message (default: 'Loading...') |
| `animationDuration` | `number` | No | Duration of fade animation in milliseconds (default: 2000) |
| `skeleton` | `boolean` | No | Use skeleton loading instead of fade animation (default: false) |
| `logoVariant` | `'symbol' \| 'text'` | No | Logo display variant (default: 'symbol') |

#### Usage Example

```tsx
import { PageLoading } from '@wakecap/blockwork-ui';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    setTimeout(() => setIsLoading(false), 3000);
  }, []);

  return (
    <>
      <PageLoading visible={isLoading} message="Initializing application..." />
      {/* Your app content */}
    </>
  );
}
```

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
