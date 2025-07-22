import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Page imports
import EmptyVideoPage from '@/pages/EmptyVideoPage';
import Layout from '@/components/Layout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<EmptyVideoPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
