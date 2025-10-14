import React from "react";
import { cn } from "../../../utils/utils";

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  variant?: "default" | "full" | "half";
  showHandle?: boolean;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  variant = "default",
  showHandle = true,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = "",
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [startY, setStartY] = React.useState(0);
  const [currentY, setCurrentY] = React.useState(0);
  const sheetRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, closeOnEscape]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const newY = e.touches[0].clientY;
    setCurrentY(newY);

    // Prevent scrolling when dragging down
    if (newY > startY) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    const deltaY = currentY - startY;

    // Close if dragged down more than 100px
    if (deltaY > 100) {
      onClose();
    }
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  const variantStyles = {
    default: "max-h-96",
    half: "max-h-1/2",
    full: "max-h-full",
  };

  const currentVariant = variantStyles[variant];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-1400 flex items-end bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        ref={sheetRef}
        className={`w-full bg-white rounded-t-lg shadow-xl ${currentVariant} ${className}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Handle */}
        {showHandle && (
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-neutral-300 rounded-full" />
          </div>
        )}

        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
            {title && <h2 className="text-lg font-semibold text-neutral-900 font-heading">{title}</h2>}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label="Close bottom sheet"
              >
                <i className={cn("fa-solid fa-times", "w-5 h-5")} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

// Action Sheet component
export const ActionSheet: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  actions: Array<{
    label: string;
    icon?: string;
    onClick: () => void;
    variant?: "default" | "danger" | "cancel";
    disabled?: boolean;
  }>;
  className?: string;
}> = ({ isOpen, onClose, title, actions, className = "" }) => {
  const handleActionClick = (action: (typeof actions)[0]) => {
    if (!action.disabled) {
      action.onClick();
      onClose();
    }
  };

  const getActionStyles = (variant: string) => {
    switch (variant) {
      case "danger":
        return "text-error-600 hover:bg-error-50";
      case "cancel":
        return "text-neutral-600 hover:bg-neutral-50";
      default:
        return "text-neutral-900 hover:bg-neutral-50";
    }
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      variant="default"
      className={className}
    >
      <div className="p-4 space-y-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleActionClick(action)}
            disabled={action.disabled}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              action.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } ${getActionStyles(action.variant || "default")}`}
          >
            {action.icon && <i className={cn(action.icon, "w-5 h-5")} />}
            <span className="font-medium font-sans">{action.label}</span>
          </button>
        ))}
      </div>
    </BottomSheet>
  );
};

// Form Bottom Sheet component
export const FormBottomSheet: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  onSubmit: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}> = ({
  isOpen,
  onClose,
  title,
  children,
  submitText = "Submit",
  cancelText = "Cancel",
  onSubmit,
  onCancel,
  isLoading = false,
  className = "",
}) => {
  const handleSubmit = () => {
    onSubmit();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      variant="half"
      className={className}
    >
      <div className="p-4 space-y-6">
        <div>{children}</div>

        <div className="flex space-x-3 pt-4 border-t border-neutral-200">
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-3 text-neutral-700 bg-neutral-200 rounded-lg hover:bg-neutral-300 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Loading..." : submitText}
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};
