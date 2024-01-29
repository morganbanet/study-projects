import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <div className="root-layout">
      <div className="screens">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
