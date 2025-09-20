import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
  statusPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  shape?: 'circle' | 'square';
  fallbackIcon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  initials,
  size = 'md',
  status,
  statusPosition = 'bottom-right',
  shape = 'circle',
  fallbackIcon,
  className = '',
  onClick,
}) => {
  const [imageError, setImageError] = React.useState(false);

  const sizeClasses = {
    xs: {
      container: 'w-6 h-6',
      text: 'text-xs',
      status: 'w-1.5 h-1.5',
      statusOffset: 'translate-x-0.5 -translate-y-0.5',
    },
    sm: {
      container: 'w-8 h-8',
      text: 'text-sm',
      status: 'w-2 h-2',
      statusOffset: 'translate-x-0.5 -translate-y-0.5',
    },
    md: {
      container: 'w-10 h-10',
      text: 'text-base',
      status: 'w-2.5 h-2.5',
      statusOffset: 'translate-x-0.5 -translate-y-0.5',
    },
    lg: {
      container: 'w-12 h-12',
      text: 'text-lg',
      status: 'w-3 h-3',
      statusOffset: 'translate-x-1 -translate-y-1',
    },
    xl: {
      container: 'w-16 h-16',
      text: 'text-xl',
      status: 'w-4 h-4',
      statusOffset: 'translate-x-1 -translate-y-1',
    },
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-neutral-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  const statusPositionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
  };

  const currentSize = sizeClasses[size];
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-lg';
  const cursorClass = onClick ? 'cursor-pointer' : '';

  const handleImageError = () => {
    setImageError(true);
  };

  const renderContent = () => {
    if (src && !imageError) {
      return (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className={`w-full h-full object-cover ${shapeClass}`}
          onError={handleImageError}
        />
      );
    }

    if (initials) {
      return (
        <div className={`w-full h-full flex items-center justify-center bg-primary-600 text-white font-medium ${currentSize.text} ${shapeClass}`}>
          {initials.toUpperCase()}
        </div>
      );
    }

    return (
      <div className={`w-full h-full flex items-center justify-center bg-neutral-200 text-neutral-600 ${shapeClass}`}>
        {fallbackIcon || <FontAwesomeIcon icon={faUser} className={currentSize.text} />}
      </div>
    );
  };

  return (
    <div className={`relative inline-block ${currentSize.container} ${cursorClass} ${className}`} onClick={onClick}>
      {renderContent()}
      
      {status && (
        <div
          className={`
            absolute ${statusPositionClasses[statusPosition]} ${currentSize.statusOffset}
            ${currentSize.status} ${statusColors[status]} ${shapeClass}
            border-2 border-white
          `}
        />
      )}
    </div>
  );
};


