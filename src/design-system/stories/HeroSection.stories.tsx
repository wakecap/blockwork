import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroSection, ProductHero, LandingHero, MinimalHero } from '../components/HeroSection';

const meta: Meta<typeof HeroSection> = {
  title: 'Brand & Marketing/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A versatile hero section component for landing pages and marketing sites with multiple variants and layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'centered', 'split', 'minimal', 'gradient'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Build Amazing Digital Experiences',
    subtitle: 'Modern Design System',
    description: 'Create beautiful, accessible, and scalable user interfaces with our comprehensive component library.',
    primaryAction: {
      label: 'Get Started',
      onClick: () => alert('Get Started clicked!'),
    },
    secondaryAction: {
      label: 'Learn More',
      onClick: () => alert('Learn More clicked!'),
    },
    image: {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      alt: 'Digital design workspace',
      position: 'right',
    },
    variant: 'split',
    size: 'lg',
  },
};

export const Centered: Story = {
  args: {
    title: 'Transform Your Business',
    subtitle: 'Enterprise Solutions',
    description: 'Scale your operations with our enterprise-grade platform designed for modern businesses.',
    primaryAction: {
      label: 'Start Free Trial',
      onClick: () => alert('Free trial started!'),
    },
    secondaryAction: {
      label: 'Schedule Demo',
      onClick: () => alert('Demo scheduled!'),
    },
    variant: 'centered',
    size: 'xl',
    features: [
      'Enterprise Security',
      '24/7 Support',
      '99.9% Uptime',
      'Global CDN',
    ],
  },
};

export const Minimal: Story = {
  args: {
    title: 'Simple & Clean',
    description: 'Sometimes less is more. Focus on what matters.',
    primaryAction: {
      label: 'Explore',
      onClick: () => alert('Exploring...'),
    },
    variant: 'minimal',
    size: 'md',
  },
};

export const Gradient: Story = {
  args: {
    title: 'Next Generation Platform',
    subtitle: 'Built for Scale',
    description: 'Experience the future of digital innovation with our cutting-edge platform.',
    primaryAction: {
      label: 'Join the Future',
      onClick: () => alert('Welcome to the future!'),
    },
    secondaryAction: {
      label: 'Watch Video',
      onClick: () => alert('Video playing...'),
    },
    variant: 'gradient',
    size: 'xl',
    stats: [
      { value: '10M+', label: 'Active Users' },
      { value: '99.9%', label: 'Uptime' },
      { value: '24/7', label: 'Support' },
      { value: '150+', label: 'Countries' },
    ],
  },
};

export const WithBackgroundImage: Story = {
  args: {
    title: 'Adventure Awaits',
    subtitle: 'Explore the World',
    description: 'Discover amazing destinations and create unforgettable memories with our travel platform.',
    primaryAction: {
      label: 'Start Exploring',
      onClick: () => alert('Let\'s explore!'),
    },
    secondaryAction: {
      label: 'View Destinations',
      onClick: () => alert('Showing destinations...'),
    },
    image: {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      alt: 'Mountain landscape',
      position: 'background',
    },
    overlay: true,
    variant: 'gradient',
    size: 'xl',
  },
};

export const WithBadges: Story = {
  args: {
    title: 'Premium Quality Products',
    subtitle: 'Handcrafted Excellence',
    description: 'Discover our collection of premium, handcrafted products made with the finest materials.',
    primaryAction: {
      label: 'Shop Now',
      onClick: () => alert('Opening shop...'),
    },
    badges: ['New Arrival', 'Limited Edition', 'Free Shipping'],
    image: {
      src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      alt: 'Premium products',
      position: 'right',
    },
    variant: 'split',
    size: 'lg',
  },
};

export const WithFeatures: Story = {
  args: {
    title: 'Complete Solution for Your Business',
    subtitle: 'All-in-One Platform',
    description: 'Everything you need to run your business efficiently, from marketing to operations.',
    primaryAction: {
      label: 'Start Free',
      onClick: () => alert('Starting free plan...'),
    },
    secondaryAction: {
      label: 'View Pricing',
      onClick: () => alert('Showing pricing...'),
    },
    features: [
      'Easy to use interface',
      'Powerful analytics',
      'Mobile responsive',
      '24/7 customer support',
      'Regular updates',
      'Secure & reliable',
    ],
    variant: 'centered',
    size: 'lg',
  },
};

export const SmallSize: Story = {
  args: {
    title: 'Quick Introduction',
    description: 'A brief overview of what we offer.',
    primaryAction: {
      label: 'Learn More',
      onClick: () => alert('Learning more...'),
    },
    variant: 'minimal',
    size: 'sm',
  },
};

export const MediumSize: Story = {
  args: {
    title: 'Standard Hero Section',
    subtitle: 'Perfect Balance',
    description: 'A well-balanced hero section that captures attention without overwhelming.',
    primaryAction: {
      label: 'Get Started',
      onClick: () => alert('Getting started...'),
    },
    variant: 'default',
    size: 'md',
  },
};

export const LargeSize: Story = {
  args: {
    title: 'Comprehensive Hero Section',
    subtitle: 'Full Featured',
    description: 'A comprehensive hero section with all the features and options available.',
    primaryAction: {
      label: 'Primary Action',
      onClick: () => alert('Primary action executed!'),
    },
    secondaryAction: {
      label: 'Secondary Action',
      onClick: () => alert('Secondary action executed!'),
    },
    image: {
      src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
      alt: 'Team collaboration',
      position: 'right',
    },
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
    ],
    stats: [
      { value: '100+', label: 'Clients' },
      { value: '50+', label: 'Projects' },
    ],
    variant: 'split',
    size: 'lg',
  },
};

// Pre-built component stories
export const ProductHeroExample: Story = {
  render: () => (
    <ProductHero
      title="Revolutionary Smartphone"
      subtitle="Next Generation Technology"
      description="Experience the future of mobile technology with our latest smartphone featuring cutting-edge innovation and stunning design."
      image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop"
      price="$999"
      rating={4.8}
      features={[
        '5G Connectivity',
        'Advanced Camera System',
        'All-Day Battery Life',
        'Premium Build Quality',
      ]}
      onBuyNow={() => alert('Redirecting to purchase...')}
      onLearnMore={() => alert('Showing product details...')}
    />
  ),
};

export const LandingHeroExample: Story = {
  render: () => (
    <LandingHero
      title="Transform Your Business Today"
      subtitle="Enterprise Solutions"
      description="Join thousands of businesses that have already transformed their operations with our comprehensive platform."
      backgroundImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=800&fit=crop"
      onGetStarted={() => alert('Getting started...')}
      onWatchDemo={() => alert('Playing demo video...')}
      stats={[
        { value: '10,000+', label: 'Happy Customers' },
        { value: '99.9%', label: 'Uptime Guarantee' },
        { value: '24/7', label: 'Expert Support' },
        { value: '150+', label: 'Countries Served' },
      ]}
    />
  ),
};

export const MinimalHeroExample: Story = {
  render: () => (
    <MinimalHero
      title="Simple & Effective"
      description="Sometimes the best solution is the simplest one. Focus on what matters most."
      primaryAction={{
        label: 'Get Started',
        onClick: () => alert('Starting simple...'),
      }}
    />
  ),
};

export const MarketingHero: Story = {
  args: {
    title: 'Limited Time Offer',
    subtitle: 'Save 50% Today',
    description: 'Don\'t miss out on our biggest sale of the year. Limited quantities available.',
    primaryAction: {
      label: 'Shop Now',
      onClick: () => alert('Opening sale...'),
    },
    secondaryAction: {
      label: 'Learn More',
      onClick: () => alert('Showing offer details...'),
    },
    badges: ['Limited Time', '50% Off', 'Free Shipping'],
    variant: 'gradient',
    size: 'xl',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
};
