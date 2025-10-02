import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "outline", "success", "warning", "info"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    children: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different badge variants with semantic meanings.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different badge sizes for various use cases.",
      },
    },
  },
};

export const MinimalDesign: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">New</Badge>
      <Badge variant="secondary">Experimental</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Minimal badge design with subtle colors and clean typography.",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary" className="flex items-center gap-1">
        <span>🆕</span>
        New
      </Badge>
      <Badge variant="success" className="flex items-center gap-1">
        <span>✓</span>
        Verified
      </Badge>
      <Badge variant="warning" className="flex items-center gap-1">
        <span>⚠</span>
        Warning
      </Badge>
      <Badge variant="info" className="flex items-center gap-1">
        <span>ℹ</span>
        Info
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badges with icons for enhanced visual communication.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary" className="cursor-pointer hover:bg-gray-200">
        Clickable Secondary
      </Badge>
      <Badge variant="success" className="cursor-pointer hover:bg-green-200">
        Clickable Success
      </Badge>
      <Badge variant="warning" className="cursor-pointer hover:bg-yellow-200">
        Clickable Warning
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive badges with hover effects for clickable elements.",
      },
    },
  },
};
