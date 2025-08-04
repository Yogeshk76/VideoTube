import React, { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { getCurrentUser } from '@/features/authSlice';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check if user is already authenticated on app load
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <AppRoutes />
    </>
  );
};

export default App;

