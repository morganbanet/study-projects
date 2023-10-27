import { useState } from 'react';
import { useWorkoutsContext } from './useWorkoutsContext';

export const useGetWorkouts = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const { dispatch } = useWorkoutsContext();

  const getWorkouts = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/workouts/');
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.message);
      return;
    }

    // Set non-sensitive user info in state
    dispatch({ type: 'GET_WORKOUTS', payload: data.data });

    setIsLoading(false);
  };

  return { getWorkouts, isLoading, error };
};
