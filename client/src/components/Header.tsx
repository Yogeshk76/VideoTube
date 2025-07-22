import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container flex items-center justify-between p-4 mx-auto">
        <Link to="/" className="text-xl font-bold">
          VideoTube
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-gray-600 hover:text-gray-900">
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header; 