import { configureStore } from '@reduxjs/toolkit';
import cakeReducer from '../features/cake/cakeSlice.js';
import icecreamReducer from '../features/icecream/icecreamSlice.js';
import userReducer from '../features/user/userSlice.js';

// import reduxLogger from 'redux-logger';
// const logger = reduxLogger.createLogger();

const store = configureStore({
  // Combines all the reducers from cakeSlice.js & icecreamSlice.js
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
    user: userReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// This is how we will access the store from our application in index.js
export default store;
