import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';

export interface MultiSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  label?: string;
  options: MultiSelectOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  maxSelections?: number;
  searchable?: boolean;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selectedValues,
  onChange,
  placeholder = "Select options...",
  disabled = false,
  error,
  maxSelections,
  searchable = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    searchable ? option.label.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  const selectedOptions = options.filter(option => selectedValues.includes(option.value));

  const handleOptionToggle = (value: string) => {
    if (disabled) return;
    
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    
    if (maxSelections && newSelectedValues.length > maxSelections) {
      return;
    }
    
    onChange(newSelectedValues);
  };

  const removeOption = (value: string) => {
    if (disabled) return;
    onChange(selectedValues.filter(v => v !== value));
  };

  const isMaxReached = maxSelections ? selectedValues.length >= maxSelections : false;

  return (
    <div className="w-full font-sans" ref={dropdownRef}>
      {label && <label className="block mb-1 text-sm font-medium text-neutral-700">{label}</label>}
      
      <div className="relative">
        <div
          className={`
            min-h-[40px] border rounded px-3 py-2 cursor-pointer transition-colors
            ${disabled ? 'bg-neutral-100 cursor-not-allowed' : 'bg-white hover:border-neutral-400'}
            ${error ? 'border-red-500' : 'border-neutral-300'}
            ${isOpen ? 'border-primary-500 ring-2 ring-primary-500' : ''}
          `}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap gap-1">
            {selectedOptions.length > 0 ? (
              selectedOptions.map(option => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded"
                >
                  {option.label}
                  {!disabled && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeOption(option.value);
                      }}
                      className="hover:text-primary-600"
                    >
                      <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))
            ) : (
              <span className="text-neutral-500">{placeholder}</span>
            )}
          </div>
        </div>
        
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-neutral-300 rounded shadow-lg max-h-60 overflow-y-auto">
          {searchable && (
            <div className="p-2 border-b border-neutral-200">
              <input
                type="text"
                placeholder="Search options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          
          <div className="py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => {
                const isSelected = selectedValues.includes(option.value);
                const isDisabled = option.disabled || (isMaxReached && !isSelected);
                
                return (
                  <div
                    key={option.value}
                    className={`
                      px-3 py-2 cursor-pointer transition-colors
                      ${isSelected ? 'bg-primary-50 text-primary-900' : 'hover:bg-neutral-50'}
                      ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    onClick={() => !isDisabled && handleOptionToggle(option.value)}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm">{option.label}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-2 text-sm text-neutral-500">
                {searchable && searchTerm ? 'No options found' : 'No options available'}
              </div>
            )}
          </div>
        </div>
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {maxSelections && (
        <p className="mt-1 text-xs text-neutral-500">
          {selectedValues.length}/{maxSelections} selected
        </p>
      )}
    </div>
  );
};


