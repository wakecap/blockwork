import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar, DatePicker, DateRangePicker } from "./Calendar";

const meta: Meta<typeof Calendar> = {
  title: "Content Display/Calendar",
  component: Calendar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A calendar component for date selection with support for single dates, date ranges, and various customization options.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["single", "range", "multi-month"],
    },
    showWeekNumbers: {
      control: { type: "boolean" },
    },
    showClearButton: {
      control: { type: "boolean" },
    },
    showSelectButton: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleDateSelection: Story = {
  args: {
    variant: "single",
    value: new Date("2024-03-23"),
    className: "w-80",
  },
};

export const SingleDateWithMarkers: Story = {
  args: {
    variant: "single",
    value: new Date("2024-03-23"),
    highlightedDates: [new Date("2024-03-10"), new Date("2024-03-14"), new Date("2024-03-18")],
    className: "w-80",
  },
};

export const DateRangeSelection: Story = {
  args: {
    variant: "range",
    rangeStart: new Date("2024-03-23"),
    rangeEnd: new Date("2024-03-26"),
    className: "w-80",
  },
};

export const MultiMonthWithPredefinedRanges: Story = {
  args: {
    variant: "multi-month",
    rangeStart: new Date("2024-03-23"),
    rangeEnd: new Date("2024-03-26"),
    predefinedRanges: [
      {
        label: "Today",
        value: "today",
        getValue: () => {
          const today = new Date();
          return { start: today, end: today };
        },
      },
      {
        label: "Yesterday",
        value: "yesterday",
        getValue: () => {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          return { start: yesterday, end: yesterday };
        },
      },
      {
        label: "Last 7 days",
        value: "last7days",
        getValue: () => {
          const end = new Date();
          const start = new Date();
          start.setDate(start.getDate() - 6);
          return { start, end };
        },
      },
      {
        label: "Last 15 days",
        value: "last15days",
        getValue: () => {
          const end = new Date();
          const start = new Date();
          start.setDate(start.getDate() - 14);
          return { start, end };
        },
      },
      {
        label: "Last 30 days",
        value: "last30days",
        getValue: () => {
          const end = new Date();
          const start = new Date();
          start.setDate(start.getDate() - 29);
          return { start, end };
        },
      },
      {
        label: "Custom Dates",
        value: "custom",
        getValue: () => {
          return { start: new Date("2024-03-23"), end: new Date("2024-03-26") };
        },
      },
    ],
    className: "w-full max-w-4xl",
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-600">
          Selected: {selectedDate ? selectedDate.toLocaleDateString() : "None"}
        </div>
        <Calendar value={selectedDate} onChange={setSelectedDate} className="w-80" />
      </div>
    );
  },
};

export const RangeExample: Story = {
  render: () => {
    const [rangeStart, setRangeStart] = React.useState<Date | undefined>(new Date("2024-01-10"));
    const [rangeEnd, setRangeEnd] = React.useState<Date | undefined>(new Date("2024-01-20"));

    const handleRangeChange = (start: Date, end: Date) => {
      setRangeStart(start);
      setRangeEnd(end);
    };

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-600">
          Range: {rangeStart?.toLocaleDateString()} - {rangeEnd?.toLocaleDateString()}
        </div>
        <Calendar
          variant="range"
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onRangeChange={handleRangeChange}
          className="w-80"
        />
      </div>
    );
  },
};

// Pre-built Calendar Components
export const DatePickerExample: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
      new Date("2024-09-14"),
    );

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-600">
          Selected: {selectedDate ? selectedDate.toLocaleDateString() : "None"}
        </div>
        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          placeholder="Select a date"
          className="w-80"
        />
      </div>
    );
  },
};

export const DateRangePickerExample: Story = {
  render: () => {
    const [startDate, setStartDate] = React.useState<Date | undefined>(new Date("2024-09-14"));
    const [endDate, setEndDate] = React.useState<Date | undefined>(new Date("2024-09-14"));

    const handleRangeChange = (start: Date, end: Date) => {
      setStartDate(start);
      setEndDate(end);
    };

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-600">
          Range: {startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}
        </div>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChange={handleRangeChange}
          placeholder="Select date range"
          className="w-80"
        />
      </div>
    );
  },
};
