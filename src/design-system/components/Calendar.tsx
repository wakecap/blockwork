import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCalendar } from '@fortawesome/free-solid-svg-icons';

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  highlightedDates?: Date[];
  variant?: 'single' | 'range' | 'multi-month';
  rangeStart?: Date;
  rangeEnd?: Date;
  onRangeChange?: (start: Date, end: Date) => void;
  showToday?: boolean;
  showWeekNumbers?: boolean;
  locale?: string;
  className?: string;
  showClearButton?: boolean;
  showSelectButton?: boolean;
  onClear?: () => void;
  onSelect?: () => void;
  predefinedRanges?: Array<{
    label: string;
    value: string;
    getValue: () => { start: Date; end: Date };
  }>;
}

export const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates = [],
  highlightedDates = [],
  variant = 'single',
  rangeStart,
  rangeEnd,
  onRangeChange,
  showToday = true,
  showWeekNumbers = false,
  locale = 'en-US',
  className = '',
  showClearButton = true,
  showSelectButton = true,
  onClear,
  onSelect,
  predefinedRanges = [],
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    return value ? new Date(value.getFullYear(), value.getMonth(), 1) : new Date();
  });

  const [selectedRange, setSelectedRange] = React.useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: rangeStart || null,
    end: rangeEnd || null,
  });

  const [selectedPredefinedRange, setSelectedPredefinedRange] = React.useState<string>('');
  const [secondMonth, setSecondMonth] = React.useState(() => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  });

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    if (!disabledDates || !Array.isArray(disabledDates)) return false;
    return disabledDates.some(disabledDate => 
      disabledDate.toDateString() === date.toDateString()
    );
  };

  const isDateHighlighted = (date: Date): boolean => {
    if (!highlightedDates || !Array.isArray(highlightedDates)) return false;
    return highlightedDates.some(highlightedDate => 
      highlightedDate.toDateString() === date.toDateString()
    );
  };

  const isDateInRange = (date: Date): boolean => {
    if (!selectedRange.start || !selectedRange.end) return false;
    return date >= selectedRange.start && date <= selectedRange.end;
  };

  const isDateRangeStart = (date: Date): boolean => {
    return selectedRange.start?.toDateString() === date.toDateString();
  };

  const isDateRangeEnd = (date: Date): boolean => {
    return selectedRange.end?.toDateString() === date.toDateString();
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (variant === 'range') {
      if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
        setSelectedRange({ start: date, end: null });
      } else {
        const start = selectedRange.start!;
        const end = date;
        if (end < start) {
          setSelectedRange({ start: end, end: start });
          onRangeChange?.(end, start);
        } else {
          setSelectedRange({ start, end });
          onRangeChange?.(start, end);
        }
      }
    } else {
      onChange?.(date);
    }
  };

  const goToPreviousMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    setCurrentMonth(newMonth);
    if (variant === 'multi-month') {
      setSecondMonth(new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 1));
    }
  };

  const goToNextMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    setCurrentMonth(newMonth);
    if (variant === 'multi-month') {
      setSecondMonth(new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 1));
    }
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    if (variant === 'single') {
      onChange?.(today);
    }
  };

  const handlePredefinedRange = (rangeValue: string) => {
    setSelectedPredefinedRange(rangeValue);
    const range = predefinedRanges.find(r => r.value === rangeValue);
    if (range) {
      const { start, end } = range.getValue();
      setSelectedRange({ start, end });
      onRangeChange?.(start, end);
    }
  };

  const handleClear = () => {
    setSelectedRange({ start: null, end: null });
    setSelectedPredefinedRange('');
    onClear?.();
  };

  const handleSelect = () => {
    onSelect?.();
  };

  const getDaysInMonth = (year: number, month: number): Date[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add days from previous month to fill first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    // Add days of current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    // Add days from next month to fill last week
    const lastDayOfWeek = lastDay.getDay();
    for (let day = 1; day <= 6 - lastDayOfWeek; day++) {
      days.push(new Date(year, month + 1, day));
    }

    return days;
  };

  const getWeekNumber = (date: Date): number => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const renderMonth = (month: Date) => {
    const days = getDaysInMonth(month.getFullYear(), month.getMonth());
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <div className="flex flex-col">
        {/* Month Header */}
        <div className="text-center text-lg font-semibold text-neutral-900 mb-4">
          {month.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-px bg-neutral-200 mb-1">
          {weekdays.map(day => (
            <div key={day} className="bg-neutral-50 p-2 text-xs font-medium text-neutral-500 text-center">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-px bg-neutral-200">
          {weeks.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((date, dayIndex) => {
                const isToday = date.toDateString() === new Date().toDateString();
                const isSelected = variant === 'single' 
                  ? value?.toDateString() === date.toDateString()
                  : isDateRangeStart(date) || isDateRangeEnd(date);
                const isInRange = variant === 'range' && isDateInRange(date);
                const isDisabled = isDateDisabled(date);
                const isHighlighted = isDateHighlighted(date);
                const isCurrentMonth = date.getMonth() === month.getMonth();

                return (
                  <button
                    key={dayIndex}
                    onClick={() => handleDateClick(date)}
                    disabled={isDisabled}
                    className={`
                      relative p-2 text-sm transition-colors
                      ${isCurrentMonth ? 'text-neutral-900' : 'text-neutral-400'}
                      ${isToday ? 'font-bold' : ''}
                      ${isSelected ? 'bg-blue-600 text-white rounded-full' : ''}
                      ${isInRange && !isSelected ? 'bg-blue-100' : ''}
                      ${isHighlighted && !isSelected ? 'bg-yellow-100' : ''}
                      ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-100 cursor-pointer'}
                      ${!isCurrentMonth ? 'opacity-50' : ''}
                    `}
                  >
                    {date.getDate()}
                    {isHighlighted && !isSelected && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  if (variant === 'multi-month') {
    return (
      <div className={`bg-white border border-neutral-200 rounded-lg shadow-lg ${className}`}>
        <div className="flex">
          {/* Predefined Ranges */}
          <div className="w-48 border-r border-neutral-200 p-4">
            <div className="space-y-2">
              {predefinedRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => handlePredefinedRange(range.value)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                    selectedPredefinedRange === range.value
                      ? 'bg-blue-600 text-white'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Area */}
          <div className="flex-1 p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={goToPreviousMonth}
                className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label="Previous month"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
              </button>
              
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-neutral-900">
                  {currentMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
                </h2>
                <h2 className="text-lg font-semibold text-neutral-900">
                  {secondMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
                </h2>
              </div>
              
              <button
                onClick={goToNextMonth}
                className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label="Next month"
              >
                <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
              </button>
            </div>

            {/* Two Month View */}
            <div className="flex space-x-8">
              {renderMonth(currentMonth)}
              {renderMonth(secondMonth)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-2 p-4 border-t border-neutral-200">
          {showClearButton && (
            <button
              onClick={handleClear}
              className="px-4 py-2 text-sm text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
            >
              Clear
            </button>
          )}
          {showSelectButton && (
            <button
              onClick={handleSelect}
              className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Select
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-neutral-200 rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200">
        <button
          onClick={goToPreviousMonth}
          className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="Previous month"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
        </button>
        
        <h2 className="text-lg font-semibold text-neutral-900">
          {currentMonth.toLocaleDateString(locale, { month: 'long', year: 'numeric' })}
        </h2>
        
        <button
          onClick={goToNextMonth}
          className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="Next month"
        >
          <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
        </button>
      </div>

      {/* Calendar Content */}
      <div className="p-4">
        {renderMonth(currentMonth)}
      </div>

      {/* Footer */}
      <div className="flex justify-end space-x-2 p-4 border-t border-neutral-200">
        {showClearButton && (
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
          >
            Clear
          </button>
        )}
        {showSelectButton && (
          <button
            onClick={handleSelect}
            className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Select
          </button>
        )}
      </div>
    </div>
  );
};

// Date Picker component
export const DatePicker: React.FC<{
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  className?: string;
}> = ({
  value,
  onChange,
  placeholder = 'Select date',
  format = 'MM/dd/yyyy',
  minDate,
  maxDate,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    if (value) {
      setInputValue(value.toLocaleDateString());
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleDateSelect = (date: Date) => {
    onChange?.(date);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 cursor-pointer"
          readOnly
        />
        <FontAwesomeIcon 
          icon={faCalendar} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" 
        />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-1500">
          <Calendar
            value={value}
            onChange={handleDateSelect}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
};

// Date Range Picker component
export const DateRangePicker: React.FC<{
  startDate?: Date;
  endDate?: Date;
  onChange?: (startDate: Date, endDate: Date) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  className?: string;
}> = ({
  startDate,
  endDate,
  onChange,
  placeholder = 'Select date range',
  minDate,
  maxDate,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    if (startDate && endDate) {
      setInputValue(`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
    }
  }, [startDate, endDate]);

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleRangeChange = (start: Date, end: Date) => {
    onChange?.(start, end);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onClick={handleInputClick}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 cursor-pointer"
          readOnly
        />
        <FontAwesomeIcon 
          icon={faCalendar} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" 
        />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-1500">
          <Calendar
            variant="range"
            rangeStart={startDate}
            rangeEnd={endDate}
            onRangeChange={handleRangeChange}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
      )}
    </div>
  );
};
