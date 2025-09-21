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
  },

  globalTypes: {
    measureEnabled: {
      name: 'Measure',
      description: 'Enable measure addon',
      defaultValue: false,
      toolbar: {
        icon: 'ruler',
        items: [
          { value: false, title: 'Disable' },
          { value: true, title: 'Enable' },
        ],
      },
    },
    backgrounds: {
      name: 'Background',
      description: 'Background color',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'neutral', title: 'Neutral' },
        ],
      },
    },
    outline: {
      name: 'Outline',
      description: 'Show outline',
      defaultValue: false,
      toolbar: {
        icon: 'outline',
        items: [
          { value: false, title: 'Hide' },
          { value: true, title: 'Show' },
        ],
      },
    },
    viewport: {
      name: 'Viewport',
      description: 'Viewport size',
      defaultValue: 'desktop',
      toolbar: {
        icon: 'mobile',
        items: [
          { value: 'desktop', title: 'Desktop' },
          { value: 'tablet', title: 'Tablet' },
          { value: 'mobile', title: 'Mobile' },
        ],
      },
    },
  },

  tags: ['autodocs']
};

export default preview; 