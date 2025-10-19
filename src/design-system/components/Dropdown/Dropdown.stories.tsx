import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown, type DropdownOption, type DropdownGroup } from "./Dropdown";
import { Avatar } from "../Avatar/Avatar";
import { Heading, Text, List } from "../../foundations/Typography";

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
      options: ["default", "search", "profile", "searchable", "multiselect"],
      description: "Dropdown variant style",
    },
  },
  parameters: {
    docs: {
      description: {
        component: "A versatile dropdown component with multiple variants for different use cases. See the overview story below for detailed information about each variant.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Overview: Story = {
  render: () => {
    const [defaultValue, setDefaultValue] = useState("option2");
    const [searchableValue, setSearchableValue] = useState("");
    const [multiselectValues, setMultiselectValues] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState("wakecap-mobile");
    const [profileValue, setProfileValue] = useState("");

    const timeOptions = Array.from({ length: 24 }, (_, i) => ({
      label: String(i).padStart(2, "0"),
      value: String(i).padStart(2, "0"),
    }));

    const countryOptions: DropdownOption[] = [
      { label: "United States", value: "us" },
      { label: "United Kingdom", value: "uk" },
      { label: "Canada", value: "ca" },
      { label: "Australia", value: "au" },
      { label: "Germany", value: "de" },
      { label: "France", value: "fr" },
      { label: "Italy", value: "it" },
      { label: "Spain", value: "es" },
      { label: "Japan", value: "jp" },
      { label: "China", value: "cn" },
    ];

    const categoryOptions: DropdownOption[] = [
      { label: "Design", value: "design" },
      { label: "Development", value: "development" },
      { label: "Marketing", value: "marketing" },
      { label: "Sales", value: "sales" },
      { label: "Support", value: "support" },
      { label: "HR", value: "hr" },
    ];

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
    ];

    const profileOptions: DropdownOption[] = [
      {
        label: "My Profile",
        value: "profile",
        icon: "fa-solid fa-user",
      },
      {
        label: "Settings",
        value: "settings",
        icon: "fa-solid fa-gear",
      },
      {
        label: "Help & Support",
        value: "help",
        icon: "fa-solid fa-question-circle",
      },
      {
        label: "Logout",
        value: "logout",
        icon: "fa-solid fa-sign-out-alt",
      },
    ];

    return (
      <div className="p-8 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Heading level="h1" className="mb-4">Dropdown</Heading>
            <Text className="max-w-4xl">
              A versatile dropdown component with multiple variants designed for different use cases. 
              The dropdown component provides a consistent interaction pattern across the application, 
              with variants optimized for selection, search, multi-selection, and navigation. All variants 
              use custom styling with consistent spacing, typography, and colors from the design system.
            </Text>
          </div>

          {/* Default Variant */}
          <section className="mb-12 border border-gray-200 rounded-lg p-8">
            <Heading level="h3" className="mb-6">Default Variant</Heading>
            <Text color="secondary" size="sm" className="mb-6">
              Custom-styled dropdown with limited height and scrolling. Best for simple selection from a list of options.
            </Text>
            <div className="space-y-4">
              <div>
                <Text weight="semibold" className="mb-2">Basic Usage</Text>
                <div style={{ width: "200px" }}>
                  <Dropdown
                    label="Select Option"
                    options={options}
                    value={defaultValue}
                    onChange={setDefaultValue}
                  />
                </div>
              </div>
              <div>
                <Text weight="semibold" className="mb-2">Scrollable Options (Hour Selection)</Text>
                <div style={{ width: "120px" }}>
                  <Dropdown
                    label="Hour"
                    options={timeOptions}
                    value="12"
                    onChange={() => {}}
                  />
                </div>
              </div>
              <div className="bg-bw-bg-secondary p-4 rounded mt-4">
                <Text size="sm" color="secondary">
                  <Text as="span" weight="bold">When to use:</Text> When you need a simple dropdown with limited options, 
                  or when options can be scrollable (like time picker, number selection).
                </Text>
              </div>
            </div>
          </section>

          {/* Searchable Variant */}
          <section className="mb-12 border border-gray-200 rounded-lg p-8">
            <Heading level="h3" className="mb-6">Searchable Variant</Heading>
            <Text color="secondary" size="sm" className="mb-6">
              Simple searchable dropdown with search input and filtering. Perfect for long lists where users need to find specific items.
            </Text>
            <div className="space-y-4">
              <div>
                <Text weight="semibold" className="mb-2">Country Selection</Text>
                <div style={{ width: "300px" }}>
                  <Dropdown
                    variant="searchable"
                    label="Country"
                    value={searchableValue}
                    onChange={setSearchableValue}
                    options={countryOptions}
                    placeholder="Select a country..."
                    searchPlaceholder="Search countries..."
                  />
                </div>
              </div>
              <div className="bg-bw-bg-secondary p-4 rounded mt-4">
                <Text size="sm" color="secondary">
                  <Text as="span" weight="bold">When to use:</Text> For long lists of options where users might need to search 
                  (countries, cities, products, etc.). The search is case-insensitive and filters options in real-time.
                </Text>
              </div>
            </div>
          </section>

          {/* Multiselect Variant */}
          <section className="mb-12 border border-gray-200 rounded-lg p-8">
            <Heading level="h3" className="mb-6">Multiselect Variant</Heading>
            <Text color="secondary" size="sm" className="mb-6">
              Multi-select dropdown using the Checkbox component with "Select All" functionality. Allows users to select multiple options at once.
            </Text>
            <div className="space-y-4">
              <div>
                <Text weight="semibold" className="mb-2">Category Selection</Text>
                <div style={{ width: "300px" }}>
                  <Dropdown
                    variant="multiselect"
                    label="Categories"
                    value=""
                    onChange={() => {}}
                    options={categoryOptions}
                    selectedValues={multiselectValues}
                    onMultiChange={setMultiselectValues}
                    placeholder="Select categories..."
                    searchPlaceholder="Search categories..."
                    showSelectAll={true}
                  />
                </div>
                {multiselectValues.length > 0 && (
                  <div style={{ marginTop: "16px", padding: "12px", background: "#f3f4f6", borderRadius: "6px" }}>
                    <Text size="sm" weight="semibold" color="secondary" className="mb-2">
                      Selected: {multiselectValues.length} {multiselectValues.length === 1 ? 'item' : 'items'}
                    </Text>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {multiselectValues.map((val) => {
                        const option = categoryOptions.find((opt) => opt.value === val);
                        return (
                          <span
                            key={val}
                            style={{
                              display: "inline-flex",
                              padding: "4px 8px",
                              background: "#3B82F6",
                              color: "white",
                              borderRadius: "4px",
                              fontSize: "12px",
                            }}
                          >
                            {option?.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-bw-bg-secondary p-4 rounded mt-4">
                <Text size="sm" color="secondary">
                  <Text as="span" weight="bold">When to use:</Text> When users need to select multiple options from a list 
                  (tags, categories, filters). Includes "Select All" functionality for convenience.
                </Text>
              </div>
            </div>
          </section>

          {/* Search Variant with Groups */}
          <section className="mb-12 border border-gray-200 rounded-lg p-8">
            <Heading level="h3" className="mb-6">Search Variant (Grouped Options)</Heading>
            <Text color="secondary" size="sm" className="mb-6">
              Searchable dropdown with grouped options. Used in TopNavigator for project selection with organized grouping.
            </Text>
            <div className="space-y-4">
              <div>
                <Text weight="semibold" className="mb-2">Project Selection</Text>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <Dropdown
                    variant="search"
                    value={searchValue}
                    onChange={setSearchValue}
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
              </div>
              <div className="bg-bw-bg-secondary p-4 rounded mt-4">
                <Text size="sm" color="secondary">
                  <Text as="span" weight="bold">When to use:</Text> For complex navigation with grouped options 
                  (projects by organization, files by folder, etc.). Provides clear visual grouping with search capability.
                </Text>
              </div>
            </div>
          </section>

          {/* Profile Variant */}
          <section className="mb-12 border border-gray-200 rounded-lg p-8">
            <Heading level="h3" className="mb-6">Profile Variant</Heading>
            <Text color="secondary" size="sm" className="mb-6">
              Avatar-style dropdown with profile header section. Perfect for user menus and profile-related actions.
            </Text>
            <div className="space-y-4">
              <div>
                <Text weight="semibold" className="mb-2">User Menu</Text>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <Dropdown
                    variant="profile"
                    value={profileValue}
                    onChange={setProfileValue}
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
              </div>
              <div className="bg-bw-bg-secondary p-4 rounded mt-4">
                <Text size="sm" color="secondary">
                  <Text as="span" weight="bold">When to use:</Text> For user profile menus in navigation bars. 
                  Displays user information prominently with action options below.
                </Text>
              </div>
            </div>
          </section>

          {/* Usage Guidelines */}
          <section className="mb-12 border border-gray-200 rounded-lg p-8">
            <Heading level="h3" className="mb-6">Variant Selection Guide</Heading>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-bw-bg-primary p-4 border border-bw-border-ui rounded">
                  <Text weight="bold" className="mb-2">Default</Text>
                  <List variant="unordered" size="sm" items={[
                    "Short lists (under 10 items)",
                    "Time/number pickers",
                    "Simple selections",
                  ]} />
                </div>

                <div className="bg-bw-bg-primary p-4 border border-bw-border-ui rounded">
                  <Text weight="bold" className="mb-2">Searchable</Text>
                  <List variant="unordered" size="sm" items={[
                    "Long lists (10+ items)",
                    "Countries, cities, products",
                    "When users know what they're looking for",
                  ]} />
                </div>

                <div className="bg-bw-bg-primary p-4 border border-bw-border-ui rounded">
                  <Text weight="bold" className="mb-2">Multiselect</Text>
                  <List variant="unordered" size="sm" items={[
                    "Multiple selections needed",
                    "Tags, categories, filters",
                    "When 'Select All' is useful",
                  ]} />
                </div>

                <div className="bg-bw-bg-primary p-4 border border-bw-border-ui rounded">
                  <Text weight="bold" className="mb-2">Search (Grouped)</Text>
                  <List variant="unordered" size="sm" items={[
                    "Complex navigation",
                    "Items organized by category",
                    "Project/folder structures",
                  ]} />
                </div>

                <div className="bg-bw-bg-primary p-4 border border-bw-border-ui rounded">
                  <Text weight="bold" className="mb-2">Profile</Text>
                  <List variant="unordered" size="sm" items={[
                    "User profile menus",
                    "Account-related actions",
                    "Top navigation bars",
                  ]} />
                </div>
              </div>
            </div>
          </section>

          {/* Design Principles */}
          <section className="mb-12 border border-gray-200 rounded-lg p-8">
            <Heading level="h3" className="mb-6">Design Principles</Heading>
            <div className="space-y-4">
              <div>
                <Text weight="bold" className="mb-2">Consistent Styling</Text>
                <Text color="secondary" size="sm">
                  All variants use the same spacing, typography, and color tokens from the design system to ensure visual consistency.
                </Text>
              </div>
              <div>
                <Text weight="bold" className="mb-2">Keyboard Accessible</Text>
                <Text color="secondary" size="sm">
                  Full keyboard navigation support with arrow keys, Enter to select, and Escape to close.
                </Text>
              </div>
              <div>
                <Text weight="bold" className="mb-2">Mobile Responsive</Text>
                <Text color="secondary" size="sm">
                  Dropdowns adapt to mobile screens with appropriate sizing and touch-friendly interactions.
                </Text>
              </div>
              <div>
                <Text weight="bold" className="mb-2">Clear Feedback</Text>
                <Text color="secondary" size="sm">
                  Hover states, focus indicators, and selection feedback provide clear visual cues for all interactions.
                </Text>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Comprehensive overview of all dropdown variants with live examples, use cases, and selection guidelines.",
      },
    },
  },
};

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
      <div style={{ display: "flex", justifyContent: "flex-start", padding: "20px" }}>
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
      <div style={{ display: "flex", justifyContent: "flex-start", padding: "20px" }}>
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

export const SearchableVariant: Story = {
  render: () => {
    const [value, setValue] = useState("");

    const countryOptions: DropdownOption[] = [
      { label: "United States", value: "us" },
      { label: "United Kingdom", value: "uk" },
      { label: "Canada", value: "ca" },
      { label: "Australia", value: "au" },
      { label: "Germany", value: "de" },
      { label: "France", value: "fr" },
      { label: "Italy", value: "it" },
      { label: "Spain", value: "es" },
      { label: "Japan", value: "jp" },
      { label: "China", value: "cn" },
      { label: "India", value: "in" },
      { label: "Brazil", value: "br" },
      { label: "Mexico", value: "mx" },
      { label: "Netherlands", value: "nl" },
      { label: "Sweden", value: "se" },
      { label: "Norway", value: "no" },
      { label: "Denmark", value: "dk" },
      { label: "Finland", value: "fi" },
      { label: "Poland", value: "pl" },
      { label: "Turkey", value: "tr" },
    ];

    return (
      <div style={{ width: "300px", padding: "20px" }}>
        <Dropdown
          variant="searchable"
          label="Country"
          value={value}
          onChange={setValue}
          options={countryOptions}
          placeholder="Select a country..."
          searchPlaceholder="Search countries..."
        />
      </div>
    );
  },
};

export const MultiSelectVariant: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const categoryOptions: DropdownOption[] = [
      { label: "Design", value: "design" },
      { label: "Development", value: "development" },
      { label: "Marketing", value: "marketing" },
      { label: "Sales", value: "sales" },
      { label: "Support", value: "support" },
      { label: "HR", value: "hr" },
      { label: "Finance", value: "finance" },
      { label: "Operations", value: "operations" },
      { label: "Legal", value: "legal" },
      { label: "Product", value: "product" },
    ];

    return (
      <div style={{ width: "300px", padding: "20px" }}>
        <Dropdown
          variant="multiselect"
          label="Categories"
          value=""
          onChange={() => {}}
          options={categoryOptions}
          selectedValues={selectedValues}
          onMultiChange={setSelectedValues}
          placeholder="Select categories..."
          searchPlaceholder="Search categories..."
          showSelectAll={true}
        />
        
        {selectedValues.length > 0 && (
          <div style={{ marginTop: "16px", padding: "12px", background: "#f3f4f6", borderRadius: "6px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", marginBottom: "8px" }}>
              Selected: {selectedValues.length} {selectedValues.length === 1 ? 'item' : 'items'}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {selectedValues.map((val) => {
                const option = categoryOptions.find((opt) => opt.value === val);
                return (
                  <span
                    key={val}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 8px",
                      background: "#3B82F6",
                      color: "white",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    {option?.label}
                    <button
                      onClick={() => setSelectedValues(selectedValues.filter((v) => v !== val))}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "white",
                        cursor: "pointer",
                        padding: "0",
                        fontSize: "10px",
                      }}
                    >
                      <i className="fa-solid fa-times" />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const MultiSelectWithoutSelectAll: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const tagOptions: DropdownOption[] = [
      { label: "Bug", value: "bug" },
      { label: "Feature", value: "feature" },
      { label: "Enhancement", value: "enhancement" },
      { label: "Documentation", value: "documentation" },
      { label: "Question", value: "question" },
      { label: "Duplicate", value: "duplicate" },
      { label: "Invalid", value: "invalid" },
      { label: "Wontfix", value: "wontfix" },
    ];

    return (
      <div style={{ width: "300px", padding: "20px" }}>
        <Dropdown
          variant="multiselect"
          label="Tags"
          value=""
          onChange={() => {}}
          options={tagOptions}
          selectedValues={selectedValues}
          onMultiChange={setSelectedValues}
          placeholder="Select tags..."
          searchPlaceholder="Search tags..."
          showSelectAll={false}
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div style={{ width: "300px", padding: "20px" }}>
        <Dropdown
          label="Required field"
          value={value}
          onChange={setValue}
          options={options}
          error="This field is required"
        />
      </div>
    );
  },
};

export const SearchableWithError: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const countryOptions: DropdownOption[] = [
      { label: "United States", value: "us" },
      { label: "United Kingdom", value: "uk" },
      { label: "Canada", value: "ca" },
      { label: "Australia", value: "au" },
      { label: "Germany", value: "de" },
      { label: "France", value: "fr" },
      { label: "Japan", value: "jp" },
      { label: "China", value: "cn" },
      { label: "India", value: "in" },
    ];

    return (
      <div style={{ width: "300px", padding: "20px" }}>
        <Dropdown
          variant="searchable"
          label="Country"
          value={value}
          onChange={setValue}
          options={countryOptions}
          placeholder="Select a country..."
          searchPlaceholder="Search countries..."
          error="Please select a country"
        />
      </div>
    );
  },
};

export const MultiSelectWithError: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const categoryOptions: DropdownOption[] = [
      { label: "Electronics", value: "electronics" },
      { label: "Clothing", value: "clothing" },
      { label: "Books", value: "books" },
      { label: "Home & Garden", value: "home_garden" },
      { label: "Sports", value: "sports" },
      { label: "Toys", value: "toys" },
      { label: "Food & Beverages", value: "food_beverages" },
      { label: "Health & Beauty", value: "health_beauty" },
    ];

    return (
      <div style={{ width: "300px", padding: "20px" }}>
        <Dropdown
          variant="multiselect"
          label="Categories"
          value=""
          onChange={() => {}}
          options={categoryOptions}
          selectedValues={selectedValues}
          onMultiChange={setSelectedValues}
          placeholder="Select categories..."
          searchPlaceholder="Search categories..."
          showSelectAll={true}
          error={selectedValues.length === 0 ? "Please select at least one category" : undefined}
        />
      </div>
    );
  },
};
