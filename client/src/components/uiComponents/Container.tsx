import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return <div className={`w-full max-w-7xl px-4 mx-auto ${className}`}>{children}</div>;
};

Container.displayName = 'Container';
export default Container;
