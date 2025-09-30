// Browser console script to fix sidebar text transform
// Run this in the browser console at http://localhost:6006

function fixSidebarText() {
  console.log('Fixing sidebar text transform...');
  
  // Get all elements and force normal case
  const allElements = document.querySelectorAll('*');
  let fixedCount = 0;
  
  allElements.forEach(el => {
    if (el.style) {
      const originalTransform = el.style.textTransform;
      el.style.textTransform = 'none';
      if (originalTransform !== 'none') {
        fixedCount++;
      }
    }
  });
  
  console.log(`Fixed ${fixedCount} elements`);
  
  // Specifically target sidebar elements
  const sidebarSelectors = [
    '[data-testid="sidebar-root"]',
    '.sb-bar',
    '[data-testid="story-list"]',
    'h3', 'button', 'span', 'div', 'a', 'p'
  ];
  
  sidebarSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      if (el.style) {
        el.style.textTransform = 'none';
      }
      // Also target child elements
      const children = el.querySelectorAll('*');
      children.forEach(child => {
        if (child.style) {
          child.style.textTransform = 'none';
        }
      });
    });
  });
  
  console.log('Sidebar text transform fixed!');
}

// Run the fix
fixSidebarText();

// Set up observer to fix new elements
const observer = new MutationObserver(() => {
  fixSidebarText();
});
observer.observe(document.body, { childList: true, subtree: true });

console.log('Sidebar text transform fixer is now running!');
