import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover, MenuPopover, InfoPopover, FormPopover } from "./Popover";
import { Button } from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCog,
  faSignOutAlt,
  faInfo,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof Popover> = {
  title: "Content Display/Popover",
  component: Popover,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A floating panel component for displaying rich content with various positions and variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: { type: "select" },
      options: [
        "top",
        "bottom",
        "left",
        "right",
        "top-left",
        "top-right",
        "bottom-left",
        "bottom-right",
      ],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "light", "dark"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    showArrow: {
      control: { type: "boolean" },
    },
    showCloseButton: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <Popover
        content={
          <div className="p-4">
            <h3 className="font-medium text-neutral-900 mb-2">Popover Content</h3>
            <p className="text-sm text-neutral-600">
              This is a basic popover with some content. You can put any React elements here.
            </p>
          </div>
        }
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Button onClick={() => setIsOpen(!isOpen)}>Click to open popover</Button>
      </Popover>
    );
  },
};

export const Positions: Story = {
  render: () => {
    const positions = [
      "top",
      "bottom",
      "left",
      "right",
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
    ];
    const [openPosition, setOpenPosition] = React.useState<string | null>(null);

    return (
      <div className="grid grid-cols-3 gap-8 p-8">
        {positions.map((position) => (
          <div key={position} className="flex justify-center">
            <Popover
              content={
                <div className="p-3">
                  <p className="text-sm text-neutral-600">Position: {position}</p>
                </div>
              }
              position={position as any}
              isOpen={openPosition === position}
              onClose={() => setOpenPosition(null)}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenPosition(openPosition === position ? null : position)}
              >
                {position}
              </Button>
            </Popover>
          </div>
        ))}
      </div>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const variants = ["default", "light", "dark"];
    const [openVariant, setOpenVariant] = React.useState<string | null>(null);

    return (
      <div className="flex space-x-4">
        {variants.map((variant) => (
          <Popover
            key={variant}
            content={
              <div className="p-3">
                <p className="text-sm">{variant} variant</p>
              </div>
            }
            variant={variant as any}
            isOpen={openVariant === variant}
            onClose={() => setOpenVariant(null)}
          >
            <Button
              variant="outline"
              onClick={() => setOpenVariant(openVariant === variant ? null : variant)}
            >
              {variant}
            </Button>
          </Popover>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const sizes = ["sm", "md", "lg"];
    const [openSize, setOpenSize] = React.useState<string | null>(null);

    return (
      <div className="flex space-x-4">
        {sizes.map((size) => (
          <Popover
            key={size}
            content={
              <div className="p-3">
                <p className="text-sm text-neutral-600">{size} size popover</p>
              </div>
            }
            size={size as any}
            isOpen={openSize === size}
            onClose={() => setOpenSize(null)}
          >
            <Button variant="outline" onClick={() => setOpenSize(openSize === size ? null : size)}>
              {size}
            </Button>
          </Popover>
        ))}
      </div>
    );
  },
};

export const WithArrow: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <Popover
        content={
          <div className="p-4">
            <h3 className="font-medium text-neutral-900 mb-2">Popover with Arrow</h3>
            <p className="text-sm text-neutral-600">
              This popover has an arrow pointing to the trigger element.
            </p>
          </div>
        }
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showArrow
      >
        <Button onClick={() => setIsOpen(!isOpen)}>With Arrow</Button>
      </Popover>
    );
  },
};

export const WithCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <Popover
        content={
          <div className="p-4">
            <h3 className="font-medium text-neutral-900 mb-2">Popover with Close Button</h3>
            <p className="text-sm text-neutral-600">
              This popover has a close button in the top-right corner.
            </p>
          </div>
        }
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showCloseButton
      >
        <Button onClick={() => setIsOpen(!isOpen)}>With Close Button</Button>
      </Popover>
    );
  },
};

// Pre-built Popover Components
export const MenuPopoverExample: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const menuItems = [
      {
        label: "Profile",
        icon: faUser,
        onClick: () => {
          alert("Profile clicked");
          setIsOpen(false);
        },
      },
      {
        label: "Settings",
        icon: faCog,
        onClick: () => {
          alert("Settings clicked");
          setIsOpen(false);
        },
      },
      {
        label: "Sign Out",
        icon: faSignOutAlt,
        onClick: () => {
          alert("Sign out clicked");
          setIsOpen(false);
        },
      },
    ];

    return (
      <MenuPopover items={menuItems} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Button onClick={() => setIsOpen(!isOpen)}>User Menu</Button>
      </MenuPopover>
    );
  },
};

export const InfoPopoverExample: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <InfoPopover
        title="Feature Information"
        content="This feature allows you to organize your content into collections. You can create unlimited collections and share them with your team members."
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faInfo} className="w-4 h-4" />
        </Button>
      </InfoPopover>
    );
  },
};

export const FormPopoverExample: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <FormPopover
        title="Edit User"
        trigger={
          <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
            <FontAwesomeIcon icon={faEdit} className="w-4 h-4 mr-2" />
            Edit User
          </Button>
        }
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
            <input
              type="text"
              defaultValue="Sarah Johnson"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
            <input
              type="email"
              defaultValue="sarah.johnson@company.com"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                alert("User updated!");
                setIsOpen(false);
              }}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </FormPopover>
    );
  },
};

export const ComplexContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <Popover
        content={
          <div className="p-6 max-w-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900">Sarah Johnson</h3>
                <p className="text-sm text-neutral-600">Senior Designer</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Email</span>
                <span className="text-sm font-medium">sarah@company.com</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Department</span>
                <span className="text-sm font-medium">Design</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Active
                </span>
              </div>
            </div>

            <div className="flex space-x-2 mt-4 pt-4 border-t border-neutral-200">
              <Button size="sm" variant="outline" className="flex-1">
                <FontAwesomeIcon icon={faEdit} className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-red-600 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTrash} className="w-3 h-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        }
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="lg"
        showCloseButton
      >
        <Button onClick={() => setIsOpen(!isOpen)}>User Profile</Button>
      </Popover>
    );
  },
};
