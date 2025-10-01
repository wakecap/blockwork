import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faUser,
  faCog,
  faSearch,
  faBell,
  faHome,
  faEnvelope,
  faPhone,
  faCheck,
  faTimes,
  faExclamation,
  faInfo,
  faPlus,
  faMinus,
  faEdit,
  faTrash,
  faSave,
  faDownload,
  faUpload,
  faPrint,
  faShare,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

// Icon component with size and color variants
export interface IconProps {
  icon: any;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  color?: "neutral" | "primary" | "success" | "error" | "warning" | "info";
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon,
  size = "base",
  color = "neutral",
  className = "",
}) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    base: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7",
    "2xl": "w-8 h-8",
    "3xl": "w-10 h-10",
    "4xl": "w-12 h-12",
  };

  const colorClasses = {
    neutral: "text-neutral-500",
    primary: "text-primary-600",
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-yellow-600",
    info: "text-blue-600",
  };

  return (
    <FontAwesomeIcon
      icon={icon}
      className={`${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    />
  );
};

// Icon showcase component
export const IconShowcase: React.FC = () => {
  const iconCategories = [
    {
      title: "Navigation",
      icons: [
        { icon: faHome, name: "Home" },
        { icon: faUser, name: "User" },
        { icon: faCog, name: "Settings" },
        { icon: faSearch, name: "Search" },
      ],
    },
    {
      title: "Actions",
      icons: [
        { icon: faPlus, name: "Add" },
        { icon: faMinus, name: "Remove" },
        { icon: faEdit, name: "Edit" },
        { icon: faTrash, name: "Delete" },
        { icon: faSave, name: "Save" },
        { icon: faCopy, name: "Copy" },
      ],
    },
    {
      title: "Status",
      icons: [
        { icon: faCheck, name: "Success" },
        { icon: faTimes, name: "Error" },
        { icon: faExclamation, name: "Warning" },
        { icon: faInfo, name: "Info" },
      ],
    },
    {
      title: "Communication",
      icons: [
        { icon: faEnvelope, name: "Email" },
        { icon: faPhone, name: "Phone" },
        { icon: faBell, name: "Notification" },
        { icon: faShare, name: "Share" },
      ],
    },
    {
      title: "Files",
      icons: [
        { icon: faDownload, name: "Download" },
        { icon: faUpload, name: "Upload" },
        { icon: faPrint, name: "Print" },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {iconCategories.map((category) => (
        <div key={category.title}>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">{category.title}</h3>
          <div className="grid grid-cols-6 gap-4">
            {category.icons.map((iconItem) => (
              <div
                key={iconItem.name}
                className="flex flex-col items-center p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <Icon icon={iconItem.icon} size="lg" color="neutral" />
                <span className="text-xs text-neutral-600 mt-2 text-center">{iconItem.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Icon sizes component
export const IconSizes: React.FC = () => {
  const sizes: Array<{ size: IconProps["size"]; label: string }> = [
    { size: "xs", label: "XS (12px)" },
    { size: "sm", label: "SM (16px)" },
    { size: "base", label: "Base (20px)" },
    { size: "lg", label: "LG (24px)" },
    { size: "xl", label: "XL (28px)" },
    { size: "2xl", label: "2XL (32px)" },
    { size: "3xl", label: "3XL (40px)" },
    { size: "4xl", label: "4XL (48px)" },
  ];

  return (
    <div className="space-y-4">
      {sizes.map(({ size, label }) => (
        <div key={size} className="flex items-center gap-4">
          <Icon icon={faHeart} size={size} color="primary" />
          <span className="text-sm text-neutral-700">{label}</span>
        </div>
      ))}
    </div>
  );
};

// Icon colors component
export const IconColors: React.FC = () => {
  const colors: Array<{ color: IconProps["color"]; label: string }> = [
    { color: "neutral", label: "Neutral" },
    { color: "primary", label: "Primary" },
    { color: "success", label: "Success" },
    { color: "error", label: "Error" },
    { color: "warning", label: "Warning" },
    { color: "info", label: "Info" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {colors.map(({ color, label }) => (
        <div
          key={color}
          className="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg"
        >
          <Icon icon={faHeart} size="lg" color={color} />
          <span className="text-sm text-neutral-700">{label}</span>
        </div>
      ))}
    </div>
  );
};
