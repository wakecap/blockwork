import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { NavDropdown, MenuSection, AdContent } from '../components/NavDropdown';
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
  faClock
} from "@fortawesome/free-solid-svg-icons";

const menu: MenuSection[] = [
  {
    category: 'GENERAL',
    links: [
      { icon: faMap, label: 'Site Map' },
      { icon: faHardHat, label: 'Workforce' },
      { icon: faUsers, label: 'Crew' },
      { icon: faSitemap, label: 'OBS' },
      { icon: faMicrochip, label: 'Hardware Management' },
      { icon: faChartColumn, label: 'Reports' },
    ],
  },
  {
    category: 'SAFETY',
    links: [
      { icon: faUserShield, label: 'Observation Manager' },
      { icon: faShield, label: 'VerifyResponse' },
      { icon: faVideo, label: 'CCTV AI' },
      { icon: faCloudSun, label: 'Weather Station', badge: 'New' },
      { icon: faHouseMedical, label: 'Digital Clinic' },
    ],
  },
  {
    category: 'PRODUCTIVITY',
    links: [
      { icon: faListCheck, label: 'VerifyProgress' },
      { icon: faClock, label: 'VerifyTime' },
      { icon: faListCheck, label: 'Lookahead Planning' },
    ],
  },
];

const ad: AdContent = {
  banner: '/Banner.png',
  header: 'Weather Station',
  features: [
    'Live data',
    'Temperature Analysis',
    'Heat Index',
    'Wind speed Analysis',
    'Automatic Alerts',
  ],
  buttonText: 'Try It Now',
  onButtonClick: () => alert('Try It Now clicked!'),
};

const meta: Meta<typeof NavDropdown> = {
  title: 'Components/NavDropdown',
  component: NavDropdown,
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<typeof NavDropdown>;

export const Playground: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ position: 'relative', minHeight: 600, background: '#f0f2f5' }}>
        <button style={{ margin: 24 }} onClick={() => setOpen((v) => !v)}>
          {open ? 'Close' : 'Open'} Dropdown
        </button>
        <NavDropdown open={open} onClose={() => setOpen(false)} menu={menu} ad={ad} />
      </div>
    );
  },
}; 