import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from '../components/MultiSelect';

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    searchable: {
      control: 'boolean',
    },
    maxSelections: {
      control: { type: 'number', min: 1, max: 10 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'Nuxt.js', value: 'nuxtjs' },
  { label: 'Gatsby', value: 'gatsby' },
  { label: 'Remix', value: 'remix' },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    selectedValues: [],
    onChange: (values) => console.log('Selected:', values),
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Select Technologies',
    options: sampleOptions,
    selectedValues: [],
    onChange: (values) => console.log('Selected:', values),
  },
};

export const WithSelectedValues: Story = {
  args: {
    label: 'Select Technologies',
    options: sampleOptions,
    selectedValues: ['react', 'vue'],
    onChange: (values) => console.log('Selected:', values),
  },
};

export const Searchable: Story = {
  args: {
    label: 'Searchable Technologies',
    options: sampleOptions,
    selectedValues: [],
    onChange: (values) => console.log('Selected:', values),
    searchable: true,
  },
};

export const WithMaxSelections: Story = {
  args: {
    label: 'Select up to 3 Technologies',
    options: sampleOptions,
    selectedValues: [],
    onChange: (values) => console.log('Selected:', values),
    maxSelections: 3,
  },
};

export const WithError: Story = {
  args: {
    label: 'Select Technologies',
    options: sampleOptions,
    selectedValues: [],
    onChange: (values) => console.log('Selected:', values),
    error: 'Please select at least one technology',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled MultiSelect',
    options: sampleOptions,
    selectedValues: ['react'],
    onChange: (values) => console.log('Selected:', values),
    disabled: true,
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Select Technologies',
    options: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular', disabled: true },
      { label: 'Svelte', value: 'svelte' },
      { label: 'Next.js', value: 'nextjs', disabled: true },
    ],
    selectedValues: [],
    onChange: (values) => console.log('Selected:', values),
  },
};

export const Large: Story = {
  args: {
    label: 'Large MultiSelect',
    options: sampleOptions,
    selectedValues: [],
    onChange: (values) => console.log('Selected:', values),
    className: 'w-full max-w-md',
  },
};
