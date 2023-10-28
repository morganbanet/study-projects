import { useState } from 'react';

import { useAuthContext } from './useAuthContext';
import { useWorkoutsContext } from '../workouts/useWorkoutsContext';

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch: dispatchWorkouts } = useWorkoutsContext();

  const { dispatch } = useAuthContext();

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    const options = {
      method: 'POST',
    };

    const response = await fetch('/api/users/logout', options);
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.message);
      return;
    }

    // Clear workouts state from client (prevent flicker of prev data)
    dispatchWorkouts({ type: 'GET_WORKOUTS', payload: null });

    // Remove user from local storage
    localStorage.clear();

    // Remove user from state
    dispatch({ type: 'LOGOUT_USER' });

    setIsLoading(false);
  };

  return { logout, isLoading, error };
};
