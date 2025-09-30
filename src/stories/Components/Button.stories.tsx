import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../design-system/components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Button component for user interactions.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'outline', 'ghost', 'text', 'success', 'warning', 'destructive', 'info', 'pin', 'nav', 'fab'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'icon'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'md',
  },
};

export const Accent: Story = {
  args: {
    children: 'Button',
    variant: 'accent',
    size: 'md',
  },
};

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
    size: 'md',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
    size: 'md',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading...',
    variant: 'primary',
    size: 'md',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
};
