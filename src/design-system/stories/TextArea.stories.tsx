import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "../components/TextArea";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    rows: {
      control: { type: "number", min: 1, max: 10 },
    },
    maxLength: {
      control: { type: "number", min: 1, max: 1000 },
    },
    showCharacterCount: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your message here...",
    rows: 4,
  },
};

export const WithLabel: Story = {
  args: {
    label: "Message",
    placeholder: "Enter your message here...",
    rows: 4,
  },
};

export const WithIcons: Story = {
  args: {
    label: "Description",
    iconLeft: faUser,
    iconRight: faEnvelope,
    placeholder: "Enter description with icons...",
    rows: 3,
  },
};

export const WithError: Story = {
  args: {
    label: "Message",
    placeholder: "Enter your message here...",
    error: "This field is required",
    rows: 4,
  },
};

export const WithSuccess: Story = {
  args: {
    label: "Message",
    placeholder: "Enter your message here...",
    success: "Message saved successfully!",
    rows: 4,
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    maxLength: 200,
    showCharacterCount: true,
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    label: "Message",
    placeholder: "This textarea is disabled",
    disabled: true,
    rows: 4,
  },
};

export const Large: Story = {
  args: {
    label: "Large Text Area",
    placeholder: "This is a larger text area...",
    rows: 8,
    className: "w-full max-w-md",
  },
};
