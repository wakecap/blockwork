import React from 'react';

// Color Showcase Component
export const ColorPalette: React.FC = () => {
  const colorSections = [
    {
      title: 'Primary Colors (Neutrals - Black)',
      colors: [
        { name: 'neutral-50', value: '#fafafa', class: 'bg-neutral-50' },
        { name: 'neutral-100', value: '#f5f5f5', class: 'bg-neutral-100' },
        { name: 'neutral-200', value: '#e5e5e5', class: 'bg-neutral-200' },
        { name: 'neutral-300', value: '#d4d4d4', class: 'bg-neutral-300' },
        { name: 'neutral-400', value: '#a3a3a3', class: 'bg-neutral-400' },
        { name: 'neutral-500', value: '#737373', class: 'bg-neutral-500' },
        { name: 'neutral-600', value: '#525252', class: 'bg-neutral-600' },
        { name: 'neutral-700', value: '#404040', class: 'bg-neutral-700' },
        { name: 'neutral-800', value: '#262626', class: 'bg-neutral-800' },
        { name: 'neutral-900', value: '#171717', class: 'bg-neutral-900' },
        { name: 'neutral-950', value: '#0a0a0a', class: 'bg-neutral-950' },
      ],
    },
    {
      title: 'Accent Colors (Orange)',
      colors: [
        { name: 'orange-50', value: '#fff7ed', class: 'bg-orange-50' },
        { name: 'orange-100', value: '#ffedd5', class: 'bg-orange-100' },
        { name: 'orange-200', value: '#fed7aa', class: 'bg-orange-200' },
        { name: 'orange-300', value: '#fdba74', class: 'bg-orange-300' },
        { name: 'orange-400', value: '#fb923c', class: 'bg-orange-400' },
        { name: 'orange-500', value: '#f97316', class: 'bg-orange-500' },
        { name: 'orange-600', value: '#ea580c', class: 'bg-orange-600' },
        { name: 'orange-700', value: '#c2410c', class: 'bg-orange-700' },
        { name: 'orange-800', value: '#9a3412', class: 'bg-orange-800' },
        { name: 'orange-900', value: '#7c2d12', class: 'bg-orange-900' },
        { name: 'orange-950', value: '#431407', class: 'bg-orange-950' },
      ],
    },
    {
      title: 'Semantic Colors (Tailwind)',
      colors: [
        { name: 'green-500', value: '#22c55e', class: 'bg-green-500' },
        { name: 'red-500', value: '#ef4444', class: 'bg-red-500' },
        { name: 'yellow-500', value: '#eab308', class: 'bg-yellow-500' },
        { name: 'blue-500', value: '#3b82f6', class: 'bg-blue-500' },
        { name: 'purple-500', value: '#a855f7', class: 'bg-purple-500' },
        { name: 'pink-500', value: '#ec4899', class: 'bg-pink-500' },
        { name: 'indigo-500', value: '#6366f1', class: 'bg-indigo-500' },
        { name: 'cyan-500', value: '#06b6d4', class: 'bg-cyan-500' },
      ],
    },
    {
      title: 'shadcn/ui CSS Variables',
      colors: [
        { name: 'background', value: 'hsl(var(--background))', class: 'bg-background' },
        { name: 'foreground', value: 'hsl(var(--foreground))', class: 'bg-foreground' },
        { name: 'primary', value: 'hsl(var(--primary))', class: 'bg-primary' },
        { name: 'primary-foreground', value: 'hsl(var(--primary-foreground))', class: 'bg-primary-foreground' },
        { name: 'secondary', value: 'hsl(var(--secondary))', class: 'bg-secondary' },
        { name: 'secondary-foreground', value: 'hsl(var(--secondary-foreground))', class: 'bg-secondary-foreground' },
        { name: 'muted', value: 'hsl(var(--muted))', class: 'bg-muted' },
        { name: 'muted-foreground', value: 'hsl(var(--muted-foreground))', class: 'bg-muted-foreground' },
        { name: 'accent', value: 'hsl(var(--accent))', class: 'bg-accent' },
        { name: 'accent-foreground', value: 'hsl(var(--accent-foreground))', class: 'bg-accent-foreground' },
        { name: 'destructive', value: 'hsl(var(--destructive))', class: 'bg-destructive' },
        { name: 'destructive-foreground', value: 'hsl(var(--destructive-foreground))', class: 'bg-destructive-foreground' },
        { name: 'border', value: 'hsl(var(--border))', class: 'bg-border' },
        { name: 'input', value: 'hsl(var(--input))', class: 'bg-input' },
        { name: 'ring', value: 'hsl(var(--ring))', class: 'bg-ring' },
        { name: 'card', value: 'hsl(var(--card))', class: 'bg-card' },
        { name: 'card-foreground', value: 'hsl(var(--card-foreground))', class: 'bg-card-foreground' },
        { name: 'popover', value: 'hsl(var(--popover))', class: 'bg-popover' },
        { name: 'popover-foreground', value: 'hsl(var(--popover-foreground))', class: 'bg-popover-foreground' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {colorSections.map((section) => (
        <div key={section.title}>
          <h3 className="text-lg font-semibold mb-4 text-foreground">{section.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {section.colors.map((color) => (
              <div key={color.name} className="flex flex-col">
                <div
                  className={`h-16 w-full rounded-lg border border-border ${color.class}`}
                />
                <div className="mt-2 text-sm">
                  <div className="font-medium text-foreground">{color.name}</div>
                  <div className="text-muted-foreground font-mono text-xs">{color.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Typography Showcase Component
export const TypographyScale: React.FC = () => {
  const typographySizes = [
    { name: 'text-xs', size: '12px', lineHeight: '16px', class: 'text-xs' },
    { name: 'text-sm', size: '14px', lineHeight: '20px', class: 'text-sm' },
    { name: 'text-base', size: '16px', lineHeight: '24px', class: 'text-base' },
    { name: 'text-lg', size: '18px', lineHeight: '28px', class: 'text-lg' },
    { name: 'text-xl', size: '20px', lineHeight: '30px', class: 'text-xl' },
    { name: 'text-2xl', size: '24px', lineHeight: '32px', class: 'text-2xl' },
    { name: 'text-3xl', size: '30px', lineHeight: '36px', class: 'text-3xl' },
    { name: 'text-4xl', size: '36px', lineHeight: '40px', class: 'text-4xl' },
    { name: 'text-5xl', size: '48px', lineHeight: '48px', class: 'text-5xl' },
    { name: 'text-6xl', size: '60px', lineHeight: '60px', class: 'text-6xl' },
  ];

  const fontWeights = [
    { name: 'font-light', weight: '300', class: 'font-light' },
    { name: 'font-normal', weight: '400', class: 'font-normal' },
    { name: 'font-medium', weight: '500', class: 'font-medium' },
    { name: 'font-semibold', weight: '600', class: 'font-semibold' },
    { name: 'font-bold', weight: '700', class: 'font-bold' },
    { name: 'font-extrabold', weight: '800', class: 'font-extrabold' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Font Sizes</h3>
        <div className="space-y-4">
          {typographySizes.map((type) => (
            <div key={type.name} className="flex items-baseline gap-4 pb-2 border-b border-border">
              <div className="w-20 text-sm font-mono text-muted-foreground">{type.name}</div>
              <div className="flex-1">
                <div className={`${type.class} text-foreground font-normal`}>
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                {type.size} / {type.lineHeight}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Font Weights</h3>
        <div className="space-y-3">
          {fontWeights.map((weight) => (
            <div key={weight.name} className="flex items-center gap-4 pb-2 border-b border-border">
              <div className="w-32 text-sm font-mono text-muted-foreground">{weight.name}</div>
              <div className={`text-lg ${weight.class} text-foreground`}>
                The quick brown fox jumps over the lazy dog
              </div>
              <div className="text-xs text-muted-foreground font-mono">{weight.weight}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Font Families</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-4 pb-2 border-b border-border">
            <div className="w-32 text-sm font-mono text-muted-foreground">font-sans</div>
            <div className="text-lg font-sans text-foreground">
              The quick brown fox jumps over the lazy dog
            </div>
            <div className="text-xs text-muted-foreground">Figtree, sans-serif</div>
          </div>
          <div className="flex items-center gap-4 pb-2 border-b border-border">
            <div className="w-32 text-sm font-mono text-muted-foreground">font-arabic</div>
            <div className="text-lg font-arabic text-foreground">
              النص السريع البني يقفز فوق الكلب الكسول
            </div>
            <div className="text-xs text-muted-foreground">IBM Plex Sans Arabic, sans-serif</div>
          </div>
          <div className="flex items-center gap-4 pb-2 border-b border-border">
            <div className="w-32 text-sm font-mono text-muted-foreground">font-mono</div>
            <div className="text-lg font-mono text-foreground">
              The quick brown fox jumps over the lazy dog
            </div>
            <div className="text-xs text-muted-foreground">SF Mono, Consolas</div>
          </div>
          <div className="flex items-center gap-4 pb-2 border-b border-border">
            <div className="w-32 text-sm font-mono text-muted-foreground">font-serif</div>
            <div className="text-lg font-serif text-foreground">
              The quick brown fox jumps over the lazy dog
            </div>
            <div className="text-xs text-muted-foreground">Georgia, serif</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Spacing Scale Component
export const SpacingScale: React.FC = () => {
  const spacingSizes = [
    { name: 'space-0.5', size: '2px', class: 'w-0.5' },
    { name: 'space-1', size: '4px', class: 'w-1' },
    { name: 'space-1.5', size: '6px', class: 'w-1.5' },
    { name: 'space-2', size: '8px', class: 'w-2' },
    { name: 'space-3', size: '12px', class: 'w-3' },
    { name: 'space-4', size: '16px', class: 'w-4' },
    { name: 'space-5', size: '20px', class: 'w-5' },
    { name: 'space-6', size: '24px', class: 'w-6' },
    { name: 'space-8', size: '32px', class: 'w-8' },
    { name: 'space-10', size: '40px', class: 'w-10' },
    { name: 'space-12', size: '48px', class: 'w-12' },
    { name: 'space-16', size: '64px', class: 'w-16' },
    { name: 'space-20', size: '80px', class: 'w-20' },
    { name: 'space-24', size: '96px', class: 'w-24' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Spacing Scale (8pt Grid)</h3>
      <div className="space-y-3">
        {spacingSizes.map((spacing) => (
          <div key={spacing.name} className="flex items-center gap-4">
            <div className="w-24 text-sm font-mono text-muted-foreground">{spacing.name}</div>
            <div className={`h-4 bg-primary ${spacing.class}`} />
            <div className="text-sm text-muted-foreground">{spacing.size}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Elevation/Shadow Component
export const ElevationScale: React.FC = () => {
  const elevations = [
    { name: 'shadow-xs', class: 'shadow-xs' },
    { name: 'shadow-sm', class: 'shadow-sm' },
    { name: 'shadow', class: 'shadow' },
    { name: 'shadow-md', class: 'shadow-md' },
    { name: 'shadow-lg', class: 'shadow-lg' },
    { name: 'shadow-xl', class: 'shadow-xl' },
    { name: 'shadow-2xl', class: 'shadow-2xl' },
  ];

  const customElevations = [
    { name: 'elevation-1', class: 'shadow-elevation-1' },
    { name: 'elevation-2', class: 'shadow-elevation-2' },
    { name: 'elevation-3', class: 'shadow-elevation-3' },
    { name: 'elevation-4', class: 'shadow-elevation-4' },
    { name: 'elevation-5', class: 'shadow-elevation-5' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Standard Shadows</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {elevations.map((elevation) => (
            <div key={elevation.name} className="space-y-2">
              <div className={`h-20 bg-card rounded-lg border border-border ${elevation.class} flex items-center justify-center`}>
                <span className="text-sm font-mono text-muted-foreground">{elevation.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Material Design Elevations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customElevations.map((elevation) => (
            <div key={elevation.name} className="space-y-2">
              <div className={`h-20 bg-card rounded-lg ${elevation.class} flex items-center justify-center`}>
                <span className="text-sm font-mono text-muted-foreground">{elevation.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Border Radius Component
export const BorderRadiusScale: React.FC = () => {
  const borderRadii = [
    { name: 'rounded-none', size: '0px', class: 'rounded-none' },
    { name: 'rounded-xs', size: '2px', class: 'rounded-xs' },
    { name: 'rounded-sm', size: '4px', class: 'rounded-sm' },
    { name: 'rounded', size: '6px', class: 'rounded' },
    { name: 'rounded-md', size: '8px', class: 'rounded-md' },
    { name: 'rounded-lg', size: '12px', class: 'rounded-lg' },
    { name: 'rounded-xl', size: '16px', class: 'rounded-xl' },
    { name: 'rounded-2xl', size: '24px', class: 'rounded-2xl' },
    { name: 'rounded-3xl', size: '32px', class: 'rounded-3xl' },
    { name: 'rounded-full', size: '9999px', class: 'rounded-full' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Border Radius Scale</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {borderRadii.map((radius) => (
          <div key={radius.name} className="space-y-2">
            <div className={`h-16 w-full bg-accent border-2 border-primary ${radius.class} flex items-center justify-center`}>
              <span className="text-xs font-mono text-primary">{radius.name}</span>
            </div>
            <div className="text-xs text-center text-muted-foreground">{radius.size}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Breakpoints Component
export const BreakpointScale: React.FC = () => {
  const breakpoints = [
    { name: 'xs', size: '475px', description: 'Extra small devices' },
    { name: 'sm', size: '640px', description: 'Small devices (phones)' },
    { name: 'md', size: '768px', description: 'Medium devices (tablets)' },
    { name: 'lg', size: '1024px', description: 'Large devices (laptops)' },
    { name: 'xl', size: '1280px', description: 'Extra large devices (desktops)' },
    { name: '2xl', size: '1536px', description: 'Extra extra large devices' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Responsive Breakpoints</h3>
      <div className="space-y-3">
        {breakpoints.map((breakpoint) => (
          <div key={breakpoint.name} className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-4">
              <div className="text-sm font-mono font-semibold text-primary">{breakpoint.name}</div>
              <div className="text-sm text-foreground">{breakpoint.description}</div>
            </div>
            <div className="text-sm font-mono text-muted-foreground">{breakpoint.size}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Z-Index Scale Component
export const ZIndexScale: React.FC = () => {
  const zIndexValues = [
    { name: 'z-hide', value: '-1', usage: 'Hidden elements' },
    { name: 'z-base', value: '0', usage: 'Base level' },
    { name: 'z-docked', value: '10', usage: 'Docked elements' },
    { name: 'z-dropdown', value: '1000', usage: 'Dropdown menus' },
    { name: 'z-sticky', value: '1100', usage: 'Sticky elements' },
    { name: 'z-banner', value: '1200', usage: 'Site banners' },
    { name: 'z-overlay', value: '1300', usage: 'Overlays' },
    { name: 'z-modal', value: '1400', usage: 'Modal dialogs' },
    { name: 'z-popover', value: '1500', usage: 'Popovers' },
    { name: 'z-skipLink', value: '1600', usage: 'Skip links' },
    { name: 'z-toast', value: '1700', usage: 'Toast notifications' },
    { name: 'z-tooltip', value: '1800', usage: 'Tooltips' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Z-Index Scale</h3>
      <div className="space-y-2">
        {zIndexValues.map((zIndex) => (
          <div key={zIndex.name} className="flex items-center justify-between p-3 bg-muted rounded border">
            <div className="flex items-center gap-4">
              <div className="text-sm font-mono font-semibold text-primary w-24">{zIndex.name}</div>
              <div className="text-sm text-foreground">{zIndex.usage}</div>
            </div>
            <div className="text-sm font-mono text-muted-foreground">{zIndex.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Motion & Animation Component
export const MotionTokens: React.FC = () => {
  const [isAnimating, setIsAnimating] = React.useState(false);

  const durations = [
    { name: 'duration-fast', value: '150ms', class: 'duration-fast' },
    { name: 'duration-base', value: '250ms', class: 'duration-base' },
    { name: 'duration-slow', value: '350ms', class: 'duration-slow' },
    { name: 'duration-slower', value: '500ms', class: 'duration-slower' },
  ];

  const easings = [
    { name: 'ease-out-quart', class: 'ease-out-quart' },
    { name: 'ease-in-quart', class: 'ease-in-quart' },
    { name: 'ease-in-out-quart', class: 'ease-in-out-quart' },
    { name: 'ease-out-expo', class: 'ease-out-expo' },
  ];

  const animations = [
    { name: 'animate-fade-in', class: 'animate-fade-in' },
    { name: 'animate-slide-in-from-top', class: 'animate-slide-in-from-top' },
    { name: 'animate-slide-in-from-bottom', class: 'animate-slide-in-from-bottom' },
    { name: 'animate-scale-in', class: 'animate-scale-in' },
    { name: 'animate-pulse', class: 'animate-pulse' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Duration Tokens</h3>
        <div className="space-y-3">
          {durations.map((duration) => (
            <div key={duration.name} className="flex items-center gap-4">
              <div className="w-32 text-sm font-mono text-muted-foreground">{duration.name}</div>
              <div className="text-sm text-muted-foreground">{duration.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Easing Functions</h3>
        <div className="space-y-3">
          {easings.map((easing) => (
            <div key={easing.name} className="flex items-center gap-4">
              <div className="w-32 text-sm font-mono text-muted-foreground">{easing.name}</div>
              <div
                className={`w-12 h-12 bg-primary rounded transition-transform ${easing.class} ${
                  isAnimating ? 'transform translate-x-20' : ''
                }`}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
        >
          {isAnimating ? 'Reset' : 'Animate'}
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Animation Presets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {animations.map((animation) => (
            <div key={animation.name} className="space-y-2">
              <div className="text-sm font-mono text-muted-foreground">{animation.name}</div>
              <div className={`h-16 bg-accent rounded-lg flex items-center justify-center ${animation.class}`}>
                <div className="w-8 h-8 bg-primary rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Opacity Scale Component
export const OpacityScale: React.FC = () => {
  const opacityValues = [
    { name: 'opacity-0', value: '0', class: 'opacity-0' },
    { name: 'opacity-5', value: '0.05', class: 'opacity-5' },
    { name: 'opacity-10', value: '0.1', class: 'opacity-10' },
    { name: 'opacity-20', value: '0.2', class: 'opacity-20' },
    { name: 'opacity-25', value: '0.25', class: 'opacity-25' },
    { name: 'opacity-30', value: '0.3', class: 'opacity-30' },
    { name: 'opacity-40', value: '0.4', class: 'opacity-40' },
    { name: 'opacity-50', value: '0.5', class: 'opacity-50' },
    { name: 'opacity-60', value: '0.6', class: 'opacity-60' },
    { name: 'opacity-70', value: '0.7', class: 'opacity-70' },
    { name: 'opacity-75', value: '0.75', class: 'opacity-75' },
    { name: 'opacity-80', value: '0.8', class: 'opacity-80' },
    { name: 'opacity-90', value: '0.9', class: 'opacity-90' },
    { name: 'opacity-95', value: '0.95', class: 'opacity-95' },
    { name: 'opacity-100', value: '1', class: 'opacity-100' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Opacity Scale</h3>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4">
        {opacityValues.map((opacity) => (
          <div key={opacity.name} className="space-y-2 text-center">
            <div className={`h-12 w-full bg-primary rounded ${opacity.class}`} />
            <div className="text-xs font-mono text-muted-foreground">{opacity.name}</div>
            <div className="text-xs text-muted-foreground">{opacity.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};