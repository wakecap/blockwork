import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from '../components/Radio';
import { faDotCircle } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Radio label' },
    checked: { control: 'boolean', description: 'Checked state' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    name: { control: 'text', description: 'Radio group name' },
    value: { control: 'text', description: 'Radio value' },
    onChange: { action: 'changed', description: 'Change callback' },
  },
  parameters: {
    docs: {
      description: {
        component: 'A radio button with label, using Figtree font and design tokens.'
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: 'Radio option',
    checked: false,
    disabled: false,
    name: 'group1',
    value: 'option1',
  },
};

export const Group: Story = {
  render: (args) => {
    const [selected, setSelected] = useState('option1');
    return (
      <div className="flex gap-4">
        <Radio {...args} value="option1" checked={selected === 'option1'} onChange={() => setSelected('option1')} label="Option 1" name="group2" />
        <Radio {...args} value="option2" checked={selected === 'option2'} onChange={() => setSelected('option2')} label="Option 2" name="group2" />
      </div>
    );
  },
  args: {
    name: 'group2',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'With Icon',
    checked: false,
    icon: faDotCircle,
  },
}; 