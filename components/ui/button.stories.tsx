import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { Search, Download, ArrowRight, Check, AlertTriangle, X, Info } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component built with shadcn/ui patterns and Tailwind CSS. Features WakeCap-specific variants with black-primary design system.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default', 'destructive', 'outline', 'secondary', 'ghost', 'link',
        'wakecap', 'wakecap-secondary', 'wakecap-accent', 'wakecap-outline', 
        'wakecap-ghost', 'wakecap-text', 'wakecap-success', 'wakecap-warning', 
        'wakecap-destructive', 'wakecap-info'
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
    asChild: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
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

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

// WakeCap Variants
export const WakeCapPrimary: Story = {
  args: {
    variant: 'wakecap',
    children: 'WakeCap Primary',
  },
};

export const WakeCapSecondary: Story = {
  args: {
    variant: 'wakecap-secondary',
    children: 'WakeCap Secondary',
  },
};

export const WakeCapAccent: Story = {
  args: {
    variant: 'wakecap-accent',
    children: 'WakeCap Accent',
  },
};

export const WakeCapOutline: Story = {
  args: {
    variant: 'wakecap-outline',
    children: 'WakeCap Outline',
  },
};

export const WakeCapGhost: Story = {
  args: {
    variant: 'wakecap-ghost',
    children: 'WakeCap Ghost',
  },
};

export const WakeCapText: Story = {
  args: {
    variant: 'wakecap-text',
    children: 'WakeCap Text',
  },
};

export const WakeCapSuccess: Story = {
  args: {
    variant: 'wakecap-success',
    children: 'WakeCap Success',
  },
};

export const WakeCapWarning: Story = {
  args: {
    variant: 'wakecap-warning',
    children: 'WakeCap Warning',
  },
};

export const WakeCapDestructive: Story = {
  args: {
    variant: 'wakecap-destructive',
    children: 'WakeCap Destructive',
  },
};

export const WakeCapInfo: Story = {
  args: {
    variant: 'wakecap-info',
    children: 'WakeCap Info',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Download className="mr-2 h-4 w-4" />
        Download
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    size: 'icon',
    children: <Search className="h-4 w-4" />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Standard Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">WakeCap Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="wakecap">WakeCap Primary</Button>
          <Button variant="wakecap-secondary">WakeCap Secondary</Button>
          <Button variant="wakecap-accent">WakeCap Accent</Button>
          <Button variant="wakecap-outline">WakeCap Outline</Button>
          <Button variant="wakecap-ghost">WakeCap Ghost</Button>
          <Button variant="wakecap-text">WakeCap Text</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Semantic Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="wakecap-success">Success</Button>
          <Button variant="wakecap-warning">Warning</Button>
          <Button variant="wakecap-destructive">Destructive</Button>
          <Button variant="wakecap-info">Info</Button>
        </div>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button variant="wakecap">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button variant="wakecap-outline">
          <ArrowRight className="mr-2 h-4 w-4" />
          Continue
        </Button>
        <Button variant="wakecap-accent">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Button variant="wakecap-success">
          <Check className="mr-2 h-4 w-4" />
          Success
        </Button>
        <Button variant="wakecap-warning">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Warning
        </Button>
        <Button variant="wakecap-destructive">
          <X className="mr-2 h-4 w-4" />
          Delete
        </Button>
        <Button variant="wakecap-info">
          <Info className="mr-2 h-4 w-4" />
          Info
        </Button>
      </div>
    </div>
  ),
};

export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Hover States</h3>
        <div className="flex gap-4">
          <Button variant="wakecap">Hover me</Button>
          <Button variant="wakecap-secondary">Hover me</Button>
          <Button variant="wakecap-accent">Hover me</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Focus States</h3>
        <div className="flex gap-4">
          <Button variant="wakecap">Focus me</Button>
          <Button variant="wakecap-outline">Focus me</Button>
          <Button variant="wakecap-ghost">Focus me</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Disabled States</h3>
        <div className="flex gap-4">
          <Button variant="wakecap" disabled>Disabled</Button>
          <Button variant="wakecap-secondary" disabled>Disabled</Button>
          <Button variant="wakecap-accent" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Form actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Form Actions</h3>
        <div className="flex gap-3">
          <Button variant="wakecap">Save Changes</Button>
          <Button variant="wakecap-outline">Cancel</Button>
          <Button variant="wakecap-destructive">Delete</Button>
        </div>
      </div>
      
      {/* Status actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Status Actions</h3>
        <div className="flex gap-3">
          <Button variant="wakecap-success">
            <Check className="mr-2 h-4 w-4" />
            Approve
          </Button>
          <Button variant="wakecap-warning">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Review
          </Button>
          <Button variant="wakecap-info">
            <Info className="mr-2 h-4 w-4" />
            Details
          </Button>
        </div>
      </div>
      
      {/* File actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">File Actions</h3>
        <div className="flex gap-3">
          <Button variant="wakecap-accent">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="wakecap-outline">
            <ArrowRight className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button variant="wakecap-ghost">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  ),
};