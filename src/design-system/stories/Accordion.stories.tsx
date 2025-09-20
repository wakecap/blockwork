import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, FAQAccordion, SettingsAccordion } from '../components/Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Content Display/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A collapsible content section component with multiple expansion modes and variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'separated'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    allowMultiple: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: '1',
    title: 'Getting Started',
    content: 'Learn the basics of our platform and how to get started with your first project. This guide covers everything from account setup to creating your first component.',
  },
  {
    id: '2',
    title: 'Advanced Features',
    content: 'Explore advanced features like custom themes, component libraries, and integration options. This section covers everything you need to build complex applications.',
  },
  {
    id: '3',
    title: 'API Documentation',
    content: 'Complete API reference with examples, parameters, and response formats. Find detailed information about all available endpoints and their usage.',
  },
  {
    id: '4',
    title: 'Troubleshooting',
    content: 'Common issues and their solutions. This section helps you resolve problems quickly and get back to building your application.',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    className: 'w-96',
    allowMultiple: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default accordion with single expansion (only one item can be open at a time).',
      },
    },
  },
};

export const MultipleExpansion: Story = {
  args: {
    items: sampleItems,
    allowMultiple: true,
    className: 'w-96',
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple expansion accordion where multiple items can be open simultaneously.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 flex flex-col items-center">
      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-2 text-center">Default Variant</h3>
        <Accordion
          items={sampleItems.slice(0, 2)}
          className="w-96"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-2 text-center">Bordered Variant</h3>
        <Accordion
          items={sampleItems.slice(0, 2)}
          variant="bordered"
          className="w-96"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-2 text-center">Separated Variant</h3>
        <Accordion
          items={sampleItems.slice(0, 2)}
          variant="separated"
          className="w-96"
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 flex flex-col items-center">
      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-2 text-center">Small Size</h3>
        <Accordion
          items={sampleItems.slice(0, 2)}
          size="sm"
          className="w-96"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-2 text-center">Medium Size</h3>
        <Accordion
          items={sampleItems.slice(0, 2)}
          size="md"
          className="w-96"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-2 text-center">Large Size</h3>
        <Accordion
          items={sampleItems.slice(0, 2)}
          size="lg"
          className="w-96"
        />
      </div>
    </div>
  ),
};

// Pre-built Accordion Components
export const FAQAccordionExample: Story = {
  render: () => (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">Frequently Asked Questions</h2>
      <FAQAccordion
        questions={[
          {
            question: 'How do I get started with the platform?',
            answer: 'Getting started is easy! Simply create an account, verify your email, and follow our step-by-step onboarding guide. You can also check out our video tutorials for a visual walkthrough.',
          },
          {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. All payments are processed securely through our payment partners.',
          },
          {
            question: 'Can I cancel my subscription at any time?',
            answer: 'Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. You\'ll continue to have access to your account until the end of your current billing period.',
          },
          {
            question: 'Is there a free trial available?',
            answer: 'Yes! We offer a 14-day free trial for all new users. No credit card is required to start your trial. You can upgrade to a paid plan at any time during or after your trial period.',
          },
          {
            question: 'How do I contact customer support?',
            answer: 'Our customer support team is available 24/7. You can reach us through live chat, email at support@company.com, or by phone at 1-800-COMPANY. We typically respond within 2 hours.',
          },
        ]}
      />
    </div>
  ),
};

export const SettingsAccordionExample: Story = {
  render: () => (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">Account Settings</h2>
      <SettingsAccordion
        sections={[
          {
            title: 'Profile Information',
            icon: '👤',
            content: (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1 text-center">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Sarah Johnson"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1 text-center">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="sarah.johnson@company.com"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1 text-center">
                    Bio
                  </label>
                  <textarea
                    defaultValue="Senior Designer with 5+ years of experience in UX/UI design."
                    rows={3}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            ),
          },
          {
            title: 'Security Settings',
            icon: '🔒',
            content: (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1 text-center">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1 text-center">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1 text-center">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id="two-factor"
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="two-factor" className="ml-2 text-sm text-neutral-700">
                    Enable two-factor authentication
                  </label>
                </div>
              </div>
            ),
          },
          {
            title: 'Notification Preferences',
            icon: '🔔',
            content: (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 text-center">Email Notifications</h4>
                    <p className="text-sm text-neutral-600 text-center">Receive updates about your account via email</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 text-center">Push Notifications</h4>
                    <p className="text-sm text-neutral-600 text-center">Get instant notifications in your browser</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <div>
                    <h4 className="text-sm font-medium text-neutral-900 text-center">Marketing Emails</h4>
                    <p className="text-sm text-neutral-600 text-center">Receive promotional content and updates</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  ),
};
