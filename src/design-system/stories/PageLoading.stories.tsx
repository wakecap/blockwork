import type { Meta, StoryObj } from '@storybook/react';
import { PageLoading } from '../components/PageLoading';

const meta: Meta<typeof PageLoading> = {
  title: 'Components/PageLoading',
  component: PageLoading,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A full-screen loading component with the Wakecap logo that fades in and out with smooth animation.'
      }
    }
  },
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Whether the loading component is visible'
    },
    message: {
      control: 'text',
      description: 'Custom message to display below the logo'
    },
    animationDuration: {
      control: { type: 'number', min: 500, max: 5000, step: 100 },
      description: 'Duration of the fade animation in milliseconds'
    },
    skeleton: {
      control: 'boolean',
      description: 'Whether to show skeleton loading effect instead of fade animation'
    },
    logoVariant: {
      control: { type: 'select' },
      options: ['symbol', 'text'],
      description: 'Logo variant to display - symbol for geometric symbol or text for full Wakecap text logo'
    }
  }
};

export default meta;
type Story = StoryObj<typeof PageLoading>;

export const SymbolFade: Story = {
  args: {
    visible: true,
    message: '',
    animationDuration: 2000,
    logoVariant: 'symbol',
    skeleton: false
  }
};

export const TextShimmer: Story = {
  args: {
    visible: true,
    message: '',
    animationDuration: 2000,
    logoVariant: 'text',
    skeleton: true
  }
};
