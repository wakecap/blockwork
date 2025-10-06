export const menu = [
  { id: "site-map", icon: "fa-solid fa-map", label: "Site Map" }, // Regular (outlined)
  { id: "workforce", icon: "fa-solid fa-hard-hat", label: "Workforce" }, // Solid (not available in regular)
  { id: "crew", icon: "fa-solid fa-user", label: "Crew" }, // Regular (outlined)
  { id: "obs", icon: "fa-solid fa-sitemap", label: "OBS" }, // Solid (not available in regular)
  { id: "hardware-management", icon: "fa-solid fa-microchip", label: "Hardware Management" }, // Solid (not available in regular)
  { id: "reports", icon: "fa-solid fa-chart-column", label: "Reports" }, // Solid (not available in regular)
  { id: "observation-manager", icon: "fa-solid fa-user-shield", label: "Observation Manager" }, // Solid (not available in regular)
  { id: "verify-response", icon: "fa-solid fa-shield", label: "VerifyResponse" }, // Solid (not available in regular)
  { id: "cctv-ai", icon: "fa-solid fa-video", label: "CCTV AI" }, // Solid (not available in regular)
  { id: "weather-station", icon: "fa-solid fa-cloud-sun", label: "Weather Station", badge: "Beta" }, // Solid (not available in regular)
  { id: "digital-clinic", icon: "fa-solid fa-house-medical", label: "Digital Clinic" }, // Solid (not available in regular)
  { id: "verify-progress", icon: "fa-solid fa-list-alt", label: "VerifyProgress" }, // Regular (outlined)
  { id: "verify-time", icon: "fa-solid fa-clock", label: "VerifyTime" }, // Regular (outlined)
  { id: "lookahead-planning", icon: "fa-solid fa-list-alt", label: "Lookahead Planning" }, // Regular (outlined)
];

export const settingsMenu = [
  { id: "verify-time-settings", icon: "fa-solid fa-clock", label: "VerifyTime" },
  { id: "crews-settings", icon: "fa-solid fa-users", label: "Crews" },
  { id: "directory-settings", icon: "fa-solid fa-building", label: "Directory" },
  { id: "resource-assignment", icon: "fa-solid fa-plus", label: "Resource Assignment" },
  { id: "data-lookups", icon: "fa-solid fa-database", label: "Data & Lookups" },
  { id: "reports-settings", icon: "fa-solid fa-file-alt", label: "Reports Settings" },
  { id: "observation-settings", icon: "fa-solid fa-user-cog", label: "Observation Settings" },
];

export const avatarMenu = [
  { id: "logout", icon: "fa-solid fa-sign-out-alt", label: "Logout" },
  { id: "back-to-organization", icon: "fa-solid fa-arrow-left", label: "Back to Organization" },
];

export type MenuItem = {
  id: string;
  icon: string;
  label: string;
  badge?: string;
};

export type MenuData = {
  menu: MenuItem[];
  settingsMenu: MenuItem[];
  avatarMenu: MenuItem[];
};
