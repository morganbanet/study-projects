import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import RootLayout from './layouts/RootLayout';

import HomeScreen from './screens/HomeScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index path="/" element={<HomeScreen />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
