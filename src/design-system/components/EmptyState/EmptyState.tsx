import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faSearch,
  faFile,
  faUsers,
  faExclamation,
  type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: IconDefinition | string;
  variant?: "default" | "search" | "files" | "users" | "error";
  action?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  variant = "default",
  action,
  size = "md",
  className = "",
}) => {
  const defaultIcons = {
    default: faInbox,
    search: faSearch,
    files: faFile,
    users: faUsers,
    error: faExclamation,
  };

  const sizeClasses = {
    sm: {
      container: "p-6",
      icon: "w-8 h-8",
      title: "text-lg",
      description: "text-sm",
    },
    md: {
      container: "p-8",
      icon: "w-12 h-12",
      title: "text-xl",
      description: "text-base",
    },
    lg: {
      container: "p-12",
      icon: "w-16 h-16",
      title: "text-2xl",
      description: "text-lg",
    },
  };

  const currentSize = sizeClasses[size];
  const currentIcon = icon || defaultIcons[variant];

  return (
    <div className={`text-center ${currentSize.container} ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        <div className={`${currentSize.icon} text-neutral-400`}>
          <FontAwesomeIcon icon={currentIcon} className="w-full h-full" />
        </div>

        <div className="space-y-2">
          <h3 className={`${currentSize.title} font-medium text-neutral-900`}>{title}</h3>
          {description && (
            <p className={`${currentSize.description} text-neutral-600 max-w-md mx-auto`}>
              {description}
            </p>
          )}
        </div>

        {action && <div className="pt-2">{action}</div>}
      </div>
    </div>
  );
};

// Predefined empty state components
export const EmptySearchResults: React.FC<{
  searchTerm?: string;
  onClearSearch?: () => void;
  className?: string;
}> = ({ searchTerm, onClearSearch, className = "" }) => (
  <EmptyState
    title="No results found"
    description={
      searchTerm
        ? `No results found for "${searchTerm}". Try adjusting your search terms.`
        : "No results match your current filters."
    }
    variant="search"
    action={
      onClearSearch && (
        <button
          onClick={onClearSearch}
          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          Clear search
        </button>
      )
    }
    className={className}
  />
);

export const EmptyFiles: React.FC<{
  onUpload?: () => void;
  className?: string;
}> = ({ onUpload, className = "" }) => (
  <EmptyState
    title="No files yet"
    description="Get started by uploading your first file to see it here."
    variant="files"
    action={
      onUpload && (
        <button
          onClick={onUpload}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Upload Files
        </button>
      )
    }
    className={className}
  />
);

export const EmptyUsers: React.FC<{
  onInvite?: () => void;
  className?: string;
}> = ({ onInvite, className = "" }) => (
  <EmptyState
    title="No team members"
    description="Start building your team by inviting the first member."
    variant="users"
    action={
      onInvite && (
        <button
          onClick={onInvite}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Invite Team Member
        </button>
      )
    }
    className={className}
  />
);

export const EmptyError: React.FC<{
  onRetry?: () => void;
  className?: string;
}> = ({ onRetry, className = "" }) => (
  <EmptyState
    title="Something went wrong"
    description="We encountered an error while loading this content. Please try again."
    variant="error"
    action={
      onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Try Again
        </button>
      )
    }
    className={className}
  />
);
