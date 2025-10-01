import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: DropdownOption[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  iconLeft?: IconProp;
  iconRight?: IconProp;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  className,
  disabled,
  iconLeft,
  iconRight,
  ...props
}) => (
  <div className="w-full font-sans">
    {label && <label className="block mb-1 text-sm font-medium text-neutral-700">{label}</label>}
    <div className="relative flex items-center">
      {iconLeft && (
        <span className="absolute left-3 text-neutral-400">
          <FontAwesomeIcon icon={iconLeft} className="w-4 h-4" />
        </span>
      )}
      <select
        className={
          `block w-full rounded border px-3 py-2 text-base focus:outline-none focus:ring-2 transition bg-white ` +
          (iconLeft ? "pl-9 " : "") +
          (iconRight ? "pr-9 " : "") +
          (disabled ? "opacity-50 cursor-not-allowed " : "") +
          "border-neutral-300 focus:ring-primary-500" +
          (className ? " " + className : "")
        }
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {iconRight && (
        <span className="absolute right-3 text-neutral-400 pointer-events-none">
          <FontAwesomeIcon icon={iconRight} className="w-4 h-4" />
        </span>
      )}
    </div>
  </div>
);
