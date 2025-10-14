import React from "react";
import { Button } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";

// Time Picker Component
interface TimePickerProps {
  label: string;
  hours: string;
  minutes: string;
  onHoursChange: (hours: string) => void;
  onMinutesChange: (minutes: string) => void;
  minHours?: string;
  minMinutes?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  label,
  hours,
  minutes,
  onHoursChange,
  onMinutesChange,
  minHours,
  minMinutes,
}) => {
  const allHoursOptions = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const allMinutesOptions = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

  // Filter hours based on minHours
  const hoursOptions = minHours
    ? allHoursOptions.filter((h) => parseInt(h, 10) >= parseInt(minHours, 10))
    : allHoursOptions;

  // Filter minutes if the selected hour equals minHours
  const minutesOptions =
    minHours && minMinutes && hours === minHours
      ? allMinutesOptions.filter((m) => parseInt(m, 10) >= parseInt(minMinutes, 10))
      : allMinutesOptions;

  // Convert to DropdownOption format
  const hoursDropdownOptions = hoursOptions.map(h => ({ label: h, value: h }));
  const minutesDropdownOptions = minutesOptions.map(m => ({ label: m, value: m }));

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-neutral-700 min-w-[140px]">{label}</label>
      <div className="flex items-center gap-1">
        <Dropdown
          value={hours}
          options={hoursDropdownOptions}
          onChange={onHoursChange}
          width="70px"
        />
        <span className="text-neutral-500 text-base">:</span>
        <Dropdown
          value={minutes}
          options={minutesDropdownOptions}
          onChange={onMinutesChange}
          width="70px"
        />
      </div>
    </div>
  );
};

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
  showTimePicker?: boolean;
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
  showToday = true,
  showWeekNumbers = false,
  locale = "en-US",
  className = "",
  showClearButton = true,
  showSelectButton = true,
  onClear,
  onSelect,
  predefinedRanges = [],
  showTimePicker = false,
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    return value ? new Date(value.getFullYear(), value.getMonth(), 1) : new Date();
  });

  const [selectedRange, setSelectedRange] = React.useState<{
    start: Date | null;
    end: Date | null;
  }>(() => {
    // Initialize with "today" if variant is multi-month and no range is provided
    if (variant === "multi-month" && !rangeStart && !rangeEnd && showTimePicker) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const endToday = new Date();
      endToday.setHours(23, 59, 0, 0);
      return { start: today, end: endToday };
    } else if (variant === "multi-month" && !rangeStart && !rangeEnd) {
      const today = new Date();
      return { start: today, end: today };
    }
    return {
      start: rangeStart || null,
      end: rangeEnd || null,
    };
  });

  const [selectedPredefinedRange, setSelectedPredefinedRange] = React.useState<string>(() => {
    // Initialize with "singledate" if variant is multi-month and no range is provided
    if (variant === "multi-month" && !rangeStart && !rangeEnd && showTimePicker) {
      return "singledate";
    }
    return variant === "multi-month" && !rangeStart && !rangeEnd ? "singledate" : "";
  });
  const [selectedMonth, setSelectedMonth] = React.useState<Date | null>(() => {
    // Initialize with current month if variant is multi-month and no range is provided
    if (variant === "multi-month" && !rangeStart && !rangeEnd) {
      const today = new Date();
      return new Date(today.getFullYear(), today.getMonth(), 1);
    }
    return null;
  });
  const [secondMonth, setSecondMonth] = React.useState(() => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  });

  // Time picker state - default to start of day (00:00) and end of day (23:59)
  const [startTime, setStartTime] = React.useState<{ hours: string; minutes: string }>(() => {
    if (showTimePicker && (variant === "single" || variant === "range")) {
      // For time picker, default to start of day
      return { hours: "00", minutes: "00" };
    }
    const date = variant === "single" ? value : rangeStart;
    return {
      hours: date ? String(date.getHours()).padStart(2, "0") : "00",
      minutes: date ? String(date.getMinutes()).padStart(2, "0") : "00",
    };
  });

  const [endTime, setEndTime] = React.useState<{ hours: string; minutes: string }>(() => {
    if (showTimePicker && (variant === "single" || variant === "range")) {
      // For time picker, default to end of day
      return { hours: "23", minutes: "59" };
    }
    const date = variant === "single" ? value : rangeEnd;
    if (date) {
      return {
        hours: String(date.getHours()).padStart(2, "0"),
        minutes: String(date.getMinutes()).padStart(2, "0"),
      };
    }
    return {
      hours: "23",
      minutes: "59",
    };
  });

  // Track selected date for displaying in time picker labels
  const [selectedDateForTime, setSelectedDateForTime] = React.useState<Date | null>(() => {
    // Initialize with today if multi-month with singledate and showTimePicker
    if (variant === "multi-month" && !rangeStart && !rangeEnd && showTimePicker) {
      return new Date();
    }
    return value || null;
  });
  
  // Track selected dates for range time picker labels
  const [rangeStartDateForTime, setRangeStartDateForTime] = React.useState<Date | null>(rangeStart || null);
  const [rangeEndDateForTime, setRangeEndDateForTime] = React.useState<Date | null>(rangeEnd || null);

  // Check if selected range is on the same date
  const isSameDate = React.useMemo(() => {
    if (!selectedRange.start || !selectedRange.end) return false;
    return (
      selectedRange.start.getDate() === selectedRange.end.getDate() &&
      selectedRange.start.getMonth() === selectedRange.end.getMonth() &&
      selectedRange.start.getFullYear() === selectedRange.end.getFullYear()
    );
  }, [selectedRange.start, selectedRange.end]);

  // Adjust endTime if it's before startTime (for single date or same date range)
  React.useEffect(() => {
    if (showTimePicker && (variant === "single" || (variant === "range" && isSameDate) || (variant === "multi-month" && (selectedPredefinedRange === "singledate" || isSameDate)))) {
      const startTotalMinutes = parseInt(startTime.hours, 10) * 60 + parseInt(startTime.minutes, 10);
      const endTotalMinutes = parseInt(endTime.hours, 10) * 60 + parseInt(endTime.minutes, 10);
      
      if (endTotalMinutes <= startTotalMinutes) {
        // Set endTime to 1 minute after startTime
        const newEndTotalMinutes = startTotalMinutes + 1;
        const newHours = Math.floor(newEndTotalMinutes / 60);
        const newMinutes = newEndTotalMinutes % 60;
        
        if (newHours < 24) {
          setEndTime({
            hours: String(newHours).padStart(2, "0"),
            minutes: String(newMinutes).padStart(2, "0"),
          });
        } else {
          // If we exceed 23:59, set to 23:59
          setEndTime({ hours: "23", minutes: "59" });
        }
      }
    }
  }, [startTime, showTimePicker, variant, isSameDate, selectedPredefinedRange]);

  // Update range when times change in multi-month variant
  React.useEffect(() => {
    if (showTimePicker && variant === "multi-month" && selectedPredefinedRange && selectedRange.start) {
      if (selectedPredefinedRange === "singledate") {
        // For single date, apply both times to the same date
        const startDateTime = combineDateAndTime(selectedRange.start, startTime.hours, startTime.minutes);
        const endDateTime = combineDateAndTime(selectedRange.start, endTime.hours, endTime.minutes);
        setSelectedRange({ start: startDateTime, end: endDateTime });
      } else if (selectedRange.start && selectedRange.end && selectedPredefinedRange !== "custom") {
        // For predefined ranges (not custom), apply times to the dates
        const startDateTime = combineDateAndTime(selectedRange.start, startTime.hours, startTime.minutes);
        const endDateTime = combineDateAndTime(selectedRange.end, endTime.hours, endTime.minutes);
        setSelectedRange({ start: startDateTime, end: endDateTime });
      }
    }
  }, [startTime, endTime, showTimePicker, variant, selectedPredefinedRange]);

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

  const combineDateAndTime = (date: Date, hours: string, minutes: string): Date => {
    const newDate = new Date(date);
    newDate.setHours(parseInt(hours, 10));
    newDate.setMinutes(parseInt(minutes, 10));
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate;
  };

  const formatDateForTimeLabel = (date: Date | null): string => {
    if (!date) return "";
    const day = date.getDate();
    const month = date.toLocaleDateString(locale, { month: "short" });
    
    // Get ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (day: number): string => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
    
    return `${day}${getOrdinalSuffix(day)} ${month}`;
  };

  const handleDateClick = (date: Date, month: Date) => {
    if (isDateDisabled(date)) return;

    // Track which month the date was selected in
    setSelectedMonth(month);

    if (variant === "multi-month" && selectedPredefinedRange === "singledate") {
      // For single date selection, set both start and end to the same date
      setSelectedDateForTime(date); // Update the selected date for label display
      const dateWithTime = showTimePicker
        ? combineDateAndTime(date, startTime.hours, startTime.minutes)
        : date;
      setSelectedRange({ start: dateWithTime, end: dateWithTime });
      onRangeChange?.(dateWithTime, dateWithTime);
    } else if (
      variant === "range" ||
      (variant === "multi-month" && selectedPredefinedRange === "custom")
    ) {
      if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
        const dateWithTime = showTimePicker
          ? combineDateAndTime(date, startTime.hours, startTime.minutes)
          : date;
        setSelectedRange({ start: dateWithTime, end: null });
        setRangeStartDateForTime(date); // Track start date for label
        setRangeEndDateForTime(null); // Clear end date
      } else {
        const start = selectedRange.start!;
        const endWithTime = showTimePicker
          ? combineDateAndTime(date, endTime.hours, endTime.minutes)
          : date;
        setRangeEndDateForTime(date); // Track end date for label
        if (endWithTime < start) {
          setSelectedRange({ start: endWithTime, end: start });
          setRangeStartDateForTime(date); // Swap dates for label
          setRangeEndDateForTime(selectedRange.start);
          onRangeChange?.(endWithTime, start);
        } else {
          setSelectedRange({ start, end: endWithTime });
          onRangeChange?.(start, endWithTime);
        }
      }
    } else {
      if (showTimePicker) {
        // For single date with time picker, create a time range on the same date
        setSelectedDateForTime(date); // Update the selected date for label display
        const startDateTime = combineDateAndTime(date, startTime.hours, startTime.minutes);
        const endDateTime = combineDateAndTime(date, endTime.hours, endTime.minutes);
        
        // Use onRangeChange if available, otherwise use onChange with start time
        if (onRangeChange) {
          onRangeChange(startDateTime, endDateTime);
        } else {
          onChange?.(startDateTime);
        }
      } else {
        onChange?.(date);
      }
    }
  };

  const goToPreviousMonth = () => {
    // In multi-month view, jump by 2 months; otherwise jump by 1 month
    const monthsToJump = variant === "multi-month" ? 2 : 1;
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - monthsToJump, 1);
    setCurrentMonth(newMonth);
    if (variant === "multi-month") {
      setSecondMonth(new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 1));
    }
  };

  const goToNextMonth = () => {
    // In multi-month view, jump by 2 months; otherwise jump by 1 month
    const monthsToJump = variant === "multi-month" ? 2 : 1;
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + monthsToJump, 1);
    setCurrentMonth(newMonth);
    if (variant === "multi-month") {
      setSecondMonth(new Date(newMonth.getFullYear(), newMonth.getMonth() + 1, 1));
    }
  };

  const goToToday = () => {
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
        setRangeStartDateForTime(null);
        setRangeEndDateForTime(null);
        setSelectedDateForTime(null);
      } else if (rangeValue === "singledate") {
        // For single date, clear the range and let user select a single day
        setSelectedRange({ start: null, end: null });
        setSelectedMonth(null);
        setRangeStartDateForTime(null);
        setRangeEndDateForTime(null);
        setSelectedDateForTime(null);
      } else {
        // For predefined ranges, set the range
        const { start, end } = range.getValue();
        
        // If time picker is enabled, apply times to the dates
        if (showTimePicker) {
          const startWithTime = combineDateAndTime(start, startTime.hours, startTime.minutes);
          const endWithTime = combineDateAndTime(end, endTime.hours, endTime.minutes);
          setSelectedRange({ start: startWithTime, end: endWithTime });
          onRangeChange?.(startWithTime, endWithTime);
        } else {
          setSelectedRange({ start, end });
          onRangeChange?.(start, end);
        }
        
        // Set the selected month to the month containing the start date
        setSelectedMonth(new Date(start.getFullYear(), start.getMonth(), 1));
        // Update date labels for time picker
        setRangeStartDateForTime(start);
        setRangeEndDateForTime(end);
      }
    }
  };

  const handleClear = () => {
    setSelectedRange({ start: null, end: null });
    // Keep 'custom' or 'singledate' selected when clearing dates
    if (selectedPredefinedRange === "custom") {
      setSelectedPredefinedRange("custom");
    } else if (selectedPredefinedRange === "singledate") {
      setSelectedPredefinedRange("singledate");
    } else {
      setSelectedPredefinedRange("");
    }
    setSelectedMonth(null);
    onClear?.();
  };

  const handleSelect = () => {
    // Apply times to the selected range if time picker is enabled
    if (showTimePicker && selectedRange.start) {
      if (selectedPredefinedRange === "singledate" && selectedRange.start) {
        // For single date, apply times to the same date
        const startDateTime = combineDateAndTime(selectedRange.start, startTime.hours, startTime.minutes);
        const endDateTime = combineDateAndTime(selectedRange.start, endTime.hours, endTime.minutes);
        onRangeChange?.(startDateTime, endDateTime);
      } else if (selectedRange.start && selectedRange.end) {
        // For ranges, apply times to respective dates
        const startDateTime = combineDateAndTime(selectedRange.start, startTime.hours, startTime.minutes);
        const endDateTime = combineDateAndTime(selectedRange.end, endTime.hours, endTime.minutes);
        onRangeChange?.(startDateTime, endDateTime);
      }
    }
    onSelect?.();
  };

  const getDaysInMonth = (year: number, month: number): Date[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add days of current month only
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getWeekNumber = (date: Date): number => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const renderMonth = (month: Date, isMultiMonth: boolean = false) => {
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
                      (variant === "range" || isSelectedMonth || isPredefinedRange);
                const isInRange =
                  (variant === "range" || isPredefinedRange || isCustomRange) &&
                  isDateInRange(date) &&
                  (variant === "range" || isSelectedMonth || isPredefinedRange || isCustomRange);
                const isRangeStart =
                  (variant === "range" || isPredefinedRange || isCustomRange) &&
                  isDateRangeStart(date) &&
                  (variant === "range" || isSelectedMonth || isPredefinedRange || isCustomRange);
                const isRangeEnd =
                  (variant === "range" || isPredefinedRange || isCustomRange) &&
                  isDateRangeEnd(date) &&
                  (variant === "range" || isSelectedMonth || isPredefinedRange || isCustomRange);
                const isRangeMiddle =
                  (variant === "range" || isPredefinedRange || isCustomRange) &&
                  isDateRangeMiddle(date) &&
                  (variant === "range" || isSelectedMonth || isPredefinedRange || isCustomRange);
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
      <div className={`bg-white border border-neutral-200 rounded-lg shadow-lg inline-flex flex-col w-fit ${className}`}>
        <div className="flex w-fit">
          {/* Predefined Ranges */}
          <div className="w-48 border-r border-neutral-200 p-4 flex-shrink-0">
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
          <div className="p-4 flex flex-col flex-shrink-0">
            {/* Header */}
            <div className="flex items-center justify-between w-full mb-4">
              <Button
                onClick={goToPreviousMonth}
                variant="ghost"
                size="iconSm"
                icon="fa-solid fa-chevron-left"
                ariaLabel="Previous month"
              />

              <div className="flex items-center gap-4 flex-1 justify-center">
                <h2 className="text-lg font-semibold text-neutral-900 whitespace-nowrap">
                  {currentMonth.toLocaleDateString(locale, { month: "long", year: "numeric" })}
                </h2>
                <h2 className="text-lg font-semibold text-neutral-900 whitespace-nowrap">
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
            <div className="flex gap-4">
              {renderMonth(currentMonth, true)}
              {renderMonth(secondMonth, true)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 w-full">
          {showTimePicker && selectedPredefinedRange && (
            <div className="mb-4 flex justify-between">
              {selectedPredefinedRange === "singledate" ? (
                <>
                  <TimePicker
                    label={selectedDateForTime ? `From ${formatDateForTimeLabel(selectedDateForTime)}:` : "From:"}
                    hours={startTime.hours}
                    minutes={startTime.minutes}
                    onHoursChange={(hours) => setStartTime({ ...startTime, hours })}
                    onMinutesChange={(minutes) => setStartTime({ ...startTime, minutes })}
                  />
                  <TimePicker
                    label={selectedDateForTime ? `To ${formatDateForTimeLabel(selectedDateForTime)}:` : "To:"}
                    hours={endTime.hours}
                    minutes={endTime.minutes}
                    onHoursChange={(hours) => setEndTime({ ...endTime, hours })}
                    onMinutesChange={(minutes) => setEndTime({ ...endTime, minutes })}
                    minHours={startTime.hours}
                    minMinutes={startTime.minutes}
                  />
                </>
              ) : (
                <>
                  <TimePicker
                    label={rangeStartDateForTime ? `From ${formatDateForTimeLabel(rangeStartDateForTime)}:` : "From:"}
                    hours={startTime.hours}
                    minutes={startTime.minutes}
                    onHoursChange={(hours) => setStartTime({ ...startTime, hours })}
                    onMinutesChange={(minutes) => setStartTime({ ...startTime, minutes })}
                  />
                  <TimePicker
                    label={rangeEndDateForTime ? `To ${formatDateForTimeLabel(rangeEndDateForTime)}:` : "To:"}
                    hours={endTime.hours}
                    minutes={endTime.minutes}
                    onHoursChange={(hours) => setEndTime({ ...endTime, hours })}
                    onMinutesChange={(minutes) => setEndTime({ ...endTime, minutes })}
                    minHours={isSameDate ? startTime.hours : undefined}
                    minMinutes={isSameDate ? startTime.minutes : undefined}
                  />
                </>
              )}
            </div>
          )}
          <div className="flex justify-end space-x-2">
            {showClearButton && (
              <Button
                onClick={handleClear}
                variant="secondary"
                size="sm"
                disabled={
                  !(
                    (selectedPredefinedRange === "custom" || selectedPredefinedRange === "singledate") &&
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
      <div className="p-4 border-t border-neutral-200">
        {showTimePicker && (
          <div className="mb-4 space-y-2">
            {variant === "range" ? (
              <>
                <TimePicker
                  label={rangeStartDateForTime ? `From ${formatDateForTimeLabel(rangeStartDateForTime)}:` : "From:"}
                  hours={startTime.hours}
                  minutes={startTime.minutes}
                  onHoursChange={(hours) => setStartTime({ ...startTime, hours })}
                  onMinutesChange={(minutes) => setStartTime({ ...startTime, minutes })}
                />
                <TimePicker
                  label={rangeEndDateForTime ? `To ${formatDateForTimeLabel(rangeEndDateForTime)}:` : "To:"}
                  hours={endTime.hours}
                  minutes={endTime.minutes}
                  onHoursChange={(hours) => setEndTime({ ...endTime, hours })}
                  onMinutesChange={(minutes) => setEndTime({ ...endTime, minutes })}
                  minHours={isSameDate ? startTime.hours : undefined}
                  minMinutes={isSameDate ? startTime.minutes : undefined}
                />
              </>
            ) : (
              <>
                <TimePicker
                  label={selectedDateForTime ? `From ${formatDateForTimeLabel(selectedDateForTime)}:` : "From:"}
                  hours={startTime.hours}
                  minutes={startTime.minutes}
                  onHoursChange={(hours) => setStartTime({ ...startTime, hours })}
                  onMinutesChange={(minutes) => setStartTime({ ...startTime, minutes })}
                />
                <TimePicker
                  label={selectedDateForTime ? `To ${formatDateForTimeLabel(selectedDateForTime)}:` : "To:"}
                  hours={endTime.hours}
                  minutes={endTime.minutes}
                  onHoursChange={(hours) => setEndTime({ ...endTime, hours })}
                  onMinutesChange={(minutes) => setEndTime({ ...endTime, minutes })}
                  minHours={startTime.hours}
                  minMinutes={startTime.minutes}
                />
              </>
            )}
          </div>
        )}
        <div className="flex gap-2">
          {showClearButton && (
            <Button onClick={handleClear} variant="secondary" size="sm" className="flex-1">
              Clear
            </Button>
          )}
          {showSelectButton && (
            <Button onClick={handleSelect} variant="primary" size="sm" className="flex-1">
              Select
            </Button>
          )}
        </div>
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
  showTimePicker?: boolean;
  endValue?: Date;
  onRangeChange?: (start: Date, end: Date) => void;
}> = ({
  value,
  onChange,
  placeholder = "Select date",
  format = "MM/dd/yyyy",
  minDate,
  maxDate,
  disabled = false,
  className = "",
  showTimePicker = false,
  endValue,
  onRangeChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [tempSelectedDate, setTempSelectedDate] = React.useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = React.useState<Date | null>(null);
  const datePickerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (value) {
      if (showTimePicker && endValue) {
        const startTime = value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        const endTime = endValue.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setInputValue(
          `${value.toLocaleDateString()} ${startTime} - ${endTime}`,
        );
      } else if (showTimePicker) {
        setInputValue(
          `${value.toLocaleDateString()} ${value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
        );
      } else {
        setInputValue(value.toLocaleDateString());
      }
    }
  }, [value, endValue, showTimePicker]);

  // Click-away handler
  React.useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setTempSelectedDate(null);
        setTempEndDate(null);
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

  const handleTimeRangeChange = (start: Date, end: Date) => {
    setTempSelectedDate(start);
    setTempEndDate(end);
  };

  const handleSelect = () => {
    if (showTimePicker && tempSelectedDate && tempEndDate && onRangeChange) {
      // For time picker with range
      onRangeChange(tempSelectedDate, tempEndDate);
      const startTime = tempSelectedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const endTime = tempEndDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setInputValue(
        `${tempSelectedDate.toLocaleDateString()} ${startTime} - ${endTime}`,
      );
      setIsOpen(false);
      setTempSelectedDate(null);
      setTempEndDate(null);
    } else if (tempSelectedDate) {
      onChange?.(tempSelectedDate);
      if (showTimePicker) {
        setInputValue(
          `${tempSelectedDate.toLocaleDateString()} ${tempSelectedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
        );
      } else {
        setInputValue(tempSelectedDate.toLocaleDateString());
      }
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
        <i className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 fa-solid fa-calendar flex items-center justify-center" />
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
            showTimePicker={showTimePicker}
            onRangeChange={showTimePicker ? handleTimeRangeChange : undefined}
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
  showTimePicker?: boolean;
}> = ({
  startDate,
  endDate,
  onChange,
  placeholder = "Select date range",
  minDate,
  maxDate,
  disabled = false,
  className = "",
  showTimePicker = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [tempRangeStart, setTempRangeStart] = React.useState<Date | undefined>(undefined);
  const [tempRangeEnd, setTempRangeEnd] = React.useState<Date | undefined>(undefined);
  const datePickerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (startDate && endDate) {
      if (showTimePicker) {
        setInputValue(
          `${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${endDate.toLocaleDateString()} ${endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
        );
      } else {
        setInputValue(`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
      }
    }
  }, [startDate, endDate, showTimePicker]);

  // Click-away handler
  React.useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setTempRangeStart(undefined);
        setTempRangeEnd(undefined);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      // Initialize temp range with current values when opening
      if (!isOpen) {
        setTempRangeStart(startDate);
        setTempRangeEnd(endDate);
      }
    }
  };

  const handleRangeChange = (start: Date, end: Date) => {
    // Store temporary selection, don't apply yet
    setTempRangeStart(start);
    setTempRangeEnd(end);
  };

  const handleSelect = () => {
    // Apply the selection when Select is clicked
    if (tempRangeStart && tempRangeEnd) {
      onChange?.(tempRangeStart, tempRangeEnd);
      if (showTimePicker) {
        setInputValue(
          `${tempRangeStart.toLocaleDateString()} ${tempRangeStart.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${tempRangeEnd.toLocaleDateString()} ${tempRangeEnd.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
        );
      } else {
        setInputValue(`${tempRangeStart.toLocaleDateString()} - ${tempRangeEnd.toLocaleDateString()}`);
      }
      setIsOpen(false);
      setTempRangeStart(undefined);
      setTempRangeEnd(undefined);
    }
  };

  return (
    <div ref={datePickerRef} className={`relative ${className}`}>
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
        <i className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 fa-solid fa-calendar flex items-center justify-center" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 z-1500">
          <Calendar
            variant="range"
            rangeStart={tempRangeStart}
            rangeEnd={tempRangeEnd}
            onRangeChange={handleRangeChange}
            minDate={minDate}
            maxDate={maxDate}
            showSelectButton={true}
            onSelect={handleSelect}
            showTimePicker={showTimePicker}
          />
        </div>
      )}
    </div>
  );
};
