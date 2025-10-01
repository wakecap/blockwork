import React from "react";

export interface StatusIndicatorProps {
  status: "online" | "offline" | "away" | "busy" | "active" | "inactive" | "pending" | "error";
  size?: "xs" | "sm" | "md" | "lg";
  showLabel?: boolean;
  labelPosition?: "left" | "right" | "top" | "bottom";
  variant?: "dot" | "ring" | "pulse";
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = "md",
  showLabel = false,
  labelPosition = "right",
  variant = "dot",
  className = "",
}) => {
  const statusConfig = {
    online: {
      color: "bg-success-500",
      ring: "ring-success-500",
      label: "Online",
      pulse: "animate-pulse",
    },
    offline: {
      color: "bg-neutral-400",
      ring: "ring-neutral-400",
      label: "Offline",
      pulse: "",
    },
    away: {
      color: "bg-warning-500",
      ring: "ring-warning-500",
      label: "Away",
      pulse: "",
    },
    busy: {
      color: "bg-error-500",
      ring: "ring-error-500",
      label: "Busy",
      pulse: "",
    },
    active: {
      color: "bg-success-500",
      ring: "ring-success-500",
      label: "Active",
      pulse: "",
    },
    inactive: {
      color: "bg-neutral-400",
      ring: "ring-neutral-400",
      label: "Inactive",
      pulse: "",
    },
    pending: {
      color: "bg-warning-500",
      ring: "ring-warning-500",
      label: "Pending",
      pulse: "animate-pulse",
    },
    error: {
      color: "bg-error-500",
      ring: "ring-error-500",
      label: "Error",
      pulse: "",
    },
  };

  const sizeConfig = {
    xs: {
      dot: "w-1.5 h-1.5",
      ring: "w-2 h-2",
      label: "text-xs",
    },
    sm: {
      dot: "w-2 h-2",
      ring: "w-3 h-3",
      label: "text-sm",
    },
    md: {
      dot: "w-2.5 h-2.5",
      ring: "w-4 h-4",
      label: "text-sm",
    },
    lg: {
      dot: "w-3 h-3",
      ring: "w-5 h-5",
      label: "text-base",
    },
  };

  const currentStatus = statusConfig[status];
  const currentSize = sizeConfig[size];

  const renderIndicator = () => {
    switch (variant) {
      case "dot":
        return (
          <div
            className={`${currentSize.dot} ${currentStatus.color} rounded-full ${currentStatus.pulse} ${className}`}
          />
        );
      case "ring":
        return (
          <div className={`${currentSize.ring} relative ${className}`}>
            <div className={`w-full h-full ${currentStatus.color} rounded-full`} />
            <div className={`absolute inset-0 ${currentStatus.ring} ring-2 rounded-full`} />
          </div>
        );
      case "pulse":
        return (
          <div className={`${currentSize.dot} relative ${className}`}>
            <div
              className={`w-full h-full ${currentStatus.color} rounded-full ${currentStatus.pulse}`}
            />
            <div
              className={`absolute inset-0 ${currentStatus.color} rounded-full animate-ping opacity-75`}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderLabel = () => {
    if (!showLabel) return null;

    return (
      <span className={`${currentSize.label} text-neutral-700 font-medium`}>
        {currentStatus.label}
      </span>
    );
  };

  const containerClasses = {
    left: "flex items-center gap-2",
    right: "flex items-center gap-2",
    top: "flex flex-col items-center gap-1",
    bottom: "flex flex-col items-center gap-1",
  };

  const content = (
    <>
      {labelPosition === "left" && renderLabel()}
      {labelPosition === "top" && renderLabel()}
      {renderIndicator()}
      {labelPosition === "right" && renderLabel()}
      {labelPosition === "bottom" && renderLabel()}
    </>
  );

  return <div className={containerClasses[labelPosition]}>{content}</div>;
};

// Predefined status indicator components
export const OnlineStatus: React.FC<{
  size?: "xs" | "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}> = ({ size = "md", showLabel = false, className = "" }) => (
  <StatusIndicator status="online" size={size} showLabel={showLabel} className={className} />
);

export const OfflineStatus: React.FC<{
  size?: "xs" | "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}> = ({ size = "md", showLabel = false, className = "" }) => (
  <StatusIndicator status="offline" size={size} showLabel={showLabel} className={className} />
);

export const AwayStatus: React.FC<{
  size?: "xs" | "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}> = ({ size = "md", showLabel = false, className = "" }) => (
  <StatusIndicator status="away" size={size} showLabel={showLabel} className={className} />
);

export const BusyStatus: React.FC<{
  size?: "xs" | "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}> = ({ size = "md", showLabel = false, className = "" }) => (
  <StatusIndicator status="busy" size={size} showLabel={showLabel} className={className} />
);

export const ActiveStatus: React.FC<{
  size?: "xs" | "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}> = ({ size = "md", showLabel = false, className = "" }) => (
  <StatusIndicator status="active" size={size} showLabel={showLabel} className={className} />
);

export const InactiveStatus: React.FC<{
  size?: "xs" | "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}> = ({ size = "md", showLabel = false, className = "" }) => (
  <StatusIndicator status="inactive" size={size} showLabel={showLabel} className={className} />
);
