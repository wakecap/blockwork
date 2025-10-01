import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundation/Motion",
  parameters: {
    docs: {
      description: {
        component: "Motion and animation guidelines for the design system.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Motion</h1>
      <p className="text-gray-600 mb-4">
        Motion principles and animation guidelines for creating smooth, purposeful user experiences.
      </p>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <p className="text-purple-800">
          <strong>Coming Soon:</strong> Animation examples, timing guidelines, and motion principles
          will be documented here.
        </p>
      </div>
    </div>
  ),
};
