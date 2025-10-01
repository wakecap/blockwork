import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { AdvertisementCard } from "../components/AdvertisementCard";

// Use the correct banner image path (case-sensitive)
const banner = "/Banner.png";

const meta: Meta<typeof AdvertisementCard> = {
  title: "Components/AdvertisementCard",
  component: AdvertisementCard,
  parameters: {
    layout: "centered",
  },
};
export default meta;
type Story = StoryObj<typeof AdvertisementCard>;

export const Default: Story = {
  args: {
    banner,
    header: "Weather Station",
    features: [
      "Live data",
      "Temperature Analysis",
      "Heat Index",
      "Wind speed Analysis",
      "Automatic Alerts",
    ],
    buttonText: "Try It Now",
    onButtonClick: () => alert("Try It Now clicked!"),
  },
};
