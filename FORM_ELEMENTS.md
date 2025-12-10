# Blockwork UI - Component Library Documentation

> Comprehensive guide to available and planned components in the Blockwork UI design system

**Last Updated:** 2025-12-10
**Version:** 1.0.2

---

## Table of Contents

- [Available Components](#available-components)
  - [Navigation & UI Components](#navigation--ui-components)
  - [Input Fields](#input-fields)
  - [Selection Controls](#selection-controls)
  - [Specialized Inputs](#specialized-inputs)
  - [Form Layout & Organization](#form-layout--organization)
- [Missing Form Elements (Roadmap)](#missing-form-elements-roadmap)
  - [Essential Form Elements](#essential-form-elements)
  - [Construction-Specific Components](#construction-specific-components)
  - [Nice-to-Have Enhancements](#nice-to-have-enhancements)
- [Implementation Priority](#implementation-priority)

---

## Available Components

**Total: 26 production-ready components** (6 Navigation/UI + 20 Form components)

All components include:
- ✅ Full TypeScript support
- ✅ Arabic/RTL support with IBM Plex Sans Arabic font
- ✅ Tailwind CSS styling with design tokens
- ✅ Accessibility features (ARIA labels, keyboard navigation)
- ✅ Error states and validation support
- ✅ Responsive design (mobile-first)

### Navigation & UI Components

| Component | Description | Location | Status |
|-----------|-------------|----------|--------|
| **TopNavigator** | Top navigation bar with project selector, menu dropdown, and pinned items | `src/design-system/components/TopNavigator/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **Button** | Versatile button with 14 variants, 11 sizes, icon support, and loading states | `src/design-system/components/Button/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **Avatar** | User avatar with sizes, status indicators, and fallback support | `src/design-system/components/Avatar/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **Badge** | Label/status badge with 7 variants and 3 sizes | `src/design-system/components/Badge/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **EmptyState** | Empty state display with customizable icons and actions | `src/design-system/components/EmptyState/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **PageLoading** | Full-screen loading with WakeCap logo animation | `src/design-system/components/PageLoading/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |

### Input Fields

| Component | Description | Location | Status |
|-----------|-------------|----------|--------|
| **Input** | Standard text input field with variants | `src/design-system/components/Input/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **PasswordInput** | Password field with show/hide toggle | `src/design-system/components/PasswordInput/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **SearchInput** | Search field with icon and clear functionality | `src/design-system/components/SearchInput/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **TextArea** | Multi-line text input with auto-resize | `src/design-system/components/TextArea/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **OTPInput** | One-time password input (multiple digit fields) | `src/design-system/components/OTPInput/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |

### Selection Controls

| Component | Description | Location | Status |
|-----------|-------------|----------|--------|
| **Dropdown** | Standard select dropdown with options | `src/design-system/components/Dropdown/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **Autocomplete** | Searchable dropdown with filtering | `src/design-system/components/Autocomplete/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **MultiSelect** | Multi-selection dropdown | `src/design-system/components/MultiSelect/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **Checkbox** | Single or grouped checkboxes | `src/design-system/components/Checkbox/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **Radio** | Radio button groups | `src/design-system/components/Radio/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **Toggler** | Toggle/switch control | `src/design-system/components/Toggler/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |

### Specialized Inputs

| Component | Description | Location | Status |
|-----------|-------------|----------|--------|
| **Button** | Form submission and actions (14 variants, 11 sizes) | `src/design-system/components/Button/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **Calendar** | Date picker calendar component | `src/design-system/components/Calendar/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **ColorPicker** | Color selection input | `src/design-system/components/ColorPicker/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **Slider** | Range/value slider | `src/design-system/components/Slider/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **RatingStars** | Star rating input | `src/design-system/components/RatingStars/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **FileUpload** | File upload with drag & drop | `src/design-system/components/FileUpload/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **SignatureInput** | Digital signature capture | `src/design-system/components/SignatureInput/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |
| **RichTextEditor** | WYSIWYG text editor | `src/design-system/components/RichTextEditor/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |

### Form Layout & Organization

| Component | Description | Location | Status |
|-----------|-------------|----------|--------|
| **FormLayout** | Form structure with groups, sections, and fields | `src/design-system/components/FormLayout/` | ✅ Available<br/>✅ Exported<br/>✅ MCP Exposed<br/>✅ Storybook |

---

## Missing Form Elements (Roadmap)

Components that should be introduced to make Blockwork UI a complete form solution.

### Essential Form Elements

#### Date & Time Components

| Component | Description | Priority | Use Case |
|-----------|-------------|----------|----------|
| **DatePicker** | Complete date picker with input field + calendar dropdown | 🔴 High | Project start dates, deadlines, scheduling |
| **DateRangePicker** | Select start and end dates | 🔴 High | Project timelines, shift schedules, equipment rental periods |
| **TimePicker** | Time selection (hours, minutes, AM/PM) | 🔴 High | Shift times, clock-in/out, meeting schedules |
| **DateTimePicker** | Combined date + time picker | 🟡 Medium | Precise event scheduling, delivery windows |

**Note:** Calendar component exists but lacks input field integration for complete DatePicker functionality.

#### Numeric & Formatted Inputs

| Component | Description | Priority | Use Case |
|-----------|-------------|----------|----------|
| **NumberInput** | Number input with increment/decrement spinners | 🔴 High | Quantities, counts, measurements |
| **CurrencyInput** | Currency formatting with locale support | 🟡 Medium | Budget, costs, invoices, payroll |
| **PhoneInput** | Phone number with country code selector | 🔴 High | Contact forms, worker registration, emergency contacts |
| **MaskInput** | Pattern-based input (credit card, SSN, custom formats) | 🟡 Medium | ID numbers, permit numbers, license plates |

#### Advanced Selection Controls

| Component | Description | Priority | Use Case |
|-----------|-------------|----------|----------|
| **TagInput/ChipInput** | Create and manage multiple tags/chips | 🔴 High | Skills, equipment tags, project labels, hazard types |
| **Combobox** | Editable dropdown (hybrid of Input + Select) | 🔴 High | Material search, vendor selection with custom entry |
| **TreeSelect** | Hierarchical/nested options selection | 🟡 Medium | Organization structure, location hierarchy, equipment categories |
| **CascaderSelect** | Cascading dropdown (country → state → city) | 🟡 Medium | Location selection, category → subcategory |
| **Transfer/DualList** | Move items between two lists | 🟢 Low | Assigning workers to teams, equipment allocation |
| **SegmentedControl** | Inline option selector (alternative to radio) | 🟡 Medium | View modes, filter options, quick toggles |
| **RadioCards/CheckboxCards** | Card-based selection with visual content | 🟡 Medium | Equipment type selection, service plans, inspection templates |

#### Form Structure & Validation

| Component | Description | Priority | Use Case |
|-----------|-------------|----------|----------|
| **FormField** | Generic wrapper with label, error, help text, required indicator | 🔴 High | Consistent form field styling and structure |
| **FieldArray** | Dynamic field management (add/remove fields) | 🟡 Medium | Multiple workers, equipment lists, task lists |
| **FormWizard/MultiStep** | Step-by-step form navigation | 🟡 Medium | Worker onboarding, project setup, incident reporting |

---

### Construction-Specific Components

**High Priority for WakeCap's construction/workforce management use cases**

| Component | Description | Priority | Use Case |
|-----------|-------------|----------|----------|
| **LocationPicker** | GPS/map-based location selection | 🔴 High | Construction site locations, geo-fencing, worker check-in |
| **ImageCapture** | Camera integration for site photos | 🔴 High | Site documentation, progress photos, incident reports, safety inspections |
| **VoiceRecorder** | Voice notes recording | 🟡 Medium | Site inspections, verbal reports, notes for illiterate workers |
| **UnitInput** | Numeric input with unit selector (m, kg, L, etc.) | 🔴 High | Material quantities, measurements, distances, weights |
| **QRScanner** | QR code scanning for assets | 🔴 High | Equipment tracking, attendance, material verification |
| **EquipmentSelector** | Specialized picker for construction equipment/assets | 🟡 Medium | Equipment allocation, maintenance requests |
| **TimeTracker** | Clock-in/out or duration tracking | 🔴 High | Worker attendance, time sheets, shift tracking |

**Why Construction-Specific?**
- WakeCap serves construction and workforce management
- Many workers in construction have limited literacy → voice/image inputs critical
- Field-based work requires location, QR scanning, and measurement inputs
- Time tracking and attendance are core to workforce management

---

### Nice-to-Have Enhancements

| Component | Description | Priority | Use Case |
|-----------|-------------|----------|----------|
| **MentionInput** | @mention users in comments/notes | 🟢 Low | Team communication, task assignments, notifications |
| **CodeEditor** | Technical documentation or configuration | 🟢 Low | API integration, custom scripts, configuration files |
| **AttachmentList** | Multiple file attachment manager | 🟡 Medium | Document management, compliance files, certifications |
| **RangeSlider** | Two-handle slider for min/max ranges | 🟢 Low | Price filters, date ranges, measurement ranges |
| **ButtonGroup** | Grouped buttons for mutually exclusive selections | 🟡 Medium | Toolbar actions, view switchers, format toggles |

---

## Implementation Priority

### Phase 1: Core Form Elements (High Priority)

**Essential for complete form functionality:**

1. ✅ **DatePicker** - Most requested form component
2. ✅ **DateRangePicker** - Critical for project timelines
3. ✅ **TimePicker** - Shift scheduling, appointments
4. ✅ **NumberInput** - Quantities and measurements
5. ✅ **PhoneInput** - Contact information
6. ✅ **TagInput** - Skills, labels, categories
7. ✅ **FormField** - Consistent form structure
8. ✅ **Combobox** - Flexible search + select

**Estimated Effort:** 4-6 weeks (1 developer)

---

### Phase 2: Construction-Specific (High Priority for WakeCap)

**Critical for construction/workforce management:**

1. ✅ **LocationPicker/MapPicker** - Site location selection
2. ✅ **ImageCapture** - Site photos, documentation
3. ✅ **UnitInput** - Measurements with units
4. ✅ **QRScanner** - Equipment/attendance tracking
5. ✅ **TimeTracker** - Clock-in/out, time sheets

**Estimated Effort:** 3-4 weeks (1 developer)

---

### Phase 3: Advanced Selection (Medium Priority)

**Enhanced selection capabilities:**

1. ✅ **TreeSelect** - Hierarchical data
2. ✅ **SegmentedControl** - Inline options
3. ✅ **MaskInput** - Formatted inputs
4. ✅ **CurrencyInput** - Financial data
5. ✅ **FieldArray** - Dynamic fields
6. ✅ **FormWizard** - Multi-step forms

**Estimated Effort:** 4-5 weeks (1 developer)

---

### Phase 4: Nice-to-Have (Low Priority)

**Enhancements and specialized components:**

1. ✅ **MentionInput** - Team communication
2. ✅ **VoiceRecorder** - Voice notes
3. ✅ **AttachmentList** - File management
4. ✅ **RangeSlider** - Min/max selection
5. ✅ **ButtonGroup** - Grouped actions
6. ✅ **RadioCards/CheckboxCards** - Visual selection
7. ✅ **CascaderSelect** - Cascading options
8. ✅ **Transfer/DualList** - List management
9. ✅ **EquipmentSelector** - Asset selection

**Estimated Effort:** 5-6 weeks (1 developer)

---

## Component Design Principles

All form components should follow these principles:

### Consistency
- Follow existing Button component pattern (14 variants, 11 sizes)
- Use CVA (class-variance-authority) for variant management
- Consistent prop naming across all components

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatible (ARIA labels)
- Focus management
- Touch-friendly (44px minimum touch targets)

### Internationalization
- Full RTL/Arabic support with automatic layout flipping
- IBM Plex Sans Arabic font for Arabic text
- English: Figtree font family
- Language-aware validation messages

### Validation
- Built-in error state styling
- `error` prop for error messages
- `required` prop with visual indicator
- `disabled` state support
- Custom validation support

### Responsive Design
- Mobile-first approach
- Touch-optimized for construction site tablets
- Adaptive sizing based on screen size
- Full-width on mobile option

### Performance
- Tree-shakable exports
- Minimal bundle size impact
- Lazy loading for heavy components (RichTextEditor, MapPicker)
- Efficient re-renders

---

## Design Tokens

All form components use the following design tokens from `tailwind.config.js`:

### Colors
- **Primary:** Orange scale (50-950) for accents, focus states
- **Semantic:** success, error, warning, info for validation
- **Neutrals:** gray scale for borders, backgrounds

### Typography
- **Scale:** xs to 9xl with line-height and letter-spacing
- **Fonts:** Figtree (English), IBM Plex Sans Arabic (Arabic)

### Spacing
- **8pt grid system:** 0 to 96 (0px to 384px)

### Border Radius
- **xs:** 2px (inputs, buttons)
- **sm:** 4px
- **md:** 6px (default for most form elements)
- **lg:** 8px

### Shadows
- **xs/sm:** Subtle elevation for inputs
- **md:** Dropdowns, popovers
- **elevation-1 to elevation-5:** Layered components

### Motion
- **Durations:** fast (150ms), base (250ms), slow (350ms)
- **Easings:** ease-out-expo, ease-in-out-quart

---

## Usage Examples

### Importing Form Components

```typescript
// Main entry (simple import)
import { Button, Input, Checkbox } from "@wakecap/blockwork-ui";

// Component-specific (tree-shaking)
import { Button } from "@wakecap/blockwork-ui/components/Button";
import { Input } from "@wakecap/blockwork-ui/components/Input";
```

### Basic Form Example

```tsx
import { Button, Input, Checkbox, FormLayout } from "@wakecap/blockwork-ui";

function WorkerRegistrationForm() {
  return (
    <form>
      <Input
        label="Worker Name"
        placeholder="Enter full name"
        required
        error={errors.name}
      />

      <Input
        type="email"
        label="Email"
        placeholder="worker@example.com"
      />

      <PhoneInput // ⚠️ Not yet available
        label="Phone Number"
        value={phone}
        onChange={setPhone}
        defaultCountry="SA"
      />

      <Checkbox
        label="I agree to the terms and conditions"
        checked={agreed}
        onChange={setAgreed}
      />

      <Button
        type="submit"
        variant="primary"
        fullWidth
      >
        Register Worker
      </Button>
    </form>
  );
}
```

---

## Export Status

### Currently Exported (2 components)

| Component | Main Entry | Tree-Shakable | MCP Server | Package.json | Vite Config |
|-----------|------------|---------------|------------|--------------|-------------|
| **TopNavigator** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Button** | ✅ | ✅ | ✅ | ✅ | ✅ |

### Not Yet Exported (18 form components)

All other form components exist in the codebase but are **not yet exported** from the library. To export a component, follow the TopNavigator/Button pattern:

1. Export from `src/design-system/index.ts`
2. Add build entry in `vite.config.ts`
3. Update `package.json` exports and typesVersions
4. Register in `mcp/server/src/server.ts`
5. Rebuild: `npm run build && npm run mcp:build`

---

## Contributing

To add a new form component:

1. Create component in `src/design-system/components/[ComponentName]/`
2. Follow TypeScript + Tailwind CSS patterns
3. Implement Arabic/RTL support
4. Add Storybook story
5. Export following the established pattern
6. Update this documentation

See `CLAUDE.md` for detailed development workflow.

---

## References

- **Design System:** [Storybook](https://wakecap.github.io/blockwork/)
- **MCP Server:** `mcp/README.md`
- **Component Pattern:** See `Button.tsx` and `TopNavigator.tsx`
- **Design Tokens:** `tailwind.config.js`
