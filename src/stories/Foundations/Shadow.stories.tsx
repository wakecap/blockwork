import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Foundation/Shadow",
  parameters: {
    docs: {
      description: {
        component: "Shadow and elevation guidelines for the design system.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 font-heading">Shadow</h1>
      <p className="text-gray-600 mb-4">Shadow system for creating depth and visual hierarchy.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white h-20 rounded-lg shadow-sm flex items-center justify-center text-sm">
          shadow-sm
        </div>
        <div className="bg-white h-20 rounded-lg shadow-md flex items-center justify-center text-sm">
          shadow-md
        </div>
        <div className="bg-white h-20 rounded-lg shadow-lg flex items-center justify-center text-sm">
          shadow-lg
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <p className="text-indigo-800">
          <strong>Coming Soon:</strong> Complete shadow documentation with elevation guidelines.
        </p>
      </div>
    </div>
  ),
};
