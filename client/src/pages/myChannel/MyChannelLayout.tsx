import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import Container from '@/components/uiComponents/Container';

const MyChannelLayout: React.FC = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const navigationItems = [
    { path: '/my-channel', label: 'Videos', icon: '📹' },
    { path: '/my-channel/playlists', label: 'Playlists', icon: '📚' },
    { path: '/my-channel/tweets', label: 'Tweets', icon: '🐦' },
  ];

  const isActive = (path: string) => {
    if (path === '/my-channel') {
      return location.pathname === '/my-channel';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Container>
      <div className="max-w-6xl mx-auto py-8">
        {/* Channel Header */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-6">
            <img
              src={user?.avatar || '/default-avatar.png'}
              alt={user?.fullName || 'User'}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">{user?.fullName}</h1>
              <p className="text-gray-400">@{user?.username}</p>
              <p className="text-gray-400 text-sm">{user?.email}</p>
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

export default MyChannelLayout;

