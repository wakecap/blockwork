// ============================================================================
// FOUNDATION EXPORTS - Typography & Colors
// ============================================================================
export {
  Heading,
  Text,
  Label,
  Link,
  Code,
  Caption,
  Blockquote,
  List,
} from "./foundations/Typography";
export type {
  HeadingProps,
  TextProps,
  LabelProps,
  LinkProps,
  CodeProps,
  CaptionProps,
  BlockquoteProps,
  ListProps,
} from "./foundations/Typography";

export {
  getSemanticColor,
  getContentColor,
  SEMANTIC_COLORS,
  BACKGROUND_COLORS,
  TEXT_COLORS,
  BORDER_COLORS,
  CONTENT_COLORS,
} from "./foundations/ColorQuickReference";
export type {
  SemanticColorType,
  ColorState,
  ContentColorName,
} from "./foundations/ColorQuickReference";

// ============================================================================
// COMPONENT EXPORTS - Migrated to Blockwork Colors
// ============================================================================

// Button
export { Button, buttonVariants } from "./components/Button/Button";
export type { ButtonProps, SizeVariants, Variants } from "./components/Button/Button";

// Badge
export { Badge, badgeVariants } from "./components/Badge/Badge";
export type { BadgeProps } from "./components/Badge/Badge";

// Alert
export { Alert } from "./components/Alert/Alert";
export type { AlertProps } from "./components/Alert/Alert";

// Input
export { Input } from "./components/Input/Input";
export type { InputProps } from "./components/Input/Input";

// Card
export {
  Card,
  ProductCard,
  UserCard,
  ArticleCard,
} from "./components/Card/Card";
export type { CardProps } from "./components/Card/Card";

// Checkbox
export { Checkbox } from "./components/Checkbox/Checkbox";
export type { CheckboxProps } from "./components/Checkbox/Checkbox";

// ============================================================================
// OTHER COMPONENTS - Not Yet Migrated
// ============================================================================
export { TopNavigator } from "./components/TopNavigator/TopNavigator";
export type { TopNavigatorProps } from "./components/TopNavigator/TopNavigator";

export { Dropdown } from "./components/Dropdown/Dropdown";
export type { DropdownProps, DropdownOption, DropdownGroup, ProfileData } from "./components/Dropdown/Dropdown";
