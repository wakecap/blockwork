import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Foundation/Typography",
  parameters: {
    docs: {
      description: {
        component: "Typography system and font guidelines.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Typography</h1>
      <p className="text-gray-600 mb-4">
        Typography system for consistent text styling across the design system.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold">Heading 1</h1>
          <p className="text-sm text-gray-500">text-4xl font-bold</p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold">Heading 2</h2>
          <p className="text-sm text-gray-500">text-3xl font-semibold</p>
        </div>
        <div>
          <h3 className="text-2xl font-medium">Heading 3</h3>
          <p className="text-sm text-gray-500">text-2xl font-medium</p>
        </div>
        <div>
          <p className="text-base">Body text</p>
          <p className="text-sm text-gray-500">text-base</p>
        </div>
        <div>
          <p className="text-sm">Small text</p>
          <p className="text-sm text-gray-500">text-sm</p>
        </div>
      </div>

      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
        <p className="text-teal-800">
          <strong>Current:</strong> Using Figtree and Inter fonts with Tailwind typography classes.
        </p>
      </div>
    </div>
  ),
};
