import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  EmptyState,
  EmptySearchResults,
  EmptyFiles,
  EmptyUsers,
  EmptyError,
} from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "search", "files", "users", "error"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "No items found",
    description: "There are no items to display at the moment.",
    variant: "default",
    size: "md",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small</h3>
        <EmptyState
          title="Small Empty State"
          description="This is a small empty state component."
          size="sm"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Medium</h3>
        <EmptyState
          title="Medium Empty State"
          description="This is a medium empty state component."
          size="md"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Large</h3>
        <EmptyState
          title="Large Empty State"
          description="This is a large empty state component."
          size="lg"
        />
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default</h3>
        <EmptyState
          title="No items found"
          description="There are no items to display at the moment."
          variant="default"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Search</h3>
        <EmptyState
          title="No search results"
          description="Try adjusting your search terms to find what you're looking for."
          variant="search"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Files</h3>
        <EmptyState
          title="No files yet"
          description="Get started by uploading your first file."
          variant="files"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Users</h3>
        <EmptyState
          title="No team members"
          description="Start building your team by inviting the first member."
          variant="users"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Error</h3>
        <EmptyState
          title="Something went wrong"
          description="We encountered an error while loading this content."
          variant="error"
        />
      </div>
    </div>
  ),
};

export const WithAction: Story = {
  args: {
    title: "Get started",
    description: "Create your first item to get started.",
    variant: "default",
    action: (
      <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
        Create Item
      </button>
    ),
  },
};

export const WithCustomIcon: Story = {
  args: {
    title: "Custom Icon",
    description: "This empty state uses a custom icon.",
    variant: "default",
    icon: "🎯", // Using emoji as example
    action: (
      <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
        Get Started
      </button>
    ),
  },
};

export const EmptySearchResultsComponent: Story = {
  render: () => (
    <div className="space-y-4">
      <EmptySearchResults
        searchTerm="example"
        onClearSearch={() => console.log("Clear search clicked")}
      />
    </div>
  ),
};

export const EmptyFilesComponent: Story = {
  render: () => (
    <div className="space-y-4">
      <EmptyFiles onUpload={() => console.log("Upload clicked")} />
    </div>
  ),
};

export const EmptyUsersComponent: Story = {
  render: () => (
    <div className="space-y-4">
      <EmptyUsers onInvite={() => console.log("Invite clicked")} />
    </div>
  ),
};

export const EmptyErrorComponent: Story = {
  render: () => (
    <div className="space-y-4">
      <EmptyError onRetry={() => console.log("Retry clicked")} />
    </div>
  ),
};

export const ComplexAction: Story = {
  args: {
    title: "No data available",
    description: "You haven't created any content yet. Get started by creating your first item.",
    variant: "default",
    action: (
      <div className="flex flex-col sm:flex-row gap-2">
        <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          Create New Item
        </button>
        <button className="inline-flex items-center px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors">
          Import Data
        </button>
      </div>
    ),
  },
};

export const LongDescription: Story = {
  args: {
    title: "No notifications",
    description:
      "You're all caught up! When you receive notifications, they will appear here. You can customize your notification preferences in your account settings to control what types of notifications you receive and how often.",
    variant: "default",
    action: (
      <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
        Manage Notifications
      </button>
    ),
  },
};
