import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Footer, SimpleFooter, BusinessFooter, MarketingFooter } from '../components/Footer';

const meta: Meta<typeof Footer> = {
  title: 'Brand & Marketing/Footer',
  component: Footer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive footer component with multiple variants, sections, and social links for different types of websites.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal', 'extended', 'dark'],
    },
    showBackToTop: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSections = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Documentation', href: '#docs' },
      { label: 'API Reference', href: '#api' },
      { label: 'Changelog', href: '#changelog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Blog', href: '#blog' },
      { label: 'Press', href: '#press' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Help Center', href: '#help' },
      { label: 'Community', href: '#community' },
      { label: 'Tutorials', href: '#tutorials' },
      { label: 'Webinars', href: '#webinars' },
      { label: 'Support', href: '#support' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'GDPR', href: '#gdpr' },
      { label: 'Accessibility', href: '#accessibility' },
    ],
  },
];

const sampleSocialLinks = [
  { platform: 'twitter', href: 'https://twitter.com/company', label: 'Follow us on Twitter' },
  { platform: 'facebook', href: 'https://facebook.com/company', label: 'Like us on Facebook' },
  { platform: 'linkedin', href: 'https://linkedin.com/company/company', label: 'Connect on LinkedIn' },
  { platform: 'instagram', href: 'https://instagram.com/company', label: 'Follow on Instagram' },
  { platform: 'github', href: 'https://github.com/company', label: 'View on GitHub' },
  { platform: 'youtube', href: 'https://youtube.com/company', label: 'Watch on YouTube' },
];

const sampleContactInfo = {
  email: 'hello@company.com',
  phone: '+1 (555) 123-4567',
  address: '123 Business Street, Suite 100, City, State 12345',
};

export const Default: Story = {
  args: {
    sections: sampleSections,
    socialLinks: sampleSocialLinks,
    contactInfo: sampleContactInfo,
    companyName: 'Company Name',
    copyrightText: 'All rights reserved.',
    variant: 'default',
    showBackToTop: true,
  },
};

export const Minimal: Story = {
  args: {
    socialLinks: sampleSocialLinks,
    companyName: 'Company Name',
    variant: 'minimal',
    showBackToTop: false,
  },
};

export const Extended: Story = {
  args: {
    sections: sampleSections,
    socialLinks: sampleSocialLinks,
    contactInfo: sampleContactInfo,
    companyName: 'Company Name',
    copyrightText: 'All rights reserved worldwide.',
    variant: 'extended',
    showBackToTop: true,
  },
};

export const Dark: Story = {
  args: {
    sections: sampleSections,
    socialLinks: sampleSocialLinks,
    contactInfo: sampleContactInfo,
    companyName: 'Company Name',
    copyrightText: 'All rights reserved.',
    variant: 'dark',
    showBackToTop: true,
  },
};

export const WithoutSections: Story = {
  args: {
    socialLinks: sampleSocialLinks,
    contactInfo: sampleContactInfo,
    companyName: 'Company Name',
    variant: 'default',
    showBackToTop: true,
  },
};

export const WithoutSocialLinks: Story = {
  args: {
    sections: sampleSections,
    contactInfo: sampleContactInfo,
    companyName: 'Company Name',
    variant: 'default',
    showBackToTop: true,
  },
};

export const WithoutContactInfo: Story = {
  args: {
    sections: sampleSections,
    socialLinks: sampleSocialLinks,
    companyName: 'Company Name',
    variant: 'default',
    showBackToTop: true,
  },
};

export const CustomCopyright: Story = {
  args: {
    sections: sampleSections,
    socialLinks: sampleSocialLinks,
    contactInfo: sampleContactInfo,
    companyName: 'TechCorp Inc.',
    copyrightText: '© 2024 TechCorp Inc. All rights reserved. | Made with ❤️ in San Francisco',
    variant: 'default',
    showBackToTop: true,
  },
};

export const ExternalLinks: Story = {
  args: {
    sections: [
      {
        title: 'External Resources',
        links: [
          { label: 'GitHub Repository', href: 'https://github.com/company', external: true },
          { label: 'Documentation', href: 'https://docs.company.com', external: true },
          { label: 'API Status', href: 'https://status.company.com', external: true },
          { label: 'Developer Portal', href: 'https://developers.company.com', external: true },
        ],
      },
      {
        title: 'Social Media',
        links: [
          { label: 'Twitter', href: 'https://twitter.com/company', external: true },
          { label: 'LinkedIn', href: 'https://linkedin.com/company/company', external: true },
          { label: 'Blog', href: 'https://blog.company.com', external: true },
        ],
      },
    ],
    socialLinks: sampleSocialLinks,
    companyName: 'Company Name',
    variant: 'default',
    showBackToTop: true,
  },
};

export const NoBackToTop: Story = {
  args: {
    sections: sampleSections,
    socialLinks: sampleSocialLinks,
    contactInfo: sampleContactInfo,
    companyName: 'Company Name',
    variant: 'default',
    showBackToTop: false,
  },
};

// Pre-built component stories
export const SimpleFooterExample: Story = {
  render: () => (
    <SimpleFooter
      companyName="SimpleCorp"
      socialLinks={sampleSocialLinks.slice(0, 3)} // Only first 3 social links
    />
  ),
};

export const BusinessFooterExample: Story = {
  render: () => (
    <BusinessFooter
      companyName="BusinessCorp"
      sections={sampleSections.slice(0, 3)} // Only first 3 sections
      socialLinks={sampleSocialLinks}
      contactInfo={sampleContactInfo}
    />
  ),
};

export const MarketingFooterExample: Story = {
  render: () => (
    <MarketingFooter
      companyName="MarketingCorp"
      sections={sampleSections}
      socialLinks={sampleSocialLinks}
      contactInfo={sampleContactInfo}
    />
  ),
};

export const EcommerceFooter: Story = {
  args: {
    sections: [
      {
        title: 'Shop',
        links: [
          { label: 'All Products', href: '#products' },
          { label: 'New Arrivals', href: '#new' },
          { label: 'Best Sellers', href: '#bestsellers' },
          { label: 'Sale Items', href: '#sale' },
          { label: 'Gift Cards', href: '#gifts' },
        ],
      },
      {
        title: 'Customer Service',
        links: [
          { label: 'Contact Us', href: '#contact' },
          { label: 'Shipping Info', href: '#shipping' },
          { label: 'Returns & Exchanges', href: '#returns' },
          { label: 'Size Guide', href: '#sizing' },
          { label: 'FAQ', href: '#faq' },
        ],
      },
      {
        title: 'About',
        links: [
          { label: 'Our Story', href: '#story' },
          { label: 'Sustainability', href: '#sustainability' },
          { label: 'Careers', href: '#careers' },
          { label: 'Press', href: '#press' },
          { label: 'Store Locator', href: '#stores' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy Policy', href: '#privacy' },
          { label: 'Terms of Service', href: '#terms' },
          { label: 'Cookie Policy', href: '#cookies' },
          { label: 'Accessibility', href: '#accessibility' },
        ],
      },
    ],
    socialLinks: [
      { platform: 'instagram', href: 'https://instagram.com/company', label: 'Follow on Instagram' },
      { platform: 'facebook', href: 'https://facebook.com/company', label: 'Like on Facebook' },
      { platform: 'twitter', href: 'https://twitter.com/company', label: 'Follow on Twitter' },
      { platform: 'youtube', href: 'https://youtube.com/company', label: 'Watch on YouTube' },
    ],
    contactInfo: {
      email: 'customerservice@company.com',
      phone: '1-800-COMPANY',
      address: '123 Fashion Street, Style City, SC 12345',
    },
    companyName: 'FashionCorp',
    copyrightText: '© 2024 FashionCorp. All rights reserved.',
    variant: 'extended',
    showBackToTop: true,
  },
};

export const SaaSFooter: Story = {
  args: {
    sections: [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '#features' },
          { label: 'Integrations', href: '#integrations' },
          { label: 'API', href: '#api' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Roadmap', href: '#roadmap' },
        ],
      },
      {
        title: 'Developers',
        links: [
          { label: 'Documentation', href: '#docs' },
          { label: 'SDKs', href: '#sdks' },
          { label: 'Code Samples', href: '#samples' },
          { label: 'Developer Blog', href: '#devblog' },
          { label: 'Status Page', href: '#status' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '#about' },
          { label: 'Careers', href: '#careers' },
          { label: 'Blog', href: '#blog' },
          { label: 'Press', href: '#press' },
          { label: 'Partners', href: '#partners' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Help Center', href: '#help' },
          { label: 'Community', href: '#community' },
          { label: 'Contact Support', href: '#support' },
          { label: 'Training', href: '#training' },
          { label: 'Security', href: '#security' },
        ],
      },
    ],
    socialLinks: [
      { platform: 'github', href: 'https://github.com/company', label: 'View on GitHub' },
      { platform: 'twitter', href: 'https://twitter.com/company', label: 'Follow on Twitter' },
      { platform: 'linkedin', href: 'https://linkedin.com/company/company', label: 'Connect on LinkedIn' },
      { platform: 'youtube', href: 'https://youtube.com/company', label: 'Watch on YouTube' },
      { platform: 'discord', href: 'https://discord.gg/company', label: 'Join Discord' },
    ],
    contactInfo: {
      email: 'hello@company.com',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Street, Innovation City, IC 12345',
    },
    companyName: 'TechCorp',
    copyrightText: '© 2024 TechCorp. All rights reserved.',
    variant: 'dark',
    showBackToTop: true,
  },
};
