import React, { useState } from 'react';
import { AdvertisementCard } from './AdvertisementCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Button } from './Button';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export interface MenuSection {
  category?: string;
  links: Array<{
    icon: IconDefinition;
    label: string;
    badge?: string;
    onClick?: () => void;
  }>;
}

export interface AdContent {
  banner: string | React.ReactNode;
  header: string;
  features: string[];
  buttonText: string;
  onButtonClick?: () => void;
}

interface NavDropdownProps {
  open: boolean;
  onClose: () => void;
  menu: MenuSection[];
  ad: AdContent;
  onPinChange?: (pinnedItems: Array<{ icon: IconDefinition; label: string }>) => void;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ open, onClose, menu, ad, onPinChange }) => {
  const [pinned, setPinned] = useState<Record<string, boolean>>({});
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    if (open) {
      // Start animation
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest('.nav-dropdown')) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open, onClose]);

  if (!open && !isVisible) return null;

  const handlePinClick = (link: { icon: IconDefinition; label: string }) => {
    setPinned((prev) => {
      const newPinned = { ...prev, [link.label]: !prev[link.label] };
      
      // Get all pinned items
      const pinnedItems = menu.flatMap(section => 
        section.links.filter(item => newPinned[item.label])
      );
      
      // Notify parent component of pinned items
      onPinChange?.(pinnedItems);
      
      return newPinned;
    });
  };

  return (
    <div
      className="nav-dropdown"
      style={{
        position: 'absolute',
        top: 40,
        left: 0,
        width: 'calc(100vw - 16px)',
        margin: 8,
        background: '#fff',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
        borderRadius: 8,
        display: 'flex',
        flexWrap: 'wrap',
        padding: 32,
        zIndex: 1000,
        minHeight: 400,
        gap: 32,
        boxSizing: 'border-box',
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? '0' : '-10px'})`,
        transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      {/* Left: Menu links */}
      <div style={{ flex: 2, display: 'flex', flexWrap: 'wrap', gap: 32, minWidth: 0 }}>
        {menu.map((section, idx) => (
          <React.Fragment key={idx}>
            <div style={{ minWidth: 180, marginBottom: 24, flex: '1 1 180px' }}>
              {section.category && (
                <div style={{ color: '#888', fontWeight: 600, fontSize: 14, marginBottom: 12 }}>{section.category}</div>
              )}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.links.map((link, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 12,
                      cursor: link.onClick ? 'pointer' : 'default',
                      borderRadius: 5,
                      transition: 'background 0.15s',
                      padding: '10px',
                    }}
                    onClick={link.onClick}
                    onMouseOver={e => (e.currentTarget.style.background = 'var(--Secondary-50, #F9FAFB)')}
                    onMouseOut={e => (e.currentTarget.style.background = '')}
                  >
                    <FontAwesomeIcon icon={link.icon} style={{ fontSize: 18, color: '#444' }} />
                    <span style={{ fontSize: 16, color: '#222', fontWeight: 500 }}>{link.label}</span>
                    {link.badge && (
                      <span style={{ background: '#E0F7EF', color: '#1DBF73', fontSize: 12, borderRadius: 8, padding: '2px 8px', marginLeft: 8 }}>{link.badge}</span>
                    )}
                    <Button
                      variant="pin"
                      size="md"
                      icon={faStar}
                      aria-label={pinned[link.label] ? 'Unpin' : 'Pin'}
                      style={{ marginLeft: 'auto' }}
                      onClick={e => { e.stopPropagation(); handlePinClick(link); }}
                    />
                  </li>
                ))}
              </ul>
            </div>
            {idx < menu.length - 1 && (
              <div
                style={{
                  width: 1,
                  minWidth: 1,
                  alignSelf: 'stretch',
                  background: 'var(--Secondary-100, #F3F4F6)',
                  margin: '0 8px',
                  borderRadius: 1,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Right: AdvertisementCard */}
      <div style={{ flex: 1, minWidth: 260, maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <AdvertisementCard {...ad} />
      </div>
      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .nav-dropdown { flex-direction: column; padding: 16px; min-height: unset; }
          .nav-dropdown > div { min-width: 0 !important; max-width: 100% !important; }
        }
        @media (max-width: 600px) {
          .nav-dropdown { padding: 8px; gap: 12px; }
          .nav-dropdown > div { padding: 0 !important; }
        }
      `}</style>
    </div>
  );
}; 