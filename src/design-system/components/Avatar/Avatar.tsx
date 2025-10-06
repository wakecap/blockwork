import React from "react";
import { cn } from "../../../utils/utils";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "iconXs" | "iconSm" | "iconMd" | "iconLg" | "iconXl";
  status?: "online" | "offline" | "away" | "busy";
  statusPosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  fallbackIcon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  showChevron?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  initials,
  size = "md",
  status,
  statusPosition = "bottom-right",
  fallbackIcon,
  className = "",
  onClick,
  showChevron = false,
}) => {
  const [imageError, setImageError] = React.useState(false);

  const sizeClasses = {
    // Regular sizes - updated to match your specifications
    xs: {
      container: "w-[24px] h-[24px]", // 24px × 24px
      text: "text-xs",
      status: "w-1.5 h-1.5",
      statusOffset: "translate-x-0.5 -translate-y-0.5",
    },
    sm: {
      container: "w-[32px] h-[32px]", // 32px × 32px
      text: "text-sm",
      status: "w-2 h-2",
      statusOffset: "translate-x-0.5 -translate-y-0.5",
    },
    md: {
      container: "w-[40px] h-[40px]", // 40px × 40px
      text: "text-base",
      status: "w-2.5 h-2.5",
      statusOffset: "translate-x-0.5 -translate-y-0.5",
    },
    lg: {
      container: "w-[48px] h-[48px]", // 48px × 48px
      text: "text-lg",
      status: "w-3 h-3",
      statusOffset: "translate-x-1 -translate-y-1",
    },
    xl: {
      container: "w-[56px] h-[56px]", // 56px × 56px
      text: "text-xl",
      status: "w-4 h-4",
      statusOffset: "translate-x-1 -translate-y-1",
    },
    // Icon-only sizes - exact pixel dimensions using custom styles
    iconXs: {
      container: "w-[24px] h-[24px]", // 24px × 24px
      text: "text-xs",
      status: "w-1.5 h-1.5",
      statusOffset: "translate-x-0.5 -translate-y-0.5",
    },
    iconSm: {
      container: "w-[32px] h-[32px]", // 32px × 32px
      text: "text-sm",
      status: "w-2 h-2",
      statusOffset: "translate-x-0.5 -translate-y-0.5",
    },
    iconMd: {
      container: "w-[40px] h-[40px]", // 40px × 40px
      text: "text-base",
      status: "w-2.5 h-2.5",
      statusOffset: "translate-x-0.5 -translate-y-0.5",
    },
    iconLg: {
      container: "w-[48px] h-[48px]", // 48px × 48px
      text: "text-lg",
      status: "w-3 h-3",
      statusOffset: "translate-x-1 -translate-y-1",
    },
    iconXl: {
      container: "w-[56px] h-[56px]", // 56px × 56px
      text: "text-xl",
      status: "w-4 h-4",
      statusOffset: "translate-x-1 -translate-y-1",
    },
  };

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-neutral-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  };

  const statusPositionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
  };

  const currentSize = sizeClasses[size];
  const shapeClass = "rounded-sm"; // Default to small rounded corners (squared with small radius)
  const cursorClass = onClick ? "cursor-pointer" : "";

  const handleImageError = () => {
    setImageError(true);
  };

  // Generate initials from name if provided
  const getInitials = () => {
    if (initials) return initials;
    if (name) {
      return name
        .split(" ")[0] // Take only the first name
        .charAt(0)
        .toUpperCase(); // Take only the first letter of the first name
    }
    return null;
  };

  const renderContent = () => {
    if (src && !imageError) {
      return (
        <img
          src={src}
          alt={alt || "Avatar"}
          className={`w-full h-full object-cover ${shapeClass}`}
          onError={handleImageError}
        />
      );
    }

    const userInitials = getInitials();
    if (userInitials) {
      return (
        <div
          className={`w-full h-full flex items-center justify-center bg-neutral-300 text-black font-medium ${currentSize.text} ${shapeClass}`}
        >
          <div className="flex items-center gap-1">
            <span>{userInitials}</span>
            {showChevron && (
              <i
                className="fa-solid fa-chevron-down text-black"
                style={{
                  fontSize: size === "xs" ? "6px" : size === "sm" ? "8px" : "10px",
                }}
              />
            )}
          </div>
        </div>
      );
    }

    return (
      <div
        className={`w-full h-full flex items-center justify-center bg-neutral-200 text-neutral-600 ${shapeClass}`}
      >
        {fallbackIcon || <i className={cn(currentSize.text, "fa-solid fa-user")} />}
      </div>
    );
  };

  return (
    <div
      className={`relative inline-block ${currentSize.container} ${cursorClass} ${className}`}
      onClick={onClick}
    >
      {renderContent()}

      {status && (
        <div
          className={`
            absolute ${statusPositionClasses[statusPosition]} ${currentSize.statusOffset}
            ${currentSize.status} ${statusColors[status]} ${shapeClass}
            border-2 border-white
          `}
        />
      )}
    </div>
  );
};
