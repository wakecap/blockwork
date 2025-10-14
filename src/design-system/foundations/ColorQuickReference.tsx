/**
 * Blockwork Color System - Quick Reference
 * 
 * This file provides TypeScript types and constants for the Blockwork color system.
 * Use this as a reference when implementing components.
 */

// Semantic Color Types
export type SemanticColorType = 'primary' | 'positive' | 'negative' | 'warning';
export type ColorState = 'default' | 'hover' | 'selected' | 'selected-hover';

// Content Color Names (for visual coding)
export type ContentColorName =
  // Greens
  | 'grass-green'
  | 'done-green'
  | 'bright-green'
  | 'saladish'
  // Yellows & Oranges
  | 'egg-yolk'
  | 'working-orange'
  | 'dark-orange'
  | 'peach'
  // Reds & Pinks
  | 'sunset'
  | 'stuck-red'
  | 'dark-red'
  | 'sofia-pink'
  | 'lipstick'
  | 'bubble'
  // Purples
  | 'purple'
  | 'dark-purple'
  | 'berry'
  | 'lavender'
  | 'lilac'
  | 'orchid'
  // Blues
  | 'dark-indigo'
  | 'indigo'
  | 'navy'
  | 'royal'
  | 'bright-blue'
  | 'dark-blue'
  | 'aquamarine'
  | 'chili-blue'
  | 'river'
  | 'winter'
  | 'sky'
  | 'teal'
  // Neutrals
  | 'explosive'
  | 'american-gray'
  | 'steel'
  | 'blackish'
  | 'brown'
  | 'coffee'
  | 'tan';

// Semantic Colors with States
export const SEMANTIC_COLORS = {
  primary: {
    default: 'bg-bw-primary',
    hover: 'bg-bw-primary-hover',
    selected: 'bg-bw-primary-selected',
    selectedHover: 'bg-bw-primary-selected-hover',
    highlighted: 'bg-bw-primary-highlighted',
    text: 'text-bw-on-primary',
  },
  positive: {
    default: 'bg-bw-positive',
    hover: 'bg-bw-positive-hover',
    selected: 'bg-bw-positive-selected',
    selectedHover: 'bg-bw-positive-selected-hover',
    text: 'text-bw-on-primary',
  },
  negative: {
    default: 'bg-bw-negative',
    hover: 'bg-bw-negative-hover',
    selected: 'bg-bw-negative-selected',
    selectedHover: 'bg-bw-negative-selected-hover',
    text: 'text-bw-on-primary',
  },
  warning: {
    default: 'bg-bw-warning',
    hover: 'bg-bw-warning-hover',
    selected: 'bg-bw-warning-selected',
    selectedHover: 'bg-bw-warning-selected-hover',
    text: 'text-bw-on-primary',
  },
} as const;

// Background Colors
export const BACKGROUND_COLORS = {
  primary: 'bg-bw-bg-primary',
  secondary: 'bg-bw-bg-secondary',
  primaryHover: 'bg-bw-bg-primary-hover',
  grey: 'bg-bw-bg-grey',
  allgrey: 'bg-bw-bg-allgrey',
  ui: 'bg-bw-bg-ui',
} as const;

// Text Colors
export const TEXT_COLORS = {
  primary: 'text-bw-text-primary',
  secondary: 'text-bw-text-secondary',
  onSecondary: 'text-bw-text-on-secondary',
  onInverted: 'text-bw-text-on-inverted',
  onPrimary: 'text-bw-on-primary',
  disabled: 'text-bw-text-disabled',
  placeholder: 'text-bw-text-placeholder',
  link: 'text-bw-text-link',
} as const;

// Border Colors
export const BORDER_COLORS = {
  ui: 'border-bw-border-ui',
  layout: 'border-bw-border-layout',
} as const;

// Content Colors (for visual coding)
export const CONTENT_COLORS: Record<ContentColorName, {
  default: string;
  hover: string;
  selected: string;
}> = {
  'grass-green': {
    default: 'bg-bw-grass-green',
    hover: 'bg-bw-grass-green-hover',
    selected: 'bg-bw-grass-green-selected',
  },
  'done-green': {
    default: 'bg-bw-done-green',
    hover: 'bg-bw-done-green-hover',
    selected: 'bg-bw-done-green-selected',
  },
  'bright-green': {
    default: 'bg-bw-bright-green',
    hover: 'bg-bw-bright-green-hover',
    selected: 'bg-bw-bright-green-selected',
  },
  'saladish': {
    default: 'bg-bw-saladish',
    hover: 'bg-bw-saladish-hover',
    selected: 'bg-bw-saladish-selected',
  },
  'egg-yolk': {
    default: 'bg-bw-egg-yolk',
    hover: 'bg-bw-egg-yolk-hover',
    selected: 'bg-bw-egg-yolk-selected',
  },
  'working-orange': {
    default: 'bg-bw-working-orange',
    hover: 'bg-bw-working-orange-hover',
    selected: 'bg-bw-working-orange-selected',
  },
  'dark-orange': {
    default: 'bg-bw-dark-orange',
    hover: 'bg-bw-dark-orange-hover',
    selected: 'bg-bw-dark-orange-selected',
  },
  'peach': {
    default: 'bg-bw-peach',
    hover: 'bg-bw-peach-hover',
    selected: 'bg-bw-peach-selected',
  },
  'sunset': {
    default: 'bg-bw-sunset',
    hover: 'bg-bw-sunset-hover',
    selected: 'bg-bw-sunset-selected',
  },
  'stuck-red': {
    default: 'bg-bw-stuck-red',
    hover: 'bg-bw-stuck-red-hover',
    selected: 'bg-bw-stuck-red-selected',
  },
  'dark-red': {
    default: 'bg-bw-dark-red',
    hover: 'bg-bw-dark-red-hover',
    selected: 'bg-bw-dark-red-selected',
  },
  'sofia-pink': {
    default: 'bg-bw-sofia-pink',
    hover: 'bg-bw-sofia-pink-hover',
    selected: 'bg-bw-sofia-pink-selected',
  },
  'lipstick': {
    default: 'bg-bw-lipstick',
    hover: 'bg-bw-lipstick-hover',
    selected: 'bg-bw-lipstick-selected',
  },
  'bubble': {
    default: 'bg-bw-bubble',
    hover: 'bg-bw-bubble-hover',
    selected: 'bg-bw-bubble-selected',
  },
  'purple': {
    default: 'bg-bw-purple',
    hover: 'bg-bw-purple-hover',
    selected: 'bg-bw-purple-selected',
  },
  'dark-purple': {
    default: 'bg-bw-dark-purple',
    hover: 'bg-bw-dark-purple-hover',
    selected: 'bg-bw-dark-purple-selected',
  },
  'berry': {
    default: 'bg-bw-berry',
    hover: 'bg-bw-berry-hover',
    selected: 'bg-bw-berry-selected',
  },
  'lavender': {
    default: 'bg-bw-lavender',
    hover: 'bg-bw-lavender-hover',
    selected: 'bg-bw-lavender-selected',
  },
  'lilac': {
    default: 'bg-bw-lilac',
    hover: 'bg-bw-lilac-hover',
    selected: 'bg-bw-lilac-selected',
  },
  'orchid': {
    default: 'bg-bw-orchid',
    hover: 'bg-bw-orchid-hover',
    selected: 'bg-bw-orchid-selected',
  },
  'dark-indigo': {
    default: 'bg-bw-dark-indigo',
    hover: 'bg-bw-dark-indigo-hover',
    selected: 'bg-bw-dark-indigo-selected',
  },
  'indigo': {
    default: 'bg-bw-indigo',
    hover: 'bg-bw-indigo-hover',
    selected: 'bg-bw-indigo-selected',
  },
  'navy': {
    default: 'bg-bw-navy',
    hover: 'bg-bw-navy-hover',
    selected: 'bg-bw-navy-selected',
  },
  'royal': {
    default: 'bg-bw-royal',
    hover: 'bg-bw-royal-hover',
    selected: 'bg-bw-royal-selected',
  },
  'bright-blue': {
    default: 'bg-bw-bright-blue',
    hover: 'bg-bw-bright-blue-hover',
    selected: 'bg-bw-bright-blue-selected',
  },
  'dark-blue': {
    default: 'bg-bw-dark-blue',
    hover: 'bg-bw-dark-blue-hover',
    selected: 'bg-bw-dark-blue-selected',
  },
  'aquamarine': {
    default: 'bg-bw-aquamarine',
    hover: 'bg-bw-aquamarine-hover',
    selected: 'bg-bw-aquamarine-selected',
  },
  'chili-blue': {
    default: 'bg-bw-chili-blue',
    hover: 'bg-bw-chili-blue-hover',
    selected: 'bg-bw-chili-blue-selected',
  },
  'river': {
    default: 'bg-bw-river',
    hover: 'bg-bw-river-hover',
    selected: 'bg-bw-river-selected',
  },
  'winter': {
    default: 'bg-bw-winter',
    hover: 'bg-bw-winter-hover',
    selected: 'bg-bw-winter-selected',
  },
  'sky': {
    default: 'bg-bw-sky',
    hover: 'bg-bw-sky-hover',
    selected: 'bg-bw-sky-selected',
  },
  'teal': {
    default: 'bg-bw-teal',
    hover: 'bg-bw-teal-hover',
    selected: 'bg-bw-teal-selected',
  },
  'explosive': {
    default: 'bg-bw-explosive',
    hover: 'bg-bw-explosive-hover',
    selected: 'bg-bw-explosive-selected',
  },
  'american-gray': {
    default: 'bg-bw-american-gray',
    hover: 'bg-bw-american-gray-hover',
    selected: 'bg-bw-american-gray-selected',
  },
  'steel': {
    default: 'bg-bw-steel',
    hover: 'bg-bw-steel-hover',
    selected: 'bg-bw-steel-selected',
  },
  'blackish': {
    default: 'bg-bw-blackish',
    hover: 'bg-bw-blackish-hover',
    selected: 'bg-bw-blackish-selected',
  },
  'brown': {
    default: 'bg-bw-brown',
    hover: 'bg-bw-brown-hover',
    selected: 'bg-bw-brown-selected',
  },
  'coffee': {
    default: 'bg-bw-coffee',
    hover: 'bg-bw-coffee-hover',
    selected: 'bg-bw-coffee-selected',
  },
  'tan': {
    default: 'bg-bw-tan',
    hover: 'bg-bw-tan-hover',
    selected: 'bg-bw-tan-selected',
  },
};

// Helper Functions
export function getSemanticColor(
  type: SemanticColorType,
  state: ColorState = 'default'
): string {
  const colorMap = SEMANTIC_COLORS[type];
  
  switch (state) {
    case 'hover':
      return colorMap.hover;
    case 'selected':
      return colorMap.selected;
    case 'selected-hover':
      return 'selectedHover' in colorMap ? colorMap.selectedHover : colorMap.selected;
    default:
      return colorMap.default;
  }
}

export function getContentColor(
  name: ContentColorName,
  state: 'default' | 'hover' | 'selected' = 'default'
): string {
  return CONTENT_COLORS[name][state];
}

// Usage Examples (commented out)
/*
// Example 1: Using semantic colors
import { SEMANTIC_COLORS, getSemanticColor } from './ColorQuickReference';

<button className={`${SEMANTIC_COLORS.primary.default} ${SEMANTIC_COLORS.primary.text}`}>
  Primary Button
</button>

// Example 2: Using content colors for status badges
import { CONTENT_COLORS } from './ColorQuickReference';

<span className={`${CONTENT_COLORS['done-green'].default} text-white px-3 py-1 rounded-full`}>
  Done
</span>

// Example 3: Using helper functions
import { getSemanticColor, getContentColor } from './ColorQuickReference';

<div className={getSemanticColor('primary', 'hover')}>
  Hover state
</div>

<div className={getContentColor('navy', 'selected')}>
  Selected state
</div>

// Example 4: Using text and background colors
import { TEXT_COLORS, BACKGROUND_COLORS } from './ColorQuickReference';

<div className={`${BACKGROUND_COLORS.primary} ${TEXT_COLORS.primary}`}>
  Content area
</div>
*/

