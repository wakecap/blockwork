// Blockwork Branding Addon
import { addons } from '@storybook/manager-api';

// Function to replace Storybook branding with Blockwork logo
function replaceBranding() {
  // Target the sidebar header area
  const sidebarHeader = document.querySelector('[data-testid="sidebar-header"]') || 
                       document.querySelector('.sb-bar .sb-bar__brand') ||
                       document.querySelector('.sb-bar > div:first-child');
  
  if (sidebarHeader) {
    // Clear existing content
    sidebarHeader.innerHTML = '';
    
    // Create logo element
    const logo = document.createElement('img');
    logo.src = '/Logo-Vector.svg';
    logo.alt = 'Blockwork Design System';
    logo.style.cssText = 'height: 32px; width: auto; max-width: 200px; object-fit: contain; display: block;';
    
    // Add logo to header
    sidebarHeader.appendChild(logo);
    
    // Style the container
    sidebarHeader.style.cssText = 'display: flex; align-items: center; justify-content: center; padding: 8px;';
  }
}

// Function to set sidebar background
function setSidebarBackground() {
  const sidebar = document.querySelector('[data-testid="sidebar"]') || 
                 document.querySelector('.sb-sidebar') ||
                 document.querySelector('.sb-show-main > div > div:first-child');
  
  if (sidebar) {
    sidebar.style.background = '#fafafa';
  }
}

// Run on manager load
addons.register('blockwork-branding', () => {
  // Replace branding immediately
  replaceBranding();
  setSidebarBackground();
  
  // Also run after a delay to catch dynamic content
  setTimeout(() => {
    replaceBranding();
    setSidebarBackground();
  }, 1000);
  
  // Watch for changes
  const observer = new MutationObserver(() => {
    replaceBranding();
    setSidebarBackground();
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
});
