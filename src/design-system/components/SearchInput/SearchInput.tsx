import React from "react";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  success?: string;
  placeholder?: string;
  onClear?: () => void;
  showClearButton?: boolean;
  onSearch?: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  label,
  error,
  success,
  placeholder = "Search...",
  onClear,
  showClearButton = true,
  onSearch,
  className,
  value,
  onChange,
  ...props
}) => {
  const [searchValue, setSearchValue] = React.useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    if (onChange) {
      onChange(e);
    }
  };

  const handleClear = () => {
    setSearchValue("");
    if (onClear) {
      onClear();
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue as string);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full font-sans">
      {label && <label className="block mb-1 text-sm font-medium text-neutral-700">{label}</label>}
      <style>
        {`
          .search-input-custom::placeholder {
            font-size: 13px;
            font-weight: 300;
            color: #9ca3af;
          }
        `}
      </style>
      <div className="relative flex items-center">
        <span className="absolute left-3 text-neutral-400">
          <i className="w-4 h-4 fa-solid fa-search" />
        </span>
        <input
          type="text"
          className={
            `search-input-custom block w-full rounded border px-3 py-2 text-base focus:outline-none focus:ring-1 transition pl-9 ` +
            (showClearButton && searchValue ? "pr-9 " : "") +
            (error
              ? "border-red-500 focus:ring-1 focus:ring-red-500"
              : success
                ? "border-green-500 focus:ring-1 focus:ring-green-500"
                : "border-neutral-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-500") +
            (className ? " " + className : "")
          }
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          {...props}
        />
        {showClearButton && searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <i className="w-4 h-4 fa-solid fa-times" />
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {success && !error && <p className="mt-1 text-xs text-green-600">{success}</p>}
    </div>
  );
};
