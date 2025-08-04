import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/uiComponents/Container';
import Button from '@/components/uiComponents/Button';

const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-700">404</h1>
          <h2 className="text-3xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-gray-400 text-lg max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Go Home
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 border border-gray-600 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>

        <div className="mt-12 text-gray-500">
          <p className="text-sm">
            Try searching for something else or check out our{' '}
            <Link to="/" className="text-blue-400 hover:text-blue-300">
              trending videos
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default NotFoundPage;

