import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Foundation/Typography",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Typography system and font guidelines for the design system.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Helper component for type examples
const TypeExample = ({ 
  label, 
  className, 
  text = "The quick brown fox jumps over the lazy dog",
  size
}: { 
  label: string; 
  className: string; 
  text?: string;
  size: string;
}) => (
  <div className="py-4 border-b border-gray-200 last:border-b-0">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
      <span className="text-xs text-gray-400">{size}</span>
    </div>
    <div className={className}>{text}</div>
  </div>
);

export const Overview: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto p-8 bg-white">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 font-heading">Typography</h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl font-sans">
          Like in other UI in Blockwork's interface, typography works by principle of <strong>accessibility before aesthetics</strong>. 
          Therefore, the text should be readable and help the user understand what's important by well contrasted size and colors hierarchy.
        </p>
      </div>

      {/* Fonts Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 font-heading">Fonts</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <p className="text-gray-800 leading-relaxed mb-4">
            We are using two fonts for our UI hierarchy: <strong className="font-semibold text-blue-900">Poppins</strong> and <strong className="font-semibold text-blue-900">Figtree</strong>. 
            We are using <strong>Poppins</strong> font for our main titles (heading), and <strong>Figtree</strong> for text, labels and paragraphs.
          </p>
          <p className="text-sm text-gray-700">
            We don't import the font within our CSS in order to give full control of the fonts which you wish to bring to your client, 
            the following code snippet is what we recommend in order to include our recommended fonts.
          </p>
        </div>

        {/* Font Examples */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Poppins</h3>
            <p className="text-gray-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Used for headings and titles
            </p>
            <div style={{ fontFamily: 'Poppins, sans-serif' }}>
              <div className="text-4xl font-bold mb-2">Aa Bb Cc</div>
              <div className="text-sm text-gray-500">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
              <div className="text-sm text-gray-500">abcdefghijklmnopqrstuvwxyz</div>
              <div className="text-sm text-gray-500">0123456789</div>
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-900 font-sans">Figtree</h3>
            <p className="text-gray-600 mb-4 font-sans">
              Used for body text, labels and paragraphs
            </p>
            <div className="font-sans">
              <div className="text-4xl font-bold mb-2">Aa Bb Cc</div>
              <div className="text-sm text-gray-500">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
              <div className="text-sm text-gray-500">abcdefghijklmnopqrstuvwxyz</div>
              <div className="text-sm text-gray-500">0123456789</div>
            </div>
          </div>
        </div>
      </section>

      {/* Type Styles */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 font-heading">Type Styles</h2>
        <p className="text-gray-600 mb-8 font-sans">We use two key type styles: <strong>heading</strong> and <strong>text</strong></p>

        {/* H1 - 32px */}
        <div className="mb-12">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">H1 - 32px</h3>
          </div>
          <div className="bg-white border border-gray-200 rounded-b-lg p-6">
            <TypeExample label="H1 Bold" className="text-[32px] font-bold leading-tight font-heading" size="32px / Bold (700)" />
            <TypeExample label="H1 Medium" className="text-[32px] font-medium leading-tight font-heading" size="32px / Medium (500)" />
            <TypeExample label="H1 Normal" className="text-[32px] font-normal leading-tight font-heading" size="32px / Normal (400)" />
            <TypeExample label="H1 Light" className="text-[32px] font-light leading-tight font-heading" size="32px / Light (300)" />
          </div>
        </div>

        {/* H2 - 24px */}
        <div className="mb-12">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">H2 - 24px</h3>
          </div>
          <div className="bg-white border border-gray-200 rounded-b-lg p-6">
            <TypeExample label="H2 Bold" className="text-2xl font-bold leading-tight font-heading" size="24px / Bold (700)" />
            <TypeExample label="H2 Medium" className="text-2xl font-medium leading-tight font-heading" size="24px / Medium (500)" />
            <TypeExample label="H2 Normal" className="text-2xl font-normal leading-tight font-heading" size="24px / Normal (400)" />
            <TypeExample label="H2 Light" className="text-2xl font-light leading-tight font-heading" size="24px / Light (300)" />
          </div>
        </div>

        {/* H3 - 18px */}
        <div className="mb-12">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">H3 - 18px</h3>
          </div>
          <div className="bg-white border border-gray-200 rounded-b-lg p-6">
            <TypeExample label="H3 Bold" className="text-lg font-bold leading-snug font-heading" size="18px / Bold (700)" />
            <TypeExample label="H3 Medium" className="text-lg font-medium leading-snug font-heading" size="18px / Medium (500)" />
            <TypeExample label="H3 Normal" className="text-lg font-normal leading-snug font-heading" size="18px / Normal (400)" />
            <TypeExample label="H3 Light" className="text-lg font-light leading-snug font-heading" size="18px / Light (300)" />
          </div>
        </div>

        {/* Text1 - 16px */}
        <div className="mb-12">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Text1 - 16px</h3>
          </div>
          <div className="bg-white border border-gray-200 rounded-b-lg p-6">
            <TypeExample label="Text1 Bold" className="text-base font-bold leading-normal font-sans" size="16px / Bold (700)" />
            <TypeExample label="Text1 Medium" className="text-base font-medium leading-normal font-sans" size="16px / Medium (500)" />
            <TypeExample label="Text1 Normal" className="text-base font-normal leading-normal font-sans" size="16px / Normal (400)" />
          </div>
        </div>

        {/* Text2 - 14px */}
        <div className="mb-12">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Text2 - 14px</h3>
          </div>
          <div className="bg-white border border-gray-200 rounded-b-lg p-6">
            <TypeExample label="Text2 Bold" className="text-sm font-bold leading-normal font-sans" size="14px / Bold (700)" />
            <TypeExample label="Text2 Medium" className="text-sm font-medium leading-normal font-sans" size="14px / Medium (500)" />
            <TypeExample label="Text2 Normal" className="text-sm font-normal leading-normal font-sans" size="14px / Normal (400)" />
          </div>
        </div>

        {/* Text3 - 12px */}
        <div className="mb-12">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Text3 - 12px</h3>
          </div>
          <div className="bg-white border border-gray-200 rounded-b-lg p-6">
            <TypeExample label="Text3 Medium" className="text-xs font-medium leading-normal font-sans" size="12px / Medium (500)" />
            <TypeExample label="Text3 Normal" className="text-xs font-normal leading-normal font-sans" size="12px / Normal (400)" />
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">
          <i className="fa-solid fa-lightbulb text-orange-500 mr-2"></i>
          Usage Guidelines
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <i className="fa-solid fa-check text-green-600 mr-3 mt-1"></i>
            <span>Use Poppins for all headings (H1, H2, H3) to create visual hierarchy</span>
          </li>
          <li className="flex items-start">
            <i className="fa-solid fa-check text-green-600 mr-3 mt-1"></i>
            <span>Use Figtree for body text, labels, and paragraphs for optimal readability</span>
          </li>
          <li className="flex items-start">
            <i className="fa-solid fa-check text-green-600 mr-3 mt-1"></i>
            <span>Maintain consistent font weights within the same component or section</span>
          </li>
          <li className="flex items-start">
            <i className="fa-solid fa-check text-green-600 mr-3 mt-1"></i>
            <span>Ensure sufficient contrast between text and background for accessibility</span>
          </li>
        </ul>
      </section>
    </div>
  ),
};
