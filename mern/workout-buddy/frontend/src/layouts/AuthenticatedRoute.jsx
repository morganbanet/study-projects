import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/auth/useAuthContext';

function AuthenticatedLayout() {
  const { userInfo } = useAuthContext();
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}
export default AuthenticatedLayout;
