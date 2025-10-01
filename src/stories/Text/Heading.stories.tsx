import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Text/Heading",
  parameters: {
    docs: {
      description: {
        component: "Heading component for displaying titles and headings.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Heading</h1>
      <p className="text-gray-600 mb-4">Heading component for consistent title display.</p>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <p className="text-orange-800">
          <strong>Coming Soon:</strong> Heading component implementation.
        </p>
      </div>
    </div>
  ),
};
