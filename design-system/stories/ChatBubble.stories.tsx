import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatBubble, SentMessage, ReceivedMessage, SystemMessage } from '../components/ChatBubble';

const meta: Meta<typeof ChatBubble> = {
  title: 'Communication/ChatBubble',
  component: ChatBubble,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A versatile chat bubble component for messaging applications with support for sent, received, and system messages.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['sent', 'received', 'system'],
    },
    status: {
      control: { type: 'select' },
      options: ['sending', 'sent', 'delivered', 'read', 'error'],
    },
    isOwn: {
      control: { type: 'boolean' },
    },
    showTimestamp: {
      control: { type: 'boolean' },
    },
    showStatus: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Hello! How are you doing today?',
    sender: 'John Doe',
    timestamp: new Date(),
    type: 'received',
    status: 'sent',
    showTimestamp: true,
    showStatus: true,
  },
};

export const SentMessageStory: Story = {
  args: {
    message: 'I\'m doing great, thanks for asking!',
    sender: 'You',
    timestamp: new Date(),
    type: 'sent',
    status: 'read',
    isOwn: true,
    showTimestamp: true,
    showStatus: true,
  },
};

export const SystemMessageStory: Story = {
  args: {
    message: 'John Doe joined the conversation',
    sender: 'System',
    timestamp: new Date(),
    type: 'system',
  },
};

export const WithAvatar: Story = {
  args: {
    message: 'This message includes an avatar image',
    sender: 'Sarah Wilson',
    timestamp: new Date(),
    type: 'received',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    showTimestamp: true,
  },
};

export const LongMessage: Story = {
  args: {
    message: 'This is a very long message that demonstrates how the chat bubble handles text that spans multiple lines. It should wrap properly and maintain good readability while keeping the bubble shape intact.',
    sender: 'Long Message User',
    timestamp: new Date(),
    type: 'received',
    showTimestamp: true,
  },
};

export const DifferentStatuses: Story = {
  render: () => (
    <div className="space-y-4">
      <SentMessage
        message="Message being sent..."
        timestamp={new Date()}
        status="sending"
      />
      <SentMessage
        message="Message sent successfully"
        timestamp={new Date()}
        status="sent"
      />
      <SentMessage
        message="Message delivered to recipient"
        timestamp={new Date()}
        status="delivered"
      />
      <SentMessage
        message="Message has been read"
        timestamp={new Date()}
        status="read"
      />
      <SentMessage
        message="Failed to send message"
        timestamp={new Date()}
        status="error"
      />
    </div>
  ),
};

export const ChatConversation: Story = {
  render: () => (
    <div className="space-y-4 max-w-md mx-auto">
      <SystemMessage
        message="Chat started"
        timestamp={new Date(Date.now() - 300000)}
      />
      
      <ReceivedMessage
        message="Hi there! Welcome to our chat."
        sender="Support Team"
        timestamp={new Date(Date.now() - 240000)}
        avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      />
      
      <SentMessage
        message="Thank you! I have a question about your service."
        timestamp={new Date(Date.now() - 180000)}
        status="read"
      />
      
      <ReceivedMessage
        message="Of course! I'd be happy to help. What would you like to know?"
        sender="Support Team"
        timestamp={new Date(Date.now() - 120000)}
        avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      />
      
      <SentMessage
        message="Great! I'm looking for information about pricing plans."
        timestamp={new Date(Date.now() - 60000)}
        status="delivered"
      />
    </div>
  ),
};

export const WithoutTimestamp: Story = {
  args: {
    message: 'This message doesn\'t show the timestamp',
    sender: 'Anonymous',
    timestamp: new Date(),
    type: 'received',
    showTimestamp: false,
  },
};

export const WithoutStatus: Story = {
  args: {
    message: 'This message doesn\'t show the status indicator',
    sender: 'You',
    timestamp: new Date(),
    type: 'sent',
    status: 'read',
    isOwn: true,
    showStatus: false,
  },
};

export const CompactChat: Story = {
  render: () => (
    <div className="space-y-2 max-w-sm mx-auto">
      <SentMessage
        message="Quick message"
        timestamp={new Date()}
        status="read"
        showTimestamp={false}
        showStatus={false}
      />
      <ReceivedMessage
        message="Quick reply"
        sender="Friend"
        timestamp={new Date()}
        showTimestamp={false}
      />
    </div>
  ),
};
