import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordInput } from '../components/PasswordInput';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof PasswordInput> = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    showToggle: {
      control: 'boolean',
    },
    strengthIndicator: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter password',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Password',
    iconLeft: faLock,
    placeholder: 'Enter your password',
  },
};

export const WithStrengthIndicator: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    strengthIndicator: true,
  },
};

export const WithoutToggle: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    showToggle: false,
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    error: 'Password must be at least 8 characters',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    success: 'Password is strong',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Password',
    placeholder: 'This password field is disabled',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    value: 'MySecretPassword123!',
    strengthIndicator: true,
  },
};
