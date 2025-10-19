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
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label="Checkbox option"
        checked={checked}
        onChange={setChecked}
      />
    );
  },
};

export const Checked: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <Checkbox
        label="Checked checkbox"
        checked={checked}
        onChange={setChecked}
      />
    );
  },
};

export const Unchecked: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label="Unchecked checkbox"
        checked={checked}
        onChange={setChecked}
      />
    );
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
    const [clickCount, setClickCount] = useState(0);
    
    return (
      <div className="space-y-4">
        <Checkbox
          label="Click me to toggle"
          checked={checked}
          onChange={(newChecked) => {
            console.log('Checkbox changed to:', newChecked);
            setChecked(newChecked);
            setClickCount(prev => prev + 1);
          }}
        />
        <div className="p-4 bg-gray-50 rounded border border-gray-200">
          <p className="text-sm font-semibold text-gray-700">Current state: <span className={checked ? "text-green-600" : "text-red-600"}>{checked ? "✓ Checked" : "✗ Unchecked"}</span></p>
          <p className="text-xs text-gray-500 mt-1">Times clicked: {clickCount}</p>
        </div>
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
  render: () => {
    const [unchecked, setUnchecked] = useState(false);
    const [checked, setChecked] = useState(true);
    
    return (
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Unchecked State (Click to toggle)</h3>
          <Checkbox 
            label="Unchecked checkbox (grey-500)" 
            checked={unchecked} 
            onChange={setUnchecked}
          />
          <p className="text-xs text-gray-500 mt-1">Status: {unchecked ? "Checked ✓" : "Unchecked"}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Checked State (Click to toggle)</h3>
          <Checkbox 
            label="Checked checkbox (grey-800)" 
            checked={checked} 
            onChange={setChecked}
          />
          <p className="text-xs text-gray-500 mt-1">Status: {checked ? "Checked ✓" : "Unchecked"}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Disabled State (Not clickable)</h3>
          <Checkbox label="Disabled checkbox (grey-300)" checked={false} disabled={true} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Disabled Checked State (Not clickable)</h3>
          <Checkbox label="Disabled checked checkbox (grey-300)" checked={true} disabled={true} />
        </div>
      </div>
    );
  },
};
