import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@/components/uiComponents/Container';

const PlaylistDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Playlist Details</h1>
          <p className="text-gray-400">Playlist ID: {id}</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">Playlist feature coming soon...</p>
            <p className="text-gray-500 text-sm">You'll be able to view and manage playlists here</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PlaylistDetailsPage;

