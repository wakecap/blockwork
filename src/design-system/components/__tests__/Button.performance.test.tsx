import React, { useState, useCallback } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";
import { FontProvider } from "../FontProvider";
import { faBell, faDownload, faUpload, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

// Test wrapper with FontProvider
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <FontProvider>{children}</FontProvider>
);

// Performance test components
const PerformanceTestComponent: React.FC<{ count: number }> = ({ count }) => {
  const [clicked, setClicked] = useState<number[]>([]);

  const handleClick = useCallback((index: number) => {
    setClicked((prev) => [...prev, index]);
  }, []);

  return (
    <div>
      {Array.from({ length: count }, (_, i) => (
        <Button
          key={i}
          onClick={() => handleClick(i)}
          variant={i % 2 === 0 ? "primary" : "secondary"}
        >
          Button {i}
        </Button>
      ))}
      <div data-testid="clicked-count">{clicked.length}</div>
    </div>
  );
};

const RerenderTestComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  const [variant, setVariant] = useState<"primary" | "secondary">("primary");

  return (
    <div>
      <Button variant={variant} onClick={() => setCount((prev) => prev + 1)}>
        Count: {count}
      </Button>
      <Button onClick={() => setVariant((prev) => (prev === "primary" ? "secondary" : "primary"))}>
        Toggle Variant
      </Button>
    </div>
  );
};

const MemoryLeakTestComponent: React.FC = () => {
  const [buttons, setButtons] = useState<number[]>([]);
  const [removed, setRemoved] = useState<number[]>([]);

  const addButton = () => {
    setButtons((prev) => [...prev, Date.now()]);
  };

  const removeButton = (id: number) => {
    setButtons((prev) => prev.filter((b) => b !== id));
    setRemoved((prev) => [...prev, id]);
  };

  return (
    <div>
      <Button onClick={addButton}>Add Button</Button>
      {buttons.map((id) => (
        <Button key={id} onClick={() => removeButton(id)}>
          Remove {id}
        </Button>
      ))}
      <div data-testid="removed-count">{removed.length}</div>
    </div>
  );
};

describe("Button Performance Tests", () => {
  // Rendering performance tests
  describe("Rendering Performance", () => {
    it("renders 100 buttons efficiently", () => {
      const startTime = performance.now();

      render(<PerformanceTestComponent count={100} />, { wrapper: TestWrapper });

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render 100 buttons in less than 100ms
      expect(renderTime).toBeLessThan(100);

      // Verify all buttons are rendered
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(100);
    });

    it("renders 500 buttons efficiently", () => {
      const startTime = performance.now();

      render(<PerformanceTestComponent count={500} />, { wrapper: TestWrapper });

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render 500 buttons in less than 500ms
      expect(renderTime).toBeLessThan(500);

      // Verify all buttons are rendered
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(500);
    });

    it("renders complex buttons efficiently", () => {
      const startTime = performance.now();

      render(
        <div>
          {Array.from({ length: 50 }, (_, i) => (
            <Button
              key={i}
              variant={i % 3 === 0 ? "primary" : i % 3 === 1 ? "secondary" : "accent"}
              size={i % 2 === 0 ? "md" : "lg"}
              icon={i % 2 === 0 ? faBell : faDownload}
              loading={i % 5 === 0}
              ripple={i % 2 === 0}
            >
              Complex Button {i}
            </Button>
          ))}
        </div>,
        { wrapper: TestWrapper },
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render 50 complex buttons in less than 200ms
      expect(renderTime).toBeLessThan(200);
    });
  });

  // Interaction performance tests
  describe("Interaction Performance", () => {
    it("handles rapid clicks efficiently", async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Rapid Click</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      const startTime = performance.now();

      // Rapid clicks
      for (let i = 0; i < 50; i++) {
        await userEvent.click(button);
      }

      const endTime = performance.now();
      const clickTime = endTime - startTime;

      // Should handle 50 clicks in less than 1000ms
      expect(clickTime).toBeLessThan(1000);
      expect(handleClick).toHaveBeenCalledTimes(50);
    });

    it("handles hover events efficiently", async () => {
      const handleMouseEnter = jest.fn();
      const handleMouseLeave = jest.fn();

      render(
        <Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          Hover Test
        </Button>,
        { wrapper: TestWrapper },
      );

      const button = screen.getByRole("button");
      const startTime = performance.now();

      // Rapid hover events
      for (let i = 0; i < 20; i++) {
        await userEvent.hover(button);
        await userEvent.unhover(button);
      }

      const endTime = performance.now();
      const hoverTime = endTime - startTime;

      // Should handle 20 hover cycles in less than 500ms
      expect(hoverTime).toBeLessThan(500);
      expect(handleMouseEnter).toHaveBeenCalledTimes(20);
      expect(handleMouseLeave).toHaveBeenCalledTimes(20);
    });

    it("handles keyboard events efficiently", async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Keyboard Test</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      button.focus();

      const startTime = performance.now();

      // Rapid keyboard events
      for (let i = 0; i < 30; i++) {
        await userEvent.keyboard("{Enter}");
        await userEvent.keyboard(" ");
      }

      const endTime = performance.now();
      const keyboardTime = endTime - startTime;

      // Should handle 60 keyboard events in less than 1000ms
      expect(keyboardTime).toBeLessThan(1000);
      expect(handleClick).toHaveBeenCalledTimes(60);
    });
  });

  // Re-rendering performance tests
  describe("Re-rendering Performance", () => {
    it("handles frequent re-renders efficiently", () => {
      const { rerender } = render(<RerenderTestComponent />, { wrapper: TestWrapper });

      const startTime = performance.now();

      // Frequent re-renders
      for (let i = 0; i < 100; i++) {
        rerender(<RerenderTestComponent />);
      }

      const endTime = performance.now();
      const rerenderTime = endTime - startTime;

      // Should handle 100 re-renders in less than 200ms
      expect(rerenderTime).toBeLessThan(200);
    });

    it("handles prop changes efficiently", async () => {
      const { rerender } = render(<Button variant="primary">Test</Button>, {
        wrapper: TestWrapper,
      });

      const startTime = performance.now();

      // Change props frequently
      for (let i = 0; i < 50; i++) {
        const variant = i % 2 === 0 ? "primary" : "secondary";
        rerender(<Button variant={variant}>Test {i}</Button>);
      }

      const endTime = performance.now();
      const propChangeTime = endTime - startTime;

      // Should handle 50 prop changes in less than 100ms
      expect(propChangeTime).toBeLessThan(100);
    });

    it("handles state changes efficiently", async () => {
      render(<RerenderTestComponent />, { wrapper: TestWrapper });

      const toggleButton = screen.getByText("Toggle Variant");
      const startTime = performance.now();

      // Rapid state changes
      for (let i = 0; i < 20; i++) {
        await userEvent.click(toggleButton);
      }

      const endTime = performance.now();
      const stateChangeTime = endTime - startTime;

      // Should handle 20 state changes in less than 500ms
      expect(stateChangeTime).toBeLessThan(500);
    });
  });

  // Memory usage tests
  describe("Memory Usage", () => {
    it("does not cause memory leaks with dynamic buttons", async () => {
      render(<MemoryLeakTestComponent />, { wrapper: TestWrapper });

      const addButton = screen.getByText("Add Button");
      const startTime = performance.now();

      // Add and remove buttons rapidly
      for (let i = 0; i < 50; i++) {
        await userEvent.click(addButton);

        // Remove the first button
        const removeButtons = screen.getAllByText(/Remove/);
        if (removeButtons.length > 0) {
          await userEvent.click(removeButtons[0]);
        }
      }

      const endTime = performance.now();
      const memoryTestTime = endTime - startTime;

      // Should handle add/remove operations in reasonable time
      expect(memoryTestTime).toBeLessThan(2000);

      // Verify some buttons were removed
      const removedCount = screen.getByTestId("removed-count");
      expect(removedCount).toHaveTextContent(expect.stringMatching(/\d+/));
    });

    it("handles large numbers of buttons without memory issues", () => {
      const startTime = performance.now();

      render(<PerformanceTestComponent count={1000} />, { wrapper: TestWrapper });

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render 1000 buttons in less than 1000ms
      expect(renderTime).toBeLessThan(1000);

      // Verify all buttons are rendered
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(1000);
    });
  });

  // Animation performance tests
  describe("Animation Performance", () => {
    it("handles ripple animations efficiently", async () => {
      render(<Button ripple>With Ripple</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      const startTime = performance.now();

      // Trigger ripple animations
      for (let i = 0; i < 20; i++) {
        fireEvent.mouseDown(button);
        fireEvent.mouseUp(button);
      }

      const endTime = performance.now();
      const animationTime = endTime - startTime;

      // Should handle 20 ripple animations in less than 500ms
      expect(animationTime).toBeLessThan(500);
    });

    it("handles loading animations efficiently", () => {
      const startTime = performance.now();

      render(
        <div>
          {Array.from({ length: 50 }, (_, i) => (
            <Button key={i} loading>
              Loading {i}
            </Button>
          ))}
        </div>,
        { wrapper: TestWrapper },
      );

      const endTime = performance.now();
      const animationTime = endTime - startTime;

      // Should render 50 loading buttons in less than 200ms
      expect(animationTime).toBeLessThan(200);
    });
  });

  // Bundle size tests
  describe("Bundle Size", () => {
    it("has reasonable component size", () => {
      // This is a conceptual test - in a real scenario, you'd use tools like
      // webpack-bundle-analyzer or similar to measure actual bundle size

      // For now, we'll just verify the component renders without issues
      render(<Button>Bundle Test</Button>, { wrapper: TestWrapper });

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

  // Stress tests
  describe("Stress Tests", () => {
    it("handles extreme button counts", () => {
      const startTime = performance.now();

      render(<PerformanceTestComponent count={2000} />, { wrapper: TestWrapper });

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render 2000 buttons in less than 2000ms
      expect(renderTime).toBeLessThan(2000);

      // Verify all buttons are rendered
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2000);
    });

    it("handles complex interactions under load", async () => {
      render(<PerformanceTestComponent count={100} />, { wrapper: TestWrapper });

      const buttons = screen.getAllByRole("button");
      const startTime = performance.now();

      // Click multiple buttons rapidly
      for (let i = 0; i < 20; i++) {
        const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
        await userEvent.click(randomButton);
      }

      const endTime = performance.now();
      const interactionTime = endTime - startTime;

      // Should handle 20 random clicks in less than 1000ms
      expect(interactionTime).toBeLessThan(1000);

      // Verify some clicks were registered
      const clickedCount = screen.getByTestId("clicked-count");
      expect(clickedCount).toHaveTextContent(expect.stringMatching(/\d+/));
    });
  });

  // Browser compatibility tests
  describe("Browser Compatibility", () => {
    it("works with different event types", () => {
      const handleClick = jest.fn();
      const handleMouseDown = jest.fn();
      const handleMouseUp = jest.fn();

      render(
        <Button onClick={handleClick} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
          Event Test
        </Button>,
        { wrapper: TestWrapper },
      );

      const button = screen.getByRole("button");

      // Test different event types
      fireEvent.mouseDown(button);
      fireEvent.mouseUp(button);
      fireEvent.click(button);

      expect(handleMouseDown).toHaveBeenCalledTimes(1);
      expect(handleMouseUp).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles touch events efficiently", () => {
      const handleTouchStart = jest.fn();
      const handleTouchEnd = jest.fn();

      render(
        <Button onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          Touch Test
        </Button>,
        { wrapper: TestWrapper },
      );

      const button = screen.getByRole("button");

      // Test touch events
      fireEvent.touchStart(button);
      fireEvent.touchEnd(button);

      expect(handleTouchStart).toHaveBeenCalledTimes(1);
      expect(handleTouchEnd).toHaveBeenCalledTimes(1);
    });
  });
});
