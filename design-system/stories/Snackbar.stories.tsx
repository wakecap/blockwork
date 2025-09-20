import type { Meta, StoryObj } from '@storybook/react-vite';
import { Snackbar } from '../components/Snackbar';
import { useState } from 'react';

const meta: Meta<typeof Snackbar> = {
  title: 'Feedback & Status/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
    },
    position: {
      control: { type: 'select' },
      options: ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'],
    },
    autoHideDuration: {
      control: { type: 'number', min: 0, max: 10000, step: 500 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component
const SnackbarWrapper: React.FC<{
  variant?: 'success' | 'error' | 'warning' | 'info';
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  autoHideDuration?: number;
  showCloseButton?: boolean;
  message: string;
}> = ({ variant = 'info', position = 'bottom-right', autoHideDuration = 5000, showCloseButton = true, message }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
      >
        Show Snackbar
      </button>
      <Snackbar
        message={message}
        variant={variant}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position={position}
        autoHideDuration={autoHideDuration}
        showCloseButton={showCloseButton}
      />
    </div>
  );
};

export const Success: Story = {
  render: (args) => <SnackbarWrapper {...args} variant="success" message="Success! Your changes have been saved." />,
  args: {
    variant: 'success',
    position: 'bottom-right',
    autoHideDuration: 5000,
    showCloseButton: true,
  },
};

export const Error: Story = {
  render: (args) => <SnackbarWrapper {...args} variant="error" message="Error! Failed to save your changes." />,
  args: {
    variant: 'error',
    position: 'bottom-right',
    autoHideDuration: 5000,
    showCloseButton: true,
  },
};

export const Warning: Story = {
  render: (args) => <SnackbarWrapper {...args} variant="warning" message="Warning! Please check your input." />,
  args: {
    variant: 'warning',
    position: 'bottom-right',
    autoHideDuration: 5000,
    showCloseButton: true,
  },
};

export const Info: Story = {
  render: (args) => <SnackbarWrapper {...args} variant="info" message="Info: New features are available." />,
  args: {
    variant: 'info',
    position: 'bottom-right',
    autoHideDuration: 5000,
    showCloseButton: true,
  },
};

export const TopRight: Story = {
  render: (args) => <SnackbarWrapper {...args} position="top-right" message="Top right notification" />,
  args: {
    position: 'top-right',
    autoHideDuration: 5000,
    showCloseButton: true,
  },
};

export const TopCenter: Story = {
  render: (args) => <SnackbarWrapper {...args} position="top-center" message="Top center notification" />,
  args: {
    position: 'top-center',
    autoHideDuration: 5000,
    showCloseButton: true,
  },
};

export const BottomLeft: Story = {
  render: (args) => <SnackbarWrapper {...args} position="bottom-left" message="Bottom left notification" />,
  args: {
    position: 'bottom-left',
    autoHideDuration: 5000,
    showCloseButton: true,
  },
};

export const NoAutoHide: Story = {
  render: (args) => <SnackbarWrapper {...args} autoHideDuration={0} message="This won't auto-hide" />,
  args: {
    autoHideDuration: 0,
    showCloseButton: true,
  },
};

export const NoCloseButton: Story = {
  render: (args) => <SnackbarWrapper {...args} showCloseButton={false} message="No close button" />,
  args: {
    showCloseButton: false,
    autoHideDuration: 5000,
  },
};

export const LongMessage: Story = {
  render: (args) => (
    <SnackbarWrapper
      {...args}
      message="This is a very long message that demonstrates how the snackbar handles longer content. It should wrap properly and maintain good readability."
    />
  ),
  args: {
    autoHideDuration: 5000,
    showCloseButton: true,
  },
};


