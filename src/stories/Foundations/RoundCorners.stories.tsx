import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Foundation/Round Corners",
  parameters: {
    docs: {
      description: {
        component: "Border radius and corner rounding guidelines.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 font-heading">Round Corners</h1>
      <p className="text-gray-600 mb-4">
        Consistent border radius values for creating cohesive visual hierarchy.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-100 h-16 rounded-sm flex items-center justify-center text-sm">
          rounded-sm
        </div>
        <div className="bg-gray-100 h-16 rounded-md flex items-center justify-center text-sm">
          rounded-md
        </div>
        <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center text-sm">
          rounded-lg
        </div>
        <div className="bg-gray-100 h-16 rounded-xl flex items-center justify-center text-sm">
          rounded-xl
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-green-800">
          <strong>Current:</strong> Using rounded-sm as the default border radius across components.
        </p>
      </div>
    </div>
  ),
};
