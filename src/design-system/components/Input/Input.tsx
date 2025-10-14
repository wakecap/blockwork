import React from "react";
import { cn } from "../../../utils/utils";
// import { useFont } from './FontProvider';
// import { getRTLClasses, getFontFamily } from '../utils/arabicLocalization';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  iconLeft?: string;
  iconRight?: string;
  // Arabic support
  arabicLabel?: string;
  arabicPlaceholder?: string;
  arabicError?: string;
  arabicSuccess?: string;
  showArabicText?: boolean;
}

export const Input: React.FC<InputProps> = ({
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
  className,
  ...props
}) => {
  // const { language } = useFont();

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
        <label className="block mb-1 text-sm font-medium text-bw-text-secondary">{getLabelText()}</label>
      )}
      <div className="relative flex items-center">
        {iconLeft && (
          <span className="absolute left-3 text-bw-text-disabled">
            <i className={cn("w-4 h-4", iconLeft)} />
          </span>
        )}
        <input
          className={
            `block w-full rounded border px-3 py-2 text-base text-bw-text-primary bg-bw-bg-primary focus:outline-none focus:ring-2 transition placeholder:text-bw-text-placeholder ` +
            (iconLeft ? "pl-9 " : "") +
            (iconRight ? "pr-9 " : "") +
            (getErrorText()
              ? "border-bw-negative focus:ring-bw-negative"
              : getSuccessText()
                ? "border-bw-positive focus:ring-bw-positive"
                : "border-bw-border-ui focus:ring-bw-primary") +
            (className ? " " + className : "")
          }
          placeholder={getPlaceholderText()}
          {...props}
        />
        {iconRight && (
          <span className="absolute right-3 text-bw-text-disabled">
            <i className={cn("w-4 h-4", iconRight)} />
          </span>
        )}
      </div>
      {getErrorText() && <p className="mt-1 text-xs text-bw-negative">{getErrorText()}</p>}
      {getSuccessText() && !getErrorText() && (
        <p className="mt-1 text-xs text-bw-positive">{getSuccessText()}</p>
      )}
    </div>
  );
};
