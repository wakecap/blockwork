import React from "react";
import { cn } from "../../../utils/utils";

export interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  type?: "text" | "number" | "password";
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outlined" | "filled";
  autoFocus?: boolean;
  disabled?: boolean;
  placeholder?: string;
  showToggle?: boolean;
  onComplete?: (value: string) => void;
  className?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  length = 6,
  type = "text",
  size = "md",
  variant = "default",
  autoFocus = false,
  disabled = false,
  placeholder = "0",
  showToggle = false,
  onComplete,
  className = "",
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    // Initialize refs array
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  React.useEffect(() => {
    // Auto-focus first input
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  React.useEffect(() => {
    // Check if OTP is complete
    if (value.length === length && onComplete) {
      onComplete(value);
    }
  }, [value, length, onComplete]);

  const sizeStyles = {
    sm: "w-10 h-10 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-14 h-14 text-lg",
  };

  const variantStyles = {
    default:
      "border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200",
    outlined:
      "border-2 border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200",
    filled:
      "border border-neutral-300 bg-neutral-50 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200",
  };

  const handleChange = (index: number, inputValue: string) => {
    if (disabled) return;

    const currentValue = value.split("");

    // Handle single character input
    if (inputValue.length === 1) {
      currentValue[index] = inputValue;

      // Move to next input
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
    // Handle paste or multiple characters
    else if (inputValue.length > 1) {
      const chars = inputValue.split("").slice(0, length);
      chars.forEach((char, i) => {
        if (index + i < length) {
          currentValue[index + i] = char;
        }
      });

      // Focus last filled input or next empty input
      const lastFilledIndex = Math.min(index + chars.length - 1, length - 1);
      inputRefs.current[lastFilledIndex]?.focus();
    }

    const newValue = currentValue.join("").slice(0, length);
    onChange(newValue);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    // Handle backspace
    if (e.key === "Backspace") {
      if (value[index] === "") {
        // Move to previous input if current is empty
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        // Clear current input
        const currentValue = value.split("");
        currentValue[index] = "";
        onChange(currentValue.join(""));
      }
    }
    // Handle arrow keys
    else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleFocus = (index: number) => {
    // Select all text when focusing
    const input = inputRefs.current[index];
    if (input) {
      input.select();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const cleanData = type === "number" ? pastedData.replace(/\D/g, "") : pastedData;

    if (cleanData.length > 0) {
      onChange(cleanData.slice(0, length));

      // Focus last filled input
      const lastFilledIndex = Math.min(cleanData.length - 1, length - 1);
      inputRefs.current[lastFilledIndex]?.focus();
    }
  };

  const inputType = type === "password" && showToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* OTP Inputs */}
      <div className="flex items-center space-x-2">
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type={inputType}
            value={value[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={() => handleFocus(index)}
            onPaste={handlePaste}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={1}
            className={`
              ${sizeStyles[size]}
              ${variantStyles[variant]}
              text-center font-mono font-medium
              rounded-lg transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none
            `}
          />
        ))}
      </div>

      {/* Toggle Password Visibility */}
      {showToggle && type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="p-2 text-neutral-500 hover:text-neutral-700 transition-colors"
          disabled={disabled}
        >
          <i
            className={cn("w-4 h-4", showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye")}
          />
        </button>
      )}
    </div>
  );
};

// Pre-built OTP components
export const PINInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  length?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outlined" | "filled";
  autoFocus?: boolean;
  disabled?: boolean;
  onComplete?: (value: string) => void;
  className?: string;
}> = ({
  value,
  onChange,
  length = 4,
  size = "md",
  variant = "default",
  autoFocus,
  disabled,
  onComplete,
  className = "",
}) => {
  return (
    <OTPInput
      value={value}
      onChange={onChange}
      length={length}
      type="number"
      size={size}
      variant={variant}
      autoFocus={autoFocus}
      disabled={disabled}
      placeholder="0"
      onComplete={onComplete}
      className={className}
    />
  );
};

export const VerificationCode: React.FC<{
  value: string;
  onChange: (value: string) => void;
  length?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outlined" | "filled";
  autoFocus?: boolean;
  disabled?: boolean;
  onComplete?: (value: string) => void;
  className?: string;
}> = ({
  value,
  onChange,
  length = 6,
  size = "md",
  variant = "default",
  autoFocus,
  disabled,
  onComplete,
  className = "",
}) => {
  return (
    <OTPInput
      value={value}
      onChange={onChange}
      length={length}
      type="text"
      size={size}
      variant={variant}
      autoFocus={autoFocus}
      disabled={disabled}
      placeholder="0"
      onComplete={onComplete}
      className={className}
    />
  );
};

export const PasswordOTP: React.FC<{
  value: string;
  onChange: (value: string) => void;
  length?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outlined" | "filled";
  autoFocus?: boolean;
  disabled?: boolean;
  showToggle?: boolean;
  onComplete?: (value: string) => void;
  className?: string;
}> = ({
  value,
  onChange,
  length = 6,
  size = "md",
  variant = "default",
  autoFocus,
  disabled,
  showToggle = true,
  onComplete,
  className = "",
}) => {
  return (
    <OTPInput
      value={value}
      onChange={onChange}
      length={length}
      type="password"
      size={size}
      variant={variant}
      autoFocus={autoFocus}
      disabled={disabled}
      showToggle={showToggle}
      placeholder="•"
      onComplete={onComplete}
      className={className}
    />
  );
};

// Hook for managing OTP state
export const useOTP = (length: number = 6) => {
  const [value, setValue] = React.useState("");
  const [isComplete, setIsComplete] = React.useState(false);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setIsComplete(newValue.length === length);
  };

  const handleComplete = (completedValue: string) => {
    setIsComplete(true);
    // You can add additional logic here, like auto-submit
  };

  const reset = () => {
    setValue("");
    setIsComplete(false);
  };

  return {
    value,
    isComplete,
    onChange: handleChange,
    onComplete: handleComplete,
    reset,
  };
};
