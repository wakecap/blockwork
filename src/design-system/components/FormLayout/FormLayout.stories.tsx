import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormLayout, UserProfileForm, SettingsForm } from "./FormLayout";

const meta: Meta<typeof FormLayout> = {
  title: "Forms and Data Entry/FormLayout",
  component: FormLayout,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A form layout component for organizing form fields into groups and sections with collapsible functionality.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "compact", "spacious"],
    },
    layout: {
      control: { type: "select" },
      options: ["vertical", "horizontal", "two-column"],
    },
    showSectionNumbers: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const groups = [
      {
        id: "personal",
        title: "Personal Information",
        description: "Basic information about yourself",
        variant: "card" as const,
        sections: [
          {
            id: "basic",
            title: "Basic Details",
            fields: [
              {
                id: "firstName",
                label: "First Name",
                required: true,
                children: (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ),
              },
              {
                id: "lastName",
                label: "Last Name",
                required: true,
                children: (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ),
              },
              {
                id: "email",
                label: "Email Address",
                required: true,
                children: (
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ),
              },
            ],
          },
          {
            id: "contact",
            title: "Contact Information",
            collapsible: true,
            fields: [
              {
                id: "phone",
                label: "Phone Number",
                children: (
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ),
              },
              {
                id: "address",
                label: "Address",
                children: (
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ),
              },
            ],
          },
        ],
      },
    ];

    return <FormLayout groups={groups} className="w-full max-w-2xl" />;
  },
};

export const Compact: Story = {
  render: () => {
    const groups = [
      {
        id: "settings",
        title: "Application Settings",
        description: "Configure your application preferences",
        variant: "bordered" as const,
        sections: [
          {
            id: "notifications",
            title: "Notification Preferences",
            fields: [
              {
                id: "emailNotifications",
                label: "Email Notifications",
                children: (
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                ),
              },
              {
                id: "pushNotifications",
                label: "Push Notifications",
                children: (
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                ),
              },
            ],
          },
        ],
      },
    ];

    return <FormLayout groups={groups} variant="compact" className="w-full max-w-2xl" />;
  },
};

export const Spacious: Story = {
  render: () => {
    const groups = [
      {
        id: "profile",
        title: "Profile Information",
        description: "Tell us about yourself",
        variant: "card" as const,
        sections: [
          {
            id: "basic",
            title: "Basic Information",
            fields: [
              {
                id: "name",
                label: "Full Name",
                required: true,
                children: (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ),
              },
              {
                id: "bio",
                label: "Biography",
                helpText: "Tell us a bit about yourself",
                children: (
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ),
              },
            ],
          },
        ],
      },
    ];

    return <FormLayout groups={groups} variant="spacious" className="w-full max-w-2xl" />;
  },
};

export const TwoColumn: Story = {
  render: () => {
    const groups = [
      {
        id: "account",
        title: "Account Settings",
        description: "Manage your account preferences",
        variant: "card" as const,
        sections: [
          {
            id: "security",
            title: "Security Settings",
            fields: [
              {
                id: "twoFactor",
                label: "Two-Factor Authentication",
                children: (
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                ),
              },
              {
                id: "password",
                label: "Change Password",
                children: (
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ),
              },
            ],
          },
          {
            id: "privacy",
            title: "Privacy Settings",
            collapsible: true,
            fields: [
              {
                id: "profileVisibility",
                label: "Profile Visibility",
                children: (
                  <select className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>Public</option>
                    <option>Private</option>
                    <option>Friends Only</option>
                  </select>
                ),
              },
            ],
          },
        ],
      },
    ];

    return <FormLayout groups={groups} layout="two-column" className="w-full max-w-4xl" />;
  },
};

export const WithSectionNumbers: Story = {
  render: () => {
    const groups = [
      {
        id: "registration",
        title: "Registration Form",
        description: "Complete your registration",
        variant: "card" as const,
        sections: [
          {
            id: "step1",
            title: "Step 1: Personal Information",
            fields: [
              {
                id: "firstName",
                label: "First Name",
                required: true,
                children: (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ),
              },
              {
                id: "lastName",
                label: "Last Name",
                required: true,
                children: (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ),
              },
            ],
          },
          {
            id: "step2",
            title: "Step 2: Contact Information",
            collapsible: true,
            fields: [
              {
                id: "email",
                label: "Email Address",
                required: true,
                children: (
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ),
              },
              {
                id: "phone",
                label: "Phone Number",
                children: (
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ),
              },
            ],
          },
        ],
      },
    ];

    return <FormLayout groups={groups} showSectionNumbers={true} className="w-full max-w-2xl" />;
  },
};

export const UserProfileFormExample: Story = {
  render: () => {
    const handleSubmit = (data: any) => {
      console.log("Form submitted:", data);
    };

    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">User Profile Form</h2>
        <UserProfileForm onSubmit={handleSubmit} />
      </div>
    );
  },
};

export const SettingsFormExample: Story = {
  render: () => {
    const handleSubmit = (data: any) => {
      console.log("Settings submitted:", data);
    };

    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Settings Form</h2>
        <SettingsForm onSubmit={handleSubmit} />
      </div>
    );
  },
};

export const MultiGroupForm: Story = {
  render: () => {
    const groups = [
      {
        id: "personal",
        title: "Personal Information",
        description: "Basic information about yourself",
        variant: "card" as const,
        sections: [
          {
            id: "basic",
            title: "Basic Details",
            fields: [
              {
                id: "firstName",
                label: "First Name",
                required: true,
                children: (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ),
              },
              {
                id: "lastName",
                label: "Last Name",
                required: true,
                children: (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ),
              },
            ],
          },
        ],
      },
      {
        id: "professional",
        title: "Professional Information",
        description: "Information about your work",
        variant: "bordered" as const,
        sections: [
          {
            id: "work",
            title: "Work Details",
            fields: [
              {
                id: "company",
                label: "Company",
                children: (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ),
              },
              {
                id: "position",
                label: "Position",
                children: (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                ),
              },
            ],
          },
        ],
      },
      {
        id: "preferences",
        title: "Preferences",
        description: "Your personal preferences",
        variant: "default" as const,
        sections: [
          {
            id: "notifications",
            title: "Notification Preferences",
            collapsible: true,
            fields: [
              {
                id: "email",
                label: "Email Notifications",
                children: (
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                ),
              },
              {
                id: "sms",
                label: "SMS Notifications",
                children: (
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                ),
              },
            ],
          },
        ],
      },
    ];

    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Multi-Group Form</h2>
        <FormLayout groups={groups} variant="spacious" className="w-full" />
      </div>
    );
  },
};

export const FormWithValidation: Story = {
  render: () => {
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const groups = [
      {
        id: "validation",
        title: "Form with Validation",
        description: "This form demonstrates error handling",
        variant: "card" as const,
        sections: [
          {
            id: "fields",
            title: "Form Fields",
            fields: [
              {
                id: "email",
                label: "Email Address",
                required: true,
                error: errors.email,
                children: (
                  <input
                    type="email"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.email ? "border-red-300" : "border-neutral-300"
                    }`}
                    onChange={(e) => {
                      if (e.target.value && !e.target.value.includes("@")) {
                        setErrors((prev) => ({
                          ...prev,
                          email: "Please enter a valid email address",
                        }));
                      } else {
                        setErrors((prev) => ({ ...prev, email: "" }));
                      }
                    }}
                  />
                ),
              },
              {
                id: "password",
                label: "Password",
                required: true,
                error: errors.password,
                children: (
                  <input
                    type="password"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      errors.password ? "border-red-300" : "border-neutral-300"
                    }`}
                    onChange={(e) => {
                      if (e.target.value && e.target.value.length < 8) {
                        setErrors((prev) => ({
                          ...prev,
                          password: "Password must be at least 8 characters",
                        }));
                      } else {
                        setErrors((prev) => ({ ...prev, password: "" }));
                      }
                    }}
                  />
                ),
              },
            ],
          },
        ],
      },
    ];

    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Form with Validation</h2>
        <FormLayout groups={groups} className="w-full" />
      </div>
    );
  },
};
