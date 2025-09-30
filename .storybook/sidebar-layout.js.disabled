// Sidebar layout enhancement script for Storybook 9.x
(function() {
  'use strict';
  
  // Wait for Storybook to load
  function waitForStorybook() {
    return new Promise((resolve) => {
      const sidebar = document.querySelector('[data-testid="sidebar-root"]') || 
                     document.querySelector('.sb-bar') ||
                     document.querySelector('[data-testid="sidebar"]');
      if (sidebar) {
        resolve(sidebar);
      } else {
        setTimeout(() => waitForStorybook().then(resolve), 100);
      }
    });
  }
  
  // Apply sidebar layout
  function applySidebarLayout(sidebar) {
    if (!sidebar) return;
    
    console.log('Applying sidebar layout to:', sidebar);
    
    // Add layout classes
    sidebar.classList.add('sidebar-container');
    
    // Find and structure the sidebar content
    const children = Array.from(sidebar.children);
    console.log('Sidebar children:', children.length);
    
    // Apply flex layout to sidebar
    sidebar.style.display = 'flex';
    sidebar.style.flexDirection = 'column';
    sidebar.style.height = '100vh';
    sidebar.style.overflow = 'hidden';
    
    // Process each child
    children.forEach((child, index) => {
      console.log(`Processing child ${index}:`, child);
      
      if (index === 0) {
        // Header (logo/title)
        child.classList.add('sidebar-header');
        child.style.position = 'sticky';
        child.style.top = '0';
        child.style.zIndex = '10';
        child.style.background = '#fafafa';
        child.style.borderBottom = '1px solid #e5e5e5';
        child.style.flexShrink = '0';
        child.style.padding = '16px';
      } else if (index === 1) {
        // Search bar
        child.classList.add('sidebar-search');
        child.style.position = 'sticky';
        child.style.top = '80px';
        child.style.zIndex = '9';
        child.style.background = '#fafafa';
        child.style.borderBottom = '1px solid #e5e5e5';
        child.style.flexShrink = '0';
        child.style.padding = '12px 16px';
      } else if (index === children.length - 1) {
        // Content area (last child)
        child.classList.add('sidebar-content');
        child.style.flex = '1';
        child.style.overflowY = 'auto';
        child.style.overflowX = 'hidden';
        child.style.padding = '16px';
      }
    });
    
    // Also try to find nested elements
    const nestedDivs = sidebar.querySelectorAll('div');
    nestedDivs.forEach((div, index) => {
      if (div.parentElement === sidebar) {
        console.log(`Nested div ${index}:`, div);
      }
    });
  }
  
  // Initialize when DOM is ready
  function init() {
    waitForStorybook().then(applySidebarLayout);
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Reapply on navigation changes
  const observer = new MutationObserver(() => {
    const sidebar = document.querySelector('[data-testid="sidebar-root"]') || 
                   document.querySelector('.sb-bar') ||
                   document.querySelector('[data-testid="sidebar"]');
    if (sidebar) {
      applySidebarLayout(sidebar);
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Also try to apply after a delay
  setTimeout(() => {
    const sidebar = document.querySelector('[data-testid="sidebar-root"]') || 
                   document.querySelector('.sb-bar') ||
                   document.querySelector('[data-testid="sidebar"]');
    if (sidebar) {
      applySidebarLayout(sidebar);
    }
  }, 2000);
})();
