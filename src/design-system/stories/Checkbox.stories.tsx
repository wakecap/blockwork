import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "../components/Checkbox";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof Checkbox> = {
  title: "Forms and Data Entry/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Checkbox label" },
    checked: { control: "boolean", description: "Checked state" },
    disabled: { control: "boolean", description: "Disabled state" },
    name: { control: "text", description: "Checkbox group name" },
    value: { control: "text", description: "Checkbox value" },
    onChange: { action: "changed", description: "Change callback" },
  },
  parameters: {
    docs: {
      description: {
        component: "A checkbox with label, using Figtree font and design tokens.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Checkbox option",
    checked: false,
    disabled: false,
    name: "group1",
    value: "option1",
  },
};

export const Group: Story = {
  render: (args) => {
    const [checked, setChecked] = useState([false, false]);
    return (
      <div className="flex gap-4">
        <Checkbox
          {...args}
          checked={checked[0]}
          onChange={() => setChecked([!checked[0], checked[1]])}
          label="Option 1"
          name="group2"
        />
        <Checkbox
          {...args}
          checked={checked[1]}
          onChange={() => setChecked([checked[0], !checked[1]])}
          label="Option 2"
          name="group2"
        />
      </div>
    );
  },
  args: {
    name: "group2",
  },
};

export const WithIcon: Story = {
  args: {
    label: "With Icon",
    checked: false,
    icon: faCheck,
  },
};
