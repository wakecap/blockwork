import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FontProvider } from "../FontProvider/FontProvider";
import { Button, type SizeVariants, type Variants } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["ready"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A modern, unified button component with black-primary design system. Supports multiple variants, sizes, loading states, and RTL/LTR layouts.",
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Button text (English)",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Button" },
      },
    },
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "accent",
        "outline",
        "ghost",
        "text",
        "success",
        "warning",
        "destructive",
        "info",
        "pin",
        "nav",
        "fab",
        "iconBtn",
      ],
      description: "Button variant with black-primary design system",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "select",
      options: [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "icon",
        "iconXs",
        "iconSm",
        "iconMd",
        "iconLg",
        "iconXl",
      ],
      description:
        "Button size with responsive touch targets. Icon-only sizes (iconXs, iconSm, iconMd, iconLg, iconXl) are square buttons optimized for icons.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    icon: {
      control: "select",
      options: {
        None: null,
        Bell: "fa-solid fa-bell",
        "Arrow Right": "fa-solid fa-arrow-right",
        Settings: "fa-solid fa-cog",
        User: "fa-solid fa-user",
        Star: "fa-solid fa-star",
        Grid: "fa-solid fa-th",
        Download: "fa-solid fa-download",
        Upload: "fa-solid fa-upload",
        Check: "fa-solid fa-check",
        Times: "fa-solid fa-times",
        Exclamation: "fa-solid fa-exclamation",
        Info: "fa-solid fa-info",
      },
      description: "FontAwesome icon to display",
      table: {
        type: { summary: "IconDefinition" },
        defaultValue: { summary: "null" },
      },
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
      description: "Icon position (automatically flipped for RTL)",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "left" },
      },
    },
    loading: {
      control: "boolean",
      description: "Show loading spinner and disable interactions",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    loadingText: {
      control: "text",
      description: "Text to show while loading (overrides children)",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    arabicText: {
      control: "text",
      description: "Arabic button text for RTL support",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    showArabicText: {
      control: "boolean",
      description: "Show Arabic text and enable RTL layout",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isPinned: {
      control: "boolean",
      description: "Pin state for pin variant (changes to accent when true)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isActive: {
      control: "boolean",
      description: "Active state with ring indicator",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    ripple: {
      control: "boolean",
      description: "Enable ripple effect on click/touch",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    fullWidth: {
      control: "boolean",
      description: "Make button full width of container",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    fullWidthOnMobile: {
      control: "boolean",
      description: "Make button full width on mobile only",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable button interactions",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    ariaLabel: {
      control: "text",
      description: "Accessibility label for screen readers",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    ariaDescribedBy: {
      control: "text",
      description: "ID of element that describes the button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
  decorators: [
    (Story) => (
      <FontProvider>
        <Story />
      </FontProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

// Overview page showcasing all button features
export const Overview: Story = {
  render: () => (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Button</h1>
          <p className="text-base text-gray-700 max-w-4xl">
            Buttons are interactive elements that trigger actions in response to user clicks or taps.
            Our button system is designed for clarity, consistency, and accessibility across all touchpoints.
            With support for multiple variants, sizes, states, and languages, the button component provides
            a flexible foundation for building intuitive user interfaces.
          </p>
        </div>

        {/* Core Variants */}
        <section className="mb-12 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Core Variants</h2>
          <p className="text-sm text-gray-700 mb-6">
            Core button variants serve different purposes in the interface hierarchy. Primary buttons
            indicate main actions, secondary buttons for alternative actions, and accent buttons
            for promotional or highlighted calls-to-action.
          </p>
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <Button variant="primary">Primary</Button>
                <p className="text-xs text-gray-600 mt-2">Main actions</p>
              </div>
              <div>
                <Button variant="secondary">Secondary</Button>
                <p className="text-xs text-gray-600 mt-2">Alternative actions</p>
              </div>
              <div>
                <Button variant="accent">Accent</Button>
                <p className="text-xs text-gray-600 mt-2">Promotional CTAs</p>
              </div>
              <div>
                <Button variant="outline">Outline</Button>
                <p className="text-xs text-gray-600 mt-2">Subtle actions</p>
              </div>
              <div>
                <Button variant="ghost">Ghost</Button>
                <p className="text-xs text-gray-600 mt-2">Minimal emphasis</p>
              </div>
              <div>
                <Button variant="text">Text</Button>
                <p className="text-xs text-gray-600 mt-2">Link-style actions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Semantic Variants */}
        <section className="mb-12 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Semantic Variants</h2>
          <p className="text-sm text-gray-700 mb-6">
            Semantic button variants communicate meaning through color. Use these for status-specific
            actions like approvals, warnings, deletions, and informational messages.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Button variant="success" icon="fa-solid fa-check">Success</Button>
              <p className="text-xs text-gray-600 mt-2">Approve, confirm</p>
            </div>
            <div>
              <Button variant="warning" icon="fa-solid fa-exclamation">Warning</Button>
              <p className="text-xs text-gray-600 mt-2">Caution, alert</p>
            </div>
            <div>
              <Button variant="destructive" icon="fa-solid fa-times">Destructive</Button>
              <p className="text-xs text-gray-600 mt-2">Delete, remove</p>
            </div>
            <div>
              <Button variant="info" icon="fa-solid fa-info">Info</Button>
              <p className="text-xs text-gray-600 mt-2">Details, help</p>
            </div>
          </div>
        </section>

        {/* Button Sizes */}
        <section className="mb-12 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Button Sizes</h2>
          <p className="text-sm text-gray-700 mb-6">
            Five size variants ensure buttons work across different contexts. All sizes meet minimum
            44px touch target requirements on mobile devices for accessibility.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-32">Extra Small (xs)</span>
              <Button size="xs">Extra Small</Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-32">Small (sm)</span>
              <Button size="sm">Small</Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-32">Medium (md)</span>
              <Button size="md">Medium</Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-32">Large (lg)</span>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium w-32">Extra Large (xl)</span>
              <Button size="xl">Extra Large</Button>
            </div>
          </div>
        </section>

        {/* Icons */}
        <section className="mb-12 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Buttons with Icons</h2>
          <p className="text-sm text-gray-700 mb-6">
            Icons enhance button clarity and improve recognition. Icons can be positioned on the
            left or right and automatically flip in RTL layouts. Icon size scales proportionally
            with button size.
          </p>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700">Icon Position</h3>
              <div className="flex flex-wrap gap-4">
                <Button icon="fa-solid fa-download" iconPosition="left">Download</Button>
                <Button icon="fa-solid fa-upload" iconPosition="right" variant="secondary">Upload</Button>
                <Button icon="fa-solid fa-cog" iconPosition="left" variant="outline">Settings</Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700">Icon-Only Buttons</h3>
              <div className="flex items-center gap-3">
                <Button size="iconXs" icon="fa-solid fa-bell" variant="iconBtn" aria-label="Notifications" />
                <Button size="iconSm" icon="fa-solid fa-bell" variant="iconBtn" aria-label="Notifications" />
                <Button size="iconMd" icon="fa-solid fa-bell" variant="iconBtn" aria-label="Notifications" />
                <Button size="iconLg" icon="fa-solid fa-bell" variant="iconBtn" aria-label="Notifications" />
                <Button size="iconXl" icon="fa-solid fa-bell" variant="iconBtn" aria-label="Notifications" />
              </div>
              <p className="text-xs text-gray-600 mt-2">Always include aria-label for icon-only buttons</p>
            </div>
          </div>
        </section>

        {/* Button States */}
        <section className="mb-12 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Button States</h2>
          <p className="text-sm text-gray-700 mb-6">
            Buttons communicate their current state through visual feedback. Loading states show
            progress, disabled states prevent interaction, and active states indicate selection.
          </p>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700">Loading State</h3>
              <div className="flex flex-wrap gap-4">
                <Button loading>Loading</Button>
                <Button loading loadingText="Saving..." variant="accent">Save</Button>
                <Button loading variant="outline">Processing</Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700">Disabled State</h3>
              <div className="flex flex-wrap gap-4">
                <Button disabled>Disabled</Button>
                <Button disabled variant="secondary">Disabled</Button>
                <Button disabled variant="accent">Disabled</Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700">Active State</h3>
              <div className="flex flex-wrap gap-4">
                <Button isActive>Active</Button>
                <Button isActive variant="secondary">Active</Button>
                <Button isActive variant="accent">Active</Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700">Pin State</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="pin" icon="fa-solid fa-star" isPinned={false}>Pin</Button>
                <Button variant="pin" icon="fa-solid fa-star" isPinned={true}>Pinned</Button>
              </div>
              <p className="text-xs text-gray-600 mt-2">Pin variant changes to accent color when pinned</p>
            </div>
          </div>
        </section>

        {/* RTL/Arabic Support */}
        <section className="mb-12 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Arabic/RTL Support</h2>
          <p className="text-sm text-gray-700 mb-6">
            Buttons automatically adapt to Arabic language with IBM Plex Sans Arabic font and proper
            RTL layout. Icons flip position and text aligns correctly for right-to-left reading.
          </p>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded bg-gray-50">
                <h3 className="text-sm font-semibold mb-3 text-gray-700">English (LTR)</h3>
                <div className="space-y-3">
                  <Button variant="primary" icon="fa-solid fa-download" iconPosition="left">
                    Download
                  </Button>
                  <Button variant="accent" icon="fa-solid fa-upload" iconPosition="right">
                    Upload
                  </Button>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded bg-gray-50">
                <h3 className="text-sm font-semibold mb-3 text-gray-700">Arabic (RTL)</h3>
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    icon="fa-solid fa-download"
                    iconPosition="left"
                    arabicText="تحميل"
                    showArabicText={true}
                  >
                    Download
                  </Button>
                  <Button
                    variant="accent"
                    icon="fa-solid fa-upload"
                    iconPosition="right"
                    arabicText="رفع"
                    showArabicText={true}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Responsive Features */}
        <section className="mb-12 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Responsive Features</h2>
          <p className="text-sm text-gray-700 mb-6">
            Buttons adapt to different screen sizes with mobile-optimized touch targets and
            flexible width options. All buttons meet the 44px minimum touch target on mobile devices.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700">Full Width</h3>
              <Button fullWidth variant="primary">Full Width Button</Button>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700">Full Width on Mobile Only</h3>
              <Button fullWidthOnMobile variant="secondary">Responsive Width</Button>
              <p className="text-xs text-gray-600 mt-2">Full width on mobile, auto width on desktop</p>
            </div>
          </div>
        </section>

        {/* Real World Examples */}
        <section className="mb-12 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Real World Examples</h2>
          <p className="text-sm text-gray-700 mb-6">
            Common button combinations for typical UI patterns and user flows.
          </p>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700">Form Actions</h3>
              <div className="flex gap-3">
                <Button variant="primary">Save Changes</Button>
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Delete</Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700">Navigation</h3>
              <div className="flex gap-3">
                <Button variant="nav" icon="fa-solid fa-th">Menu</Button>
                <Button variant="ghost" icon="fa-solid fa-user">Profile</Button>
                <Button variant="ghost" icon="fa-solid fa-cog">Settings</Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700">Status Actions</h3>
              <div className="flex gap-3">
                <Button variant="success" icon="fa-solid fa-check">Approve</Button>
                <Button variant="warning" icon="fa-solid fa-exclamation">Review</Button>
                <Button variant="info" icon="fa-solid fa-info">Details</Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700">File Actions</h3>
              <div className="flex gap-3">
                <Button variant="accent" icon="fa-solid fa-download">Download</Button>
                <Button variant="outline" icon="fa-solid fa-upload">Upload</Button>
                <Button variant="ghost" icon="fa-solid fa-star">Favorite</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-12 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Accessibility</h2>
          <p className="text-sm text-gray-700 mb-6">
            All buttons are designed with accessibility in mind, featuring keyboard navigation,
            screen reader support, clear focus indicators, and proper ARIA labels.
          </p>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700">Keyboard Navigation</h3>
              <p className="text-xs text-gray-600 mb-3">
                Use Tab to navigate, Enter/Space to activate
              </p>
              <div className="flex gap-3">
                <Button>First</Button>
                <Button variant="secondary">Second</Button>
                <Button variant="accent">Third</Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700">Screen Reader Support</h3>
              <p className="text-xs text-gray-600 mb-3">
                Icon-only buttons include aria-labels for context
              </p>
              <div className="flex gap-3">
                <Button size="iconMd" icon="fa-solid fa-bell" aria-label="Notifications" />
                <Button size="iconMd" icon="fa-solid fa-cog" aria-label="Settings" />
                <Button size="iconMd" icon="fa-solid fa-user" aria-label="User Profile" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 text-gray-700">Touch Targets</h3>
              <p className="text-xs text-gray-600 mb-3">
                Minimum 44px touch target on mobile devices (WCAG 2.1)
              </p>
              <div className="flex gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  ),
};

// Default button
export const Default: Story = {
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
  },
};

// Interactive playground
export const Playground: Story = {
  args: {
    children: "Interactive Button",
    variant: "primary",
    size: "md",
    icon: "fa-solid fa-bell",
    iconPosition: "left",
    loading: false,
    loadingText: "Loading...",
    arabicText: "زر تفاعلي",
    showArabicText: false,
    isPinned: false,
    isActive: false,
    ripple: true,
    fullWidth: false,
    fullWidthOnMobile: false,
    disabled: false,
    ariaLabel: "Interactive button for testing",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test all button properties. Use the controls panel to experiment with different combinations.",
      },
    },
  },
};

// Icon showcase with better controls
export const IconShowcase: Story = {
  render: () => {
    const [selectedIcon, setSelectedIcon] = React.useState("fa-solid fa-bell");
    const [iconPosition, setIconPosition] = React.useState<"left" | "right">("left");

    const icons = [
      { name: "Bell", icon: "fa-solid fa-bell" },
      { name: "Arrow Right", icon: "fa-solid fa-arrow-right" },
      { name: "Settings", icon: "fa-solid fa-cog" },
      { name: "User", icon: "fa-solid fa-user" },
      { name: "Star", icon: "fa-solid fa-star" },
      { name: "Grid", icon: "fa-solid fa-th" },
      { name: "Download", icon: "fa-solid fa-download" },
      { name: "Upload", icon: "fa-solid fa-upload" },
      { name: "Check", icon: "fa-solid fa-check" },
      { name: "Times", icon: "fa-solid fa-times" },
      { name: "Exclamation", icon: "fa-solid fa-exclamation" },
      { name: "Info", icon: "fa-solid fa-info" },
    ];

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {icons.map(({ name, icon }) => (
            <button
              key={name}
              onClick={() => setSelectedIcon(icon)}
              className={`px-3 py-1 text-xs rounded border ${
                selectedIcon === icon
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-secondary-foreground border-border hover:bg-secondary/80"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="position"
              checked={iconPosition === "left"}
              onChange={() => setIconPosition("left")}
            />
            Left
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="position"
              checked={iconPosition === "right"}
              onChange={() => setIconPosition("right")}
            />
            Right
          </label>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button icon={selectedIcon} iconPosition={iconPosition}>
            With Icon
          </Button>
          <Button variant="secondary" icon={selectedIcon} iconPosition={iconPosition}>
            Secondary
          </Button>
          <Button variant="accent" icon={selectedIcon} iconPosition={iconPosition}>
            Accent
          </Button>
          <Button variant="outline" icon={selectedIcon} iconPosition={iconPosition}>
            Outline
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive icon showcase. Click on icon names to change the icon, and use radio buttons to change icon position.",
      },
    },
  },
};

// State combinations showcase
export const StateCombinations: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(false);
    const [pinned, setPinned] = React.useState(false);
    const [active, setActive] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);

    const handleLoadingDemo = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={loading}
              onChange={(e) => setLoading(e.target.checked)}
            />
            Loading
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} />
            Pinned
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
            Active
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
            />
            Disabled
          </label>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button
            variant="primary"
            loading={loading}
            isPinned={pinned}
            isActive={active}
            disabled={disabled}
            onClick={handleLoadingDemo}
          >
            Primary State
          </Button>

          <Button
            variant="pin"
            icon="fa-solid fa-star"
            isPinned={pinned}
            isActive={active}
            disabled={disabled}
          >
            Pin Button
          </Button>

          <Button
            variant="accent"
            loading={loading}
            isActive={active}
            disabled={disabled}
            onClick={handleLoadingDemo}
          >
            Accent State
          </Button>

          <Button
            variant="outline"
            loading={loading}
            isActive={active}
            disabled={disabled}
            onClick={handleLoadingDemo}
          >
            Outline State
          </Button>
        </div>

        <div className="text-sm text-neutral-600">
          <p>
            • <strong>Loading:</strong> Shows spinner and disables interactions
          </p>
          <p>
            • <strong>Pinned:</strong> Changes pin variant to accent color
          </p>
          <p>
            • <strong>Active:</strong> Shows ring indicator around button
          </p>
          <p>
            • <strong>Disabled:</strong> Reduces opacity and disables all interactions
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive state combinations. Toggle different states to see how they interact with each other.",
      },
    },
  },
};

// Core variants showcase
export const CoreVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="text">Text</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Core button variants with black-primary design system. Primary uses black, secondary uses light gray, and accent uses orange for brand highlights.",
      },
    },
  },
};

// Semantic variants
export const SemanticVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="success" icon="fa-solid fa-check">
        Success
      </Button>
      <Button variant="warning" icon="fa-solid fa-exclamation">
        Warning
      </Button>
      <Button variant="destructive" icon="fa-solid fa-times">
        Destructive
      </Button>
      <Button variant="info" icon="fa-solid fa-info">
        Info
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Semantic button variants for different states and actions. Use these for status-specific actions.",
      },
    },
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Button size variants from extra small to extra large. Medium is the default size.",
      },
    },
  },
};

// Icon buttons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button icon="fa-solid fa-download" iconPosition="left">
        Download
      </Button>
      <Button icon="fa-solid fa-upload" iconPosition="right">
        Upload
      </Button>
      <Button variant="accent" icon="fa-solid fa-arrow-right" iconPosition="right">
        Continue
      </Button>
      <Button variant="outline" icon="fa-solid fa-cog" iconPosition="left">
        Settings
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Buttons with icons positioned on the left or right. Icons automatically flip position in RTL layouts.",
      },
    },
  },
};

// Icon-only buttons
export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Different icon-only sizes */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Extra Small:</span>
        <Button size="iconXs" icon="fa-solid fa-bell" variant="iconBtn" aria-label="XS Icon" />
        <Button size="iconXs" icon="fa-solid fa-cog" variant="secondary" aria-label="XS Settings" />
        <Button size="iconXs" icon="fa-solid fa-user" variant="outline" aria-label="XS Profile" />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Small:</span>
        <Button size="iconSm" icon="fa-solid fa-bell" variant="iconBtn" aria-label="SM Icon" />
        <Button size="iconSm" icon="fa-solid fa-cog" variant="secondary" aria-label="SM Settings" />
        <Button size="iconSm" icon="fa-solid fa-user" variant="outline" aria-label="SM Profile" />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Medium:</span>
        <Button size="iconMd" icon="fa-solid fa-bell" variant="iconBtn" aria-label="MD Icon" />
        <Button size="iconMd" icon="fa-solid fa-cog" variant="secondary" aria-label="MD Settings" />
        <Button size="iconMd" icon="fa-solid fa-user" variant="outline" aria-label="MD Profile" />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Large:</span>
        <Button size="iconLg" icon="fa-solid fa-bell" variant="iconBtn" aria-label="LG Icon" />
        <Button size="iconLg" icon="fa-solid fa-cog" variant="secondary" aria-label="LG Settings" />
        <Button size="iconLg" icon="fa-solid fa-user" variant="outline" aria-label="LG Profile" />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Extra Large:</span>
        <Button size="iconXl" icon="fa-solid fa-bell" variant="iconBtn" aria-label="XL Icon" />
        <Button size="iconXl" icon="fa-solid fa-cog" variant="secondary" aria-label="XL Settings" />
        <Button size="iconXl" icon="fa-solid fa-user" variant="outline" aria-label="XL Profile" />
      </div>

      {/* Different variants with medium size */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Variants:</span>
        <Button size="iconMd" icon="fa-solid fa-bell" variant="primary" aria-label="Primary" />
        <Button size="iconMd" icon="fa-solid fa-cog" variant="secondary" aria-label="Secondary" />
        <Button size="iconMd" icon="fa-solid fa-user" variant="outline" aria-label="Outline" />
        <Button size="iconMd" icon="fa-solid fa-star" variant="accent" aria-label="Accent" />
        <Button size="iconMd" icon="fa-solid fa-bell" variant="ghost" aria-label="Ghost" />
        <Button size="iconMd" icon="fa-solid fa-cog" variant="text" aria-label="Text" />
      </div>

      {/* Semantic variants */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Semantic:</span>
        <Button size="iconMd" icon="fa-solid fa-check" variant="success" aria-label="Success" />
        <Button
          size="iconMd"
          icon="fa-solid fa-exclamation"
          variant="warning"
          aria-label="Warning"
        />
        <Button
          size="iconMd"
          icon="fa-solid fa-times"
          variant="destructive"
          aria-label="Destructive"
        />
        <Button size="iconMd" icon="fa-solid fa-info" variant="info" aria-label="Info" />
      </div>

      {/* Special variants */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Special:</span>
        <Button size="iconMd" icon="fa-solid fa-star" variant="pin" aria-label="Pin" />
        <Button size="iconMd" icon="fa-solid fa-user" variant="nav" aria-label="Nav" />
        <Button size="iconMd" icon="fa-solid fa-bell" variant="iconBtn" aria-label="IconBtn" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Icon-only buttons for compact interfaces. Always include aria-label for accessibility.",
      },
    },
  },
};

// Loading states
export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button loading>Loading</Button>
      <Button loading loadingText="Saving...">
        Save
      </Button>
      <Button variant="accent" loading>
        Processing
      </Button>
      <Button variant="outline" loading loadingText="Uploading...">
        Upload
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Loading states with spinner animations. Use loadingText to show custom loading messages.",
      },
    },
  },
};

// Disabled states
export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled Primary</Button>
      <Button variant="secondary" disabled>
        Disabled Secondary
      </Button>
      <Button variant="accent" disabled>
        Disabled Accent
      </Button>
      <Button variant="outline" disabled>
        Disabled Outline
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Disabled button states. All variants support disabled state with reduced opacity.",
      },
    },
  },
};

// Special variants
export const SpecialVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="pin" icon="fa-solid fa-star" isPinned={false}>
        Pin
      </Button>
      <Button variant="pin" icon="fa-solid fa-star" isPinned={true}>
        Pinned
      </Button>
      <Button variant="nav" icon="fa-solid fa-th">
        Navigation
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Special button variants for specific use cases. Pin variant changes color when pinned, nav variant for navigation.",
      },
    },
  },
};

// Interactive Arabic/RTL showcase
export const ArabicInteractive: Story = {
  render: () => {
    const [showArabic, setShowArabic] = React.useState(false);
    const [selectedVariant, setSelectedVariant] = React.useState("primary");
    const [selectedSize, setSelectedSize] = React.useState("md");
    const [withIcon, setWithIcon] = React.useState(false);

    const variants = [
      { name: "Primary", value: "primary" },
      { name: "Secondary", value: "secondary" },
      { name: "Accent", value: "accent" },
      { name: "Outline", value: "outline" },
      { name: "Ghost", value: "ghost" },
      { name: "Text", value: "text" },
      { name: "Success", value: "success" },
      { name: "Warning", value: "warning" },
      { name: "Destructive", value: "destructive" },
      { name: "Info", value: "info" },
    ];

    const sizes = [
      { name: "XS", value: "xs" },
      { name: "SM", value: "sm" },
      { name: "MD", value: "md" },
      { name: "LG", value: "lg" },
      { name: "XL", value: "xl" },
    ];

    const arabicTexts = {
      primary: "زر أساسي",
      secondary: "زر ثانوي",
      accent: "زر مميز",
      outline: "زر محيطي",
      ghost: "زر شفاف",
      text: "زر نصي",
      success: "نجح",
      warning: "تحذير",
      destructive: "حذف",
      info: "معلومات",
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Interactive Arabic/RTL Showcase</h3>
          <p className="text-sm text-neutral-600 mb-4">
            Toggle between English and Arabic to see RTL layout and IBM Plex Sans Arabic font
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-neutral-50 rounded-lg">
          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={showArabic}
                onChange={(e) => setShowArabic(e.target.checked)}
              />
              Show Arabic Text
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Variant:</label>
            <select
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
              className="w-full p-2 border border-neutral-300 rounded text-sm"
            >
              {variants.map((variant) => (
                <option key={variant.value} value={variant.value}>
                  {variant.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Size:</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-2 border border-neutral-300 rounded text-sm"
            >
              {sizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={withIcon}
                onChange={(e) => setWithIcon(e.target.checked)}
              />
              With Icon
            </label>
          </div>
        </div>

        {/* Button Display */}
        <div className="text-center space-y-4">
          <div className="p-6 border border-neutral-200 rounded-lg bg-white">
            <p className="text-sm text-neutral-600 mb-4">
              {showArabic ? "Arabic (RTL) - IBM Plex Sans Arabic" : "English (LTR) - Figtree"}
            </p>
            <Button
              variant={selectedVariant as Variants}
              size={selectedSize as SizeVariants}
              icon={withIcon ? "fa-solid fa-download" : undefined}
              iconPosition="left"
              arabicText={
                showArabic ? arabicTexts[selectedVariant as keyof typeof arabicTexts] : undefined
              }
              showArabicText={showArabic}
            >
              {showArabic
                ? arabicTexts[selectedVariant as keyof typeof arabicTexts]
                : `${selectedVariant.charAt(0).toUpperCase() + selectedVariant.slice(1)} Button`}
            </Button>
          </div>
        </div>

        {/* Font Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-neutral-200 rounded-lg">
            <h4 className="text-sm font-medium mb-3 text-neutral-700">English (Figtree)</h4>
            <div className="space-y-2">
              <Button variant="primary" size="sm">
                Small Button
              </Button>
              <Button variant="primary" size="md">
                Medium Button
              </Button>
              <Button variant="primary" size="lg">
                Large Button
              </Button>
            </div>
          </div>

          <div className="p-4 border border-neutral-200 rounded-lg">
            <h4 className="text-sm font-medium mb-3 text-neutral-700">
              Arabic (IBM Plex Sans Arabic)
            </h4>
            <div className="space-y-2">
              <Button variant="primary" size="sm" arabicText="زر صغير" showArabicText={true}>
                Small Button
              </Button>
              <Button variant="primary" size="md" arabicText="زر متوسط" showArabicText={true}>
                Medium Button
              </Button>
              <Button variant="primary" size="lg" arabicText="زر كبير" showArabicText={true}>
                Large Button
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive Arabic/RTL showcase with controls to test different variants, sizes, and language combinations.",
      },
    },
  },
};

// RTL/Arabic support with IBM Plex Sans Arabic
export const ArabicSupport: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Arabic Button Support</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Buttons automatically use IBM Plex Sans Arabic font and RTL layout for Arabic text
        </p>
      </div>

      {/* Core variants in Arabic */}
      <div>
        <h4 className="text-md font-medium mb-3">Core Variants (Arabic)</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="primary" arabicText="زر أساسي" showArabicText={true}>
            Primary
          </Button>

          <Button variant="secondary" arabicText="زر ثانوي" showArabicText={true}>
            Secondary
          </Button>

          <Button variant="accent" arabicText="زر مميز" showArabicText={true}>
            Accent
          </Button>

          <Button variant="outline" arabicText="زر محيطي" showArabicText={true}>
            Outline
          </Button>
        </div>
      </div>

      {/* Semantic variants in Arabic */}
      <div>
        <h4 className="text-md font-medium mb-3">Semantic Variants (Arabic)</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="success" arabicText="نجح" showArabicText={true} icon="fa-solid fa-check">
            Success
          </Button>

          <Button
            variant="warning"
            arabicText="تحذير"
            showArabicText={true}
            icon="fa-solid fa-exclamation"
          >
            Warning
          </Button>

          <Button
            variant="destructive"
            arabicText="حذف"
            showArabicText={true}
            icon="fa-solid fa-times"
          >
            Delete
          </Button>

          <Button variant="info" arabicText="معلومات" showArabicText={true} icon="fa-solid fa-info">
            Info
          </Button>
        </div>
      </div>

      {/* Arabic with icons */}
      <div>
        <h4 className="text-md font-medium mb-3">Arabic with Icons (RTL Layout)</h4>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="primary"
            arabicText="تحميل"
            showArabicText={true}
            icon="fa-solid fa-download"
            iconPosition="left"
          >
            Download
          </Button>

          <Button
            variant="accent"
            arabicText="رفع"
            showArabicText={true}
            icon="fa-solid fa-upload"
            iconPosition="right"
          >
            Upload
          </Button>

          <Button
            variant="outline"
            arabicText="إعدادات"
            showArabicText={true}
            icon="fa-solid fa-cog"
            iconPosition="left"
          >
            Settings
          </Button>
        </div>
      </div>

      {/* Font comparison */}
      <div>
        <h4 className="text-md font-medium mb-3">Font Comparison</h4>
        <div className="space-y-4">
          <div className="p-4 border border-neutral-200 rounded-lg">
            <p className="text-sm text-neutral-600 mb-2">English (Figtree font):</p>
            <Button variant="primary">Primary Button</Button>
          </div>
          <div className="p-4 border border-neutral-200 rounded-lg">
            <p className="text-sm text-neutral-600 mb-2">Arabic (IBM Plex Sans Arabic font):</p>
            <Button variant="primary" arabicText="زر أساسي" showArabicText={true}>
              Primary Button
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-neutral-500">
          Arabic buttons automatically use IBM Plex Sans Arabic font and RTL layout
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Arabic language support with IBM Plex Sans Arabic font and RTL layout. Icons automatically flip position and text aligns properly.",
      },
    },
  },
};

// Interactive states
export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Hover States</h3>
        <div className="flex gap-4">
          <Button variant="primary">Hover me</Button>
          <Button variant="secondary">Hover me</Button>
          <Button variant="accent">Hover me</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Focus States</h3>
        <div className="flex gap-4">
          <Button variant="primary">Focus me</Button>
          <Button variant="outline">Focus me</Button>
          <Button variant="ghost">Focus me</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Active States</h3>
        <div className="flex gap-4">
          <Button variant="primary" isActive>
            Active
          </Button>
          <Button variant="secondary" isActive>
            Active
          </Button>
          <Button variant="accent" isActive>
            Active
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Interactive states including hover, focus, and active states. All variants have consistent interaction patterns.",
      },
    },
  },
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Form actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Form Actions</h3>
        <div className="flex gap-3">
          <Button variant="primary">Save Changes</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </div>

      {/* Navigation */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Navigation</h3>
        <div className="flex gap-3">
          <Button variant="nav" icon="fa-solid fa-th">
            Menu
          </Button>
          <Button variant="ghost" icon="fa-solid fa-user">
            Profile
          </Button>
          <Button variant="ghost" icon="fa-solid fa-cog">
            Settings
          </Button>
        </div>
      </div>

      {/* Status actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Status Actions</h3>
        <div className="flex gap-3">
          <Button variant="success" icon="fa-solid fa-check">
            Approve
          </Button>
          <Button variant="warning" icon="fa-solid fa-exclamation">
            Review
          </Button>
          <Button variant="info" icon="fa-solid fa-info">
            Details
          </Button>
        </div>
      </div>

      {/* File actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">File Actions</h3>
        <div className="flex gap-3">
          <Button variant="accent" icon="fa-solid fa-download">
            Download
          </Button>
          <Button variant="outline" icon="fa-solid fa-upload">
            Upload
          </Button>
          <Button variant="ghost" icon="fa-solid fa-star">
            Favorite
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Real-world usage examples showing how to combine variants, icons, and states for common UI patterns.",
      },
    },
  },
};

// Responsive design showcase
export const ResponsiveDesign: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Touch-Friendly Sizes</h3>
        <p className="text-sm text-neutral-600 mb-4">
          All buttons meet the 44px minimum touch target on mobile devices.
        </p>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Full Width Options</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Buttons can be full width or full width on mobile only.
        </p>
        <div className="space-y-4">
          <Button fullWidth>Full Width Button</Button>
          <Button fullWidthOnMobile variant="secondary">
            Full Width on Mobile
          </Button>
          <div className="flex gap-3">
            <Button variant="accent">Auto Width</Button>
            <Button variant="outline">Auto Width</Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Mobile Interactions</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Enhanced touch interactions with scale animations on mobile.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Touch me</Button>
          <Button variant="secondary">Touch me</Button>
          <Button variant="accent">Touch me</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Responsive Icon Buttons</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Icon buttons scale appropriately across devices.
        </p>
        <div className="flex gap-3">
          <Button size="icon" icon="fa-solid fa-bell" aria-label="Notifications" />
          <Button size="icon" icon="fa-solid fa-cog" variant="secondary" aria-label="Settings" />
          <Button size="icon" icon="fa-solid fa-user" variant="accent" aria-label="Profile" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Responsive design features including touch-friendly sizes, full-width options, and mobile-optimized interactions.",
      },
    },
  },
};

// RTL/LTR comprehensive showcase
export const RTLShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Complete RTL/LTR Support</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Buttons automatically adapt to Arabic language with IBM Plex Sans Arabic font and proper
          RTL layout
        </p>
      </div>

      {/* Language comparison */}
      <div>
        <h4 className="text-md font-medium mb-3">Language Comparison</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-neutral-200 rounded-lg">
            <h5 className="text-sm font-medium mb-3 text-neutral-700">English (LTR)</h5>
            <div className="space-y-3">
              <Button variant="primary" icon="fa-solid fa-download" iconPosition="left">
                Download File
              </Button>
              <Button variant="accent" icon="fa-solid fa-upload" iconPosition="right">
                Upload File
              </Button>
              <Button variant="outline" icon="fa-solid fa-cog" iconPosition="left">
                Settings
              </Button>
            </div>
          </div>

          <div className="p-4 border border-neutral-200 rounded-lg">
            <h5 className="text-sm font-medium mb-3 text-neutral-700">Arabic (RTL)</h5>
            <div className="space-y-3">
              <Button
                variant="primary"
                icon="fa-solid fa-download"
                iconPosition="left"
                arabicText="تحميل الملف"
                showArabicText={true}
              >
                Download File
              </Button>
              <Button
                variant="accent"
                icon="fa-solid fa-upload"
                iconPosition="right"
                arabicText="رفع الملف"
                showArabicText={true}
              >
                Upload File
              </Button>
              <Button
                variant="outline"
                icon="fa-solid fa-cog"
                iconPosition="left"
                arabicText="الإعدادات"
                showArabicText={true}
              >
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Font rendering comparison */}
      <div>
        <h4 className="text-md font-medium mb-3">Font Rendering</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-neutral-200 rounded-lg">
            <h5 className="text-sm font-medium mb-3 text-neutral-700">Figtree (English)</h5>
            <div className="space-y-2">
              <Button variant="primary" size="sm">
                Small Button
              </Button>
              <Button variant="primary" size="md">
                Medium Button
              </Button>
              <Button variant="primary" size="lg">
                Large Button
              </Button>
            </div>
          </div>

          <div className="p-4 border border-neutral-200 rounded-lg">
            <h5 className="text-sm font-medium mb-3 text-neutral-700">IBM Plex Sans Arabic</h5>
            <div className="space-y-2">
              <Button variant="primary" size="sm" arabicText="زر صغير" showArabicText={true}>
                Small Button
              </Button>
              <Button variant="primary" size="md" arabicText="زر متوسط" showArabicText={true}>
                Medium Button
              </Button>
              <Button variant="primary" size="lg" arabicText="زر كبير" showArabicText={true}>
                Large Button
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Icon positioning in RTL */}
      <div>
        <h4 className="text-md font-medium mb-3">Icon Positioning (RTL)</h4>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-neutral-600 mb-2">
              Icons automatically flip position in RTL:
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                arabicText="تحميل"
                showArabicText={true}
                icon="fa-solid fa-download"
                iconPosition="left"
              >
                Download
              </Button>
              <Button
                variant="secondary"
                arabicText="رفع"
                showArabicText={true}
                icon="fa-solid fa-upload"
                iconPosition="right"
              >
                Upload
              </Button>
              <Button
                variant="accent"
                arabicText="بحث"
                showArabicText={true}
                icon="fa-solid fa-bell"
                iconPosition="left"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* All variants in Arabic */}
      <div>
        <h4 className="text-md font-medium mb-3">All Variants (Arabic)</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <Button variant="primary" arabicText="أساسي" showArabicText={true}>
            Primary
          </Button>
          <Button variant="secondary" arabicText="ثانوي" showArabicText={true}>
            Secondary
          </Button>
          <Button variant="accent" arabicText="مميز" showArabicText={true}>
            Accent
          </Button>
          <Button variant="outline" arabicText="محيطي" showArabicText={true}>
            Outline
          </Button>
          <Button variant="ghost" arabicText="شفاف" showArabicText={true}>
            Ghost
          </Button>
          <Button variant="text" arabicText="نصي" showArabicText={true}>
            Text
          </Button>
          <Button variant="success" arabicText="نجح" showArabicText={true}>
            Success
          </Button>
          <Button variant="warning" arabicText="تحذير" showArabicText={true}>
            Warning
          </Button>
          <Button variant="destructive" arabicText="حذف" showArabicText={true}>
            Delete
          </Button>
          <Button variant="info" arabicText="معلومات" showArabicText={true}>
            Info
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comprehensive RTL/LTR support with IBM Plex Sans Arabic font, automatic icon positioning, and proper text alignment.",
      },
    },
  },
};

// Accessibility showcase
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Keyboard Navigation</h3>
        <p className="text-sm text-neutral-600 mb-4">
          All buttons are fully keyboard accessible. Use Tab to navigate, Enter/Space to activate.
        </p>
        <div className="flex gap-3">
          <Button>First Button</Button>
          <Button variant="secondary">Second Button</Button>
          <Button variant="accent">Third Button</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Screen Reader Support</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Icon-only buttons include proper aria-labels for screen readers.
        </p>
        <div className="flex gap-3">
          <Button size="icon" icon="fa-solid fa-bell" aria-label="Notifications" />
          <Button size="icon" icon="fa-solid fa-cog" aria-label="Settings" />
          <Button size="icon" icon="fa-solid fa-user" aria-label="User Profile" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Focus Indicators</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Clear focus indicators for keyboard navigation.
        </p>
        <div className="flex gap-3">
          <Button variant="primary">Focus me</Button>
          <Button variant="outline">Focus me</Button>
          <Button variant="ghost">Focus me</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Accessibility features including keyboard navigation, screen reader support, and focus indicators.",
      },
    },
  },
};
