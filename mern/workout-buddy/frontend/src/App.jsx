import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { AuthProvider } from './context/auth/AuthContext';
import { WorkoutsProvider } from './context/workouts/WorkoutsContext';

import RootLayout from './layouts/RootLayout';
import AuthenticatedLayout from './layouts/AuthenticatedRoute';
import UnauthenticatedLayout from './layouts/UnauthenticatedRoute';

import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

// Router tree
// prettier-ignore
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      
      {/* Unauthenticated users */}
      <Route path="" element={<UnauthenticatedLayout />}>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Route>

      {/* Authenticated users */}
      <Route path="" element={<AuthenticatedLayout />}>
        <Route index path="/" element={<HomeScreen />} />
      </Route>

      <Route path="*" element={<h2>404 - Not Found</h2>} />
    </Route>
  )
);

// App component
function App() {
  return (
    <AuthProvider>
      <WorkoutsProvider>
        <RouterProvider router={router} />
      </WorkoutsProvider>
    </AuthProvider>
  );
}
export default App;
