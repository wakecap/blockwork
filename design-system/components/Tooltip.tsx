import React from 'react';

export interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  delay?: number;
  maxWidth?: string;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  variant = 'default',
  size = 'md',
  showArrow = true,
  delay = 200,
  maxWidth = '200px',
  className = '',
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const variantStyles = {
    default: 'bg-neutral-900 text-white',
    light: 'bg-white text-neutral-900 border border-neutral-200 shadow-lg',
    dark: 'bg-neutral-800 text-white',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-2',
    lg: 'text-base px-4 py-3',
  };

  const positionStyles = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    'top-left': 'bottom-full right-0 mb-2',
    'top-right': 'bottom-full left-0 mb-2',
    'bottom-left': 'top-full right-0 mt-2',
    'bottom-right': 'top-full left-0 mt-2',
  };

  const arrowStyles = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-neutral-900',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-neutral-900',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-neutral-900',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-neutral-900',
    'top-left': 'top-full right-2 border-t-neutral-900',
    'top-right': 'top-full left-2 border-t-neutral-900',
    'bottom-left': 'bottom-full right-2 border-b-neutral-900',
    'bottom-right': 'bottom-full left-2 border-b-neutral-900',
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleFocus = () => {
    setIsVisible(true);
  };

  const handleBlur = () => {
    setIsVisible(false);
  };

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];
  const currentPosition = positionStyles[position];
  const currentArrow = arrowStyles[position];

  const tooltipContent = (
    <div
      ref={tooltipRef}
      className={`absolute z-1800 ${currentPosition} ${currentVariant} ${currentSize} rounded-lg shadow-lg max-w-xs ${className}`}
      style={{ maxWidth }}
      role="tooltip"
    >
      {content}
      {showArrow && (
        <div
          className={`absolute w-0 h-0 border-4 border-transparent ${currentArrow}`}
        />
      )}
    </div>
  );

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
      {isVisible && tooltipContent}
    </div>
  );
};

// Predefined tooltip components
export const InfoTooltip: React.FC<{
  content: string;
  children: React.ReactElement;
  className?: string;
}> = ({ content, children, className = '' }) => (
  <Tooltip
    content={content}
    variant="light"
    size="sm"
    className={className}
  >
    {children}
  </Tooltip>
);

export const HelpTooltip: React.FC<{
  content: string;
  children: React.ReactElement;
  className?: string;
}> = ({ content, children, className = '' }) => (
  <Tooltip
    content={content}
    variant="default"
    size="md"
    className={className}
  >
    {children}
  </Tooltip>
);

export const ErrorTooltip: React.FC<{
  content: string;
  children: React.ReactElement;
  className?: string;
}> = ({ content, children, className = '' }) => (
  <Tooltip
    content={content}
    variant="dark"
    size="sm"
    className={className}
  >
    {children}
  </Tooltip>
); 