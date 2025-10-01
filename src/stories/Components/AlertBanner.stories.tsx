import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Components/AlertBanner",
  parameters: {
    docs: {
      description: {
        component: "AlertBanner component for displaying important messages.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AlertBanner</h1>
      <p className="text-gray-600 mb-4">
        AlertBanner component for displaying important messages and notifications.
      </p>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          <strong>Coming Soon:</strong> AlertBanner component implementation.
        </p>
      </div>
    </div>
  ),
};
