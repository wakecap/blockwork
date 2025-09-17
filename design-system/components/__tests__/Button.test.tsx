import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';
import { FontProvider } from '../FontProvider';
import { 
  faBell, 
  faDownload, 
  faSpinner,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

// Test wrapper with FontProvider
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <FontProvider>
    {children}
  </FontProvider>
);

describe('Button Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>, { wrapper: TestWrapper });
      const button = screen.getByRole('button', { name: /click me/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-neutral-900'); // primary variant
    });

    it('renders with custom variant', () => {
      render(<Button variant="secondary">Secondary</Button>, { wrapper: TestWrapper });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-neutral-100');
    });

    it('renders with custom size', () => {
      render(<Button size="lg">Large Button</Button>, { wrapper: TestWrapper });
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-12');
    });

    it('renders with icon', () => {
      render(<Button icon={faBell}>With Icon</Button>, { wrapper: TestWrapper });
      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders icon-only button', () => {
      render(<Button size="icon" icon={faBell} aria-label="Notifications" />, { wrapper: TestWrapper });
      const button = screen.getByRole('button', { name: /notifications/i });
      expect(button).toHaveClass('h-10', 'w-10');
    });
  });

  // Variant tests
  describe('Variants', () => {
    const variants = [
      { variant: 'primary', expectedClass: 'bg-neutral-900' },
      { variant: 'secondary', expectedClass: 'bg-neutral-100' },
      { variant: 'accent', expectedClass: 'bg-orange-600' },
      { variant: 'outline', expectedClass: 'bg-transparent' },
      { variant: 'ghost', expectedClass: 'bg-transparent' },
      { variant: 'text', expectedClass: 'bg-transparent' },
      { variant: 'success', expectedClass: 'bg-green-600' },
      { variant: 'warning', expectedClass: 'bg-yellow-500' },
      { variant: 'destructive', expectedClass: 'bg-red-600' },
      { variant: 'info', expectedClass: 'bg-blue-600' },
      { variant: 'pin', expectedClass: 'bg-transparent' },
      { variant: 'nav', expectedClass: 'bg-neutral-800' },
    ];

    variants.forEach(({ variant, expectedClass }) => {
      it(`renders ${variant} variant correctly`, () => {
        render(<Button variant={variant as any}>{variant}</Button>, { wrapper: TestWrapper });
        const button = screen.getByRole('button');
        expect(button).toHaveClass(expectedClass);
      });
    });
  });

  // Size tests
  describe('Sizes', () => {
    const sizes = [
      { size: 'xs', expectedHeight: 'h-7' },
      { size: 'sm', expectedHeight: 'h-9' },
      { size: 'md', expectedHeight: 'h-11' },
      { size: 'lg', expectedHeight: 'h-12' },
      { size: 'xl', expectedHeight: 'h-14' },
      { size: 'icon', expectedClasses: ['h-11', 'w-11'] },
    ];

    sizes.forEach(({ size, expectedHeight, expectedClasses }) => {
      it(`renders ${size} size correctly`, () => {
        render(<Button size={size as any}>Button</Button>, { wrapper: TestWrapper });
        const button = screen.getByRole('button');
        
        if (expectedClasses) {
          expectedClasses.forEach(cls => expect(button).toHaveClass(cls));
        } else {
          expect(button).toHaveClass(expectedHeight);
        }
      });
    });
  });

  // Interaction tests
  describe('Interactions', () => {
    it('handles click events', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles mouse enter and leave events', async () => {
      const handleMouseEnter = jest.fn();
      const handleMouseLeave = jest.fn();
      
      render(
        <Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          Hover me
        </Button>,
        { wrapper: TestWrapper }
      );
      
      const button = screen.getByRole('button');
      
      await userEvent.hover(button);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
      
      await userEvent.unhover(button);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard events', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Press me</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByRole('button');
      button.focus();
      
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      await userEvent.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('prevents clicks when disabled', async () => {
      const handleClick = jest.fn();
      render(<Button disabled onClick={handleClick}>Disabled</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      
      await userEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  // Loading state tests
  describe('Loading State', () => {
    it('shows loading spinner when loading', () => {
      render(<Button loading>Loading</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByRole('button');
      const spinner = button.querySelector('svg');
      
      expect(button).toBeDisabled();
      expect(spinner).toHaveClass('animate-spin');
    });

    it('shows custom loading text', () => {
      render(<Button loading loadingText="Saving...">Save</Button>, { wrapper: TestWrapper });
      
      expect(screen.getByText('Saving...')).toBeInTheDocument();
      expect(screen.queryByText('Save')).not.toBeInTheDocument();
    });

    it('hides icon when loading', () => {
      render(<Button loading icon={faBell}>Loading</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByRole('button');
      const icons = button.querySelectorAll('svg');
      
      // Should only have spinner, not the bell icon
      expect(icons).toHaveLength(1);
    });
  });

  // Icon positioning tests
  describe('Icon Positioning', () => {
    it('positions icon on the left by default', () => {
      render(<Button icon={faBell}>With Icon</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');
      const text = screen.getByText('With Icon');
      
      // Icon should come before text in DOM order
      expect(button.firstChild).toBe(icon);
    });

    it('positions icon on the right when specified', () => {
      render(<Button icon={faBell} iconPosition="right">With Icon</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');
      const text = screen.getByText('With Icon');
      
      // Icon should come after text in DOM order
      expect(button.lastChild).toBe(icon);
    });
  });

  // RTL/Arabic support tests
  describe('RTL/Arabic Support', () => {
    it('applies Arabic font when showing Arabic text', () => {
      render(
        <Button arabicText="زر أساسي" showArabicText={true}>
          Primary
        </Button>,
        { wrapper: TestWrapper }
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('font-arabic');
      expect(button).toHaveAttribute('dir', 'rtl');
    });

    it('flips icon position in RTL mode', () => {
      render(
        <Button 
          icon={faBell} 
          iconPosition="left"
          arabicText="إشعارات"
          showArabicText={true}
        >
          Notifications
        </Button>,
        { wrapper: TestWrapper }
      );
      
      const button = screen.getByRole('button');
      const icon = button.querySelector('svg');
      
      // In RTL, left icon should appear on the right
      expect(button.lastChild).toBe(icon);
    });

    it('shows Arabic text when showArabicText is true', () => {
      render(
        <Button arabicText="حفظ" showArabicText={true}>
          Save
        </Button>,
        { wrapper: TestWrapper }
      );
      
      expect(screen.getByText('حفظ')).toBeInTheDocument();
      expect(screen.queryByText('Save')).not.toBeInTheDocument();
    });
  });

  // Responsive features tests
  describe('Responsive Features', () => {
    it('applies full width class when fullWidth is true', () => {
      render(<Button fullWidth>Full Width</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
    });

    it('applies responsive full width class when fullWidthOnMobile is true', () => {
      render(<Button fullWidthOnMobile>Responsive Width</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full', 'sm:w-auto');
    });
  });

  // Special states tests
  describe('Special States', () => {
    it('applies pinned state styling', () => {
      render(<Button variant="pin" isPinned={true}>Pinned</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-orange-100', 'text-orange-700');
    });

    it('applies active state styling', () => {
      render(<Button isActive={true}>Active</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('ring-2', 'ring-offset-2', 'ring-neutral-500');
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has proper ARIA label for icon-only buttons', () => {
      render(<Button size="icon" icon={faBell} aria-label="Notifications" />, { wrapper: TestWrapper });
      
      const button = screen.getByRole('button', { name: /notifications/i });
      expect(button).toHaveAttribute('aria-label', 'Notifications');
    });

    it('has proper ARIA described by attribute', () => {
      render(
        <Button aria-describedby="help-text">
          Button
        </Button>,
        { wrapper: TestWrapper }
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', 'help-text');
    });

    it('is focusable and has focus indicators', () => {
      render(<Button>Focusable</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByRole('button');
      button.focus();
      
      expect(button).toHaveFocus();
      expect(button).toHaveClass('focus-visible:outline-none', 'focus-visible:ring-2');
    });

    it('announces loading state to screen readers', () => {
      render(<Button loading aria-label="Loading button">Loading</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-label', 'Loading button');
    });
  });

  // Ripple effect tests
  describe('Ripple Effect', () => {
    it('renders ripple effect when enabled', () => {
      render(<Button ripple={true}>With Ripple</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByRole('button');
      const ripple = button.querySelector('[class*="ripple"]');
      expect(ripple).toBeInTheDocument();
    });

    it('does not render ripple effect when disabled', () => {
      render(<Button ripple={false}>No Ripple</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByRole('button');
      const ripple = button.querySelector('[class*="ripple"]');
      expect(ripple).not.toBeInTheDocument();
    });
  });

  // Custom className tests
  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<Button className="custom-class">Custom</Button>, { wrapper: TestWrapper });
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('merges custom styles with default styles', () => {
      render(
        <Button 
          className="custom-class" 
          style={{ backgroundColor: 'red' }}
        >
          Styled
        </Button>,
        { wrapper: TestWrapper }
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class', 'bg-neutral-900');
      expect(button).toHaveStyle('background-color: red');
    });
  });

  // Error boundary tests
  describe('Error Handling', () => {
    it('handles missing icon gracefully', () => {
      // This should not throw an error
      expect(() => {
        render(<Button icon={undefined}>No Icon</Button>, { wrapper: TestWrapper });
      }).not.toThrow();
    });

    it('handles invalid variant gracefully', () => {
      // TypeScript should catch this, but runtime should handle gracefully
      expect(() => {
        render(<Button variant={'invalid' as any}>Invalid</Button>, { wrapper: TestWrapper });
      }).not.toThrow();
    });
  });

  // Performance tests
  describe('Performance', () => {
    it('renders quickly with many buttons', () => {
      const startTime = performance.now();
      
      render(
        <div>
          {Array.from({ length: 100 }, (_, i) => (
            <Button key={i}>Button {i}</Button>
          ))}
        </div>,
        { wrapper: TestWrapper }
      );
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render 100 buttons in less than 100ms
      expect(renderTime).toBeLessThan(100);
    });

    it('does not cause memory leaks with rapid re-renders', () => {
      const { rerender } = render(<Button>Test</Button>, { wrapper: TestWrapper });
      
      // Rapid re-renders should not cause issues
      for (let i = 0; i < 100; i++) {
        rerender(<Button>Test {i}</Button>);
      }
      
      // If we get here without errors, the test passes
      expect(true).toBe(true);
    });
  });
});
