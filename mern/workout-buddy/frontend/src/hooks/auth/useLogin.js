import { useState } from 'react';

import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from '../workouts/useWorkoutsContext';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const { dispatch: dispatchWorkouts } = useWorkoutsContext();

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const body = { email, password };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

    const response = await fetch('/api/users/login', options);
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.message);
      return;
    }

    // Clear workouts state from client (prevent flicker of prev data)
    dispatchWorkouts({ type: 'GET_WORKOUTS', payload: null });

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

  return { login, isLoading, error };
};
