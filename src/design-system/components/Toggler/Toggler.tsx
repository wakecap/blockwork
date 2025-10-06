import React from "react";

import { cn } from "../../../utils/utils";
export interface TogglerProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  icon?: string;
}

export const Toggler: React.FC<TogglerProps> = ({ checked, onChange, disabled, label, icon }) => (
  <label
    className={
      "inline-flex items-center gap-2 cursor-pointer font-sans text-base " +
      (disabled ? "opacity-50 cursor-not-allowed" : "")
    }
  >
    <span className="relative inline-block w-10 h-6 align-middle select-none">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span
        className={
          `block w-10 h-6 rounded-full transition bg-neutral-300 ` +
          (checked ? "bg-primary-600" : "")
        }
      />
      <span
        className={
          `absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition transform ` +
          (checked ? "translate-x-4" : "")
        }
      />
    </span>
    {icon && <i className={cn(icon, "w-4 h-4 text-neutral-400")} />}
    {label && <span>{label}</span>}
  </label>
);
