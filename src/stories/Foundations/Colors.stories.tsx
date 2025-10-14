import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";

const meta: Meta = {
  title: "Foundation/Colors",
  parameters: {
    docs: {
      description: {
        component:
          "Blockwork is very visual and our color system helps users identify status, see actions, locate help, and to indicate next steps. The consistent use of color in our product keeps cognitive loads low, and makes for a unified and engaging user experience.",
      },
    },
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

// Helper component for semantic color items
interface SemanticColorItemProps {
  colorClass: string;
  name: string;
  description: string;
}

const SemanticColorItem: React.FC<SemanticColorItemProps> = ({
  colorClass,
  name,
  description,
}) => (
  <div className="flex items-start gap-4 mb-4">
    <div className={`w-12 h-12 rounded ${colorClass} flex-shrink-0`} />
    <div>
      <h4 className="font-semibold text-gray-900">{name}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

// Helper for content color rows
interface ContentColorRowProps {
  name: string;
  defaultClass: string;
  hoverClass: string;
  selectedClass: string;
}

const ContentColorRow: React.FC<ContentColorRowProps> = ({
  name,
  defaultClass,
  hoverClass,
  selectedClass,
}) => (
  <div className="grid grid-cols-4 gap-4 items-center py-2 hover:bg-gray-50">
    <span className="text-sm font-medium text-gray-700">{name}</span>
    <div className={`h-16 rounded ${defaultClass}`} />
    <div className={`h-16 rounded ${hoverClass}`} />
    <div className={`h-16 rounded ${selectedClass}`} />
  </div>
);

export const ColorSystem: Story = {
  render: () => (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Colors</h1>
          <p className="text-base text-gray-700 max-w-4xl">
            Blockwork is very visual and our color system helps users identify
            status, see actions, locate help, and to indicate next steps. The
            consistent use of color in our product keeps cognitive loads low,
            and makes for a unified and engaging user experience. The colors are
            designed to be clear and accessible. They come in three color
            themes.
          </p>
        </div>

        {/* Semantic Colors */}
        <div className="mb-12 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Semantic colors</h2>

          {/* Primary Colors */}
          <SemanticColorItem
            colorClass="bg-bw-primary"
            name="primary-color"
            description="Use to emphasise main ui components"
          />
          <SemanticColorItem
            colorClass="bg-bw-primary-hover"
            name="primary-hover-color"
            description="Use only as a hover on primary color"
          />
          <SemanticColorItem
            colorClass="bg-bw-primary-selected"
            name="primary-selected-color"
            description="Use to indicate selected state of primary items"
          />
          <SemanticColorItem
            colorClass="bg-bw-primary-selected-hover"
            name="primary-selected-hover-color"
            description="Use to indicate hover state on a primary-selected-color items"
          />
          <SemanticColorItem
            colorClass="bg-bw-primary-highlighted"
            name="primary-highlighted-color"
            description="Use this to indicate highlighted components of primary items"
          />
          <SemanticColorItem
            colorClass="bg-bw-primary-surface border border-gray-300"
            name="primary-surface-color"
            description="Use this as the surface of the main layout appearance"
          />

          {/* Positive Colors */}
          <SemanticColorItem
            colorClass="bg-bw-positive"
            name="positive-color"
            description="Use to indicate a positive action/state (success, completion, approval..)"
          />
          <SemanticColorItem
            colorClass="bg-bw-positive-hover"
            name="positive-color-hover"
            description="Use only as hover color on positive color"
          />
          <SemanticColorItem
            colorClass="bg-bw-positive-selected"
            name="positive-color-selected"
            description="Use only as selected indication for a positive colors"
          />
          <SemanticColorItem
            colorClass="bg-bw-positive-selected-hover"
            name="positive-color-selected-hover"
            description="Use to indicate hover state on a positive-color-selected items"
          />

          {/* Negative Colors */}
          <SemanticColorItem
            colorClass="bg-bw-negative"
            name="negative-color"
            description="Use to indicate a negative action/state (delete, error..)"
          />
          <SemanticColorItem
            colorClass="bg-bw-negative-hover"
            name="negative-color-hover"
            description="Use only as hover color on negative color"
          />
          <SemanticColorItem
            colorClass="bg-bw-negative-selected"
            name="negative-color-selected"
            description="Use as selected indication for negative colors"
          />
          <SemanticColorItem
            colorClass="bg-bw-negative-selected-hover"
            name="negative-color-selected-hover"
            description="Use to indicate hover state on a negative-selected items"
          />

          {/* Warning Colors */}
          <SemanticColorItem
            colorClass="bg-bw-warning"
            name="warning-color"
            description="Use to indicate a warning action/state (severity, alert, caution..)"
          />
          <SemanticColorItem
            colorClass="bg-bw-warning-hover"
            name="warning-color-hover"
            description="Use only as hover color on warning color"
          />
          <SemanticColorItem
            colorClass="bg-bw-warning-selected"
            name="warning-color-selected"
            description="Use only as selected indication for warning colors"
          />
          <SemanticColorItem
            colorClass="bg-bw-warning-selected-hover"
            name="warning-color-selected-hover"
            description="Use to indicate hover state on a warning-selected items"
          />

          {/* Other Semantic */}
          <SemanticColorItem
            colorClass="bg-bw-inverted-background"
            name="inverted-color-background"
            description="Inverted background color (opposite of primary background color)"
          />
          <SemanticColorItem
            colorClass="bg-bw-icon"
            name="icon-color"
            description="Default color for icons"
          />
          <SemanticColorItem
            colorClass="bg-bw-fixed-light border border-gray-300"
            name="fixed-light-color"
            description="Use as color that should remain light in all themes"
          />
          <SemanticColorItem
            colorClass="bg-bw-fixed-dark"
            name="fixed-dark-color"
            description="Use as color that should remain dark in all themes"
          />
        </div>

        {/* Background Colors */}
        <div className="mb-12 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Background colors</h2>

          <SemanticColorItem
            colorClass="bg-bw-bg-primary border border-gray-300"
            name="primary-background-color"
            description="Primary background color"
          />
          <SemanticColorItem
            colorClass="bg-bw-bg-secondary"
            name="secondary-background-color"
            description="Secondary background color"
          />
          <SemanticColorItem
            colorClass="bg-bw-bg-primary-hover"
            name="primary-background-hover-color"
            description="Use as hover color"
          />
          <SemanticColorItem
            colorClass="bg-bw-inverted-background"
            name="inverted-color-background"
            description="Inverted background color (opposite of primary background color)"
          />
          <SemanticColorItem
            colorClass="bg-bw-bg-grey"
            name="grey-background-color"
            description="Grey background color"
          />
          <SemanticColorItem
            colorClass="bg-bw-bg-allgrey"
            name="allgrey-background-color"
            description="Grey background color, stays grey in dark and black themes"
          />
          <SemanticColorItem
            colorClass="bg-bw-bg-ui"
            name="ui-background-color"
            description="Background color for UI elements and components"
          />
        </div>

        {/* Text Colors */}
        <div className="mb-12 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Text colors</h2>

          <SemanticColorItem
            colorClass="bg-bw-text-primary"
            name="primary-text-color"
            description="Use for default text color"
          />
          <SemanticColorItem
            colorClass="bg-bw-text-secondary"
            name="secondary-text-color"
            description="Use when you need text with lesser importance"
          />
          <SemanticColorItem
            colorClass="bg-bw-text-on-secondary"
            name="secondary-text-on-secondary-color"
            description="Use when you need text with lesser importance (on secondary background color)"
          />
          <SemanticColorItem
            colorClass="bg-bw-text-on-inverted border border-gray-300"
            name="text-color-on-inverted"
            description="Inverted text color (opposite of primary text color)"
          />
          <SemanticColorItem
            colorClass="bg-bw-text-on-primary border border-gray-300"
            name="text-color-on-primary"
            description="Use for text on primary color"
          />
          <SemanticColorItem
            colorClass="bg-bw-text-disabled"
            name="disabled-text-color"
            description="Use as text in disabled components"
          />
          <SemanticColorItem
            colorClass="bg-bw-text-placeholder"
            name="placeholder-color"
            description="Use for placeholder text in inputs fields"
          />
          <SemanticColorItem
            colorClass="bg-bw-text-link"
            name="link-color"
            description="Use only for links"
          />
        </div>

        {/* Border Colors */}
        <div className="mb-12 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Border colors</h2>

          <SemanticColorItem
            colorClass="bg-bw-border-ui"
            name="ui-border-color"
            description="Border color for ui elements and components (Button, Input..)"
          />
          <SemanticColorItem
            colorClass="bg-bw-border-layout"
            name="layout-border-color"
            description="Border color for general layout and separators (Leftpane, Menu Divider..)"
          />
        </div>

        {/* Content Colors */}
        <div className="mb-12 border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Content colors</h2>
          <p className="text-sm text-gray-700 mb-6">
            These colors are used only for color coding purposes like groups
            colors, statuses timeline bars etc.. this gives understanding and
            indication of orientation and belonging. The board's main strength
            is its simple and visual appearance. That's why the status colors
            should appear on the board and nowhere else in the UI.
          </p>

          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 mb-4 pb-3 border-b border-gray-300">
            <div></div>
            <div className="text-center font-semibold text-gray-700">
              Default
            </div>
            <div className="text-center font-semibold text-gray-700">Hover</div>
            <div className="text-center font-semibold text-gray-700">
              Selected
            </div>
          </div>

          {/* Content Color Rows */}
          <div className="space-y-1">
            <ContentColorRow name="--color-grass_green" defaultClass="bg-bw-grass-green" hoverClass="bg-bw-grass-green-hover" selectedClass="bg-bw-grass-green-selected" />
            <ContentColorRow name="--color-done-green" defaultClass="bg-bw-done-green" hoverClass="bg-bw-done-green-hover" selectedClass="bg-bw-done-green-selected" />
            <ContentColorRow name="--color-bright-green" defaultClass="bg-bw-bright-green" hoverClass="bg-bw-bright-green-hover" selectedClass="bg-bw-bright-green-selected" />
            <ContentColorRow name="--color-saladish" defaultClass="bg-bw-saladish" hoverClass="bg-bw-saladish-hover" selectedClass="bg-bw-saladish-selected" />
            <ContentColorRow name="--color-egg_yolk" defaultClass="bg-bw-egg-yolk" hoverClass="bg-bw-egg-yolk-hover" selectedClass="bg-bw-egg-yolk-selected" />
            <ContentColorRow name="--color-working_orange" defaultClass="bg-bw-working-orange" hoverClass="bg-bw-working-orange-hover" selectedClass="bg-bw-working-orange-selected" />
            <ContentColorRow name="--color-dark-orange" defaultClass="bg-bw-dark-orange" hoverClass="bg-bw-dark-orange-hover" selectedClass="bg-bw-dark-orange-selected" />
            <ContentColorRow name="--color-peach" defaultClass="bg-bw-peach" hoverClass="bg-bw-peach-hover" selectedClass="bg-bw-peach-selected" />
            <ContentColorRow name="--color-sunset" defaultClass="bg-bw-sunset" hoverClass="bg-bw-sunset-hover" selectedClass="bg-bw-sunset-selected" />
            <ContentColorRow name="--color-stuck-red" defaultClass="bg-bw-stuck-red" hoverClass="bg-bw-stuck-red-hover" selectedClass="bg-bw-stuck-red-selected" />
            <ContentColorRow name="--color-dark-red" defaultClass="bg-bw-dark-red" hoverClass="bg-bw-dark-red-hover" selectedClass="bg-bw-dark-red-selected" />
            <ContentColorRow name="--color-sofia_pink" defaultClass="bg-bw-sofia-pink" hoverClass="bg-bw-sofia-pink-hover" selectedClass="bg-bw-sofia-pink-selected" />
            <ContentColorRow name="--color-lipstick" defaultClass="bg-bw-lipstick" hoverClass="bg-bw-lipstick-hover" selectedClass="bg-bw-lipstick-selected" />
            <ContentColorRow name="--color-bubble" defaultClass="bg-bw-bubble" hoverClass="bg-bw-bubble-hover" selectedClass="bg-bw-bubble-selected" />
            <ContentColorRow name="--color-purple" defaultClass="bg-bw-purple" hoverClass="bg-bw-purple-hover" selectedClass="bg-bw-purple-selected" />
            <ContentColorRow name="--color-dark_purple" defaultClass="bg-bw-dark-purple" hoverClass="bg-bw-dark-purple-hover" selectedClass="bg-bw-dark-purple-selected" />
            <ContentColorRow name="--color-berry" defaultClass="bg-bw-berry" hoverClass="bg-bw-berry-hover" selectedClass="bg-bw-berry-selected" />
            <ContentColorRow name="--color-dark_indigo" defaultClass="bg-bw-dark-indigo" hoverClass="bg-bw-dark-indigo-hover" selectedClass="bg-bw-dark-indigo-selected" />
            <ContentColorRow name="--color-indigo" defaultClass="bg-bw-indigo" hoverClass="bg-bw-indigo-hover" selectedClass="bg-bw-indigo-selected" />
            <ContentColorRow name="--color-navy" defaultClass="bg-bw-navy" hoverClass="bg-bw-navy-hover" selectedClass="bg-bw-navy-selected" />
            <ContentColorRow name="--color-bright-blue" defaultClass="bg-bw-bright-blue" hoverClass="bg-bw-bright-blue-hover" selectedClass="bg-bw-bright-blue-selected" />
            <ContentColorRow name="--color-dark-blue" defaultClass="bg-bw-dark-blue" hoverClass="bg-bw-dark-blue-hover" selectedClass="bg-bw-dark-blue-selected" />
            <ContentColorRow name="--color-aquamarine" defaultClass="bg-bw-aquamarine" hoverClass="bg-bw-aquamarine-hover" selectedClass="bg-bw-aquamarine-selected" />
            <ContentColorRow name="--color-chili-blue" defaultClass="bg-bw-chili-blue" hoverClass="bg-bw-chili-blue-hover" selectedClass="bg-bw-chili-blue-selected" />
            <ContentColorRow name="--color-river" defaultClass="bg-bw-river" hoverClass="bg-bw-river-hover" selectedClass="bg-bw-river-selected" />
            <ContentColorRow name="--color-winter" defaultClass="bg-bw-winter" hoverClass="bg-bw-winter-hover" selectedClass="bg-bw-winter-selected" />
            <ContentColorRow name="--color-explosive" defaultClass="bg-bw-explosive" hoverClass="bg-bw-explosive-hover" selectedClass="bg-bw-explosive-selected" />
            <ContentColorRow name="--color-american_gray" defaultClass="bg-bw-american-gray" hoverClass="bg-bw-american-gray-hover" selectedClass="bg-bw-american-gray-selected" />
            <ContentColorRow name="--color-blackish" defaultClass="bg-bw-blackish" hoverClass="bg-bw-blackish-hover" selectedClass="bg-bw-blackish-selected" />
            <ContentColorRow name="--color-brown" defaultClass="bg-bw-brown" hoverClass="bg-bw-brown-hover" selectedClass="bg-bw-brown-selected" />
            <ContentColorRow name="--color-orchid" defaultClass="bg-bw-orchid" hoverClass="bg-bw-orchid-hover" selectedClass="bg-bw-orchid-selected" />
            <ContentColorRow name="--color-tan" defaultClass="bg-bw-tan" hoverClass="bg-bw-tan-hover" selectedClass="bg-bw-tan-selected" />
            <ContentColorRow name="--color-sky" defaultClass="bg-bw-sky" hoverClass="bg-bw-sky-hover" selectedClass="bg-bw-sky-selected" />
            <ContentColorRow name="--color-coffee" defaultClass="bg-bw-coffee" hoverClass="bg-bw-coffee-hover" selectedClass="bg-bw-coffee-selected" />
            <ContentColorRow name="--color-royal" defaultClass="bg-bw-royal" hoverClass="bg-bw-royal-hover" selectedClass="bg-bw-royal-selected" />
            <ContentColorRow name="--color-teal" defaultClass="bg-bw-teal" hoverClass="bg-bw-teal-hover" selectedClass="bg-bw-teal-selected" />
            <ContentColorRow name="--color-lavender" defaultClass="bg-bw-lavender" hoverClass="bg-bw-lavender-hover" selectedClass="bg-bw-lavender-selected" />
            <ContentColorRow name="--color-steel" defaultClass="bg-bw-steel" hoverClass="bg-bw-steel-hover" selectedClass="bg-bw-steel-selected" />
            <ContentColorRow name="--color-lilac" defaultClass="bg-bw-lilac" hoverClass="bg-bw-lilac-hover" selectedClass="bg-bw-lilac-selected" />
          </div>
        </div>
      </div>
    </div>
  ),
};

