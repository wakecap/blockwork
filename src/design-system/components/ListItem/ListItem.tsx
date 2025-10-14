import React from "react";
import { cn } from "../../../utils/utils";

export interface ListItemProps {
  title: string;
  subtitle?: string;
  description?: string;
  avatar?: string;
  icon?: string;
  actions?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  variant?: "single-line" | "multi-line" | "with-avatar" | "with-icon";
  size?: "sm" | "md" | "lg";
  isSelected?: boolean;
  isDisabled?: boolean;
  isClickable?: boolean;
  showDivider?: boolean;
  onClick?: () => void;
  onSelect?: (selected: boolean) => void;
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  description,
  avatar,
  icon,
  actions,
  leading,
  trailing,
  variant = "single-line",
  size = "md",
  isSelected = false,
  isDisabled = false,
  isClickable = false,
  showDivider = true,
  onClick,
  onSelect,
  className = "",
}) => {
  const sizeStyles = {
    sm: "py-2 px-3",
    md: "py-3 px-4",
    lg: "py-4 px-6",
  };

  const baseClasses = `
    flex items-center
    ${sizeStyles[size]}
    ${isClickable || onClick ? "cursor-pointer hover:bg-neutral-50" : ""}
    ${isSelected ? "bg-primary-50 border-primary-200" : ""}
    ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
    ${showDivider ? "border-b border-neutral-100" : ""}
    transition-colors duration-150
    ${className}
  `.trim();

  const handleClick = () => {
    if (isDisabled) return;

    if (onSelect) {
      onSelect(!isSelected);
    } else if (onClick) {
      onClick();
    }
  };

  const renderLeading = () => {
    if (leading) return leading;

    if (avatar) {
      return (
        <div className="flex-shrink-0 mr-3">
          <img src={avatar} alt={title} className="w-10 h-10 rounded-full object-cover" />
        </div>
      );
    }

    if (icon) {
      return (
        <div className="flex-shrink-0 mr-3">
          <i className={cn("w-5 h-5 text-neutral-500", icon)} />
        </div>
      );
    }

    return null;
  };

  const renderTrailing = () => {
    if (trailing) return trailing;

    if (onSelect !== undefined) {
      return (
        <div className="flex-shrink-0 ml-3">
          <i
            className={cn(
              "w-4 h-4",
              isSelected
                ? "text-success-500 fa-solid fa-check"
                : "text-neutral-400 fa-solid fa-times",
            )}
          />
        </div>
      );
    }

    if (isClickable || onClick) {
      return (
        <div className="flex-shrink-0 ml-3">
          <i className="w-4 h-4 text-neutral-400 fa-solid fa-chevron-right" />
        </div>
      );
    }

    return null;
  };

  const content = (
    <>
      {renderLeading()}

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h3
              className={`font-medium text-neutral-900 truncate font-heading ${
                variant === "multi-line" ? "mb-1" : ""
              }`}
            >
              {title}
            </h3>

            {subtitle && <p className="text-sm text-neutral-600 truncate font-sans">{subtitle}</p>}

            {description && variant === "multi-line" && (
              <p className="text-sm text-neutral-500 mt-1 line-clamp-2 font-sans">{description}</p>
            )}
          </div>

          {actions && <div className="flex-shrink-0 ml-3">{actions}</div>}
        </div>
      </div>

      {renderTrailing()}
    </>
  );

  if (onClick || isClickable) {
    return (
      <div
        className={baseClasses}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {content}
      </div>
    );
  }

  return <div className={baseClasses}>{content}</div>;
};

// Predefined list item components
export const UserListItem: React.FC<{
  name: string;
  email: string;
  avatar: string;
  role: string;
  isOnline?: boolean;
  onMessage?: () => void;
  onViewProfile?: () => void;
  className?: string;
}> = ({
  name,
  email,
  avatar,
  role,
  isOnline = false,
  onMessage,
  onViewProfile,
  className = "",
}) => (
  <ListItem
    title={name}
    subtitle={email}
    description={role}
    avatar={avatar}
    variant="multi-line"
    isClickable
    className={className}
    leading={
      <div className="relative">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
        <div
          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
            isOnline ? "bg-success-500" : "bg-neutral-400"
          }`}
        />
      </div>
    }
    actions={
      <div className="flex space-x-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMessage?.();
          }}
          className="p-1 text-neutral-400 hover:text-primary-600 transition-colors"
        >
          <i className="w-4 h-4 fa-solid fa-ellipsis-v" />
        </button>
      </div>
    }
  />
);

export const FileListItem: React.FC<{
  name: string;
  size: string;
  modified: string;
  icon: string;
  onDownload?: () => void;
  onDelete?: () => void;
  className?: string;
}> = ({ name, size, modified, icon, onDownload, onDelete, className = "" }) => (
  <ListItem
    title={name}
    subtitle={`${size} • Modified ${modified}`}
    icon={icon}
    variant="single-line"
    className={className}
    actions={
      <div className="flex space-x-1">
        {onDownload && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload();
            }}
            className="p-1 text-neutral-400 hover:text-primary-600 transition-colors"
          >
            Download
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 text-neutral-400 hover:text-error-600 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    }
  />
);

export const NotificationListItem: React.FC<{
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  icon: string;
  onMarkAsRead?: () => void;
  onDelete?: () => void;
  className?: string;
}> = ({ title, message, time, isRead, icon, onMarkAsRead, onDelete, className = "" }) => (
  <ListItem
    title={title}
    subtitle={message}
    description={time}
    icon={icon}
    variant="multi-line"
    className={`${className} ${!isRead ? "bg-blue-50" : ""}`}
    leading={
      <div className="relative">
        <i className={cn("w-5 h-5", isRead ? "text-neutral-500" : "text-blue-500", icon)} />
        {!isRead && <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />}
      </div>
    }
    actions={
      <div className="flex space-x-1">
        {!isRead && onMarkAsRead && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkAsRead();
            }}
            className="p-1 text-neutral-400 hover:text-primary-600 transition-colors"
          >
            Mark as read
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 text-neutral-400 hover:text-error-600 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    }
  />
);

export const SelectableListItem: React.FC<{
  title: string;
  subtitle?: string;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
  className?: string;
}> = ({ title, subtitle, isSelected, onSelect, className = "" }) => (
  <ListItem
    title={title}
    subtitle={subtitle}
    variant="single-line"
    isSelected={isSelected}
    onSelect={onSelect}
    className={className}
  />
);
