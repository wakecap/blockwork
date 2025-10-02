import type { Meta, StoryObj } from "@storybook/react-vite";
import { Autocomplete } from "./Autocomplete";

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: "boolean",
    },
    minChars: {
      control: { type: "number", min: 1, max: 5 },
    },
    maxSuggestions: {
      control: { type: "number", min: 1, max: 20 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { label: "React", value: "react" },
  { label: "Vue.js", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Next.js", value: "nextjs" },
  { label: "Nuxt.js", value: "nuxtjs" },
  { label: "Gatsby", value: "gatsby" },
  { label: "Remix", value: "remix" },
  { label: "React Native", value: "react-native" },
  { label: "Vue Native", value: "vue-native" },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    value: "",
    onChange: (value) => console.log("Input value:", value),
    onSelect: (option) => console.log("Selected option:", option),
  },
};

export const WithLabel: Story = {
  args: {
    label: "Select Framework",
    options: sampleOptions,
    value: "",
    onChange: (value) => console.log("Input value:", value),
    onSelect: (option) => console.log("Selected option:", option),
  },
};

export const WithValue: Story = {
  args: {
    label: "Select Framework",
    options: sampleOptions,
    value: "React",
    onChange: (value) => console.log("Input value:", value),
    onSelect: (option) => console.log("Selected option:", option),
  },
};

export const WithMinChars: Story = {
  args: {
    label: "Select Framework (min 2 chars)",
    options: sampleOptions,
    value: "",
    onChange: (value) => console.log("Input value:", value),
    onSelect: (option) => console.log("Selected option:", option),
    minChars: 2,
  },
};

export const WithMaxSuggestions: Story = {
  args: {
    label: "Select Framework (max 5 suggestions)",
    options: sampleOptions,
    value: "",
    onChange: (value) => console.log("Input value:", value),
    onSelect: (option) => console.log("Selected option:", option),
    maxSuggestions: 5,
  },
};

export const Loading: Story = {
  args: {
    label: "Loading Autocomplete",
    options: sampleOptions,
    value: "",
    onChange: (value) => console.log("Input value:", value),
    onSelect: (option) => console.log("Selected option:", option),
    loading: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Select Framework",
    options: sampleOptions,
    value: "",
    onChange: (value) => console.log("Input value:", value),
    onSelect: (option) => console.log("Selected option:", option),
    error: "Please select a valid framework",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Autocomplete",
    options: sampleOptions,
    value: "",
    onChange: (value) => console.log("Input value:", value),
    onSelect: (option) => console.log("Selected option:", option),
    disabled: true,
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: "Select Framework",
    options: [
      { label: "React", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular", disabled: true },
      { label: "Svelte", value: "svelte" },
      { label: "Next.js", value: "nextjs", disabled: true },
    ],
    value: "",
    onChange: (value) => console.log("Input value:", value),
    onSelect: (option) => console.log("Selected option:", option),
  },
};

export const Large: Story = {
  args: {
    label: "Large Autocomplete",
    options: sampleOptions,
    value: "",
    onChange: (value) => console.log("Input value:", value),
    onSelect: (option) => console.log("Selected option:", option),
    className: "w-full max-w-md",
  },
};
