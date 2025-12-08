import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Component metadata type
export type ComponentMetadata = {
  name: string;
  description: string;
  category: string;
  path: string;
  props?: Record<string, string>;
  features?: string[];
  dependencies?: string[];
};

// Component metadata extracted from the design system
// NOTE: Only production-ready components are exposed here
// When a component is production-ready, add it to this object with full documentation
export const COMPONENTS: Record<string, ComponentMetadata> = {
  TopNavigator: {
    name: "TopNavigator",
    description:
      "Top navigation bar with project selector, menu dropdown, pinned items, and avatar menu. Production-ready component for construction project applications.",
    category: "Navigation",
    path: "src/design-system/components/TopNavigator/TopNavigator.tsx",
    props: {
      menu: "MenuItem[] - Array of menu items to display in the mega dropdown",
      avatarMenu: "MenuItem[] - Array of items for the avatar dropdown menu",
      projectsData: "ProjectsData (optional) - Project data organized by organizations",
      maxVisibleItems: "number (optional) - Maximum number of pinned items visible (default: 4)",
      settingsMenu: "MenuItem[] (optional) - Settings menu items",
      selectedProject: "string (optional) - ID of the currently selected project",
      selectedMenuItem: "string (optional) - ID of the currently selected menu item",
      initialPinnedItems: "string[] (optional) - Array of menu item IDs to pin initially",
      onProjectSelect: "(project: {id: string, name: string}) => void (optional)",
      onAvatarMenuItemClick: "(item: MenuItem) => void (optional)",
      onMenuItemClick: "(item: MenuItem) => void (optional)",
      onSettingsMenuItemClick: "(item: MenuItem) => void (optional)",
      onPinnedItemsChange: "(pinnedIds: string[]) => void (optional)",
      onPinnedItemClick: "(item: {id: string, icon: string, label: string}) => void (optional)",
    },
    features: [
      "Project selection with search and organization grouping",
      "Pinnable menu items with drag-and-drop support",
      "Avatar menu with user info display",
      "Settings menu integration",
      "Responsive design with mobile optimization",
      "Overflow handling for pinned items",
      "Blur backdrop when mega menu is open",
      "Click-away detection for all dropdowns",
      "Keyboard navigation support",
      "Arabic/RTL support ready",
    ],
    dependencies: ["MegaDropdown", "Button", "Avatar", "SearchInput", "EmptyState"],
  },

  // TODO: Add more components here as they become production-ready
  // Example structure:
  // ComponentName: {
  //   name: "ComponentName",
  //   description: "Component description",
  //   category: "Category",
  //   path: "src/design-system/components/ComponentName/ComponentName.tsx",
  //   props: { ... },
  //   features: [ ... ],
  //   dependencies: [ ... ] (optional)
  // },
};

// Design tokens from tailwind.config.js
export const DESIGN_TOKENS = {
  colors: {
    primary: "Orange scale (50-950) for primary brand colors",
    secondary: "Gray and neutral scales for secondary elements",
    semantic: "Success (green), error (red), warning (yellow), info (blue)",
    wakecap: "Brand-specific colors with CSS variables",
  },
  typography: {
    fonts: {
      sans: "Figtree for English text",
      arabic: "IBM Plex Sans Arabic for Arabic text",
      mono: "Monospace fonts for code",
    },
    scale: "xs to 9xl with defined line-height and letter-spacing",
    weights: "100 (thin) to 900 (black)",
  },
  spacing: "8pt grid system from 0 to 96 (0px to 384px)",
  shadows: "Elevation system with xs, sm, md, lg, xl, 2xl + custom elevation-1 to elevation-5",
  borderRadius: "xs (2px) to 3xl (32px) plus full (9999px)",
  animations: {
    durations: "fast (150ms), base (250ms), slow (350ms), slower (500ms)",
    easings: "Custom cubic-bezier functions (ease-out-expo, ease-in-out-quart, etc.)",
    keyframes: "fade-in/out, slide-in, scale-in, pulse, bounce-subtle",
  },
  zIndex: "Semantic layers: dropdown (1000), modal (1400), tooltip (1800), etc.",
};

/**
 * Create and configure an MCP server with all request handlers
 * This function is used by both stdio and HTTP transports
 */
export function createMcpServer(): Server {
  const server = new Server(
    {
      name: "blockwork-design-system",
      version: "1.0.0",
    },
    {
      capabilities: {
        resources: {},
        tools: {},
      },
    },
  );

  // List available resources
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: "blockwork://design-system/overview",
          mimeType: "text/plain",
          name: "Design System Overview",
          description: "Overview of the Blockwork UI design system",
        },
        {
          uri: "blockwork://design-system/getting-started",
          mimeType: "text/plain",
          name: "Getting Started Guide",
          description: "Installation, setup, and usage instructions for Blockwork UI",
        },
        {
          uri: "blockwork://design-system/components",
          mimeType: "application/json",
          name: "Component List",
          description: "List of all available components with metadata",
        },
        {
          uri: "blockwork://design-system/tokens",
          mimeType: "application/json",
          name: "Design Tokens",
          description: "Design tokens including colors, typography, spacing, etc.",
        },
        ...Object.keys(COMPONENTS).map((componentName) => ({
          uri: `blockwork://components/${componentName}`,
          mimeType: "text/plain",
          name: `${componentName} Component`,
          description: `Documentation and code for ${componentName}`,
        })),
      ],
    };
  });

  // Read resource content
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const uri = request.params.uri;

    if (uri === "blockwork://design-system/overview") {
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# Blockwork UI Design System

A React component library built with TypeScript, Tailwind CSS, and Storybook.
Features construction-focused UI components with comprehensive Arabic/RTL support.

## Features
- Black-primary design with orange accents
- Full Arabic/RTL support with IBM Plex Sans Arabic font
- Production-ready TopNavigator component
- Comprehensive design token system
- Responsive and mobile-friendly
- Accessibility-focused
- Built with class-variance-authority for variant management

## Tech Stack
- React 18+
- TypeScript
- Tailwind CSS (custom configuration)
- Storybook for documentation
- Vite for building
- Radix UI primitives

## Quick Start
See the "Getting Started Guide" resource for detailed installation and setup instructions.

## Production-Ready Components
Currently available: **${Object.keys(COMPONENTS).length}** component(s) - ${Object.keys(COMPONENTS).join(", ")}

More components will be added as they reach production quality.
`,
          },
        ],
      };
    }

    if (uri === "blockwork://design-system/getting-started") {
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# Getting Started with Blockwork UI

Complete guide to installing and using Blockwork UI components in your React project.

## 📦 Installation

### Step 1: Configure npm for GitHub Packages

Create or edit \`.npmrc\` in your project root:

\`\`\`
@wakecap:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
\`\`\`

Replace \`YOUR_GITHUB_TOKEN\` with your personal access token that has \`read:packages\` permission.

### Step 2: Install the Package

\`\`\`bash
npm install @wakecap/blockwork-ui
\`\`\`

## 🎨 Import Styles

Import the styles in your main entry file (e.g., \`main.tsx\` or \`App.tsx\`):

\`\`\`tsx
import "@wakecap/blockwork-ui/styles.css";
\`\`\`

**Important:** The styles.css file includes all Tailwind CSS classes and design tokens. Import it before using any components.

## 📥 Import Components

### Option 1: Main Package Entry (Simpler)

\`\`\`tsx
import { TopNavigator } from "@wakecap/blockwork-ui";
\`\`\`

### Option 2: Component-Specific Path (Better Tree-Shaking)

\`\`\`tsx
import { TopNavigator } from "@wakecap/blockwork-ui/components/TopNavigator";
\`\`\`

Both methods work - use Option 2 for better bundle optimization.

## 🚀 Complete Usage Example

\`\`\`tsx
// Import styles (once in your app entry point)
import "@wakecap/blockwork-ui/styles.css";

// Import components
import { TopNavigator } from "@wakecap/blockwork-ui";

function App() {
  const menuItems = [
    { id: '1', label: 'Dashboard', icon: 'fa-solid fa-home', category: 'Main' },
    { id: '2', label: 'Projects', icon: 'fa-solid fa-folder', category: 'Main' },
  ];

  const avatarMenuItems = [
    { id: 'profile', label: 'Profile', icon: 'fa-solid fa-user' },
    { id: 'settings', label: 'Settings', icon: 'fa-solid fa-cog' },
    { id: 'logout', label: 'Logout', icon: 'fa-solid fa-sign-out' },
  ];

  return (
    <TopNavigator
      menu={menuItems}
      avatarMenu={avatarMenuItems}
      onMenuItemClick={(item) => console.log('Menu clicked:', item)}
      onAvatarMenuItemClick={(item) => console.log('Avatar menu clicked:', item)}
    />
  );
}

export default App;
\`\`\`

## 🌍 RTL/Arabic Support

### Enable Arabic Language Support

Wrap your app with FontProvider:

\`\`\`tsx
import { FontProvider } from "@wakecap/blockwork-ui";

function App() {
  return (
    <FontProvider>
      {/* Your app content */}
    </FontProvider>
  );
}
\`\`\`

### Toggle Language Programmatically

\`\`\`tsx
import { useFont } from "@wakecap/blockwork-ui";

function LanguageSwitcher() {
  const { language, setLanguage } = useFont();

  return (
    <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}>
      Switch to {language === 'en' ? 'Arabic' : 'English'}
    </button>
  );
}
\`\`\`

## 🎯 Available Components

Currently available production-ready components:
${Object.keys(COMPONENTS).map(name => `- **${name}**: ${COMPONENTS[name].description}`).join('\n')}

## 📚 Next Steps

1. **Browse Components**: Use the MCP tools to search and explore available components
2. **Design Tokens**: Check out \`blockwork://design-system/tokens\` for colors, typography, spacing, etc.
3. **Component Documentation**: Access detailed docs for each component via \`blockwork://components/{ComponentName}\`
4. **Storybook**: Visit the live Storybook for interactive component examples

## 🔧 TypeScript Support

Blockwork UI is fully typed. Import types alongside components:

\`\`\`tsx
import { TopNavigator, type MenuItem } from "@wakecap/blockwork-ui";

const items: MenuItem[] = [
  { id: '1', label: 'Dashboard', icon: 'fa-solid fa-home' }
];
\`\`\`

## 💡 Tips

- **Tree-shaking**: Use component-specific imports for smaller bundles
- **Styles**: Only import styles.css once in your app entry point
- **RTL**: Components automatically adapt to RTL when language is set to Arabic
- **Icons**: Components use Font Awesome icons - make sure to include Font Awesome in your project
`,
          },
        ],
      };
    }

    if (uri === "blockwork://design-system/components") {
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(COMPONENTS, null, 2),
          },
        ],
      };
    }

    if (uri === "blockwork://design-system/tokens") {
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(DESIGN_TOKENS, null, 2),
          },
        ],
      };
    }

    // Component-specific resources
    const componentMatch = uri.match(/^blockwork:\/\/components\/(.+)$/);
    if (componentMatch) {
      const componentName = componentMatch[1];
      const component = COMPONENTS[componentName as keyof typeof COMPONENTS];

      if (component) {
        // Try to read the actual component file
        const componentPath = path.join(__dirname, "..", component.path);
        let sourceCode = "";

        try {
          sourceCode = fs.readFileSync(componentPath, "utf-8");
        } catch (error) {
          sourceCode = `// Unable to read source file: ${error}`;
        }

        const documentation = `# ${component.name}

${component.description}

**Category:** ${component.category}

${
  component.props
    ? `## Props

${Object.entries(component.props)
  .map(([prop, type]) => `- **${prop}**: ${type}`)
  .join("\n")}`
    : ""
}

## Features

${component.features?.map((feature) => `- ${feature}`).join("\n") || "No features listed"}

${component.dependencies && component.dependencies.length > 0 ? `## Dependencies\n\nThis component uses: ${component.dependencies.join(", ")}` : ""}

## Source Code

\`\`\`tsx
${sourceCode}
\`\`\`

## Usage Example

\`\`\`tsx
import { ${component.name} } from '@wakecap/blockwork-ui';

// See props section above for available props
<${component.name} />
\`\`\`
`;

        return {
          contents: [
            {
              uri,
              mimeType: "text/plain",
              text: documentation,
            },
          ],
        };
      }
    }

    throw new Error(`Resource not found: ${uri}`);
  });

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "search_components",
          description: "Search for components by name, category, or feature",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search query (component name, category, or feature keyword)",
              },
            },
            required: ["query"],
          },
        },
        {
          name: "get_component_code",
          description: "Get the source code for a specific component",
          inputSchema: {
            type: "object",
            properties: {
              componentName: {
                type: "string",
                description: "Name of the component (e.g., 'TopNavigator', 'Button')",
              },
            },
            required: ["componentName"],
          },
        },
        {
          name: "get_usage_example",
          description: "Get a usage example for a component with specific props",
          inputSchema: {
            type: "object",
            properties: {
              componentName: {
                type: "string",
                description: "Name of the component",
              },
              variant: {
                type: "string",
                description: "Variant to use (optional)",
              },
              size: {
                type: "string",
                description: "Size to use (optional)",
              },
            },
            required: ["componentName"],
          },
        },
        {
          name: "get_design_token",
          description: "Get information about design tokens (colors, spacing, typography, etc.)",
          inputSchema: {
            type: "object",
            properties: {
              tokenType: {
                type: "string",
                description: "Type of token: colors, typography, spacing, shadows, borderRadius, animations, zIndex",
              },
            },
            required: ["tokenType"],
          },
        },
      ],
    };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (!args) {
      throw new Error("Missing arguments");
    }

    if (name === "search_components") {
      const query = (args.query as string).toLowerCase();
      const results = Object.entries(COMPONENTS)
        .filter(([name, component]) => {
          return (
            name.toLowerCase().includes(query) ||
            component.description.toLowerCase().includes(query) ||
            component.category.toLowerCase().includes(query) ||
            component.features?.some((f) => f.toLowerCase().includes(query))
          );
        })
        .map(([name, component]) => ({
          name,
          description: component.description,
          category: component.category,
          path: component.path,
        }));

      return {
        content: [
          {
            type: "text",
            text: `Found ${results.length} component(s):\n\n${JSON.stringify(results, null, 2)}`,
          },
        ],
      };
    }

    if (name === "get_component_code") {
      const componentName = args.componentName as string;
      const component = COMPONENTS[componentName as keyof typeof COMPONENTS];

      if (!component) {
        return {
          content: [
            {
              type: "text",
              text: `Component "${componentName}" not found. Available components: ${Object.keys(COMPONENTS).join(", ")}`,
            },
          ],
        };
      }

      const componentPath = path.join(__dirname, "..", component.path);
      try {
        const sourceCode = fs.readFileSync(componentPath, "utf-8");
        return {
          content: [
            {
              type: "text",
              text: `# ${componentName} Source Code\n\n\`\`\`tsx\n${sourceCode}\n\`\`\``,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error reading component file: ${error}`,
            },
          ],
        };
      }
    }

    if (name === "get_usage_example") {
      const { componentName, variant, size } = args as { componentName: string; variant?: string; size?: string };
      const component = COMPONENTS[componentName as keyof typeof COMPONENTS];

      if (!component) {
        return {
          content: [
            {
              type: "text",
              text: `Component "${componentName}" not found. Available components: ${Object.keys(COMPONENTS).join(", ")}`,
            },
          ],
        };
      }

      let example = "";

      if (componentName === "Button") {
        example = `import { Button } from '@wakecap/blockwork-ui';

<Button
  ${variant ? `variant="${variant}"` : '// variant="primary" (default)'}
  ${size ? `size="${size}"` : '// size="md" (default)'}
  onClick={() => console.log('Clicked!')}
>
  Click Me
</Button>

// With icon
<Button icon="fa-solid fa-check" iconPosition="left">
  Save
</Button>

// Loading state
<Button loading loadingText="Saving...">
  Save
</Button>

// Arabic support
<Button
  arabicText="احفظ"
  showArabicText={true}
>
  Save
</Button>`;
      } else if (componentName === "TopNavigator") {
        example = `import { TopNavigator } from '@wakecap/blockwork-ui';

const menuItems = [
  { id: '1', label: 'Dashboard', icon: 'fa-solid fa-home', category: 'Main' },
  { id: '2', label: 'Projects', icon: 'fa-solid fa-folder', category: 'Main' },
];

const avatarMenuItems = [
  { id: 'profile', label: 'Profile', icon: 'fa-solid fa-user' },
  { id: 'logout', label: 'Logout', icon: 'fa-solid fa-sign-out' },
];

const projectsData = [
  {
    organizationId: 'org1',
    organizationName: 'WakeCap',
    projects: [
      { id: 'proj1', name: 'Construction Site Alpha' },
      { id: 'proj2', name: 'Construction Site Beta' },
    ],
  },
];

<TopNavigator
  menu={menuItems}
  avatarMenu={avatarMenuItems}
  projectsData={projectsData}
  onMenuItemClick={(item) => console.log('Menu clicked:', item)}
  onProjectSelect={(project) => console.log('Project selected:', project)}
/>`;
      } else if (componentName === "Badge") {
        example = `import { Badge } from '@wakecap/blockwork-ui';

<Badge ${variant ? `variant="${variant}"` : ''}${size ? ` size="${size}"` : ''}>
  New
</Badge>

// Semantic variants
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Error</Badge>`;
      } else {
        example = `import { ${componentName} } from '@wakecap/blockwork-ui';

<${componentName} />`;
      }

      return {
        content: [
          {
            type: "text",
            text: `# ${componentName} Usage Example\n\n\`\`\`tsx\n${example}\n\`\`\``,
          },
        ],
      };
    }

    if (name === "get_design_token") {
      const tokenType = args.tokenType as string;
      const tokenInfo = DESIGN_TOKENS[tokenType as keyof typeof DESIGN_TOKENS];

      if (!tokenInfo) {
        return {
          content: [
            {
              type: "text",
              text: `Token type "${tokenType}" not found. Available types: ${Object.keys(DESIGN_TOKENS).join(", ")}`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `# ${tokenType} Design Tokens\n\n${JSON.stringify(tokenInfo, null, 2)}`,
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  });

  return server;
}
