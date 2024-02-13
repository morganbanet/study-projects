import React from 'react';
import ReactDOM from 'react-dom/client';

// Import provider and your store file
import { Provider } from 'react-redux';
import store from './app/store.js';

import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap the provider component around your app, passing in your store
  // as a prop
  <Provider store={store}>
    <App />
  </Provider>
);
