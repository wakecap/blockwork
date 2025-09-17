import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A small status indicator component for displaying labels, counts, or status information. Built with shadcn/ui patterns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info', 'wakecap'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
};

export const WakeCap: Story = {
  args: {
    variant: 'wakecap',
    children: 'WakeCap',
  },
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="destructive">Inactive</Badge>
      <Badge variant="info">Draft</Badge>
      <Badge variant="wakecap">Featured</Badge>
    </div>
  ),
};

export const CountBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">5</Badge>
      <Badge variant="secondary">12</Badge>
      <Badge variant="destructive">3</Badge>
      <Badge variant="success">99+</Badge>
      <Badge variant="wakecap">New</Badge>
    </div>
  ),
};

export const PriorityBadges: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">High Priority:</span>
        <Badge variant="destructive">High</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Medium Priority:</span>
        <Badge variant="warning">Medium</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Low Priority:</span>
        <Badge variant="info">Low</Badge>
      </div>
    </div>
  ),
};

export const UserRoles: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">Admin:</span>
        <Badge variant="destructive">Admin</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Manager:</span>
        <Badge variant="wakecap">Manager</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">User:</span>
        <Badge variant="default">User</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Guest:</span>
        <Badge variant="secondary">Guest</Badge>
      </div>
    </div>
  ),
};

export const ProjectStatus: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">In Progress:</span>
        <Badge variant="info">In Progress</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Completed:</span>
        <Badge variant="success">Completed</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">On Hold:</span>
        <Badge variant="warning">On Hold</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Cancelled:</span>
        <Badge variant="destructive">Cancelled</Badge>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="wakecap">WakeCap</Badge>
    </div>
  ),
};
