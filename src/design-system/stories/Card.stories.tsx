import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, ProductCard, UserCard, ArticleCard } from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShare, faBookmark, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const meta: Meta<typeof Card> = {
  title: "Content Display/Card",
  component: Card,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A versatile card component for displaying content in various formats with different variants and sizes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "elevated", "outlined", "interactive"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    isHoverable: {
      control: { type: "boolean" },
    },
    isSelected: {
      control: { type: "boolean" },
    },
    isDisabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Card Title",
    subtitle: "Card subtitle or description",
    content: "This is the main content of the card. It can contain any React elements.",
    className: "w-80",
  },
};

export const WithImage: Story = {
  args: {
    title: "Card with Image",
    subtitle: "Beautiful landscape",
    content: "This card includes an image at the top.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    imageAlt: "Mountain landscape",
    className: "w-80",
  },
};

export const WithActions: Story = {
  args: {
    title: "Card with Actions",
    subtitle: "Interactive card with action buttons",
    content: "This card has action buttons in the top-right corner.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    imageAlt: "Mountain landscape",
    actions: (
      <div className="flex space-x-2">
        <button className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all">
          <FontAwesomeIcon icon={faHeart} className="w-4 h-4 text-red-500" />
        </button>
        <button className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all">
          <FontAwesomeIcon icon={faShare} className="w-4 h-4 text-blue-500" />
        </button>
        <button className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all">
          <FontAwesomeIcon icon={faBookmark} className="w-4 h-4 text-yellow-500" />
        </button>
      </div>
    ),
    className: "w-80",
  },
};

export const WithFooter: Story = {
  args: {
    title: "Card with Footer",
    subtitle: "Card that includes a footer section",
    content: "This card has a footer with additional information or actions.",
    footer: (
      <div className="flex justify-between items-center">
        <span className="text-sm text-neutral-600">Last updated: 2 hours ago</span>
        <button className="px-3 py-1 bg-primary-500 text-white rounded text-sm hover:bg-primary-600 transition-colors">
          View Details
        </button>
      </div>
    ),
    className: "w-80",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card
        title="Default"
        subtitle="Standard card variant"
        content="This is the default card style."
        className="w-full"
      />
      <Card
        title="Elevated"
        subtitle="Card with shadow"
        content="This card has an elevated appearance with shadow."
        variant="elevated"
        className="w-full"
      />
      <Card
        title="Outlined"
        subtitle="Card with border"
        content="This card has a prominent border."
        variant="outlined"
        className="w-full"
      />
      <Card
        title="Interactive"
        subtitle="Clickable card"
        content="This card is interactive and clickable."
        variant="interactive"
        isHoverable
        className="w-full"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card
        title="Small"
        subtitle="Compact card"
        content="This is a small card with minimal padding."
        size="sm"
        className="w-full"
      />
      <Card
        title="Medium"
        subtitle="Standard card"
        content="This is a medium-sized card with standard padding."
        size="md"
        className="w-full"
      />
      <Card
        title="Large"
        subtitle="Spacious card"
        content="This is a large card with generous padding."
        size="lg"
        className="w-full"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card
        title="Normal"
        subtitle="Default state"
        content="This card is in its normal state."
        className="w-full"
      />
      <Card
        title="Selected"
        subtitle="Selected state"
        content="This card is selected and highlighted."
        isSelected
        className="w-full"
      />
      <Card
        title="Disabled"
        subtitle="Disabled state"
        content="This card is disabled and cannot be interacted with."
        isDisabled
        className="w-full"
      />
    </div>
  ),
};

// Pre-built Card Components
export const ProductCardExample: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        name="Premium Wireless Headphones"
        price={299.99}
        originalPrice={399.99}
        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
        rating={4.5}
        reviewCount={128}
        isOnSale
        discount={25}
        className="w-full"
      />
      <ProductCard
        name="Smart Watch Pro"
        price={199.99}
        image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
        rating={4.2}
        reviewCount={89}
        className="w-full"
      />
    </div>
  ),
};

export const UserCardExample: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UserCard
        name="Sarah Johnson"
        role="Senior Designer"
        avatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        status="online"
        email="sarah.johnson@company.com"
        location="San Francisco, CA"
        className="w-full"
      />
      <UserCard
        name="Michael Chen"
        role="Product Manager"
        avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        status="away"
        email="michael.chen@company.com"
        location="New York, NY"
        className="w-full"
      />
    </div>
  ),
};

export const ArticleCardExample: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ArticleCard
        title="The Future of Web Development"
        excerpt="Explore the latest trends and technologies shaping the future of web development, from AI-powered tools to new frameworks."
        author="Alex Thompson"
        authorAvatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
        publishDate="2024-01-15"
        readTime="5 min read"
        image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop"
        tags={["Web Development", "Technology", "AI"]}
        className="w-full"
      />
      <ArticleCard
        title="Design Systems: A Complete Guide"
        excerpt="Learn how to build and maintain effective design systems that scale with your product and team."
        author="Emma Wilson"
        authorAvatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
        publishDate="2024-01-12"
        readTime="8 min read"
        image="https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=200&fit=crop"
        tags={["Design", "UX", "Design Systems"]}
        className="w-full"
      />
    </div>
  ),
};
