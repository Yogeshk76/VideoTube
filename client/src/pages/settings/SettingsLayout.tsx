import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Container from '@/components/uiComponents/Container';

const SettingsLayout: React.FC = () => {
  const location = useLocation();

  const navigationItems = [
    { path: '/settings', label: 'Personal Info', icon: '👤' },
    { path: '/settings/edit-personal-info', label: 'Edit Personal Info', icon: '✏️' },
    { path: '/settings/edit-channel-info', label: 'Channel Info', icon: '📺' },
    { path: '/settings/change-password', label: 'Change Password', icon: '🔒' },
  ];

  const isActive = (path: string) => {
    if (path === '/settings') {
      return location.pathname === '/settings';
    }
    return location.pathname === path;
  };

  return (
    <Container>
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account and channel settings</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-gray-800 rounded-lg p-4">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path)
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
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-gray-800 rounded-lg p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SettingsLayout;

