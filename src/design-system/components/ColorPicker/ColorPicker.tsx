import React from "react";

export interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  format?: "hex" | "rgb" | "hsl";
  presetColors?: string[];
  showPresets?: boolean;
  showInput?: boolean;
  showPreview?: boolean;
  disabled?: boolean;
  className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  format = "hex",
  presetColors = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#06b6d4",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#ec4899",
    "#f43f5e",
    "#000000",
    "#6b7280",
    "#9ca3af",
    "#ffffff",
  ],
  showPresets = true,
  showInput = true,
  showPreview = true,
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);
  const pickerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleColorChange = (color: string) => {
    onChange(color);
    setInputValue(color);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Validate hex color
    if (/^#[0-9A-F]{6}$/i.test(newValue)) {
      onChange(newValue);
    }
  };

  const handleInputBlur = () => {
    // Reset to current value if invalid
    if (!/^#[0-9A-F]{6}$/i.test(inputValue)) {
      setInputValue(value);
    }
  };

  const formatColor = (color: string, targetFormat: string) => {
    if (targetFormat === "hex") {
      return color;
    }

    // Convert hex to RGB
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    if (targetFormat === "rgb") {
      return `rgb(${r}, ${g}, ${b})`;
    } else if (targetFormat === "hsl") {
      // Convert RGB to HSL
      const rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0,
          s = 0;
        const l = (max + min) / 2;

        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

          switch (max) {
            case r:
              h = (g - b) / d + (g < b ? 6 : 0);
              break;
            case g:
              h = (b - r) / d + 2;
              break;
            case b:
              h = (r - g) / d + 4;
              break;
          }
          h /= 6;
        }

        return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
      };

      const [h, s, l] = rgbToHsl(r, g, b);
      return `hsl(${h}, ${s}%, ${l}%)`;
    }

    return color;
  };

  const getContrastColor = (hexColor: string) => {
    const hex = hexColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#ffffff";
  };

  return (
    <div ref={pickerRef} className={`relative ${className}`}>
      {/* Color Preview Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          flex items-center space-x-2 px-3 py-2 border border-neutral-300 rounded-lg
          hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          transition-colors ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        {showPreview && (
          <div
            className="w-6 h-6 rounded border border-neutral-300"
            style={{ backgroundColor: value }}
          />
        )}
        <i className="w-4 h-4 text-neutral-500 fa-solid fa-palette" />
        <span className="text-sm text-neutral-700">{formatColor(value, format)}</span>
      </button>

      {/* Color Picker Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-neutral-200 rounded-lg shadow-lg p-4 min-w-64">
          {/* Color Input */}
          {showInput && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">Color Value</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="#000000"
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <div
                  className="w-8 h-8 rounded border border-neutral-300"
                  style={{ backgroundColor: inputValue }}
                />
              </div>
            </div>
          )}

          {/* Preset Colors */}
          {showPresets && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Preset Colors
              </label>
              <div className="grid grid-cols-9 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorChange(color)}
                    className={`
                      w-8 h-8 rounded border-2 transition-all duration-200
                      hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500
                      ${value === color ? "border-neutral-900" : "border-neutral-300"}
                    `}
                    style={{ backgroundColor: color }}
                    title={color}
                  >
                    {value === color && (
                      <i
                        className="w-3 h-3 fa-solid fa-check"
                        style={{ color: getContrastColor(color) }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Format Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">Format:</span>
            <div className="flex space-x-1">
              {["hex", "rgb", "hsl"].map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => onChange(formatColor(value, fmt))}
                  className={`
                    px-2 py-1 text-xs rounded transition-colors
                    ${
                      format === fmt
                        ? "bg-primary-100 text-primary-700"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }
                  `}
                >
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Pre-built color picker components
export const SimpleColorPicker: React.FC<{
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
  className?: string;
}> = ({ value, onChange, disabled, className = "" }) => {
  return (
    <ColorPicker
      value={value}
      onChange={onChange}
      format="hex"
      showPresets={true}
      showInput={false}
      showPreview={true}
      disabled={disabled}
      className={className}
    />
  );
};

export const AdvancedColorPicker: React.FC<{
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
  className?: string;
}> = ({ value, onChange, disabled, className = "" }) => {
  return (
    <ColorPicker
      value={value}
      onChange={onChange}
      format="hex"
      showPresets={true}
      showInput={true}
      showPreview={true}
      disabled={disabled}
      className={className}
    />
  );
};

export const ThemeColorPicker: React.FC<{
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
  className?: string;
}> = ({ value, onChange, disabled, className = "" }) => {
  const themeColors = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#06b6d4",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#ec4899",
    "#f43f5e",
    "#78716c",
    "#57534e",
    "#44403c",
    "#292524",
  ];

  return (
    <ColorPicker
      value={value}
      onChange={onChange}
      format="hex"
      presetColors={themeColors}
      showPresets={true}
      showInput={false}
      showPreview={true}
      disabled={disabled}
      className={className}
    />
  );
};

// Hook for managing color state
export const useColorPicker = (initialColor: string = "#000000") => {
  const [color, setColor] = React.useState(initialColor);

  const handleChange = (newColor: string) => {
    setColor(newColor);
  };

  const reset = () => {
    setColor(initialColor);
  };

  return {
    color,
    onChange: handleChange,
    reset,
  };
};
