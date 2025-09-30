import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundation/UX Writing Handbook',
  parameters: {
    docs: {
      description: {
        component: 'UX writing guidelines and best practices.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">UX Writing Handbook</h1>
      <p className="text-gray-600 mb-4">
        Guidelines for writing clear, consistent, and user-friendly copy across the design system.
      </p>
      
      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
        <p className="text-pink-800">
          <strong>Coming Soon:</strong> Comprehensive UX writing guidelines, tone of voice, and content standards.
        </p>
      </div>
    </div>
  ),
};
