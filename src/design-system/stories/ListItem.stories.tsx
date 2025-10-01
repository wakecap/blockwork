import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ListItem,
  UserListItem,
  FileListItem,
  NotificationListItem,
  SelectableListItem,
} from "../components/ListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faFile,
  faBell,
  faCheck,
  faTimes,
  faDownload,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof ListItem> = {
  title: "Content Display/ListItem",
  component: ListItem,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A flexible list item component for displaying various types of content in lists with different variants and interactions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "single-line", "multi-line", "avatar", "icon"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    isSelected: {
      control: { type: "boolean" },
    },
    isClickable: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "List Item Title",
    subtitle: "List item subtitle or description",
    className: "w-96",
  },
};

export const WithIcon: Story = {
  args: {
    title: "Item with Icon",
    subtitle: "This item has an icon on the left",
    icon: faUser,
    className: "w-96",
  },
};

export const WithAvatar: Story = {
  args: {
    title: "Item with Avatar",
    subtitle: "This item has an avatar image",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    className: "w-96",
  },
};

export const WithActions: Story = {
  args: {
    title: "Item with Actions",
    subtitle: "This item has action buttons",
    actions: (
      <div className="flex space-x-2">
        <button className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors">
          <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
        </button>
        <button className="p-1 text-neutral-400 hover:text-red-500 transition-colors">
          <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
        </button>
      </div>
    ),
    className: "w-96",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <ListItem
        title="Default Variant"
        subtitle="Standard list item with title and subtitle"
        variant="default"
      />
      <ListItem title="Single Line" subtitle="Compact single-line variant" variant="single-line" />
      <ListItem
        title="Multi Line"
        subtitle="Multi-line variant with longer description that wraps to multiple lines for better readability"
        variant="multi-line"
      />
      <ListItem
        title="With Avatar"
        subtitle="Avatar variant with user image"
        avatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
        variant="avatar"
      />
      <ListItem
        title="With Icon"
        subtitle="Icon variant with FontAwesome icon"
        icon={faFile}
        variant="icon"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <ListItem title="Small Size" subtitle="Compact small size" size="sm" />
      <ListItem title="Medium Size" subtitle="Standard medium size" size="md" />
      <ListItem title="Large Size" subtitle="Spacious large size" size="lg" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <ListItem title="Normal State" subtitle="Default list item" />
      <ListItem title="Selected State" subtitle="This item is selected" isSelected />
      <ListItem
        title="Clickable State"
        subtitle="This item is clickable (hover to see effect)"
        isClickable
        onClick={() => alert("Item clicked!")}
      />
      <ListItem
        title="Selected & Clickable"
        subtitle="This item is both selected and clickable"
        isSelected
        isClickable
        onClick={() => alert("Item clicked!")}
      />
    </div>
  ),
};

export const InteractiveExample: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set());

    const handleItemClick = (id: string) => {
      const newSelected = new Set(selectedItems);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      setSelectedItems(newSelected);
    };

    const items = [
      { id: "1", title: "Project Alpha", subtitle: "Web application development" },
      { id: "2", title: "Project Beta", subtitle: "Mobile app design" },
      { id: "3", title: "Project Gamma", subtitle: "API integration" },
    ];

    return (
      <div className="space-y-2 w-96">
        <h3 className="text-sm font-medium text-neutral-700 mb-2">
          Selected: {selectedItems.size} items
        </h3>
        {items.map((item) => (
          <ListItem
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            isSelected={selectedItems.has(item.id)}
            isClickable
            onClick={() => handleItemClick(item.id)}
          />
        ))}
      </div>
    );
  },
};

// Pre-built List Item Components
export const UserListItemExample: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <UserListItem
        name="Sarah Johnson"
        email="sarah.johnson@company.com"
        role="Senior Designer"
        avatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
        status="online"
        lastActive="2 minutes ago"
        isOnline
      />
      <UserListItem
        name="Michael Chen"
        email="michael.chen@company.com"
        role="Product Manager"
        avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
        status="away"
        lastActive="1 hour ago"
        isOnline={false}
      />
      <UserListItem
        name="Emma Wilson"
        email="emma.wilson@company.com"
        role="Frontend Developer"
        avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
        status="busy"
        lastActive="30 minutes ago"
        isOnline
      />
    </div>
  ),
};

export const FileListItemExample: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <FileListItem
        name="document.pdf"
        size="2.4 MB"
        type="PDF"
        modifiedDate="2024-01-15"
        isShared
        sharedWith={["Sarah Johnson", "Michael Chen"]}
      />
      <FileListItem
        name="presentation.pptx"
        size="15.7 MB"
        type="PowerPoint"
        modifiedDate="2024-01-14"
        isShared={false}
      />
      <FileListItem
        name="image.jpg"
        size="3.2 MB"
        type="Image"
        modifiedDate="2024-01-13"
        isShared
        sharedWith={["Emma Wilson"]}
      />
    </div>
  ),
};

export const NotificationListItemExample: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <NotificationListItem
        title="New message from Sarah"
        message="Hey, I've updated the design files. Can you take a look?"
        type="message"
        timestamp="2 minutes ago"
        isUnread
        avatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
      />
      <NotificationListItem
        title="Project deadline reminder"
        message="The Alpha project is due in 3 days"
        type="reminder"
        timestamp="1 hour ago"
        isUnread={false}
      />
      <NotificationListItem
        title="System update completed"
        message="Your system has been successfully updated to version 2.1"
        type="system"
        timestamp="3 hours ago"
        isUnread={false}
      />
    </div>
  ),
};

export const SelectableListItemExample: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set(["1"]));

    const handleSelectionChange = (id: string, selected: boolean) => {
      const newSelected = new Set(selectedItems);
      if (selected) {
        newSelected.add(id);
      } else {
        newSelected.delete(id);
      }
      setSelectedItems(newSelected);
    };

    const items = [
      { id: "1", title: "Marketing Campaign", subtitle: "Q1 2024 campaign materials" },
      { id: "2", title: "Product Launch", subtitle: "New feature release documentation" },
      { id: "3", title: "User Research", subtitle: "Customer feedback and insights" },
    ];

    return (
      <div className="space-y-2 w-96">
        <h3 className="text-sm font-medium text-neutral-700 mb-2">
          Selected: {selectedItems.size} of {items.length} items
        </h3>
        {items.map((item) => (
          <SelectableListItem
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            isSelected={selectedItems.has(item.id)}
            onSelectionChange={(selected) => handleSelectionChange(item.id, selected)}
          />
        ))}
      </div>
    );
  },
};
