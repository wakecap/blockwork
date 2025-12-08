import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { LanguageProvider } from "../../components/ui/language-provider";
import {
  ColorPalette,
  TypographyScale,
  SpacingScale,
  ElevationScale,
  BorderRadiusScale,
  BreakpointScale,
  ZIndexScale,
  MotionTokens,
  OpacityScale,
} from "../foundations/DesignTokens";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { LanguageToggle } from "../../components/ui/language-toggle";

const meta: Meta = {
  title: "Foundation/Overview",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Complete overview of the WakeCap Design System built with Tailwind CSS and shadcn/ui patterns.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <LanguageProvider>
        <div className="min-h-screen bg-background">
          <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-foreground">WakeCap Design System</h1>
                <Badge variant="wakecap">v2.0</Badge>
              </div>
              <LanguageToggle />
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
            <Story />
          </div>
        </div>
      </LanguageProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Welcome to Blockwork Design System</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive design system built with Tailwind CSS and shadcn/ui patterns. Features
          black as primary color (neutrals) and orange as accent, with full Arabic/RTL support.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="primary" size="lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            View Components
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>🎨 Design Tokens</CardTitle>
            <CardDescription>Consistent colors, typography, and spacing</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Comprehensive design tokens with CSS variables for theming and customization.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🌍 RTL Support</CardTitle>
            <CardDescription>Full Arabic language support</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Built-in RTL support with automatic text direction and layout adjustments.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>⚡ Modern Stack</CardTitle>
            <CardDescription>Tailwind CSS + shadcn/ui</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Built with modern tools for optimal performance and developer experience.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

export const GettingStarted: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Getting Started</h1>
        <p className="text-xl text-muted-foreground">
          Learn how to install and use Blockwork UI components in your React project.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>📦 Installation</CardTitle>
          <CardDescription>Install the package from GitHub Packages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              First, configure npm to use GitHub Packages. Create or edit <code className="bg-muted px-1 py-0.5 rounded">.npmrc</code> in your project:
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`@wakecap:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN`}</code>
            </pre>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Then install the package:</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>npm install @wakecap/blockwork-ui</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🎨 Import Styles</CardTitle>
          <CardDescription>Add the required CSS to your application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Import the styles in your main entry file (e.g., <code className="bg-muted px-1 py-0.5 rounded">main.tsx</code> or <code className="bg-muted px-1 py-0.5 rounded">App.tsx</code>):
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`import "@wakecap/blockwork-ui/styles.css";`}</code>
            </pre>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>💡 Note:</strong> The styles.css file includes all Tailwind CSS classes and design tokens. Make sure to import it before using any components.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📥 Import Components</CardTitle>
          <CardDescription>How to import and use components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Import components from the main package entry:
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`import { TopNavigator } from "@wakecap/blockwork-ui";`}</code>
            </pre>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Or import from component-specific paths for better tree-shaking:
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`import { TopNavigator } from "@wakecap/blockwork-ui/components/TopNavigator";`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🚀 Usage Example</CardTitle>
          <CardDescription>Complete example with imports</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`// Import styles (once in your app entry point)
import "@wakecap/blockwork-ui/styles.css";

// Import components
import { TopNavigator } from "@wakecap/blockwork-ui";

function App() {
  return (
    <TopNavigator
      logo={<img src="/logo.png" alt="Logo" />}
      items={[
        { label: "Dashboard", href: "/" },
        { label: "Projects", href: "/projects" },
      ]}
    />
  );
}

export default App;`}</code>
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🌍 RTL Support</CardTitle>
          <CardDescription>Enable Arabic/RTL support</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Wrap your app with FontProvider for Arabic language support:
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`import { FontProvider } from "@wakecap/blockwork-ui";

function App() {
  return (
    <FontProvider>
      {/* Your app content */}
    </FontProvider>
  );
}`}</code>
            </pre>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Toggle language programmatically:
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`import { useFont } from "@wakecap/blockwork-ui";

function LanguageSwitcher() {
  const { language, setLanguage } = useFont();

  return (
    <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}>
      Switch to {language === 'en' ? 'Arabic' : 'English'}
    </button>
  );
}`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>📚 Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">→</span>
              <span>Browse available components in the sidebar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">→</span>
              <span>Check out the design tokens and foundations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">→</span>
              <span>View component props and examples in each story</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">→</span>
              <span>Explore the interactive controls panel below each component</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Color Palette</h2>
        <p className="text-muted-foreground mb-8">
          Our color system uses black (neutrals) as primary colors, orange as accent, with Tailwind
          semantic colors and shadcn/ui CSS variables for theming.
        </p>
      </div>
      <ColorPalette />
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Typography</h2>
        <p className="text-muted-foreground mb-8">
          Consistent typography scale with support for multiple languages including Arabic.
        </p>
      </div>
      <TypographyScale />
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Spacing Scale</h2>
        <p className="text-muted-foreground mb-8">
          Based on an 8pt grid system for consistent spacing throughout the design system.
        </p>
      </div>
      <SpacingScale />
    </div>
  ),
};

export const Elevation: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Elevation & Shadows</h2>
        <p className="text-muted-foreground mb-8">
          Layered shadow system for creating depth and hierarchy in the interface.
        </p>
      </div>
      <ElevationScale />
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Border Radius</h2>
        <p className="text-muted-foreground mb-8">
          Consistent border radius scale for rounded corners throughout the design system.
        </p>
      </div>
      <BorderRadiusScale />
    </div>
  ),
};

export const Breakpoints: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Responsive Breakpoints</h2>
        <p className="text-muted-foreground mb-8">
          Mobile-first responsive breakpoints for building adaptive interfaces.
        </p>
      </div>
      <BreakpointScale />
    </div>
  ),
};

export const ZIndex: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Z-Index Scale</h2>
        <p className="text-muted-foreground mb-8">
          Semantic z-index values for proper layering of interface elements.
        </p>
      </div>
      <ZIndexScale />
    </div>
  ),
};

export const Motion: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Motion & Animation</h2>
        <p className="text-muted-foreground mb-8">
          Consistent animation timing and easing functions for smooth interactions.
        </p>
      </div>
      <MotionTokens />
    </div>
  ),
};

export const Opacity: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Opacity Scale</h2>
        <p className="text-muted-foreground mb-8">
          Consistent opacity values for creating visual hierarchy and states.
        </p>
      </div>
      <OpacityScale />
    </div>
  ),
};

export const ComponentShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Component Showcase</h2>
        <p className="text-muted-foreground mb-8">
          Examples of our core components using the black primary and orange accent color scheme.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Various button styles and states</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="accent">Accent</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
            <CardDescription>Form input components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Default input" />
            <Input placeholder="With error" error="This field is required" />
            <Input placeholder="With success" success="Looks good!" />
            <Input placeholder="Disabled" disabled />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Status indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Error</Badge>
              <Badge variant="accent">Accent</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cards</CardTitle>
            <CardDescription>Content containers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Cards provide a flexible container for content with consistent styling and spacing.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};
