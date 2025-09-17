import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../components/Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text', description: 'Tooltip content' },
    children: { control: 'text', description: 'Element to wrap with tooltip' },
  },
  parameters: {
    docs: {
      description: {
        component: 'A tooltip that appears on hover/focus. Uses Figtree font and design tokens.'
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'Tooltip text',
    children: <button className="bg-neutral-900 text-white px-4 py-2 rounded">Hover me</button>,
  },
}; 