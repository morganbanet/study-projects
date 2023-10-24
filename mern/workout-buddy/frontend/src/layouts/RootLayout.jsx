import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function RootLayout() {
  return (
    <div className="RootLayout">
      <Navbar />

      <div className="pages">
        <Outlet />
      </div>
    </div>
  );
}
export default RootLayout;
