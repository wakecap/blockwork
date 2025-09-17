# Component Generation Instructions

## How to Create New Components

To create a new component, follow this template for your prompt:

```
Create a [component-name] component with:
- Variants: [list variants]
- Props: [list props]
- States: [list states]
- Optional: [any additional requirements]
```

### Example Prompts

1. Basic Button:
```
Create a button component with:
- Variants: primary, secondary, outline
- Props: size (sm, md, lg), disabled
- States: default, hover, focus, disabled
```

2. Card with Icon:
```
Create a card component with:
- Variants: default, elevated, interactive
- Props: title, description, icon (from Lucide)
- States: default, hover
- Optional: Add shadow on hover for interactive variant
```

3. Input Field:
```
Create an input component with:
- Variants: default, error, success
- Props: label, placeholder, type (text, password, email)
- States: default, focus, error, success
- Optional: Add validation message
```

## Component Structure

Each generated component will include:
1. Component file in `/design-system/components/`
2. Story file in `/design-system/stories/`
3. TypeScript types (if applicable)
4. Tailwind CSS styling using design tokens

## Design Tokens

The following design tokens are available:
- Colors: primary, secondary (with shades 50-900)
- Spacing: 4xs to 4xl
- Typography: xs to 4xl
- Border Radius: none to full

## Best Practices

1. Use semantic HTML elements
2. Follow accessibility guidelines
3. Use design tokens for consistency
4. Include proper TypeScript types
5. Add comprehensive Storybook documentationGeneral
6. Include hover and focus states
7. Consider mobile responsiveness 