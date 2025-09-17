import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'confirmation' | 'form' | 'fullscreen';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  variant = 'default',
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEscape]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  const variantStyles = {
    default: 'bg-white rounded-lg shadow-xl',
    confirmation: 'bg-white rounded-lg shadow-xl',
    form: 'bg-white rounded-lg shadow-xl',
    fullscreen: 'bg-white h-full w-full rounded-none',
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-1400 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`${variantStyles[variant]} ${sizeStyles[size]} w-full ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            {title && (
              <h2 id="modal-title" className="text-lg font-semibold text-neutral-900">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label="Close modal"
              >
                <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Confirmation Modal
export const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel?: () => void;
  className?: string;
}> = ({
  isOpen,
  onClose,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel,
  className = '',
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const variantStyles = {
    danger: {
      button: 'bg-error-600 hover:bg-error-700 text-white',
      icon: 'text-error-600',
    },
    warning: {
      button: 'bg-warning-600 hover:bg-warning-700 text-white',
      icon: 'text-warning-600',
    },
    info: {
      button: 'bg-primary-600 hover:bg-primary-700 text-white',
      icon: 'text-primary-600',
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      variant="confirmation"
      size="sm"
      className={className}
    >
      <div className="space-y-4">
        <p className="text-neutral-600">{message}</p>
        
        <div className="flex space-x-3 justify-end">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-neutral-700 bg-neutral-200 rounded-lg hover:bg-neutral-300 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg transition-colors ${currentVariant.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Form Modal
export const FormModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  onSubmit: () => void;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
}> = ({
  isOpen,
  onClose,
  title,
  children,
  submitText = 'Submit',
  cancelText = 'Cancel',
  onSubmit,
  onCancel,
  isLoading = false,
  className = '',
}) => {
  const handleSubmit = () => {
    onSubmit();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      variant="form"
      size="lg"
      className={className}
    >
      <div className="space-y-6">
        <div>
          {children}
        </div>
        
        <div className="flex space-x-3 justify-end pt-4 border-t border-neutral-200">
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="px-4 py-2 text-neutral-700 bg-neutral-200 rounded-lg hover:bg-neutral-300 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : submitText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Fullscreen Modal
export const FullscreenModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      variant="fullscreen"
      className={className}
    >
      <div className="h-full overflow-auto">
        {children}
      </div>
    </Modal>
  );
}; 