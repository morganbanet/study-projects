import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const register = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    const body = { username, email, password };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

    const response = await fetch('/api/users/register', options);
    const data = await response.json();

    // Dev logging
    console.log(data);

    if (!response.ok) {
      setIsLoading(false);
      setError(data.message);
      return;
    }

    // Set maxAge for userInfo in local storage (matches JWT maxAge)
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
    const timestamp = Date.now() + maxAge;
    const userInfo = { timestamp, ...data.data };

    // Save non-sensitive user info in local storage (JWT is in cookie)
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    // Set non-sensitive user info in state
    dispatch({ type: 'LOGIN_USER', payload: userInfo });

    setIsLoading(false);
  };

  return { register, isLoading, error };
};
