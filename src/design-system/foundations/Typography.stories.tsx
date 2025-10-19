import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Heading,
  Text,
  Label,
  Link,
  Code,
  Caption,
  Blockquote,
  List,
} from "./Typography";

const meta: Meta = {
  title: "Foundation/Typography",
  tags: ["ready"],
  parameters: {
    docs: {
      description: {
        component:
          "Typography foundation components that ensure consistent text styling across the design system. Headings use Playfair Display, body text uses Figtree, and all components inherit from Blockwork color tokens.",
      },
    },
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Typography</h1>
          <p className="text-base text-gray-700 max-w-4xl">
            Our typography system uses Playfair Display for elegant headings and Figtree for clean, readable body text. 
            Like in other UI in Blockwork's interface, typography works by principle of <strong>accessibility before aesthetics</strong>. 
            Therefore, the text should be readable and help the user understand what's important by well contrasted size and colors hierarchy.
            All text components automatically inherit colors from the Blockwork color system.
          </p>
        </div>

        {/* Headings */}
        <section className="mb-12 border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Headings</h2>
        <Text color="secondary" size="sm" className="mb-6">
          Headings use Playfair Display font with responsive sizing across mobile, tablet, and desktop.
        </Text>
        <div className="space-y-6">
          <div>
            <Heading level="h1">Heading 1 - The quick brown fox</Heading>
            <Text color="secondary" size="sm">72px / 96px / 96px (mobile / tablet / desktop)</Text>
          </div>
          <div>
            <Heading level="h2">Heading 2 - The quick brown fox</Heading>
            <Text color="secondary" size="sm">48px / 60px / 72px</Text>
          </div>
          <div>
            <Heading level="h3">Heading 3 - The quick brown fox</Heading>
            <Text color="secondary" size="sm">36px / 48px / 60px</Text>
          </div>
          <div>
            <Heading level="h4">Heading 4 - The quick brown fox</Heading>
            <Text color="secondary" size="sm">30px / 36px / 48px</Text>
          </div>
          <div>
            <Heading level="h5">Heading 5 - The quick brown fox</Heading>
            <Text color="secondary" size="sm">24px / 30px / 36px</Text>
          </div>
          <div>
            <Heading level="h6">Heading 6 - The quick brown fox</Heading>
            <Text color="secondary" size="sm">18px / 24px / 30px</Text>
          </div>
        </div>
      </section>

      {/* Text Sizes */}
      <section className="mb-12 border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Text Sizes</h2>
        <Text color="secondary" size="sm" className="mb-6">
          Body text uses Figtree font with five size variants for different use cases.
        </Text>
        <div className="space-y-3">
          <Text size="xs">Extra Small: The quick brown fox jumps over the lazy dog</Text>
          <Text size="sm">Small: The quick brown fox jumps over the lazy dog</Text>
          <Text size="base">Base: The quick brown fox jumps over the lazy dog</Text>
          <Text size="lg">Large: The quick brown fox jumps over the lazy dog</Text>
          <Text size="xl">Extra Large: The quick brown fox jumps over the lazy dog</Text>
        </div>
      </section>

      {/* Text Colors */}
      <section className="mb-12 border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Text Colors</h2>
        <Text color="secondary" size="sm" className="mb-6">
          Text colors automatically adapt based on context, with options for different backgrounds and semantic states.
        </Text>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-bw-bg-primary p-4 border border-bw-border-ui rounded">
            <Text color="primary" weight="semibold" className="mb-3">On Light Backgrounds</Text>
            <div className="space-y-2">
              <Text color="primary">Primary text</Text>
              <Text color="secondary">Secondary text</Text>
              <Text color="disabled">Disabled text</Text>
              <Text color="link">Link text</Text>
            </div>
          </div>

          <div className="bg-bw-primary p-4 rounded">
            <Text color="onPrimary" weight="semibold" className="mb-3">On Primary Background</Text>
            <div className="space-y-2">
              <Text color="onPrimary">Text on primary</Text>
              <Text color="onPrimary" size="sm">Maintains proper contrast</Text>
            </div>
          </div>

          <div className="bg-bw-inverted-background p-4 rounded">
            <Text color="onInverted" weight="semibold" className="mb-3">On Inverted Background</Text>
            <div className="space-y-2">
              <Text color="onInverted">Text on inverted</Text>
              <Text color="onInverted" size="sm">Adapts to dark backgrounds</Text>
            </div>
          </div>

          <div className="bg-bw-bg-secondary p-4 rounded">
            <Text color="primary" weight="semibold" className="mb-3">Semantic Colors</Text>
            <div className="space-y-2">
              <Text color="positive">Positive/success</Text>
              <Text color="negative">Negative/error</Text>
              <Text color="warning">Warning</Text>
            </div>
          </div>
        </div>
      </section>

      {/* Text Weights */}
      <section className="mb-12 border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Text Weights</h2>
        <div className="space-y-2">
          <Text weight="light">Light weight text</Text>
          <Text weight="normal">Normal weight text</Text>
          <Text weight="medium">Medium weight text</Text>
          <Text weight="semibold">Semibold weight text</Text>
          <Text weight="bold">Bold weight text</Text>
        </div>
      </section>

      {/* Labels */}
      <section className="mb-12 border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Labels</h2>
        <div className="space-y-3">
          <div>
            <Label>Default Label</Label>
          </div>
          <div>
            <Label required>Required Label</Label>
          </div>
          <div>
            <Label size="sm">Small Label</Label>
          </div>
          <div>
            <Label size="lg">Large Label</Label>
          </div>
          <div>
            <Label color="disabled">Disabled Label</Label>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="mb-12 border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Links</h2>
        <div className="space-y-3">
          <div>
            <Link href="#">Default Link</Link>
          </div>
          <div>
            <Link href="#" external>
              External Link
            </Link>
          </div>
          <div>
            <Link href="#" variant="subtle">
              Subtle Link
            </Link>
          </div>
          <div>
            <Link href="#" variant="navigation">
              Navigation Link
            </Link>
          </div>
        </div>
      </section>

      {/* Code */}
      <section className="mb-12 border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Code</h2>
        <div className="space-y-4">
          <Text>
            This is <Code>inline code</Code> within a paragraph.
          </Text>
          <Code variant="block">
            {`// Block code example
function greet(name: string) {
  return \`Hello, \${name}!\`;
}`}
          </Code>
        </div>
      </section>

      {/* Caption */}
      <section className="mb-12 border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Captions</h2>
        <div className="space-y-2">
          <div>
            <Caption>Default caption text</Caption>
          </div>
          <div>
            <Caption color="primary">Primary caption</Caption>
          </div>
          <div>
            <Caption color="disabled">Disabled caption</Caption>
          </div>
        </div>
      </section>

      {/* Blockquote */}
      <section className="mb-12 border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Blockquote</h2>
        <Blockquote>
          "The best way to predict the future is to invent it." - Alan Kay
        </Blockquote>
      </section>

      {/* Lists */}
      <section className="mb-12 border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Lists</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-bw-text-primary font-sans">Unordered List</h3>
            <List
              items={[
                "First item in the list",
                "Second item in the list",
                "Third item in the list",
              ]}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-bw-text-primary font-sans">Ordered List</h3>
            <List
              variant="ordered"
              items={[
                "First step in the process",
                "Second step in the process",
                "Third step in the process",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Text Truncation */}
      <section className="mb-12 border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Text Truncation</h2>
        <div className="space-y-4 max-w-md">
          <div>
            <Text truncate>
              This is a very long text that will be truncated with an ellipsis when it exceeds
              the container width
            </Text>
          </div>
          <div>
            <Text lineClamp={2}>
              This is a longer paragraph that will be clamped to exactly 2 lines. Any additional
              text beyond those two lines will be hidden with an ellipsis. This is useful for
              previews and card layouts.
            </Text>
          </div>
        </div>
      </section>

      {/* Text Alignment */}
      <section className="mb-12 border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Text Alignment</h2>
        <div className="space-y-4">
          <Text align="left">Left aligned text (default)</Text>
          <Text align="center">Center aligned text</Text>
          <Text align="right">Right aligned text</Text>
          <Text align="justify">
            Justified text will be evenly distributed across the full width of the container. This
            creates clean edges on both sides but may result in uneven spacing between words.
          </Text>
        </div>
      </section>

      {/* Real World Example */}
      <section className="mb-12 border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-bw-text-primary font-sans">Real World Example</h2>
        <Text color="secondary" size="sm" className="mb-6">
          A comprehensive example showing how all typography components work together in context.
        </Text>
        <article className="bg-bw-bg-primary border border-bw-border-ui rounded-lg p-8">
          <Heading level="h3" className="mb-2">
            Building Modern Design Systems
          </Heading>
          <Caption color="secondary">Published on October 16, 2025 · 5 min read</Caption>

          <Text className="mt-6 mb-4">
            This is an example of how typography components work together in a real-world scenario.
            Notice how the Playfair Display headings provide elegant emphasis while Figtree body text ensures
            excellent readability. All text automatically inherits the correct colors from the Blockwork color system.
          </Text>

          <Text className="mb-4">
            You can include <Link href="#">inline links</Link>, <Code>inline code</Code>, and{" "}
            <Text as="span" weight="bold">
              bold text
            </Text>{" "}
            seamlessly within paragraphs. The typography system maintains consistent spacing and hierarchy throughout.
          </Text>

          <Blockquote>
            "Design is not just what it looks like and feels like. Design is how it works." - Steve
            Jobs
          </Blockquote>

          <Heading level="h4" className="mb-3 mt-6">
            Key Features
          </Heading>

          <List
            items={[
              "Elegant Playfair Display headings for visual impact",
              "Clean Figtree body text for optimal readability",
              "Consistent color inheritance from Blockwork tokens",
              "Responsive typography that scales across devices",
              "Support for Arabic/RTL text direction",
              "Accessible contrast ratios (WCAG AA compliant)",
            ]}
          />

          <Text className="mt-6" color="secondary">
            Learn more about our{" "}
            <Link href="#" variant="inline">
              design system foundations
            </Link>{" "}
            and how to use these components effectively in your projects.
          </Text>
        </article>
      </section>
      </div>
    </div>
  ),
};
