import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'neutral';
  icon?: IconProp;
}

const variantClasses: Record<string, string> = {
  primary: 'bg-primary-100 text-primary-700',
  secondary: 'bg-secondary-100 text-secondary-700',
  success: 'bg-green-100 text-green-700',
  danger: 'bg-red-100 text-red-700',
  neutral: 'bg-neutral-100 text-neutral-700',
};

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary', icon }) => (
  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded font-sans text-xs font-medium ${variantClasses[variant]}`}>
    {icon && <FontAwesomeIcon icon={icon} className="w-4 h-4 mr-1" />}
    {label}
  </span>
); 