import React from 'react';
import { useAppSelector } from '@/store/hooks';
import VideoCard from '@/components/VideoCard';

const ChannelVideos: React.FC = () => {
  const { videos } = useAppSelector((state) => state.video);

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Videos</h2>

      {videos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No videos found for this channel</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChannelVideos;

