import { createContext, useReducer } from 'react';
import authReducer from './authReducer';

const AuthContext = createContext();

function AuthProvider({ children }) {
  // Check if non-sensitive user info already in storage
  let userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  // Clear local storage if current date exceeded userInfo.timestamp
  // (matches JWT maxAge)
  if (userInfo && Date.now() > userInfo.timestamp) {
    localStorage.clear();
    userInfo = null;
  }

  const initialState = {
    userInfo,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthProvider, AuthContext };
