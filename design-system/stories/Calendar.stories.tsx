import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Calendar, DatePicker, DateRangePicker } from '../components/Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Content Display/Calendar',
  component: Calendar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A calendar component for date selection with support for single dates, date ranges, and various customization options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['single', 'range', 'multi-month'],
    },
    showWeekNumbers: {
      control: { type: 'boolean' },
    },
    showClearButton: {
      control: { type: 'boolean' },
    },
    showSelectButton: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleDateSelection: Story = {
  args: {
    variant: 'single',
    value: new Date('2024-03-23'),
    className: 'w-80',
  },
};

export const SingleDateWithMarkers: Story = {
  args: {
    variant: 'single',
    value: new Date('2024-03-23'),
    highlightedDates: [
      new Date('2024-03-10'),
      new Date('2024-03-14'),
      new Date('2024-03-18'),
    ],
    className: 'w-80',
  },
};

export const WithSelectedDate: Story = {
  args: {
    value: new Date('2024-01-15'),
    className: 'w-80',
  },
};

export const WithMinMaxDates: Story = {
  args: {
    minDate: new Date('2024-01-01'),
    maxDate: new Date('2024-12-31'),
    className: 'w-80',
  },
};

export const WithHighlightedDates: Story = {
  args: {
    highlightedDates: [
      new Date('2024-01-15'),
      new Date('2024-01-20'),
      new Date('2024-01-25'),
    ],
    className: 'w-80',
  },
};

export const WithDisabledDates: Story = {
  args: {
    disabledDates: [
      new Date('2024-01-01'), // New Year's Day
      new Date('2024-01-15'), // Martin Luther King Jr. Day
      new Date('2024-02-19'), // Presidents' Day
    ],
    className: 'w-80',
  },
};

export const WithWeekNumbers: Story = {
  args: {
    showWeekNumbers: true,
    className: 'w-80',
  },
};



export const DateRangeSelection: Story = {
  args: {
    variant: 'range',
    rangeStart: new Date('2024-03-23'),
    rangeEnd: new Date('2024-03-26'),
    className: 'w-80',
  },
};

export const MultiMonthWithPredefinedRanges: Story = {
  args: {
    variant: 'multi-month',
    rangeStart: new Date('2024-03-23'),
    rangeEnd: new Date('2024-03-26'),
    predefinedRanges: [
      {
        label: 'Today',
        value: 'today',
        getValue: () => {
          const today = new Date();
          return { start: today, end: today };
        },
      },
      {
        label: 'Yesterday',
        value: 'yesterday',
        getValue: () => {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          return { start: yesterday, end: yesterday };
        },
      },
      {
        label: 'Last 7 days',
        value: 'last7days',
        getValue: () => {
          const end = new Date();
          const start = new Date();
          start.setDate(start.getDate() - 6);
          return { start, end };
        },
      },
      {
        label: 'Last 15 days',
        value: 'last15days',
        getValue: () => {
          const end = new Date();
          const start = new Date();
          start.setDate(start.getDate() - 14);
          return { start, end };
        },
      },
      {
        label: 'Last 30 days',
        value: 'last30days',
        getValue: () => {
          const end = new Date();
          const start = new Date();
          start.setDate(start.getDate() - 29);
          return { start, end };
        },
      },
      {
        label: 'Custom Dates',
        value: 'custom',
        getValue: () => {
          return { start: new Date('2024-03-23'), end: new Date('2024-03-26') };
        },
      },
    ],
    className: 'w-full max-w-4xl',
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-600">
          Selected: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}
        </div>
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          className="w-80"
        />
      </div>
    );
  },
};

export const RangeExample: Story = {
  render: () => {
    const [rangeStart, setRangeStart] = React.useState<Date | undefined>(new Date('2024-01-10'));
    const [rangeEnd, setRangeEnd] = React.useState<Date | undefined>(new Date('2024-01-20'));

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
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date('2024-09-14'));

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-600">
          Selected: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}
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
    const [startDate, setStartDate] = React.useState<Date | undefined>(new Date('2024-09-14'));
    const [endDate, setEndDate] = React.useState<Date | undefined>(new Date('2024-09-14'));

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

export const EventCalendar: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());

    // Sample events
    const events = [
      { date: new Date('2024-01-15'), title: 'Team Meeting', type: 'meeting' },
      { date: new Date('2024-01-20'), title: 'Project Deadline', type: 'deadline' },
      { date: new Date('2024-01-25'), title: 'Client Call', type: 'call' },
      { date: new Date('2024-01-30'), title: 'Product Launch', type: 'launch' },
    ];

    const getEventIndicator = (date: Date) => {
      const event = events.find(e => e.date.toDateString() === date.toDateString());
      if (event) {
        const colors = {
          meeting: 'bg-blue-500',
          deadline: 'bg-red-500',
          call: 'bg-green-500',
          launch: 'bg-purple-500',
        };
        return (
          <div className={`w-2 h-2 rounded-full ${colors[event.type as keyof typeof colors]} absolute bottom-1 left-1/2 transform -translate-x-1/2`} />
        );
      }
      return null;
    };

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-600">
          Selected: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}
        </div>
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          className="w-80"
        />
        <div className="text-xs text-neutral-500 space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Meeting</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>Deadline</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Call</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Launch</span>
          </div>
        </div>
      </div>
    );
  },
};

export const BookingCalendar: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>();

    // Sample availability - only these dates are available
    const availableDates = [
      new Date('2024-01-15'),
      new Date('2024-01-16'),
      new Date('2024-01-17'),
      new Date('2024-01-22'),
      new Date('2024-01-23'),
      new Date('2024-01-24'),
    ];

    // Create array of disabled dates (all dates not in availableDates)
    const generateDisabledDates = () => {
      const disabledDates: Date[] = [];
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31');
      
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toDateString();
        const isAvailable = availableDates.some(availableDate => 
          availableDate.toDateString() === dateStr
        );
        if (!isAvailable) {
          disabledDates.push(new Date(d));
        }
      }
      return disabledDates;
    };

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-600">
          Selected: {selectedDate ? selectedDate.toLocaleDateString() : 'None'}
        </div>
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          disabledDates={generateDisabledDates()}
          className="w-80"
        />
        <div className="text-xs text-neutral-500">
          Available dates are highlighted. Unavailable dates are grayed out.
        </div>
      </div>
    );
  },
};
