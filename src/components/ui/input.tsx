import * as React from "react"
import { cn } from "@/src/utils/utils"

export interface InputProps
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

const Input = React.forwardRef<HTMLInputElement, InputProps>(
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
    // Get text based on showArabicText
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

    return (
      <div className="w-full">
        {getLabelText() && (
          <label className="block mb-1 text-sm font-medium text-foreground">
            {getLabelText()}
          </label>
        )}
        <div className="relative flex items-center">
          {iconLeft && (
            <span className="absolute left-3 text-muted-foreground z-10">
              {iconLeft}
            </span>
          )}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              iconLeft && "pl-9",
              iconRight && "pr-9",
              getErrorText() && "border-destructive focus-visible:ring-destructive",
              getSuccessText() && !getErrorText() && "border-green-500 focus-visible:ring-green-500",
              className
            )}
            placeholder={getPlaceholderText()}
            ref={ref}
            {...props}
          />
          {iconRight && (
            <span className="absolute right-3 text-muted-foreground z-10">
              {iconRight}
            </span>
          )}
        </div>
        {getErrorText() && (
          <p className="mt-1 text-xs text-destructive">{getErrorText()}</p>
        )}
        {getSuccessText() && !getErrorText() && (
          <p className="mt-1 text-xs text-green-600">{getSuccessText()}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
