import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../../utils/utils";
import { Checkbox } from "../Checkbox/Checkbox";

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
  variant?: "default" | "search" | "profile" | "searchable" | "multiselect";
  width?: string;
  maxHeight?: string;
  error?: string;
  // For grouped/search variant
  groups?: DropdownGroup[];
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  // For profile variant
  profileData?: ProfileData;
  // Button trigger (for search/profile/searchable/multiselect variants)
  triggerButton?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  // For multiselect variant
  selectedValues?: string[];
  onMultiChange?: (values: string[]) => void;
  showSelectAll?: boolean;
  placeholder?: string;
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
  error,
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
          className={cn(
            "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-all",
            error ? "border border-bw-negative" : "border border-gray-300",
            disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : "bg-white cursor-pointer",
            !disabled && !error && "hover:border-gray-400",
            !disabled && error && "hover:border-bw-negative-hover"
          )}
          style={{
            gap: "12px",
          }}
        >
          <span style={{ flex: 1, textAlign: "left" }}>
            {selectedOption?.label || "Select..."}
          </span>
          <i
            className={cn("fa-solid fa-chevron-down flex items-center justify-center shrink-0")}
            style={{
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
      {error && <p className="mt-1 text-xs text-bw-negative">{error}</p>}
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
            left: 0,
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
            left: 0,
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

// Searchable Dropdown Component (Simple searchable variant)
const SearchableDropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  className,
  disabled,
  width = "auto",
  maxHeight = "240px",
  searchPlaceholder = "Search...",
  placeholder = "Select...",
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Click-away handler
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
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  // Filter options based on search
  const filteredOptions = searchQuery.trim()
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  return (
    <div className={cn("font-sans", className)} ref={dropdownRef}>
      {label && <label className="block mb-1 text-sm font-medium text-neutral-700">{label}</label>}
      <div style={{ position: "relative", width }}>
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-all",
            error ? "border border-bw-negative" : "border border-gray-300",
            disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : "bg-white cursor-pointer",
            !disabled && !error && "hover:border-gray-400",
            !disabled && error && "hover:border-bw-negative-hover"
          )}
          style={{
            gap: "12px",
          }}
        >
          <span style={{ flex: 1, textAlign: "left" }}>
            {selectedOption?.label || placeholder}
          </span>
          <i
            className={cn("fa-solid fa-chevron-down flex items-center justify-center shrink-0")}
            style={{
              fontSize: "10px",
              color: "#6b7280",
            }}
          />
        </button>

        {isOpen && !disabled && (
          <>
            <style>
              {`
                .searchable-dropdown-menu::-webkit-scrollbar {
                  width: 6px;
                }
                .searchable-dropdown-menu::-webkit-scrollbar-track {
                  background: #f9fafb;
                  border-radius: 3px;
                }
                .searchable-dropdown-menu::-webkit-scrollbar-thumb {
                  background: #d1d5db;
                  border-radius: 3px;
                }
                .searchable-dropdown-menu::-webkit-scrollbar-thumb:hover {
                  background: #9ca3af;
                }
              `}
            </style>
            <div
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
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Search Input */}
              <div style={{ padding: "8px", borderBottom: "1px solid #e5e7eb" }}>
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
                    ref={searchInputRef}
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

              {/* Options List */}
              <div
                className="searchable-dropdown-menu"
                style={{
                  maxHeight,
                  overflowY: "auto",
                  padding: "4px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#d1d5db #f9fafb",
                }}
              >
                {filteredOptions.length === 0 ? (
                  <div style={{ padding: "16px", textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
                    No results found
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onChange(option.value);
                        setIsOpen(false);
                        setSearchQuery("");
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
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-bw-negative">{error}</p>}
    </div>
  );
};

// Multi-Select Dropdown Component
const MultiSelectDropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onChange,
  className,
  disabled,
  width = "auto",
  maxHeight = "240px",
  selectedValues = [],
  onMultiChange,
  showSelectAll = true,
  placeholder = "Select options...",
  searchPlaceholder = "Search...",
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click-away handler
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
  }, [isOpen]);

  // Filter options based on search
  const filteredOptions = searchQuery.trim()
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const handleToggle = (optionValue: string) => {
    if (!onMultiChange) return;
    
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((v) => v !== optionValue)
      : [...selectedValues, optionValue];
    
    onMultiChange(newValues);
  };

  const handleSelectAll = () => {
    if (!onMultiChange) return;
    
    if (selectedValues.length === options.length) {
      onMultiChange([]);
    } else {
      onMultiChange(options.map((opt) => opt.value));
    }
  };

  const allSelected = selectedValues.length === options.length && options.length > 0;
  const someSelected = selectedValues.length > 0 && selectedValues.length < options.length;

  const displayText = selectedValues.length === 0 
    ? placeholder 
    : selectedValues.length === 1
    ? options.find(opt => opt.value === selectedValues[0])?.label || placeholder
    : `${selectedValues.length} items selected`;

  return (
    <div className={cn("font-sans", className)} ref={dropdownRef}>
      {label && <label className="block mb-1 text-sm font-medium text-neutral-700">{label}</label>}
      <div style={{ position: "relative", width }}>
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm transition-all",
            error ? "border border-bw-negative" : "border border-gray-300",
            disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : "bg-white cursor-pointer",
            !disabled && !error && "hover:border-gray-400",
            !disabled && error && "hover:border-bw-negative-hover",
            selectedValues.length > 0 ? "text-gray-700" : "text-gray-400"
          )}
          style={{
            gap: "12px",
          }}
        >
          <span style={{ flex: 1, textAlign: "left" }}>
            {displayText}
          </span>
          <i
            className={cn("fa-solid fa-chevron-down flex items-center justify-center shrink-0")}
            style={{
              fontSize: "10px",
              color: "#6b7280",
            }}
          />
        </button>

        {isOpen && !disabled && (
          <>
            <style>
              {`
                .multiselect-dropdown-menu::-webkit-scrollbar {
                  width: 6px;
                }
                .multiselect-dropdown-menu::-webkit-scrollbar-track {
                  background: #f9fafb;
                  border-radius: 3px;
                }
                .multiselect-dropdown-menu::-webkit-scrollbar-thumb {
                  background: #d1d5db;
                  border-radius: 3px;
                }
                .multiselect-dropdown-menu::-webkit-scrollbar-thumb:hover {
                  background: #9ca3af;
                }
              `}
            </style>
            <div
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
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Search Input */}
              <div style={{ padding: "8px", borderBottom: "1px solid #e5e7eb" }}>
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

              {/* Options List */}
              <div
                className="multiselect-dropdown-menu"
                style={{
                  maxHeight,
                  overflowY: "auto",
                  padding: "4px",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#d1d5db #f9fafb",
                }}
              >
                {/* Select All Option */}
                {showSelectAll && !searchQuery && (
                  <div
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                      marginBottom: "4px",
                      paddingBottom: "4px",
                    }}
                  >
                    <div
                      onClick={handleSelectAll}
                      style={{
                        padding: "4px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "background 0.15s",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "#f9fafb";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          label={`Select All${someSelected && !allSelected ? ` (${selectedValues.length} selected)` : ''}`}
                          checked={allSelected}
                          onChange={handleSelectAll}
                          className="font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {filteredOptions.length === 0 ? (
                  <div style={{ padding: "16px", textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
                    No results found
                  </div>
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <div
                        key={option.value}
                        onClick={() => handleToggle(option.value)}
                        style={{
                          padding: "4px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          background: isSelected ? "#f3f4f6" : "transparent",
                          transition: "background 0.15s",
                        }}
                        onMouseOver={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.background = "#f9fafb";
                          }
                        }}
                        onMouseOut={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.background = "transparent";
                          }
                        }}
                      >
                        <Checkbox
                          label={option.label}
                          checked={isSelected}
                          onChange={() => handleToggle(option.value)}
                        />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-bw-negative">{error}</p>}
    </div>
  );
};

export const Dropdown: React.FC<DropdownProps> = ({
  variant = "default",
  onChange,
  ...props
}) => {
  if (variant === "search") {
    return <SearchDropdown {...props} onChange={onChange} />;
  }

  if (variant === "profile") {
    return <ProfileDropdown {...props} onChange={onChange} />;
  }

  if (variant === "searchable") {
    return <SearchableDropdown {...props} onChange={onChange} />;
  }

  if (variant === "multiselect") {
    return <MultiSelectDropdown {...props} onChange={onChange} />;
  }

  // Default variant - custom styled dropdown
  return <DefaultDropdown {...props} onChange={onChange} />;
};
