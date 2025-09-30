import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonButton, SkeletonCard, SkeletonTable } from '../components/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'circular', 'rectangular', 'rounded'],
    },
    animation: {
      control: { type: 'select' },
      options: ['pulse', 'wave', 'none'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicSkeleton: Story = {
  args: {
    variant: 'text',
    width: '100%',
    height: 16,
    animation: 'pulse',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Skeleton Variants</h3>
        <div className="flex items-center space-x-4">
          <div>
            <div className="text-sm text-neutral-600 mb-2">Text</div>
            <Skeleton variant="text" width={200} />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">Circular</div>
            <Skeleton variant="circular" width={40} height={40} />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">Rectangular</div>
            <Skeleton variant="rectangular" width={100} height={60} />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">Rounded</div>
            <Skeleton variant="rounded" width={100} height={60} />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AllAnimations: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">Animation Types</h3>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-neutral-600 mb-2">Pulse</div>
            <Skeleton variant="text" width={200} animation="pulse" />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">Wave</div>
            <Skeleton variant="text" width={200} animation="wave" />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">None</div>
            <Skeleton variant="text" width={200} animation="none" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SkeletonTextComponent: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">SkeletonText - Different Line Counts</h3>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-neutral-600 mb-2">1 Line</div>
            <SkeletonText lines={1} />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">3 Lines</div>
            <SkeletonText lines={3} />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">5 Lines</div>
            <SkeletonText lines={5} />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SkeletonAvatarComponent: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">SkeletonAvatar - All Sizes</h3>
        <div className="flex items-center space-x-4">
          <div>
            <div className="text-sm text-neutral-600 mb-2">Small</div>
            <SkeletonAvatar size="sm" />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">Medium</div>
            <SkeletonAvatar size="md" />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">Large</div>
            <SkeletonAvatar size="lg" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SkeletonButtonComponent: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">SkeletonButton - All Sizes</h3>
        <div className="flex items-center space-x-4">
          <div>
            <div className="text-sm text-neutral-600 mb-2">Small</div>
            <SkeletonButton size="sm" />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">Medium</div>
            <SkeletonButton size="md" />
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-2">Large</div>
            <SkeletonButton size="lg" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SkeletonCardComponent: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">SkeletonCard</h3>
        <div className="max-w-sm">
          <SkeletonCard />
        </div>
      </div>
    </div>
  ),
};

export const SkeletonTableComponent: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-4">SkeletonTable</h3>
        <div className="max-w-2xl">
          <SkeletonTable rows={5} columns={4} />
        </div>
      </div>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">User Profile Loading</h3>
        <div className="flex items-start space-x-4 p-4 border border-neutral-200 rounded-lg">
          <SkeletonAvatar size="lg" />
          <div className="flex-1 space-y-2">
            <SkeletonText lines={2} />
            <div className="flex space-x-2">
              <SkeletonButton size="sm" />
              <SkeletonButton size="sm" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Content Loading</h3>
        <div className="space-y-4">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="rectangular" width="100%" height={200} className="rounded-lg" />
          <SkeletonText lines={3} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Form Loading</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <Skeleton variant="text" width={80} height={16} className="mb-2" />
            <Skeleton variant="rounded" width="100%" height={40} />
          </div>
          <div>
            <Skeleton variant="text" width={80} height={16} className="mb-2" />
            <Skeleton variant="rounded" width="100%" height={40} />
          </div>
          <div>
            <Skeleton variant="text" width={80} height={16} className="mb-2" />
            <Skeleton variant="rounded" width="100%" height={100} />
          </div>
          <div className="flex space-x-2">
            <SkeletonButton size="md" />
            <SkeletonButton size="md" />
          </div>
        </div>
      </div>
    </div>
  ),
};


