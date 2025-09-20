import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlay, faStar, faCheck } from '@fortawesome/free-solid-svg-icons';

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    icon?: React.ReactNode;
  };
  image?: {
    src: string;
    alt: string;
    position?: 'left' | 'right' | 'background';
  };
  variant?: 'default' | 'centered' | 'split' | 'minimal' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  background?: string;
  overlay?: boolean;
  features?: string[];
  stats?: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  badges?: string[];
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  image,
  variant = 'default',
  size = 'lg',
  background,
  overlay = false,
  features = [],
  stats = [],
  badges = [],
  className = '',
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'py-16 px-6';
      case 'md':
        return 'py-20 px-8';
      case 'lg':
        return 'py-24 px-8';
      case 'xl':
        return 'py-32 px-8';
      default:
        return 'py-24 px-8';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'centered':
        return 'text-center';
      case 'split':
        return 'lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center';
      case 'minimal':
        return 'text-center max-w-3xl mx-auto';
      case 'gradient':
        return 'text-center bg-gradient-to-br from-primary-600 to-primary-800 text-white';
      default:
        return '';
    }
  };

  const getActionVariantClasses = (variant: string = 'primary') => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-600 text-white hover:bg-primary-700 border-primary-600';
      case 'secondary':
        return 'bg-white text-primary-600 hover:bg-neutral-50 border-white';
      case 'outline':
        return 'bg-transparent text-primary-600 hover:bg-primary-50 border-primary-600';
      default:
        return 'bg-primary-600 text-white hover:bg-primary-700 border-primary-600';
    }
  };

  const renderImage = () => {
    if (!image) return null;

    if (image.position === 'background') {
      return (
        <div className="absolute inset-0 z-0">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          {overlay && (
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          )}
        </div>
      );
    }

    return (
      <div className={`${variant === 'split' ? 'lg:order-2' : ''}`}>
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-auto rounded-lg shadow-2xl"
        />
      </div>
    );
  };

  const renderContent = () => (
    <div className={`${variant === 'split' ? 'lg:order-1' : ''} relative z-10`}>
      {/* Badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className="text-lg font-medium text-primary-600 mb-4">
          {subtitle}
        </p>
      )}

      {/* Title */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
        {title}
      </h1>

      {/* Description */}
      {description && (
        <p className="text-xl text-neutral-600 mb-8 leading-relaxed max-w-3xl">
          {description}
        </p>
      )}

      {/* Features */}
      {features.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faCheck} className="w-4 h-4 text-green-500" />
              <span className="text-neutral-700">{feature}</span>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className={`inline-flex items-center justify-center px-8 py-3 border-2 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 ${getActionVariantClasses(primaryAction.variant)}`}
            >
              {primaryAction.label}
              {primaryAction.icon || <FontAwesomeIcon icon={faArrowRight} className="ml-2 w-4 h-4" />}
            </button>
          )}
          
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className={`inline-flex items-center justify-center px-8 py-3 border-2 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 ${getActionVariantClasses(secondaryAction.variant)}`}
            >
              {secondaryAction.label}
              {secondaryAction.icon || <FontAwesomeIcon icon={faPlay} className="ml-2 w-4 h-4" />}
            </button>
          )}
        </div>
      )}

      {/* Stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-neutral-200">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              {stat.icon && (
                <div className="flex justify-center mb-2">
                  {stat.icon}
                </div>
              )}
              <div className="text-2xl font-bold text-neutral-900">{stat.value}</div>
              <div className="text-sm text-neutral-600">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section
      className={`relative ${getSizeClasses()} ${getVariantClasses()} ${className}`}
      style={background ? { background } : {}}
    >
      {/* Background Image */}
      {image?.position === 'background' && renderImage()}

      <div className="max-w-7xl mx-auto">
        {variant === 'split' ? (
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            {renderContent()}
            {renderImage()}
          </div>
        ) : (
          <>
            {renderContent()}
            {image && image.position !== 'background' && (
              <div className="mt-12">
                {renderImage()}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

// Pre-built hero section components
export const ProductHero: React.FC<{
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  price?: string;
  rating?: number;
  features?: string[];
  onBuyNow?: () => void;
  onLearnMore?: () => void;
  className?: string;
}> = ({ title, subtitle, description, image, price, rating, features = [], onBuyNow, onLearnMore, className = '' }) => {
  return (
    <HeroSection
      title={title}
      subtitle={subtitle}
      description={description}
      image={{ src: image, alt: title, position: 'right' }}
      variant="split"
      size="xl"
      primaryAction={onBuyNow ? { label: 'Buy Now', onClick: onBuyNow } : undefined}
      secondaryAction={onLearnMore ? { label: 'Learn More', onClick: onLearnMore } : undefined}
      features={features}
      badges={price ? [`$${price}`] : []}
      className={className}
    />
  );
};

export const LandingHero: React.FC<{
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  onGetStarted?: () => void;
  onWatchDemo?: () => void;
  stats?: Array<{ value: string; label: string }>;
  className?: string;
}> = ({ title, subtitle, description, backgroundImage, onGetStarted, onWatchDemo, stats = [], className = '' }) => {
  return (
    <HeroSection
      title={title}
      subtitle={subtitle}
      description={description}
      image={backgroundImage ? { src: backgroundImage, alt: title, position: 'background' } : undefined}
      variant="gradient"
      size="xl"
      overlay={true}
      primaryAction={onGetStarted ? { label: 'Get Started', onClick: onGetStarted } : undefined}
      secondaryAction={onWatchDemo ? { label: 'Watch Demo', onClick: onWatchDemo, icon: <FontAwesomeIcon icon={faPlay} className="ml-2 w-4 h-4" /> } : undefined}
      stats={stats}
      className={className}
    />
  );
};

export const MinimalHero: React.FC<{
  title: string;
  description?: string;
  primaryAction?: { label: string; onClick: () => void };
  className?: string;
}> = ({ title, description, primaryAction, className = '' }) => {
  return (
    <HeroSection
      title={title}
      description={description}
      variant="minimal"
      size="md"
      primaryAction={primaryAction}
      className={className}
    />
  );
};
