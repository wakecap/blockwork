import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Forms and Data Entry/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Checkbox label" },
    checked: { control: "boolean", description: "Checked state" },
    disabled: { control: "boolean", description: "Disabled state" },
    onChange: { action: "changed", description: "Change callback" },
  },
  parameters: {
    docs: {
      description: {
        component: "A checkbox component using Font Awesome icons with three states: Unchecked (grey-500), Checked (grey-800), and Disabled (grey-300).",
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
  },
};

export const Checked: Story = {
  args: {
    label: "Checked checkbox",
    checked: true,
    disabled: false,
  },
};

export const Unchecked: Story = {
  args: {
    label: "Unchecked checkbox",
    checked: false,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled checked checkbox",
    checked: true,
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="space-y-4">
        <Checkbox
          label="Click me to toggle"
          checked={checked}
          onChange={(newChecked) => setChecked(newChecked)}
        />
        <p className="text-sm text-gray-600">Current state: {checked ? "Checked" : "Unchecked"}</p>
      </div>
    );
  },
};

export const Group: Story = {
  render: () => {
    const [checked, setChecked] = useState([false, false, false]);
    return (
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-gray-700 mb-2">Select your preferences:</h3>
        <Checkbox
          label="Option 1"
          checked={checked[0]}
          onChange={(newChecked) => setChecked([newChecked, checked[1], checked[2]])}
        />
        <Checkbox
          label="Option 2"
          checked={checked[1]}
          onChange={(newChecked) => setChecked([checked[0], newChecked, checked[2]])}
        />
        <Checkbox
          label="Option 3"
          checked={checked[2]}
          onChange={(newChecked) => setChecked([checked[0], checked[1], newChecked])}
        />
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Unchecked State</h3>
        <Checkbox label="Unchecked checkbox (grey-500)" checked={false} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Checked State</h3>
        <Checkbox label="Checked checkbox (grey-800)" checked={true} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Disabled State</h3>
        <Checkbox label="Disabled checkbox (grey-300)" disabled={true} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Disabled Checked State</h3>
        <Checkbox label="Disabled checked checkbox (grey-300)" checked={true} disabled={true} />
      </div>
    </div>
  ),
};
