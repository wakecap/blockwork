import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { MegaDropdown, MenuItem } from "./MegaDropdown";
import {
  faMap,
  faHardHat,
  faUsers,
  faSitemap,
  faMicrochip,
  faChartColumn,
  faUserShield,
  faShield,
  faVideo,
  faCloudSun,
  faHouseMedical,
  faListCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const menu: MenuItem[] = [
  { icon: faMap, label: "Site Map" },
  { icon: faHardHat, label: "Workforce" },
  { icon: faUsers, label: "Crew" },
  { icon: faSitemap, label: "OBS" },
  { icon: faMicrochip, label: "Hardware Management" },
  { icon: faChartColumn, label: "Reports" },
  { icon: faUserShield, label: "Observation Manager" },
  { icon: faShield, label: "VerifyResponse" },
  { icon: faVideo, label: "CCTV AI" },
  { icon: faCloudSun, label: "Weather Station", badge: "Beta" },
  { icon: faHouseMedical, label: "Digital Clinic" },
  { icon: faListCheck, label: "VerifyProgress" },
  { icon: faClock, label: "VerifyTime" },
  { icon: faListCheck, label: "Lookahead Planning" },
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
      { icon: faMap, label: "Site Map" },
      { icon: faHardHat, label: "Workforce", badge: "Beta" },
      { icon: faUsers, label: "Crew" },
      { icon: faSitemap, label: "OBS", badge: "Beta" },
      { icon: faMicrochip, label: "Hardware Management" },
      { icon: faChartColumn, label: "Reports" },
      { icon: faUserShield, label: "Observation Manager", badge: "Beta" },
      { icon: faShield, label: "VerifyResponse" },
      { icon: faVideo, label: "CCTV AI", badge: "Beta" },
      { icon: faCloudSun, label: "Weather Station", badge: "Beta" },
      { icon: faHouseMedical, label: "Digital Clinic" },
      { icon: faListCheck, label: "VerifyProgress", badge: "Beta" },
      { icon: faClock, label: "VerifyTime" },
      { icon: faListCheck, label: "Lookahead Planning", badge: "Beta" },
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
