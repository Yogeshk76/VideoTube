import {Navigate, Outlet, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

const RequireAuth = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;