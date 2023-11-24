import { Outlet } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="py-3">
        <Container>
          {/* Render child route elements from main.jsx parent route */}
          <Outlet />
        </Container>
      </main>

      {/* Footer */}
      <Footer />

      {/* React Toastify */}
      <ToastContainer />
    </>
  );
};

export default App;
