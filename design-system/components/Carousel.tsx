import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

export interface CarouselItem {
  id: string;
  content: React.ReactNode;
  title?: string;
  description?: string;
}

export interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  showPlayPause?: boolean;
  showTitle?: boolean;
  variant?: 'default' | 'cards' | 'fullscreen';
  height?: string;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showIndicators = true,
  showPlayPause = false,
  showTitle = false,
  variant = 'default',
  height = '400px',
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(autoPlay);
  const intervalRef = React.useRef<NodeJS.Timeout>();

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  React.useEffect(() => {
    if (isPlaying && autoPlay) {
      intervalRef.current = setInterval(goToNext, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, autoPlay, autoPlayInterval, items.length]);

  const variantStyles = {
    default: 'relative overflow-hidden rounded-lg',
    cards: 'relative overflow-hidden',
    fullscreen: 'fixed inset-0 z-50',
  };

  const currentVariant = variantStyles[variant];

  return (
    <div className={`${currentVariant} ${className}`} style={{ height }}>
      {/* Carousel container */}
      <div className="relative w-full h-full">
        {/* Slides */}
        <div className="relative w-full h-full">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {item.content}
            </div>
          ))}
        </div>

        {/* Title overlay */}
        {showTitle && items[currentIndex].title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h3 className="text-white text-xl font-semibold mb-2">
              {items[currentIndex].title}
            </h3>
            {items[currentIndex].description && (
              <p className="text-white/90 text-sm">
                {items[currentIndex].description}
              </p>
            )}
          </div>
        )}

        {/* Navigation arrows */}
        {showArrows && items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Previous slide"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors"
              aria-label="Next slide"
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Indicators */}
        {showIndicators && items.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? 'bg-white'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Play/Pause button */}
        {showPlayPause && autoPlay && (
          <button
            onClick={togglePlayPause}
            className="absolute top-4 right-4 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <FontAwesomeIcon
              icon={isPlaying ? faPause : faPlay}
              className="w-4 h-4"
            />
          </button>
        )}

        {/* Slide counter */}
        <div className="absolute top-4 left-4 bg-black/30 text-white px-2 py-1 rounded text-sm">
          {currentIndex + 1} / {items.length}
        </div>
      </div>
    </div>
  );
};

// Image Carousel component
export const ImageCarousel: React.FC<{
  images: Array<{
    id: string;
    src: string;
    alt: string;
    title?: string;
    description?: string;
  }>;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  showPlayPause?: boolean;
  showTitle?: boolean;
  height?: string;
  className?: string;
}> = ({
  images,
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showIndicators = true,
  showPlayPause = false,
  showTitle = false,
  height = '400px',
  className = '',
}) => {
  const items: CarouselItem[] = images.map(image => ({
    id: image.id,
    content: (
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover"
      />
    ),
    title: image.title,
    description: image.description,
  }));

  return (
    <Carousel
      items={items}
      autoPlay={autoPlay}
      autoPlayInterval={autoPlayInterval}
      showArrows={showArrows}
      showIndicators={showIndicators}
      showPlayPause={showPlayPause}
      showTitle={showTitle}
      height={height}
      className={className}
    />
  );
};

// Card Carousel component
export const CardCarousel: React.FC<{
  cards: Array<{
    id: string;
    title: string;
    description: string;
    image?: string;
    action?: React.ReactNode;
  }>;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  className?: string;
}> = ({
  cards,
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showIndicators = true,
  className = '',
}) => {
  const items: CarouselItem[] = cards.map(card => ({
    id: card.id,
    content: (
      <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
        {card.image && (
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-32 object-cover rounded-lg mb-4"
          />
        )}
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          {card.title}
        </h3>
        <p className="text-neutral-600 flex-1">
          {card.description}
        </p>
        {card.action && (
          <div className="mt-4">
            {card.action}
          </div>
        )}
      </div>
    ),
  }));

  return (
    <Carousel
      items={items}
      autoPlay={autoPlay}
      autoPlayInterval={autoPlayInterval}
      showArrows={showArrows}
      showIndicators={showIndicators}
      variant="cards"
      height="300px"
      className={className}
    />
  );
};
