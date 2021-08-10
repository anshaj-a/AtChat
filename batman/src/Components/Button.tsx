import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const ButtonPrimary: React.FC<ButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button className='bg-primary-500 p-3 rounded-md flex justify-center hover:bg-primary-600'>
      {children}
    </button>
  );
};

export const ButtonDark: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className='bg-dark-300 p-3 rounded-md my-2 hover:bg-dark-200 text-center'>
      {children}
    </button>
  );
};
