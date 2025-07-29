import React, {useId} from 'react';
import type {InputHTMLAttributes} from 'react';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({label,
    type = 'text',
    className = '',
    placeholder = '',
    ...props
  }, ref) => {
    const inputId = useId();

    return (
      <div className={`input-container ${className}`}>
        {label && <label htmlFor={inputId} className="input-label">{label}</label>}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={`w-full rounded-md border border-zinc-700 bg-transparent px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500
            ${className}`}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;