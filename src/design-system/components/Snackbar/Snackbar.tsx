import React from "react";
import { cn } from "../../../utils/utils";

export interface SnackbarProps {
  message: string;
  variant?: "success" | "error" | "warning" | "info";
  isOpen: boolean;
  onClose: () => void;
  autoHideDuration?: number;
  showCloseButton?: boolean;
  position?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
  className?: string;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  variant = "info",
  isOpen,
  onClose,
  autoHideDuration = 5000,
  showCloseButton = true,
  position = "bottom-right",
  className = "",
}) => {
  React.useEffect(() => {
    if (isOpen && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoHideDuration, onClose]);

  const variantStyles = {
    success: {
      background: "bg-success-50",
      border: "border-success-200",
      text: "text-success-800",
      icon: "fa-solid fa-check",
      iconColor: "text-success-600",
    },
    error: {
      background: "bg-error-50",
      border: "border-error-200",
      text: "text-error-800",
      icon: "fa-solid fa-times",
      iconColor: "text-error-600",
    },
    warning: {
      background: "bg-warning-50",
      border: "border-warning-200",
      text: "text-warning-800",
      icon: "fa-solid fa-exclamation",
      iconColor: "text-warning-600",
    },
    info: {
      background: "bg-info-50",
      border: "border-info-200",
      text: "text-info-800",
      icon: "fa-solid fa-info",
      iconColor: "text-info-600",
    },
  };

  const positionStyles = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
  };

  const currentVariant = variantStyles[variant];
  const currentPosition = positionStyles[position];

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-1700 ${currentPosition} max-w-sm w-full ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div
        className={`${currentVariant.background} ${currentVariant.border} border rounded-lg shadow-lg p-4 transition-all duration-300 ease-out-quart animate-slide-in-from-bottom`}
      >
        <div className="flex items-start gap-3">
          <i
            className={cn(
              `${currentVariant.iconColor} mt-0.5 flex-shrink-0`,
              currentVariant.icon
            )}
          />
          <div className={`flex-1 ${currentVariant.text} text-sm`}>{message}</div>
          {showCloseButton && (
            <button
              onClick={onClose}
              className={`${currentVariant.text} hover:opacity-70 transition-opacity flex-shrink-0`}
              aria-label="Close notification"
            >
              <i className="w-4 h-4 fa-solid fa-xmark" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
