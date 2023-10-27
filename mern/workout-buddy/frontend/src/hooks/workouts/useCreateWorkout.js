import { useState } from 'react';
import { useWorkoutsContext } from './useWorkoutsContext';

export const useCreateWorkout = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const { dispatch } = useWorkoutsContext();

  const createWorkout = async (title, load, reps) => {
    setIsLoading(true);
    setError(null);

    const body = { title, load, reps };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

    const response = await fetch('/api/workouts/', options);
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.message);
      return;
    }

    // Set non-sensitive user info in state
    dispatch({ type: 'CREATE_WORKOUT', payload: data.data });

    setIsLoading(false);
  };

  return { createWorkout, isLoading, error };
};
