import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignatureInput, DocumentSignature, CompactSignature } from '../components/SignatureInput';

const meta: Meta<typeof SignatureInput> = {
  title: 'Forms and Data Entry/SignatureInput',
  component: SignatureInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A signature input component using HTML canvas for capturing user signatures with drawing tools and history management.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    penColor: {
      control: { type: 'color' },
    },
    penWidth: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
    backgroundColor: {
      control: { type: 'color' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [signature, setSignature] = React.useState('');

    return (
      <SignatureInput
        value={signature}
        onChange={setSignature}
        className="w-full max-w-2xl"
      />
    );
  },
};

export const Compact: Story = {
  render: () => {
    const [signature, setSignature] = React.useState('');

    return (
      <SignatureInput
        value={signature}
        onChange={setSignature}
        width={300}
        height={100}
        penWidth={2}
        className="w-full max-w-2xl"
      />
    );
  },
};

export const Large: Story = {
  render: () => {
    const [signature, setSignature] = React.useState('');

    return (
      <SignatureInput
        value={signature}
        onChange={setSignature}
        width={600}
        height={300}
        penWidth={4}
        className="w-full max-w-2xl"
      />
    );
  },
};

export const CustomColors: Story = {
  render: () => {
    const [signature, setSignature] = React.useState('');

    return (
      <SignatureInput
        value={signature}
        onChange={setSignature}
        penColor="#1f2937"
        backgroundColor="#f9fafb"
        className="w-full max-w-2xl"
      />
    );
  },
};

export const ReadOnly: Story = {
  render: () => {
    const signature = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

    return (
      <SignatureInput
        value={signature}
        onChange={() => {}}
        readOnly={true}
        className="w-full max-w-2xl"
      />
    );
  },
};

export const DocumentSignatureExample: Story = {
  render: () => {
    const [signature, setSignature] = React.useState('');

    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Document Signature</h2>
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Contract Agreement</h3>
          <p className="text-neutral-600 mb-6">
            By signing below, you agree to the terms and conditions outlined in this document.
          </p>
          <DocumentSignature
            value={signature}
            onChange={setSignature}
          />
          <div className="mt-4 flex items-center justify-between text-sm text-neutral-500">
            <span>Date: {new Date().toLocaleDateString()}</span>
            <span>Signature required</span>
          </div>
        </div>
      </div>
    );
  },
};

export const CompactSignatureExample: Story = {
  render: () => {
    const [signature, setSignature] = React.useState('');

    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Compact Signature</h2>
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-neutral-900">Quick Approval</h3>
            <span className="text-sm text-neutral-500">Optional</span>
          </div>
          <CompactSignature
            value={signature}
            onChange={setSignature}
          />
        </div>
      </div>
    );
  },
};

export const MultipleSignatures: Story = {
  render: () => {
    const [signatures, setSignatures] = React.useState({
      primary: '',
      secondary: '',
      witness: '',
    });

    const handleSignatureChange = (field: keyof typeof signatures) => (value: string) => {
      setSignatures(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Multiple Signatures</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Primary Signer</h3>
            <SignatureInput
              value={signatures.primary}
              onChange={handleSignatureChange('primary')}
              width={300}
              height={150}
              penColor="#1f2937"
            />
          </div>
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Secondary Signer</h3>
            <SignatureInput
              value={signatures.secondary}
              onChange={handleSignatureChange('secondary')}
              width={300}
              height={150}
              penColor="#059669"
            />
          </div>
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Witness</h3>
            <SignatureInput
              value={signatures.witness}
              onChange={handleSignatureChange('witness')}
              width={300}
              height={150}
              penColor="#dc2626"
            />
          </div>
        </div>
      </div>
    );
  },
};

export const SignatureWithValidation: Story = {
  render: () => {
    const [signature, setSignature] = React.useState('');
    const [isValid, setIsValid] = React.useState(false);

    const handleSignatureChange = (value: string) => {
      setSignature(value);
      setIsValid(value.length > 0);
    };

    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Signature with Validation</h2>
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Legal Document</h3>
          <p className="text-neutral-600 mb-6">
            This signature is required to proceed with the transaction.
          </p>
          <SignatureInput
            value={signature}
            onChange={handleSignatureChange}
            width={400}
            height={200}
          />
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isValid ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Signature provided</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-red-600">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Signature required</span>
                </div>
              )}
            </div>
            <button
              disabled={!isValid}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isValid
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
              }`}
            >
              Submit Document
            </button>
          </div>
        </div>
      </div>
    );
  },
};

export const MobileSignature: Story = {
  render: () => {
    const [signature, setSignature] = React.useState('');

    return (
      <div className="w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Mobile Signature</h2>
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-neutral-900 mb-4">Touch to Sign</h3>
          <p className="text-sm text-neutral-600 mb-4">
            Use your finger or stylus to sign below
          </p>
          <SignatureInput
            value={signature}
            onChange={setSignature}
            width={300}
            height={150}
            penWidth={3}
            penColor="#000000"
            placeholder="Touch here to sign..."
          />
          <div className="mt-4 flex items-center justify-center space-x-4">
            <button className="px-4 py-2 text-sm bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors">
              Clear
            </button>
            <button className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  },
};
