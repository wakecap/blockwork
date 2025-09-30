import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RichTextEditor, WYSIWYGEditor, MarkdownEditor, SimpleEditor } from '../components/RichTextEditor';

const meta: Meta<typeof RichTextEditor> = {
  title: 'Forms and Data Entry/RichTextEditor',
  component: RichTextEditor,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A rich text editor component supporting both WYSIWYG and Markdown modes with customizable toolbar.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['wysiwyg', 'markdown'],
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    showValue: {
      control: { type: 'boolean' },
    },
    showLabel: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('<p>Start writing your content here...</p>');

    return (
      <RichTextEditor
        value={value}
        onChange={setValue}
        placeholder="Start writing..."
        className="w-full max-w-4xl"
      />
    );
  },
};

export const WYSIWYG: Story = {
  render: () => {
    const [value, setValue] = React.useState('<h2>Welcome to the WYSIWYG Editor</h2><p>This is a <strong>rich text editor</strong> that allows you to format your content visually.</p><ul><li>Create lists</li><li>Add formatting</li><li>Insert links</li></ul>');

    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">WYSIWYG Editor</h2>
        <WYSIWYGEditor
          value={value}
          onChange={setValue}
          placeholder="Start writing your content..."
        />
        <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
          <h3 className="text-lg font-medium text-neutral-900 mb-2">HTML Output:</h3>
          <pre className="text-sm text-neutral-600 overflow-x-auto">{value}</pre>
        </div>
      </div>
    );
  },
};

export const Markdown: Story = {
  render: () => {
    const [value, setValue] = React.useState(`# Welcome to the Markdown Editor

This is a **markdown editor** that allows you to write content using markdown syntax.

## Features
- *Italic text*
- **Bold text**
- ~~Strikethrough~~
- \`Inline code\`

### Lists
1. Ordered list item 1
2. Ordered list item 2

- Unordered list item
- Another item

> This is a blockquote

[Link to example](https://example.com)`);

    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Markdown Editor</h2>
        <MarkdownEditor
          value={value}
          onChange={setValue}
          placeholder="Write your markdown content..."
        />
        <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
          <h3 className="text-lg font-medium text-neutral-900 mb-2">Markdown Output:</h3>
          <pre className="text-sm text-neutral-600 overflow-x-auto whitespace-pre-wrap">{value}</pre>
        </div>
      </div>
    );
  },
};

export const Simple: Story = {
  render: () => {
    const [value, setValue] = React.useState('<p>This is a <strong>simple editor</strong> with basic formatting options.</p>');

    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Simple Editor</h2>
        <SimpleEditor
          value={value}
          onChange={setValue}
          placeholder="Write your content..."
        />
      </div>
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    const value = `<h2>Read-Only Content</h2>
<p>This content cannot be edited. It's perfect for displaying formatted text that users can view but not modify.</p>
<ul>
  <li><strong>Bold text</strong> for emphasis</li>
  <li><em>Italic text</em> for subtle emphasis</li>
  <li><a href="https://example.com">Links</a> for navigation</li>
</ul>
<blockquote>
  This is a blockquote that stands out from the rest of the content.
</blockquote>`;

    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Read-Only Editor</h2>
        <RichTextEditor
          value={value}
          onChange={() => {}}
          readOnly={true}
        />
      </div>
    );
  },
};

export const CustomToolbar: Story = {
  render: () => {
    const [value, setValue] = React.useState('<h1>Custom Toolbar</h1><p>This editor has a custom toolbar with only specific formatting options.</p>');

    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Custom Toolbar</h2>
        <RichTextEditor
          value={value}
          onChange={setValue}
          toolbar={['bold', 'italic', 'underline', 'heading', 'list', 'quote']}
          placeholder="Write with custom toolbar..."
        />
      </div>
    );
  },
};

export const BlogPostEditor: Story = {
  render: () => {
    const [value, setValue] = React.useState(`<h1>My Blog Post Title</h1>
<p>This is the introduction paragraph of my blog post. It should be engaging and draw readers in.</p>
<h2>Main Content Section</h2>
<p>Here's where the main content goes. You can use <strong>bold text</strong> for emphasis and <em>italic text</em> for subtle emphasis.</p>
<h3>Subsection</h3>
<p>You can also create:</p>
<ul>
  <li>Unordered lists</li>
  <li>For bullet points</li>
  <li>And organization</li>
</ul>
<blockquote>
  This is a quote that stands out from the rest of the content.
</blockquote>
<p>And you can add <a href="https://example.com">links</a> to external resources.</p>`);

    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Blog Post Editor</h2>
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-medium text-blue-900 mb-2">Writing Tips:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use headings to structure your content</li>
            <li>• Keep paragraphs short and readable</li>
            <li>• Use formatting to highlight important points</li>
            <li>• Include relevant links and references</li>
          </ul>
        </div>
        <RichTextEditor
          value={value}
          onChange={setValue}
          placeholder="Start writing your blog post..."
        />
      </div>
    );
  },
};

export const EmailComposer: Story = {
  render: () => {
    const [value, setValue] = React.useState(`<p>Dear [Recipient Name],</p>
<p>I hope this email finds you well.</p>
<p>I'm writing to discuss <strong>our upcoming project</strong> and would like to schedule a meeting to go over the details.</p>
<p>Please let me know your availability for next week.</p>
<p>Best regards,<br>[Your Name]</p>`);

    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Email Composer</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RichTextEditor
              value={value}
              onChange={setValue}
              placeholder="Compose your email..."
              toolbar={['bold', 'italic', 'underline', 'link']}
            />
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Email Templates</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                <div className="font-medium text-neutral-900">Meeting Request</div>
                <div className="text-sm text-neutral-600">Schedule a meeting</div>
              </button>
              <button className="w-full text-left p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                <div className="font-medium text-neutral-900">Follow-up</div>
                <div className="text-sm text-neutral-600">Check on progress</div>
              </button>
              <button className="w-full text-left p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                <div className="font-medium text-neutral-900">Thank You</div>
                <div className="text-sm text-neutral-600">Express gratitude</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const DocumentationEditor: Story = {
  render: () => {
    const [value, setValue] = React.useState(`# API Documentation

## Overview
This API provides endpoints for managing user data and authentication.

## Authentication
All API requests require authentication using Bearer tokens.

### Endpoints

#### GET /users
Retrieves a list of users.

**Parameters:**
- \`page\` (optional): Page number for pagination
- \`limit\` (optional): Number of items per page

**Response:**
\`\`\`json
{
  "users": [],
  "total": 0,
  "page": 1
}
\`\`\`

#### POST /users
Creates a new user.

**Request Body:**
\`\`\`json
{
  "name": "string",
  "email": "string"
}
\`\`\``);

    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Documentation Editor</h2>
        <MarkdownEditor
          value={value}
          onChange={setValue}
          placeholder="Write your documentation in markdown..."
        />
        <div className="mt-4 flex items-center space-x-4 text-sm text-neutral-600">
          <span>💡 Tip: Use markdown syntax for better formatting</span>
          <span>📝 Auto-save enabled</span>
        </div>
      </div>
    );
  },
};
