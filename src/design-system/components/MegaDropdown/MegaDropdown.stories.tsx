import { useState } from "react";
import { type Meta, type StoryObj } from "@storybook/react-vite";
import { MegaDropdown, type MenuItem } from "./MegaDropdown";

const menu: MenuItem[] = [
  { id: "site-map", icon: "fa-solid fa-map", label: "Site Map" },
  { id: "workforce", icon: "fa-solid fa-hard-hat", label: "Workforce" },
  { id: "crew", icon: "fa-solid fa-users", label: "Crew" },
  { id: "obs", icon: "fa-solid fa-sitemap", label: "OBS" },
  { id: "hardware", icon: "fa-solid fa-microchip", label: "Hardware Management" },
  { id: "reports", icon: "fa-solid fa-chart-column", label: "Reports" },
  { id: "observation-manager", icon: "fa-solid fa-user-shield", label: "Observation Manager" },
  { id: "verify-response", icon: "fa-solid fa-shield", label: "VerifyResponse" },
  { id: "cctv-ai", icon: "fa-solid fa-video", label: "CCTV AI" },
  { id: "weather-station", icon: "fa-solid fa-cloud-sun", label: "Weather Station", badge: "Beta" },
  { id: "digital-clinic", icon: "fa-solid fa-house-medical", label: "Digital Clinic" },
  { id: "verify-progress", icon: "fa-solid fa-list-check", label: "VerifyProgress" },
  { id: "verify-time", icon: "fa-solid fa-clock", label: "VerifyTime" },
  { id: "lookahead-planning", icon: "fa-solid fa-list-check", label: "Lookahead Planning" },
];

const meta: Meta<typeof MegaDropdown> = {
  title: "Navigation/MegaDropdown",
  component: MegaDropdown,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;
type Story = StoryObj<typeof MegaDropdown>;

export const Playground: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ position: "relative", minHeight: 600, background: "#f0f2f5" }}>
        <button style={{ margin: 24 }} onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Open"} Dropdown
        </button>
        <MegaDropdown open={open} onClose={() => setOpen(false)} menu={menu} />
      </div>
    );
  },
};

export const BadgeVariants: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const badgeMenu: MenuItem[] = [
      { id: "site-map", icon: "fa-solid fa-map", label: "Site Map" },
      { id: "workforce", icon: "fa-solid fa-hard-hat", label: "Workforce", badge: "Beta" },
      { id: "crew", icon: "fa-solid fa-users", label: "Crew" },
      { id: "obs", icon: "fa-solid fa-sitemap", label: "OBS", badge: "Beta" },
      { id: "hardware", icon: "fa-solid fa-microchip", label: "Hardware Management" },
      { id: "reports", icon: "fa-solid fa-chart-column", label: "Reports" },
      {
        id: "observation-manager",
        icon: "fa-solid fa-user-shield",
        label: "Observation Manager",
        badge: "Beta",
      },
      { id: "verify-response", icon: "fa-solid fa-shield", label: "VerifyResponse" },
      { id: "cctv-ai", icon: "fa-solid fa-video", label: "CCTV AI", badge: "Beta" },
      {
        id: "weather-station",
        icon: "fa-solid fa-cloud-sun",
        label: "Weather Station",
        badge: "Beta",
      },
      { id: "digital-clinic", icon: "fa-solid fa-house-medical", label: "Digital Clinic" },
      {
        id: "verify-progress",
        icon: "fa-solid fa-list-check",
        label: "VerifyProgress",
        badge: "Beta",
      },
      { id: "verify-time", icon: "fa-solid fa-clock", label: "VerifyTime" },
      {
        id: "lookahead-planning",
        icon: "fa-solid fa-list-check",
        label: "Lookahead Planning",
        badge: "Beta",
      },
    ];

    return (
      <div style={{ position: "relative", minHeight: 600, background: "#f0f2f5" }}>
        <button style={{ margin: 24 }} onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Open"} Dropdown with Badge Variants
        </button>
        <MegaDropdown open={open} onClose={() => setOpen(false)} menu={badgeMenu} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'MegaDropdown demonstrating different badge variants. All badges use the minimal "Beta" style.',
      },
    },
  },
};
