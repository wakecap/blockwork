import React from "react";
import { cn } from "../../../utils/utils";

export interface AlertProps {
  title?: string;
  message: string;
  variant?: "success" | "error" | "warning" | "info";
  showIcon?: boolean;
  showCloseButton?: boolean;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  title,
  message,
  variant = "info",
  showIcon = true,
  showCloseButton = false,
  onClose,
  className = "",
  children,
}) => {
  const variantStyles = {
    success: {
      background: "bg-bw-positive-selected",
      border: "border-bw-positive",
      title: "text-bw-positive",
      message: "text-bw-positive",
      icon: "fa-solid fa-check",
      iconColor: "text-bw-positive",
    },
    error: {
      background: "bg-bw-negative-selected",
      border: "border-bw-negative",
      title: "text-bw-negative",
      message: "text-bw-negative",
      icon: "fa-solid fa-times",
      iconColor: "text-bw-negative",
    },
    warning: {
      background: "bg-bw-warning-selected",
      border: "border-bw-warning",
      title: "text-bw-warning",
      message: "text-bw-warning",
      icon: "fa-solid fa-exclamation",
      iconColor: "text-bw-warning",
    },
    info: {
      background: "bg-bw-primary-selected",
      border: "border-bw-primary",
      title: "text-bw-primary",
      message: "text-bw-primary",
      icon: "fa-solid fa-info",
      iconColor: "text-bw-primary",
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <div
      className={`${currentVariant.background} ${currentVariant.border} border rounded-lg p-4 ${className}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {showIcon && (
          <i
            className={cn(`${currentVariant.iconColor} mt-0.5 flex-shrink-0`, currentVariant.icon)}
          />
        )}
        <div className="flex-1 min-w-0">
          {title && <h3 className={`${currentVariant.title} font-medium text-sm mb-1 font-heading`}>{title}</h3>}
          <div className={`${currentVariant.message} text-sm font-sans`}>{message}</div>
          {children && <div className="mt-3">{children}</div>}
        </div>
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className={`${currentVariant.message} hover:opacity-70 transition-opacity flex-shrink-0`}
            aria-label="Close alert"
          >
            <i className="fa-solid fa-xmark w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
