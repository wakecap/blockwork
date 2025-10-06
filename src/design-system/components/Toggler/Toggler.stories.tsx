import  { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggler } from "./Toggler";

const meta: Meta<typeof Toggler> = {
  title: "Components/Toggler",
  component: Toggler,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean", description: "Checked state" },
    disabled: { control: "boolean", description: "Disabled state" },
    label: { control: "text", description: "Toggler label" },
    onChange: { action: "changed", description: "Change callback" },
  },
  parameters: {
    docs: {
      description: {
        component: "A switch/toggler component using Figtree font and design tokens.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Toggler>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    label: "Toggle me",
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Toggler {...args} checked={checked} onChange={setChecked} />;
  },
  args: {
    label: "Controlled toggler",
  },
};

export const WithIcon: Story = {
  args: {
    checked: false,
    label: "Power",
    icon: "fa-solid fa-power-off",
  },
};
