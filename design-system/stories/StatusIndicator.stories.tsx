import type { Meta, StoryObj } from '@storybook/react';
import { 
  StatusIndicator, 
  OnlineStatus, 
  OfflineStatus, 
  AwayStatus, 
  BusyStatus, 
  ActiveStatus, 
  InactiveStatus 
} from '../components/StatusIndicator';

const meta: Meta<typeof StatusIndicator> = {
  title: 'Feedback & Status/StatusIndicator',
  component: StatusIndicator,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: { type: 'select' },
      options: ['online', 'offline', 'away', 'busy', 'active', 'inactive', 'pending', 'error'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['dot', 'ring', 'pulse'],
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Online: Story = {
  args: {
    status: 'online',
    size: 'md',
    showLabel: true,
    labelPosition: 'right',
    variant: 'dot',
  },
};

export const Offline: Story = {
  args: {
    status: 'offline',
    size: 'md',
    showLabel: true,
    labelPosition: 'right',
    variant: 'dot',
  },
};

export const Away: Story = {
  args: {
    status: 'away',
    size: 'md',
    showLabel: true,
    labelPosition: 'right',
    variant: 'dot',
  },
};

export const Busy: Story = {
  args: {
    status: 'busy',
    size: 'md',
    showLabel: true,
    labelPosition: 'right',
    variant: 'dot',
  },
};

export const Active: Story = {
  args: {
    status: 'active',
    size: 'md',
    showLabel: true,
    labelPosition: 'right',
    variant: 'dot',
  },
};

export const Inactive: Story = {
  args: {
    status: 'inactive',
    size: 'md',
    showLabel: true,
    labelPosition: 'right',
    variant: 'dot',
  },
};

export const Pending: Story = {
  args: {
    status: 'pending',
    size: 'md',
    showLabel: true,
    labelPosition: 'right',
    variant: 'dot',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    size: 'md',
    showLabel: true,
    labelPosition: 'right',
    variant: 'dot',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">All Sizes - Online Status</h3>
        <div className="flex items-center space-x-6">
          <div>
            <div className="text-sm text-neutral-600 mb-2">Extra Small</div>
            <StatusIndicator status="online" size="xs" showLabel labelPosition="right" />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">Small</div>
            <StatusIndicator status="online" size="sm" showLabel labelPosition="right" />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">Medium</div>
            <StatusIndicator status="online" size="md" showLabel labelPosition="right" />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">Large</div>
            <StatusIndicator status="online" size="lg" showLabel labelPosition="right" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">All Variants - Online Status</h3>
        <div className="flex items-center space-x-6">
          <div>
            <div className="text-sm text-neutral-600 mb-2">Dot</div>
            <StatusIndicator status="online" variant="dot" showLabel labelPosition="right" />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">Ring</div>
            <StatusIndicator status="online" variant="ring" showLabel labelPosition="right" />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">Pulse</div>
            <StatusIndicator status="online" variant="pulse" showLabel labelPosition="right" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">All Status Types</h3>
        <div className="grid grid-cols-2 gap-4">
          <StatusIndicator status="online" showLabel labelPosition="right" />
          <StatusIndicator status="offline" showLabel labelPosition="right" />
          <StatusIndicator status="away" showLabel labelPosition="right" />
          <StatusIndicator status="busy" showLabel labelPosition="right" />
          <StatusIndicator status="active" showLabel labelPosition="right" />
          <StatusIndicator status="inactive" showLabel labelPosition="right" />
          <StatusIndicator status="pending" showLabel labelPosition="right" />
          <StatusIndicator status="error" showLabel labelPosition="right" />
        </div>
      </div>
    </div>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Label Positions</h3>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-neutral-600 mb-2">Top</div>
            <StatusIndicator status="online" showLabel labelPosition="top" />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">Right</div>
            <StatusIndicator status="online" showLabel labelPosition="right" />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">Bottom</div>
            <StatusIndicator status="online" showLabel labelPosition="bottom" />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">Left</div>
            <StatusIndicator status="online" showLabel labelPosition="left" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const WithoutLabels: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Without Labels</h3>
        <div className="flex items-center space-x-4">
          <StatusIndicator status="online" showLabel={false} />
          <StatusIndicator status="offline" showLabel={false} />
          <StatusIndicator status="away" showLabel={false} />
          <StatusIndicator status="busy" showLabel={false} />
          <StatusIndicator status="active" showLabel={false} />
          <StatusIndicator status="inactive" showLabel={false} />
          <StatusIndicator status="pending" showLabel={false} />
          <StatusIndicator status="error" showLabel={false} />
        </div>
      </div>
    </div>
  ),
};

export const PredefinedComponents: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Predefined Status Components</h3>
        <div className="grid grid-cols-2 gap-4">
          <OnlineStatus showLabel labelPosition="right" />
          <OfflineStatus showLabel labelPosition="right" />
          <AwayStatus showLabel labelPosition="right" />
          <BusyStatus showLabel labelPosition="right" />
          <ActiveStatus showLabel labelPosition="right" />
          <InactiveStatus showLabel labelPosition="right" />
        </div>
      </div>
    </div>
  ),
};

export const UserListExample: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">User Status Example</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-neutral-300 rounded-full"></div>
            <span className="font-medium">John Doe</span>
          </div>
          <OnlineStatus size="sm" showLabel={false} />
        </div>
        <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-neutral-300 rounded-full"></div>
            <span className="font-medium">Jane Smith</span>
          </div>
          <AwayStatus size="sm" showLabel={false} />
        </div>
        <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-neutral-300 rounded-full"></div>
            <span className="font-medium">Bob Johnson</span>
          </div>
          <OfflineStatus size="sm" showLabel={false} />
        </div>
        <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-neutral-300 rounded-full"></div>
            <span className="font-medium">Alice Brown</span>
          </div>
          <BusyStatus size="sm" showLabel={false} />
        </div>
      </div>
    </div>
  ),
};


