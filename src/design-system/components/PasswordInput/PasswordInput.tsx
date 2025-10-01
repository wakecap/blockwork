import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  success?: string;
  iconLeft?: IconProp;
  showToggle?: boolean;
  strengthIndicator?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  error,
  success,
  iconLeft,
  showToggle = true,
  strengthIndicator = false,
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: "", color: "" };

    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const strengthMap = {
      0: { label: "Very Weak", color: "bg-red-500" },
      1: { label: "Weak", color: "bg-orange-500" },
      2: { label: "Fair", color: "bg-yellow-500" },
      3: { label: "Good", color: "bg-blue-500" },
      4: { label: "Strong", color: "bg-green-500" },
      5: { label: "Very Strong", color: "bg-green-600" },
    };

    return { score, ...strengthMap[score as keyof typeof strengthMap] };
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="w-full font-sans">
      {label && <label className="block mb-1 text-sm font-medium text-neutral-700">{label}</label>}
      <div className="relative flex items-center">
        {iconLeft && (
          <span className="absolute left-3 text-neutral-400 z-10">
            <FontAwesomeIcon icon={iconLeft} className="w-4 h-4" />
          </span>
        )}
        <input
          type={showPassword ? "text" : "password"}
          className={
            `block w-full rounded border px-3 py-2 text-base focus:outline-none focus:ring-2 transition ` +
            (iconLeft ? "pl-9 " : "") +
            (showToggle ? "pr-10 " : "") +
            (error
              ? "border-red-500 focus:ring-red-500"
              : success
                ? "border-green-500 focus:ring-green-500"
                : "border-neutral-300 focus:ring-primary-500") +
            (className ? " " + className : "")
          }
          onChange={handleChange}
          {...props}
        />
        {showToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="w-4 h-4" />
          </button>
        )}
      </div>
      {strengthIndicator && password && (
        <div className="mt-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${strength.color}`}
                style={{ width: `${(strength.score / 5) * 100}%` }}
              />
            </div>
            <span className="text-xs text-neutral-600">{strength.label}</span>
          </div>
        </div>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {success && !error && <p className="mt-1 text-xs text-green-600">{success}</p>}
    </div>
  );
};
