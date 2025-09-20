import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageProvider } from './language-provider';
import { RTLButton } from './rtl-button';
import { RTLInput } from './rtl-input';
import { LanguageToggle, LanguageSelector } from './language-toggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Search, Mail, Lock, User } from 'lucide-react';

const meta: Meta = {
  title: 'UI/RTL Support',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Demonstration of Arabic/RTL support in WakeCap design system components.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <LanguageProvider>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <h3 className="text-lg font-semibold">RTL Demo</h3>
            <LanguageSelector />
          </div>
          <Story />
        </div>
      </LanguageProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RTLButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <h4 className="text-md font-medium">Buttons with Arabic Text</h4>
      <div className="flex flex-wrap gap-2">
        <RTLButton
          arabicText="حفظ"
          showArabicText={true}
        >
          Save
        </RTLButton>
        <RTLButton
          variant="outline"
          arabicText="إلغاء"
          showArabicText={true}
        >
          Cancel
        </RTLButton>
        <RTLButton
          variant="wakecap"
          arabicText="تسجيل الدخول"
          showArabicText={true}
        >
          Login
        </RTLButton>
        <RTLButton
          variant="destructive"
          arabicText="حذف"
          showArabicText={true}
        >
          Delete
        </RTLButton>
      </div>
    </div>
  ),
};

export const RTLInputs: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <h4 className="text-md font-medium">Inputs with Arabic Labels</h4>
      
      <RTLInput
        label="Username"
        placeholder="Enter username"
        arabicLabel="اسم المستخدم"
        arabicPlaceholder="أدخل اسم المستخدم"
        showArabicText={true}
        iconLeft={<User className="h-4 w-4" />}
      />
      
      <RTLInput
        label="Email"
        placeholder="Enter email"
        type="email"
        arabicLabel="البريد الإلكتروني"
        arabicPlaceholder="أدخل البريد الإلكتروني"
        showArabicText={true}
        iconLeft={<Mail className="h-4 w-4" />}
      />
      
      <RTLInput
        label="Password"
        placeholder="Enter password"
        type="password"
        arabicLabel="كلمة المرور"
        arabicPlaceholder="أدخل كلمة المرور"
        showArabicText={true}
        iconLeft={<Lock className="h-4 w-4" />}
      />
      
      <RTLInput
        label="Search"
        placeholder="Search..."
        arabicLabel="بحث"
        arabicPlaceholder="ابحث..."
        showArabicText={true}
        iconLeft={<Search className="h-4 w-4" />}
      />
    </div>
  ),
};

export const RTLForm: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>User Registration</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RTLInput
          label="Full Name"
          placeholder="Enter full name"
          arabicLabel="الاسم الكامل"
          arabicPlaceholder="أدخل الاسم الكامل"
          showArabicText={true}
          iconLeft={<User className="h-4 w-4" />}
        />
        
        <RTLInput
          label="Email Address"
          placeholder="Enter email"
          type="email"
          arabicLabel="البريد الإلكتروني"
          arabicPlaceholder="أدخل البريد الإلكتروني"
          showArabicText={true}
          iconLeft={<Mail className="h-4 w-4" />}
        />
        
        <RTLInput
          label="Password"
          placeholder="Create password"
          type="password"
          arabicLabel="كلمة المرور"
          arabicPlaceholder="أنشئ كلمة مرور"
          showArabicText={true}
          iconLeft={<Lock className="h-4 w-4" />}
        />
        
        <div className="flex gap-2 pt-2">
          <RTLButton
            className="flex-1"
            variant="wakecap"
            arabicText="إنشاء حساب"
            showArabicText={true}
          >
            Create Account
          </RTLButton>
          <RTLButton
            variant="outline"
            className="flex-1"
            arabicText="إلغاء"
            showArabicText={true}
          >
            Cancel
          </RTLButton>
        </div>
      </CardContent>
    </Card>
  ),
};

export const RTLWithErrors: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <h4 className="text-md font-medium">Inputs with Error States</h4>
      
      <RTLInput
        label="Email"
        placeholder="Enter email"
        arabicLabel="البريد الإلكتروني"
        arabicPlaceholder="أدخل البريد الإلكتروني"
        arabicError="تنسيق البريد الإلكتروني غير صحيح"
        error="Invalid email format"
        showArabicText={true}
        iconLeft={<Mail className="h-4 w-4" />}
      />
      
      <RTLInput
        label="Password"
        placeholder="Enter password"
        type="password"
        arabicLabel="كلمة المرور"
        arabicPlaceholder="أدخل كلمة المرور"
        arabicError="كلمة المرور قصيرة جداً"
        error="Password is too short"
        showArabicText={true}
        iconLeft={<Lock className="h-4 w-4" />}
      />
    </div>
  ),
};

export const RTLDashboard: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Badge variant="success">Active</Badge>
          <LanguageToggle />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <RTLButton
              className="w-full justify-start"
              variant="outline"
              arabicText="إضافة مستخدم جديد"
              showArabicText={true}
            >
              Add New User
            </RTLButton>
            <RTLButton
              className="w-full justify-start"
              variant="outline"
              arabicText="إنشاء تقرير"
              showArabicText={true}
            >
              Generate Report
            </RTLButton>
            <RTLButton
              className="w-full justify-start"
              variant="outline"
              arabicText="إعدادات النظام"
              showArabicText={true}
            >
              System Settings
            </RTLButton>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Search</CardTitle>
            <CardDescription>Find users, projects, or data</CardDescription>
          </CardHeader>
          <CardContent>
            <RTLInput
              placeholder="Search..."
              arabicPlaceholder="ابحث..."
              showArabicText={true}
              iconLeft={<Search className="h-4 w-4" />}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};
