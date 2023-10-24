import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { WorkoutsProvider } from './context/workouts/WorkoutsContext';
import RootLayout from './layouts/RootLayout';
import HomeScreen from './screens/HomeScreen.jsx';

// Router tree
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index path="/" element={<HomeScreen />} />
    </Route>
  )
);

// App component
function App() {
  return (
    <WorkoutsProvider>
      <RouterProvider router={router} />;
    </WorkoutsProvider>
  );
}
export default App;
