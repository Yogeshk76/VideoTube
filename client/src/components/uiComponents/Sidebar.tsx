import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const navigationItems = [
    { icon: '🏠', label: 'Home', path: '/' },
    { icon: '📺', label: 'Subscriptions', path: '/subscriptions' },
    { icon: '⏰', label: 'History', path: '/history' },
    { icon: '👍', label: 'Liked Videos', path: '/liked' },
  ];


  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-16 w-64 h-full bg-gray-900 border-r border-gray-800 overflow-y-auto">
      <div className="p-4">
        {/* Main Navigation */}
        <nav className="mb-6">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(item.path)
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>





        {/* Subscriptions Section */}
        {isAuthenticated && (
          <div className="mb-6">
            <h3 className="px-3 py-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Subscriptions
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-300">
                <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                <span>Channel Name 1</span>
              </div>
              <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-300">
                <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                <span>Channel Name 2</span>
              </div>
              <div className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-300">
                <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                <span>Channel Name 3</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Links */}
        <div className="mt-auto pt-4 border-t border-gray-800">
          <div className="px-3 py-2">
            <div className="flex flex-wrap gap-2 text-xs text-gray-400">
              <a href="#" className="hover:text-white">About</a>
              <a href="#" className="hover:text-white">Press</a>
              <a href="#" className="hover:text-white">Copyright</a>
              <a href="#" className="hover:text-white">Contact us</a>
              <a href="#" className="hover:text-white">Creators</a>
              <a href="#" className="hover:text-white">Advertise</a>
              <a href="#" className="hover:text-white">Developers</a>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-gray-400 mt-2">
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Policy & Safety</a>
              <a href="#" className="hover:text-white">How YouTube works</a>
            </div>
            <p className="text-xs text-gray-500 mt-2">© 2025 VideoTube</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

