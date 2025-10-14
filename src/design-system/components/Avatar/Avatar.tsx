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
    },
    sm: {
      container: "w-[32px] h-[32px]", // 32px × 32px
      text: "text-sm",
    },
    md: {
      container: "w-[40px] h-[40px]", // 40px × 40px
      text: "text-base",
    },
    lg: {
      container: "w-[48px] h-[48px]", // 48px × 48px
      text: "text-lg",
    },
    xl: {
      container: "w-[56px] h-[56px]", // 56px × 56px
      text: "text-xl",
    },
    // Icon-only sizes - exact pixel dimensions using custom styles
    iconXs: {
      container: "w-[24px] h-[24px]", // 24px × 24px
      text: "text-xs",
    },
    iconSm: {
      container: "w-[32px] h-[32px]", // 32px × 32px
      text: "text-sm",
    },
    iconMd: {
      container: "w-[40px] h-[40px]", // 40px × 40px
      text: "text-base",
    },
    iconLg: {
      container: "w-[48px] h-[48px]", // 48px × 48px
      text: "text-lg",
    },
    iconXl: {
      container: "w-[56px] h-[56px]", // 56px × 56px
      text: "text-xl",
    },
  };

  const statusColors = {
    online: "bg-bw-positive",
    offline: "bg-bw-text-disabled",
    away: "bg-bw-warning",
    busy: "bg-bw-negative",
  };

  const statusPositionClasses = {
    "top-right": "top-[-6px] right-[-6px]",
    "top-left": "top-[-6px] left-[-6px]",
    "bottom-right": "bottom-[-6px] right-[-6px]",
    "bottom-left": "bottom-[-6px] left-[-6px]",
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
          className={`w-full h-full flex items-center justify-center bg-bw-bg-secondary text-bw-text-primary font-medium ${currentSize.text} ${shapeClass}`}
        >
          <div className="flex items-center gap-1">
            <span>{userInitials}</span>
            {showChevron && (
              <i
                className="fa-solid fa-chevron-down text-bw-text-primary"
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
        className={`w-full h-full flex items-center justify-center bg-bw-bg-grey text-bw-text-secondary ${shapeClass}`}
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
            absolute ${statusPositionClasses[statusPosition]}
            w-[12px] h-[12px] ${statusColors[status]} rounded-full
            border-[3px] border-bw-fixed-light box-content
          `}
        />
      )}
    </div>
  );
};
