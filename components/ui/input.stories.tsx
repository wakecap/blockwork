import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { Search, Eye, EyeOff, Mail, Lock } from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile input component with label, error, and success states. Built with shadcn/ui patterns and includes Arabic/RTL support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    showArabicText: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Input with Value',
    placeholder: 'Enter text...',
    defaultValue: 'Sample text',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    iconLeft: <Search className="h-4 w-4" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    iconRight: <Eye className="h-4 w-4" />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Search with Clear',
    placeholder: 'Search...',
    iconLeft: <Search className="h-4 w-4" />,
    iconRight: <Eye className="h-4 w-4" />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    placeholder: 'Enter text...',
    error: 'This field is required',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Input with Success',
    placeholder: 'Enter text...',
    success: 'Looks good!',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot type here',
    disabled: true,
  },
};

export const EmailInput: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    iconLeft: <Mail className="h-4 w-4" />,
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    iconLeft: <Lock className="h-4 w-4" />,
    iconRight: <Eye className="h-4 w-4" />,
  },
};

export const ArabicSupport: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    arabicLabel: 'اسم المستخدم',
    arabicPlaceholder: 'أدخل اسم المستخدم',
    showArabicText: true,
  },
};

export const ArabicWithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
    error: 'Invalid email format',
    arabicLabel: 'البريد الإلكتروني',
    arabicPlaceholder: 'أدخل البريد الإلكتروني',
    arabicError: 'تنسيق البريد الإلكتروني غير صحيح',
    showArabicText: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <Input
        label="Default Input"
        placeholder="Enter text..."
      />
      
      <Input
        label="With Left Icon"
        placeholder="Search..."
        iconLeft={<Search className="h-4 w-4" />}
      />
      
      <Input
        label="With Right Icon"
        placeholder="Password"
        type="password"
        iconRight={<Eye className="h-4 w-4" />}
      />
      
      <Input
        label="With Error"
        placeholder="Enter text..."
        error="This field is required"
      />
      
      <Input
        label="With Success"
        placeholder="Enter text..."
        success="Looks good!"
      />
      
      <Input
        label="Disabled"
        placeholder="Cannot type here"
        disabled
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <h3 className="text-lg font-semibold">Sign Up Form</h3>
      
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        iconLeft={<Mail className="h-4 w-4" />}
      />
      
      <Input
        label="Email Address"
        placeholder="Enter your email"
        type="email"
        iconLeft={<Mail className="h-4 w-4" />}
      />
      
      <Input
        label="Password"
        placeholder="Create a password"
        type="password"
        iconLeft={<Lock className="h-4 w-4" />}
        iconRight={<Eye className="h-4 w-4" />}
      />
      
      <Input
        label="Confirm Password"
        placeholder="Confirm your password"
        type="password"
        iconLeft={<Lock className="h-4 w-4" />}
        iconRight={<Eye className="h-4 w-4" />}
      />
    </div>
  ),
};
