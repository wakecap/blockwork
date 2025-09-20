import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Modal } from '../components/Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean', description: 'Whether the modal is open' },
    title: { control: 'text', description: 'Modal title' },
    description: { control: 'text', description: 'Modal description' },
    children: { control: 'text', description: 'Modal content' },
    onClose: { action: 'closed', description: 'Close callback' },
  },
  parameters: {
    docs: {
      description: {
        component: 'A modal dialog with overlay, shadow, and rounded corners. Uses Figtree font and design tokens.'
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    open: true,
    title: 'Modal Title',
    description: 'This is a modal description.',
    children: 'Modal content goes here.',
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button className="bg-primary-600 text-white px-4 py-2 rounded" onClick={() => setOpen(true)}>
          Open Modal
        </button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
  args: {
    title: 'Interactive Modal',
    description: 'Click the button to open the modal.',
    children: 'You can close this modal by clicking the X or the overlay.',
  },
}; 