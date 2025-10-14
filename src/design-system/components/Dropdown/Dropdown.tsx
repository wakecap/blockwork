import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../../utils/utils";

export interface DropdownOption {
  label: string;
  value: string;
  icon?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export interface DropdownGroup {
  groupLabel: string;
  options: DropdownOption[];
}

export interface ProfileData {
  name: string;
  email?: string;
  avatar?: React.ReactNode;
}

export interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  variant?: "default" | "menu" | "search" | "profile";
  width?: string;
  maxHeight?: string;
  // For grouped/search variant
  groups?: DropdownGroup[];
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  // For profile variant
  profileData?: ProfileData;
  // Button trigger (for menu/search/profile variants)
  triggerButton?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

// Default Dropdown Component (Custom styled)
const DefaultDropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  className,
  disabled,
  width = "auto",
  maxHeight = "240px",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click-away handler
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={cn("font-sans", className)} ref={dropdownRef}>
      {label && <label className="block mb-1 text-sm font-medium text-neutral-700">{label}</label>}
      <div style={{ position: "relative", width }}>
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          style={{
            display: "block",
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            background: disabled ? "#f3f4f6" : "white",
            fontSize: "14px",
            color: disabled ? "#9ca3af" : "#374151",
            cursor: disabled ? "not-allowed" : "pointer",
            textAlign: "left",
            transition: "all 0.2s",
            opacity: disabled ? 0.5 : 1,
          }}
          onMouseOver={(e) => {
            if (!disabled) {
              e.currentTarget.style.borderColor = "#9ca3af";
            }
          }}
          onMouseOut={(e) => {
            if (!disabled) {
              e.currentTarget.style.borderColor = "#d1d5db";
            }
          }}
        >
          {selectedOption?.label || "Select..."}
          <i
            className={cn("fa-solid fa-chevron-down flex items-center justify-center shrink-0")}
            style={{
              marginLeft: "auto",
              fontSize: "10px",
              color: "#6b7280",
            }}
          />
        </button>

        {isOpen && !disabled && (
          <>
            <style>
              {`
                .custom-dropdown-menu::-webkit-scrollbar {
                  width: 6px;
                }
                .custom-dropdown-menu::-webkit-scrollbar-track {
                  background: #f9fafb;
                  border-radius: 3px;
                }
                .custom-dropdown-menu::-webkit-scrollbar-thumb {
                  background: #d1d5db;
                  border-radius: 3px;
                }
                .custom-dropdown-menu::-webkit-scrollbar-thumb:hover {
                  background: #9ca3af;
                }
              `}
            </style>
            <div
              className="custom-dropdown-menu"
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                zIndex: 1001,
                width: "100%",
                maxHeight,
                overflowY: "auto",
                padding: "4px",
                scrollbarWidth: "thin",
                scrollbarColor: "#d1d5db #f9fafb",
              }}
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "8px 12px",
                    border: "none",
                    background: value === option.value ? "#f3f4f6" : "transparent",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#374151",
                    textAlign: "left",
                    transition: "background 0.15s",
                  }}
                  onMouseOver={(e) => {
                    if (value !== option.value) {
                      e.currentTarget.style.background = "#f9fafb";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (value !== option.value) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Menu Dropdown Component (Settings-style with icons)
const MenuDropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  triggerButton,
  isOpen: controlledIsOpen,
  onOpenChange,
  width = "220px",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, setIsOpen]);

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <div onClick={() => setIsOpen(!isOpen)}>{triggerButton}</div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            right: 0,
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            zIndex: 1001,
            padding: "8px",
            width,
          }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                option.onClick?.();
                setIsOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                width: "100%",
                padding: "8px 12px",
                border: "none",
                background: option.isActive ? "#EFF6FF" : "transparent",
                borderLeft: option.isActive ? "3px solid #3B82F6" : "3px solid transparent",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                color: "#374151",
                textAlign: "left",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              onMouseOver={(e) => {
                if (!option.isActive) {
                  e.currentTarget.style.background = "#f3f4f6";
                }
              }}
              onMouseOut={(e) => {
                if (!option.isActive) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {option.icon && (
                <div
                  style={{
                    width: 16,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <i className={cn(option.icon, "flex items-center justify-center")} style={{ fontSize: 12, color: "#6b7280" }} />
                </div>
              )}
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  flex: 1,
                }}
              >
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Search Dropdown Component (Project-style with search and groups)
const SearchDropdown: React.FC<DropdownProps> = ({
  groups = [],
  onChange,
  triggerButton,
  isOpen: controlledIsOpen,
  onOpenChange,
  searchPlaceholder = "Search...",
  emptyStateTitle = "No results found",
  emptyStateDescription = "Try adjusting your search terms.",
  width = "320px",
  maxHeight = "400px",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, setIsOpen]);

  // Filter groups based on search
  const filteredGroups = searchQuery.trim()
    ? groups
        .map((group) => ({
          ...group,
          options: group.options.filter((opt) =>
            opt.label.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((group) => group.options.length > 0)
    : groups;

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <div onClick={() => setIsOpen(!isOpen)}>{triggerButton}</div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            right: 0,
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            zIndex: 1001,
            width,
            maxHeight,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <style>
            {`
              .search-dropdown-content::-webkit-scrollbar {
                width: 6px;
              }
              .search-dropdown-content::-webkit-scrollbar-track {
                background: #f9fafb;
                border-radius: 3px;
              }
              .search-dropdown-content::-webkit-scrollbar-thumb {
                background: #d1d5db;
                border-radius: 3px;
              }
              .search-dropdown-content::-webkit-scrollbar-thumb:hover {
                background: #9ca3af;
              }
            `}
          </style>

          {/* Search Input */}
          <div
            style={{
              padding: "8px",
              borderBottom: "1px solid #e5e7eb",
              flexShrink: 0,
            }}
          >
            <div style={{ position: "relative" }}>
              <i
                className={cn("fa-solid fa-search flex items-center justify-center")}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9ca3af",
                  fontSize: "12px",
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                style={{
                  width: "100%",
                  padding: "8px 12px 8px 32px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Scrollable Content */}
          <div
            className="search-dropdown-content"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "8px",
              scrollbarWidth: "thin",
              scrollbarColor: "#d1d5db #f9fafb",
            }}
          >
            {filteredGroups.length === 0 ? (
              <div style={{ padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#374151" }}>
                  {emptyStateTitle}
                </div>
                <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                  {emptyStateDescription}
                </div>
              </div>
            ) : (
              filteredGroups.map((group, index) => (
                <div key={index} style={{ marginBottom: index < filteredGroups.length - 1 ? 12 : 0 }}>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "6px",
                      paddingLeft: "8px",
                    }}
                  >
                    {group.groupLabel}
                  </div>
                  {group.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onChange(option.value);
                        option.onClick?.();
                        setIsOpen(false);
                        setSearchQuery("");
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        width: "100%",
                        padding: "8px 12px",
                        border: "none",
                        background: option.isActive ? "#f3f4f6" : "transparent",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "#374151",
                        textAlign: "left",
                        whiteSpace: "nowrap",
                      }}
                      onMouseOver={(e) => {
                        if (!option.isActive) {
                          e.currentTarget.style.background = "#f9fafb";
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!option.isActive) {
                          e.currentTarget.style.background = "transparent";
                        }
                      }}
                    >
                      {option.icon && <i className={cn(option.icon, "flex items-center justify-center shrink-0")} style={{ width: 16, height: 16 }} />}
                      <span style={{ whiteSpace: "nowrap" }}>{option.label}</span>
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Profile Dropdown Component (Avatar-style with profile header)
const ProfileDropdown: React.FC<DropdownProps> = ({
  options,
  onChange,
  triggerButton,
  isOpen: controlledIsOpen,
  onOpenChange,
  profileData,
  width = "240px",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, setIsOpen]);

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <div onClick={() => setIsOpen(!isOpen)}>{triggerButton}</div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            right: 0,
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            zIndex: 1001,
            padding: 0,
            width,
          }}
        >
          {/* Profile Info Section */}
          {profileData && (
            <div
              style={{
                padding: "16px",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {profileData.avatar}
              <div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#111827",
                    marginBottom: "2px",
                  }}
                >
                  {profileData.name}
                </div>
                {profileData.email && (
                  <div style={{ fontSize: "14px", color: "#6b7280" }}>{profileData.email}</div>
                )}
              </div>
            </div>
          )}

          {/* Menu Items */}
          <div style={{ padding: "8px" }}>
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  option.onClick?.();
                  setIsOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "8px 12px",
                  border: "none",
                  background: "transparent",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#374151",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = "#f3f4f6")}
                onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {option.icon && (
                  <div
                    style={{
                      width: 16,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i className={cn(option.icon, "flex items-center justify-center")} style={{ fontSize: 12, color: "#6b7280" }} />
                  </div>
                )}
                <span style={{ whiteSpace: "nowrap" }}>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const Dropdown: React.FC<DropdownProps> = ({
  variant = "default",
  onChange,
  ...props
}) => {
  if (variant === "menu") {
    return <MenuDropdown {...props} onChange={onChange} />;
  }

  if (variant === "search") {
    return <SearchDropdown {...props} onChange={onChange} />;
  }

  if (variant === "profile") {
    return <ProfileDropdown {...props} onChange={onChange} />;
  }

  // Default variant - custom styled dropdown
  return <DefaultDropdown {...props} onChange={onChange} />;
};
