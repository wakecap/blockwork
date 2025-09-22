import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const TestComponent = () => (
  <div style={{ padding: '20px', background: '#f0f0f0', borderRadius: '8px' }}>
    <h1>Hello Storybook 9.x!</h1>
    <p>This is a test component to verify Storybook is working.</p>
  </div>
);

const meta: Meta<typeof TestComponent> = {
  title: 'Test/Component',
  component: TestComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};