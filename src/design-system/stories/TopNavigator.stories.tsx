import React from "react";
import { TopNavigator } from "../components/TopNavigator";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof TopNavigator> = {
  title: "Navigation/TopNavigator",
  component: TopNavigator,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#111" },
        { name: "light", value: "#fff" },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopNavigator>;

export const Default: Story = {
  render: () => <TopNavigator />,
};

export const WithPageContent: Story = {
  render: () => (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <TopNavigator />
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>
          Welcome to Wakecap Dashboard
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem', lineHeight: '1.6' }}>
          This is a sample page to demonstrate the blur effect when the MegaMenu is opened. 
          Click the grid icon in the top navigation to see the background blur effect.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '2rem' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Site Management</h3>
            <p style={{ color: '#666' }}>Manage your construction sites and workforce efficiently.</p>
          </div>
          
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Analytics</h3>
            <p style={{ color: '#666' }}>View detailed reports and insights about your operations.</p>
          </div>
          
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Team Collaboration</h3>
            <p style={{ color: '#666' }}>Connect with your team and manage projects together.</p>
          </div>
        </div>
        
        <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#333', marginBottom: '15px' }}>Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '4px' }}>
              <strong>Site Update:</strong> Construction progress at Site A - 75% complete
            </div>
            <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '4px' }}>
              <strong>New Report:</strong> Weekly safety report generated
            </div>
            <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '4px' }}>
              <strong>Team Message:</strong> John Doe shared a new document
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TopNavigator with sample page content to demonstrate the blur effect when MegaMenu is opened. Click the grid icon to see the background blur.',
      },
    },
  },
}; 