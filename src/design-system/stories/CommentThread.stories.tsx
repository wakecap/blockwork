import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommentThread, Comment } from '../components/CommentThread';

const meta: Meta<typeof CommentThread> = {
  title: 'Communication/CommentThread',
  component: CommentThread,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive comment system with threading, replies, likes, and moderation features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    maxReplies: {
      control: { type: 'number', min: 1, max: 10 },
    },
    showReplies: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleComments: Comment[] = [
  {
    id: '1',
    author: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    content: 'This is a great article! I learned a lot from it.',
    timestamp: new Date(Date.now() - 3600000),
    likes: 12,
    dislikes: 2,
    isLiked: true,
    replies: [
      {
        id: '1-1',
        author: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        content: 'I agree! The examples were very helpful.',
        timestamp: new Date(Date.now() - 1800000),
        likes: 5,
        dislikes: 0,
        isLiked: false,
      },
      {
        id: '1-2',
        author: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        content: 'Could you elaborate on the third point?',
        timestamp: new Date(Date.now() - 900000),
        likes: 2,
        dislikes: 1,
        isLiked: false,
      },
    ],
  },
  {
    id: '2',
    author: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    content: 'I have a different perspective on this topic. While the article makes good points, I think there are some areas that could be improved.',
    timestamp: new Date(Date.now() - 7200000),
    likes: 8,
    dislikes: 4,
    isLiked: false,
    isDisliked: true,
    replies: [
      {
        id: '2-1',
        author: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        content: 'I\'d love to hear your thoughts on what could be improved.',
        timestamp: new Date(Date.now() - 5400000),
        likes: 3,
        dislikes: 0,
        isLiked: false,
      },
    ],
  },
  {
    id: '3',
    author: 'Alex Brown',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    content: 'Thanks for sharing this! I\'ve been looking for resources like this.',
    timestamp: new Date(Date.now() - 10800000),
    likes: 15,
    dislikes: 1,
    isLiked: false,
  },
];

const blogPostComments: Comment[] = [
  {
    id: '1',
    author: 'Tech Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'This tutorial saved me hours of debugging! The step-by-step approach was exactly what I needed.',
    timestamp: new Date(Date.now() - 7200000),
    likes: 24,
    dislikes: 0,
    isLiked: true,
    replies: [
      {
        id: '1-1',
        author: 'Code Master',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        content: 'Same here! I especially liked the troubleshooting section.',
        timestamp: new Date(Date.now() - 5400000),
        likes: 8,
        dislikes: 0,
        isLiked: false,
      },
      {
        id: '1-2',
        author: 'Dev Learner',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        content: 'I\'m still stuck on step 3. Any tips?',
        timestamp: new Date(Date.now() - 3600000),
        likes: 2,
        dislikes: 0,
        isLiked: false,
      },
    ],
  },
  {
    id: '2',
    author: 'Senior Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    content: 'Great content! As someone who\'s been in the industry for 10+ years, I appreciate how you\'ve made complex concepts accessible to beginners.',
    timestamp: new Date(Date.now() - 14400000),
    likes: 31,
    dislikes: 2,
    isLiked: false,
  },
];

export const Default: Story = {
  args: {
    comments: sampleComments,
    maxReplies: 3,
    showReplies: true,
  },
};

export const BlogPostComments: Story = {
  args: {
    comments: blogPostComments,
    maxReplies: 5,
    showReplies: true,
  },
};

export const WithActions: Story = {
  args: {
    comments: sampleComments,
    maxReplies: 3,
    showReplies: true,
    onLike: (commentId) => console.log('Liked comment:', commentId),
    onDislike: (commentId) => console.log('Disliked comment:', commentId),
    onReply: (commentId, content) => console.log('Reply to comment:', commentId, 'Content:', content),
    onEdit: (commentId, content) => console.log('Edit comment:', commentId, 'New content:', content),
    onDelete: (commentId) => console.log('Delete comment:', commentId),
    onReport: (commentId) => console.log('Report comment:', commentId),
  },
};

export const LimitedReplies: Story = {
  args: {
    comments: sampleComments,
    maxReplies: 1,
    showReplies: true,
  },
};

export const NoReplies: Story = {
  args: {
    comments: sampleComments,
    showReplies: false,
  },
};

export const SingleComment: Story = {
  args: {
    comments: [sampleComments[0]],
    maxReplies: 3,
    showReplies: true,
  },
};

export const LongComments: Story = {
  args: {
    comments: [
      {
        id: '1',
        author: 'Long Commenter',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        content: 'This is an extremely long comment that demonstrates how the component handles text that spans multiple lines and requires significant vertical space. It should maintain good readability while providing a pleasant user experience. The comment system should gracefully handle such content without breaking the layout or making it difficult to read. This is particularly important for platforms where users might want to share detailed thoughts, experiences, or feedback.',
        timestamp: new Date(Date.now() - 3600000),
        likes: 7,
        dislikes: 1,
        isLiked: false,
        replies: [
          {
            id: '1-1',
            author: 'Reply User',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            content: 'This is also a long reply that tests the reply system with extended content.',
            timestamp: new Date(Date.now() - 1800000),
            likes: 3,
            dislikes: 0,
            isLiked: false,
          },
        ],
      },
    ],
    maxReplies: 3,
    showReplies: true,
  },
};

export const CommentWithManyReplies: Story = {
  args: {
    comments: [
      {
        id: '1',
        author: 'Discussion Starter',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        content: 'This comment has generated a lot of discussion!',
        timestamp: new Date(Date.now() - 7200000),
        likes: 45,
        dislikes: 3,
        isLiked: false,
        replies: Array.from({ length: 8 }, (_, i) => ({
          id: `1-${i + 1}`,
          author: `User ${i + 1}`,
          avatar: `https://images.unsplash.com/photo-${1500000000000 + i}?w=150&h=150&fit=crop&crop=face`,
          content: `This is reply number ${i + 1} to the main comment.`,
          timestamp: new Date(Date.now() - (3600000 * (i + 1))),
          likes: Math.floor(Math.random() * 10),
          dislikes: Math.floor(Math.random() * 3),
          isLiked: false,
        })),
      },
    ],
    maxReplies: 3,
    showReplies: true,
  },
};

export const EmptyComments: Story = {
  args: {
    comments: [],
    maxReplies: 3,
    showReplies: true,
  },
  render: () => (
    <div className="text-center py-12">
      <p className="text-neutral-500 text-lg">No comments yet. Be the first to comment!</p>
    </div>
  ),
};
