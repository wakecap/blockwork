import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown, type DropdownOption, type DropdownGroup } from "./Dropdown";
import { Avatar } from "../Avatar/Avatar";

const options: DropdownOption[] = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Dropdown label" },
    options: { control: "object", description: "Dropdown options" },
    value: { control: "text", description: "Selected value" },
    disabled: { control: "boolean", description: "Disabled state" },
    onChange: { action: "changed", description: "Change callback" },
    variant: {
      control: "select",
      options: ["default", "menu", "search", "profile"],
      description: "Dropdown variant style",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `A versatile dropdown component with multiple variants:
        
- **default**: Custom-styled dropdown with limited height and scrolling (default variant)
- **menu**: Menu-style dropdown with icons and active states (like Settings dropdown in TopNavigator)
- **search**: Searchable dropdown with grouped options (like Project dropdown in TopNavigator)  
- **profile**: Avatar-style dropdown with profile header section (like Avatar dropdown in TopNavigator)

All variants use custom styling with consistent spacing, typography, and colors from the design system.`,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    label: "Dropdown label",
    options,
    value: "option1",
    disabled: false,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("option1");
    return <Dropdown {...args} value={value} onChange={(value) => setValue(value)} />;
  },
  args: {
    label: "Controlled dropdown",
    options,
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [value, setValue] = useState("option1");
    return (
      <div style={{ width: "200px" }}>
        <Dropdown {...args} value={value} onChange={(value) => setValue(value)} />
      </div>
    );
  },
  args: {
    label: "Select an option",
    options,
  },
};

export const ScrollableOptions: Story = {
  render: (args) => {
    const [value, setValue] = useState("00");
    const timeOptions = Array.from({ length: 24 }, (_, i) => ({
      label: String(i).padStart(2, "0"),
      value: String(i).padStart(2, "0"),
    }));
    return (
      <div style={{ width: "100px" }}>
        <Dropdown
          {...args}
          value={value}
          onChange={(value) => setValue(value)}
          options={timeOptions}
        />
      </div>
    );
  },
  args: {
    label: "Hour",
  },
};

export const MenuVariant: Story = {
  render: () => {
    const [value, setValue] = useState("dashboard");

    const menuOptions: DropdownOption[] = [
      { label: "Dashboard", value: "dashboard", icon: "fa-solid fa-home", isActive: value === "dashboard" },
      { label: "Projects", value: "projects", icon: "fa-solid fa-folder", isActive: value === "projects" },
      { label: "Team", value: "team", icon: "fa-solid fa-users", isActive: value === "team" },
      { label: "Settings", value: "settings", icon: "fa-solid fa-gear", isActive: value === "settings" },
      { label: "Help", value: "help", icon: "fa-solid fa-question-circle", isActive: value === "help" },
      { label: "Logout", value: "logout", icon: "fa-solid fa-sign-out-alt", isActive: value === "logout" },
    ];

    return (
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "20px" }}>
        <Dropdown
          variant="menu"
          value={value}
          onChange={setValue}
          options={menuOptions}
          triggerButton={
            <button
              style={{
                padding: "8px 16px",
                background: "#3B82F6",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <i className="fa-solid fa-gear" />
              Menu
              <i className="fa-solid fa-chevron-down" style={{ fontSize: "10px" }} />
            </button>
          }
        />
      </div>
    );
  },
};

export const SearchVariant: Story = {
  render: () => {
    const [value, setValue] = useState("project-alpha");

    const projectGroups: DropdownGroup[] = [
      {
        groupLabel: "WakeCap",
        options: [
          { label: "WakeCap Dashboard", value: "wakecap-dashboard" },
          { label: "WakeCap Mobile", value: "wakecap-mobile" },
          { label: "WakeCap API", value: "wakecap-api" },
        ],
      },
      {
        groupLabel: "BlockWork",
        options: [
          { label: "BlockWork Frontend", value: "blockwork-frontend" },
          { label: "BlockWork Backend", value: "blockwork-backend" },
          { label: "BlockWork Infrastructure", value: "blockwork-infra" },
        ],
      },
      {
        groupLabel: "Internal Tools",
        options: [
          { label: "Design System", value: "design-system" },
          { label: "Component Library", value: "component-library" },
          { label: "CI/CD Pipeline", value: "cicd-pipeline" },
        ],
      },
    ];

    return (
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "20px" }}>
        <Dropdown
          variant="search"
          value={value}
          onChange={setValue}
          groups={projectGroups}
          searchPlaceholder="Search projects..."
          emptyStateTitle="No projects found"
          emptyStateDescription="Try adjusting your search terms."
          triggerButton={
            <button
              style={{
                padding: "8px 16px",
                background: "white",
                color: "#374151",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <i className="fa-solid fa-folder" />
              Projects
              <i className="fa-solid fa-chevron-down" style={{ fontSize: "10px" }} />
            </button>
          }
        />
      </div>
    );
  },
};

export const ProfileVariant: Story = {
  render: () => {
    const [value, setValue] = useState("");

    const profileOptions: DropdownOption[] = [
      {
        label: "My Profile",
        value: "profile",
        icon: "fa-solid fa-user",
        onClick: () => console.log("Navigate to profile"),
      },
      {
        label: "Settings",
        value: "settings",
        icon: "fa-solid fa-gear",
        onClick: () => console.log("Navigate to settings"),
      },
      {
        label: "Help & Support",
        value: "help",
        icon: "fa-solid fa-question-circle",
        onClick: () => console.log("Navigate to help"),
      },
      {
        label: "Logout",
        value: "logout",
        icon: "fa-solid fa-sign-out-alt",
        onClick: () => console.log("Logout clicked"),
      },
    ];

    return (
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "20px" }}>
        <Dropdown
          variant="profile"
          value={value}
          onChange={setValue}
          options={profileOptions}
          profileData={{
            name: "Sarah Johnson",
            email: "sarah.johnson@wakecap.com",
            avatar: <Avatar size="md" name="Sarah Johnson" variant="text" />,
          }}
          triggerButton={
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px",
                background: "transparent",
                border: "1px solid #e5e7eb",
                borderRadius: "100px",
                cursor: "pointer",
              }}
            >
              <Avatar size="sm" name="Sarah Johnson" variant="text" />
              <i className="fa-solid fa-chevron-down" style={{ fontSize: "10px", marginRight: "4px" }} />
            </button>
          }
        />
      </div>
    );
  },
};
