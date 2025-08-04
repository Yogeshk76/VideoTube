import React from 'react';
import type { Video } from '@/types/video.types';
import { Link } from 'react-router-dom';

interface VideoCardProps {
  video: Video;
  view?: 'card' | 'list';
}

const VideoCard: React.FC<VideoCardProps> = ({ video, view = 'card' }) => {
  // Helper function to format duration
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  // Helper function to format view count
  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  // Get owner info (handle both string and User object)
  const getOwnerInfo = () => {
    if (typeof video.owner === 'string') {
      return { fullName: 'Unknown', username: 'unknown', avatar: '/default-avatar.png' };
    }
    return video.owner;
  };

  const owner = getOwnerInfo();

  if (view === 'list') {
    return (
      <div className="flex w-full p-2 space-x-4 hover:bg-gray-800 rounded-lg transition-colors">
        <Link to={`/video/${video._id}`} className="flex-shrink-0 relative">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="object-cover w-48 h-28 rounded-lg"
          />
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
            {formatDuration(video.duration)}
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <Link to={`/video/${video._id}`}>
            <h3 className="text-lg font-semibold text-white hover:text-blue-400 line-clamp-2">
              {video.title}
            </h3>
          </Link>
          <Link to={`/channel/${owner.username}`}>
            <p className="text-sm text-gray-400 hover:text-white mt-1">
              {owner.fullName}
            </p>
          </Link>
          <p className="text-sm text-gray-500 mt-1">
            {formatViews(video.views)} • {formatDate(video.createdAt)}
          </p>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {video.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer">
      <div className="relative">
        <Link to={`/video/${video._id}`}>
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full aspect-video object-cover rounded-lg group-hover:rounded-none transition-all duration-200"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
            {formatDuration(video.duration)}
          </div>
        </Link>
      </div>

      <div className="mt-3 flex space-x-3">
        <Link to={`/channel/${owner.username}`} className="flex-shrink-0">
          <img
            src={owner.avatar}
            alt={owner.fullName}
            className="w-9 h-9 rounded-full"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <Link to={`/video/${video._id}`}>
            <h3 className="text-sm font-medium text-white group-hover:text-blue-400 line-clamp-2 leading-tight">
              {video.title}
            </h3>
          </Link>

          <Link to={`/channel/${owner.username}`}>
            <p className="text-sm text-gray-400 hover:text-white mt-1">
              {owner.fullName}
            </p>
          </Link>

          <p className="text-sm text-gray-500 mt-1">
            {formatViews(video.views)} • {formatDate(video.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard; 