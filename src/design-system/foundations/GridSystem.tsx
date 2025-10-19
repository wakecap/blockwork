import React from "react";

// Grid System Showcase
export const GridShowcase: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-900 font-sans">12-Column Grid</h3>
        <div className="grid grid-cols-12 gap-4">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="bg-primary-100 border border-primary-300 rounded p-2 text-center text-xs font-mono text-primary-700"
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-900 font-sans">Responsive Columns</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-neutral-600 mb-2">
              1 column on mobile, 2 on tablet, 4 on desktop
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="bg-info-100 border border-info-300 rounded p-4 text-center text-sm text-info-700"
                >
                  Item {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-neutral-600 mb-2">
              2 columns on mobile, 3 on tablet, 6 on desktop
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="bg-success-100 border border-success-300 rounded p-4 text-center text-sm text-success-700"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-900 font-sans">Column Spans</h3>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 bg-warning-100 border border-warning-300 rounded p-4 text-center text-sm text-warning-700">
            col-span-6
          </div>
          <div className="col-span-6 bg-warning-100 border border-warning-300 rounded p-4 text-center text-sm text-warning-700">
            col-span-6
          </div>
          <div className="col-span-4 bg-warning-100 border border-warning-300 rounded p-4 text-center text-sm text-warning-700">
            col-span-4
          </div>
          <div className="col-span-8 bg-warning-100 border border-warning-300 rounded p-4 text-center text-sm text-warning-700">
            col-span-8
          </div>
          <div className="col-span-3 bg-warning-100 border border-warning-300 rounded p-4 text-center text-sm text-warning-700">
            col-span-3
          </div>
          <div className="col-span-3 bg-warning-100 border border-warning-300 rounded p-4 text-center text-sm text-warning-700">
            col-span-3
          </div>
          <div className="col-span-3 bg-warning-100 border border-warning-300 rounded p-4 text-center text-sm text-warning-700">
            col-span-3
          </div>
          <div className="col-span-3 bg-warning-100 border border-warning-300 rounded p-4 text-center text-sm text-warning-700">
            col-span-3
          </div>
        </div>
      </div>
    </div>
  );
};

// Flexbox Layout Examples
export const FlexboxShowcase: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-900 font-sans">Flex Direction</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-neutral-600 mb-2">flex-row (default)</p>
            <div className="flex gap-2 p-4 bg-neutral-50 rounded">
              <div className="bg-primary-500 text-white px-3 py-2 rounded text-sm">1</div>
              <div className="bg-primary-500 text-white px-3 py-2 rounded text-sm">2</div>
              <div className="bg-primary-500 text-white px-3 py-2 rounded text-sm">3</div>
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-2">flex-col</p>
            <div className="flex flex-col gap-2 p-4 bg-neutral-50 rounded w-32">
              <div className="bg-primary-500 text-white px-3 py-2 rounded text-sm text-center">
                1
              </div>
              <div className="bg-primary-500 text-white px-3 py-2 rounded text-sm text-center">
                2
              </div>
              <div className="bg-primary-500 text-white px-3 py-2 rounded text-sm text-center">
                3
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-900 font-sans">Justify Content</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-neutral-600 mb-2">justify-start</p>
            <div className="flex justify-start gap-2 p-4 bg-neutral-50 rounded">
              <div className="bg-info-500 text-white px-3 py-2 rounded text-sm">A</div>
              <div className="bg-info-500 text-white px-3 py-2 rounded text-sm">B</div>
              <div className="bg-info-500 text-white px-3 py-2 rounded text-sm">C</div>
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-2">justify-center</p>
            <div className="flex justify-center gap-2 p-4 bg-neutral-50 rounded">
              <div className="bg-info-500 text-white px-3 py-2 rounded text-sm">A</div>
              <div className="bg-info-500 text-white px-3 py-2 rounded text-sm">B</div>
              <div className="bg-info-500 text-white px-3 py-2 rounded text-sm">C</div>
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-2">justify-end</p>
            <div className="flex justify-end gap-2 p-4 bg-neutral-50 rounded">
              <div className="bg-info-500 text-white px-3 py-2 rounded text-sm">A</div>
              <div className="bg-info-500 text-white px-3 py-2 rounded text-sm">B</div>
              <div className="bg-info-500 text-white px-3 py-2 rounded text-sm">C</div>
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-2">justify-between</p>
            <div className="flex justify-between gap-2 p-4 bg-neutral-50 rounded">
              <div className="bg-info-500 text-white px-3 py-2 rounded text-sm">A</div>
              <div className="bg-info-500 text-white px-3 py-2 rounded text-sm">B</div>
              <div className="bg-info-500 text-white px-3 py-2 rounded text-sm">C</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-900 font-sans">Align Items</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-neutral-600 mb-2">items-start</p>
            <div className="flex items-start gap-2 p-4 bg-neutral-50 rounded h-24">
              <div className="bg-success-500 text-white px-3 py-2 rounded text-sm">Short</div>
              <div className="bg-success-500 text-white px-3 py-2 rounded text-sm">
                Medium
                <br />
                height
              </div>
              <div className="bg-success-500 text-white px-3 py-2 rounded text-sm">
                Tall
                <br />
                content
                <br />
                here
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-2">items-center</p>
            <div className="flex items-center gap-2 p-4 bg-neutral-50 rounded h-24">
              <div className="bg-success-500 text-white px-3 py-2 rounded text-sm">Short</div>
              <div className="bg-success-500 text-white px-3 py-2 rounded text-sm">
                Medium
                <br />
                height
              </div>
              <div className="bg-success-500 text-white px-3 py-2 rounded text-sm">
                Tall
                <br />
                content
                <br />
                here
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral-600 mb-2">items-end</p>
            <div className="flex items-end gap-2 p-4 bg-neutral-50 rounded h-24">
              <div className="bg-success-500 text-white px-3 py-2 rounded text-sm">Short</div>
              <div className="bg-success-500 text-white px-3 py-2 rounded text-sm">
                Medium
                <br />
                height
              </div>
              <div className="bg-success-500 text-white px-3 py-2 rounded text-sm">
                Tall
                <br />
                content
                <br />
                here
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Container and Max Width Examples
export const ContainerShowcase: React.FC = () => {
  const maxWidths = [
    { name: "max-w-xs", size: "20rem (320px)" },
    { name: "max-w-sm", size: "24rem (384px)" },
    { name: "max-w-md", size: "28rem (448px)" },
    { name: "max-w-lg", size: "32rem (512px)" },
    { name: "max-w-xl", size: "36rem (576px)" },
    { name: "max-w-2xl", size: "42rem (672px)" },
    { name: "max-w-3xl", size: "48rem (768px)" },
    { name: "max-w-4xl", size: "56rem (896px)" },
    { name: "max-w-5xl", size: "64rem (1024px)" },
    { name: "max-w-6xl", size: "72rem (1152px)" },
    { name: "max-w-7xl", size: "80rem (1280px)" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-900 font-sans">Container</h3>
        <div className="container bg-primary-50 border border-primary-200 rounded p-4">
          <p className="text-sm text-primary-700">
            This container is centered and has responsive padding. It adjusts its max-width based on
            the current breakpoint.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-900 font-sans">Max Width Scale</h3>
        <div className="space-y-3">
          {maxWidths.map((width, index) => (
            <div key={width.name}>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm font-mono text-neutral-600 w-24">{width.name}</span>
                <span className="text-sm text-neutral-500">{width.size}</span>
              </div>
              <div className={`${width.name} bg-neutral-100 border border-neutral-300 rounded p-3`}>
                <div className="text-sm text-neutral-700">Content constrained to {width.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Layout Patterns
export const LayoutPatterns: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-900 font-sans">Sidebar Layout</h3>
        <div className="flex gap-4 h-48 border border-neutral-200 rounded overflow-hidden">
          <div className="w-64 bg-neutral-800 text-white p-4">
            <div className="text-sm font-medium mb-3">Sidebar</div>
            <div className="space-y-2 text-sm text-neutral-300">
              <div>Navigation</div>
              <div>Menu Items</div>
              <div>Settings</div>
            </div>
          </div>
          <div className="flex-1 bg-neutral-50 p-4">
            <div className="text-sm text-neutral-600">Main Content Area</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-900 font-sans">Header-Content-Footer</h3>
        <div className="h-64 border border-neutral-200 rounded overflow-hidden flex flex-col">
          <div className="bg-primary-600 text-white p-4">
            <div className="text-sm font-medium">Header</div>
          </div>
          <div className="flex-1 bg-neutral-50 p-4">
            <div className="text-sm text-neutral-600">Main Content</div>
          </div>
          <div className="bg-neutral-800 text-white p-4">
            <div className="text-sm">Footer</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-neutral-900 font-sans">Card Grid</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="bg-white border border-neutral-200 rounded-lg p-4 shadow-sm">
              <div className="w-full h-24 bg-gradient-to-r from-primary-100 to-primary-200 rounded mb-3"></div>
              <div className="text-sm font-medium text-neutral-900 mb-1">Card {i + 1}</div>
              <div className="text-sm text-neutral-600">Card description and content</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
