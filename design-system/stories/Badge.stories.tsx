import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/Badge';
import { faCheckCircle, faExclamationCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Badge label' },
    variant: { control: 'select', options: ['primary', 'secondary', 'success', 'danger', 'neutral'], description: 'Badge color variant' },
    icon: { control: false, description: 'Optional icon' },
  },
  parameters: {
    docs: {
      description: {
        component: 'A badge for status or labels, using Figtree font and design tokens.'
      }
    }
  }
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    label: 'Primary',
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    label: 'Success',
    variant: 'success',
    icon: faCheckCircle,
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger',
    variant: 'danger',
    icon: faExclamationCircle,
  },
};

export const Neutral: Story = {
  args: {
    label: 'Neutral',
    variant: 'neutral',
    icon: faInfoCircle,
  },
}; 