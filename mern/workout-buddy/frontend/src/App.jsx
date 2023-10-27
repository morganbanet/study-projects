import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { AuthProvider } from './context/auth/authContext';
import { WorkoutsProvider } from './context/workouts/WorkoutsContext';

import RootLayout from './layouts/RootLayout';

import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

// Router tree
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
    </Route>
  )
);

// App component
function App() {
  return (
    <AuthProvider>
      <WorkoutsProvider>
        <RouterProvider router={router} />;
      </WorkoutsProvider>
    </AuthProvider>
  );
}
export default App;
