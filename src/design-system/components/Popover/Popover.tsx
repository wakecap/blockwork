import React from "react";
import { cn } from "../../../utils/utils";

export interface PopoverProps {
  content: React.ReactNode;
  children: React.ReactElement;
  isOpen: boolean;
  onClose: () => void;
  position?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
  showCloseButton?: boolean;
  maxWidth?: string;
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  content,
  children,
  isOpen,
  onClose,
  position = "bottom",
  variant = "default",
  size = "md",
  showArrow = true,
  showCloseButton = false,
  maxWidth = "300px",
  className = "",
}) => {
  const popoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const variantStyles = {
    default: "bg-white text-neutral-900 border border-neutral-200 shadow-lg",
    light: "bg-white text-neutral-900 border border-neutral-200 shadow-lg",
    dark: "bg-neutral-800 text-white border border-neutral-700 shadow-lg",
  };

  const sizeStyles = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const positionStyles = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
    "top-left": "bottom-full right-0 mb-2",
    "top-right": "bottom-full left-0 mb-2",
    "bottom-left": "top-full right-0 mt-2",
    "bottom-right": "top-full left-0 mt-2",
  };

  const arrowStyles = {
    top: "top-full left-1/2 transform -translate-x-1/2 border-t-neutral-200",
    bottom: "bottom-full left-1/2 transform -translate-x-1/2 border-b-neutral-200",
    left: "left-full top-1/2 transform -translate-y-1/2 border-l-neutral-200",
    right: "right-full top-1/2 transform -translate-y-1/2 border-r-neutral-200",
    "top-left": "top-full right-2 border-t-neutral-200",
    "top-right": "top-full left-2 border-t-neutral-200",
    "bottom-left": "bottom-full right-2 border-b-neutral-200",
    "bottom-right": "bottom-full left-2 border-b-neutral-200",
  };

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];
  const currentPosition = positionStyles[position];
  const currentArrow = arrowStyles[position];

  if (!isOpen) {
    return children;
  }

  return (
    <div className="relative inline-block">
      {children}
      <div
        ref={popoverRef}
        className={`absolute z-1500 ${currentPosition} ${currentVariant} ${currentSize} rounded-lg ${className}`}
        style={{ maxWidth }}
        role="dialog"
        aria-modal="true"
      >
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label="Close"
          >
            <i className="w-4 h-4 fa-solid fa-times" />
          </button>
        )}

        <div className="relative">
          {content}
          {showArrow && (
            <div className={`absolute w-0 h-0 border-4 border-transparent ${currentArrow}`} />
          )}
        </div>
      </div>
    </div>
  );
};

// Predefined popover components
export const MenuPopover: React.FC<{
  items: Array<{
    label: string;
    icon?: any;
    onClick: () => void;
    disabled?: boolean;
  }>;
  children: React.ReactElement;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}> = ({ items, children, isOpen, onClose, className = "" }) => (
  <Popover
    content={
      <div className="min-w-48">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              if (!item.disabled) {
                item.onClick();
                onClose();
              }
            }}
            disabled={item.disabled}
            className={`w-full flex items-center space-x-3 px-3 py-2 text-left text-sm rounded hover:bg-neutral-100 transition-colors ${
              item.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {item.icon && <i className={cn("w-4 h-4 text-neutral-500", item.icon)} />}
            <span className="font-sans">{item.label}</span>
          </button>
        ))}
      </div>
    }
    isOpen={isOpen}
    onClose={onClose}
    variant="light"
    size="sm"
    className={className}
  >
    {children}
  </Popover>
);

export const InfoPopover: React.FC<{
  title: string;
  content: string;
  children: React.ReactElement;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}> = ({ title, content, children, isOpen, onClose, className = "" }) => (
  <Popover
    content={
      <div className="space-y-2">
        <h3 className="font-medium text-neutral-900 font-heading">{title}</h3>
        <p className="text-sm text-neutral-600 font-sans">{content}</p>
      </div>
    }
    isOpen={isOpen}
    onClose={onClose}
    variant="light"
    size="md"
    showCloseButton
    className={className}
  >
    {children}
  </Popover>
);

export const FormPopover: React.FC<{
  title: string;
  children: React.ReactNode;
  trigger: React.ReactElement;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}> = ({ title, children, trigger, isOpen, onClose, className = "" }) => (
  <Popover
    content={
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-neutral-900 font-heading">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <i className="w-4 h-4 fa-solid fa-times" />
          </button>
        </div>
        {children}
      </div>
    }
    isOpen={isOpen}
    onClose={onClose}
    variant="light"
    size="lg"
    className={className}
  >
    {trigger}
  </Popover>
);
