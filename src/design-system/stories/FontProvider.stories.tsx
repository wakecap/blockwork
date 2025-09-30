import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FontProvider, LanguageSwitcher, EnglishText, ArabicText } from '../components/FontProvider';

const meta: Meta<typeof FontProvider> = {
  title: 'Foundation/FontProvider',
  component: FontProvider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A font provider that allows switching between English (Figtree) and Arabic (IBM Plex Sans Arabic) fonts with RTL support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultLanguage: {
      control: { type: 'select' },
      options: ['en', 'ar'],
      description: 'Default language to start with',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultLanguage: 'en',
  },
  render: (args) => (
    <FontProvider {...args}>
      <div className="space-y-6">
        <LanguageSwitcher />
        
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Typography Examples</h2>
            <p className="text-lg mb-4">
              This demonstrates how the font family changes based on the selected language.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">English Text</h3>
              <EnglishText className="text-base">
                The quick brown fox jumps over the lazy dog. This is a sample text to demonstrate the Figtree font family.
              </EnglishText>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Arabic Text</h3>
              <ArabicText className="text-base">
                النص السريع البني يقفز فوق الكلب الكسول. هذا نص تجريبي لإظهار عائلة الخط IBM Plex Sans Arabic.
              </ArabicText>
            </div>
          </div>
        </div>
      </div>
    </FontProvider>
  ),
};

export const ArabicDefault: Story = {
  args: {
    defaultLanguage: 'ar',
  },
  render: (args) => (
    <FontProvider {...args}>
      <div className="space-y-6">
        <LanguageSwitcher />
        
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">أمثلة على الطباعة</h2>
            <p className="text-lg mb-4">
              هذا يوضح كيف تتغير عائلة الخط بناءً على اللغة المختارة.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">English Text</h3>
              <EnglishText className="text-base">
                The quick brown fox jumps over the lazy dog. This is a sample text to demonstrate the Figtree font family.
              </EnglishText>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold mb-2">النص العربي</h3>
              <ArabicText className="text-base">
                النص السريع البني يقفز فوق الكلب الكسول. هذا نص تجريبي لإظهار عائلة الخط IBM Plex Sans Arabic.
              </ArabicText>
            </div>
          </div>
        </div>
      </div>
    </FontProvider>
  ),
};

export const FontComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-6">Font Family Comparison</h2>
        <p className="text-lg text-neutral-600 mb-8">
          Compare the different font families available in the design system.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Figtree Font */}
        <div className="p-6 border rounded-lg bg-white">
          <h3 className="text-xl font-bold mb-4 text-neutral-900">Figtree (English)</h3>
          <div className="space-y-3">
            <p className="text-4xl font-light">Aa</p>
            <p className="text-2xl font-normal">The quick brown fox</p>
            <p className="text-lg font-medium">Jumps over the lazy dog</p>
            <p className="text-base font-semibold">Sample text for comparison</p>
            <p className="text-sm font-bold">Different weights available</p>
          </div>
          <div className="mt-4 p-3 bg-neutral-50 rounded text-sm">
            <strong>Font Family:</strong> Figtree<br/>
            <strong>Weights:</strong> 400, 500, 600, 700<br/>
            <strong>Use Case:</strong> Primary English text
          </div>
        </div>
        
        {/* IBM Plex Sans Arabic Font */}
        <div className="p-6 border rounded-lg bg-white">
          <h3 className="text-xl font-bold mb-4 text-neutral-900">IBM Plex Sans Arabic</h3>
          <div className="space-y-3">
            <p className="text-4xl font-light">أب</p>
            <p className="text-2xl font-normal">النص السريع البني</p>
            <p className="text-lg font-medium">يقفز فوق الكلب</p>
            <p className="text-base font-semibold">نص تجريبي للمقارنة</p>
            <p className="text-sm font-bold">أوزان مختلفة متاحة</p>
          </div>
          <div className="mt-4 p-3 bg-neutral-50 rounded text-sm">
            <strong>Font Family:</strong> IBM Plex Sans Arabic<br/>
            <strong>Weights:</strong> 300, 400, 500, 600, 700<br/>
            <strong>Use Case:</strong> Arabic text and RTL support
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-neutral-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Implementation Notes</h3>
        <ul className="space-y-2 text-sm text-neutral-700">
          <li>• Use <code className="bg-white px-1 py-0.5 rounded text-xs">font-sans</code> for English text (Figtree)</li>
          <li>• Use <code className="bg-white px-1 py-0.5 rounded text-xs">font-arabic</code> for Arabic text (IBM Plex Sans Arabic)</li>
          <li>• RTL support is automatically applied when Arabic is selected</li>
          <li>• Font switching is handled through the FontProvider context</li>
        </ul>
      </div>
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => (
    <FontProvider>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Interactive Font Demo</h2>
          <p className="text-lg text-neutral-600">
            Switch between languages to see the font changes in real-time
          </p>
        </div>
        
        <div className="flex justify-center">
          <LanguageSwitcher />
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Sample Content</h3>
            <p className="text-base leading-relaxed mb-4">
              This is a paragraph demonstrating the current font family. The text will automatically 
              switch between Figtree (English) and IBM Plex Sans Arabic (Arabic) based on your selection.
            </p>
            <p className="text-base leading-relaxed">
              You can see how the typography changes, including character spacing, line height, 
              and overall readability for each language.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Font Metrics</h4>
              <div className="space-y-1 text-sm">
                <div>Font Family: <span className="font-mono bg-neutral-100 px-1 rounded">Current</span></div>
                <div>Line Height: <span className="font-mono bg-neutral-100 px-1 rounded">1.5</span></div>
                <div>Letter Spacing: <span className="font-mono bg-neutral-100 px-1 rounded">Normal</span></div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Language Features</h4>
              <div className="space-y-1 text-sm">
                <div>Text Direction: <span className="font-mono bg-neutral-100 px-1 rounded">Auto</span></div>
                <div>Font Loading: <span className="font-mono bg-neutral-100 px-1 rounded">Optimized</span></div>
                <div>Fallback: <span className="font-mono bg-neutral-100 px-1 rounded">System</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FontProvider>
  ),
};
