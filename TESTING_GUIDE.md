# Testing Guide - Jest & Storybook Integration

This guide explains how to use the Jest and Storybook testing setup configured for the Blockwork Design System.

## 🧪 Testing Stack

### Jest Configuration
- **Test Runner**: Jest with jsdom environment
- **TypeScript Support**: ts-jest transformer
- **Testing Library**: @testing-library/react for component testing
- **Coverage**: HTML and LCOV reports with 80% thresholds
- **Mocking**: FontAwesome icons, ResizeObserver, IntersectionObserver

### Storybook Testing
- **Test Runner**: @storybook/test-runner with Playwright
- **Interactions**: @storybook/addon-interactions for user interaction testing
- **Accessibility**: axe-playwright for automated a11y testing
- **Visual Testing**: Stories with play functions for interaction testing

## 📁 File Structure

```
├── jest.config.cjs              # Jest configuration
├── jest.setup.cjs               # Jest setup and mocks
├── tsconfig.test.json           # TypeScript config for tests
├── .storybook/
│   ├── main.ts                  # Storybook configuration
│   ├── test-runner.ts           # Storybook test runner config
│   └── preview.tsx              # Storybook preview settings
├── design-system/components/__tests__/
│   ├── setup.ts                 # Test utilities and helpers
│   └── *.test.tsx               # Component unit tests
└── **/*.stories.tsx             # Storybook stories with interactions
```

## 🚀 Available Scripts

### Jest Testing
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests in CI mode (no watch, with coverage)
npm run test:ci

# Run specific component tests
npm run test:button
npm run test:button:watch
npm run test:button:all

# Run all Button-related tests (unit, integration, performance, etc.)
npm run test:button:all
```

### Storybook Testing
```bash
# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook

# Run Storybook test runner (requires Storybook to be running)
npm run test:storybook

# Run Storybook tests in CI mode
npm run test:storybook:ci

# Run all tests (Jest + Storybook)
npm run test:all
```

## 🧩 Writing Unit Tests

### Basic Component Test
```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';
import { FontProvider } from '../FontProvider';

// Test wrapper with required providers
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <FontProvider>
    {children}
  </FontProvider>
);

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>, { wrapper: TestWrapper });
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>, { wrapper: TestWrapper });
    
    const button = screen.getByRole('button');
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Using Test Utilities
```typescript
import { createMockProps, generateMockButtonProps } from './setup';

describe('Button Component', () => {
  it('renders with mock props', () => {
    const props = generateMockButtonProps('primary');
    render(<Button {...props} />, { wrapper: TestWrapper });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

## 📚 Writing Storybook Stories with Tests

### Basic Story with Interactions
```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from '@storybook/test';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive testing story
export const WithInteractions: Story = {
  args: {
    children: 'Click me',
    onClick: fn(), // Mock function for testing
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test that button is rendered
    await expect(button).toBeInTheDocument();
    
    // Test click interaction
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    
    // Test hover state
    await userEvent.hover(button);
    
    // Test focus state
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates interactive testing using Storybook interactions.',
      },
    },
  },
};

// Accessibility testing story
export const AccessibilityTest: Story = {
  args: {
    children: 'Accessible Button',
    'aria-label': 'Test button for accessibility',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test accessibility attributes
    await expect(button).toHaveAttribute('aria-label', 'Test button for accessibility');
    
    // Test keyboard navigation
    await userEvent.tab();
    await expect(button).toHaveFocus();
    
    // Test keyboard activation
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
        ],
      },
    },
  },
};
```

## 🎯 Testing Best Practices

### Unit Testing
1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Test User Interactions**: Use `@testing-library/user-event` for realistic user interactions
4. **Mock External Dependencies**: Mock FontAwesome icons, API calls, and browser APIs
5. **Test Accessibility**: Ensure components are accessible with proper ARIA attributes

### Storybook Testing
1. **Document with Stories**: Each story should demonstrate a specific use case
2. **Add Interactions**: Use play functions to test user interactions
3. **Test Edge Cases**: Create stories for error states, loading states, etc.
4. **Accessibility Testing**: Include a11y-focused stories with specific rules
5. **Visual Regression**: Use stories for visual testing and regression detection

### Performance Testing
1. **Render Performance**: Test component render times for large datasets
2. **Memory Leaks**: Test rapid re-renders don't cause memory issues
3. **Interaction Performance**: Ensure smooth animations and transitions

## 🔧 Configuration Details

### Jest Configuration Highlights
- **ES Modules Support**: Configured for modern JavaScript/TypeScript
- **Path Mapping**: `@/` alias resolves to project root
- **Asset Handling**: CSS and static assets are mocked
- **Coverage Thresholds**: 80% minimum for statements, branches, functions, lines
- **Test Environment**: jsdom for DOM testing

### Storybook Configuration Highlights
- **Vite Integration**: Uses @storybook/react-vite for fast builds
- **Addon Support**: Includes a11y, docs, and interactions addons
- **Test Runner**: Configured with Playwright for cross-browser testing
- **Accessibility**: Automatic a11y testing with axe-playwright

## 🐛 Troubleshooting

### Common Jest Issues
1. **Module Resolution**: Ensure path aliases match between tsconfig and Jest config
2. **ES Modules**: Use `.cjs` extension for Jest config files in ES module projects
3. **FontAwesome Icons**: Icons are mocked - check mock implementation in jest.setup.cjs
4. **TypeScript Errors**: Ensure tsconfig.test.json includes test files

### Common Storybook Issues
1. **Addon Compatibility**: Ensure addon versions match Storybook version
2. **Test Runner**: Make sure Storybook is running before executing test runner
3. **Interactions**: Use `within(canvasElement)` to scope queries to the story canvas
4. **Accessibility**: Configure specific a11y rules in story parameters

## 📊 Coverage Reports

Coverage reports are generated in the `coverage/` directory:
- **HTML Report**: `coverage/html-report/index.html`
- **LCOV Report**: `coverage/lcov.info`
- **Text Summary**: Displayed in terminal

## 🎨 Integration with CI/CD

The testing setup is configured for CI/CD environments:
- **GitHub Actions**: Use `npm run test:ci` and `npm run test:storybook:ci`
- **Coverage Reports**: Can be uploaded to services like Codecov
- **Visual Regression**: Storybook can be deployed for visual testing services

## 📖 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro)
- [Storybook Testing](https://storybook.js.org/docs/writing-tests/introduction)
- [Storybook Interactions](https://storybook.js.org/docs/writing-tests/interaction-testing)
- [Accessibility Testing](https://storybook.js.org/docs/writing-tests/accessibility-testing)
