import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  GridShowcase,
  FlexboxShowcase,
  ContainerShowcase,
  LayoutPatterns,
} from "../foundations/GridSystem";

const meta: Meta = {
  title: "Foundation/Grid & Layout",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Grid and layout system built on CSS Grid and Flexbox with responsive utilities for creating flexible, consistent layouts.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

export const GridSystem: StoryObj = {
  render: () => <GridShowcase />,
  parameters: {
    docs: {
      description: {
        story:
          "CSS Grid-based layout system with 12 columns, responsive breakpoints, and column spanning utilities.",
      },
    },
  },
};

export const FlexboxSystem: StoryObj = {
  render: () => <FlexboxShowcase />,
  parameters: {
    docs: {
      description: {
        story:
          "Flexbox utilities for controlling direction, justification, alignment, and distribution of elements.",
      },
    },
  },
};

export const Containers: StoryObj = {
  render: () => <ContainerShowcase />,
  parameters: {
    docs: {
      description: {
        story:
          "Container and max-width utilities for constraining content width and creating consistent layouts.",
      },
    },
  },
};

export const CommonPatterns: StoryObj = {
  render: () => <LayoutPatterns />,
  parameters: {
    docs: {
      description: {
        story:
          "Common layout patterns including sidebar layouts, header-content-footer structures, and responsive card grids.",
      },
    },
  },
};
