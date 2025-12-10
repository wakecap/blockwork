import React from "react";
import { Button } from "../Button/Button";

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  highlightedDates?: Date[];
  variant?: "single" | "range" | "multi-month";
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
  variant = "single",
  rangeStart,
  rangeEnd,
  onRangeChange,
  showToday: _showToday = true,
  showWeekNumbers: _showWeekNumbers = false,
  locale = "en-US",
  className = "",
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

  const [selectedPredefinedRange, setSelectedPredefinedRange] = React.useState<string>("");
  const [selectedMonth, setSelectedMonth] = React.useState<Date | null>(null);
  const [secondMonth, setSecondMonth] = React.useState(() => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  });

  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    if (!disabledDates || !Array.isArray(disabledDates)) return false;
    return disabledDates.some(
      (disabledDate) => disabledDate.toDateString() === date.toDateString(),
    );
  };

  const isDateHighlighted = (date: Date): boolean => {
    if (!highlightedDates || !Array.isArray(highlightedDates)) return false;
    return highlightedDates.some(
      (highlightedDate) => highlightedDate.toDateString() === date.toDateString(),
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

  const isDateRangeMiddle = (date: Date): boolean => {
    if (!selectedRange.start || !selectedRange.end) return false;
    return date > selectedRange.start && date < selectedRange.end;
  };

  const getRangeBorderRadius = (
    date: Date,
    isRangeStart: boolean,
    isRangeEnd: boolean,
    isRangeMiddle: boolean,
  ) => {
    if (isRangeStart && isRangeEnd) {
      // Single date in range - fully rounded
      return "rounded-full";
    } else if (isRangeStart) {
      // Start of range - rounded on left side only
      return "rounded-l-full";
    } else if (isRangeEnd) {
      // End of range - rounded on right side only
      return "rounded-r-full";
    } else if (isRangeMiddle) {
      // Middle of range - no border radius for seamless connection
      return "rounded-none";
    }
    return "";
  };

  const handleDateClick = (date: Date, month: Date) => {
    if (isDateDisabled(date)) return;

    // Track which month the date was selected in
    setSelectedMonth(month);

    if (
      variant === "range" ||
      (variant === "multi-month" && selectedPredefinedRange === "custom")
    ) {
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
    if (variant === "multi-month") {
      setSecondMonth(new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 1));
    }
  };

  const goToNextMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    setCurrentMonth(newMonth);
    if (variant === "multi-month") {
      setSecondMonth(new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 1));
    }
  };

  const _goToToday = () => {
    const today = new Date();
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    if (variant === "single") {
      onChange?.(today);
    }
  };

  const handlePredefinedRange = (rangeValue: string) => {
    setSelectedPredefinedRange(rangeValue);
    const range = predefinedRanges.find((r) => r.value === rangeValue);
    if (range) {
      if (rangeValue === "custom") {
        // For custom dates, clear the range and let user select manually
        setSelectedRange({ start: null, end: null });
        setSelectedMonth(null);
      } else {
        // For predefined ranges, set the range
        const { start, end } = range.getValue();
        setSelectedRange({ start, end });
        // Set the selected month to the month containing the start date
        setSelectedMonth(new Date(start.getFullYear(), start.getMonth(), 1));
        onRangeChange?.(start, end);
      }
    }
  };

  const handleClear = () => {
    setSelectedRange({ start: null, end: null });
    // Keep 'custom' selected when clearing custom dates
    if (selectedPredefinedRange === "custom") {
      setSelectedPredefinedRange("custom");
    } else {
      setSelectedPredefinedRange("");
    }
    setSelectedMonth(null);
    onClear?.();
  };

  const handleSelect = () => {
    onSelect?.();
  };

  const getDaysInMonth = (year: number, month: number): Date[] => {
    const _firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add days of current month only
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const _getWeekNumber = (date: Date): number => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const renderMonth = (month: Date, _isMultiMonth: boolean = false) => {
    const isSelectedMonth =
      selectedMonth &&
      month.getFullYear() === selectedMonth.getFullYear() &&
      month.getMonth() === selectedMonth.getMonth();
    const days = getDaysInMonth(month.getFullYear(), month.getMonth());

    // Create a proper grid with empty cells for days before the first day of the month
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const firstDayOfWeek = firstDay.getDay();
    const weeks = [];

    // Add empty cells for days before the first day of the month
    const paddedDays = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      paddedDays.push(null);
    }
    paddedDays.push(...days);

    // Group into weeks
    for (let i = 0; i < paddedDays.length; i += 7) {
      weeks.push(paddedDays.slice(i, i + 7));
    }

    return (
      <div className="flex flex-col">
        {/* Month Header - Removed to avoid duplication with main header */}

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-px mb-1">
          {weekdays.map((day) => (
            <div
              key={day}
              className="bg-white p-2 text-xs font-medium text-neutral-500 text-center"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-px">
          {weeks.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((date, dayIndex) => {
                // Handle empty cells (null values)
                if (date === null) {
                  return <div key={dayIndex} className="p-2 text-sm" />;
                }

                const isToday = date.toDateString() === new Date().toDateString();
                const isPredefinedRange =
                  variant === "multi-month" && selectedPredefinedRange !== "";
                const isCustomRange =
                  variant === "multi-month" && selectedPredefinedRange === "custom";
                const isSelected =
                  variant === "single"
                    ? value?.toDateString() === date.toDateString()
                    : (isDateRangeStart(date) || isDateRangeEnd(date)) &&
                      (isSelectedMonth || isPredefinedRange);
                const isInRange =
                  (variant === "range" || isPredefinedRange || isCustomRange) &&
                  isDateInRange(date) &&
                  (isSelectedMonth || isPredefinedRange || isCustomRange);
                const isRangeStart =
                  (variant === "range" || isPredefinedRange || isCustomRange) &&
                  isDateRangeStart(date) &&
                  (isSelectedMonth || isPredefinedRange || isCustomRange);
                const isRangeEnd =
                  (variant === "range" || isPredefinedRange || isCustomRange) &&
                  isDateRangeEnd(date) &&
                  (isSelectedMonth || isPredefinedRange || isCustomRange);
                const isRangeMiddle =
                  (variant === "range" || isPredefinedRange || isCustomRange) &&
                  isDateRangeMiddle(date) &&
                  (isSelectedMonth || isPredefinedRange || isCustomRange);
                const isDisabled = isDateDisabled(date);
                const isHighlighted = isDateHighlighted(date);
                const isCurrentMonth = date.getMonth() === month.getMonth();

                return (
                  <button
                    key={dayIndex}
                    onClick={() => handleDateClick(date, month)}
                    disabled={isDisabled}
                    className={`
                      relative p-2 text-sm transition-colors
                      ${isCurrentMonth ? "text-neutral-900" : "text-neutral-400"}
                      ${isToday ? "font-bold" : ""}
                      ${isSelected ? "bg-neutral-700 text-white hover:bg-neutral-900" : ""}
                      ${getRangeBorderRadius(date, isRangeStart, isRangeEnd, isRangeMiddle)}
                      ${isSelected && variant === "single" ? "rounded-full" : ""}
                      ${isInRange && !isSelected ? "bg-neutral-300" : ""}
                      ${isHighlighted && !isSelected ? "bg-yellow-100" : ""}
                      ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-neutral-100 cursor-pointer"}
                      ${!isCurrentMonth ? "opacity-50" : ""}
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

  if (variant === "multi-month") {
    return (
      <div className={`bg-white border border-neutral-200 rounded-lg shadow-lg w-fit ${className}`}>
        <div className="flex">
          {/* Predefined Ranges */}
          <div className="w-48 border-r border-neutral-200 p-4">
            <div className="space-y-2">
              {predefinedRanges.map((range) => (
                <Button
                  key={range.value}
                  onClick={() => handlePredefinedRange(range.value)}
                  variant={selectedPredefinedRange === range.value ? "primary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Calendar Area */}
          <div className="p-4 flex flex-col w-fit">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <Button
                onClick={goToPreviousMonth}
                variant="ghost"
                size="iconSm"
                icon="fa-solid fa-chevron-left"
                ariaLabel="Previous month"
              />

              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-neutral-900">
                  {currentMonth.toLocaleDateString(locale, { month: "long", year: "numeric" })}
                </h2>
                <h2 className="text-lg font-semibold text-neutral-900">
                  {secondMonth.toLocaleDateString(locale, { month: "long", year: "numeric" })}
                </h2>
              </div>

              <Button
                onClick={goToNextMonth}
                variant="ghost"
                size="iconSm"
                icon="fa-solid fa-chevron-right"
                ariaLabel="Next month"
              />
            </div>

            {/* Two Month View */}
            <div className="flex space-x-8 w-fit mx-auto">
              {renderMonth(currentMonth, true)}
              {renderMonth(secondMonth, true)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-2 p-4 border-t border-neutral-200">
          {showClearButton && (
            <Button
              onClick={handleClear}
              variant="secondary"
              size="sm"
              disabled={
                !(
                  selectedPredefinedRange === "custom" &&
                  (selectedRange.start || selectedRange.end)
                )
              }
            >
              Clear
            </Button>
          )}
          {showSelectButton && (
            <Button onClick={handleSelect} variant="primary" size="sm">
              Select
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-neutral-200 rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200">
        <Button
          onClick={goToPreviousMonth}
          variant="ghost"
          size="iconSm"
          icon="fa-solid fa-chevron-left"
          ariaLabel="Previous month"
        />

        <h2 className="text-lg font-semibold text-neutral-900">
          {currentMonth.toLocaleDateString(locale, { month: "long", year: "numeric" })}
        </h2>

        <Button
          onClick={goToNextMonth}
          variant="ghost"
          size="iconSm"
          icon="fa-solid fa-chevron-right"
          ariaLabel="Next month"
        />
      </div>

      {/* Calendar Content */}
      <div className="p-4">{renderMonth(currentMonth, false)}</div>

      {/* Footer */}
      <div className="flex justify-end space-x-2 p-4 border-t border-neutral-200">
        {showClearButton && (
          <Button onClick={handleClear} variant="secondary" size="sm">
            Clear
          </Button>
        )}
        {showSelectButton && (
          <Button onClick={handleSelect} variant="primary" size="sm">
            Select
          </Button>
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
  placeholder = "Select date",
  format: _format = "MM/dd/yyyy",
  minDate,
  maxDate,
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [tempSelectedDate, setTempSelectedDate] = React.useState<Date | null>(null);
  const datePickerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (value) {
      setInputValue(value.toLocaleDateString());
    }
  }, [value]);

  // Click-away handler
  React.useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setTempSelectedDate(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleDateSelect = (date: Date) => {
    setTempSelectedDate(date);
    // Don't apply the date immediately, wait for user to click Select
  };

  const handleSelect = () => {
    if (tempSelectedDate) {
      onChange?.(tempSelectedDate);
      setInputValue(tempSelectedDate.toLocaleDateString());
      setIsOpen(false);
      setTempSelectedDate(null);
    }
  };

  return (
    <div ref={datePickerRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full pl-3 pr-10 py-2 border border-neutral-300 rounded-sm focus:outline-none focus:border-black focus:border disabled:opacity-50 cursor-pointer"
          readOnly
        />
        <i className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 fa-solid fa-calendar" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-1500">
          <Calendar
            value={tempSelectedDate || value}
            onChange={handleDateSelect}
            minDate={minDate}
            maxDate={maxDate}
            showSelectButton={true}
            onSelect={handleSelect}
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
  placeholder = "Select date range",
  minDate,
  maxDate,
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

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
          className="w-full pl-3 pr-10 py-2 border border-neutral-300 rounded-sm focus:outline-none focus:border-black focus:border disabled:opacity-50 cursor-pointer"
          readOnly
        />
        <i className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 fa-solid fa-calendar" />
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
