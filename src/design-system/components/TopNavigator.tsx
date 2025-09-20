import React, { useState, useRef, useEffect } from "react";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog } from "@fortawesome/free-solid-svg-icons";
import { faTh } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
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
import { NavDropdown } from "./NavDropdown";

const Logo = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6.00746V0.5H18.4134L16.581 3.23134L14.6592 0.5H9.2514L7.41899 3.23134L5.49721 0.5H0V6.00746L4.64804 15.5H10.1006L11.9777 12.7687L13.8101 15.5H19.3966L24 6.00746Z" fill="white"/>
  </svg>
);

const menu = [
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

const ad = {
  banner: './banner.png',
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

export const TopNavigator = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [pinnedItems, setPinnedItems] = useState<Array<{ icon: IconDefinition; label: string }>>([]);
  const navRef = useRef<HTMLDivElement>(null);

  // Click-away handler
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  const handlePinChange = (items: Array<{ icon: IconDefinition; label: string }>) => {
    setPinnedItems(items);
  };

  return (
    <div ref={navRef} style={{ position: 'relative', width: '100%' }}>
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#111',
        padding: '8px 12px',
        height: 40,
        width: '100%'
      }}>
        {/* Left side: Logo and dashboard menu button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Logo />
          <Button
            icon={faTh}
            isMenuIcon={true}
            size="md"
            aria-label="Dashboard menu"
            onClick={() => {
              if (dropdownOpen) {
                setDropdownOpen(false);
              } else {
                setDropdownOpen(true);
              }
            }}
          />
          {/* Pinned items */}
          {pinnedItems.map((item, index) => (
            <Button
              key={item.label}
              variant="nav"
              icon={item.icon}
              size="md"
              aria-label={item.label}
              style={{ marginLeft: index === 0 ? 8 : 0 }}
            >
              {item.label}
            </Button>
          ))}
        </div>
        {/* Right side: Notification, Settings, Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Button
            icon={faBell}
            size="md"
            aria-label="Notifications"
          />
          <Button
            icon={faCog}
            size="md"
            aria-label="Settings"
            onClick={() => window.location.href='/settings'}
          />
          <button style={{
            background: '#222',
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }} aria-label="Profile">
            <span style={{fontSize: 20, color: 'white'}}>A</span>
          </button>
        </div>
      </nav>
      {dropdownOpen && (
        <NavDropdown 
          menu={menu} 
          ad={ad} 
          open={dropdownOpen} 
          onClose={() => setDropdownOpen(false)}
          onPinChange={handlePinChange}
        />
      )}
    </div>
  );
}; 