import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function RootLayout() {
  return (
    <div className="app">
      <Navbar />

      <div className="pages">
        <Outlet />
      </div>
    </div>
  );
}
export default RootLayout;
