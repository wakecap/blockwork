import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BottomSheet, ActionSheet, FormBottomSheet } from "./BottomSheet";
import { Button } from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faImage,
  faFile,
  faTrash,
  faEdit,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof BottomSheet> = {
  title: "Content Display/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A mobile-first bottom sheet component with drag-to-dismiss functionality and various variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "full", "half"],
    },
    showHandle: {
      control: { type: "boolean" },
    },
    showCloseButton: {
      control: { type: "boolean" },
    },
    closeOnOverlayClick: {
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
      <>
        <Button onClick={() => setIsOpen(true)}>Open Bottom Sheet</Button>

        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} title="Bottom Sheet">
          <div className="p-6">
            <p className="text-neutral-600 mb-4">
              This is a basic bottom sheet with some content. It can contain any React elements.
            </p>
            <div className="flex space-x-3">
              <Button onClick={() => setIsOpen(false)}>Close</Button>
              <Button variant="outline" onClick={() => alert("Action performed!")}>
                Action
              </Button>
            </div>
          </div>
        </BottomSheet>
      </>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [openVariant, setOpenVariant] = React.useState<string | null>(null);

    const variants = [
      { key: "default", title: "Default", height: "auto" },
      { key: "half", title: "Half Height", height: "50vh" },
      { key: "full", title: "Full Height", height: "100vh" },
    ];

    return (
      <>
        <div className="flex space-x-4">
          {variants.map((variant) => (
            <Button
              key={variant.key}
              onClick={() => setOpenVariant(openVariant === variant.key ? null : variant.key)}
            >
              {variant.title}
            </Button>
          ))}
        </div>

        {variants.map((variant) => (
          <BottomSheet
            key={variant.key}
            isOpen={openVariant === variant.key}
            onClose={() => setOpenVariant(null)}
            variant={variant.key as any}
            title={variant.title}
          >
            <div className="p-6">
              <p className="text-neutral-600 mb-4">
                This is a {variant.title.toLowerCase()} bottom sheet. Height: {variant.height}
              </p>
              <div className="space-y-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat.
                </p>
                {variant.key === "full" && (
                  <>
                    <p>
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                      eu fugiat nulla pariatur.
                    </p>
                    <p>
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                      deserunt mollit anim id est laborum.
                    </p>
                  </>
                )}
              </div>
              <div className="flex space-x-3 mt-6">
                <Button onClick={() => setOpenVariant(null)}>Close</Button>
                <Button variant="outline" onClick={() => alert("Action performed!")}>
                  Action
                </Button>
              </div>
            </div>
          </BottomSheet>
        ))}
      </>
    );
  },
};

export const WithHandle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>With Handle</Button>

        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Bottom Sheet with Handle"
          showHandle
        >
          <div className="p-6">
            <p className="text-neutral-600 mb-4">
              This bottom sheet has a drag handle at the top for better UX.
            </p>
            <div className="flex space-x-3">
              <Button onClick={() => setIsOpen(false)}>Close</Button>
              <Button variant="outline" onClick={() => alert("Action performed!")}>
                Action
              </Button>
            </div>
          </div>
        </BottomSheet>
      </>
    );
  },
};

export const WithCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>With Close Button</Button>

        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Bottom Sheet with Close Button"
          showCloseButton
        >
          <div className="p-6">
            <p className="text-neutral-600 mb-4">
              This bottom sheet has a close button in the header.
            </p>
            <div className="flex space-x-3">
              <Button onClick={() => setIsOpen(false)}>Close</Button>
              <Button variant="outline" onClick={() => alert("Action performed!")}>
                Action
              </Button>
            </div>
          </div>
        </BottomSheet>
      </>
    );
  },
};

export const ComplexContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Complex Content</Button>

        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Complex Content"
          variant="full"
          showHandle
          showCloseButton
        >
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">User Profile</h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-medium text-primary-600">SJ</span>
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900">Sarah Johnson</h4>
                  <p className="text-sm text-neutral-600">sarah.johnson@company.com</p>
                  <p className="text-sm text-neutral-600">Senior Designer</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900">Settings</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-neutral-900">Notifications</h4>
                    <p className="text-sm text-neutral-600">Manage your notification preferences</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-neutral-900">Dark Mode</h4>
                    <p className="text-sm text-neutral-600">Switch to dark theme</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-neutral-900">Two-Factor Auth</h4>
                    <p className="text-sm text-neutral-600">Add an extra layer of security</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-neutral-200">
              <Button variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  alert("Settings saved!");
                  setIsOpen(false);
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </BottomSheet>
      </>
    );
  },
};

// Pre-built Bottom Sheet Components
export const ActionSheetExample: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const actions = [
      {
        label: "Take Photo",
        icon: faCamera,
        onClick: () => {
          alert("Take photo action");
          setIsOpen(false);
        },
      },
      {
        label: "Choose from Library",
        icon: faImage,
        onClick: () => {
          alert("Choose from library action");
          setIsOpen(false);
        },
      },
      {
        label: "Upload File",
        icon: faFile,
        onClick: () => {
          alert("Upload file action");
          setIsOpen(false);
        },
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Show Action Sheet</Button>

        <ActionSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Choose an option"
          actions={actions}
        />
      </>
    );
  },
};

export const FormBottomSheetExample: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form</Button>

        <FormBottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Create New Project"
          submitText="Create Project"
          onSubmit={() => {
            alert("Project created!");
            setIsOpen(false);
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                placeholder="Enter project name"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
              <textarea
                placeholder="Enter project description"
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
              <select className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option>Web Development</option>
                <option>Mobile App</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
            </div>
          </div>
        </FormBottomSheet>
      </>
    );
  },
};

export const PhotoPickerExample: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const photoActions = [
      {
        label: "Camera",
        icon: faCamera,
        onClick: () => {
          alert("Opening camera...");
          setIsOpen(false);
        },
      },
      {
        label: "Photo Library",
        icon: faImage,
        onClick: () => {
          alert("Opening photo library...");
          setIsOpen(false);
        },
      },
      {
        label: "Browse Files",
        icon: faFile,
        onClick: () => {
          alert("Opening file browser...");
          setIsOpen(false);
        },
      },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Add Photo</Button>

        <ActionSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Add a photo"
          actions={photoActions}
        />
      </>
    );
  },
};
