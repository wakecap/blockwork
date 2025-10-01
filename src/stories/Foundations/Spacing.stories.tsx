import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Foundation/Spacing",
  parameters: {
    docs: {
      description: {
        component: "Spacing and layout guidelines for the design system.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Spacing</h1>
      <p className="text-gray-600 mb-4">Consistent spacing system for creating balanced layouts.</p>

      <div className="space-y-4 mb-6">
        <div className="bg-blue-100 h-4 rounded" style={{ width: "4px" }}></div>
        <div className="bg-blue-100 h-4 rounded" style={{ width: "8px" }}></div>
        <div className="bg-blue-100 h-4 rounded" style={{ width: "12px" }}></div>
        <div className="bg-blue-100 h-4 rounded" style={{ width: "16px" }}></div>
        <div className="bg-blue-100 h-4 rounded" style={{ width: "24px" }}></div>
        <div className="bg-blue-100 h-4 rounded" style={{ width: "32px" }}></div>
      </div>

      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
        <p className="text-cyan-800">
          <strong>Coming Soon:</strong> Complete spacing documentation with usage guidelines.
        </p>
      </div>
    </div>
  ),
};
