import React from 'react';
import type {ButtonHTMLAttributes} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({children, className = '', type = 'button', isActive = false, ...props}, ref) => {
    return (
      <button
        type={type}
        ref={ref}
        className={`
          flex w-full items-center gap-4 rounded-lg px-4 py-2 text-sm font-medium transition-all
          ${isActive ? 'bg-purple-500 text-white' : 'hover:bg-purple-800 text-zinc-400'}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;