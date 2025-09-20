import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from '../components/Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Slider label' },
    min: { control: 'number', description: 'Minimum value' },
    max: { control: 'number', description: 'Maximum value' },
    step: { control: 'number', description: 'Step value' },
    value: { control: 'number', description: 'Current value' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    onChange: { action: 'changed', description: 'Change callback' },
  },
  parameters: {
    docs: {
      description: {
        component: 'A slider input using Figtree font and design tokens.'
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    label: 'Slider label',
    min: 0,
    max: 100,
    step: 1,
    value: 50,
    disabled: false,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState(50);
    return <Slider {...args} value={value} onChange={e => setValue(Number(e.target.value))} />;
  },
  args: {
    label: 'Controlled slider',
    min: 0,
    max: 100,
    step: 1,
  },
}; 