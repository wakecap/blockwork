import React from "react";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import { Button } from "../Button";
import { FontProvider } from "../FontProvider";
import {
  faBell,
  faDownload,
  faUpload,
  faCheck,
  faTimes,
  faCog,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// Test wrapper with FontProvider
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <FontProvider>{children}</FontProvider>
);

describe("Button Visual Regression Tests", () => {
  // Basic variant visual tests
  describe("Basic Variants", () => {
    it("renders primary variant correctly", () => {
      render(<Button variant="primary">Primary Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-neutral-900", "text-white", "border-neutral-900");
    });

    it("renders secondary variant correctly", () => {
      render(<Button variant="secondary">Secondary Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-neutral-100", "text-neutral-900", "border-neutral-200");
    });

    it("renders accent variant correctly", () => {
      render(<Button variant="accent">Accent Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-orange-600", "text-white", "border-orange-600");
    });

    it("renders outline variant correctly", () => {
      render(<Button variant="outline">Outline Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-transparent", "text-neutral-900", "border-neutral-900");
    });

    it("renders ghost variant correctly", () => {
      render(<Button variant="ghost">Ghost Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-transparent", "text-neutral-600", "border-transparent");
    });

    it("renders text variant correctly", () => {
      render(<Button variant="text">Text Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-transparent", "text-neutral-900", "border-transparent");
    });
  });

  // Semantic variant visual tests
  describe("Semantic Variants", () => {
    it("renders success variant correctly", () => {
      render(<Button variant="success">Success Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-green-600", "text-white", "border-green-600");
    });

    it("renders warning variant correctly", () => {
      render(<Button variant="warning">Warning Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-yellow-500", "text-white", "border-yellow-500");
    });

    it("renders destructive variant correctly", () => {
      render(<Button variant="destructive">Destructive Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-red-600", "text-white", "border-red-600");
    });

    it("renders info variant correctly", () => {
      render(<Button variant="info">Info Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-blue-600", "text-white", "border-blue-600");
    });
  });

  // Special variant visual tests
  describe("Special Variants", () => {
    it("renders pin variant correctly", () => {
      render(<Button variant="pin">Pin Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-transparent", "text-neutral-400", "border-transparent");
    });

    it("renders nav variant correctly", () => {
      render(<Button variant="nav">Nav Button</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-neutral-800", "text-white", "border-neutral-800");
    });

    it("renders fab variant correctly", () => {
      render(<Button variant="fab">FAB</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-orange-600", "rounded-full", "fixed", "bottom-4", "right-4");
    });
  });

  // Size visual tests
  describe("Size Variants", () => {
    it("renders xs size correctly", () => {
      render(<Button size="xs">Extra Small</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-7", "px-2", "py-1", "text-xs");
    });

    it("renders sm size correctly", () => {
      render(<Button size="sm">Small</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-9", "px-3", "py-1.5", "text-sm");
    });

    it("renders md size correctly", () => {
      render(<Button size="md">Medium</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-11", "px-4", "py-2", "text-sm");
    });

    it("renders lg size correctly", () => {
      render(<Button size="lg">Large</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-12", "px-6", "py-3", "text-base");
    });

    it("renders xl size correctly", () => {
      render(<Button size="xl">Extra Large</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-14", "px-8", "py-4", "text-lg");
    });

    it("renders icon size correctly", () => {
      render(<Button size="icon" icon={faBell} aria-label="Bell" />, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("h-11", "w-11", "p-0");
    });
  });

  // Icon visual tests
  describe("Icon Rendering", () => {
    it("renders icon on the left correctly", () => {
      render(
        <Button icon={faDownload} iconPosition="left">
          Download
        </Button>,
        { wrapper: TestWrapper },
      );

      const button = screen.getByRole("button");
      const icon = button.querySelector("svg");

      expect(icon).toBeInTheDocument();
      expect(button.firstChild).toBe(icon);
    });

    it("renders icon on the right correctly", () => {
      render(
        <Button icon={faUpload} iconPosition="right">
          Upload
        </Button>,
        { wrapper: TestWrapper },
      );

      const button = screen.getByRole("button");
      const icon = button.querySelector("svg");

      expect(icon).toBeInTheDocument();
      expect(button.lastChild).toBe(icon);
    });

    it("renders icon-only button correctly", () => {
      render(<Button size="icon" icon={faCog} aria-label="Settings" />, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      const icon = button.querySelector("svg");

      expect(icon).toBeInTheDocument();
      expect(button).toHaveClass("h-11", "w-11");
    });

    it("renders multiple icons correctly", () => {
      render(
        <div>
          <Button icon={faCheck} variant="success">
            Success
          </Button>
          <Button icon={faTimes} variant="destructive">
            Delete
          </Button>
          <Button icon={faBell} variant="info">
            Notify
          </Button>
        </div>,
        { wrapper: TestWrapper },
      );

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        const icon = button.querySelector("svg");
        expect(icon).toBeInTheDocument();
      });
    });
  });

  // State visual tests
  describe("State Rendering", () => {
    it("renders loading state correctly", () => {
      render(<Button loading>Loading</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      const spinner = button.querySelector("svg");

      expect(button).toBeDisabled();
      expect(spinner).toHaveClass("animate-spin");
    });

    it("renders disabled state correctly", () => {
      render(<Button disabled>Disabled</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveClass("disabled:opacity-50");
    });

    it("renders active state correctly", () => {
      render(<Button isActive>Active</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("ring-2", "ring-offset-2", "ring-neutral-500");
    });

    it("renders pinned state correctly", () => {
      render(
        <Button variant="pin" isPinned>
          Pinned
        </Button>,
        { wrapper: TestWrapper },
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-orange-100", "text-orange-700");
    });
  });

  // RTL visual tests
  describe("RTL Rendering", () => {
    it("renders RTL layout correctly", () => {
      render(
        <Button arabicText="حفظ" showArabicText={true} icon={faDownload}>
          Save
        </Button>,
        { wrapper: TestWrapper },
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("dir", "rtl");
      expect(button).toHaveClass("font-arabic");
    });

    it("flips icon position in RTL correctly", () => {
      render(
        <Button icon={faDownload} iconPosition="left" arabicText="تحميل" showArabicText={true}>
          Download
        </Button>,
        { wrapper: TestWrapper },
      );

      const button = screen.getByRole("button");
      const icon = button.querySelector("svg");

      // In RTL, left icon should appear on the right
      expect(button.lastChild).toBe(icon);
    });

    it("renders Arabic text correctly", () => {
      render(
        <Button arabicText="إعدادات" showArabicText={true}>
          Settings
        </Button>,
        { wrapper: TestWrapper },
      );

      expect(screen.getByText("إعدادات")).toBeInTheDocument();
      expect(screen.queryByText("Settings")).not.toBeInTheDocument();
    });
  });

  // Responsive visual tests
  describe("Responsive Rendering", () => {
    it("renders full width correctly", () => {
      render(<Button fullWidth>Full Width</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("w-full");
    });

    it("renders responsive full width correctly", () => {
      render(<Button fullWidthOnMobile>Responsive Width</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("w-full", "sm:w-auto");
    });

    it("renders touch-friendly sizes correctly", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

      sizes.forEach((size) => {
        const { unmount } = render(<Button size={size}>{size} Button</Button>, {
          wrapper: TestWrapper,
        });

        const button = screen.getByRole("button");
        expect(button).toHaveClass("min-w-[44px]");

        unmount();
      });
    });
  });

  // Ripple effect visual tests
  describe("Ripple Effect", () => {
    it("renders ripple effect correctly", () => {
      render(<Button ripple>With Ripple</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      const ripple = button.querySelector('[class*="ripple"]');
      expect(ripple).toBeInTheDocument();
    });

    it("does not render ripple when disabled", () => {
      render(<Button ripple={false}>No Ripple</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      const ripple = button.querySelector('[class*="ripple"]');
      expect(ripple).not.toBeInTheDocument();
    });
  });

  // Custom styling visual tests
  describe("Custom Styling", () => {
    it("applies custom className correctly", () => {
      render(<Button className="custom-class">Custom</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("applies custom styles correctly", () => {
      render(<Button style={{ backgroundColor: "red", color: "white" }}>Styled</Button>, {
        wrapper: TestWrapper,
      });

      const button = screen.getByRole("button");
      expect(button).toHaveStyle("background-color: red; color: white");
    });

    it("merges custom styles with default styles", () => {
      render(
        <Button className="custom-class" style={{ backgroundColor: "blue" }}>
          Merged
        </Button>,
        { wrapper: TestWrapper },
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class", "bg-neutral-900");
      expect(button).toHaveStyle("background-color: blue");
    });
  });

  // Complex layout visual tests
  describe("Complex Layouts", () => {
    it("renders button group correctly", () => {
      render(
        <div className="flex gap-2">
          <Button variant="primary">Save</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="ghost">Reset</Button>
        </div>,
        { wrapper: TestWrapper },
      );

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3);

      expect(buttons[0]).toHaveClass("bg-neutral-900");
      expect(buttons[1]).toHaveClass("bg-transparent", "border-neutral-900");
      expect(buttons[2]).toHaveClass("bg-transparent", "border-transparent");
    });

    it("renders form buttons correctly", () => {
      render(
        <form className="space-y-4">
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="reset" variant="ghost">
            Reset
          </Button>
        </form>,
        { wrapper: TestWrapper },
      );

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3);

      expect(buttons[0]).toHaveAttribute("type", "submit");
      expect(buttons[1]).toHaveAttribute("type", "button");
      expect(buttons[2]).toHaveAttribute("type", "reset");
    });

    it("renders navigation buttons correctly", () => {
      render(
        <nav className="flex space-x-2">
          <Button variant="nav">Home</Button>
          <Button variant="nav">About</Button>
          <Button variant="nav">Contact</Button>
        </nav>,
        { wrapper: TestWrapper },
      );

      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(3);

      buttons.forEach((button) => {
        expect(button).toHaveClass("bg-neutral-800", "text-white");
      });
    });
  });

  // Edge case visual tests
  describe("Edge Cases", () => {
    it("handles very long text correctly", () => {
      render(
        <Button>This is a very long button text that should wrap or truncate appropriately</Button>,
        { wrapper: TestWrapper },
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("whitespace-nowrap");
    });

    it("handles empty text correctly", () => {
      render(<Button></Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("handles special characters correctly", () => {
      render(<Button>Save & Continue →</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveTextContent("Save & Continue →");
    });

    it("handles emoji correctly", () => {
      render(<Button>Save 📁</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toHaveTextContent("Save 📁");
    });
  });
});
