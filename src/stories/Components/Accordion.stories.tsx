import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Components/Accordion",
  parameters: {
    docs: {
      description: {
        component: "Accordion component for collapsible content sections.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Accordion</h1>
      <p className="text-gray-600 mb-4">
        Accordion component for organizing and displaying collapsible content.
      </p>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">
          <strong>Coming Soon:</strong> Accordion component implementation.
        </p>
      </div>
    </div>
  ),
};
