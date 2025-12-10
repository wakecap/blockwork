import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Component metadata type
export type ComponentMetadata = {
  name: string;
  description: string;
  category: string;
  path: string;
  props?: Record<string, string>;
  features?: string[];
  dependencies?: string[];
};

// Component metadata extracted from the design system
// NOTE: Only production-ready components are exposed here
// When a component is production-ready, add it to this object with full documentation
export const COMPONENTS: Record<string, ComponentMetadata> = {
  TopNavigator: {
    name: "TopNavigator",
    description:
      "Top navigation bar with project selector, menu dropdown, pinned items, and avatar menu. Production-ready component for construction project applications.",
    category: "Navigation",
    path: "src/design-system/components/TopNavigator/TopNavigator.tsx",
    props: {
      menu: "MenuItem[] - Array of menu items to display in the mega dropdown",
      avatarMenu: "MenuItem[] - Array of items for the avatar dropdown menu",
      projectsData: "ProjectsData (optional) - Project data organized by organizations",
      maxVisibleItems: "number (optional) - Maximum number of pinned items visible (default: 4)",
      settingsMenu: "MenuItem[] (optional) - Settings menu items",
      selectedProject: "string (optional) - ID of the currently selected project",
      selectedMenuItem: "string (optional) - ID of the currently selected menu item",
      initialPinnedItems: "string[] (optional) - Array of menu item IDs to pin initially",
      onProjectSelect: "(project: {id: string, name: string}) => void (optional)",
      onAvatarMenuItemClick: "(item: MenuItem) => void (optional)",
      onMenuItemClick: "(item: MenuItem) => void (optional)",
      onSettingsMenuItemClick: "(item: MenuItem) => void (optional)",
      onPinnedItemsChange: "(pinnedIds: string[]) => void (optional)",
      onPinnedItemClick: "(item: {id: string, icon: string, label: string}) => void (optional)",
    },
    features: [
      "Project selection with search and organization grouping",
      "Pinnable menu items with drag-and-drop support",
      "Avatar menu with user info display",
      "Settings menu integration",
      "Responsive design with mobile optimization",
      "Overflow handling for pinned items",
      "Blur backdrop when mega menu is open",
      "Click-away detection for all dropdowns",
      "Keyboard navigation support",
      "Arabic/RTL support ready",
    ],
    dependencies: ["MegaDropdown", "Button", "Avatar", "SearchInput", "EmptyState"],
  },

  Button: {
    name: "Button",
    description:
      "Versatile button component with 14 style variants, 11 sizes, icon support, loading states, and full RTL/Arabic support. Production-ready for forms and UI interactions.",
    category: "Forms",
    path: "src/design-system/components/Button/Button.tsx",
    props: {
      variant:
        "'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'text' | 'success' | 'warning' | 'destructive' | 'info' | 'pin' | 'nav' | 'fab' | 'iconBtn' - Button style variant (default: 'primary')",
      size: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon' | 'iconXs' | 'iconSm' | 'iconMd' | 'iconLg' | 'iconXl' - Button size (default: 'md')",
      icon: "string (optional) - Font Awesome icon class (e.g., 'fa-solid fa-check')",
      iconPosition:
        "'left' | 'right' (optional) - Icon position relative to text (default: 'left', auto-flips in RTL)",
      loading:
        "boolean (optional) - Show loading spinner and disable interactions (default: false)",
      loadingText: "string (optional) - Custom text to display during loading state",
      arabicText: "string (optional) - Arabic translation for RTL support",
      showArabicText:
        "boolean (optional) - Display Arabic text and enable RTL layout with IBM Plex Sans Arabic font",
      isPinned: "boolean (optional) - Pinned state for pin variant (default: false)",
      isActive: "boolean (optional) - Active state with ring indicator (default: false)",
      ripple: "boolean (optional) - Enable ripple effect on interaction (default: true)",
      fullWidth: "boolean (optional) - Make button full width (default: false)",
      fullWidthOnMobile: "boolean (optional) - Full width on mobile devices only (default: false)",
      ariaLabel: "string (optional) - Accessibility label for screen readers",
      ariaDescribedBy: "string (optional) - ID of element describing the button",
      children: "React.ReactNode - Button text or content",
      disabled: "boolean (optional) - Disable button and prevent interactions",
      onClick: "(event: React.MouseEvent<HTMLButtonElement>) => void (optional) - Click handler",
    },
    features: [
      "14 style variants: primary (black), secondary, accent (orange), outline, ghost, text, success, warning, destructive, info, pin, nav, fab, iconBtn",
      "11 size options: 5 standard sizes (xs-xl) with responsive scaling, 6 icon-only sizes",
      "Icon support with Font Awesome icons positioned left or right",
      "Loading state with spinner animation and custom loading text",
      "Full RTL/Arabic support with automatic layout direction and font switching",
      "Pin state for favorites/bookmarks functionality",
      "Ripple effect for enhanced visual feedback",
      "Touch-friendly with 44px minimum touch targets on mobile",
      "Responsive sizing that adapts between mobile and desktop",
      "Full keyboard navigation and accessibility (ARIA labels, focus management)",
      "Active state styling with ring indicators",
      "Disabled state with visual feedback",
      "Extends all HTML button attributes (type, form, name, value, etc.)",
    ],
    dependencies: [],
  },

  // UI Components

  Avatar: {
    name: "Avatar",
    description:
      "User avatar component with multiple sizes, status indicators, fallback support, and click interactions. Production-ready for user profiles and navigation.",
    category: "UI Components",
    path: "src/design-system/components/Avatar/Avatar.tsx",
    props: {
      src: "string (optional) - Image source URL",
      alt: "string (optional) - Alt text for image accessibility",
      name: "string (optional) - User name (used for generating initials)",
      initials: "string (optional) - Custom initials to display",
      size: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'iconXs' | 'iconSm' | 'iconMd' | 'iconLg' | 'iconXl' (optional) - Avatar size (default: 'md')",
      status: "'online' | 'offline' | 'away' | 'busy' (optional) - Status indicator",
      statusPosition:
        "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' (optional) - Position of status indicator (default: 'bottom-right')",
      fallbackIcon: "React.ReactNode (optional) - Custom fallback icon when image fails",
      className: "string (optional) - Additional CSS classes",
      onClick: "() => void (optional) - Click handler",
      showChevron: "boolean (optional) - Show dropdown chevron indicator (default: false)",
    },
    features: [
      "10 size variants (xs, sm, md, lg, xl + iconXs, iconSm, iconMd, iconLg, iconXl)",
      "Automatic initials generation from name prop",
      "Status indicators with 4 states (online, offline, away, busy)",
      "Configurable status position (4 corners)",
      "Image error handling with fallback to initials or icon",
      "Click interactions with optional chevron indicator",
      "Circular design with proper aspect ratios",
      "Accessible with proper ARIA attributes",
    ],
    dependencies: [],
  },

  Badge: {
    name: "Badge",
    description:
      "Versatile badge component with 7 variants and 3 sizes for labels, status, and categorization. Production-ready for UI annotations.",
    category: "UI Components",
    path: "src/design-system/components/Badge/Badge.tsx",
    props: {
      variant:
        "'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info' (optional) - Badge style variant (default: 'default')",
      size: "'sm' | 'md' | 'lg' (optional) - Badge size (default: 'sm')",
      children: "React.ReactNode - Badge content (text, icons, etc.)",
      className: "string (optional) - Additional CSS classes",
    },
    features: [
      "7 style variants: default, secondary, destructive, outline, success, warning, info",
      "3 size options: sm, md, lg",
      "Rounded corners with unique bottom-left flat design",
      "Hover state transitions",
      "Focus ring for accessibility",
      "Supports text and icon content",
      "Class variance authority (CVA) for variant management",
      "Extends all HTML div attributes",
    ],
    dependencies: [],
  },

  EmptyState: {
    name: "EmptyState",
    description:
      "Empty state component for displaying helpful messages when no content is available. Production-ready with customizable icons, actions, and variants.",
    category: "UI Components",
    path: "src/design-system/components/EmptyState/EmptyState.tsx",
    props: {
      title: "string - Main heading text",
      description: "string (optional) - Descriptive text explaining the empty state",
      icon: "string (optional) - Font Awesome icon class (custom icon)",
      variant:
        "'default' | 'search' | 'files' | 'users' | 'error' (optional) - Preset variant with default icon (default: 'default')",
      action: "React.ReactNode (optional) - Action button or custom element",
      size: "'sm' | 'md' | 'lg' (optional) - Component size (default: 'md')",
      className: "string (optional) - Additional CSS classes",
    },
    features: [
      "5 preset variants with default icons (default, search, files, users, error)",
      "Custom icon support via Font Awesome classes",
      "3 size options with responsive scaling",
      "Optional action button/element slot",
      "Centered layout with icon, title, description, and action",
      "Customizable spacing and typography",
      "Accessible with proper semantic HTML",
    ],
    dependencies: [],
  },

  PageLoading: {
    name: "PageLoading",
    description:
      "Full-screen loading component with WakeCap logo animation and customizable message. Production-ready for app initialization and route transitions.",
    category: "UI Components",
    path: "src/design-system/components/PageLoading/PageLoading.tsx",
    props: {
      visible: "boolean (optional) - Controls visibility of loading component (default: true)",
      message: "string (optional) - Custom loading message (default: 'Loading...')",
      animationDuration:
        "number (optional) - Duration of fade animation in milliseconds (default: 2000)",
      skeleton:
        "boolean (optional) - Use skeleton loading instead of fade animation (default: false)",
      logoVariant: "'symbol' | 'text' (optional) - Logo display variant (default: 'symbol')",
    },
    features: [
      "Full-screen overlay with high z-index (9999)",
      "WakeCap logo with fade animation",
      "Two logo variants: geometric symbol or full text logo",
      "Customizable animation duration",
      "Optional skeleton loading mode",
      "Customizable loading message",
      "White background for clean appearance",
      "Centered layout with proper spacing",
    ],
    dependencies: [],
  },

  // Input Fields

  Input: {
    name: "Input",
    description:
      "Standard text input field with label, icons, error/success states, and full Arabic/RTL support. Production-ready for all form input needs.",
    category: "Input Fields",
    path: "src/design-system/components/Input/Input.tsx",
    props: {
      label: "string (optional) - Label text displayed above input",
      error: "string (optional) - Error message with red border and text",
      success: "string (optional) - Success message with green border and text",
      iconLeft: "string (optional) - Left icon class name (FontAwesome)",
      iconRight: "string (optional) - Right icon class name (FontAwesome)",
      arabicLabel: "string (optional) - Arabic translation of label",
      arabicPlaceholder: "string (optional) - Arabic translation of placeholder",
      arabicError: "string (optional) - Arabic translation of error",
      arabicSuccess: "string (optional) - Arabic translation of success",
      showArabicText: "boolean (optional) - Toggle to show Arabic text (default: false)",
    },
    features: [
      "Error/success state styling with color indicators",
      "Full Arabic/RTL support with separate Arabic props",
      "Icon positioning (left/right)",
      "Inherits all standard HTMLInputElement attributes",
      "Label support with proper accessibility",
    ],
    dependencies: [],
  },

  PasswordInput: {
    name: "PasswordInput",
    description:
      "Password input field with toggle visibility button, optional strength indicator, and error/success states. Production-ready for authentication forms.",
    category: "Input Fields",
    path: "src/design-system/components/PasswordInput/PasswordInput.tsx",
    props: {
      label: "string (optional) - Label text",
      error: "string (optional) - Error message",
      success: "string (optional) - Success message",
      iconLeft: "string (optional) - Left icon class name",
      showToggle: "boolean (optional) - Show/hide password toggle (default: true)",
      strengthIndicator: "boolean (optional) - Display password strength meter (default: false)",
    },
    features: [
      "Password visibility toggle with eye icon",
      "Optional 6-level password strength indicator (Very Weak to Very Strong)",
      "Color-coded strength bar (red to green)",
      "Strength calculation checks: length, lowercase, uppercase, numbers, special chars",
      "Internal state management for visibility",
      "Inherits standard input attributes",
    ],
    dependencies: [],
  },

  SearchInput: {
    name: "SearchInput",
    description:
      "Search-specific input field with magnifying glass icon, clear button, and Enter key search callback. Production-ready for search functionality.",
    category: "Input Fields",
    path: "src/design-system/components/SearchInput/SearchInput.tsx",
    props: {
      label: "string (optional) - Label text",
      error: "string (optional) - Error message",
      success: "string (optional) - Success message",
      placeholder: "string (optional) - Placeholder text (default: 'Search...')",
      onClear: "() => void (optional) - Callback when clear button clicked",
      showClearButton: "boolean (optional) - Show/hide clear button (default: true)",
      onSearch: "(value: string) => void (optional) - Callback on Enter key press",
    },
    features: [
      "Search icon (magnifying glass) on left side",
      "Clear button (X icon) appears when input has value",
      "Enter key triggers onSearch callback",
      "Dedicated onClear callback for clear action",
      "Custom placeholder styling",
      "Standard onChange also supported",
    ],
    dependencies: [],
  },

  TextArea: {
    name: "TextArea",
    description:
      "Multi-line textarea input with character counter, icons, and error/success states. Production-ready for long-form text input.",
    category: "Input Fields",
    path: "src/design-system/components/TextArea/TextArea.tsx",
    props: {
      label: "string (optional) - Label text",
      error: "string (optional) - Error message",
      success: "string (optional) - Success message",
      iconLeft: "string (optional) - Left icon class name",
      iconRight: "string (optional) - Right icon class name (non-interactive)",
      rows: "number (optional) - Number of rows (default: 4)",
      maxLength: "number (optional) - Max character limit",
      showCharacterCount: "boolean (optional) - Display character counter (default: false)",
    },
    features: [
      "Character counter display with threshold warnings (90% = orange)",
      "Counter shows current/maxLength format",
      "No resize capability (resize-none)",
      "Error/success state styling",
      "Icon support (left and right)",
      "Inherits all standard HTMLTextAreaElement attributes",
    ],
    dependencies: [],
  },

  OTPInput: {
    name: "OTPInput",
    description:
      "One-time password input with individual digit fields, paste support, keyboard navigation, and password mode. Includes pre-built variants: PINInput, VerificationCode, PasswordOTP.",
    category: "Input Fields",
    path: "src/design-system/components/OTPInput/OTPInput.tsx",
    props: {
      value: "string (required) - Current OTP value",
      onChange: "(value: string) => void (required) - Callback when value changes",
      length: "number (optional) - Number of input fields (default: 6)",
      type: "'text' | 'number' | 'password' (optional) - Input type (default: 'text')",
      size: "'sm' | 'md' | 'lg' (optional) - Input size (default: 'md')",
      variant: "'default' | 'outlined' | 'filled' (optional) - Style variant (default: 'default')",
      autoFocus: "boolean (optional) - Auto-focus first input (default: false)",
      disabled: "boolean (optional) - Disable all inputs (default: false)",
      placeholder: "string (optional) - Placeholder per input (default: '0')",
      showToggle: "boolean (optional) - Show password visibility toggle (default: false)",
      onComplete: "(value: string) => void (optional) - Callback when all fields filled",
    },
    features: [
      "Individual input fields for each OTP digit",
      "Smart multi-character paste handling",
      "Keyboard navigation (arrow keys, backspace)",
      "Auto-focus to next field on single char input",
      "Password mode with optional visibility toggle",
      "Three size variants: sm (10x10), md (12x12), lg (14x14)",
      "Three style variants: default, outlined, filled",
      "Auto-complete detection and callback",
      "Pre-built components: PINInput (4-digit), VerificationCode (6-char), PasswordOTP (6-char with toggle)",
      "useOTP custom hook for state management",
    ],
    dependencies: [],
  },

  // Selection Controls

  Dropdown: {
    name: "Dropdown",
    description:
      "Native HTML select dropdown wrapper with Tailwind styling, label support, and icon positioning. Production-ready for selection inputs.",
    category: "Selection",
    path: "src/design-system/components/Dropdown/Dropdown.tsx",
    props: {
      label: "string (optional) - Field label displayed above dropdown",
      options: "DropdownOption[] (required) - Array of {label, value} objects",
      value: "string (required) - Currently selected value",
      onChange:
        "(e: React.ChangeEvent<HTMLSelectElement>) => void (required) - Change event handler",
      iconLeft: "string (optional) - Icon class string for left side",
      iconRight: "string (optional) - Icon class string for right side",
      disabled: "boolean (optional) - Disabled state",
    },
    features: [
      "Native HTML select element with enhanced styling",
      "Label support with clean typography",
      "Left and right icon positioning with proper spacing",
      "Disabled state with opacity reduction",
      "Focus ring styling with primary color",
      "Extends all standard HTML select attributes",
    ],
    dependencies: [],
  },

  Autocomplete: {
    name: "Autocomplete",
    description:
      "Text input with real-time filtering suggestions dropdown, keyboard navigation, and disabled option support. Production-ready for searchable selections.",
    category: "Selection",
    path: "src/design-system/components/Autocomplete/Autocomplete.tsx",
    props: {
      label: "string (optional) - Field label",
      options: "AutocompleteOption[] (required) - Array of {label, value, disabled?} objects",
      value: "string (optional) - Current input value",
      onChange: "(value: string) => void (required) - Called with string value during typing",
      onSelect: "(option: AutocompleteOption) => void (optional) - Called when option selected",
      placeholder: "string (optional) - Input placeholder (default: 'Type to search...')",
      disabled: "boolean (optional) - Disable state (default: false)",
      error: "string (optional) - Error message displayed below",
      loading: "boolean (optional) - Loading state indicator (default: false)",
      minChars: "number (optional) - Min characters before filtering (default: 1)",
      maxSuggestions: "number (optional) - Max suggestions to display (default: 10)",
    },
    features: [
      "Real-time filtering of options as user types",
      "Dropdown suggestions with keyboard navigation (arrow keys, Enter, Escape)",
      "Click-outside detection to close dropdown",
      "Highlighted suggestion on hover/keyboard navigation",
      "Disabled option support in suggestions",
      "Search and chevron icons",
      "Loading state with 'Loading...' message",
      "Min character threshold and max suggestions limit",
      "Error message display",
      "'No options found' messaging",
    ],
    dependencies: [],
  },

  MultiSelect: {
    name: "MultiSelect",
    description:
      "Multi-select dropdown with checkbox indicators, removable tags/chips, optional search, and max selections limit. Production-ready for multi-selection needs.",
    category: "Selection",
    path: "src/design-system/components/MultiSelect/MultiSelect.tsx",
    props: {
      label: "string (optional) - Field label",
      options: "MultiSelectOption[] (required) - Array of {label, value, disabled?} objects",
      selectedValues: "string[] (required) - Array of currently selected values",
      onChange: "(values: string[]) => void (required) - Called with new array of selected values",
      placeholder: "string (optional) - Shown when nothing selected (default: 'Select options...')",
      disabled: "boolean (optional) - Disable state (default: false)",
      error: "string (optional) - Error message displayed below",
      maxSelections: "number (optional) - Maximum number of selections allowed",
      searchable: "boolean (optional) - Enable search input in dropdown (default: false)",
    },
    features: [
      "Multi-select dropdown with checkbox indicators",
      "Selected items displayed as removable tags/chips",
      "Click-outside detection to close dropdown",
      "Optional search/filter functionality",
      "Max selections limit enforcement",
      "Disabled options support",
      "Selection counter display (X/maxSelections)",
      "Individual item removal via chip X button",
      "Color-coded selected items (primary-100 background)",
    ],
    dependencies: [],
  },

  Checkbox: {
    name: "Checkbox",
    description:
      "Simple checkbox wrapper with label and optional icon support. Production-ready for boolean selections.",
    category: "Selection",
    path: "src/design-system/components/Checkbox/Checkbox.tsx",
    props: {
      label: "string (required) - Label text displayed next to checkbox",
      icon: "string (optional) - Icon class string (FontAwesome style)",
    },
    features: [
      "Wrapper label component for standard HTML checkbox",
      "Inline layout with icon and label text",
      "Disabled state support (opacity, cursor not-allowed)",
      "Primary color for checked state",
      "Neutral border color",
      "Primary focus ring",
      "Icon support with sizing (w-4 h-4)",
      "Extends all standard HTML input attributes",
    ],
    dependencies: [],
  },

  Radio: {
    name: "Radio",
    description:
      "Simple radio button wrapper with label and optional icon support. Production-ready for mutually exclusive selections.",
    category: "Selection",
    path: "src/design-system/components/Radio/Radio.tsx",
    props: {
      label: "string (required) - Label text displayed next to radio",
      icon: "string (optional) - Icon class string (FontAwesome style)",
    },
    features: [
      "Wrapper label component for standard HTML radio input",
      "Inline layout with icon and label text",
      "Disabled state support (opacity, cursor not-allowed)",
      "Primary color for checked state",
      "Neutral border color",
      "Primary focus ring",
      "Icon support with sizing (w-4 h-4)",
      "Designed for use in radio groups (requires parent to manage name/value)",
      "Extends all standard HTML input attributes",
    ],
    dependencies: [],
  },

  Toggler: {
    name: "Toggler",
    description:
      "Custom switch/toggle component with smooth animations, icon support, and accessible design. Production-ready for on/off states.",
    category: "Selection",
    path: "src/design-system/components/Toggler/Toggler.tsx",
    props: {
      checked: "boolean (required) - Boolean state of the toggle",
      onChange: "(checked: boolean) => void (required) - Callback receiving boolean value",
      disabled: "boolean (optional) - Disable state",
      label: "string (optional) - Label text displayed next to toggle",
      icon: "string (optional) - Icon class string (FontAwesome style)",
    },
    features: [
      "Custom styled toggle switch with animated knob slide",
      "Smooth transition animation for knob movement",
      "Primary color for checked state (bg-primary-600)",
      "Neutral color for unchecked state (bg-neutral-300)",
      "Hidden native checkbox for accessibility",
      "White knob with shadow that translates on toggle",
      "Icon support (w-4 h-4) displayed next to switch",
      "Optional label support",
      "Disabled state handling",
    ],
    dependencies: [],
  },

  // Specialized Inputs

  Calendar: {
    name: "Calendar",
    description:
      "Comprehensive calendar component with single/range/multi-month variants, date restrictions, predefined ranges, and locale support. Includes DatePicker and DateRangePicker.",
    category: "Date & Time",
    path: "src/design-system/components/Calendar/Calendar.tsx",
    props: {
      value: "Date (optional) - Selected date",
      onChange: "(date: Date) => void (optional) - Date selection callback",
      minDate: "Date (optional) - Minimum selectable date",
      maxDate: "Date (optional) - Maximum selectable date",
      disabledDates: "Date[] (optional) - Array of disabled dates",
      highlightedDates: "Date[] (optional) - Array of highlighted dates",
      variant: "'single' | 'range' | 'multi-month' (optional) - Calendar display variant",
      rangeStart: "Date (optional) - Range start date",
      rangeEnd: "Date (optional) - Range end date",
      onRangeChange: "(start: Date, end: Date) => void (optional) - Range selection callback",
      showToday: "boolean (optional) - Highlight today's date",
      showWeekNumbers: "boolean (optional) - Display week numbers",
      locale: "string (optional) - Date formatting locale (default: 'en-US')",
      showClearButton: "boolean (optional) - Show clear button",
      showSelectButton: "boolean (optional) - Show select button",
      predefinedRanges: "Array<{label, value, getValue}> (optional) - Predefined date ranges",
    },
    features: [
      "Three calendar variants: single date, date range, multi-month",
      "Week number support",
      "Customizable disabled and highlighted dates",
      "Predefined date ranges with custom range support",
      "Locale support for date formatting",
      "Built-in DatePicker and DateRangePicker helper components",
      "Clear and Select button controls",
      "Min/max date restrictions",
    ],
    dependencies: ["Button"],
  },

  ColorPicker: {
    name: "ColorPicker",
    description:
      "Color selection component with multiple formats (hex/RGB/HSL), preset colors, preview, and contrast calculation. Includes pre-built variants and custom hook.",
    category: "Visual",
    path: "src/design-system/components/ColorPicker/ColorPicker.tsx",
    props: {
      value: "string (required) - Current color value",
      onChange: "(color: string) => void (required) - Color change callback",
      format: "'hex' | 'rgb' | 'hsl' (optional) - Color format (default: 'hex')",
      presetColors: "string[] (optional) - 18 default colors provided",
      showPresets: "boolean (optional) - Display preset colors (default: true)",
      showInput: "boolean (optional) - Show color input field (default: true)",
      showPreview: "boolean (optional) - Show color preview (default: true)",
      disabled: "boolean (optional) - Disable state (default: false)",
    },
    features: [
      "Multiple color formats with conversion (hex, RGB, HSL)",
      "Customizable preset colors",
      "Color preview display",
      "Contrast color calculation for text readability",
      "Pre-built variants: SimpleColorPicker, AdvancedColorPicker, ThemeColorPicker",
      "Custom hook useColorPicker for state management",
      "No heavy external dependencies",
    ],
    dependencies: [],
  },

  Slider: {
    name: "Slider",
    description:
      "Simple HTML5 range input wrapper with label and current value display. Production-ready for numeric value selection.",
    category: "Numeric",
    path: "src/design-system/components/Slider/Slider.tsx",
    props: {
      label: "string (optional) - Label text",
      min: "number (optional) - Minimum value (default: 0)",
      max: "number (optional) - Maximum value (default: 100)",
      step: "number (optional) - Value increment step (default: 1)",
      value: "number (required) - Current slider value",
      onChange: "(e: React.ChangeEvent<HTMLInputElement>) => void (required) - Change handler",
      disabled: "boolean (optional) - Disable state",
    },
    features: [
      "Simple HTML5 range input wrapper",
      "Optional label support",
      "Current value display",
      "Disabled state styling",
      "Minimal dependencies",
      "Lightweight implementation",
      "Extends all standard HTML input range attributes",
    ],
    dependencies: [],
  },

  RatingStars: {
    name: "RatingStars",
    description:
      "Star rating component with hover preview, multiple star counts (5/10), three variants, custom colors, and rating labels. Includes pre-built variants and custom hook.",
    category: "Rating",
    path: "src/design-system/components/RatingStars/RatingStars.tsx",
    props: {
      value: "number (required) - Current rating value",
      onChange: "(rating: number) => void (optional) - Rating change callback",
      maxStars: "number (optional) - Maximum stars (default: 5)",
      size: "'sm' | 'md' | 'lg' (optional) - Star size (default: 'md')",
      variant: "'default' | 'filled' | 'outlined' (optional) - Visual variant (default: 'default')",
      color: "string (optional) - Custom star color (default: '#fbbf24' yellow-400)",
      readOnly: "boolean (optional) - Read-only mode (default: false)",
      showValue: "boolean (optional) - Show numeric value (default: false)",
      showLabel: "boolean (optional) - Show rating label (default: false)",
    },
    features: [
      "Hover preview before selection",
      "Multiple star counts (5 or 10 stars)",
      "Three visual variants (default, filled, outlined)",
      "Custom color support",
      "Rating labels: Poor, Fair, Good, Very Good, Excellent",
      "Pre-built components: ProductRating, ReviewRating, CompactRating, TenStarRating",
      "Custom hook useRating for state management",
      "Uses FontAwesome stars",
    ],
    dependencies: [],
  },

  FileUpload: {
    name: "FileUpload",
    description:
      "Drag-and-drop file upload with progress bars, file type icons, error handling, and retry capability. Includes pre-built variants for images/documents/videos.",
    category: "File",
    path: "src/design-system/components/FileUpload/FileUpload.tsx",
    props: {
      files:
        "FileUploadFile[] (required) - Array of file objects with id/name/size/type/progress/status/error",
      onFilesSelect: "(files: FileList) => void (required) - File selection callback",
      onFileRemove: "(fileId: string) => void (required) - File removal callback",
      onFileRetry: "(fileId: string) => void (optional) - File retry callback",
      accept: "string (optional) - File type filter (default: '*/*')",
      multiple: "boolean (optional) - Allow multiple files (default: false)",
      maxFiles: "number (optional) - Max files allowed (default: 10)",
      maxFileSize: "number (optional) - Max file size in bytes (default: 10MB)",
      variant:
        "'default' | 'compact' | 'detailed' (optional) - Layout variant (default: 'default')",
      dragActive: "boolean (optional) - Drag active state (default: false)",
    },
    features: [
      "Drag-and-drop file upload",
      "File type icons (image, video, audio, file)",
      "Progress bar display for uploading files",
      "Error handling with retry capability",
      "File size formatting",
      "Pre-built specialized uploads: ImageUpload (5MB, multiple), DocumentUpload (10MB), VideoUpload (100MB, single)",
      "Custom hook useFileUpload with simulated upload progress",
      "Three layout variants",
    ],
    dependencies: [],
  },

  SignatureInput: {
    name: "SignatureInput",
    description:
      "Canvas-based signature drawing with undo/redo, clear, download, and touch/mouse support. Includes pre-built variants for different sizes.",
    category: "Document",
    path: "src/design-system/components/SignatureInput/SignatureInput.tsx",
    props: {
      value: "string (optional) - Signature data URL",
      onChange: "(signature: string) => void (optional) - Signature change callback",
      width: "number (optional) - Canvas width (default: 400)",
      height: "number (optional) - Canvas height (default: 200)",
      penColor: "string (optional) - Pen color (default: '#000000')",
      penWidth: "number (optional) - Pen width (default: 2)",
      backgroundColor: "string (optional) - Background color (default: '#ffffff')",
      placeholder: "string (optional) - Placeholder text (default: 'Sign here...')",
      readOnly: "boolean (optional) - Read-only mode (default: false)",
    },
    features: [
      "Canvas-based signature drawing",
      "Undo/Redo functionality with history tracking",
      "Clear button",
      "Download as PNG",
      "Customizable pen color and width",
      "Touch and mouse support",
      "Drawing state management",
      "Pre-built variants: DocumentSignature (500x150), CompactSignature (300x100)",
      "Toolbar with drawing controls",
      "Data URL export for signatures",
    ],
    dependencies: [],
  },

  RichTextEditor: {
    name: "RichTextEditor",
    description:
      "Rich text editor with WYSIWYG and Markdown modes, customizable toolbar, and preview. Includes pre-built variants for different use cases.",
    category: "Text",
    path: "src/design-system/components/RichTextEditor/RichTextEditor.tsx",
    props: {
      value: "string (required) - Current editor content",
      onChange: "(value: string) => void (required) - Content change callback",
      mode: "'wysiwyg' | 'markdown' (optional) - Editor mode (default: 'wysiwyg')",
      placeholder: "string (optional) - Placeholder text (default: 'Start writing...')",
      readOnly: "boolean (optional) - Read-only mode (default: false)",
      toolbar:
        "string[] (optional) - Toolbar items: bold, italic, underline, strikethrough, heading, list, orderedList, quote, code, link (default: all)",
    },
    features: [
      "Two modes: WYSIWYG (contentEditable) and Markdown",
      "Markdown preview mode with HTML rendering",
      "Customizable toolbar with common formatting options",
      "Built-in toolbar handlers with document.execCommand (WYSIWYG) or markdown syntax (Markdown)",
      "Pre-built editors: WYSIWYGEditor, MarkdownEditor, SimpleEditor",
      "Markdown to HTML conversion (basic regex-based)",
      "ReadOnly support",
      "Minimum height of 12rem (48px)",
    ],
    dependencies: [],
  },

  // Form Layout

  FormLayout: {
    name: "FormLayout",
    description:
      "Hierarchical form structure with groups, sections, and fields. Supports collapsible sections, multiple layouts, and validation display. Includes pre-built forms.",
    category: "Layout",
    path: "src/design-system/components/FormLayout/FormLayout.tsx",
    props: {
      groups: "FormGroup[] (required) - Array of form groups with sections and fields",
      variant:
        "'default' | 'compact' | 'spacious' (optional) - Spacing variant (default: 'default')",
      layout:
        "'vertical' | 'horizontal' | 'two-column' (optional) - Layout mode (default: 'vertical')",
      showSectionNumbers: "boolean (optional) - Display section numbering (default: false)",
    },
    features: [
      "Hierarchical form structure: Groups > Sections > Fields",
      "Collapsible sections with expand/collapse state",
      "Three spacing variants (default, compact, spacious)",
      "Three layout modes (vertical, horizontal 1 col, two-column grid)",
      "Three group styling variants (default, card, bordered)",
      "Customizable section numbering",
      "Required field indicators",
      "Error and help text support",
      "Pre-built forms: UserProfileForm (2 groups, 3 sections), SettingsForm (2 groups)",
      "Flexible children prop for custom inputs",
    ],
    dependencies: [],
  },
};

// Design tokens from tailwind.config.js
export const DESIGN_TOKENS = {
  colors: {
    primary: "Orange scale (50-950) for primary brand colors",
    secondary: "Gray and neutral scales for secondary elements",
    semantic: "Success (green), error (red), warning (yellow), info (blue)",
    wakecap: "Brand-specific colors with CSS variables",
  },
  typography: {
    fonts: {
      sans: "Figtree for English text",
      arabic: "IBM Plex Sans Arabic for Arabic text",
      mono: "Monospace fonts for code",
    },
    scale: "xs to 9xl with defined line-height and letter-spacing",
    weights: "100 (thin) to 900 (black)",
  },
  spacing: "8pt grid system from 0 to 96 (0px to 384px)",
  shadows: "Elevation system with xs, sm, md, lg, xl, 2xl + custom elevation-1 to elevation-5",
  borderRadius: "xs (2px) to 3xl (32px) plus full (9999px)",
  animations: {
    durations: "fast (150ms), base (250ms), slow (350ms), slower (500ms)",
    easings: "Custom cubic-bezier functions (ease-out-expo, ease-in-out-quart, etc.)",
    keyframes: "fade-in/out, slide-in, scale-in, pulse, bounce-subtle",
  },
  zIndex: "Semantic layers: dropdown (1000), modal (1400), tooltip (1800), etc.",
};

/**
 * Create and configure an MCP server with all request handlers
 * This function is used by both stdio and HTTP transports
 */
export function createMcpServer(): Server {
  const server = new Server(
    {
      name: "blockwork-design-system",
      version: "1.0.0",
    },
    {
      capabilities: {
        resources: {},
        tools: {},
      },
    },
  );

  // List available resources
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: "blockwork://design-system/overview",
          mimeType: "text/plain",
          name: "Design System Overview",
          description: "Overview of the Blockwork UI design system",
        },
        {
          uri: "blockwork://design-system/getting-started",
          mimeType: "text/plain",
          name: "Getting Started Guide",
          description: "Installation, setup, and usage instructions for Blockwork UI",
        },
        {
          uri: "blockwork://design-system/components",
          mimeType: "application/json",
          name: "Component List",
          description: "List of all available components with metadata",
        },
        {
          uri: "blockwork://design-system/tokens",
          mimeType: "application/json",
          name: "Design Tokens",
          description: "Design tokens including colors, typography, spacing, etc.",
        },
        ...Object.keys(COMPONENTS).map((componentName) => ({
          uri: `blockwork://components/${componentName}`,
          mimeType: "text/plain",
          name: `${componentName} Component`,
          description: `Documentation and code for ${componentName}`,
        })),
      ],
    };
  });

  // Read resource content
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const uri = request.params.uri;

    if (uri === "blockwork://design-system/overview") {
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# Blockwork UI Design System

A React component library built with TypeScript, Tailwind CSS, and Storybook.
Features construction-focused UI components with comprehensive Arabic/RTL support.

## Features
- Black-primary design with orange accents
- Full Arabic/RTL support with IBM Plex Sans Arabic font
- Production-ready TopNavigator component
- Comprehensive design token system
- Responsive and mobile-friendly
- Accessibility-focused
- Built with class-variance-authority for variant management

## Tech Stack
- React 18+
- TypeScript
- Tailwind CSS (custom configuration)
- Storybook for documentation
- Vite for building
- Radix UI primitives

## Quick Start
See the "Getting Started Guide" resource for detailed installation and setup instructions.

## Production-Ready Components
Currently available: **${Object.keys(COMPONENTS).length}** component(s) - ${Object.keys(COMPONENTS).join(", ")}

More components will be added as they reach production quality.
`,
          },
        ],
      };
    }

    if (uri === "blockwork://design-system/getting-started") {
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text: `# Getting Started with Blockwork UI

Complete guide to installing and using Blockwork UI components in your React project.

## 📦 Installation

### Step 1: Configure npm for GitHub Packages

Create or edit \`.npmrc\` in your project root:

\`\`\`
@wakecap:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
\`\`\`

Replace \`YOUR_GITHUB_TOKEN\` with your personal access token that has \`read:packages\` permission.

### Step 2: Install the Package

\`\`\`bash
npm install @wakecap/blockwork-ui
\`\`\`

## 🎨 Import Styles

Import the styles in your main entry file (e.g., \`main.tsx\` or \`App.tsx\`):

\`\`\`tsx
import "@wakecap/blockwork-ui/styles.css";
\`\`\`

**Important:** The styles.css file includes all Tailwind CSS classes and design tokens. Import it before using any components.

## 📥 Import Components

### Option 1: Main Package Entry (Simpler)

\`\`\`tsx
import { TopNavigator } from "@wakecap/blockwork-ui";
\`\`\`

### Option 2: Component-Specific Path (Better Tree-Shaking)

\`\`\`tsx
import { TopNavigator } from "@wakecap/blockwork-ui/components/TopNavigator";
\`\`\`

Both methods work - use Option 2 for better bundle optimization.

## 🚀 Complete Usage Example

\`\`\`tsx
// Import styles (once in your app entry point)
import "@wakecap/blockwork-ui/styles.css";

// Import components
import { TopNavigator } from "@wakecap/blockwork-ui";

function App() {
  const menuItems = [
    { id: '1', label: 'Dashboard', icon: 'fa-solid fa-home', category: 'Main' },
    { id: '2', label: 'Projects', icon: 'fa-solid fa-folder', category: 'Main' },
  ];

  const avatarMenuItems = [
    { id: 'profile', label: 'Profile', icon: 'fa-solid fa-user' },
    { id: 'settings', label: 'Settings', icon: 'fa-solid fa-cog' },
    { id: 'logout', label: 'Logout', icon: 'fa-solid fa-sign-out' },
  ];

  return (
    <TopNavigator
      menu={menuItems}
      avatarMenu={avatarMenuItems}
      onMenuItemClick={(item) => console.log('Menu clicked:', item)}
      onAvatarMenuItemClick={(item) => console.log('Avatar menu clicked:', item)}
    />
  );
}

export default App;
\`\`\`

## 🌍 RTL/Arabic Support

### Enable Arabic Language Support

Wrap your app with FontProvider:

\`\`\`tsx
import { FontProvider } from "@wakecap/blockwork-ui";

function App() {
  return (
    <FontProvider>
      {/* Your app content */}
    </FontProvider>
  );
}
\`\`\`

### Toggle Language Programmatically

\`\`\`tsx
import { useFont } from "@wakecap/blockwork-ui";

function LanguageSwitcher() {
  const { language, setLanguage } = useFont();

  return (
    <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}>
      Switch to {language === 'en' ? 'Arabic' : 'English'}
    </button>
  );
}
\`\`\`

## 🎯 Available Components

Currently available production-ready components:
${Object.keys(COMPONENTS)
  .map((name) => `- **${name}**: ${COMPONENTS[name].description}`)
  .join("\n")}

## 📚 Next Steps

1. **Browse Components**: Use the MCP tools to search and explore available components
2. **Design Tokens**: Check out \`blockwork://design-system/tokens\` for colors, typography, spacing, etc.
3. **Component Documentation**: Access detailed docs for each component via \`blockwork://components/{ComponentName}\`
4. **Storybook**: Visit the live Storybook for interactive component examples

## 🔧 TypeScript Support

Blockwork UI is fully typed. Import types alongside components:

\`\`\`tsx
import { TopNavigator, type MenuItem } from "@wakecap/blockwork-ui";

const items: MenuItem[] = [
  { id: '1', label: 'Dashboard', icon: 'fa-solid fa-home' }
];
\`\`\`

## 💡 Tips

- **Tree-shaking**: Use component-specific imports for smaller bundles
- **Styles**: Only import styles.css once in your app entry point
- **RTL**: Components automatically adapt to RTL when language is set to Arabic
- **Icons**: Components use Font Awesome icons - make sure to include Font Awesome in your project
`,
          },
        ],
      };
    }

    if (uri === "blockwork://design-system/components") {
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(COMPONENTS, null, 2),
          },
        ],
      };
    }

    if (uri === "blockwork://design-system/tokens") {
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(DESIGN_TOKENS, null, 2),
          },
        ],
      };
    }

    // Component-specific resources
    const componentMatch = uri.match(/^blockwork:\/\/components\/(.+)$/);
    if (componentMatch) {
      const componentName = componentMatch[1];
      const component = COMPONENTS[componentName as keyof typeof COMPONENTS];

      if (component) {
        // Try to read the actual component file
        const componentPath = path.join(__dirname, "..", component.path);
        let sourceCode = "";

        try {
          sourceCode = fs.readFileSync(componentPath, "utf-8");
        } catch (error) {
          sourceCode = `// Unable to read source file: ${error}`;
        }

        const documentation = `# ${component.name}

${component.description}

**Category:** ${component.category}

${
  component.props
    ? `## Props

${Object.entries(component.props)
  .map(([prop, type]) => `- **${prop}**: ${type}`)
  .join("\n")}`
    : ""
}

## Features

${component.features?.map((feature) => `- ${feature}`).join("\n") || "No features listed"}

${component.dependencies && component.dependencies.length > 0 ? `## Dependencies\n\nThis component uses: ${component.dependencies.join(", ")}` : ""}

## Source Code

\`\`\`tsx
${sourceCode}
\`\`\`

## Usage Example

\`\`\`tsx
import { ${component.name} } from '@wakecap/blockwork-ui';

// See props section above for available props
<${component.name} />
\`\`\`
`;

        return {
          contents: [
            {
              uri,
              mimeType: "text/plain",
              text: documentation,
            },
          ],
        };
      }
    }

    throw new Error(`Resource not found: ${uri}`);
  });

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "search_components",
          description: "Search for components by name, category, or feature",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search query (component name, category, or feature keyword)",
              },
            },
            required: ["query"],
          },
        },
        {
          name: "get_component_code",
          description: "Get the source code for a specific component",
          inputSchema: {
            type: "object",
            properties: {
              componentName: {
                type: "string",
                description: "Name of the component (e.g., 'TopNavigator', 'Button')",
              },
            },
            required: ["componentName"],
          },
        },
        {
          name: "get_usage_example",
          description: "Get a usage example for a component with specific props",
          inputSchema: {
            type: "object",
            properties: {
              componentName: {
                type: "string",
                description: "Name of the component",
              },
              variant: {
                type: "string",
                description: "Variant to use (optional)",
              },
              size: {
                type: "string",
                description: "Size to use (optional)",
              },
            },
            required: ["componentName"],
          },
        },
        {
          name: "get_design_token",
          description: "Get information about design tokens (colors, spacing, typography, etc.)",
          inputSchema: {
            type: "object",
            properties: {
              tokenType: {
                type: "string",
                description:
                  "Type of token: colors, typography, spacing, shadows, borderRadius, animations, zIndex",
              },
            },
            required: ["tokenType"],
          },
        },
      ],
    };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    if (!args) {
      throw new Error("Missing arguments");
    }

    if (name === "search_components") {
      const query = (args.query as string).toLowerCase();
      const results = Object.entries(COMPONENTS)
        .filter(([name, component]) => {
          return (
            name.toLowerCase().includes(query) ||
            component.description.toLowerCase().includes(query) ||
            component.category.toLowerCase().includes(query) ||
            component.features?.some((f) => f.toLowerCase().includes(query))
          );
        })
        .map(([name, component]) => ({
          name,
          description: component.description,
          category: component.category,
          path: component.path,
        }));

      return {
        content: [
          {
            type: "text",
            text: `Found ${results.length} component(s):\n\n${JSON.stringify(results, null, 2)}`,
          },
        ],
      };
    }

    if (name === "get_component_code") {
      const componentName = args.componentName as string;
      const component = COMPONENTS[componentName as keyof typeof COMPONENTS];

      if (!component) {
        return {
          content: [
            {
              type: "text",
              text: `Component "${componentName}" not found. Available components: ${Object.keys(COMPONENTS).join(", ")}`,
            },
          ],
        };
      }

      const componentPath = path.join(__dirname, "..", component.path);
      try {
        const sourceCode = fs.readFileSync(componentPath, "utf-8");
        return {
          content: [
            {
              type: "text",
              text: `# ${componentName} Source Code\n\n\`\`\`tsx\n${sourceCode}\n\`\`\``,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error reading component file: ${error}`,
            },
          ],
        };
      }
    }

    if (name === "get_usage_example") {
      const { componentName, variant, size } = args as {
        componentName: string;
        variant?: string;
        size?: string;
      };
      const component = COMPONENTS[componentName as keyof typeof COMPONENTS];

      if (!component) {
        return {
          content: [
            {
              type: "text",
              text: `Component "${componentName}" not found. Available components: ${Object.keys(COMPONENTS).join(", ")}`,
            },
          ],
        };
      }

      let example = "";

      if (componentName === "Button") {
        example = `import { Button } from '@wakecap/blockwork-ui';

<Button
  ${variant ? `variant="${variant}"` : '// variant="primary" (default)'}
  ${size ? `size="${size}"` : '// size="md" (default)'}
  onClick={() => console.log('Clicked!')}
>
  Click Me
</Button>

// With icon
<Button icon="fa-solid fa-check" iconPosition="left">
  Save
</Button>

// Loading state
<Button loading loadingText="Saving...">
  Save
</Button>

// Arabic support
<Button
  arabicText="احفظ"
  showArabicText={true}
>
  Save
</Button>`;
      } else if (componentName === "TopNavigator") {
        example = `import { TopNavigator } from '@wakecap/blockwork-ui';

const menuItems = [
  { id: '1', label: 'Dashboard', icon: 'fa-solid fa-home', category: 'Main' },
  { id: '2', label: 'Projects', icon: 'fa-solid fa-folder', category: 'Main' },
];

const avatarMenuItems = [
  { id: 'profile', label: 'Profile', icon: 'fa-solid fa-user' },
  { id: 'logout', label: 'Logout', icon: 'fa-solid fa-sign-out' },
];

const projectsData = [
  {
    organizationId: 'org1',
    organizationName: 'WakeCap',
    projects: [
      { id: 'proj1', name: 'Construction Site Alpha' },
      { id: 'proj2', name: 'Construction Site Beta' },
    ],
  },
];

<TopNavigator
  menu={menuItems}
  avatarMenu={avatarMenuItems}
  projectsData={projectsData}
  onMenuItemClick={(item) => console.log('Menu clicked:', item)}
  onProjectSelect={(project) => console.log('Project selected:', project)}
/>`;
      } else if (componentName === "Badge") {
        example = `import { Badge } from '@wakecap/blockwork-ui';

<Badge ${variant ? `variant="${variant}"` : ""}${size ? ` size="${size}"` : ""}>
  New
</Badge>

// Semantic variants
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Error</Badge>`;
      } else {
        example = `import { ${componentName} } from '@wakecap/blockwork-ui';

<${componentName} />`;
      }

      return {
        content: [
          {
            type: "text",
            text: `# ${componentName} Usage Example\n\n\`\`\`tsx\n${example}\n\`\`\``,
          },
        ],
      };
    }

    if (name === "get_design_token") {
      const tokenType = args.tokenType as string;
      const tokenInfo = DESIGN_TOKENS[tokenType as keyof typeof DESIGN_TOKENS];

      if (!tokenInfo) {
        return {
          content: [
            {
              type: "text",
              text: `Token type "${tokenType}" not found. Available types: ${Object.keys(DESIGN_TOKENS).join(", ")}`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `# ${tokenType} Design Tokens\n\n${JSON.stringify(tokenInfo, null, 2)}`,
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${name}`);
  });

  return server;
}
