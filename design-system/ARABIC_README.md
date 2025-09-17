# Arabic Design System Implementation

This document outlines the comprehensive Arabic (RTL) support implemented across all components in the Wakecap Design System.

## 🌐 Overview

The Arabic design system provides complete RTL (Right-to-Left) support with:
- **IBM Plex Sans Arabic** font for Arabic text
- **Figtree** font for English text
- Automatic language switching
- RTL-aware component layouts
- Bilingual text support
- Consistent design tokens

## 🏗️ Architecture

### Core Components

1. **FontProvider** - Manages language context and font switching
2. **Arabic Localization Utils** - Provides RTL utilities and bilingual text
3. **Arabic Component Variants** - RTL-aware versions of all components
4. **Font Management** - Automatic font family switching

### File Structure

```
design-system/
├── components/
│   ├── FontProvider.tsx           # Language context provider
│   ├── ButtonArabic.tsx           # Arabic button component
│   ├── InputArabic.tsx            # Arabic input component
│   └── ArabicShowcase.tsx         # Comprehensive demo
├── utils/
│   └── arabicLocalization.ts      # RTL utilities and labels
├── stories/
│   ├── FontProvider.stories.tsx   # Font provider stories
│   ├── ButtonArabic.stories.tsx   # Arabic button stories
│   └── ArabicShowcase.stories.tsx # Showcase stories
└── ARABIC_README.md               # This file
```

## 🎯 Key Features

### 1. Font Management
- **English**: Figtree font family
- **Arabic**: IBM Plex Sans Arabic font family
- Automatic switching based on language context
- Fallback to system fonts for performance

### 2. RTL Support
- Automatic text direction switching
- Icon position flipping (left ↔ right)
- Layout direction adjustment
- Proper text alignment (left ↔ right)

### 3. Bilingual Text
- All component labels support both languages
- Automatic text switching based on context
- Consistent terminology across components
- Placeholder text localization

### 4. Component Adaptability
- Components automatically adjust for RTL
- Spacing and positioning adapt to language
- Icon placement considers text direction
- Form layouts adjust appropriately

## 🚀 Usage

### Basic Setup

```tsx
import { FontProvider } from './components/FontProvider';
import { ButtonArabic } from './components/ButtonArabic';

function App() {
  return (
    <FontProvider defaultLanguage="en">
      <ButtonArabic 
        variant="primary"
        arabicText="زر أساسي"
        showArabicText={true}
      >
        Primary Button
      </ButtonArabic>
    </FontProvider>
  );
}
```

### Language Switching

```tsx
import { useFont, LanguageSwitcher } from './components/FontProvider';

function MyComponent() {
  const { language, setLanguage } = useFont();
  
  return (
    <div>
      <LanguageSwitcher />
      <p>Current language: {language}</p>
    </div>
  );
}
```

### Component Props

All Arabic components support these additional props:

```tsx
interface ArabicComponentProps {
  // Bilingual text
  arabicText?: string;           // Arabic version of text
  arabicLabel?: string;          // Arabic version of label
  arabicPlaceholder?: string;    // Arabic version of placeholder
  arabicHelperText?: string;     // Arabic version of helper text
  arabicError?: string;          // Arabic version of error message
  arabicSuccess?: string;        // Arabic version of success message
  
  // Control
  showArabicText?: boolean;      // Whether to show Arabic text when language is Arabic
}
```

## 📚 Available Components

### 1. ButtonArabic
- All button variants with RTL support
- Automatic icon positioning
- Bilingual text support
- Pre-built variants: Primary, Secondary, Outline, etc.

### 2. InputArabic
- All input types with RTL support
- Icon positioning adapts to language
- Bilingual labels and placeholders
- Pre-built types: Text, Email, Password, etc.

### 3. FontProvider
- Language context management
- Font family switching
- RTL layout control
- Language switcher component

## 🎨 Design Tokens

### Font Families
```css
/* English */
font-sans: 'Figtree', ui-sans-serif, system-ui, ...

/* Arabic */
font-arabic: '"IBM Plex Sans Arabic"', 'Figtree', ui-sans-serif, ...
```

### RTL Utilities
```tsx
import { 
  getDirection, 
  getTextAlign, 
  getRTLClasses,
  getFontFamily 
} from '../utils/arabicLocalization';

// Get direction
const direction = getDirection(language); // 'ltr' | 'rtl'

// Get text alignment
const textAlign = getTextAlign(language); // 'left' | 'right'

// Get RTL-aware CSS classes
const classes = getRTLClasses(language); // 'rtl text-right' | 'ltr text-left'

// Get appropriate font family
const fontFamily = getFontFamily(language); // 'font-arabic' | 'font-sans'
```

### Spacing Utilities
```tsx
import { getSpacingClasses } from '../utils/arabicLocalization';

// Automatically flip margins and padding for RTL
const spacing = getSpacingClasses(language, 'ml-4 pl-2');
// Result: 'mr-4 pr-2' for Arabic, 'ml-4 pl-2' for English
```

## 🌍 Localization Labels

### Common Labels
```tsx
import { commonLabels } from '../utils/arabicLocalization';

const labels = {
  submit: { en: 'Submit', ar: 'إرسال' },
  cancel: { en: 'Cancel', ar: 'إلغاء' },
  save: { en: 'Save', ar: 'حفظ' },
  delete: { en: 'Delete', ar: 'حذف' },
  // ... more labels
};
```

### Component-Specific Labels
```tsx
import { 
  buttonLabels, 
  formLabels, 
  tableLabels 
} from '../utils/arabicLocalization';

// Button labels
const buttonText = buttonLabels.primary; // { en: 'Primary Button', ar: 'زر أساسي' }

// Form labels
const formText = formLabels.firstName; // { en: 'First Name', ar: 'الاسم الأول' }

// Table labels
const tableText = tableLabels.noData; // { en: 'No data available', ar: 'لا توجد بيانات متاحة' }
```

## 🔧 Implementation Guidelines

### 1. Always Use FontProvider
Wrap your app or component tree with FontProvider to enable language switching:

```tsx
<FontProvider defaultLanguage="en">
  <YourApp />
</FontProvider>
```

### 2. Use Arabic Components
Replace standard components with their Arabic variants:

```tsx
// Instead of Button
<Button variant="primary">Click me</Button>

// Use ButtonArabic
<ButtonArabic 
  variant="primary"
  arabicText="اضغط علي"
  showArabicText={true}
>
  Click me
</ButtonArabic>
```

### 3. Provide Bilingual Text
Always provide both English and Arabic versions of text:

```tsx
<InputArabic
  arabicLabel="اسم المستخدم"
  arabicPlaceholder="أدخل اسم المستخدم"
  arabicHelperText="اسم المستخدم مطلوب"
  showArabicText={true}
>
  Username
</InputArabic>
```

### 4. Test Both Languages
Ensure your components work correctly in both languages:

```tsx
// Test English
<FontProvider defaultLanguage="en">
  <YourComponent />
</FontProvider>

// Test Arabic
<FontProvider defaultLanguage="ar">
  <YourComponent />
</FontProvider>
```

## 📱 Responsive Considerations

### RTL Layout Adjustments
- Grid layouts automatically adjust for RTL
- Flexbox directions consider text direction
- Icon positioning flips appropriately
- Spacing maintains visual balance

### Mobile Support
- Touch interactions work in both directions
- Swipe gestures consider RTL context
- Navigation patterns adapt to language
- Form layouts maintain usability

## ♿ Accessibility

### Screen Reader Support
- Language attributes automatically set
- Direction attributes properly configured
- ARIA labels support both languages
- Focus management works in both directions

### Keyboard Navigation
- Tab order respects RTL layout
- Arrow key navigation adapts to direction
- Shortcut keys work consistently
- Focus indicators maintain visibility

## 🧪 Testing

### Storybook Stories
All Arabic components include comprehensive Storybook stories:

```bash
npm run storybook
```

Navigate to:
- **Foundations > FontProvider** - Language switching demo
- **Components > ButtonArabic** - Arabic button variants
- **Arabic Design System > ArabicShowcase** - Complete system demo

### Manual Testing
1. Switch between English and Arabic
2. Verify RTL layout changes
3. Check font family switching
4. Test component interactions
5. Validate accessibility features

## 🚀 Future Enhancements

### Planned Features
- Additional language support (Hebrew, Persian)
- Advanced RTL layout patterns
- Cultural design adaptations
- Localized date/time formats
- Currency and number formatting

### Component Coverage
- Complete Arabic versions of all components
- Advanced form components
- Data visualization components
- Navigation components
- Layout components

## 📖 Resources

### Font Resources
- [IBM Plex Sans Arabic](https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic)
- [Figtree](https://fonts.google.com/specimen/Figtree)

### RTL Guidelines
- [Material Design RTL](https://material.io/design/usability/bidirectionality.html)
- [MDN RTL Support](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)

### Arabic Typography
- [Arabic Typography Guidelines](https://www.smashingmagazine.com/2015/11/arabic-web-typography/)
- [RTL Best Practices](https://www.w3.org/International/i18n-html-tech-lang.en.html)

## 🤝 Contributing

### Adding New Arabic Components
1. Create the Arabic variant component
2. Add bilingual text support
3. Implement RTL-aware positioning
4. Create comprehensive Storybook stories
5. Update this documentation

### Localization Updates
1. Add new labels to appropriate label files
2. Ensure consistent terminology
3. Test in both languages
4. Update component documentation

---

*This Arabic design system provides a solid foundation for building bilingual, RTL-aware applications with consistent design patterns and excellent user experience.*


