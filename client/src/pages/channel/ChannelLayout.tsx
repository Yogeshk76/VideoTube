import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUserChannelProfile } from '@/features/userSlice';
import Container from '@/components/uiComponents/Container';
import Button from '@/components/uiComponents/Button';

const ChannelLayout: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { channelProfile, loading, error } = useAppSelector((state) => state.user);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const navigationItems = [
    { path: `/channel/${channelId}`, label: 'Videos', icon: '📹' },
    { path: `/channel/${channelId}/playlists`, label: 'Playlists', icon: '📚' },
    { path: `/channel/${channelId}/tweets`, label: 'Tweets', icon: '🐦' },
    { path: `/channel/${channelId}/subscribers`, label: 'Subscribers', icon: '👥' },
  ];

  const isActive = (path: string) => {
    if (path === `/channel/${channelId}`) {
      return location.pathname === `/channel/${channelId}`;
    }
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    if (channelId) {
      dispatch(getUserChannelProfile({ username: channelId }));
    }
  }, [dispatch, channelId]);

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Container>
    );
  }

  if (error || !channelProfile) {
    return (
      <Container>
        <div className="text-center py-8">
          <p className="text-red-500 text-lg">Channel not found</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-6xl mx-auto py-8">
        {/* Channel Header */}
        <div className="bg-gray-800 rounded-lg overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative">
            {channelProfile.coverImage && (
              <img
                src={channelProfile.coverImage}
                alt="Channel cover"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Channel Info */}
          <div className="p-6">
            <div className="flex items-start space-x-6">
              <img
                src={channelProfile.avatar}
                alt={channelProfile.fullName}
                className="w-24 h-24 rounded-full border-4 border-gray-800 -mt-12"
              />
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-2">{channelProfile.fullName}</h1>
                <p className="text-gray-400 mb-2">@{channelProfile.username}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
                  <span>{channelProfile.subscribersCount} subscribers</span>
                  <span>{channelProfile.subscribedToCount} subscribed</span>
                </div>
                {isAuthenticated && (
                  <Button
                    className={`px-6 py-2 rounded-full ${channelProfile.isSubscribed
                        ? 'bg-gray-600 hover:bg-gray-700'
                        : 'bg-red-600 hover:bg-red-700'
                      }`}
                  >
                    {channelProfile.isSubscribed ? 'Subscribed' : 'Subscribe'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <nav className="flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-gray-800 rounded-lg p-6">
          <Outlet />
        </div>
      </div>
    </Container>
  );
};

export default ChannelLayout;

