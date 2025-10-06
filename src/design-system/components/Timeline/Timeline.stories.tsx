import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Timeline,
  ActivityTimeline,
  ProjectTimeline,
  EventTimeline,
  type TimelineItem,
} from "./Timeline";

const meta: Meta<typeof Timeline> = {
  title: "Content Display/Timeline",
  component: Timeline,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A timeline component for displaying chronological events with vertical and horizontal layouts.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "vertical", "horizontal"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: TimelineItem[] = [
  {
    id: "1",
    title: "Project Started",
    description: "Initial project setup and planning phase completed.",
    date: "2024-01-15T10:00:00Z",
    status: "completed",
    icon: "fa-solid fa-rocket",
  },
  {
    id: "2",
    title: "Design Phase",
    description: "UI/UX design mockups created and approved by stakeholders.",
    date: "2024-01-20T14:30:00Z",
    status: "completed",
    icon: "fa-solid fa-cog",
  },
  {
    id: "3",
    title: "Development Begins",
    description: "Frontend development started with React components.",
    date: "2024-01-25T09:15:00Z",
    status: "warning",
    icon: "fa-solid fa-clock",
  },
  {
    id: "4",
    title: "Testing Phase",
    description: "Comprehensive testing and bug fixes.",
    date: "2024-02-01T16:45:00Z",
    status: "pending",
    icon: "fa-solid fa-check",
  },
  {
    id: "5",
    title: "Launch",
    description: "Product launch and deployment to production.",
    date: "2024-02-10T12:00:00Z",
    status: "pending",
    icon: "fa-solid fa-rocket",
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    className: "w-full max-w-2xl",
  },
};

export const VerticalLayout: Story = {
  args: {
    items: sampleItems,
    variant: "vertical",
    className: "w-full max-w-2xl",
  },
};

export const HorizontalLayout: Story = {
  args: {
    items: sampleItems.slice(0, 4),
    variant: "horizontal",
    className: "w-full max-w-4xl",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-4">Default Variant</h3>
        <Timeline items={sampleItems.slice(0, 3)} variant="default" className="w-full max-w-2xl" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-4">Vertical Variant</h3>
        <Timeline items={sampleItems.slice(0, 3)} variant="vertical" className="w-full max-w-2xl" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-4">Horizontal Variant</h3>
        <Timeline
          items={sampleItems.slice(0, 3)}
          variant="horizontal"
          className="w-full max-w-2xl"
        />
      </div>
    </div>
  ),
};

export const WithCustomIcons: Story = {
  render: () => {
    const customItems: TimelineItem[] = [
      {
        id: "1",
        title: "User Registration",
        description: "New user signed up for the platform.",
        date: "2024-01-15T10:00:00Z",
        status: "completed",
        icon: "fa-solid fa-user",
      },
      {
        id: "2",
        title: "Profile Setup",
        description: "User completed their profile information.",
        date: "2024-01-15T10:30:00Z",
        status: "completed",
        icon: "fa-solid fa-cog",
      },
      {
        id: "3",
        title: "First Project",
        description: "User created their first project.",
        date: "2024-01-15T11:00:00Z",
        status: "pending",
        icon: "fa-solid fa-rocket",
      },
    ];

    return <Timeline items={customItems} className="w-full max-w-2xl" />;
  },
};

export const WithNestedItems: Story = {
  render: () => {
    const nestedItems: TimelineItem[] = [
      {
        id: "1",
        title: "Phase 1: Planning",
        description: "Initial project planning and requirements gathering.",
        date: "2024-01-01T09:00:00Z",
        status: "completed",
        icon: "fa-solid fa-info",
        children: [
          {
            id: "1.1",
            title: "Requirements Analysis",
            description: "Gathered and documented project requirements.",
            date: "2024-01-02T10:00:00Z",
            status: "completed",
          },
          {
            id: "1.2",
            title: "Stakeholder Approval",
            description: "Project plan approved by all stakeholders.",
            date: "2024-01-05T14:00:00Z",
            status: "completed",
          },
        ],
      },
      {
        id: "2",
        title: "Phase 2: Development",
        description: "Active development phase with multiple sprints.",
        date: "2024-01-10T09:00:00Z",
        status: "pending",
        icon: "fa-solid fa-cog",
        children: [
          {
            id: "2.1",
            title: "Sprint 1",
            description: "Core functionality development.",
            date: "2024-01-15T10:00:00Z",
            status: "completed",
          },
          {
            id: "2.2",
            title: "Sprint 2",
            description: "Advanced features and integrations.",
            date: "2024-01-25T10:00:00Z",
            status: "pending",
          },
        ],
      },
    ];

    return <Timeline items={nestedItems} className="w-full max-w-2xl" />;
  },
};

// Pre-built Timeline Components
export const ActivityTimelineExample: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Recent Activity</h2>
      <ActivityTimeline
        activities={[
          {
            id: "1",
            user: "Sarah Johnson",
            action: "commented on",
            target: "Project Alpha",
            date: "2 minutes ago",
            status: "pending",
            avatar:
              "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
          },
          {
            id: "2",
            user: "Michael Chen",
            action: "updated",
            target: "Design System",
            date: "1 hour ago",
            status: "completed",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
          },
          {
            id: "3",
            user: "Emma Wilson",
            action: "created",
            target: "New Component",
            date: "3 hours ago",
            status: "pending",
            avatar:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
          },
          {
            id: "4",
            user: "David Brown",
            action: "deployed",
            target: "Version 2.1.0",
            date: "1 day ago",
            status: "pending",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
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
        milestones={[
          {
            id: "1",
            title: "Requirements Gathering",
            description: "Understanding client needs and project scope.",
            date: "2024-01-15",
            status: "completed",
            progress: 100,
          },
          {
            id: "2",
            title: "UI/UX Design",
            description: "Creating wireframes and visual designs.",
            date: "2024-01-31",
            status: "completed",
            progress: 100,
          },
          {
            id: "3",
            title: "Frontend Development",
            description: "Building the user interface and components.",
            date: "2024-02-28",
            status: "warning",
            progress: 65,
          },
          {
            id: "4",
            title: "Quality Assurance",
            description: "Testing and bug fixes.",
            date: "2024-03-15",
            status: "pending",
            progress: 0,
          },
          {
            id: "5",
            title: "Deployment",
            description: "Production deployment and go-live.",
            date: "2024-03-20",
            status: "pending",
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
        events={[
          {
            id: "1",
            title: "Conference Registration Opens",
            description: "Early bird registration begins for the annual tech conference.",
            date: "2024-01-15",
            time: "09:00 AM",
            location: "Online",
          },
          {
            id: "2",
            title: "Speaker Submissions Deadline",
            description: "Last day to submit speaker proposals for the conference.",
            date: "2024-02-15",
            time: "11:59 PM",
            location: "Online",
          },
          {
            id: "3",
            title: "Conference Day 1",
            description: "Opening keynote and main conference sessions.",
            date: "2024-04-15",
            time: "08:00 AM",
            location: "Convention Center",
          },
          {
            id: "4",
            title: "Conference Day 2",
            description: "Workshops and networking sessions.",
            date: "2024-04-16",
            time: "09:00 AM",
            location: "Convention Center",
          },
        ]}
      />
    </div>
  ),
};

export const InteractiveExample: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-600">Timeline with different sizes and variants</div>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-neutral-700 mb-2">Small Size</h3>
            <Timeline items={sampleItems.slice(0, 3)} size="sm" className="w-full max-w-2xl" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-700 mb-2">Medium Size</h3>
            <Timeline items={sampleItems.slice(0, 3)} size="md" className="w-full max-w-2xl" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-700 mb-2">Large Size</h3>
            <Timeline items={sampleItems.slice(0, 3)} size="lg" className="w-full max-w-2xl" />
          </div>
        </div>
      </div>
    );
  },
};
