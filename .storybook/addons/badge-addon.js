// Simple badge addon for Storybook sidebar
import { addons } from '@storybook/manager-api';
import { STORY_RENDERED } from '@storybook/core-events';

// Component badges configuration
const COMPONENT_BADGES = {
  'components-button': 'Ready',
  // Add more components here:
  // 'components-badge': 'Ready',
  // 'components-card': 'In Progress',
};

addons.register('blockwork/badges', (api) => {
  // Add badges to sidebar after stories load
  const addBadgesToSidebar = () => {
    setTimeout(() => {
      Object.keys(COMPONENT_BADGES).forEach(componentId => {
        const badgeText = COMPONENT_BADGES[componentId];
        
        // Find the component link
        const link = document.querySelector(`[data-item-id="${componentId}"]`);
        
        if (link && !link.querySelector('.sb-badge')) {
          // Add badge
          const badge = document.createElement('span');
          badge.className = 'sb-badge sb-badge-ready';
          badge.textContent = badgeText;
          badge.style.cssText = `
            display: inline-block;
            margin-left: 8px;
            padding: 2px 8px;
            font-size: 11px;
            font-weight: 600;
            border-radius: 4px;
            border: 1px solid #10b981;
            background: transparent;
            color: #10b981;
          `;
          
          link.appendChild(badge);
          console.log('✅ Badge added to:', componentId);
        }
      });
    }, 1000);
  };

  // Run when stories are rendered
  api.on(STORY_RENDERED, addBadgesToSidebar);
  
  // Also run on initial load
  setTimeout(addBadgesToSidebar, 2000);
  setTimeout(addBadgesToSidebar, 4000);
});




