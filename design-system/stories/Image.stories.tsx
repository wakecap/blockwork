import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Image, LazyImage, ResponsiveImage, AvatarImage, CardImage } from '../components/Image';

const meta: Meta<typeof Image> = {
  title: 'Media & Visualization/Image',
  component: Image,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'An advanced image component with lazy loading, placeholders, error handling, and various crop modes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    crop: {
      control: { type: 'select' },
      options: ['cover', 'contain', 'fill', 'none'],
    },
    lazy: {
      control: { type: 'boolean' },
    },
    width: {
      control: { type: 'text' },
    },
    height: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    alt: 'Beautiful mountain landscape',
    width: 400,
    height: 300,
    lazy: false,
  },
};

export const LazyLoaded: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    alt: 'Lazy loaded mountain landscape',
    width: 400,
    height: 300,
    lazy: true,
  },
};

export const DifferentCropModes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Cover</h3>
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
          alt="Cover crop mode"
          width={300}
          height={200}
          crop="cover"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Contain</h3>
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
          alt="Contain crop mode"
          width={300}
          height={200}
          crop="contain"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Fill</h3>
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
          alt="Fill crop mode"
          width={300}
          height={200}
          crop="fill"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">None</h3>
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
          alt="None crop mode"
          width={300}
          height={200}
          crop="none"
        />
      </div>
    </div>
  ),
};

export const WithCustomPlaceholder: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    alt: 'Image with custom placeholder',
    width: 400,
    height: 300,
    lazy: true,
    placeholder: 'Custom placeholder text',
  },
};

export const WithFallback: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail.com/image.jpg',
    alt: 'Image with fallback',
    width: 400,
    height: 300,
    fallback: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  },
};

export const ResponsiveSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Small (200x150)</h3>
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
          alt="Small image"
          width={200}
          height={150}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Medium (400x300)</h3>
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
          alt="Medium image"
          width={400}
          height={300}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Large (600x450)</h3>
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
          alt="Large image"
          width={600}
          height={450}
        />
      </div>
    </div>
  ),
};

export const ClickableImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    alt: 'Clickable image',
    width: 400,
    height: 300,
    onClick: () => alert('Image clicked!'),
  },
};

export const WithCallbacks: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    alt: 'Image with callbacks',
    width: 400,
    height: 300,
    onLoad: () => console.log('Image loaded successfully'),
    onError: () => console.log('Image failed to load'),
  },
};

// Pre-built component stories
export const LazyImageExample: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Lazy Image Component</h3>
      <LazyImage
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
        alt="Lazy loaded image"
        width={400}
        height={300}
      />
    </div>
  ),
};

export const ResponsiveImageExample: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Responsive Image Component</h3>
      <ResponsiveImage
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
        alt="Responsive image"
      />
    </div>
  ),
};

export const AvatarImageExamples: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Avatar Image Components</h3>
      <div className="flex items-center space-x-4">
        <AvatarImage
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Small avatar"
          size="sm"
        />
        <AvatarImage
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Medium avatar"
          size="md"
        />
        <AvatarImage
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Large avatar"
          size="lg"
        />
      </div>
    </div>
  ),
};

export const CardImageExample: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Card Image Component</h3>
      <div className="max-w-sm">
        <CardImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
          alt="Card image"
        />
        <div className="p-4 border border-t-0 rounded-b-lg">
          <h4 className="font-semibold text-lg">Beautiful Landscape</h4>
          <p className="text-neutral-600">A stunning mountain view captured in perfect lighting.</p>
        </div>
      </div>
    </div>
  ),
};

export const ImageGallery: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Image Gallery</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
        ].map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Gallery image ${index + 1}`}
            width="100%"
            height={200}
            crop="cover"
            className="rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => console.log(`Clicked image ${index + 1}`)}
          />
        ))}
      </div>
    </div>
  ),
};

export const ErrorHandling: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Error Handling Examples</h3>
      
      <div>
        <h4 className="font-medium mb-2">Invalid URL (no fallback)</h4>
        <Image
          src="https://invalid-url-that-will-fail.com/image.jpg"
          alt="Invalid image"
          width={300}
          height={200}
        />
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Invalid URL (with fallback)</h4>
        <Image
          src="https://invalid-url-that-will-fail.com/image.jpg"
          alt="Invalid image with fallback"
          width={300}
          height={200}
          fallback="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
        />
      </div>
    </div>
  ),
};
