import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
// import { useFont } from './FontProvider';
// import { getRTLClasses, getFontFamily } from '../utils/arabicLocalization';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  iconLeft?: IconProp;
  iconRight?: IconProp;
  // Arabic support
  arabicLabel?: string;
  arabicPlaceholder?: string;
  arabicError?: string;
  arabicSuccess?: string;
  showArabicText?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  success, 
  iconLeft, 
  iconRight, 
  arabicLabel,
  arabicPlaceholder,
  arabicError,
  arabicSuccess,
  showArabicText = false,
  className, 
  ...props 
}) => {
  // const { language } = useFont();

  // Get text based on showArabicText
  const getLabelText = () => {
    if (showArabicText && arabicLabel) {
      return arabicLabel;
    }
    return label;
  };

  const getPlaceholderText = () => {
    if (showArabicText && arabicPlaceholder) {
      return arabicPlaceholder;
    }
    return props.placeholder;
  };

  const getErrorText = () => {
    if (showArabicText && arabicError) {
      return arabicError;
    }
    return error;
  };

  const getSuccessText = () => {
    if (showArabicText && arabicSuccess) {
      return arabicSuccess;
    }
    return success;
  };

  return (
    <div className="w-full">
      {getLabelText() && <label className="block mb-1 text-sm font-medium text-neutral-700">{getLabelText()}</label>}
      <div className="relative flex items-center">
        {iconLeft && <span className="absolute left-3 text-neutral-400"><FontAwesomeIcon icon={iconLeft} className="w-4 h-4" /></span>}
        <input
          className={
            `block w-full rounded border px-3 py-2 text-base focus:outline-none focus:ring-2 transition ` +
            (iconLeft ? 'pl-9 ' : '') +
            (iconRight ? 'pr-9 ' : '') +
            (getErrorText()
              ? 'border-red-500 focus:ring-red-500'
              : getSuccessText()
              ? 'border-green-500 focus:ring-green-500'
              : 'border-neutral-300 focus:ring-primary-500') +
            (className ? ' ' + className : '')
          }
          placeholder={getPlaceholderText()}
          {...props}
        />
        {iconRight && <span className="absolute right-3 text-neutral-400"><FontAwesomeIcon icon={iconRight} className="w-4 h-4" /></span>}
      </div>
      {getErrorText() && <p className="mt-1 text-xs text-red-600">{getErrorText()}</p>}
      {getSuccessText() && !getErrorText() && <p className="mt-1 text-xs text-green-600">{getSuccessText()}</p>}
    </div>
  );
}; 