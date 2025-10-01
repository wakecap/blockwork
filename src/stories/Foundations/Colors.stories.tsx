import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundation/Colors",
  parameters: {
    docs: {
      description: {
        component: "Color palette and usage guidelines for the design system.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Colors</h1>
      <p className="text-gray-600 mb-4">
        Our color system provides a comprehensive palette for creating consistent and accessible
        interfaces.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-orange-600 h-20 rounded-lg flex items-center justify-center text-white font-semibold">
          Primary
        </div>
        <div className="bg-neutral-900 h-20 rounded-lg flex items-center justify-center text-white font-semibold">
          Secondary
        </div>
        <div className="bg-green-600 h-20 rounded-lg flex items-center justify-center text-white font-semibold">
          Success
        </div>
        <div className="bg-red-600 h-20 rounded-lg flex items-center justify-center text-white font-semibold">
          Error
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800">
          <strong>Coming Soon:</strong> Complete color documentation with hex codes, usage
          guidelines, and accessibility considerations.
        </p>
      </div>
    </div>
  ),
};
