import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from '../components/Alert';
import { useState } from 'react';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
    },
    showIcon: {
      control: 'boolean',
    },
    showCloseButton: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper for closeable alerts
const AlertWrapper: React.FC<{
  variant?: 'success' | 'error' | 'warning' | 'info';
  showIcon?: boolean;
  showCloseButton?: boolean;
  title?: string;
  message: string;
}> = ({ variant = 'info', showIcon = true, showCloseButton = false, title, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
      >
        Show Alert
      </button>
    );
  }

  return (
    <Alert
      title={title}
      message={message}
      variant={variant}
      showIcon={showIcon}
      showCloseButton={showCloseButton}
      onClose={showCloseButton ? () => setIsVisible(false) : undefined}
    />
  );
};

export const Success: Story = {
  args: {
    title: 'Success!',
    message: 'Your changes have been saved successfully.',
    variant: 'success',
    showIcon: true,
    showCloseButton: false,
  },
};

export const Error: Story = {
  args: {
    title: 'Error!',
    message: 'There was an error saving your changes. Please try again.',
    variant: 'error',
    showIcon: true,
    showCloseButton: false,
  },
};

export const Warning: Story = {
  args: {
    title: 'Warning!',
    message: 'Please review your input before proceeding.',
    variant: 'warning',
    showIcon: true,
    showCloseButton: false,
  },
};

export const Info: Story = {
  args: {
    title: 'Information',
    message: 'New features are available in the latest update.',
    variant: 'info',
    showIcon: true,
    showCloseButton: false,
  },
};

export const WithoutTitle: Story = {
  args: {
    message: 'This alert doesn\'t have a title, just a message.',
    variant: 'info',
    showIcon: true,
    showCloseButton: false,
  },
};

export const WithoutIcon: Story = {
  args: {
    title: 'No Icon',
    message: 'This alert doesn\'t show an icon.',
    variant: 'info',
    showIcon: false,
    showCloseButton: false,
  },
};

export const Closeable: Story = {
  render: (args) => <AlertWrapper {...args} showCloseButton={true} />,
  args: {
    title: 'Closeable Alert',
    message: 'This alert can be closed by clicking the X button.',
    variant: 'info',
    showIcon: true,
    showCloseButton: true,
  },
};

export const WithAction: Story = {
  args: {
    title: 'Action Required',
    message: 'Please complete the required action to continue.',
    variant: 'warning',
    showIcon: true,
    showCloseButton: false,
    children: (
      <div className="flex gap-2 mt-3">
        <button className="px-3 py-1 bg-warning-600 text-white text-sm rounded hover:bg-warning-700 transition-colors">
          Take Action
        </button>
        <button className="px-3 py-1 bg-neutral-200 text-neutral-700 text-sm rounded hover:bg-neutral-300 transition-colors">
          Dismiss
        </button>
      </div>
    ),
  },
};

export const LongMessage: Story = {
  args: {
    title: 'Important Notice',
    message: 'This is a very long message that demonstrates how the alert component handles longer content. It should wrap properly and maintain good readability while providing clear information to the user about what they need to know or do.',
    variant: 'info',
    showIcon: true,
    showCloseButton: false,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert
        title="Success"
        message="Operation completed successfully."
        variant="success"
      />
      <Alert
        title="Error"
        message="Something went wrong. Please try again."
        variant="error"
      />
      <Alert
        title="Warning"
        message="Please review your input before proceeding."
        variant="warning"
      />
      <Alert
        title="Information"
        message="Here's some helpful information."
        variant="info"
      />
    </div>
  ),
};


