import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faBars,
  faRocket as faRocketRegular,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

import { MegaDropdown } from "../MegaDropdown/MegaDropdown";
import { Button } from "../Button/Button";
import { Avatar } from "../Avatar/Avatar";
import { SearchInput } from "../SearchInput/SearchInput";
import { EmptyState } from "../EmptyState/EmptyState";
import type { ProjectsData } from "./projectsData";
import type { MenuItem } from "./menuData";

const Logo = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M24 6.00746V0.5H18.4134L16.581 3.23134L14.6592 0.5H9.2514L7.41899 3.23134L5.49721 0.5H0V6.00746L4.64804 15.5H10.1006L11.9777 12.7687L13.8101 15.5H19.3966L24 6.00746Z"
      fill="black"
    />
  </svg>
);

export interface TopNavigatorProps {
  projectsData: ProjectsData;
  maxVisibleItems?: number;
  menu: MenuItem[];
  settingsMenu: MenuItem[];
  avatarMenu: MenuItem[];
  selectedProject?: string; // ID of the selected project
  selectedMenuItem?: string; // ID of the selected menu item
  initialPinnedItems?: string[]; // Array of menu item IDs to pin initially
  onProjectSelect?: (project: { id: string; name: string }) => void;
  onAvatarMenuItemClick?: (item: MenuItem) => void;
  onMenuItemClick?: (item: MenuItem) => void;
  onSettingsMenuItemClick?: (item: MenuItem) => void;
  onPinnedItemsChange?: (pinnedIds: string[]) => void; // Callback to get current pinned item IDs
  onPinnedItemClick?: (item: { id: string; icon: IconDefinition; label: string }) => void; // Callback for pinned item clicks
}

export const TopNavigator = ({
  projectsData,
  maxVisibleItems: initialMaxVisibleItems = 4,
  menu,
  settingsMenu,
  avatarMenu,
  selectedProject,
  selectedMenuItem,
  initialPinnedItems = [],
  onProjectSelect,
  onAvatarMenuItemClick,
  onMenuItemClick,
  onSettingsMenuItemClick,
  onPinnedItemsChange,
  onPinnedItemClick,
}: TopNavigatorProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [pinnedItems, setPinnedItems] = useState<
    Array<{ id: string; icon: IconDefinition; label: string }>
  >([]);
  const [pinnedStates, setPinnedStates] = useState<Record<string, boolean>>({});
  const [overflowMenuOpen, setOverflowMenuOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);
  // Find the selected project from projectsData
  const findProjectById = useCallback(
    (projectId: string) => {
      for (const orgGroup of projectsData) {
        const project = orgGroup.projects.find((p) => p.id === projectId);
        if (project) {
          return project;
        }
      }
      return null;
    },
    [projectsData],
  );

  const [currentProject, setCurrentProject] = useState(() => {
    if (selectedProject) {
      const foundProject = findProjectById(selectedProject);
      if (foundProject) {
        return foundProject;
      }
    }
    return {
      id: "proj-1",
      name: "Construction Site Alpha",
    };
  });
  const [projectSearchQuery, setProjectSearchQuery] = useState("");
  const [maxVisibleItems, setMaxVisibleItems] = useState(4); // Default to 4 items
  const navRef = useRef<HTMLDivElement>(null);
  const pinnedContainerRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);

  // Click-away handler removed - MegaDropdown handles its own click-away logic

  // Debug: Track dropdownOpen state changes
  useEffect(() => {
    console.log("dropdownOpen state changed to:", dropdownOpen);
  }, [dropdownOpen]);

  useEffect(() => {
    if (initialMaxVisibleItems) {
      setMaxVisibleItems(initialMaxVisibleItems);
    }
  }, [initialMaxVisibleItems]);

  // Update currentProject when selectedProject prop changes
  useEffect(() => {
    if (selectedProject) {
      const foundProject = findProjectById(selectedProject);
      if (foundProject) {
        setCurrentProject(foundProject);
      }
    }
  }, [selectedProject, findProjectById]);

  // Initialize pinned items based on initialPinnedItems prop
  useEffect(() => {
    if (initialPinnedItems.length > 0) {
      const pinnedItemsFromIds = menu
        .filter((item) => initialPinnedItems.includes(item.id))
        .map((item) => ({
          id: item.id,
          icon: item.icon,
          label: item.label,
        }));

      setPinnedItems(pinnedItemsFromIds);

      // Also set the pinned states
      const initialPinnedStates = initialPinnedItems.reduce(
        (acc, id) => {
          acc[id] = true;
          return acc;
        },
        {} as Record<string, boolean>,
      );

      setPinnedStates(initialPinnedStates);
    }
  }, [initialPinnedItems, menu]);

  const handlePinChange = (items: Array<{ id: string; icon: IconDefinition; label: string }>) => {
    setPinnedItems(items);
    // Call the callback with the current pinned item IDs
    onPinnedItemsChange?.(items.map((item) => item.id));
  };

  const handlePinStateChange = (pinnedStates: Record<string, boolean>) => {
    setPinnedStates(pinnedStates);
  };

  // Click-away handler for overflow menu
  useEffect(() => {
    if (!overflowMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (pinnedContainerRef.current && !pinnedContainerRef.current.contains(e.target as Node)) {
        setOverflowMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [overflowMenuOpen]);

  // Click-away handler for settings menu
  useEffect(() => {
    if (!settingsMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [settingsMenuOpen]);

  // Click-away handler for avatar menu
  useEffect(() => {
    if (!avatarMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [avatarMenuOpen]);

  // Click-away handler for project menu
  useEffect(() => {
    if (!projectMenuOpen) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;

      // Don't close if clicking inside the project menu or on the project button itself
      if (projectRef.current && projectRef.current.contains(target)) {
        return;
      }

      // Don't close if clicking on the project button (the one that opens the menu)
      if (
        target.closest("button") &&
        target.closest("button")?.textContent?.includes(currentProject.name)
      ) {
        return;
      }

      // Close if clicking outside the project menu
      setProjectMenuOpen(false);
      setProjectSearchQuery(""); // Clear search when closing
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [projectMenuOpen, currentProject.name]);

  // Calculate visible and overflow items
  const visibleItems = pinnedItems.slice(0, maxVisibleItems);
  const overflowItems = pinnedItems.slice(maxVisibleItems);
  const hasOverflow = overflowItems.length > 0;

  // Filter projects based on search query (memoized for performance)
  const filteredProjectsData = useMemo(() => {
    if (!projectSearchQuery.trim()) {
      return projectsData;
    }

    const query = projectSearchQuery.toLowerCase();
    const filtered = projectsData
      .map((orgGroup) => ({
        ...orgGroup,
        projects: orgGroup.projects.filter(
          (project) =>
            project.name.toLowerCase().includes(query) ||
            orgGroup.organizationName.toLowerCase().includes(query),
        ),
      }))
      .filter((orgGroup) => orgGroup.projects.length > 0);

    // Limit results for performance (max 50 projects total)
    let totalProjects = 0;
    const limitedResults = [];
    for (const orgGroup of filtered) {
      if (totalProjects >= 50) break;
      const remainingSlots = 50 - totalProjects;
      const limitedProjects = orgGroup.projects.slice(0, remainingSlots);
      if (limitedProjects.length > 0) {
        limitedResults.push({
          ...orgGroup,
          projects: limitedProjects,
        });
        totalProjects += limitedProjects.length;
      }
    }

    return limitedResults;
  }, [projectSearchQuery, projectsData]);

  // Create menu with onClick handlers and active state
  const menuWithCallbacks = useMemo(() => {
    return menu.map((item) => ({
      ...item,
      onClick: () => onMenuItemClick?.(item),
      isActive: selectedMenuItem === item.id,
    }));
  }, [menu, onMenuItemClick, selectedMenuItem]);

  // Create settings menu with onClick handlers and active state
  const settingsMenuWithCallbacks = useMemo(() => {
    return settingsMenu.map((item) => ({
      ...item,
      onClick: () => onSettingsMenuItemClick?.(item),
      isActive: selectedMenuItem === item.id,
    }));
  }, [settingsMenu, onSettingsMenuItemClick, selectedMenuItem]);

  // Memoized handlers for better performance
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectSearchQuery(e.target.value);
  }, []);

  const handleProjectSelect = useCallback(
    (project: { id: string; name: string }) => {
      setCurrentProject(project);
      setProjectMenuOpen(false);
      setProjectSearchQuery("");
      onProjectSelect?.(project);
    },
    [onProjectSelect],
  );

  // Helper function to truncate project name to prevent button width changes
  const truncateProjectName = (name: string, maxLength: number = 20) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + "...";
  };

  return (
    <div ref={navRef} style={{ position: "relative", width: "100%" }}>
      {/* Blur overlay when dropdown is open */}
      {dropdownOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(4px)",
            zIndex: 998,
            pointerEvents: "none",
          }}
        />
      )}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#ffffff",
          borderBottom: `1px solid ${dropdownOpen ? "#ffffff" : "#f3f4f6"}`,
          padding: "8px 12px",
          height: 50,
          width: "100%",
          position: "relative",
          zIndex: 1000,
        }}
      >
        {/* Left side: Logo and dashboard menu button */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Logo />

          {/* Project Selector - Hidden (moved to right side) */}
          <div style={{ display: "none" }}>
            <Button
              variant="secondary"
              size="sm"
              icon={faCaretDown}
              iconPosition="right"
              onClick={() => setProjectMenuOpen(!projectMenuOpen)}
              style={{ minWidth: "140px" }}
            >
              {truncateProjectName(currentProject.name)}
            </Button>

            {/* Project dropdown menu */}
            {projectMenuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  marginTop: 4,
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                  width: 320,
                  maxHeight: 400,
                  display: "flex",
                  flexDirection: "column",
                }}
                className="project-dropdown"
              >
                <style>
                  {`
                    .project-dropdown .scrollable-content::-webkit-scrollbar {
                      width: 6px;
                    }
                    .project-dropdown .scrollable-content::-webkit-scrollbar-track {
                      background: #f9fafb;
                      border-radius: 3px;
                    }
                    .project-dropdown .scrollable-content::-webkit-scrollbar-thumb {
                      background: #d1d5db;
                      border-radius: 3px;
                    }
                    .project-dropdown .scrollable-content::-webkit-scrollbar-thumb:hover {
                      background: #9ca3af;
                    }
                  `}
                </style>

                {/* Fixed Search Input */}
                <div
                  style={{
                    padding: 8,
                    paddingBottom: 8,
                    borderBottom: "1px solid #e5e7eb",
                    flexShrink: 0,
                  }}
                >
                  <SearchInput
                    placeholder="Search projects or organizations..."
                    value={projectSearchQuery}
                    onChange={handleSearchChange}
                    onClear={() => setProjectSearchQuery("")}
                    showClearButton={true}
                  />
                </div>

                {/* Scrollable Content */}
                <div
                  className="scrollable-content"
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: 8,
                    scrollbarWidth: "thin",
                    scrollbarColor: "#d1d5db #f9fafb",
                  }}
                >
                  {filteredProjectsData.length === 0 ? (
                    <div style={{ maxWidth: "100%", overflow: "hidden" }}>
                      <EmptyState
                        title="No projects found"
                        description={
                          projectSearchQuery
                            ? `No results found for "${projectSearchQuery}". Try adjusting your search terms.`
                            : "No projects match your current search."
                        }
                        variant="search"
                        size="sm"
                        className="max-w-none"
                      />
                    </div>
                  ) : (
                    filteredProjectsData.map((orgGroup, orgIndex) => (
                      <div
                        key={orgGroup.organizationId}
                        style={{
                          marginBottom: orgIndex < filteredProjectsData.length - 1 ? 12 : 0,
                        }}
                      >
                        {/* Organization header */}
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 500,
                            color: "#9ca3af",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            marginBottom: 6,
                            paddingLeft: 8,
                          }}
                        >
                          {orgGroup.organizationName}
                        </div>

                        {/* Projects in this organization */}
                        {orgGroup.projects.map((project) => (
                          <button
                            key={project.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 12,
                              width: "100%",
                              padding: "8px 12px",
                              border: "none",
                              background:
                                selectedProject === project.id ||
                                currentProject.name === project.name
                                  ? "#f3f4f6"
                                  : "transparent",
                              borderRadius: 4,
                              cursor: "pointer",
                              fontSize: 14,
                              color: "#374151",
                              textAlign: "left",
                              whiteSpace: "nowrap",
                            }}
                            onMouseOver={(e) => {
                              if (
                                selectedProject !== project.id &&
                                currentProject.name !== project.name
                              ) {
                                e.currentTarget.style.background = "#f9fafb";
                              }
                            }}
                            onMouseOut={(e) => {
                              if (
                                selectedProject !== project.id &&
                                currentProject.name !== project.name
                              ) {
                                e.currentTarget.style.background = "transparent";
                              }
                            }}
                            onClick={() => handleProjectSelect(project)}
                          >
                            <Avatar name={orgGroup.organizationName} size="xs" />
                            <span style={{ whiteSpace: "nowrap" }}>{project.name}</span>
                          </button>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <Button
            variant="iconBtn"
            icon={faBars}
            size="iconSm"
            aria-label="Dashboard menu"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              // Add small delay to prevent click-away handler interference
              setTimeout(() => {
                setDropdownOpen((currentState) => {
                  const newState = !currentState;
                  console.log(`Toggling mega menu: ${currentState} -> ${newState}`);
                  return newState;
                });
              }, 10);
            }}
          />
          {/* Separator line between grid icon and pinned items */}
          {pinnedItems.length > 0 && (
            <div
              style={{
                width: 1,
                height: 24,
                background: "#e5e7eb",
                marginLeft: 4,
                marginRight: 4,
              }}
            />
          )}
          {/* Pinned items */}
          {pinnedItems.length > 0 && (
            <div
              ref={pinnedContainerRef}
              style={{ display: "flex", alignItems: "center", gap: 2, position: "relative" }}
            >
              {/* Visible pinned items */}
              {visibleItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  aria-label={item.label}
                  onClick={() => onPinnedItemClick?.(item)}
                >
                  {item.label}
                </Button>
              ))}

              {/* Overflow button */}
              {hasOverflow && (
                <div style={{ position: "relative" }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`${overflowItems.length} more pinned items`}
                    onClick={() => setOverflowMenuOpen(!overflowMenuOpen)}
                  >
                    +{overflowItems.length}
                  </Button>

                  {/* Overflow dropdown menu */}
                  {overflowMenuOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        marginTop: 4,
                        background: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: 6,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        zIndex: 1000,
                        padding: 8,
                        width: 240,
                      }}
                    >
                      {overflowItems.map((item) => (
                        <button
                          key={item.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            width: "100%",
                            padding: "8px 12px",
                            border: "none",
                            background: "transparent",
                            borderRadius: 4,
                            cursor: "pointer",
                            fontSize: 14,
                            color: "#374151",
                            textAlign: "left",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          onMouseOver={(e) => (e.currentTarget.style.background = "#f3f4f6")}
                          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                          onClick={() => {
                            setOverflowMenuOpen(false);
                            onPinnedItemClick?.(item);
                          }}
                        >
                          <span
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              flex: 1,
                            }}
                          >
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {/* Right side: Settings, Project, Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div ref={settingsRef} style={{ position: "relative" }}>
            <Button
              variant="iconBtn"
              icon={faRocketRegular}
              size="iconSm"
              aria-label="Settings"
              onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}
            />

            {/* Settings dropdown menu */}
            {settingsMenuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: 4,
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                  padding: 8,
                  width: 220,
                }}
              >
                {settingsMenuWithCallbacks.map((item) => (
                  <button
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      width: "100%",
                      padding: "8px 12px",
                      border: "none",
                      background: item.isActive ? "#EFF6FF" : "transparent",
                      borderLeft: item.isActive ? "3px solid #3B82F6" : "3px solid transparent",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontSize: 14,
                      color: "#374151",
                      textAlign: "left",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    onMouseOver={(e) => {
                      if (!item.isActive) {
                        e.currentTarget.style.background = "#f3f4f6";
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!item.isActive) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                    onClick={() => {
                      setSettingsMenuOpen(false);
                      onSettingsMenuItemClick?.(item);
                    }}
                  >
                    <div
                      style={{
                        width: 16,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        style={{ fontSize: 12, color: "#6b7280" }}
                      />
                    </div>
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        flex: 1,
                      }}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Project Selector - Right Side */}
          <div style={{ position: "relative" }}>
            <Button
              variant="secondary"
              size="sm"
              icon={faCaretDown}
              iconPosition="right"
              onClick={() => setProjectMenuOpen(!projectMenuOpen)}
              style={{ minWidth: "140px" }}
            >
              {truncateProjectName(currentProject.name)}
            </Button>

            {/* Project dropdown menu - right aligned */}
            {projectMenuOpen && (
              <div
                ref={projectRef}
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: 4,
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                  width: 320,
                  maxHeight: 400,
                  display: "flex",
                  flexDirection: "column",
                }}
                className="project-dropdown"
              >
                <style>
                  {`
                    .project-dropdown .scrollable-content::-webkit-scrollbar {
                      width: 6px;
                    }
                    .project-dropdown .scrollable-content::-webkit-scrollbar-track {
                      background: #f9fafb;
                      border-radius: 3px;
                    }
                    .project-dropdown .scrollable-content::-webkit-scrollbar-thumb {
                      background: #d1d5db;
                      border-radius: 3px;
                    }
                    .project-dropdown .scrollable-content::-webkit-scrollbar-thumb:hover {
                      background: #9ca3af;
                    }
                  `}
                </style>

                {/* Fixed Search Input */}
                <div
                  style={{
                    padding: 8,
                    paddingBottom: 8,
                    borderBottom: "1px solid #e5e7eb",
                    flexShrink: 0,
                  }}
                >
                  <SearchInput
                    placeholder="Search projects or organizations..."
                    value={projectSearchQuery}
                    onChange={handleSearchChange}
                    onClear={() => setProjectSearchQuery("")}
                    showClearButton={true}
                  />
                </div>

                {/* Scrollable Content */}
                <div
                  className="scrollable-content"
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: 8,
                    scrollbarWidth: "thin",
                    scrollbarColor: "#d1d5db #f9fafb",
                  }}
                >
                  {filteredProjectsData.length === 0 ? (
                    <div style={{ maxWidth: "100%", overflow: "hidden" }}>
                      <EmptyState
                        title="No projects found"
                        description={
                          projectSearchQuery
                            ? `No results found for "${projectSearchQuery}". Try adjusting your search terms.`
                            : "No projects match your current search."
                        }
                        size="sm"
                      />
                    </div>
                  ) : (
                    filteredProjectsData.map((orgGroup, orgIndex) => (
                      <div key={orgIndex} style={{ marginBottom: 16 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#6b7280",
                            marginBottom: 8,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {orgGroup.organizationName}
                        </div>
                        {orgGroup.projects.map((project) => (
                          <button
                            key={project.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              width: "100%",
                              padding: "8px 12px",
                              border: "none",
                              background:
                                selectedProject === project.id ||
                                currentProject.name === project.name
                                  ? "#f3f4f6"
                                  : "transparent",
                              borderRadius: 4,
                              cursor: "pointer",
                              fontSize: 14,
                              color: "#374151",
                              textAlign: "left",
                              marginBottom: 2,
                            }}
                            onMouseOver={(e) => {
                              if (
                                selectedProject !== project.id &&
                                currentProject.name !== project.name
                              ) {
                                e.currentTarget.style.background = "#f9fafb";
                              }
                            }}
                            onMouseOut={(e) => {
                              if (
                                selectedProject !== project.id &&
                                currentProject.name !== project.name
                              ) {
                                e.currentTarget.style.background = "transparent";
                              }
                            }}
                            onClick={() => handleProjectSelect(project)}
                          >
                            <Avatar name={orgGroup.organizationName} size="xs" />
                            <span style={{ whiteSpace: "nowrap" }}>{project.name}</span>
                          </button>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          <div ref={avatarRef} style={{ position: "relative" }}>
            <Avatar
              name="Admin User"
              size="sm"
              onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
            />

            {/* Avatar dropdown menu */}
            {avatarMenuOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: 4,
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                  padding: 0,
                  width: 240,
                }}
              >
                {/* User info section */}
                <div
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid #e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Avatar name="Alaa" size="md" />
                  <div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#111827",
                        marginBottom: 2,
                      }}
                    >
                      Alaa
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: "#6b7280",
                      }}
                    >
                      alaa@wakecap.com
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                <div style={{ padding: 8 }}>
                  {avatarMenu.map((item) => (
                    <button
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        width: "100%",
                        padding: "8px 12px",
                        border: "none",
                        background: "transparent",
                        borderRadius: 4,
                        cursor: "pointer",
                        fontSize: 14,
                        color: "#374151",
                        textAlign: "left",
                        whiteSpace: "nowrap",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.background = "#f3f4f6")}
                      onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                      onClick={() => {
                        setAvatarMenuOpen(false);
                        onAvatarMenuItemClick?.(item);
                      }}
                    >
                      <div
                        style={{
                          width: 16,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          style={{ fontSize: 12, color: "#6b7280" }}
                        />
                      </div>
                      <span style={{ whiteSpace: "nowrap" }}>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      {dropdownOpen && (
        <MegaDropdown
          menu={menuWithCallbacks}
          open={dropdownOpen}
          onClose={() => {
            console.log("MegaDropdown onClose called");
            setDropdownOpen(false);
          }}
          onPinChange={handlePinChange}
          onPinStateChange={handlePinStateChange}
          pinnedStates={pinnedStates}
        />
      )}
    </div>
  );
};
