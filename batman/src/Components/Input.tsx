import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const DarkInput: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`bg-dark-200
        outline-none
        rounded-md
        w-full
        placeholder-dark-100
        text-white
        focus:bg-dark-300 ${className}`}
      {...props}
    />
  );
};
