// Test setup file for design system components
import '@testing-library/jest-dom';

// Re-export testing utilities for convenience
export * from '@testing-library/react';
export * from '@testing-library/user-event';
export { default as userEvent } from '@testing-library/user-event';

// Test utilities and helpers
export const createMockProps = (overrides = {}) => ({
  onClick: jest.fn(),
  onMouseEnter: jest.fn(),
  onMouseLeave: jest.fn(),
  onFocus: jest.fn(),
  onBlur: jest.fn(),
  ...overrides,
});

// Common test wrapper components
export const TestProviders = ({ children }: { children: React.ReactNode }) => {
  return children;
};

// Mock data generators
export const generateMockButtonProps = (variant = 'primary') => ({
  variant,
  size: 'md',
  children: 'Test Button',
  ...createMockProps(),
});

// Accessibility testing helpers
export const expectToBeAccessible = async (element: HTMLElement) => {
  expect(element).toBeInTheDocument();
  expect(element).toBeVisible();
  
  // Check for basic accessibility attributes
  if (element.tagName === 'BUTTON') {
    expect(element).not.toHaveAttribute('aria-hidden', 'true');
  }
};

// Performance testing helpers
export const measureRenderTime = (renderFn: () => void): number => {
  const start = performance.now();
  renderFn();
  const end = performance.now();
  return end - start;
};

// Mock implementations for common scenarios
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;
};

export const mockResizeObserver = () => {
  const mockResizeObserver = jest.fn();
  mockResizeObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.ResizeObserver = mockResizeObserver;
};

// Setup common mocks
beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
  
  // Reset DOM
  document.body.innerHTML = '';
});

afterEach(() => {
  // Cleanup after each test
  jest.restoreAllMocks();
});
