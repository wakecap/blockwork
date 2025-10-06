import React from "react";
import { cn } from "../../../utils/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, icon, className, ...props }) => (
  <label
    className={
      "inline-flex items-center gap-2 cursor-pointer font-sans text-base " +
      (props.disabled ? "opacity-50 cursor-not-allowed" : "")
    }
  >
    <input
      type="checkbox"
      className={
        "form-checkbox h-4 w-4 text-primary-600 border-neutral-300 focus:ring-primary-500 " +
        (className || "")
      }
      {...props}
    />
    {icon && <i className={cn("w-4 h-4 text-neutral-400", icon)} />}
    <span>{label}</span>
  </label>
);
