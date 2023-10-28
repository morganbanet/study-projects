import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/auth/useAuthContext';

function UnauthenticatedLayout() {
  const { userInfo } = useAuthContext();
  return userInfo ? <Navigate to="/" replace /> : <Outlet />;
}
export default UnauthenticatedLayout;
