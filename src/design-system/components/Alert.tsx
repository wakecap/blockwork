import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faExclamation, faInfo, faXmark } from '@fortawesome/free-solid-svg-icons';

export interface AlertProps {
  title?: string;
  message: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
  showIcon?: boolean;
  showCloseButton?: boolean;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({
  title,
  message,
  variant = 'info',
  showIcon = true,
  showCloseButton = false,
  onClose,
  className = '',
  children,
}) => {
  const variantStyles = {
    success: {
      background: 'bg-success-50',
      border: 'border-success-200',
      title: 'text-success-800',
      message: 'text-success-700',
      icon: faCheck,
      iconColor: 'text-success-600',
    },
    error: {
      background: 'bg-error-50',
      border: 'border-error-200',
      title: 'text-error-800',
      message: 'text-error-700',
      icon: faTimes,
      iconColor: 'text-error-600',
    },
    warning: {
      background: 'bg-warning-50',
      border: 'border-warning-200',
      title: 'text-warning-800',
      message: 'text-warning-700',
      icon: faExclamation,
      iconColor: 'text-warning-600',
    },
    info: {
      background: 'bg-info-50',
      border: 'border-info-200',
      title: 'text-info-800',
      message: 'text-info-700',
      icon: faInfo,
      iconColor: 'text-info-600',
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <div
      className={`${currentVariant.background} ${currentVariant.border} border rounded-lg p-4 ${className}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {showIcon && (
          <FontAwesomeIcon
            icon={currentVariant.icon}
            className={`${currentVariant.iconColor} mt-0.5 flex-shrink-0`}
          />
        )}
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={`${currentVariant.title} font-medium text-sm mb-1`}>
              {title}
            </h3>
          )}
          <div className={`${currentVariant.message} text-sm`}>
            {message}
          </div>
          {children && <div className="mt-3">{children}</div>}
        </div>
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className={`${currentVariant.message} hover:opacity-70 transition-opacity flex-shrink-0`}
            aria-label="Close alert"
          >
            <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};


