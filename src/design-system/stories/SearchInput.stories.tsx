import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from '../components/SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    showClearButton: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for items...',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for items...',
    value: 'Sample search term',
  },
};

export const WithError: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for items...',
    error: 'Search query is too short',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for items...',
    success: 'Search completed successfully',
  },
};

export const WithoutClearButton: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search for items...',
    showClearButton: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Search',
    placeholder: 'This search is disabled',
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    label: 'Large Search',
    placeholder: 'Search in a larger input...',
    className: 'w-full max-w-md',
  },
};
