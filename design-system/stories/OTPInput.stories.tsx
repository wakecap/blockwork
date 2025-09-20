import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { OTPInput, PINInput, VerificationCode, PasswordOTP, useOTP } from '../components/OTPInput';

const meta: Meta<typeof OTPInput> = {
  title: 'Forms & Data Entry/OTPInput',
  component: OTPInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A One-Time Password (OTP) input component for verification codes, PINs, and secure authentication.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'number', 'password'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'filled'],
    },
    length: {
      control: { type: 'range', min: 4, max: 8, step: 1 },
    },
    autoFocus: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    showToggle: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <OTPInput
        value={value}
        onChange={setValue}
        className="w-full max-w-md"
      />
    );
  },
};

export const PINInputExample: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">PIN Input</h2>
        <PINInput
          value={value}
          onChange={setValue}
          length={4}
          size="lg"
          autoFocus
        />
      </div>
    );
  },
};

export const VerificationCodeExample: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Verification Code</h2>
        <VerificationCode
          value={value}
          onChange={setValue}
          length={6}
          size="md"
          autoFocus
        />
      </div>
    );
  },
};

export const PasswordOTPExample: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Password OTP</h2>
        <PasswordOTP
          value={value}
          onChange={setValue}
          length={6}
          size="md"
          showToggle={true}
          autoFocus
        />
      </div>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <OTPInput
        value={value}
        onChange={setValue}
        size="sm"
        className="w-full max-w-md"
      />
    );
  },
};

export const Large: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <OTPInput
        value={value}
        onChange={setValue}
        size="lg"
        className="w-full max-w-md"
      />
    );
  },
};

export const Outlined: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <OTPInput
        value={value}
        onChange={setValue}
        variant="outlined"
        className="w-full max-w-md"
      />
    );
  },
};

export const Filled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <OTPInput
        value={value}
        onChange={setValue}
        variant="filled"
        className="w-full max-w-md"
      />
    );
  },
};

export const EightDigits: Story = {
  render: () => {
    const [value, setValue] = React.useState('');

    return (
      <OTPInput
        value={value}
        onChange={setValue}
        length={8}
        className="w-full max-w-md"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <OTPInput
        value="123456"
        onChange={() => {}}
        disabled={true}
        className="w-full max-w-md"
      />
    );
  },
};

export const WithCompletion: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [isComplete, setIsComplete] = React.useState(false);

    const handleComplete = (completedValue: string) => {
      setIsComplete(true);
      console.log('OTP completed:', completedValue);
    };

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">OTP with Completion</h2>
        <OTPInput
          value={value}
          onChange={setValue}
          onComplete={handleComplete}
          autoFocus
        />
        {isComplete && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 text-green-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Verification code entered!</span>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const TwoFactorAuthentication: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [isComplete, setIsComplete] = React.useState(false);

    const handleComplete = (completedValue: string) => {
      setIsComplete(true);
    };

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Two-Factor Authentication</h2>
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Enter Verification Code</h3>
            <p className="text-sm text-neutral-600">
              We've sent a 6-digit code to your phone number
            </p>
          </div>
          
          <OTPInput
            value={value}
            onChange={setValue}
            onComplete={handleComplete}
            length={6}
            size="lg"
            autoFocus
          />
          
          <div className="mt-6 text-center">
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Didn't receive the code? Resend
            </button>
          </div>
          
          {isComplete && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-center space-x-2 text-green-800">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Code verified successfully!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const BankingPIN: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const [isComplete, setIsComplete] = React.useState(false);

    const handleComplete = (completedValue: string) => {
      setIsComplete(true);
    };

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Banking PIN</h2>
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Enter Your PIN</h3>
            <p className="text-sm text-neutral-600">
              Enter your 4-digit PIN to access your account
            </p>
          </div>
          
          <PINInput
            value={value}
            onChange={setValue}
            onComplete={handleComplete}
            length={4}
            size="lg"
            variant="outlined"
            autoFocus
          />
          
          {isComplete && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-center space-x-2 text-blue-800">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">PIN verified!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const MultipleOTPs: Story = {
  render: () => {
    const { value: otp1, onChange: setOtp1, isComplete: isComplete1 } = useOTP(6);
    const { value: otp2, onChange: setOtp2, isComplete: isComplete2 } = useOTP(4);
    const { value: otp3, onChange: setOtp3, isComplete: isComplete3 } = useOTP(8);

    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Multiple OTP Examples</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Email Verification</h3>
            <VerificationCode
              value={otp1}
              onChange={setOtp1}
              length={6}
              size="md"
            />
            {isComplete1 && (
              <div className="mt-2 text-sm text-green-600">✓ Verified</div>
            )}
          </div>
          
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">SMS Code</h3>
            <OTPInput
              value={otp2}
              onChange={setOtp2}
              length={4}
              size="md"
              type="number"
            />
            {isComplete2 && (
              <div className="mt-2 text-sm text-green-600">✓ Verified</div>
            )}
          </div>
          
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Security Token</h3>
            <PasswordOTP
              value={otp3}
              onChange={setOtp3}
              length={8}
              size="sm"
              showToggle={true}
            />
            {isComplete3 && (
              <div className="mt-2 text-sm text-green-600">✓ Verified</div>
            )}
          </div>
        </div>
      </div>
    );
  },
};
