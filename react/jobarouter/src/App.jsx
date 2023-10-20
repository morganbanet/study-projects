import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { careersLoader } from './screens/careers/CareersScreen';
import { careerDetailsLoader } from './screens/careers/CareerDetails';

import { contactAction } from './screens/help/ContactScreen';

import RootLayout from './layouts/RootLayout';
import HelpLayout from './layouts/HelpLayout.jsx';
import CareersLayout from './layouts/CareersLayout';

import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';

import FaqScreen from './screens/help/FaqScreen';
import ContactScreen from './screens/help/ContactScreen';

import CareersScreen from './screens/careers/CareersScreen';
import CareerDetailsScreen from './screens/careers/CareerDetails';
import CareersErrorScreen from './screens/careers/CareersErrorScreen';

import NotFoundScreen from './screens/NotFoundScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomeScreen />} />
      <Route path="about" element={<AboutScreen />} />

      <Route path="help" element={<HelpLayout />}>
        <Route path="faq" element={<FaqScreen />} />
        <Route
          path="contact"
          element={<ContactScreen />}
          action={contactAction}
        />
      </Route>

      <Route
        path="careers"
        element={<CareersLayout />}
        errorElement={<CareersErrorScreen />}
      >
        <Route index loader={careersLoader} element={<CareersScreen />} />
        <Route
          path=":id"
          loader={careerDetailsLoader}
          element={<CareerDetailsScreen />}
        />
      </Route>

      <Route path="*" element={<NotFoundScreen />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
