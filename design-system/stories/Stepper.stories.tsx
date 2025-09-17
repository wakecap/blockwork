import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from '../components/Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    showStepNumbers: {
      control: 'boolean',
    },
    showStepDescriptions: {
      control: 'boolean',
    },
    allowClickOnCompleted: {
      control: 'boolean',
    },
    allowClickOnFuture: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSteps = [
  {
    id: 'step1',
    title: 'Personal Information',
    description: 'Enter your basic details',
  },
  {
    id: 'step2',
    title: 'Contact Details',
    description: 'Provide your contact information',
  },
  {
    id: 'step3',
    title: 'Preferences',
    description: 'Set your preferences',
  },
  {
    id: 'step4',
    title: 'Review',
    description: 'Review and confirm',
  },
];

export const Default: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 1,
    onStepClick: (stepIndex) => console.log('Clicked step:', stepIndex),
  },
};

export const FirstStep: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 0,
    onStepClick: (stepIndex) => console.log('Clicked step:', stepIndex),
  },
};

export const LastStep: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 3,
    onStepClick: (stepIndex) => console.log('Clicked step:', stepIndex),
  },
};

export const Vertical: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 1,
    orientation: 'vertical',
    onStepClick: (stepIndex) => console.log('Clicked step:', stepIndex),
  },
};

export const Small: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 1,
    size: 'sm',
    onStepClick: (stepIndex) => console.log('Clicked step:', stepIndex),
  },
};

export const Large: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 1,
    size: 'lg',
    onStepClick: (stepIndex) => console.log('Clicked step:', stepIndex),
  },
};

export const WithoutNumbers: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 1,
    showStepNumbers: false,
    onStepClick: (stepIndex) => console.log('Clicked step:', stepIndex),
  },
};

export const WithoutDescriptions: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 1,
    showStepDescriptions: false,
    onStepClick: (stepIndex) => console.log('Clicked step:', stepIndex),
  },
};

export const WithDisabledSteps: Story = {
  args: {
    steps: [
      {
        id: 'step1',
        title: 'Personal Information',
        description: 'Enter your basic details',
      },
      {
        id: 'step2',
        title: 'Contact Details',
        description: 'Provide your contact information',
        disabled: true,
      },
      {
        id: 'step3',
        title: 'Preferences',
        description: 'Set your preferences',
      },
      {
        id: 'step4',
        title: 'Review',
        description: 'Review and confirm',
      },
    ],
    currentStep: 1,
    onStepClick: (stepIndex) => console.log('Clicked step:', stepIndex),
  },
};

export const AllowClickOnFuture: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 1,
    allowClickOnFuture: true,
    onStepClick: (stepIndex) => console.log('Clicked step:', stepIndex),
  },
};

export const DisableClickOnCompleted: Story = {
  args: {
    steps: sampleSteps,
    currentStep: 1,
    allowClickOnCompleted: false,
    onStepClick: (stepIndex) => console.log('Clicked step:', stepIndex),
  },
};
