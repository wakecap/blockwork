import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const SimpleButton = ({ children, ...props }: any) => (
  <button 
    style={{ 
      padding: '10px 20px', 
      backgroundColor: '#ea580c', 
      color: 'white', 
      border: 'none', 
      borderRadius: '8px',
      cursor: 'pointer'
    }} 
    {...props}
  >
    {children}
  </button>
);

const meta: Meta<typeof SimpleButton> = {
  title: 'Test/SimpleButton',
  component: SimpleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Click me!',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
  },
};
