import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-4 mt-8 bg-gray-200">
      <div className="container mx-auto text-center text-gray-600">
        &copy; {new Date().getFullYear()} VideoTube. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer; 