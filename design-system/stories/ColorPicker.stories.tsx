import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker, SimpleColorPicker, AdvancedColorPicker, ThemeColorPicker, useColorPicker } from '../components/ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Forms & Data Entry/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A color picker component for selecting colors with preset options, format display, and customizable appearance.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    format: {
      control: { type: 'select' },
      options: ['hex', 'rgb', 'hsl'],
    },
    showPresets: {
      control: { type: 'boolean' },
    },
    showInput: {
      control: { type: 'boolean' },
    },
    showPreview: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [color, setColor] = React.useState('#3b82f6');

    return (
      <ColorPicker
        value={color}
        onChange={setColor}
        className="w-full max-w-md"
      />
    );
  },
};

export const SimpleColorPickerExample: Story = {
  render: () => {
    const [color, setColor] = React.useState('#ef4444');

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Simple Color Picker</h2>
        <SimpleColorPicker
          value={color}
          onChange={setColor}
        />
      </div>
    );
  },
};

export const AdvancedColorPickerExample: Story = {
  render: () => {
    const [color, setColor] = React.useState('#10b981');

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Advanced Color Picker</h2>
        <AdvancedColorPicker
          value={color}
          onChange={setColor}
        />
      </div>
    );
  },
};

export const ThemeColorPickerExample: Story = {
  render: () => {
    const [color, setColor] = React.useState('#8b5cf6');

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Theme Color Picker</h2>
        <ThemeColorPicker
          value={color}
          onChange={setColor}
        />
      </div>
    );
  },
};

export const WithCustomPresets: Story = {
  render: () => {
    const [color, setColor] = React.useState('#f59e0b');

    const customPresets = [
      '#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00',
      '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff',
      '#ff00ff', '#ff0080', '#ffffff', '#cccccc', '#999999',
      '#666666', '#333333', '#000000'
    ];

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Custom Presets</h2>
        <ColorPicker
          value={color}
          onChange={setColor}
          presetColors={customPresets}
        />
      </div>
    );
  },
};

export const RGBFormat: Story = {
  render: () => {
    const [color, setColor] = React.useState('#dc2626');

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">RGB Format</h2>
        <ColorPicker
          value={color}
          onChange={setColor}
          format="rgb"
        />
      </div>
    );
  },
};

export const HSLFormat: Story = {
  render: () => {
    const [color, setColor] = React.useState('#7c3aed');

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">HSL Format</h2>
        <ColorPicker
          value={color}
          onChange={setColor}
          format="hsl"
        />
      </div>
    );
  },
};

export const WithoutPresets: Story = {
  render: () => {
    const [color, setColor] = React.useState('#059669');

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Without Presets</h2>
        <ColorPicker
          value={color}
          onChange={setColor}
          showPresets={false}
        />
      </div>
    );
  },
};

export const WithoutInput: Story = {
  render: () => {
    const [color, setColor] = React.useState('#f97316');

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Without Input</h2>
        <ColorPicker
          value={color}
          onChange={setColor}
          showInput={false}
        />
      </div>
    );
  },
};

export const WithoutPreview: Story = {
  render: () => {
    const [color, setColor] = React.useState('#ec4899');

    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Without Preview</h2>
        <ColorPicker
          value={color}
          onChange={setColor}
          showPreview={false}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Disabled</h2>
        <ColorPicker
          value="#6b7280"
          onChange={() => {}}
          disabled={true}
        />
      </div>
    );
  },
};

export const ThemeBuilder: Story = {
  render: () => {
    const [primaryColor, setPrimaryColor] = React.useState('#3b82f6');
    const [secondaryColor, setSecondaryColor] = React.useState('#10b981');
    const [accentColor, setAccentColor] = React.useState('#f59e0b');

    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Theme Builder</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Primary Color</h3>
            <ColorPicker
              value={primaryColor}
              onChange={setPrimaryColor}
              format="hex"
            />
            <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: primaryColor }}>
              <p className="text-white font-medium">Primary Button</p>
            </div>
          </div>
          
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Secondary Color</h3>
            <ColorPicker
              value={secondaryColor}
              onChange={setSecondaryColor}
              format="hex"
            />
            <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: secondaryColor }}>
              <p className="text-white font-medium">Secondary Button</p>
            </div>
          </div>
          
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">Accent Color</h3>
            <ColorPicker
              value={accentColor}
              onChange={setAccentColor}
              format="hex"
            />
            <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: accentColor }}>
              <p className="text-white font-medium">Accent Element</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
          <h3 className="font-medium text-neutral-900 mb-2">CSS Variables</h3>
          <pre className="text-sm text-neutral-600 overflow-x-auto">
{`:root {
  --primary-color: ${primaryColor};
  --secondary-color: ${secondaryColor};
  --accent-color: ${accentColor};
}`}
          </pre>
        </div>
      </div>
    );
  },
};

export const ColorPaletteGenerator: Story = {
  render: () => {
    const [baseColor, setBaseColor] = React.useState('#3b82f6');
    const [palette, setPalette] = React.useState<string[]>([]);

    React.useEffect(() => {
      // Generate a simple color palette based on the base color
      const generatePalette = (color: string) => {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        const palette = [];
        for (let i = 0; i < 5; i++) {
          const factor = 1 - (i * 0.2);
          const newR = Math.round(r * factor);
          const newG = Math.round(g * factor);
          const newB = Math.round(b * factor);
          palette.push(`#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`);
        }
        return palette;
      };
      
      setPalette(generatePalette(baseColor));
    }, [baseColor]);

    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Color Palette Generator</h2>
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Base Color
            </label>
            <ColorPicker
              value={baseColor}
              onChange={setBaseColor}
              format="hex"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Generated Palette
            </label>
            <div className="grid grid-cols-5 gap-2">
              {palette.map((color, index) => (
                <div key={index} className="text-center">
                  <div
                    className="w-full h-16 rounded-lg border border-neutral-200 mb-2"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-xs text-neutral-600">{color}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const AccessibilityChecker: Story = {
  render: () => {
    const [backgroundColor, setBackgroundColor] = React.useState('#ffffff');
    const [textColor, setTextColor] = React.useState('#000000');
    const [contrastRatio, setContrastRatio] = React.useState(0);

    React.useEffect(() => {
      // Calculate contrast ratio
      const getLuminance = (color: string) => {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16) / 255;
        const g = parseInt(hex.substr(2, 2), 16) / 255;
        const b = parseInt(hex.substr(4, 2), 16) / 255;
        
        const [rs, gs, bs] = [r, g, b].map(c => {
          if (c <= 0.03928) return c / 12.92;
          return Math.pow((c + 0.055) / 1.055, 2.4);
        });
        
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      };
      
      const l1 = getLuminance(backgroundColor);
      const l2 = getLuminance(textColor);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      setContrastRatio(ratio);
    }, [backgroundColor, textColor]);

    const getAccessibilityLevel = (ratio: number) => {
      if (ratio >= 7) return { level: 'AAA', color: 'text-green-600' };
      if (ratio >= 4.5) return { level: 'AA', color: 'text-yellow-600' };
      return { level: 'Fail', color: 'text-red-600' };
    };

    const accessibility = getAccessibilityLevel(contrastRatio);

    return (
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-neutral-900 mb-6">Accessibility Checker</h2>
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Background Color
              </label>
              <ColorPicker
                value={backgroundColor}
                onChange={setBackgroundColor}
                format="hex"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Text Color
              </label>
              <ColorPicker
                value={textColor}
                onChange={setTextColor}
                format="hex"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Preview
            </label>
            <div
              className="p-4 rounded-lg border border-neutral-200"
              style={{ backgroundColor, color: textColor }}
            >
              <p className="text-lg font-medium">Sample Text</p>
              <p className="text-sm">This is how your text will appear with the selected colors.</p>
            </div>
          </div>
          
          <div className="p-4 bg-neutral-50 rounded-lg">
            <h3 className="font-medium text-neutral-900 mb-2">Accessibility Results</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">Contrast Ratio:</span>
                <span className="text-sm font-medium">{contrastRatio.toFixed(2)}:1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">WCAG Level:</span>
                <span className={`text-sm font-medium ${accessibility.color}`}>
                  {accessibility.level}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-neutral-600">Status:</span>
                <span className={`text-sm font-medium ${accessibility.color}`}>
                  {accessibility.level === 'Fail' ? 'Needs improvement' : 'Pass'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
