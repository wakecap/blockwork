// Re-export components for tree shaking
export { TopNavigator } from "./components/TopNavigator/TopNavigator";
export type {
  MenuItem,
  ProjectsData,
  TopNavigatorProps,
} from "./components/TopNavigator/TopNavigator";

export { Button } from "./components/Button/Button";
export type { ButtonProps } from "./components/Button/Button";

// ============================================
// UI COMPONENTS
// ============================================

export { Avatar } from "./components/Avatar/Avatar";
export type { AvatarProps } from "./components/Avatar/Avatar";

export { Badge, badgeVariants } from "./components/Badge/Badge";
export type { BadgeProps } from "./components/Badge/Badge";

export { EmptyState } from "./components/EmptyState/EmptyState";
export type { EmptyStateProps } from "./components/EmptyState/EmptyState";

export { PageLoading } from "./components/PageLoading/PageLoading";
export type { PageLoadingProps } from "./components/PageLoading/PageLoading";

// ============================================
// FORM ELEMENTS
// ============================================

// Input Fields
export { Input } from "./components/Input/Input";
export type { InputProps } from "./components/Input/Input";

export { PasswordInput } from "./components/PasswordInput/PasswordInput";
export type { PasswordInputProps } from "./components/PasswordInput/PasswordInput";

export { SearchInput } from "./components/SearchInput/SearchInput";
export type { SearchInputProps } from "./components/SearchInput/SearchInput";

export { TextArea } from "./components/TextArea/TextArea";
export type { TextAreaProps } from "./components/TextArea/TextArea";

export {
  OTPInput,
  PINInput,
  VerificationCode,
  PasswordOTP,
  useOTP,
} from "./components/OTPInput/OTPInput";
export type { OTPInputProps } from "./components/OTPInput/OTPInput";

// Selection Controls
export { Dropdown } from "./components/Dropdown/Dropdown";
export type { DropdownProps, DropdownOption } from "./components/Dropdown/Dropdown";

export { Autocomplete } from "./components/Autocomplete/Autocomplete";
export type { AutocompleteProps, AutocompleteOption } from "./components/Autocomplete/Autocomplete";

export { MultiSelect } from "./components/MultiSelect/MultiSelect";
export type { MultiSelectProps, MultiSelectOption } from "./components/MultiSelect/MultiSelect";

export { Checkbox } from "./components/Checkbox/Checkbox";
export type { CheckboxProps } from "./components/Checkbox/Checkbox";

export { Radio } from "./components/Radio/Radio";
export type { RadioProps } from "./components/Radio/Radio";

export { Toggler } from "./components/Toggler/Toggler";
export type { TogglerProps } from "./components/Toggler/Toggler";

// Specialized Inputs
export { Calendar, DatePicker, DateRangePicker } from "./components/Calendar/Calendar";
export type { CalendarProps } from "./components/Calendar/Calendar";

export {
  ColorPicker,
  SimpleColorPicker,
  AdvancedColorPicker,
  ThemeColorPicker,
  useColorPicker,
} from "./components/ColorPicker/ColorPicker";
export type { ColorPickerProps } from "./components/ColorPicker/ColorPicker";

export { Slider } from "./components/Slider/Slider";
export type { SliderProps } from "./components/Slider/Slider";

export {
  RatingStars,
  ProductRating,
  ReviewRating,
  CompactRating,
  TenStarRating,
  useRating,
} from "./components/RatingStars/RatingStars";
export type { RatingStarsProps } from "./components/RatingStars/RatingStars";

export {
  FileUpload,
  ImageUpload,
  DocumentUpload,
  VideoUpload,
  useFileUpload,
} from "./components/FileUpload/FileUpload";
export type { FileUploadProps, FileUploadFile } from "./components/FileUpload/FileUpload";

export {
  SignatureInput,
  DocumentSignature,
  CompactSignature,
} from "./components/SignatureInput/SignatureInput";
export type { SignatureInputProps } from "./components/SignatureInput/SignatureInput";

export {
  RichTextEditor,
  WYSIWYGEditor,
  MarkdownEditor,
  SimpleEditor,
} from "./components/RichTextEditor/RichTextEditor";
export type { RichTextEditorProps } from "./components/RichTextEditor/RichTextEditor";

// Form Layout
export { FormLayout, UserProfileForm, SettingsForm } from "./components/FormLayout/FormLayout";
export type {
  FormLayoutProps,
  FormField,
  FormSection,
  FormGroup,
} from "./components/FormLayout/FormLayout";
