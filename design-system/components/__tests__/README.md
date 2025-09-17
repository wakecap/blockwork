# Button Component Testing Suite

This directory contains comprehensive tests for the Button component, covering all aspects of functionality, accessibility, performance, and visual regression.

## 📁 Test Structure

```
__tests__/
├── Button.test.tsx              # Unit tests
├── Button.integration.test.tsx  # Integration tests
├── Button.accessibility.test.tsx # Accessibility tests
├── Button.visual.test.tsx       # Visual regression tests
├── Button.performance.test.tsx  # Performance tests
├── setup.ts                     # Test setup and mocks
└── README.md                    # This file
```

## 🧪 Test Categories

### 1. Unit Tests (`Button.test.tsx`)
Tests individual component behavior and props:
- ✅ Basic rendering with default props
- ✅ All variant styles (primary, secondary, accent, etc.)
- ✅ All size variants (xs, sm, md, lg, xl, icon)
- ✅ Icon positioning and rendering
- ✅ Loading states and spinners
- ✅ RTL/Arabic support
- ✅ Responsive features
- ✅ Special states (pinned, active)
- ✅ Accessibility attributes
- ✅ Ripple effects
- ✅ Custom styling
- ✅ Error handling

### 2. Integration Tests (`Button.integration.test.tsx`)
Tests user interactions and complex workflows:
- ✅ Form submission flows
- ✅ Button group interactions
- ✅ File upload workflows
- ✅ Language switching
- ✅ Keyboard navigation
- ✅ Responsive behavior
- ✅ Error boundaries
- ✅ Performance under load

### 3. Accessibility Tests (`Button.accessibility.test.tsx`)
WCAG 2.1 AA compliance and screen reader support:
- ✅ WCAG 2.1 AA compliance (using jest-axe)
- ✅ Keyboard navigation (Tab, Enter, Space)
- ✅ Screen reader support (ARIA labels, descriptions)
- ✅ Color contrast requirements
- ✅ Focus management
- ✅ ARIA states and properties
- ✅ RTL/LTR accessibility
- ✅ Touch target accessibility
- ✅ Error state accessibility
- ✅ High contrast mode
- ✅ Reduced motion preferences
- ✅ Complex interaction accessibility

### 4. Visual Regression Tests (`Button.visual.test.tsx`)
Ensures visual consistency across changes:
- ✅ Basic variant rendering
- ✅ Semantic variant rendering
- ✅ Special variant rendering
- ✅ Size variant rendering
- ✅ Icon rendering and positioning
- ✅ State rendering (loading, disabled, active)
- ✅ RTL rendering
- ✅ Responsive rendering
- ✅ Ripple effects
- ✅ Custom styling
- ✅ Complex layouts
- ✅ Edge cases

### 5. Performance Tests (`Button.performance.test.tsx`)
Validates performance under various conditions:
- ✅ Rendering performance (100, 500, 1000+ buttons)
- ✅ Interaction performance (rapid clicks, hovers)
- ✅ Re-rendering performance
- ✅ Memory usage and leak prevention
- ✅ Animation performance
- ✅ Bundle size considerations
- ✅ Stress tests
- ✅ Browser compatibility

## 🚀 Running Tests

### Individual Test Suites
```bash
# Unit tests only
npm run test:button

# Integration tests only
npm run test:button:integration

# Accessibility tests only
npm run test:button:accessibility

# Visual regression tests only
npm run test:button:visual

# Performance tests only
npm run test:button:performance
```

### All Button Tests
```bash
# Run all button tests
npm run test:button:all
```

### Coverage and CI
```bash
# Run with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch

# CI mode (no watch, with coverage)
npm run test:ci
```

## 📊 Test Coverage

The test suite aims for comprehensive coverage:

- **Statements**: 80%+
- **Branches**: 80%+
- **Functions**: 80%+
- **Lines**: 80%+

### Coverage Areas
- ✅ Component rendering
- ✅ Props handling
- ✅ Event handling
- ✅ State management
- ✅ Accessibility features
- ✅ RTL/LTR support
- ✅ Responsive behavior
- ✅ Error handling
- ✅ Performance optimizations

## 🔧 Test Configuration

### Jest Configuration (`jest.config.js`)
- **Environment**: jsdom for DOM testing
- **Setup**: Custom setup file with mocks
- **Transform**: TypeScript support with ts-jest
- **Coverage**: HTML and LCOV reports
- **Timeout**: 10 seconds for complex tests

### Test Setup (`setup.ts`)
- **Mocks**: FontAwesome, FontProvider, performance APIs
- **Utilities**: Custom matchers and helpers
- **Environment**: Browser APIs and observers
- **Cleanup**: Automatic mock clearing

## 🎯 Test Scenarios

### Basic Functionality
- [x] Renders with default props
- [x] Applies correct CSS classes
- [x] Handles click events
- [x] Supports keyboard navigation
- [x] Shows loading states
- [x] Disables when needed

### Variants and Sizes
- [x] All 13 variants render correctly
- [x] All 6 sizes render correctly
- [x] Icon positioning works
- [x] Custom styling applies

### Accessibility
- [x] WCAG 2.1 AA compliant
- [x] Keyboard accessible
- [x] Screen reader friendly
- [x] Proper ARIA attributes
- [x] Color contrast compliant

### Internationalization
- [x] RTL layout support
- [x] Arabic font rendering
- [x] Icon position flipping
- [x] Text direction handling

### Performance
- [x] Renders 1000+ buttons efficiently
- [x] Handles rapid interactions
- [x] No memory leaks
- [x] Smooth animations

## 🐛 Debugging Tests

### Common Issues
1. **FontAwesome mocks**: Ensure icons are properly mocked
2. **FontProvider**: Check that language context is available
3. **Performance**: Adjust timeouts for slower machines
4. **Accessibility**: Verify axe rules are up to date

### Debug Commands
```bash
# Run specific test with verbose output
npm run test:button -- --verbose

# Run tests in debug mode
npm run test:button -- --detectOpenHandles

# Run with coverage and debug
npm run test:coverage -- --verbose
```

## 📈 Test Metrics

### Performance Benchmarks
- **100 buttons**: < 100ms render time
- **500 buttons**: < 500ms render time
- **1000 buttons**: < 1000ms render time
- **Rapid clicks**: 50 clicks < 1000ms
- **Hover events**: 20 cycles < 500ms

### Accessibility Standards
- **WCAG 2.1 AA**: Full compliance
- **Keyboard navigation**: Tab, Enter, Space support
- **Screen readers**: Proper announcements
- **Touch targets**: 44px minimum
- **Color contrast**: 4.5:1 ratio minimum

## 🔄 Continuous Integration

### GitHub Actions (Recommended)
```yaml
name: Button Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run test:ci
      - uses: codecov/codecov-action@v3
```

### Pre-commit Hooks
```bash
# Install husky for git hooks
npm install --save-dev husky

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run test:button:all"
```

## 📝 Writing New Tests

### Test Structure
```typescript
describe('Feature Name', () => {
  it('should do something specific', () => {
    // Arrange
    render(<Button>Test</Button>, { wrapper: TestWrapper });
    
    // Act
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Assert
    expect(button).toHaveClass('expected-class');
  });
});
```

### Best Practices
1. **Use descriptive test names**
2. **Follow AAA pattern** (Arrange, Act, Assert)
3. **Test one thing at a time**
4. **Use proper selectors** (role, text, testid)
5. **Mock external dependencies**
6. **Clean up after tests**

## 🎉 Success Criteria

A test passes when:
- ✅ Component renders without errors
- ✅ All assertions pass
- ✅ No accessibility violations
- ✅ Performance benchmarks met
- ✅ Visual regression checks pass
- ✅ Coverage thresholds met

## 📚 Resources

- [Testing Library Documentation](https://testing-library.com/)
- [Jest Documentation](https://jestjs.io/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Accessibility Testing Guide](https://web.dev/accessibility-testing/)

---

**Note**: This test suite is designed to be comprehensive and maintainable. When adding new features to the Button component, ensure corresponding tests are added to maintain coverage and quality.
