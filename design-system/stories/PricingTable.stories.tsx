import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PricingTable, SimplePricingTable, GridPricingTable, SAASPricing } from '../components/PricingTable';

const meta: Meta<typeof PricingTable> = {
  title: 'Brand & Marketing/PricingTable',
  component: PricingTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive pricing table component with multiple layouts, period toggles, and feature comparisons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical', 'grid'],
    },
    showPeriodToggle: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const samplePlans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individuals and small projects',
    price: {
      amount: 9,
      currency: '$',
      period: 'month',
    },
    features: [
      { name: 'Up to 5 projects', included: true },
      { name: 'Basic analytics', included: true },
      { name: 'Email support', included: true },
      { name: 'Advanced features', included: false },
      { name: 'Priority support', included: false },
    ],
    cta: {
      label: 'Start Free Trial',
      onClick: () => alert('Starting Starter plan trial...'),
      variant: 'outline' as const,
    },
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'Ideal for growing businesses and teams',
    price: {
      amount: 29,
      currency: '$',
      period: 'month',
    },
    features: [
      { name: 'Up to 25 projects', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Priority support', included: true },
      { name: 'Team collaboration', included: true },
      { name: 'Custom integrations', included: false },
    ],
    isPopular: true,
    cta: {
      label: 'Start Free Trial',
      onClick: () => alert('Starting Professional plan trial...'),
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with advanced needs',
    price: {
      amount: 99,
      currency: '$',
      period: 'month',
    },
    features: [
      { name: 'Unlimited projects', included: true },
      { name: 'Enterprise analytics', included: true },
      { name: '24/7 phone support', included: true },
      { name: 'Custom integrations', included: true },
      { name: 'Dedicated account manager', included: true },
    ],
    cta: {
      label: 'Contact Sales',
      onClick: () => alert('Contacting sales team...'),
      variant: 'secondary' as const,
    },
  },
];

const saasPlans = [
  {
    id: 'hobby',
    name: 'Hobby',
    description: 'For personal projects and learning',
    price: {
      amount: 0,
      currency: '$',
      period: 'month',
    },
    features: [
      { name: '1 project', included: true },
      { name: 'Basic templates', included: true },
      { name: 'Community support', included: true },
      { name: 'Advanced features', included: false },
      { name: 'Priority support', included: false },
    ],
    cta: {
      label: 'Get Started Free',
      onClick: () => alert('Starting free plan...'),
      variant: 'outline' as const,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For professionals and small teams',
    price: {
      amount: 19,
      currency: '$',
      period: 'month',
    },
    features: [
      { name: 'Unlimited projects', included: true },
      { name: 'All templates', included: true },
      { name: 'Priority support', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Team collaboration', included: true },
    ],
    isPopular: true,
    cta: {
      label: 'Start Pro Trial',
      onClick: () => alert('Starting Pro trial...'),
    },
  },
  {
    id: 'business',
    name: 'Business',
    description: 'For growing businesses and teams',
    price: {
      amount: 49,
      currency: '$',
      period: 'month',
    },
    features: [
      { name: 'Everything in Pro', included: true },
      { name: 'Advanced security', included: true },
      { name: 'Custom branding', included: true },
      { name: 'API access', included: true },
      { name: 'Dedicated support', included: true },
    ],
    cta: {
      label: 'Start Business Trial',
      onClick: () => alert('Starting Business trial...'),
    },
  },
];

export const Default: Story = {
  args: {
    plans: samplePlans,
    layout: 'horizontal',
    showPeriodToggle: true,
  },
};

export const GridLayout: Story = {
  args: {
    plans: samplePlans,
    layout: 'grid',
    showPeriodToggle: true,
  },
};

export const VerticalLayout: Story = {
  args: {
    plans: samplePlans,
    layout: 'vertical',
    showPeriodToggle: false,
  },
};

export const WithoutPeriodToggle: Story = {
  args: {
    plans: samplePlans,
    layout: 'horizontal',
    showPeriodToggle: false,
  },
};

export const CustomPeriods: Story = {
  args: {
    plans: samplePlans,
    layout: 'horizontal',
    showPeriodToggle: true,
    periods: [
      { value: 'monthly', label: 'Monthly' },
      { value: 'quarterly', label: 'Quarterly', discount: 10 },
      { value: 'yearly', label: 'Yearly', discount: 25 },
    ],
    selectedPeriod: 'monthly',
  },
};

export const WithActions: Story = {
  args: {
    plans: samplePlans,
    layout: 'horizontal',
    showPeriodToggle: true,
    onPeriodChange: (period) => console.log('Period changed to:', period),
  },
};

export const SinglePlan: Story = {
  args: {
    plans: [samplePlans[1]], // Only Professional plan
    layout: 'horizontal',
    showPeriodToggle: false,
  },
};

export const TwoPlans: Story = {
  args: {
    plans: samplePlans.slice(0, 2), // Starter and Professional
    layout: 'horizontal',
    showPeriodToggle: true,
  },
};

export const WithRecommendedBadge: Story = {
  args: {
    plans: [
      {
        ...samplePlans[0],
        isRecommended: true,
      },
      samplePlans[1],
      samplePlans[2],
    ],
    layout: 'horizontal',
    showPeriodToggle: true,
  },
};

export const WithCustomBadges: Story = {
  args: {
    plans: [
      {
        ...samplePlans[0],
        badge: 'Most Popular',
      },
      {
        ...samplePlans[1],
        badge: 'Best Value',
      },
      {
        ...samplePlans[2],
        badge: 'Enterprise',
      },
    ],
    layout: 'horizontal',
    showPeriodToggle: true,
  },
};

export const FeatureHighlights: Story = {
  args: {
    plans: [
      {
        ...samplePlans[0],
        features: [
          { name: 'Up to 5 projects', included: true, highlight: true },
          { name: 'Basic analytics', included: true },
          { name: 'Email support', included: true },
          { name: 'Advanced features', included: false },
          { name: 'Priority support', included: false },
        ],
      },
      {
        ...samplePlans[1],
        features: [
          { name: 'Up to 25 projects', included: true, highlight: true },
          { name: 'Advanced analytics', included: true, highlight: true },
          { name: 'Priority support', included: true },
          { name: 'Team collaboration', included: true },
          { name: 'Custom integrations', included: false },
        ],
      },
      {
        ...samplePlans[2],
        features: [
          { name: 'Unlimited projects', included: true, highlight: true },
          { name: 'Enterprise analytics', included: true, highlight: true },
          { name: '24/7 phone support', included: true, highlight: true },
          { name: 'Custom integrations', included: true },
          { name: 'Dedicated account manager', included: true },
        ],
      },
    ],
    layout: 'horizontal',
    showPeriodToggle: true,
  },
};

// Pre-built component stories
export const SimplePricingTableExample: Story = {
  render: () => (
    <SimplePricingTable
      plans={samplePlans}
    />
  ),
};

export const GridPricingTableExample: Story = {
  render: () => (
    <GridPricingTable
      plans={samplePlans}
      showPeriodToggle={true}
    />
  ),
};

export const SAASPricingExample: Story = {
  render: () => (
    <SAASPricing
      plans={saasPlans}
    />
  ),
};

export const EcommercePricing: Story = {
  args: {
    plans: [
      {
        id: 'basic',
        name: 'Basic Store',
        description: 'Perfect for small online businesses',
        price: {
          amount: 29,
          currency: '$',
          period: 'month',
        },
        features: [
          { name: 'Up to 100 products', included: true },
          { name: 'Basic themes', included: true },
          { name: 'Email support', included: true },
          { name: 'Payment processing', included: true },
          { name: 'Advanced analytics', included: false },
          { name: 'Custom domain', included: false },
        ],
        cta: {
          label: 'Start Free Trial',
          onClick: () => alert('Starting Basic Store trial...'),
          variant: 'outline' as const,
        },
      },
      {
        id: 'professional',
        name: 'Professional Store',
        description: 'For growing online businesses',
        price: {
          amount: 79,
          currency: '$',
          period: 'month',
        },
        features: [
          { name: 'Unlimited products', included: true },
          { name: 'Premium themes', included: true },
          { name: 'Priority support', included: true },
          { name: 'Advanced analytics', included: true },
          { name: 'Custom domain', included: true },
          { name: 'Abandoned cart recovery', included: true },
        ],
        isPopular: true,
        cta: {
          label: 'Start Free Trial',
          onClick: () => alert('Starting Professional Store trial...'),
        },
      },
      {
        id: 'enterprise',
        name: 'Enterprise Store',
        description: 'For large-scale online operations',
        price: {
          amount: 199,
          currency: '$',
          period: 'month',
        },
        features: [
          { name: 'Everything in Professional', included: true },
          { name: 'Multi-store management', included: true },
          { name: 'Advanced automation', included: true },
          { name: 'Dedicated account manager', included: true },
          { name: 'Custom integrations', included: true },
          { name: 'White-label options', included: true },
        ],
        cta: {
          label: 'Contact Sales',
          onClick: () => alert('Contacting sales team...'),
          variant: 'secondary' as const,
        },
      },
    ],
    layout: 'horizontal',
    showPeriodToggle: true,
    periods: [
      { value: 'monthly', label: 'Monthly' },
      { value: 'yearly', label: 'Yearly', discount: 20 },
    ],
  },
};
