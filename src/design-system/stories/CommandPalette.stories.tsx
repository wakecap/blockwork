import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommandPalette, GlobalCommandPalette, QuickActionsPalette, useCommandPalette } from '../components/CommandPalette';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faFile, faSearch, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof CommandPalette> = {
  title: 'Utility & Advanced Components/CommandPalette',
  component: CommandPalette,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A powerful command palette component for quick actions and navigation, similar to Spotlight on Mac or Command Palette in VS Code.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: { type: 'text' },
    },
    title: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleActions = [
  {
    id: 'home',
    title: 'Go to Home',
    description: 'Navigate to the home page',
    icon: <FontAwesomeIcon icon={faHome} />,
    keywords: ['home', 'dashboard', 'main'],
    action: () => alert('Navigating to home...'),
    category: 'Navigation',
    shortcut: '⌘H',
  },
  {
    id: 'profile',
    title: 'Open Profile',
    description: 'View and edit your profile settings',
    icon: <FontAwesomeIcon icon={faUser} />,
    keywords: ['profile', 'account', 'settings', 'user'],
    action: () => alert('Opening profile...'),
    category: 'User',
    shortcut: '⌘P',
  },
  {
    id: 'settings',
    title: 'Open Settings',
    description: 'Access application settings and preferences',
    icon: <FontAwesomeIcon icon={faCog} />,
    keywords: ['settings', 'preferences', 'config', 'options'],
    action: () => alert('Opening settings...'),
    category: 'System',
    shortcut: '⌘,',
  },
  {
    id: 'new-file',
    title: 'Create New File',
    description: 'Start a new document or project',
    icon: <FontAwesomeIcon icon={faFile} />,
    keywords: ['new', 'create', 'file', 'document', 'project'],
    action: () => alert('Creating new file...'),
    category: 'File',
    shortcut: '⌘N',
  },
  {
    id: 'search',
    title: 'Search',
    description: 'Search across the application',
    icon: <FontAwesomeIcon icon={faSearch} />,
    keywords: ['search', 'find', 'lookup', 'query'],
    action: () => alert('Opening search...'),
    category: 'Search',
    shortcut: '⌘F',
  },
  {
    id: 'add-item',
    title: 'Add New Item',
    description: 'Create a new item or entry',
    icon: <FontAwesomeIcon icon={faPlus} />,
    keywords: ['add', 'create', 'new', 'insert'],
    action: () => alert('Adding new item...'),
    category: 'Actions',
    shortcut: '⌘+',
  },
  {
    id: 'edit',
    title: 'Edit Mode',
    description: 'Toggle edit mode for current item',
    icon: <FontAwesomeIcon icon={faEdit} />,
    keywords: ['edit', 'modify', 'change', 'update'],
    action: () => alert('Toggling edit mode...'),
    category: 'Actions',
    shortcut: '⌘E',
  },
  {
    id: 'delete',
    title: 'Delete Item',
    description: 'Remove the current item',
    icon: <FontAwesomeIcon icon={faTrash} />,
    keywords: ['delete', 'remove', 'trash', 'destroy'],
    action: () => alert('Deleting item...'),
    category: 'Actions',
    shortcut: '⌘⌫',
  },
];

const developmentActions = [
  {
    id: 'run-tests',
    title: 'Run Tests',
    description: 'Execute all test suites',
    icon: <FontAwesomeIcon icon={faCog} />,
    keywords: ['test', 'run', 'execute', 'suite'],
    action: () => alert('Running tests...'),
    category: 'Development',
    shortcut: '⌘T',
  },
  {
    id: 'build',
    title: 'Build Project',
    description: 'Compile and build the project',
    icon: <FontAwesomeIcon icon={faCog} />,
    keywords: ['build', 'compile', 'make', 'project'],
    action: () => alert('Building project...'),
    category: 'Development',
    shortcut: '⌘B',
  },
  {
    id: 'deploy',
    title: 'Deploy to Production',
    description: 'Deploy the current version to production',
    icon: <FontAwesomeIcon icon={faCog} />,
    keywords: ['deploy', 'production', 'release', 'publish'],
    action: () => alert('Deploying to production...'),
    category: 'Development',
    shortcut: '⌘D',
  },
];

const marketingActions = [
  {
    id: 'create-campaign',
    title: 'Create Campaign',
    description: 'Start a new marketing campaign',
    icon: <FontAwesomeIcon icon={faPlus} />,
    keywords: ['campaign', 'marketing', 'create', 'new'],
    action: () => alert('Creating campaign...'),
    category: 'Marketing',
    shortcut: '⌘C',
  },
  {
    id: 'analytics',
    title: 'View Analytics',
    description: 'Open analytics dashboard',
    icon: <FontAwesomeIcon icon={faSearch} />,
    keywords: ['analytics', 'stats', 'metrics', 'dashboard'],
    action: () => alert('Opening analytics...'),
    category: 'Marketing',
    shortcut: '⌘A',
  },
];

export const Default: Story = {
  render: () => {
    const { isOpen, open, close } = useCommandPalette();
    
    return (
      <div>
        <button
          onClick={open}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open Command Palette
        </button>
        
        <CommandPalette
          isOpen={isOpen}
          onClose={close}
          actions={sampleActions}
          placeholder="Search commands..."
          title="Command Palette"
        />
      </div>
    );
  },
};

export const WithCustomPlaceholder: Story = {
  render: () => {
    const { isOpen, open, close } = useCommandPalette();
    
    return (
      <div>
        <button
          onClick={open}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Open with Custom Placeholder
        </button>
        
        <CommandPalette
          isOpen={isOpen}
          onClose={close}
          actions={sampleActions}
          placeholder="Type to search commands, files, and more..."
          title="Quick Actions"
        />
      </div>
    );
  },
};

export const WithCategories: Story = {
  render: () => {
    const { isOpen, open, close } = useCommandPalette();
    
    const categorizedActions = [
      ...sampleActions,
      ...developmentActions,
      ...marketingActions,
    ];
    
    return (
      <div>
        <button
          onClick={open}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Open Categorized Commands
        </button>
        
        <CommandPalette
          isOpen={isOpen}
          onClose={close}
          actions={categorizedActions}
          placeholder="Search by category or keyword..."
          title="All Commands"
        />
      </div>
    );
  },
};

export const GlobalCommandPaletteExample: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-neutral-600">
        Press <kbd className="px-2 py-1 bg-neutral-100 rounded text-xs">⌘K</kbd> to open the global command palette
      </p>
      
      <GlobalCommandPalette
        actions={sampleActions}
      />
      
      <div className="text-sm text-neutral-500">
        This command palette is globally accessible and responds to keyboard shortcuts.
      </div>
    </div>
  ),
};

export const QuickActionsPaletteExample: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-neutral-600">
        Click the button below to open the quick actions palette
      </p>
      
      <QuickActionsPalette
        actions={sampleActions.slice(0, 4)} // Only first 4 actions
      />
      
      <div className="text-sm text-neutral-500">
        This is a simpler command palette for quick access to common actions.
      </div>
    </div>
  ),
};

export const DevelopmentCommands: Story = {
  render: () => {
    const { isOpen, open, close } = useCommandPalette();
    
    return (
      <div>
        <button
          onClick={open}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Open Development Commands
        </button>
        
        <CommandPalette
          isOpen={isOpen}
          onClose={close}
          actions={developmentActions}
          placeholder="Search development commands..."
          title="Development Tools"
        />
      </div>
    );
  },
};

export const MarketingCommands: Story = {
  render: () => {
    const { isOpen, open, close } = useCommandPalette();
    
    return (
      <div>
        <button
          onClick={open}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          Open Marketing Commands
        </button>
        
        <CommandPalette
          isOpen={isOpen}
          onClose={close}
          actions={marketingActions}
          placeholder="Search marketing actions..."
          title="Marketing Tools"
        />
      </div>
    );
  },
};

export const WithShortcuts: Story = {
  render: () => {
    const { isOpen, open, close } = useCommandPalette();
    
    const actionsWithShortcuts = sampleActions.filter(action => action.shortcut);
    
    return (
      <div>
        <button
          onClick={open}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Open Commands with Shortcuts
        </button>
        
        <CommandPalette
          isOpen={isOpen}
          onClose={close}
          actions={actionsWithShortcuts}
          placeholder="Search commands with keyboard shortcuts..."
          title="Keyboard Shortcuts"
        />
      </div>
    );
  },
};

export const EmptyState: Story = {
  render: () => {
    const { isOpen, open, close } = useCommandPalette();
    
    return (
      <div>
        <button
          onClick={open}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Open Empty Command Palette
        </button>
        
        <CommandPalette
          isOpen={isOpen}
          onClose={close}
          actions={[]}
          placeholder="No commands available..."
          title="Empty Commands"
        />
      </div>
    );
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const { isOpen, open, close } = useCommandPalette();
    
    const demoActions = [
      {
        id: 'demo-1',
        title: 'Show Success Message',
        description: 'Display a success notification',
        icon: <FontAwesomeIcon icon={faHome} />,
        action: () => alert('✅ Success! This action was executed successfully.'),
        category: 'Demo',
      },
      {
        id: 'demo-2',
        title: 'Show Error Message',
        description: 'Display an error notification',
        icon: <FontAwesomeIcon icon={faUser} />,
        action: () => alert('❌ Error! Something went wrong.'),
        category: 'Demo',
      },
      {
        id: 'demo-3',
        title: 'Show Info Message',
        description: 'Display an information notification',
        icon: <FontAwesomeIcon icon={faCog} />,
        action: () => alert('ℹ️ Info: This is an informational message.'),
        category: 'Demo',
      },
      {
        id: 'demo-4',
        title: 'Console Log',
        description: 'Log a message to the browser console',
        icon: <FontAwesomeIcon icon={faFile} />,
        action: () => {
          console.log('🚀 Command executed from Command Palette!');
          alert('Check the browser console for the log message.');
        },
        category: 'Demo',
      },
    ];
    
    return (
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Interactive Demo</h3>
          <p className="text-sm text-blue-700">
            Try opening the command palette and executing different commands to see them in action!
          </p>
        </div>
        
        <button
          onClick={open}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          🚀 Open Interactive Commands
        </button>
        
        <CommandPalette
          isOpen={isOpen}
          onClose={close}
          actions={demoActions}
          placeholder="Try searching for 'success', 'error', 'info', or 'console'..."
          title="Interactive Demo"
        />
      </div>
    );
  },
};
