import React from 'react';
import Container from '@/components/uiComponents/Container';

const MyTweets: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">My Tweets</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          New Tweet
        </button>
      </div>

      <div className="text-center py-12">
        <p className="text-gray-400 text-lg mb-4">Tweet feature coming soon...</p>
        <p className="text-gray-500 text-sm">You'll be able to create and manage tweets here</p>
      </div>
    </div>
  );
};

export default MyTweets;

