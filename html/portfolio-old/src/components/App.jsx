import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import RootLayout from '../layouts/RootLayout';
import HomeScreen from '../screens/HomeScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<HomeScreen />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
