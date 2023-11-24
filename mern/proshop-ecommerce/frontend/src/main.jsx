import React from 'react';
import { Provider } from 'react-redux';

import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import store from './store.js';

import App from './App.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

import HomeScreen from './screens/HomeScreen.jsx';
import ProductScreen from './screens/ProductScreen.jsx';
import CartScreen from './screens/CartScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';

import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

// Routes tree
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/products/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
      </Route>
    </Route>
  )
);

// Render components at root
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provide the routes tree through "router" */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
