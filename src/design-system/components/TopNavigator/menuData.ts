import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

// Import regular (outlined) icons where available
import {
  faMap,
  faUser,
  faClock as faClockRegular,
  faListAlt,
} from "@fortawesome/pro-regular-svg-icons";
// Import solid icons for those not available in regular
import {
  faHardHat,
  faSitemap,
  faMicrochip,
  faChartColumn,
  faUserShield,
  faShield,
  faVideo,
  faCloudSun,
  faHouseMedical,
  faClock,
  faUsers,
  faBuilding,
  faPlus,
  faDatabase,
  faFileAlt,
  faUserCog,
  faSignOutAlt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

export const menu = [
  { id: "site-map", icon: faMap, label: "Site Map" }, // Regular (outlined)
  { id: "workforce", icon: faHardHat, label: "Workforce" }, // Solid (not available in regular)
  { id: "crew", icon: faUser, label: "Crew" }, // Regular (outlined)
  { id: "obs", icon: faSitemap, label: "OBS" }, // Solid (not available in regular)
  { id: "hardware-management", icon: faMicrochip, label: "Hardware Management" }, // Solid (not available in regular)
  { id: "reports", icon: faChartColumn, label: "Reports" }, // Solid (not available in regular)
  { id: "observation-manager", icon: faUserShield, label: "Observation Manager" }, // Solid (not available in regular)
  { id: "verify-response", icon: faShield, label: "VerifyResponse" }, // Solid (not available in regular)
  { id: "cctv-ai", icon: faVideo, label: "CCTV AI" }, // Solid (not available in regular)
  { id: "weather-station", icon: faCloudSun, label: "Weather Station", badge: "Beta" }, // Solid (not available in regular)
  { id: "digital-clinic", icon: faHouseMedical, label: "Digital Clinic" }, // Solid (not available in regular)
  { id: "verify-progress", icon: faListAlt, label: "VerifyProgress" }, // Regular (outlined)
  { id: "verify-time", icon: faClockRegular, label: "VerifyTime" }, // Regular (outlined)
  { id: "lookahead-planning", icon: faListAlt, label: "Lookahead Planning" }, // Regular (outlined)
];

export const settingsMenu = [
  { id: "verify-time-settings", icon: faClock, label: "VerifyTime" },
  { id: "crews-settings", icon: faUsers, label: "Crews" },
  { id: "directory-settings", icon: faBuilding, label: "Directory" },
  { id: "resource-assignment", icon: faPlus, label: "Resource Assignment" },
  { id: "data-lookups", icon: faDatabase, label: "Data & Lookups" },
  { id: "reports-settings", icon: faFileAlt, label: "Reports Settings" },
  { id: "observation-settings", icon: faUserCog, label: "Observation Settings" },
];

export const avatarMenu = [
  { id: "logout", icon: faSignOutAlt, label: "Logout" },
  { id: "back-to-organization", icon: faArrowLeft, label: "Back to Organization" },
];

export type MenuItem = {
  id: string;
  icon: IconDefinition;
  label: string;
  badge?: string;
};

export type MenuData = {
  menu: MenuItem[];
  settingsMenu: MenuItem[];
  avatarMenu: MenuItem[];
};
