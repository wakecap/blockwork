import './preview.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
      },
      defaultViewport: 'desktop',
    },
    layout: 'padded',
    docs: {
      canvas: {
        sourceState: 'shown',
      },
    },
    // Custom branding and theming
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#171717',
        },
        {
          name: 'neutral',
          value: '#f5f5f5',
        },
      ],
    },
    // Custom theme configuration
    theme: {
      brandTitle: 'Blockwork',
      brandUrl: 'https://github.com/wakecap/blockwork',
      brandImage: './blockwork-logo.svg',
      brandTarget: '_self',
    },
  },
};

export default preview; 