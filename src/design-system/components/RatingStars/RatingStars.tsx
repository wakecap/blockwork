import React from "react";
import { cn } from "../../../utils/utils";

export interface RatingStarsProps {
  value: number;
  onChange?: (rating: number) => void;
  maxStars?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled" | "outlined";
  color?: string;
  readOnly?: boolean;
  showValue?: boolean;
  showLabel?: boolean;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  value,
  onChange,
  maxStars = 5,
  size = "md",
  variant = "default",
  color = "#fbbf24", // yellow-400
  readOnly = false,
  showValue = false,
  showLabel = false,
  className = "",
}) => {
  const [hoverValue, setHoverValue] = React.useState(0);

  const sizeStyles = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const getStarIcon = (index: number) => {
    const currentValue = hoverValue || value;
    const isFilled = index < currentValue;
    const _isHalf = !isFilled && currentValue > index && currentValue < index + 1;

    if (variant === "filled") {
      return "fa-solid fa-star";
    } else if (variant === "outlined") {
      return isFilled ? "fa-solid fa-star" : "fa-solid fa-circle";
    } else {
      // Default variant
      return isFilled ? "fa-solid fa-star" : "fa-solid fa-circle";
    }
  };

  const getStarColor = (index: number) => {
    const currentValue = hoverValue || value;
    const isFilled = index < currentValue;
    const isHalf = !isFilled && currentValue > index && currentValue < index + 1;

    if (isFilled || isHalf) {
      return color;
    }
    return "#d1d5db"; // gray-300
  };

  const handleStarClick = (index: number) => {
    if (readOnly || !onChange) return;
    onChange(index + 1);
  };

  const handleStarHover = (index: number) => {
    if (readOnly) return;
    setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverValue(0);
  };

  const getRatingLabel = (rating: number) => {
    if (rating === 0) return "No rating";
    if (rating <= 1) return "Poor";
    if (rating <= 2) return "Fair";
    if (rating <= 3) return "Good";
    if (rating <= 4) return "Very Good";
    return "Excellent";
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Stars */}
      <div className="flex items-center space-x-1" onMouseLeave={handleMouseLeave}>
        {Array.from({ length: maxStars }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleStarHover(index)}
            disabled={readOnly}
            className={`
              ${sizeStyles[size]}
              transition-colors duration-200
              ${readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
            `}
            style={{ color: getStarColor(index) }}
          >
            <i className={cn("w-full h-full", getStarIcon(index))} />
          </button>
        ))}
      </div>

      {/* Value Display */}
      {showValue && (
        <span className="text-sm font-medium text-neutral-700">
          {value.toFixed(1)}/{maxStars}
        </span>
      )}

      {/* Label */}
      {showLabel && <span className="text-sm text-neutral-600">{getRatingLabel(value)}</span>}
    </div>
  );
};

// Pre-built rating components
export const ProductRating: React.FC<{
  value: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  showValue?: boolean;
  showLabel?: boolean;
  className?: string;
}> = ({
  value,
  onChange,
  readOnly = false,
  showValue = true,
  showLabel = true,
  className = "",
}) => {
  return (
    <RatingStars
      value={value}
      onChange={onChange}
      maxStars={5}
      size="md"
      variant="default"
      color="#fbbf24"
      readOnly={readOnly}
      showValue={showValue}
      showLabel={showLabel}
      className={className}
    />
  );
};

export const ReviewRating: React.FC<{
  value: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  className?: string;
}> = ({ value, onChange, readOnly = false, className = "" }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <RatingStars
        value={value}
        onChange={onChange}
        maxStars={5}
        size="lg"
        variant="filled"
        color="#f59e0b"
        readOnly={readOnly}
        showValue={true}
        showLabel={true}
      />
      {!readOnly && <p className="text-xs text-neutral-500">Click on a star to rate</p>}
    </div>
  );
};

export const CompactRating: React.FC<{
  value: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  className?: string;
}> = ({ value, onChange, readOnly = false, className = "" }) => {
  return (
    <RatingStars
      value={value}
      onChange={onChange}
      maxStars={5}
      size="sm"
      variant="outlined"
      color="#fbbf24"
      readOnly={readOnly}
      showValue={false}
      showLabel={false}
      className={className}
    />
  );
};

export const TenStarRating: React.FC<{
  value: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  showValue?: boolean;
  showLabel?: boolean;
  className?: string;
}> = ({
  value,
  onChange,
  readOnly = false,
  showValue = true,
  showLabel = true,
  className = "",
}) => {
  return (
    <RatingStars
      value={value}
      onChange={onChange}
      maxStars={10}
      size="md"
      variant="default"
      color="#10b981"
      readOnly={readOnly}
      showValue={showValue}
      showLabel={showLabel}
      className={className}
    />
  );
};

// Hook for managing rating state
export const useRating = (initialValue: number = 0, maxStars: number = 5) => {
  const [value, setValue] = React.useState(initialValue);

  const handleChange = (newValue: number) => {
    setValue(Math.min(Math.max(0, newValue), maxStars));
  };

  const reset = () => {
    setValue(0);
  };

  return {
    value,
    onChange: handleChange,
    reset,
  };
};
