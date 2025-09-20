import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '../components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRobot } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    status: {
      control: { type: 'select' },
      options: ['online', 'offline', 'away', 'busy'],
    },
    statusPosition: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initials: 'JD',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
  },
};

export const WithInitials: Story = {
  args: {
    initials: 'JD',
  },
};

export const WithFallbackIcon: Story = {
  args: {
    fallbackIcon: <FontAwesomeIcon icon={faUser} />,
  },
};

export const WithCustomIcon: Story = {
  args: {
    fallbackIcon: <FontAwesomeIcon icon={faRobot} />,
  },
};

export const Online: Story = {
  args: {
    initials: 'JD',
    status: 'online',
  },
};

export const Offline: Story = {
  args: {
    initials: 'JD',
    status: 'offline',
  },
};

export const Away: Story = {
  args: {
    initials: 'JD',
    status: 'away',
  },
};

export const Busy: Story = {
  args: {
    initials: 'JD',
    status: 'busy',
  },
};

export const Square: Story = {
  args: {
    initials: 'JD',
    shape: 'square',
  },
};

export const ExtraSmall: Story = {
  args: {
    initials: 'JD',
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    initials: 'JD',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    initials: 'JD',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    initials: 'JD',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    initials: 'JD',
    size: 'xl',
  },
};

export const StatusTopLeft: Story = {
  args: {
    initials: 'JD',
    status: 'online',
    statusPosition: 'top-left',
  },
};

export const StatusTopRight: Story = {
  args: {
    initials: 'JD',
    status: 'online',
    statusPosition: 'top-right',
  },
};

export const StatusBottomLeft: Story = {
  args: {
    initials: 'JD',
    status: 'online',
    statusPosition: 'bottom-left',
  },
};

export const StatusBottomRight: Story = {
  args: {
    initials: 'JD',
    status: 'online',
    statusPosition: 'bottom-right',
  },
};

export const Clickable: Story = {
  args: {
    initials: 'JD',
    onClick: () => console.log('Avatar clicked!'),
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar initials="JD" size="xs" />
      <Avatar initials="JD" size="sm" />
      <Avatar initials="JD" size="md" />
      <Avatar initials="JD" size="lg" />
      <Avatar initials="JD" size="xl" />
    </div>
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar initials="JD" status="online" />
      <Avatar initials="JD" status="offline" />
      <Avatar initials="JD" status="away" />
      <Avatar initials="JD" status="busy" />
    </div>
  ),
};
