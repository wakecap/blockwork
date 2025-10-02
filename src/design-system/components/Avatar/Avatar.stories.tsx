import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRobot } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "iconXs", "iconSm", "iconMd", "iconLg", "iconXl"],
    },
    status: {
      control: { type: "select" },
      options: ["online", "offline", "away", "busy"],
    },
    statusPosition: {
      control: { type: "select" },
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
    },
    showChevron: {
      control: { type: "boolean" },
      description: "Show chevron down icon for dropdown indicators",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "John Doe",
  },
};

export const WithImage: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    alt: "John Doe",
  },
};

export const WithName: Story = {
  args: {
    name: "Alice Smith",
  },
};

export const WithFallbackIcon: Story = {
  args: {
    fallbackIcon: <FontAwesomeIcon icon={faUser} />,
  },
};

export const WithCustomIcon: Story = {
  args: {
    fallbackIcon: <FontAwesomeIcon icon={faRobot} />,
  },
};

export const Online: Story = {
  args: {
    name: "John Doe",
    status: "online",
  },
};

export const Offline: Story = {
  args: {
    name: "John Doe",
    status: "offline",
  },
};

export const Away: Story = {
  args: {
    name: "John Doe",
    status: "away",
  },
};

export const Busy: Story = {
  args: {
    name: "John Doe",
    status: "busy",
  },
};

export const ExtraSmall: Story = {
  args: {
    name: "John Doe",
    size: "xs",
  },
};

export const Small: Story = {
  args: {
    name: "John Doe",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    name: "John Doe",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    name: "John Doe",
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    name: "John Doe",
    size: "xl",
  },
};

export const StatusTopLeft: Story = {
  args: {
    name: "John Doe",
    status: "online",
    statusPosition: "top-left",
  },
};

export const StatusTopRight: Story = {
  args: {
    name: "John Doe",
    status: "online",
    statusPosition: "top-right",
  },
};

export const StatusBottomLeft: Story = {
  args: {
    name: "John Doe",
    status: "online",
    statusPosition: "bottom-left",
  },
};

export const StatusBottomRight: Story = {
  args: {
    name: "John Doe",
    status: "online",
    statusPosition: "bottom-right",
  },
};

export const Clickable: Story = {
  args: {
    name: "John Doe",
    onClick: () => console.log("Avatar clicked!"),
  },
};

export const WithChevron: Story = {
  args: {
    name: "Project Alpha",
    showChevron: true,
    onClick: () => console.log("Project dropdown clicked!"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Avatar with chevron down icon, typically used for project or organization selectors that open dropdown menus.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="John Doe" size="xs" />
      <Avatar name="John Doe" size="sm" />
      <Avatar name="John Doe" size="md" />
      <Avatar name="John Doe" size="lg" />
      <Avatar name="John Doe" size="xl" />
    </div>
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="John Doe" status="online" />
      <Avatar name="John Doe" status="offline" />
      <Avatar name="John Doe" status="away" />
      <Avatar name="John Doe" status="busy" />
    </div>
  ),
};

export const NameExamples: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="John Doe" />
      <Avatar name="Alice Smith" />
      <Avatar name="Bob Johnson" />
      <Avatar name="Sarah Wilson" />
      <Avatar name="Mike" />
    </div>
  ),
};

export const ChevronSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Extra Small:</span>
        <Avatar name="Project Alpha" size="xs" showChevron={true} />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Small:</span>
        <Avatar name="Project Beta" size="sm" showChevron={true} />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Medium:</span>
        <Avatar name="Project Gamma" size="md" showChevron={true} />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Large:</span>
        <Avatar name="Project Delta" size="lg" showChevron={true} />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Extra Large:</span>
        <Avatar name="Project Epsilon" size="xl" showChevron={true} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Avatar with chevron down icon in different sizes. The chevron scales proportionally with the avatar size.",
      },
    },
  },
};

export const IconOnlySizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Icon-only sizes */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Extra Small:</span>
        <Avatar name="John Doe" size="iconXs" />
        <Avatar name="Alice Smith" size="iconXs" />
        <Avatar name="Bob Johnson" size="iconXs" />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Small:</span>
        <Avatar name="John Doe" size="iconSm" />
        <Avatar name="Alice Smith" size="iconSm" />
        <Avatar name="Bob Johnson" size="iconSm" />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Medium:</span>
        <Avatar name="John Doe" size="iconMd" />
        <Avatar name="Alice Smith" size="iconMd" />
        <Avatar name="Bob Johnson" size="iconMd" />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Large:</span>
        <Avatar name="John Doe" size="iconLg" />
        <Avatar name="Alice Smith" size="iconLg" />
        <Avatar name="Bob Johnson" size="iconLg" />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">Extra Large:</span>
        <Avatar name="John Doe" size="iconXl" />
        <Avatar name="Alice Smith" size="iconXl" />
        <Avatar name="Bob Johnson" size="iconXl" />
      </div>

      {/* With status indicators */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium w-24">With Status:</span>
        <Avatar name="John Doe" size="iconMd" status="online" />
        <Avatar name="Alice Smith" size="iconMd" status="away" />
        <Avatar name="Bob Johnson" size="iconMd" status="busy" />
        <Avatar name="Sarah Wilson" size="iconMd" status="offline" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Icon-only sizes for Avatars, matching the Button component sizing system. These sizes are optimized for compact interfaces and navigation bars.",
      },
    },
  },
};
