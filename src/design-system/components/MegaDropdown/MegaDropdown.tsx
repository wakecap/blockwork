import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faBookmark } from "@fortawesome/pro-regular-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";

export interface MenuItem {
  id: string;
  icon: IconDefinition;
  label: string;
  badge?: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface MegaDropdownProps {
  open: boolean;
  onClose: () => void;
  menu: MenuItem[];
  onPinChange?: (pinnedItems: Array<{ id: string; icon: IconDefinition; label: string }>) => void;
  onPinStateChange?: (pinnedStates: Record<string, boolean>) => void;
  pinnedStates?: Record<string, boolean>;
}

export const MegaDropdown: React.FC<MegaDropdownProps> = ({
  open,
  onClose,
  menu,
  onPinChange,
  onPinStateChange,
  pinnedStates = {},
}) => {
  const [pinned, setPinned] = useState<Record<string, boolean>>(pinnedStates);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      // Start animation
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
    }
  }, [open]);

  // Sync external pinned states with local state (optimized to prevent infinite loops)
  useEffect(() => {
    setPinned((prevPinned) => {
      // Only update if there are actual changes
      const hasChanges =
        Object.keys(pinnedStates).some((key) => pinnedStates[key] !== prevPinned[key]) ||
        Object.keys(prevPinned).some((key) => prevPinned[key] !== pinnedStates[key]);

      return hasChanges ? pinnedStates : prevPinned;
    });
  }, [pinnedStates]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      // Don't close if clicking inside the mega dropdown
      if (target.closest(".mega-dropdown")) return;
      // Don't close if clicking the burger menu button (aria-label="Dashboard menu")
      if (target.closest('[aria-label="Dashboard menu"]')) return;
      // Close for all other clicks
      onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  const handlePinClick = useCallback(
    (link: MenuItem) => {
      setPinned((prev) => {
        const newPinned = { ...prev, [link.label]: !prev[link.label] };

        // Get all pinned items
        const pinnedItems = menu
          .filter((item) => newPinned[item.label])
          .map((item) => ({
            id: item.id,
            icon: item.icon,
            label: item.label,
          }));

        // Notify parent component of pinned items
        onPinChange?.(pinnedItems);

        // Notify parent component of pinned states
        onPinStateChange?.(newPinned);

        return newPinned;
      });
    },
    [menu, onPinChange, onPinStateChange],
  );

  // Create columns with max 6 items per column for desktop (memoized for performance)
  const columns = useMemo(() => {
    const itemsPerColumn = 6;
    const cols = [];

    for (let i = 0; i < menu.length; i += itemsPerColumn) {
      cols.push(menu.slice(i, i + itemsPerColumn));
    }

    return cols;
  }, [menu]);

  // Don't render if not open and not visible (after all hooks have been called)
  if (!open && !isVisible) return null;

  return (
    <>
      <style>
        {`
          .mega-dropdown li .bookmark-btn {
            opacity: 0 !important;
            transition: opacity 0.2s ease !important;
          }
          .mega-dropdown li:hover .bookmark-btn {
            opacity: 1 !important;
          }
          .mega-dropdown li .bookmark-btn.pinned {
            opacity: 1 !important;
          }
          .mega-dropdown li .bookmark-btn.pinned svg {
            color: #6b7280 !important;
          }
        `}
      </style>
      <div
        className="mega-dropdown"
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          width: "100%",
          margin: 0,
          background: "#ffffff",
          boxShadow: "none",
          borderRadius: 0,
          display: "flex",
          padding: 16,
          zIndex: 1001,
          minHeight: "auto",
          gap: 32,
          boxSizing: "border-box",
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? "0" : "-10px"})`,
          transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
          pointerEvents: isVisible ? "auto" : "none",
        }}
      >
        {/* Menu links organized in columns */}
        <div style={{ flex: 2, display: "flex", gap: 16, minWidth: 0 }}>
          {columns.map((column, columnIdx) => (
            <React.Fragment key={columnIdx}>
              <div style={{ minWidth: 200, maxWidth: 420, flex: "1 1 200px" }}>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {column.map((link, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 4,
                        cursor: link.onClick ? "pointer" : "default",
                        borderRadius: 5,
                        transition: "background 0.15s",
                        padding: "3px 8px 3px 16px",
                        background: link.isActive ? "var(--Primary-50, #EFF6FF)" : "",
                        borderLeft: link.isActive
                          ? "3px solid var(--Primary-500, #3B82F6)"
                          : "3px solid transparent",
                      }}
                      onClick={link.onClick}
                      onMouseOver={(e) => {
                        if (!link.isActive) {
                          e.currentTarget.style.background = "var(--Secondary-50, #F9FAFB)";
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!link.isActive) {
                          e.currentTarget.style.background = "";
                        }
                      }}
                    >
                      <div
                        style={{
                          width: 20,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <FontAwesomeIcon icon={link.icon} style={{ fontSize: 16, color: "#444" }} />
                      </div>
                      <span style={{ fontSize: 14, color: "#222", fontWeight: 500 }}>
                        {link.label}
                      </span>
                      {link.badge && (
                        <Badge variant="outline" size="sm" style={{ marginLeft: 6 }}>
                          {link.badge}
                        </Badge>
                      )}
                      <Button
                        variant="iconBtn"
                        size="iconSm"
                        aria-label={pinned[link.label] ? "Remove bookmark" : "Add bookmark"}
                        style={{
                          marginLeft: "auto",
                        }}
                        className={`bookmark-btn ${pinned[link.label] ? "pinned" : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePinClick(link);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={pinned[link.label] ? faBookmarkSolid : faBookmark}
                          style={{
                            fontSize: 16,
                            color: pinned[link.label] ? "#6b7280" : "#444",
                          }}
                        />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              {columnIdx < columns.length - 1 && (
                <div
                  style={{
                    width: 1,
                    minWidth: 1,
                    alignSelf: "stretch",
                    background: "#e5e7eb",
                    margin: "0 8px",
                    borderRadius: 1,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Responsive styles */}
        <style>{`
        @media (max-width: 1024px) and (min-width: 769px) {
          .mega-dropdown { 
            flex-direction: column !important; 
            padding: 16px !important; 
            min-height: unset !important; 
          }
          .mega-dropdown > div { 
            display: flex !important;
            flex-direction: column !important;
            gap: 0 !important;
          }
          .mega-dropdown > div > div {
            flex: none !important;
            max-width: 100% !important;
            min-width: 0 !important;
          }
        }
        @media (max-width: 768px) {
          .mega-dropdown { 
            flex-direction: column !important; 
            padding: 16px !important; 
            min-height: unset !important; 
          }
          .mega-dropdown > div { 
            display: flex !important;
            flex-direction: column !important;
            gap: 0 !important;
          }
          .mega-dropdown > div > div {
            flex: none !important;
            max-width: 100% !important;
            min-width: 0 !important;
          }
        }
        @media (max-width: 600px) {
          .mega-dropdown { padding: 8px !important; gap: 12px !important; }
          .mega-dropdown > div > div { padding: 0 !important; }
        }
      `}</style>
      </div>
    </>
  );
};
