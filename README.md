# Wakecap Design System

A component library built with React, TypeScript, Tailwind CSS, and Storybook.

## 🚀 Getting Started

### Prerequisites

This project uses FontAwesome Pro icons. You'll need a FontAwesome Pro license and token.

1. **Set up FontAwesome Pro access:**
   ```bash
   # Copy the npm configuration template
   cp .npmrc.example .npmrc
   
   # Edit .npmrc and replace ${FONTAWESOME_TOKEN} with your actual FontAwesome Pro token
   # Get your token from: https://fontawesome.com/account
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start Storybook:**
   ```bash
   npm run storybook
   ```

### 🔒 Security Note

- Never commit `.npmrc` to version control (it's already in `.gitignore`)
- Keep your FontAwesome Pro token secure and don't share it publicly
- Use environment variables or secure secret management in CI/CD pipelines

## 🚀 GitHub Actions Setup

This project includes automated CI/CD workflows that require the FontAwesome Pro token.

### Setting up GitHub Secrets

1. **Go to your GitHub repository**
2. **Navigate to Settings → Secrets and variables → Actions**
3. **Add a new repository secret:**
   - **Name:** `FONTAWESOME_TOKEN`
   - **Value:** Your FontAwesome Pro token

### Available Workflows

- **CI Workflow** (`.github/workflows/ci.yml`):
  - Runs tests on Node.js 18.x and 20.x
  - Builds and deploys Storybook to GitHub Pages
  - Triggers on push/PR to main/develop branches

- **Security Workflow** (`.github/workflows/security.yml`):
  - Vulnerability scanning with Trivy
  - NPM audit for dependency vulnerabilities  
  - Secret detection with TruffleHog
  - Runs daily and on push/PR events

### GitHub Pages Deployment

The CI workflow automatically deploys Storybook to GitHub Pages when code is pushed to the `main` branch. Make sure to:

1. Enable GitHub Pages in repository settings
2. Set source to "Deploy from a branch"
3. Select the `gh-pages` branch

## 📝 Creating New Components

1. Navigate to `/design-system/prompts/instructions.md`
2. Follow the template to create your component prompt
3. The system will generate:
   - React component with TypeScript
   - Tailwind CSS styling
   - Storybook story with variants and controls

## 🎨 Design Tokens

The design system includes predefined tokens for:
- Colors (primary, secondary)
- Spacing
- Typography
- Border Radius

These tokens are available in the Tailwind configuration and can be used in your components.

## 📚 Component Structure

Each component includes:
- TypeScript types
- Tailwind CSS styling
- Storybook documentation
- Accessibility features
- Responsive design
- **Arabic (RTL) support** with IBM Plex Sans Arabic font

## 🌐 Arabic & RTL Support

The design system provides comprehensive Arabic language support:

### Features
- **Bilingual Components**: All components support both English and Arabic text
- **RTL Layout**: Automatic right-to-left layout for Arabic
- **Font Management**: Figtree (English) + IBM Plex Sans Arabic (Arabic)
- **Icon Positioning**: Automatic icon flipping for RTL layouts
- **Language Switching**: Built-in language switcher component

### Usage
```tsx
// Components automatically support Arabic
<Button 
  variant="primary"
  arabicText="زر أساسي"
  showArabicText={true}
>
  Primary Button
</Button>

<Input
  label="Username"
  arabicLabel="اسم المستخدم"
  arabicPlaceholder="أدخل اسم المستخدم"
  showArabicText={true}
/>
```

### FontProvider
Wrap your app with FontProvider to enable language switching:
```tsx
<FontProvider defaultLanguage="en">
  <App />
</FontProvider>
```

## 🛠️ Tech Stack

- React
- TypeScript
- Tailwind CSS
- Storybook
- Lucide Icons

## 📖 Documentation

For detailed documentation on creating components and using the design system, refer to:
- `/design-system/prompts/instructions.md`
- Storybook documentation for each component 