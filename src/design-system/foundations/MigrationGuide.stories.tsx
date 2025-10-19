import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { RTLInput } from "../../components/ui/rtl-input";
import { LanguageProvider } from "../../components/ui/language-provider";

const meta: Meta = {
  title: "Foundation/Migration Guide",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Migration guide from the old design system to the new shadcn/ui-based system.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <LanguageProvider>
        <div className="min-h-screen bg-background">
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

export const Overview: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground font-heading">Migration Guide</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          This guide will help you migrate from the old design system to the new shadcn/ui-based
          system with Tailwind CSS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>🎯 Benefits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">• Better performance with Tailwind CSS</p>
            <p className="text-sm">• Improved accessibility</p>
            <p className="text-sm">• Enhanced RTL support</p>
            <p className="text-sm">• Modern component patterns</p>
            <p className="text-sm">• Better TypeScript support</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>⚡ Quick Start</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">• Install new dependencies</p>
            <p className="text-sm">• Update import paths</p>
            <p className="text-sm">• Replace component props</p>
            <p className="text-sm">• Test RTL functionality</p>
            <p className="text-sm">• Update styling</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🔧 Breaking Changes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">• Component API changes</p>
            <p className="text-sm">• Styling approach updates</p>
            <p className="text-sm">• New prop naming</p>
            <p className="text-sm">• CSS variable usage</p>
            <p className="text-sm">• RTL implementation</p>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

export const ButtonMigration: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4 font-sans">Button Component Migration</h2>
        <p className="text-muted-foreground mb-8">
          The Button component has been updated with new variants and improved styling.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="destructive">Old</Badge>
              Legacy Button
            </CardTitle>
            <CardDescription>Previous implementation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`// Old Button Usage
<Button 
  variant="primary" 
  size="md"
  icon={faSearch}
  iconPosition="left"
  arabicText="بحث"
  showArabicText={true}
>
  Search
</Button>`}
              </pre>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="wakecap">Primary (Old)</Button>
              <Button variant="outline">Secondary (Old)</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="success">New</Badge>
              shadcn/ui Button
            </CardTitle>
            <CardDescription>New implementation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`// New Button Usage
<Button 
  variant="wakecap" 
  size="default"
  className="gap-2"
>
  <Search className="h-4 w-4" />
  Search
</Button>

// For RTL support
<RTLButton 
  variant="wakecap"
  arabicText="بحث"
  showArabicText={true}
>
  Search
</RTLButton>`}
              </pre>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="wakecap">WakeCap</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Migration Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge variant="default" className="mt-0.5">
                1
              </Badge>
              <div>
                <p className="font-medium">Update imports</p>
                <p className="text-sm text-muted-foreground">
                  Replace FontAwesome icons with Lucide React icons
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="default" className="mt-0.5">
                2
              </Badge>
              <div>
                <p className="font-medium">Update variant names</p>
                <p className="text-sm text-muted-foreground">
                  primary → wakecap, secondary → secondary, outline → outline
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="default" className="mt-0.5">
                3
              </Badge>
              <div>
                <p className="font-medium">Update icon usage</p>
                <p className="text-sm text-muted-foreground">
                  Use children for icons instead of icon prop
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="default" className="mt-0.5">
                4
              </Badge>
              <div>
                <p className="font-medium">Add RTL support</p>
                <p className="text-sm text-muted-foreground">
                  Use RTLButton for Arabic text support
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

export const InputMigration: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4 font-sans">Input Component Migration</h2>
        <p className="text-muted-foreground mb-8">
          The Input component now uses shadcn/ui patterns with improved accessibility and RTL
          support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="destructive">Old</Badge>
              Legacy Input
            </CardTitle>
            <CardDescription>Previous implementation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`// Old Input Usage
<Input 
  label="Search"
  placeholder="Search..."
  iconLeft={faSearch}
  error="Required field"
  arabicLabel="بحث"
  arabicPlaceholder="ابحث..."
  showArabicText={true}
/>`}
              </pre>
            </div>
            <div className="space-y-2">
              <Input label="Search" placeholder="Search..." iconLeft={<span>🔍</span>} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="success">New</Badge>
              shadcn/ui Input
            </CardTitle>
            <CardDescription>New implementation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`// New Input Usage
<Input 
  label="Search"
  placeholder="Search..."
  iconLeft={<Search className="h-4 w-4" />}
  error="Required field"
/>

// For RTL support
<RTLInput 
  label="Search"
  placeholder="Search..."
  iconLeft={<Search className="h-4 w-4" />}
  arabicLabel="بحث"
  arabicPlaceholder="ابحث..."
  showArabicText={true}
/>`}
              </pre>
            </div>
            <div className="space-y-2">
              <RTLInput
                label="Search"
                placeholder="Search..."
                iconLeft={<span>🔍</span>}
                arabicLabel="بحث"
                arabicPlaceholder="ابحث..."
                showArabicText={true}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Changes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground font-sans">Styling Updates</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Uses CSS variables for theming</li>
                <li>• Improved focus states</li>
                <li>• Better error/success styling</li>
                <li>• Consistent border radius</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground font-sans">RTL Improvements</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Automatic icon positioning</li>
                <li>• Proper text alignment</li>
                <li>• Language-aware styling</li>
                <li>• Context-aware components</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

export const StylingMigration: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4 font-sans">Styling Migration</h2>
        <p className="text-muted-foreground mb-8">
          The styling approach has changed from custom CSS to Tailwind CSS with CSS variables.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="destructive">Old</Badge>
              Custom CSS
            </CardTitle>
            <CardDescription>Previous styling approach</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`/* Old CSS Approach */
.input {
  background: var(--Neutral-900, #171717);
  color: #FFF;
  border: 1px solid var(--Neutral-600, #525252);
  border-radius: 4px;
  padding: 8px 16px;
}

.input:focus {
  border-color: var(--Orange-500, #f97316);
  box-shadow: 0 0 0 2px var(--Orange-100, #ffedd5);
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="success">New</Badge>
              Tailwind CSS
            </CardTitle>
            <CardDescription>New styling approach</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`/* New Tailwind Approach */
className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

/* CSS Variables in globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 24 9.8% 10%;
  --wakecap-primary: 24 100% 50%;
}`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Migration Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground font-sans">Performance</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Smaller bundle size</li>
                <li>• Better tree shaking</li>
                <li>• Optimized CSS</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground font-sans">Developer Experience</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• IntelliSense support</li>
                <li>• Consistent API</li>
                <li>• Better debugging</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground font-sans">Maintainability</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Standardized patterns</li>
                <li>• Better documentation</li>
                <li>• Community support</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

export const NextSteps: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4 font-sans">Next Steps</h2>
        <p className="text-muted-foreground mb-8">
          Follow these steps to complete your migration to the new design system.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="default">1</Badge>
              Install Dependencies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`npm install class-variance-authority clsx tailwind-merge lucide-react @radix-ui/react-slot @radix-ui/react-label`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="default">2</Badge>
              Update Imports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`// Replace old imports
import { Button } from './design-system/components/Button/Button';
import { Input } from './design-system/components/Input/Input';

// With new imports
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { RTLButton } from './components/ui/rtl-button';
import { RTLInput } from './components/ui/rtl-input';`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="default">3</Badge>
              Add Language Provider
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`// Wrap your app with LanguageProvider
import { LanguageProvider } from './components/ui/language-provider';

function App() {
  return (
    <LanguageProvider>
      <YourApp />
    </LanguageProvider>
  );
}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="default">4</Badge>
              Test and Validate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                • Test all components in both LTR and RTL modes
              </p>
              <p className="text-sm text-muted-foreground">• Verify accessibility compliance</p>
              <p className="text-sm text-muted-foreground">• Check responsive behavior</p>
              <p className="text-sm text-muted-foreground">• Validate theme switching</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};
