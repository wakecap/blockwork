import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown, DropdownOption } from '../components/Dropdown';
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';

const options: DropdownOption[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Dropdown label' },
    options: { control: 'object', description: 'Dropdown options' },
    value: { control: 'text', description: 'Selected value' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    onChange: { action: 'changed', description: 'Change callback' },
  },
  parameters: {
    docs: {
      description: {
        component: 'A dropdown select menu using Figtree font and design tokens.'
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    label: 'Dropdown label',
    options,
    value: 'option1',
    disabled: false,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('option1');
    return <Dropdown {...args} value={value} onChange={e => setValue(e.target.value)} />;
  },
  args: {
    label: 'Controlled dropdown',
    options,
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    options,
    value: 'option1',
    iconLeft: faSearch,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Dropdown',
    options,
    value: 'option1',
    iconRight: faChevronDown,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Search Dropdown',
    options,
    value: 'option1',
    iconLeft: faSearch,
    iconRight: faChevronDown,
  },
}; 