import React from 'react';

export interface ProgressProps {
  value?: number;
  max?: number;
  variant?: 'linear' | 'circular';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  indeterminate?: boolean;
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value = 0,
  max = 100,
  variant = 'linear',
  size = 'md',
  color = 'primary',
  showLabel = false,
  labelPosition = 'top',
  indeterminate = false,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: {
      linear: 'h-1',
      circular: 'w-8 h-8',
      label: 'text-xs',
    },
    md: {
      linear: 'h-2',
      circular: 'w-12 h-12',
      label: 'text-sm',
    },
    lg: {
      linear: 'h-3',
      circular: 'w-16 h-16',
      label: 'text-base',
    },
  };

  const colorClasses = {
    primary: {
      background: 'bg-primary-200',
      fill: 'bg-primary-600',
      text: 'text-primary-600',
    },
    success: {
      background: 'bg-success-200',
      fill: 'bg-success-600',
      text: 'text-success-600',
    },
    warning: {
      background: 'bg-warning-200',
      fill: 'bg-warning-600',
      text: 'text-warning-600',
    },
    error: {
      background: 'bg-error-200',
      fill: 'bg-error-600',
      text: 'text-error-600',
    },
  };

  const currentSize = sizeClasses[size];
  const currentColor = colorClasses[color];

  const renderLinearProgress = () => (
    <div className="w-full">
      <div className={`${currentSize.linear} ${currentColor.background} rounded-full overflow-hidden`}>
        <div
          className={`${currentSize.linear} ${currentColor.fill} rounded-full transition-all duration-300 ease-out-quart ${
            indeterminate ? 'animate-pulse' : ''
          }`}
          style={{
            width: indeterminate ? '100%' : `${percentage}%`,
            animation: indeterminate ? 'progress-indeterminate 2s ease-in-out infinite' : undefined,
          }}
        />
      </div>
    </div>
  );

  const renderCircularProgress = () => {
    const radius = size === 'sm' ? 14 : size === 'md' ? 20 : 28;
    const strokeWidth = size === 'sm' ? 2 : size === 'md' ? 3 : 4;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = indeterminate ? circumference * 0.25 : circumference - (percentage / 100) * circumference;

    return (
      <div className="relative inline-block">
        <svg
          className={`${currentSize.circular} transform -rotate-90`}
          viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius * 2 + strokeWidth}`}
        >
          {/* Background circle */}
          <circle
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            stroke={currentColor.background.replace('bg-', '')}
            strokeWidth={strokeWidth}
            fill="none"
            className="opacity-30"
          />
          {/* Progress circle */}
          <circle
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            stroke={currentColor.fill.replace('bg-', '')}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-300 ease-out-quart ${
              indeterminate ? 'animate-spin' : ''
            }`}
            style={{
              animation: indeterminate ? 'progress-circular-indeterminate 1.5s linear infinite' : undefined,
            }}
          />
        </svg>
        {showLabel && !indeterminate && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`${currentSize.label} ${currentColor.text} font-medium`}>
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderLabel = () => {
    if (!showLabel) return null;

    const labelClasses = `${currentSize.label} ${currentColor.text} font-medium`;
    const labelContent = indeterminate ? 'Loading...' : `${Math.round(percentage)}%`;

    switch (labelPosition) {
      case 'top':
        return <div className={`${labelClasses} mb-2`}>{labelContent}</div>;
      case 'bottom':
        return <div className={`${labelClasses} mt-2`}>{labelContent}</div>;
      case 'left':
        return <div className={`${labelClasses} mr-3`}>{labelContent}</div>;
      case 'right':
        return <div className={`${labelClasses} ml-3`}>{labelContent}</div>;
      default:
        return null;
    }
  };

  return (
    <div className={`${className}`}>
      {labelPosition === 'top' && renderLabel()}
      <div className={`flex items-center ${labelPosition === 'left' ? 'flex-row' : 'flex-col'}`}>
        {labelPosition === 'left' && renderLabel()}
        {variant === 'linear' ? renderLinearProgress() : renderCircularProgress()}
        {labelPosition === 'right' && renderLabel()}
      </div>
      {labelPosition === 'bottom' && renderLabel()}
    </div>
  );
};

// Add custom CSS for indeterminate animations
const style = document.createElement('style');
style.textContent = `
  @keyframes progress-indeterminate {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  @keyframes progress-circular-indeterminate {
    0% { stroke-dashoffset: 0; }
    50% { stroke-dashoffset: 50%; }
    100% { stroke-dashoffset: 100%; }
  }
`;
document.head.appendChild(style);


