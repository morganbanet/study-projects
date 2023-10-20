import { Outlet } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavHeaderProvider } from './context/NavHeaderContext';
import NavHeader from './components/NavHeader';
import NavFooter from './components/NavFooter';

// Scroll to top on page change
const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function App() {
  return (
    <>
      <Wrapper>
        <NavHeaderProvider>
          {/* Header */}
          <NavHeader />

          {/* Main */}
          <main>
            <Outlet />
          </main>

          {/* Footer */}
          <NavFooter />
        </NavHeaderProvider>
      </Wrapper>
    </>
  );
}

export default App;
