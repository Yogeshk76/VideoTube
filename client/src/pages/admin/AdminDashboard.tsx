import React from 'react';
import Container from '@/components/uiComponents/Container';

const AdminDashboard: React.FC = () => {
  return (
    <Container>
      <div className="max-w-6xl mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage the platform and monitor system health</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-500">1,234</p>
            <p className="text-gray-400 text-sm">+12% from last month</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Total Videos</h3>
            <p className="text-3xl font-bold text-green-500">5,678</p>
            <p className="text-gray-400 text-sm">+8% from last month</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-2">Total Views</h3>
            <p className="text-3xl font-bold text-purple-500">123K</p>
            <p className="text-gray-400 text-sm">+15% from last month</p>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors">
              <div className="text-2xl mb-2">👥</div>
              <div className="font-semibold">Manage Users</div>
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors">
              <div className="text-2xl mb-2">📹</div>
              <div className="font-semibold">Review Videos</div>
            </button>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white p-4 rounded-lg transition-colors">
              <div className="text-2xl mb-2">🚨</div>
              <div className="font-semibold">Reports</div>
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-semibold">Settings</div>
            </button>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">New user registered: john_doe</span>
              <span className="text-gray-500 text-sm ml-auto">2 minutes ago</span>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300">Video uploaded: "React Tutorial"</span>
              <span className="text-gray-500 text-sm ml-auto">15 minutes ago</span>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-300">Report filed for inappropriate content</span>
              <span className="text-gray-500 text-sm ml-auto">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminDashboard;

