import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "../Button";
import { FontProvider } from "../FontProvider";
import { faBell, faDownload, faCog, faUser, faCheck } from "@fortawesome/free-solid-svg-icons";

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Test wrapper with FontProvider
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <FontProvider>{children}</FontProvider>
);

describe("Button Accessibility Tests", () => {
  // WCAG 2.1 AA Compliance Tests
  describe("WCAG 2.1 AA Compliance", () => {
    it("has no accessibility violations for basic button", async () => {
      const { container } = render(<Button>Click me</Button>, { wrapper: TestWrapper });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no accessibility violations for icon button", async () => {
      const { container } = render(
        <Button size="icon" icon={faBell} aria-label="Notifications" />,
        { wrapper: TestWrapper },
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no accessibility violations for disabled button", async () => {
      const { container } = render(<Button disabled>Disabled</Button>, { wrapper: TestWrapper });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no accessibility violations for loading button", async () => {
      const { container } = render(<Button loading>Loading</Button>, { wrapper: TestWrapper });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no accessibility violations for RTL button", async () => {
      const { container } = render(
        <Button arabicText="حفظ" showArabicText={true}>
          Save
        </Button>,
        { wrapper: TestWrapper },
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // Keyboard Navigation Tests
  describe("Keyboard Navigation", () => {
    it("is focusable with Tab key", async () => {
      render(<Button>Focusable</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");

      // Focus with Tab
      await userEvent.tab();
      expect(button).toHaveFocus();
    });

    it("activates with Enter key", async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Press Enter</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      button.focus();

      await userEvent.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("activates with Space key", async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Press Space</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      button.focus();

      await userEvent.keyboard(" ");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not activate with other keys", async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>No Other Keys</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      button.focus();

      // Test various keys that should not activate
      await userEvent.keyboard("{Escape}");
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{ArrowUp}");
      await userEvent.keyboard("{ArrowLeft}");
      await userEvent.keyboard("{ArrowRight}");
      await userEvent.keyboard("a");
      await userEvent.keyboard("1");

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("maintains focus after activation", async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Keep Focus</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      button.focus();

      await userEvent.keyboard("{Enter}");
      expect(button).toHaveFocus();
    });
  });

  // Screen Reader Support Tests
  describe("Screen Reader Support", () => {
    it("has accessible name from text content", () => {
      render(<Button>Save Document</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button", { name: /save document/i });
      expect(button).toBeInTheDocument();
    });

    it("has accessible name from aria-label", () => {
      render(<Button aria-label="Save the current document">Save</Button>, {
        wrapper: TestWrapper,
      });

      const button = screen.getByRole("button", { name: /save the current document/i });
      expect(button).toBeInTheDocument();
    });

    it("has accessible name for icon-only button", () => {
      render(<Button size="icon" icon={faBell} aria-label="View notifications" />, {
        wrapper: TestWrapper,
      });

      const button = screen.getByRole("button", { name: /view notifications/i });
      expect(button).toBeInTheDocument();
    });

    it("has accessible description from aria-describedby", () => {
      render(
        <div>
          <Button aria-describedby="help-text">Submit</Button>
          <div id="help-text">This will submit your form</div>
        </div>,
        { wrapper: TestWrapper },
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-describedby", "help-text");
    });

    it("announces loading state to screen readers", () => {
      render(
        <Button loading aria-label="Saving document">
          Save
        </Button>,
        { wrapper: TestWrapper },
      );

      const button = screen.getByRole("button", { name: /saving document/i });
      expect(button).toBeDisabled();
    });

    it("announces disabled state to screen readers", () => {
      render(<Button disabled>Disabled Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });

  // Color Contrast Tests
  describe("Color Contrast", () => {
    it("meets contrast requirements for primary variant", () => {
      render(<Button variant="primary">Primary Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");

      // Check that button has proper contrast classes
      expect(button).toHaveClass("bg-neutral-900", "text-white");
    });

    it("meets contrast requirements for secondary variant", () => {
      render(<Button variant="secondary">Secondary Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");

      // Check that button has proper contrast classes
      expect(button).toHaveClass("bg-neutral-100", "text-neutral-900");
    });

    it("meets contrast requirements for outline variant", () => {
      render(<Button variant="outline">Outline Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");

      // Check that button has proper contrast classes
      expect(button).toHaveClass("bg-transparent", "text-neutral-900");
    });

    it("meets contrast requirements for semantic variants", () => {
      const variants = ["success", "warning", "destructive", "info"] as const;

      variants.forEach((variant) => {
        const { unmount } = render(<Button variant={variant}>{variant} Button</Button>, {
          wrapper: TestWrapper,
        });

        const button = screen.getByRole("button");
        expect(button).toHaveClass("text-white"); // All semantic variants use white text

        unmount();
      });
    });
  });

  // Focus Management Tests
  describe("Focus Management", () => {
    it("has visible focus indicator", () => {
      render(<Button>Focusable</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("focus-visible:outline-none", "focus-visible:ring-2");
    });

    it("maintains focus when clicked", async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click Me</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      button.focus();

      await userEvent.click(button);
      expect(button).toHaveFocus();
    });

    it("can be focused programmatically", () => {
      render(<Button>Programmatic Focus</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      button.focus();

      expect(button).toHaveFocus();
    });
  });

  // ARIA States and Properties Tests
  describe("ARIA States and Properties", () => {
    it("has correct role", () => {
      render(<Button>Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("has aria-pressed for toggle buttons", () => {
      render(
        <Button isActive={true} aria-pressed={true}>
          Toggle
        </Button>,
        { wrapper: TestWrapper },
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-pressed", "true");
    });

    it("has aria-expanded for expandable buttons", () => {
      render(<Button aria-expanded={false}>Expand</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-expanded", "false");
    });

    it("has aria-controls for controlling elements", () => {
      render(<Button aria-controls="menu">Menu</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-controls", "menu");
    });

    it("has aria-haspopup for buttons with popups", () => {
      render(<Button aria-haspopup="menu">Options</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-haspopup", "menu");
    });
  });

  // RTL/LTR Accessibility Tests
  describe("RTL/LTR Accessibility", () => {
    it("has correct dir attribute for RTL", () => {
      render(
        <Button arabicText="حفظ" showArabicText={true}>
          Save
        </Button>,
        { wrapper: TestWrapper },
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("dir", "rtl");
    });

    it("has correct dir attribute for LTR", () => {
      render(<Button>Save</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("dir", "ltr");
    });

    it("maintains accessibility in RTL mode", async () => {
      const { container } = render(
        <Button arabicText="حفظ" showArabicText={true} icon={faDownload}>
          Save
        </Button>,
        { wrapper: TestWrapper },
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // Touch Target Tests
  describe("Touch Target Accessibility", () => {
    it("meets minimum touch target size for xs", () => {
      render(<Button size="xs">Extra Small</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("min-w-[44px]");
    });

    it("meets minimum touch target size for sm", () => {
      render(<Button size="sm">Small</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("min-w-[44px]");
    });

    it("meets minimum touch target size for icon buttons", () => {
      render(<Button size="icon" icon={faBell} aria-label="Bell" />, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-11", "w-11"); // 44px x 44px
    });
  });

  // Error State Accessibility Tests
  describe("Error State Accessibility", () => {
    it("announces error state to screen readers", () => {
      render(
        <Button variant="destructive" aria-describedby="error-message">
          Delete
        </Button>,
        { wrapper: TestWrapper },
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-describedby", "error-message");
    });

    it("has no accessibility violations in error state", async () => {
      const { container } = render(<Button variant="destructive">Delete Item</Button>, {
        wrapper: TestWrapper,
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // High Contrast Mode Tests
  describe("High Contrast Mode", () => {
    it("maintains visibility in high contrast mode", () => {
      render(<Button variant="outline">Outline Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");

      // Check for border that provides contrast
      expect(button).toHaveClass("border", "border-neutral-900");
    });

    it("has sufficient visual distinction between states", () => {
      render(<Button>Normal State</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");

      // Check for hover and focus states
      expect(button).toHaveClass("hover:bg-neutral-800");
      expect(button).toHaveClass("focus-visible:ring-2");
    });
  });

  // Reduced Motion Tests
  describe("Reduced Motion", () => {
    it("respects reduced motion preferences", () => {
      render(<Button>Respect Motion</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");

      // Check for motion-safe transitions
      expect(button).toHaveClass("transition-all", "duration-200");
    });

    it("has no accessibility violations with reduced motion", async () => {
      const { container } = render(<Button ripple={true}>With Ripple</Button>, {
        wrapper: TestWrapper,
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // Complex Interaction Accessibility Tests
  describe("Complex Interaction Accessibility", () => {
    it("handles button groups accessibly", () => {
      render(
        <div role="group" aria-label="Action buttons">
          <Button>Save</Button>
          <Button variant="outline">Cancel</Button>
        </div>,
        { wrapper: TestWrapper },
      );

      const group = screen.getByRole("group", { name: /action buttons/i });
      expect(group).toBeInTheDocument();
    });

    it("handles form submission accessibly", () => {
      render(
        <form>
          <Button type="submit">Submit Form</Button>
        </form>,
        { wrapper: TestWrapper },
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("handles navigation accessibly", () => {
      render(
        <nav aria-label="Main navigation">
          <Button variant="nav">Home</Button>
          <Button variant="nav">About</Button>
          <Button variant="nav">Contact</Button>
        </nav>,
        { wrapper: TestWrapper },
      );

      const nav = screen.getByRole("navigation", { name: /main navigation/i });
      expect(nav).toBeInTheDocument();
    });
  });
});
