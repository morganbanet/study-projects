import React from 'react';
import { createContext, useReducer } from 'react';
import alertReducer from './AlertReducer';

const AlertContext = createContext();

function AlertProvider({ children }) {
  const initialState = null;

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Can remove type if wanted, but lets you show another type also
  const setAlert = (msg, type) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type },
    });

    setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000);
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export { AlertContext, AlertProvider };
