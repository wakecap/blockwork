# Storybook Assets

This directory contains all static assets for the Storybook design system.

## Directory Structure

```
assets/
├── images/          # Image assets (PNG, JPG, etc.)
│   ├── banner.png
│   ├── blockwork-logo.png
│   └── logo.png
├── icons/           # Icon assets (SVG, ICO, etc.)
│   ├── favicon.ico
│   └── Logo-Vector.svg
├── fonts/           # Font files (WOFF, WOFF2, TTF, etc.)
└── styles/          # CSS files
    └── sidebar.css
```

## Usage in Storybook

Assets in this directory are automatically served by Storybook and will be available at:

- **Local Development**: `http://localhost:6006/assets/images/logo.png`
- **GitHub Pages**: `https://yourusername.github.io/your-repo/assets/images/logo.png`

## Adding New Assets

1. **Images**: Place in `assets/images/`
2. **Icons**: Place in `assets/icons/`
3. **Fonts**: Place in `assets/fonts/`
4. **Styles**: Place in `assets/styles/`

## File Naming Conventions

- Use kebab-case for file names: `my-asset.png`
- Use descriptive names: `button-primary-icon.svg`
- Keep file sizes optimized for web delivery
