import React, { useState } from "react";
import { cn } from "../../../utils/utils";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  label, 
  checked: controlledChecked, 
  disabled = false,
  onChange,
  className,
  ...props 
}) => {
  const [internalChecked, setInternalChecked] = useState(false);
  
  // Use controlled checked if provided, otherwise use internal state
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    
    const newChecked = !isChecked;
    
    // Update internal state if uncontrolled
    if (controlledChecked === undefined) {
      setInternalChecked(newChecked);
    }
    
    // Call onChange callback
    onChange?.(newChecked);
  };

  // Determine icon and color based on state
  const getIconClasses = () => {
    if (disabled && isChecked) {
      // Disabled checked: checked icon with disabled color
      return "fa-solid fa-square-check text-bw-text-disabled";
    }
    if (disabled) {
      // Disabled unchecked: square-minus with disabled color
      return "fa-regular fa-square-minus text-bw-text-disabled";
    }
    if (isChecked) {
      // Checked: checked icon with primary color
      return "fa-solid fa-square-check text-bw-primary";
    }
    // Unchecked: regular square with placeholder color
    return "fa-regular fa-square text-bw-text-placeholder";
  };

  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 font-sans text-base select-none group",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <i 
        className={cn(
          "text-xl transition-all duration-200", 
          getIconClasses(),
          !disabled && "group-hover:scale-110"
        )} 
      />
      <span 
        className={cn(
          "text-bw-text-secondary transition-colors duration-200",
          disabled && "text-bw-text-disabled",
          !disabled && "group-hover:text-bw-text-primary"
        )}
      >
        {label}
      </span>
      {/* Hidden input for form compatibility */}
      <input
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        className="sr-only"
        readOnly
        {...props}
      />
    </label>
  );
};
