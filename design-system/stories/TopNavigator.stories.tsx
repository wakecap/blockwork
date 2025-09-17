import React from "react";
import { TopNavigator } from "../components/TopNavigator";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TopNavigator> = {
  title: "Navigation/TopNavigator",
  component: TopNavigator,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#111" },
        { name: "light", value: "#fff" },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopNavigator>;

export const Default: Story = {
  render: () => <TopNavigator />,
}; 