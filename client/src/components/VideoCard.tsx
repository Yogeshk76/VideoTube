import React from 'react';
import type  {Video}  from '@/types/index';
import { Link } from 'react-router-dom';

interface VideoCardProps {
  video: Video;
  view?: 'card' | 'list';
}

const VideoCard: React.FC<VideoCardProps> = ({ video, view = 'card' }) => {
  if (view === 'list') {
    return (
      <div className="flex w-full p-2 space-x-4">
        <Link to={`/videos/${video.id}`} className="flex-shrink-0">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="object-cover w-48 h-28 rounded-lg"
          />
        </Link>
        <div className="flex-1">
          <Link to={`/videos/${video.id}`}>
            <h3 className="text-lg font-semibold">{video.title}</h3>
          </Link>
          <p className="text-sm text-gray-500">{video.channel.name}</p>
          <p className="text-sm text-gray-400">
            {video.views} views · {video.createdAt}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg">
      <Link to={`/videos/${video.id}`}>
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="object-cover w-full h-48"
        />
      </Link>
      <div className="p-4">
        <div className="flex items-start">
          <img
            src={video.channel.avatarUrl}
            alt={video.channel.name}
            className="w-10 h-10 mr-3 rounded-full"
          />
          <div className="flex-1">
            <Link to={`/videos/${video.id}`}>
              <h3 className="text-lg font-semibold">{video.title}</h3>
            </Link>
            <p className="text-sm text-gray-500">{video.channel.name}</p>
            <p className="text-sm text-gray-400">
              {video.views} views · {video.createdAt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard; 