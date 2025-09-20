import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SplitView, HorizontalSplit, ThreePanelSplit } from '../components/SplitView';

const meta: Meta<typeof SplitView> = {
  title: 'Utility & Advanced Components/SplitView',
  component: SplitView,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A resizable split view component for creating advanced layouts with draggable dividers.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    initialSizes: {
      control: { type: 'object' },
    },
    minSizes: {
      control: { type: 'object' },
    },
    showDivider: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SamplePanel = ({ title, color, content }: { title: string; color: string; content?: string }) => (
  <div className={`h-full p-6 ${color} flex flex-col`}>
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    <div className="flex-1">
      <p className="text-sm opacity-80">
        {content || 'This is a sample panel content. You can resize this panel by dragging the divider.'}
      </p>
    </div>
    <div className="text-xs opacity-60">
      Panel: {title}
    </div>
  </div>
);

export const Default: Story = {
  render: () => (
    <div className="h-96 border rounded-lg overflow-hidden">
      <SplitView
        direction="horizontal"
        initialSizes={[50, 50]}
        minSizes={[100, 100]}
      >
        <SamplePanel title="Left Panel" color="bg-blue-50" />
        <SamplePanel title="Right Panel" color="bg-green-50" />
      </SplitView>
    </div>
  ),
};



export const CustomInitialSizes: Story = {
  render: () => (
    <div className="h-96 border rounded-lg overflow-hidden">
      <SplitView
        direction="horizontal"
        initialSizes={[30, 70]}
        minSizes={[150, 200]}
      >
        <SamplePanel title="Narrow Panel" color="bg-red-50" />
        <SamplePanel title="Wide Panel" color="bg-indigo-50" />
      </SplitView>
    </div>
  ),
};

export const WithMinimumSizes: Story = {
  render: () => (
    <div className="h-96 border rounded-lg overflow-hidden">
      <SplitView
        direction="horizontal"
        initialSizes={[50, 50]}
        minSizes={[200, 200]}
        showDivider={true}
      >
        <SamplePanel title="Left Panel" color="bg-pink-50" />
        <SamplePanel title="Right Panel" color="bg-teal-50" />
      </SplitView>
    </div>
  ),
};

export const NoDivider: Story = {
  render: () => (
    <div className="h-96 border rounded-lg overflow-hidden">
      <SplitView
        direction="horizontal"
        initialSizes={[50, 50]}
        showDivider={false}
      >
        <SamplePanel title="Left Panel" color="bg-orange-50" />
        <SamplePanel title="Right Panel" color="bg-cyan-50" />
      </SplitView>
    </div>
  ),
};

export const CodeEditorLayout: Story = {
  render: () => (
    <div className="h-96 border rounded-lg overflow-hidden">
      <SplitView
        direction="horizontal"
        initialSizes={[40, 60]}
        minSizes={[200, 300]}
      >
        <div className="h-full bg-neutral-900 text-white p-4">
          <h3 className="text-lg font-semibold mb-4 text-green-400">File Explorer</h3>
          <div className="space-y-2 text-sm">
            <div className="text-blue-400">📁 src/</div>
            <div className="ml-4 text-green-400">📄 App.tsx</div>
            <div className="ml-4 text-green-400">📄 index.tsx</div>
            <div className="text-blue-400">📁 components/</div>
            <div className="ml-4 text-green-400">📄 Button.tsx</div>
            <div className="ml-4 text-green-400">📄 Input.tsx</div>
          </div>
        </div>
        <div className="h-full bg-neutral-800 text-white p-4">
          <h3 className="text-lg font-semibold mb-4 text-blue-400">Code Editor</h3>
          <pre className="text-sm text-green-400">
{`function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <Button>Click me</Button>
    </div>
  );
}`}
          </pre>
        </div>
      </SplitView>
    </div>
  ),
};

export const DashboardLayout: Story = {
  render: () => (
    <div className="h-96 border rounded-lg overflow-hidden">
      <SplitView
        direction="vertical"
        initialSizes={[70, 30]}
        minSizes={[200, 150]}
      >
        <div className="h-full bg-white p-4">
          <h3 className="text-lg font-semibold mb-4">Main Content Area</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h4 className="font-medium">Chart 1</h4>
              <div className="h-20 bg-blue-200 rounded mt-2"></div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h4 className="font-medium">Chart 2</h4>
              <div className="h-20 bg-green-200 rounded mt-2"></div>
            </div>
          </div>
        </div>
        <div className="h-full bg-neutral-50 p-4">
          <h3 className="text-lg font-semibold mb-4">Sidebar</h3>
          <div className="space-y-2">
            <div className="p-2 bg-white rounded border">Quick Actions</div>
            <div className="p-2 bg-white rounded border">Recent Items</div>
            <div className="p-2 bg-white rounded border">Settings</div>
          </div>
        </div>
      </SplitView>
    </div>
  ),
};

// Pre-built component stories
export const HorizontalSplitExample: Story = {
  render: () => (
    <div className="h-96 border rounded-lg overflow-hidden">
      <HorizontalSplit
        leftPanel={<SamplePanel title="Left Panel" color="bg-blue-50" />}
        rightPanel={<SamplePanel title="Right Panel" color="bg-green-50" />}
        leftSize={40}
        rightSize={60}
        minLeftSize={150}
        minRightSize={200}
      />
    </div>
  ),
};

export const VerticalSplitExample: Story = {
  render: () => (
    <div className="h-96 border rounded-lg overflow-hidden">
      <SplitView
        direction="vertical"
        initialSizes={[60, 40]}
        minSizes={[200, 150]}
      >
        <SamplePanel title="Top Panel" color="bg-purple-50" />
        <SamplePanel title="Bottom Panel" color="bg-yellow-50" />
      </SplitView>
    </div>
  ),
};

export const ThreePanelSplitExample: Story = {
  render: () => (
    <div className="h-96 border rounded-lg overflow-hidden">
      <ThreePanelSplit
        leftPanel={<SamplePanel title="Left Panel" color="bg-red-50" />}
        centerPanel={<SamplePanel title="Center Panel" color="bg-blue-50" />}
        rightPanel={<SamplePanel title="Right Panel" color="bg-green-50" />}
        leftSize={25}
        centerSize={50}
        rightSize={25}
      />
    </div>
  ),
};

export const ResponsiveLayout: Story = {
  render: () => (
    <div className="h-96 border rounded-lg overflow-hidden">
      <SplitView
        direction="horizontal"
        initialSizes={[30, 70]}
        minSizes={[200, 300]}
        onResize={(sizes) => console.log('Panel sizes changed:', sizes)}
      >
        <div className="h-full bg-neutral-100 p-4">
          <h3 className="text-lg font-semibold mb-4">Navigation</h3>
          <div className="space-y-2">
            <div className="p-2 bg-white rounded hover:bg-neutral-50 cursor-pointer">Home</div>
            <div className="p-2 bg-white rounded hover:bg-neutral-50 cursor-pointer">Dashboard</div>
            <div className="p-2 bg-white rounded hover:bg-neutral-50 cursor-pointer">Settings</div>
            <div className="p-2 bg-white rounded hover:bg-neutral-50 cursor-pointer">Profile</div>
          </div>
        </div>
        <div className="h-full bg-white p-4">
          <h3 className="text-lg font-semibold mb-4">Content Area</h3>
          <p className="text-sm text-neutral-600">
            This is the main content area. You can resize the navigation panel by dragging the divider.
            The layout is responsive and maintains minimum sizes for usability.
          </p>
        </div>
      </SplitView>
    </div>
  ),
};
