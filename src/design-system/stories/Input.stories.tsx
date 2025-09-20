import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FontProvider } from '../components/FontProvider';
import { Input } from '../components/Input';
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Input label (English)' },
    placeholder: { control: 'text', description: 'Input placeholder (English)' },
    type: { control: 'text', description: 'Input type' },
    value: { control: 'text', description: 'Input value' },
    error: { control: 'text', description: 'Error message (English)' },
    success: { control: 'text', description: 'Success message (English)' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    onChange: { action: 'changed', description: 'Change callback' },
    // Arabic support
    arabicLabel: { control: 'text', description: 'Arabic input label' },
    arabicPlaceholder: { control: 'text', description: 'Arabic input placeholder' },
    arabicError: { control: 'text', description: 'Arabic error message' },
    arabicSuccess: { control: 'text', description: 'Arabic success message' },
    showArabicText: { control: 'boolean', description: 'Show Arabic text when language is Arabic' },
  },
  parameters: {
    docs: {
      description: {
        component: 'A text input field with label, error, and success states. Supports both English and Arabic with RTL layout.'
      }
    }
  },
  decorators: [
    (Story) => (
      <FontProvider>
        <Story />
      </FontProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Input label',
    placeholder: 'Type here...',
    type: 'text',
    value: '',
    error: '',
    success: '',
    disabled: false,
    // Arabic text
    arabicLabel: 'تسمية المدخل',
    arabicPlaceholder: 'اكتب هنا...',
    showArabicText: true,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Input {...args} value={value} onChange={e => setValue(e.target.value)} />;
  },
  args: {
    label: 'Controlled input',
    placeholder: 'Type here...',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    iconLeft: faSearch,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Show Password',
    placeholder: 'Password',
    iconRight: faEye,
    type: 'password',
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Search & Show',
    placeholder: 'Search...',
    iconLeft: faSearch,
    iconRight: faEye,
  },
};

// Arabic Support Demonstration
export const ArabicSupport: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Arabic Input Support</h3>
        <p className="text-sm text-neutral-600 mb-4">
          Inputs automatically adapt to Arabic language with RTL support
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Username"
          placeholder="Enter username"
          arabicLabel="اسم المستخدم"
          arabicPlaceholder="أدخل اسم المستخدم"
          showArabicText={true}
        />
        
        <Input
          label="Email"
          placeholder="Enter email"
          arabicLabel="البريد الإلكتروني"
          arabicPlaceholder="أدخل البريد الإلكتروني"
          showArabicText={true}
        />
        
        <Input
          label="Password"
          placeholder="Enter password"
          type="password"
          iconRight={faEye}
          arabicLabel="كلمة المرور"
          arabicPlaceholder="أدخل كلمة المرور"
          showArabicText={true}
        />
        
        <Input
          label="Search"
          placeholder="Search for anything..."
          iconLeft={faSearch}
          arabicLabel="بحث"
          arabicPlaceholder="ابحث عن أي شيء..."
          showArabicText={true}
        />
      </div>
      
      <div className="text-center">
        <p className="text-sm text-neutral-500">
          Switch language in the FontProvider to see Arabic text and RTL layout
        </p>
      </div>
    </div>
  ),
}; 