import React from 'react';
import type {ButtonHTMLAttributes} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
};

const SpButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({children, className = '', type = 'button', ...props}, ref) => {
    return (
      <button
        type={type}
        ref={ref}
        className={`
          mr-1 w-full sm:w-auto bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

SpButton.displayName = 'SpButton';
export default SpButton;



























