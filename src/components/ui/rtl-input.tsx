import * as React from "react"
import { cn } from "@/src/utils/utils"
import { useLanguage } from "./language-provider"

export interface RTLInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  // Arabic support
  arabicLabel?: string
  arabicPlaceholder?: string
  arabicError?: string
  arabicSuccess?: string
  showArabicText?: boolean
}

const RTLInput = React.forwardRef<HTMLInputElement, RTLInputProps>(
  ({ 
    className, 
    type, 
    label,
    error,
    success,
    iconLeft,
    iconRight,
    arabicLabel,
    arabicPlaceholder,
    arabicError,
    arabicSuccess,
    showArabicText = false,
    ...props 
  }, ref) => {
    const { isRTL } = useLanguage();
    
    // Get text based on language preference
    const getLabelText = () => {
      if (showArabicText && arabicLabel) {
        return arabicLabel;
      }
      return label;
    };

    const getPlaceholderText = () => {
      if (showArabicText && arabicPlaceholder) {
        return arabicPlaceholder;
      }
      return props.placeholder;
    };

    const getErrorText = () => {
      if (showArabicText && arabicError) {
        return arabicError;
      }
      return error;
    };

    const getSuccessText = () => {
      if (showArabicText && arabicSuccess) {
        return arabicSuccess;
      }
      return success;
    };

    // Determine icon positions based on RTL
    const leftIcon = isRTL ? iconRight : iconLeft;
    const rightIcon = isRTL ? iconLeft : iconRight;
    const leftIconClass = isRTL ? 'pr-9' : 'pl-9';
    const rightIconClass = isRTL ? 'pl-9' : 'pr-9';

    return (
      <div className="w-full">
        {getLabelText() && (
          <label className={cn(
            "block mb-1 text-sm font-medium text-foreground",
            isRTL && "text-right"
          )}>
            {getLabelText()}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className={cn(
              "absolute text-muted-foreground z-10",
              isRTL ? "right-3" : "left-3"
            )}>
              {leftIcon}
            </span>
          )}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && leftIconClass,
              rightIcon && rightIconClass,
              getErrorText() && "border-destructive focus-visible:ring-destructive",
              getSuccessText() && !getErrorText() && "border-green-500 focus-visible:ring-green-500",
              isRTL && "text-right",
              className
            )}
            placeholder={getPlaceholderText()}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <span className={cn(
              "absolute text-muted-foreground z-10",
              isRTL ? "left-3" : "right-3"
            )}>
              {rightIcon}
            </span>
          )}
        </div>
        {getErrorText() && (
          <p className={cn(
            "mt-1 text-xs text-destructive",
            isRTL && "text-right"
          )}>
            {getErrorText()}
          </p>
        )}
        {getSuccessText() && !getErrorText() && (
          <p className={cn(
            "mt-1 text-xs text-green-600",
            isRTL && "text-right"
          )}>
            {getSuccessText()}
          </p>
        )}
      </div>
    )
  }
)
RTLInput.displayName = "RTLInput"

export { RTLInput }
