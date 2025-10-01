import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: string;
  iconLeft?: IconDefinition;
  iconRight?: IconDefinition;
  rows?: number;
  maxLength?: number;
  showCharacterCount?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  success,
  iconLeft,
  iconRight,
  className,
  rows = 4,
  maxLength,
  showCharacterCount = false,
  ...props
}) => {
  const [charCount, setCharCount] = React.useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="w-full font-sans">
      {label && <label className="block mb-1 text-sm font-medium text-neutral-700">{label}</label>}
      <div className="relative">
        {iconLeft && (
          <span className="absolute left-3 top-3 text-neutral-400 z-10">
            <FontAwesomeIcon icon={iconLeft} className="w-4 h-4" />
          </span>
        )}
        <textarea
          className={
            `block w-full rounded border px-3 py-2 text-base focus:outline-none focus:ring-2 transition resize-none ` +
            (iconLeft ? "pl-9 " : "") +
            (iconRight ? "pr-9 " : "") +
            (error
              ? "border-red-500 focus:ring-red-500"
              : success
                ? "border-green-500 focus:ring-green-500"
                : "border-neutral-300 focus:ring-primary-500") +
            (className ? " " + className : "")
          }
          rows={rows}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
        {iconRight && (
          <span className="absolute right-3 top-3 text-neutral-400 pointer-events-none">
            <FontAwesomeIcon icon={iconRight} className="w-4 h-4" />
          </span>
        )}
      </div>
      <div className="flex justify-between items-center mt-1">
        {error && <p className="text-xs text-red-600">{error}</p>}
        {success && !error && <p className="text-xs text-green-600">{success}</p>}
        {showCharacterCount && maxLength && (
          <span
            className={`text-xs ${charCount > maxLength * 0.9 ? "text-orange-600" : "text-neutral-500"}`}
          >
            {charCount}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};
