import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline, ActivityTimeline, ProjectTimeline, EventTimeline } from '../components/Timeline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faExclamation, faInfo, faUser, faCog, faRocket } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Timeline> = {
  title: 'Content Display/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A timeline component for displaying chronological events with vertical and horizontal layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'detailed'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: '1',
    title: 'Project Started',
    description: 'Initial project setup and planning phase completed.',
    timestamp: '2024-01-15T10:00:00Z',
    status: 'completed',
    icon: faRocket,
  },
  {
    id: '2',
    title: 'Design Phase',
    description: 'UI/UX design mockups created and approved by stakeholders.',
    timestamp: '2024-01-20T14:30:00Z',
    status: 'completed',
    icon: faCog,
  },
  {
    id: '3',
    title: 'Development Begins',
    description: 'Frontend development started with React components.',
    timestamp: '2024-01-25T09:15:00Z',
    status: 'in-progress',
    icon: faClock,
  },
  {
    id: '4',
    title: 'Testing Phase',
    description: 'Comprehensive testing and bug fixes.',
    timestamp: '2024-02-01T16:45:00Z',
    status: 'pending',
    icon: faCheck,
  },
  {
    id: '5',
    title: 'Launch',
    description: 'Product launch and deployment to production.',
    timestamp: '2024-02-10T12:00:00Z',
    status: 'pending',
    icon: faRocket,
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    className: 'w-full max-w-2xl',
  },
};

export const VerticalLayout: Story = {
  args: {
    items: sampleItems,
    layout: 'vertical',
    className: 'w-full max-w-2xl',
  },
};

export const HorizontalLayout: Story = {
  args: {
    items: sampleItems.slice(0, 4),
    layout: 'horizontal',
    className: 'w-full max-w-4xl',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-4">Default Variant</h3>
        <Timeline
          items={sampleItems.slice(0, 3)}
          variant="default"
          className="w-full max-w-2xl"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-4">Compact Variant</h3>
        <Timeline
          items={sampleItems.slice(0, 3)}
          variant="compact"
          className="w-full max-w-2xl"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-4">Detailed Variant</h3>
        <Timeline
          items={sampleItems.slice(0, 3)}
          variant="detailed"
          className="w-full max-w-2xl"
        />
      </div>
    </div>
  ),
};

export const WithCustomIcons: Story = {
  render: () => {
    const customItems = [
      {
        id: '1',
        title: 'User Registration',
        description: 'New user signed up for the platform.',
        timestamp: '2024-01-15T10:00:00Z',
        status: 'completed',
        icon: faUser,
      },
      {
        id: '2',
        title: 'Profile Setup',
        description: 'User completed their profile information.',
        timestamp: '2024-01-15T10:30:00Z',
        status: 'completed',
        icon: faCog,
      },
      {
        id: '3',
        title: 'First Project',
        description: 'User created their first project.',
        timestamp: '2024-01-15T11:00:00Z',
        status: 'in-progress',
        icon: faRocket,
      },
    ];

    return (
      <Timeline
        items={customItems}
        className="w-full max-w-2xl"
      />
    );
  },
};

export const WithNestedItems: Story = {
  render: () => {
    const nestedItems = [
      {
        id: '1',
        title: 'Phase 1: Planning',
        description: 'Initial project planning and requirements gathering.',
        timestamp: '2024-01-01T09:00:00Z',
        status: 'completed',
        icon: faInfo,
        children: [
          {
            id: '1.1',
            title: 'Requirements Analysis',
            description: 'Gathered and documented project requirements.',
            timestamp: '2024-01-02T10:00:00Z',
            status: 'completed',
          },
          {
            id: '1.2',
            title: 'Stakeholder Approval',
            description: 'Project plan approved by all stakeholders.',
            timestamp: '2024-01-05T14:00:00Z',
            status: 'completed',
          },
        ],
      },
      {
        id: '2',
        title: 'Phase 2: Development',
        description: 'Active development phase with multiple sprints.',
        timestamp: '2024-01-10T09:00:00Z',
        status: 'in-progress',
        icon: faCog,
        children: [
          {
            id: '2.1',
            title: 'Sprint 1',
            description: 'Core functionality development.',
            timestamp: '2024-01-15T10:00:00Z',
            status: 'completed',
          },
          {
            id: '2.2',
            title: 'Sprint 2',
            description: 'Advanced features and integrations.',
            timestamp: '2024-01-25T10:00:00Z',
            status: 'in-progress',
          },
        ],
      },
    ];

    return (
      <Timeline
        items={nestedItems}
        className="w-full max-w-2xl"
      />
    );
  },
};

// Pre-built Timeline Components
export const ActivityTimelineExample: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Recent Activity</h2>
      <ActivityTimeline
        items={[
          {
            id: '1',
            user: 'Sarah Johnson',
            action: 'commented on',
            target: 'Project Alpha',
            timestamp: '2 minutes ago',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
          },
          {
            id: '2',
            user: 'Michael Chen',
            action: 'updated',
            target: 'Design System',
            timestamp: '1 hour ago',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
          },
          {
            id: '3',
            user: 'Emma Wilson',
            action: 'created',
            target: 'New Component',
            timestamp: '3 hours ago',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
          },
          {
            id: '4',
            user: 'David Brown',
            action: 'deployed',
            target: 'Version 2.1.0',
            timestamp: '1 day ago',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
          },
        ]}
      />
    </div>
  ),
};

export const ProjectTimelineExample: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Project Timeline</h2>
      <ProjectTimeline
        items={[
          {
            id: '1',
            phase: 'Discovery',
            title: 'Requirements Gathering',
            description: 'Understanding client needs and project scope.',
            startDate: '2024-01-01',
            endDate: '2024-01-15',
            status: 'completed',
            progress: 100,
          },
          {
            id: '2',
            phase: 'Design',
            title: 'UI/UX Design',
            description: 'Creating wireframes and visual designs.',
            startDate: '2024-01-16',
            endDate: '2024-01-31',
            status: 'completed',
            progress: 100,
          },
          {
            id: '3',
            phase: 'Development',
            title: 'Frontend Development',
            description: 'Building the user interface and components.',
            startDate: '2024-02-01',
            endDate: '2024-02-28',
            status: 'in-progress',
            progress: 65,
          },
          {
            id: '4',
            phase: 'Testing',
            title: 'Quality Assurance',
            description: 'Testing and bug fixes.',
            startDate: '2024-03-01',
            endDate: '2024-03-15',
            status: 'pending',
            progress: 0,
          },
          {
            id: '5',
            phase: 'Launch',
            title: 'Deployment',
            description: 'Production deployment and go-live.',
            startDate: '2024-03-16',
            endDate: '2024-03-20',
            status: 'pending',
            progress: 0,
          },
        ]}
      />
    </div>
  ),
};

export const EventTimelineExample: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Event Timeline</h2>
      <EventTimeline
        items={[
          {
            id: '1',
            title: 'Conference Registration Opens',
            description: 'Early bird registration begins for the annual tech conference.',
            date: '2024-01-15',
            time: '09:00 AM',
            location: 'Online',
            status: 'upcoming',
            type: 'registration',
          },
          {
            id: '2',
            title: 'Speaker Submissions Deadline',
            description: 'Last day to submit speaker proposals for the conference.',
            date: '2024-02-15',
            time: '11:59 PM',
            location: 'Online',
            status: 'upcoming',
            type: 'deadline',
          },
          {
            id: '3',
            title: 'Conference Day 1',
            description: 'Opening keynote and main conference sessions.',
            date: '2024-04-15',
            time: '08:00 AM',
            location: 'Convention Center',
            status: 'upcoming',
            type: 'event',
          },
          {
            id: '4',
            title: 'Conference Day 2',
            description: 'Workshops and networking sessions.',
            date: '2024-04-16',
            time: '09:00 AM',
            location: 'Convention Center',
            status: 'upcoming',
            type: 'event',
          },
        ]}
      />
    </div>
  ),
};

export const InteractiveExample: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-600">
          Selected: {selectedItem || 'None'}
        </div>
        <Timeline
          items={sampleItems}
          selectedItem={selectedItem}
          onItemSelect={setSelectedItem}
          className="w-full max-w-2xl"
        />
      </div>
    );
  },
};
