import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconShowcase, IconSizes, IconColors, Icon } from '../foundations/IconLibrary';
import { faHeart, faUser, faCog, faSearch, faBell } from '@fortawesome/free-solid-svg-icons';

const meta: Meta = {
  title: 'Foundations/Icon Library',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Our icon library provides a comprehensive set of icons organized by category. Built on FontAwesome 7 Pro with licensed access to premium icons, consistent sizing and color tokens.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

export const AllIcons: StoryObj = {
  render: () => <IconShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Complete FontAwesome 7 Pro icon library organized by categories: Navigation, Actions, Status, User, Communication, and Settings. Licensed for premium icon access.',
      },
    },
  },
};

export const Sizes: StoryObj = {
  render: () => <IconSizes />,
  parameters: {
    docs: {
      description: {
        story: 'Icon sizes from xs (12px) to 4xl (36px) following our typography scale.',
      },
    },
  },
};

export const Colors: StoryObj = {
  render: () => <IconColors />,
  parameters: {
    docs: {
      description: {
        story: 'Semantic color options for icons including neutral, primary, success, error, warning, and info states.',
      },
    },
  },
};

// Individual icon component stories
const IconMeta: Meta<typeof Icon> = {
  title: 'Foundations/Icon Component',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Standardized Icon component with size and color variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
    color: {
      control: { type: 'select' },
      options: ['neutral', 'primary', 'success', 'error', 'warning', 'info'],
    },
  },
};

export const IconComponent: StoryObj<typeof Icon> = {
  ...IconMeta,
  args: {
    icon: faHeart,
    size: 'base',
    color: 'primary',
  },
};

export const SmallIcon: StoryObj<typeof Icon> = {
  ...IconMeta,
  args: {
    icon: faUser,
    size: 'sm',
    color: 'neutral',
  },
};

export const LargeIcon: StoryObj<typeof Icon> = {
  ...IconMeta,
  args: {
    icon: faCog,
    size: '2xl',
    color: 'primary',
  },
};

export const SuccessIcon: StoryObj<typeof Icon> = {
  ...IconMeta,
  args: {
    icon: faSearch,
    size: 'lg',
    color: 'success',
  },
};

export const ErrorIcon: StoryObj<typeof Icon> = {
  ...IconMeta,
  args: {
    icon: faBell,
    size: 'lg',
    color: 'error',
  },
};

// Usage examples
export const UsageExamples: StoryObj = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-neutral-900">In Buttons</h3>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors">
            <Icon icon={faSearch} size="sm" color="neutral" className="text-white" />
            Search
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded hover:bg-neutral-50 transition-colors">
            <Icon icon={faCog} size="sm" color="neutral" />
            Settings
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-neutral-900">Status Indicators</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Icon icon={faHeart} size="sm" color="success" />
            <span className="text-sm text-neutral-700">Online</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon icon={faHeart} size="sm" color="warning" />
            <span className="text-sm text-neutral-700">Away</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon icon={faHeart} size="sm" color="error" />
            <span className="text-sm text-neutral-700">Offline</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-neutral-900">Navigation</h3>
        <div className="flex items-center gap-4 text-sm text-neutral-600">
          <div className="flex items-center gap-1">
            <Icon icon={faUser} size="sm" color="neutral" />
            Profile
          </div>
          <div className="flex items-center gap-1">
            <Icon icon={faCog} size="sm" color="neutral" />
            Settings
          </div>
          <div className="flex items-center gap-1">
            <Icon icon={faBell} size="sm" color="neutral" />
            Notifications
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of how to use icons in real UI components like buttons, status indicators, and navigation.',
      },
    },
  },
};
