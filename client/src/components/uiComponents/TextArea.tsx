import React, {useId} from 'react';
import type {TextareaHTMLAttributes} from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({label, className = '', placeholder = '', ...props}, ref) => {
    const textAreaId = useId();

    return (
      <div className={`textarea-container ${className}`}>
        {label && <label htmlFor={textAreaId} className="textarea-label">{label}</label>}
        <textarea
          id={textAreaId}
          ref={ref}
          className={`w-full rounded-md border border-zinc-700 bg-transparent px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 ${className}`}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
export default TextArea;
