import React from 'react';

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const Slider: React.FC<SliderProps> = ({ label, min = 0, max = 100, step = 1, value, onChange, disabled, className, ...props }) => (
  <div className="w-full font-sans">
    {label && <label className="block mb-1 text-sm font-medium text-neutral-700">{label}</label>}
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={
        `w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer transition ` +
        (disabled ? 'opacity-50 cursor-not-allowed ' : '') +
        (className ? ' ' + className : '')
      }
      {...props}
    />
    <div className="text-xs text-neutral-500 mt-1">{value}</div>
  </div>
); 