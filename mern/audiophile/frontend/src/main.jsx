import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/styles/index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import HomeScreen from './screens/HomePage.jsx';
import ProductList from './screens/ProductList.jsx';
import ProductDetails from './screens/ProductDetails.jsx';
import { Provider } from 'react-redux';
import store from './store.js';

// Route tree
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/:categorySlug/" element={<ProductList />} />
      <Route
        path="/:categorySlug/:productSlug/:productId"
        element={<ProductDetails />}
      />
    </Route>
  )
);

// Render at root
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
