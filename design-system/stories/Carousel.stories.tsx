import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, ImageCarousel, CardCarousel } from '../components/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Carousel> = {
  title: 'Content Display/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A carousel component for displaying rotating content with navigation controls and auto-play functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'cards', 'fullscreen'],
    },
    showArrows: {
      control: { type: 'boolean' },
    },
    showIndicators: {
      control: { type: 'boolean' },
    },
    showPlayPause: {
      control: { type: 'boolean' },
    },
    autoPlay: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: '1',
    title: 'Beautiful Landscape',
    description: 'Stunning mountain views and natural scenery.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
  },
  {
    id: '2',
    title: 'City Skyline',
    description: 'Modern urban architecture and city lights.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop',
  },
  {
    id: '3',
    title: 'Ocean Waves',
    description: 'Peaceful beach scenes and ocean tranquility.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop',
  },
  {
    id: '4',
    title: 'Forest Path',
    description: 'Serene forest trails and natural beauty.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    className: 'w-full max-w-4xl',
  },
};

export const WithArrows: Story = {
  args: {
    items: sampleItems,
    showArrows: true,
    className: 'w-full max-w-4xl',
  },
};

export const WithIndicators: Story = {
  args: {
    items: sampleItems,
    showIndicators: true,
    className: 'w-full max-w-4xl',
  },
};

export const WithPlayPause: Story = {
  args: {
    items: sampleItems,
    showPlayPause: true,
    autoPlay: true,
    className: 'w-full max-w-4xl',
  },
};

export const AutoPlay: Story = {
  args: {
    items: sampleItems,
    autoPlay: true,
    autoPlayInterval: 3000,
    className: 'w-full max-w-4xl',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-4">Default Variant</h3>
        <Carousel
          items={sampleItems.slice(0, 3)}
          variant="default"
          showArrows
          showIndicators
          className="w-full max-w-4xl"
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-neutral-700 mb-4">Cards Variant</h3>
        <Carousel
          items={sampleItems}
          variant="cards"
          showArrows
          showIndicators
          className="w-full max-w-4xl"
        />
      </div>
    </div>
  ),
};

export const WithCustomNavigation: Story = {
  render: () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    return (
      <div className="space-y-4">
        <Carousel
          items={sampleItems}
          currentIndex={currentIndex}
          onIndexChange={setCurrentIndex}
          showArrows
          showIndicators
          className="w-full max-w-4xl"
        />
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-300 transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-neutral-700">
            {currentIndex + 1} of {sampleItems.length}
          </span>
          <button
            onClick={() => setCurrentIndex(Math.min(sampleItems.length - 1, currentIndex + 1))}
            disabled={currentIndex === sampleItems.length - 1}
            className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-300 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    );
  },
};

export const WithTitleOverlay: Story = {
  render: () => (
    <Carousel
      items={sampleItems}
      showArrows
      showIndicators
      showTitleOverlay
      className="w-full max-w-4xl"
    />
  ),
};

// Pre-built Carousel Components
export const ImageCarouselExample: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Photo Gallery</h2>
      <ImageCarousel
        images={[
          {
            id: '1',
            src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
            alt: 'Mountain landscape',
            title: 'Mountain Views',
            description: 'Stunning mountain views and natural scenery.',
          },
          {
            id: '2',
            src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop',
            alt: 'City skyline',
            title: 'Urban Architecture',
            description: 'Modern urban architecture and city lights.',
          },
          {
            id: '3',
            src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop',
            alt: 'Ocean waves',
            title: 'Beach Scene',
            description: 'Peaceful beach scenes and ocean tranquility.',
          },
          {
            id: '4',
            src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
            alt: 'Forest path',
            title: 'Forest Trail',
            description: 'Serene forest trails and natural beauty.',
          },
        ]}
        showArrows
        showIndicators
        showPlayPause
        autoPlay
        autoPlayInterval={4000}
      />
    </div>
  ),
};

export const CardCarouselExample: Story = {
  render: () => (
    <div className="w-full max-w-6xl">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Featured Products</h2>
      <CardCarousel
        items={[
          {
            id: '1',
            title: 'Premium Wireless Headphones',
            description: 'High-quality sound with noise cancellation.',
            price: '$299.99',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
            rating: 4.5,
            reviewCount: 128,
          },
          {
            id: '2',
            title: 'Smart Watch Pro',
            description: 'Advanced fitness tracking and notifications.',
            price: '$199.99',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
            rating: 4.2,
            reviewCount: 89,
          },
          {
            id: '3',
            title: 'Wireless Speaker',
            description: 'Portable Bluetooth speaker with deep bass.',
            price: '$149.99',
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
            rating: 4.7,
            reviewCount: 256,
          },
          {
            id: '4',
            title: 'Laptop Stand',
            description: 'Ergonomic aluminum laptop stand.',
            price: '$79.99',
            image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
            rating: 4.3,
            reviewCount: 67,
          },
          {
            id: '5',
            title: 'Mechanical Keyboard',
            description: 'Premium mechanical switches for typing.',
            price: '$129.99',
            image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
            rating: 4.6,
            reviewCount: 189,
          },
        ]}
        showArrows
        showIndicators
        cardsPerView={3}
        className="w-full"
      />
    </div>
  ),
};

export const TestimonialCarousel: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Customer Testimonials</h2>
      <Carousel
        items={[
          {
            id: '1',
            title: 'Sarah Johnson',
            description: '"This product has completely transformed how I work. The quality is outstanding and the customer service is exceptional."',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
            subtitle: 'Senior Designer',
          },
          {
            id: '2',
            title: 'Michael Chen',
            description: '"I\'ve been using this for months now and I couldn\'t be happier. It\'s reliable, fast, and exactly what I needed."',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            subtitle: 'Product Manager',
          },
          {
            id: '3',
            title: 'Emma Wilson',
            description: '"The best investment I\'ve made this year. The features are incredible and the user experience is seamless."',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
            subtitle: 'Frontend Developer',
          },
        ]}
        variant="default"
        showArrows
        showIndicators
        showPlayPause
        autoPlay
        autoPlayInterval={5000}
        renderItem={(item) => (
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <blockquote className="text-lg text-neutral-700 mb-4 italic">
              "{item.description}"
            </blockquote>
            <div className="font-medium text-neutral-900">{item.title}</div>
            <div className="text-sm text-neutral-600">{item.subtitle}</div>
          </div>
        )}
      />
    </div>
  ),
};

export const FullscreenCarousel: Story = {
  render: () => {
    const [isFullscreen, setIsFullscreen] = React.useState(false);

    return (
      <div className={isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'w-full max-w-4xl'}>
        <Carousel
          items={sampleItems}
          variant="fullscreen"
          showArrows
          showIndicators
          showPlayPause
          autoPlay
          autoPlayInterval={4000}
          className={isFullscreen ? 'h-full' : 'w-full'}
        />
        {!isFullscreen && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsFullscreen(true)}
              className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
            >
              Enter Fullscreen
            </button>
          </div>
        )}
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-10 px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors"
          >
            Exit Fullscreen
          </button>
        )}
      </div>
    );
  },
};
