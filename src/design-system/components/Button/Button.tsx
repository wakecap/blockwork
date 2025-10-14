import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../utils/utils";

const sizeVariants = {
  // Responsive sizes with mobile-first approach and touch-friendly targets
  xs: "h-7 px-2 py-1 text-xs gap-1 min-w-[44px] sm:h-6 sm:min-w-auto",
  sm: "h-9 px-3 py-1.5 text-sm gap-1.5 min-w-[44px] sm:h-8 sm:min-w-auto",
  md: "h-11 px-4 py-2 text-sm gap-2 min-w-[44px] sm:h-10 sm:min-w-auto",
  lg: "h-12 px-6 py-3 text-base gap-2.5 min-w-[44px] sm:h-12 sm:min-w-auto",
  xl: "h-14 px-8 py-4 text-lg gap-3 min-w-[44px] sm:h-14 sm:min-w-auto",
  icon: "h-11 w-11 p-0 text-sm gap-0 sm:h-10 sm:w-10",
  // Icon-only sizes - square buttons with proper scaling
  iconXs: "h-6 w-6 p-0 text-xs gap-0 sm:h-6 sm:w-6",
  iconSm: "h-8 w-8 p-0 text-sm gap-0 sm:h-8 sm:w-8",
  iconMd: "h-10 w-10 p-0 text-sm gap-0 sm:h-10 sm:w-10",
  iconLg: "h-12 w-12 p-0 text-base gap-0 sm:h-12 sm:w-12",
  iconXl: "h-14 w-14 p-0 text-lg gap-0 sm:h-14 sm:w-14",
};

const variants = {
  // Core variants with Blockwork Slate palette
  primary:
    "bg-bw-primary text-bw-on-primary border border-bw-primary hover:bg-bw-primary-hover hover:shadow-md active:bg-bw-primary-selected focus-visible:ring-bw-primary active:scale-[0.98] sm:active:scale-100",
  secondary:
    "bg-bw-bg-secondary text-bw-text-primary border border-bw-border-ui hover:bg-bw-bg-primary-hover active:bg-bw-primary-selected focus-visible:ring-bw-primary active:scale-[0.98] sm:active:scale-100",
  accent:
    "bg-bw-warning text-bw-on-primary border border-bw-warning hover:bg-bw-warning-hover hover:shadow-md active:bg-bw-warning-selected focus-visible:ring-bw-warning active:scale-[0.98] sm:active:scale-100",
  outline:
    "bg-transparent text-bw-primary border border-bw-primary hover:bg-bw-primary hover:text-bw-on-primary hover:shadow-sm focus-visible:ring-bw-primary active:scale-[0.98] sm:active:scale-100",
  ghost:
    "bg-transparent text-bw-text-secondary border border-transparent hover:bg-bw-bg-secondary hover:text-bw-text-primary focus-visible:ring-bw-primary active:scale-[0.98] sm:active:scale-100",
  text: "bg-transparent text-bw-text-primary border border-transparent hover:bg-bw-primary-highlighted hover:text-bw-text-secondary focus-visible:ring-bw-primary active:scale-[0.98] sm:active:scale-100",

  // Semantic variants with Blockwork colors
  success:
    "bg-bw-positive text-bw-on-primary border border-bw-positive hover:bg-bw-positive-hover hover:shadow-md active:bg-bw-positive-selected focus-visible:ring-bw-positive active:scale-[0.98] sm:active:scale-100",
  warning:
    "bg-bw-warning text-bw-on-primary border border-bw-warning hover:bg-bw-warning-hover hover:shadow-md active:bg-bw-warning-selected focus-visible:ring-bw-warning active:scale-[0.98] sm:active:scale-100",
  destructive:
    "bg-bw-negative text-bw-on-primary border border-bw-negative hover:bg-bw-negative-hover hover:shadow-md active:bg-bw-negative-selected focus-visible:ring-bw-negative active:scale-[0.98] sm:active:scale-100",
  info: "bg-bw-primary text-bw-on-primary border border-bw-primary hover:bg-bw-primary-hover hover:shadow-md active:bg-bw-primary-selected focus-visible:ring-bw-primary active:scale-[0.98] sm:active:scale-100",

  // Special variants with Blockwork colors
  pin: "bg-transparent text-bw-text-disabled border border-transparent hover:bg-bw-warning-selected hover:text-bw-warning focus-visible:ring-bw-warning active:scale-[0.95] sm:active:scale-100",
  nav: "bg-bw-primary text-bw-on-primary border border-bw-primary hover:bg-bw-primary-hover hover:shadow-md active:bg-bw-primary-selected focus-visible:ring-bw-primary active:scale-[0.98] sm:active:scale-100",
  fab: "bg-bw-warning text-bw-on-primary border border-bw-warning hover:bg-bw-warning-hover hover:shadow-xl active:bg-bw-warning-selected focus-visible:ring-bw-warning rounded-full fixed bottom-4 right-4 sm:bottom-6 sm:right-6 shadow-lg z-50 active:scale-[0.95] sm:active:scale-100",
  iconBtn:
    "bg-transparent text-bw-text-primary border border-transparent hover:bg-bw-bg-grey focus-visible:ring-bw-primary active:scale-[0.95] sm:active:scale-100",
};

type SizeVariants = keyof typeof sizeVariants;
type Variants = keyof typeof variants;

// Button variants using CVA with black-primary design system and responsive enhancements
const buttonVariants = cva(
  // Base classes with responsive touch targets, mobile optimizations, and RTL support
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden touch-manipulation select-none leading-none",
  {
    variants: {
      variant: variants,
      size: sizeVariants,
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

// Responsive icon size mapping - icons scale with button height
const iconSizeMap = {
  xs: "w-3 h-3 sm:w-3 sm:h-3", // 12px for h-7/h-6 buttons
  sm: "w-4 h-4 sm:w-4 sm:h-4", // 16px for h-9/h-8 buttons
  md: "w-5 h-5 sm:w-5 sm:h-5", // 20px for h-11/h-10 buttons
  lg: "w-6 h-6 sm:w-6 sm:h-6", // 24px for h-12 buttons
  xl: "w-7 h-7 sm:w-7 sm:h-7", // 28px for h-14 buttons
  icon: "w-5 h-5 sm:w-5 sm:h-5", // 20px for h-11/h-10 icon buttons
  // Icon-only sizes - icons scale with square button dimensions
  iconXs: "w-3 h-3 sm:w-3 sm:h-3", // 12px for 24px square buttons
  iconSm: "w-4 h-4 sm:w-4 sm:h-4", // 16px for 32px square buttons
  iconMd: "w-5 h-5 sm:w-5 sm:h-5", // 20px for 40px square buttons
  iconLg: "w-6 h-6 sm:w-6 sm:h-6", // 24px for 48px square buttons
  iconXl: "w-7 h-7 sm:w-7 sm:h-7", // 28px for 56px square buttons
};

// Minimal loading spinner component
const LoadingSpinner: React.FC<{ size: keyof typeof iconSizeMap }> = ({ size }) => (
  <div className={cn(iconSizeMap[size], "relative")}>
    <div className="absolute inset-0 rounded-full border-2 border-current border-t-transparent animate-spin-slow"></div>
  </div>
);

// Ripple effect component for enhanced interactions
const RippleEffect: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <span
    className={cn(
      "absolute inset-0 rounded-sm overflow-hidden",
      "before:absolute before:inset-0 before:bg-white before:opacity-0",
      "before:transition-opacity before:duration-150",
      isActive && "before:opacity-20",
    )}
  />
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // Icon props
  icon?: string;
  iconPosition?: "left" | "right";

  // Loading state
  loading?: boolean;
  loadingText?: string;

  // RTL support
  arabicText?: string;
  showArabicText?: boolean;

  // Special states
  isPinned?: boolean;
  isActive?: boolean;

  // Enhanced interactions
  ripple?: boolean;

  // Responsive features
  fullWidth?: boolean;
  fullWidthOnMobile?: boolean;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      iconPosition = "left",
      loading = false,
      loadingText,
      arabicText,
      showArabicText = false,
      isPinned = false,
      isActive = false,
      ripple = true,
      fullWidth = false,
      fullWidthOnMobile = false,
      children,
      disabled,
      onClick,
      onMouseDown,
      onMouseUp,
      ...props
    },
    ref,
  ) => {
    const [isPressed, setIsPressed] = React.useState(false);
    // const [isHovered, setIsHovered] = React.useState(false);

    // Handle button text with Arabic support
    const getButtonText = () => {
      if (loading && loadingText) return loadingText;
      if (showArabicText && arabicText) return arabicText;
      return children;
    };

    // Handle icon positioning with RTL support
    const getIconPosition = () => {
      // In RTL, flip the icon position
      if (showArabicText) {
        return iconPosition === "left" ? "right" : "left";
      }
      return iconPosition;
    };

    // Get font family based on language
    const getFontFamily = () => {
      if (showArabicText && arabicText) {
        return "font-arabic"; // IBM Plex Sans Arabic
      }
      return "font-sans"; // Figtree for English
    };

    // Get text direction
    const getTextDirection = () => {
      if (showArabicText && arabicText) {
        return "rtl";
      }
      return "ltr";
    };

    // Handle special pin state
    const getVariant = () => {
      if (variant === "pin" && isPinned) {
        return "accent"; // Use accent (orange) when pinned
      }
      return variant;
    };

    // Handle click with ripple effect
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return;
      onClick?.(e);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple) setIsPressed(true);
      onMouseDown?.(e);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple) setIsPressed(false);
      onMouseUp?.(e);
    };

    const handleMouseLeave = () => {
      if (ripple) setIsPressed(false);
      // setIsHovered(false);
    };

    // const handleMouseEnter = () => {
    //  setIsHovered(true);
    // };

    // Determine if button is icon-only
    const isIconOnly = !children && !loadingText && !arabicText;
    const effectiveSize = isIconOnly && !size?.startsWith("icon") ? "icon" : size;

    // Get the appropriate icon
    const displayIcon = loading ? undefined : icon;
    const showLoadingSpinner = loading;

    return (
      <button
        className={cn(
          buttonVariants({
            variant: getVariant(),
            size: effectiveSize,
            className,
          }),
          // Font family based on language
          getFontFamily(),
          // Responsive width classes
          fullWidth && "w-full",
          fullWidthOnMobile && "w-full sm:w-auto",
          // Additional state classes
          isActive && "ring-2 ring-offset-2 ring-bw-primary",
          isPinned && variant === "pin" && "bg-bw-warning-selected text-bw-warning",
        )}
        dir={getTextDirection()}
        ref={ref}
        disabled={disabled || loading}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        // onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={props.ariaLabel || (isIconOnly && icon ? "Button" : undefined)}
        aria-describedby={props.ariaDescribedBy}
        {...props}
      >
        {/* Ripple effect overlay */}
        {ripple && <RippleEffect isActive={isPressed} />}

        {/* Loading spinner */}
        {showLoadingSpinner && <LoadingSpinner size={effectiveSize || "md"} />}

        {/* Left icon */}
        {displayIcon && getIconPosition() === "left" && (
          <i className={cn(displayIcon, iconSizeMap[effectiveSize || "md"], "flex items-center justify-center shrink-0")} />
        )}

        {/* Button text */}
        {getButtonText() && <span className="relative z-10 flex items-center">{getButtonText()}</span>}

        {/* Right icon */}
        {displayIcon && getIconPosition() === "right" && (
          <i className={cn(displayIcon, iconSizeMap[effectiveSize || "md"], "flex items-center justify-center shrink-0")} />
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };

export type { SizeVariants, Variants };
