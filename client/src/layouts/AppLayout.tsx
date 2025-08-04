import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/uiComponents/Header';
import Sidebar from '@/components/uiComponents/Sidebar';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 ml-64 pt-16">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

