import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getVideoById, resetVideoState } from '@/features/videoSlice';
import Container from '@/components/uiComponents/Container';
import VideoPlayer from '@/components/VideoPlayer';

const VideoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { video, loading, error } = useAppSelector((state) => state.video);

  useEffect(() => {
    if (id) {
      dispatch(resetVideoState());
      dispatch(getVideoById({ videoId: id }));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="text-center py-8">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </Container>
    );
  }

  if (!video) {
    return (
      <Container>
        <div className="text-center py-8">
          <p className="text-red-500 text-lg">Video not found</p>
        </div>
      </Container>
    );
  }

  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const owner = typeof video.owner === 'string' ? null : video.owner;

  return (
    <Container>
      <div className="max-w-4xl mx-auto">
        {/* Video Player */}
        <div className="mb-6">
          <VideoPlayer video={video} className="w-full aspect-video" />
        </div>

        {/* Video Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-4">{video.title}</h1>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-gray-400">
              <span>{formatViews(video.views)}</span>
              <span>•</span>
              <span>{formatDate(video.createdAt)}</span>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span>Like</span>
              </button>

              <button className="flex items-center space-x-2 text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2" />
                </svg>
                <span>Dislike</span>
              </button>

              <button className="flex items-center space-x-2 text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Channel Info */}
        {owner && (
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={owner.avatar}
                alt={owner.fullName}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-white font-semibold">{owner.fullName}</h3>
                <p className="text-gray-400 text-sm">@{owner.username}</p>
              </div>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors">
              Subscribe
            </button>
          </div>
        )}

        {/* Video Description */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <h3 className="text-white font-semibold mb-2">Description</h3>
          <p className="text-gray-300 whitespace-pre-wrap">{video.description}</p>
        </div>

        {/* Comments Section */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-white font-semibold mb-4">Comments</h3>
          <div className="text-center py-8 text-gray-400">
            <p>Comments feature coming soon...</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VideoDetailPage;
