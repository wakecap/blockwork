import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["linear", "circular"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "error"],
    },
    labelPosition: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
    indeterminate: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LinearProgress: Story = {
  args: {
    value: 65,
    max: 100,
    variant: "linear",
    size: "md",
    color: "primary",
    showLabel: true,
    labelPosition: "top",
    indeterminate: false,
  },
};

export const CircularProgress: Story = {
  args: {
    value: 75,
    max: 100,
    variant: "circular",
    size: "md",
    color: "primary",
    showLabel: true,
    labelPosition: "top",
    indeterminate: false,
  },
};

export const IndeterminateLinear: Story = {
  args: {
    variant: "linear",
    size: "md",
    color: "primary",
    indeterminate: true,
  },
};

export const IndeterminateCircular: Story = {
  args: {
    variant: "circular",
    size: "md",
    color: "primary",
    indeterminate: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Linear Progress - All Sizes</h3>
        <div className="space-y-4">
          <div>
            <Progress value={30} size="sm" showLabel labelPosition="top" />
          </div>
          <div>
            <Progress value={50} size="md" showLabel labelPosition="top" />
          </div>
          <div>
            <Progress value={80} size="lg" showLabel labelPosition="top" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Circular Progress - All Sizes</h3>
        <div className="flex items-center space-x-8">
          <Progress value={25} variant="circular" size="sm" showLabel />
          <Progress value={50} variant="circular" size="md" showLabel />
          <Progress value={75} variant="circular" size="lg" showLabel />
        </div>
      </div>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Linear Progress - All Colors</h3>
        <div className="space-y-4">
          <Progress value={60} color="primary" showLabel labelPosition="top" />
          <Progress value={60} color="success" showLabel labelPosition="top" />
          <Progress value={60} color="warning" showLabel labelPosition="top" />
          <Progress value={60} color="error" showLabel labelPosition="top" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Circular Progress - All Colors</h3>
        <div className="flex items-center space-x-8">
          <Progress value={60} variant="circular" color="primary" showLabel />
          <Progress value={60} variant="circular" color="success" showLabel />
          <Progress value={60} variant="circular" color="warning" showLabel />
          <Progress value={60} variant="circular" color="error" showLabel />
        </div>
      </div>
    </div>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Linear Progress - Label Positions</h3>
        <div className="space-y-4">
          <Progress value={45} showLabel labelPosition="top" />
          <Progress value={45} showLabel labelPosition="bottom" />
          <div className="flex items-center space-x-4">
            <Progress value={45} showLabel labelPosition="left" />
          </div>
          <div className="flex items-center space-x-4">
            <Progress value={45} showLabel labelPosition="right" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Circular Progress - Label Positions</h3>
        <div className="flex items-center space-x-8">
          <Progress value={45} variant="circular" showLabel labelPosition="top" />
          <Progress value={45} variant="circular" showLabel labelPosition="bottom" />
          <Progress value={45} variant="circular" showLabel labelPosition="left" />
          <Progress value={45} variant="circular" showLabel labelPosition="right" />
        </div>
      </div>
    </div>
  ),
};

export const ProgressStages: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Progress Stages</h3>
        <div className="space-y-4">
          <Progress value={0} showLabel labelPosition="top" />
          <Progress value={25} showLabel labelPosition="top" />
          <Progress value={50} showLabel labelPosition="top" />
          <Progress value={75} showLabel labelPosition="top" />
          <Progress value={100} showLabel labelPosition="top" />
        </div>
      </div>
    </div>
  ),
};

export const CustomValues: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Custom Max Values</h3>
        <div className="space-y-4">
          <Progress value={3} max={5} showLabel labelPosition="top" />
          <Progress value={7} max={10} showLabel labelPosition="top" />
          <Progress value={150} max={200} showLabel labelPosition="top" />
        </div>
      </div>
    </div>
  ),
};
