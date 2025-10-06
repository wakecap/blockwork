import React from "react";
import { cn } from "../../../utils/utils";
export interface AutocompleteOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface AutocompleteProps {
  label?: string;
  options: AutocompleteOption[];
  value?: string;
  onChange: (value: string) => void;
  onSelect?: (option: AutocompleteOption) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  loading?: boolean;
  minChars?: number;
  maxSuggestions?: number;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  label,
  options,
  value = "",
  onChange,
  onSelect,
  placeholder = "Type to search...",
  disabled = false,
  error,
  loading = false,
  minChars = 1,
  maxSuggestions = 10,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const [isFocused, setIsFocused] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const filteredOptions = React.useMemo(() => {
    if (inputValue.length < minChars) return [];

    return options
      .filter(
        (option) =>
          !option.disabled && option.label.toLowerCase().includes(inputValue.toLowerCase()),
      )
      .slice(0, maxSuggestions);
  }, [options, inputValue, minChars, maxSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    setIsOpen(newValue.length >= minChars);
    setHighlightedIndex(-1);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (inputValue.length >= minChars) {
      setIsOpen(true);
    }
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    // Delay closing to allow for option selection
    setTimeout(() => setIsOpen(false), 150);
  };

  const handleOptionSelect = (option: AutocompleteOption) => {
    setInputValue(option.label);
    onChange(option.value);
    onSelect?.(option);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div className="w-full font-sans" ref={dropdownRef}>
      {label && <label className="block mb-1 text-sm font-medium text-neutral-700">{label}</label>}

      <div className="relative">
        <div className="relative">
          <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              w-full pl-9 pr-10 py-2 border rounded text-base transition-colors
              ${disabled ? "bg-neutral-100 cursor-not-allowed" : "bg-white"}
              ${error ? "border-red-500" : "border-neutral-300"}
              ${isFocused ? "border-primary-500 ring-2 ring-primary-500" : ""}
              focus:outline-none
            `}
          />
          <i
            className={cn(
              "fa-solid fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 transition-transform",
              isOpen ? "rotate-180" : "",
            )}
          />
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-neutral-300 rounded shadow-lg max-h-60 overflow-y-auto">
            {loading ? (
              <div className="px-3 py-2 text-sm text-neutral-500">Loading...</div>
            ) : filteredOptions.length > 0 ? (
              <div className="py-1">
                {filteredOptions.map((option, index) => (
                  <div
                    key={option.value}
                    className={`
                      px-3 py-2 cursor-pointer transition-colors
                      ${index === highlightedIndex ? "bg-primary-50 text-primary-900" : "hover:bg-neutral-50"}
                      ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                    onClick={() => !option.disabled && handleOptionSelect(option)}
                  >
                    <span className="text-sm">{option.label}</span>
                  </div>
                ))}
              </div>
            ) : inputValue.length >= minChars ? (
              <div className="px-3 py-2 text-sm text-neutral-500">No options found</div>
            ) : (
              <div className="px-3 py-2 text-sm text-neutral-500">
                Type at least {minChars} character{minChars > 1 ? "s" : ""} to search
              </div>
            )}
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};
