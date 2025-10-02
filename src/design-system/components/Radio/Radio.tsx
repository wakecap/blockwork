import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: IconDefinition;
}

export const Radio: React.FC<RadioProps> = ({ label, icon, className, ...props }) => (
  <label
    className={
      "inline-flex items-center gap-2 cursor-pointer font-sans text-base " +
      (props.disabled ? "opacity-50 cursor-not-allowed" : "")
    }
  >
    <input
      type="radio"
      className={
        "form-radio h-4 w-4 text-primary-600 border-neutral-300 focus:ring-primary-500 " +
        (className || "")
      }
      {...props}
    />
    {icon && <FontAwesomeIcon icon={icon} className="w-4 h-4 text-neutral-400" />}
    <span>{label}</span>
  </label>
);
