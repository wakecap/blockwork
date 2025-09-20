import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faExclamationTriangle, faSpinner } from '@fortawesome/free-solid-svg-icons';

export interface ImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  placeholder?: string;
  lazy?: boolean;
  crop?: 'cover' | 'contain' | 'fill' | 'none';
  fallback?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  onClick?: () => void;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  placeholder,
  lazy = true,
  crop = 'cover',
  fallback,
  className = '',
  onLoad,
  onError,
  onClick,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [isInView, setIsInView] = React.useState(!lazy);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  React.useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [lazy]);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const getCropStyles = () => {
    switch (crop) {
      case 'cover':
        return 'object-cover';
      case 'contain':
        return 'object-contain';
      case 'fill':
        return 'object-fill';
      case 'none':
        return 'object-none';
      default:
        return 'object-cover';
    }
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    
    return (
      <div className="flex items-center justify-center bg-neutral-100 text-neutral-400">
        <FontAwesomeIcon icon={faImage} className="w-8 h-8" />
      </div>
    );
  };

  const getErrorFallback = () => {
    if (fallback) {
      return (
        <img
          src={fallback}
          alt={alt}
          className={`w-full h-full ${getCropStyles()}`}
          onLoad={handleLoad}
          onError={() => setHasError(true)}
        />
      );
    }

    return (
      <div className="flex items-center justify-center bg-red-50 text-red-400">
        <FontAwesomeIcon icon={faExclamationTriangle} className="w-8 h-8" />
      </div>
    );
  };

  if (hasError) {
    return (
      <div
        ref={imgRef}
        style={{ width, height }}
        className={`relative overflow-hidden rounded-lg ${className}`}
        onClick={onClick}
      >
        {getErrorFallback()}
      </div>
    );
  }

  return (
    <div
      ref={imgRef}
      style={{ width, height }}
      className={`relative overflow-hidden rounded-lg ${className}`}
      onClick={onClick}
    >
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
          <FontAwesomeIcon icon={faSpinner} className="w-6 h-6 text-neutral-400 animate-spin" />
        </div>
      )}

      {/* Placeholder */}
      {!isInView && lazy && (
        <div className="w-full h-full">
          {getPlaceholder()}
        </div>
      )}

      {/* Actual Image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${getCropStyles()}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};

// Pre-built image components
export const LazyImage: React.FC<{
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}> = ({ src, alt, width, height, className = '' }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      lazy={true}
      className={className}
    />
  );
};

export const ResponsiveImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = '' }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width="100%"
      height="auto"
      lazy={false}
      className={className}
    />
  );
};

export const AvatarImage: React.FC<{
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ src, alt, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={sizeClasses[size]}
      height={sizeClasses[size]}
      crop="cover"
      className={`rounded-full ${className}`}
    />
  );
};

export const CardImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = '' }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width="100%"
      height="200px"
      crop="cover"
      className={`rounded-t-lg ${className}`}
    />
  );
};
