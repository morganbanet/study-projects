import { useState } from 'react';
import { useWorkoutsContext } from './useWorkoutsContext';

export const useDeleteWorkout = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const { dispatch } = useWorkoutsContext();

  const deleteWorkout = async (id) => {
    setIsLoading(true);
    setError(null);

    const options = {
      method: 'DELETE',
    };

    const response = await fetch(`/api/workouts/${id}`, options);
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.message);
      return;
    }

    // Set non-sensitive user info in state
    dispatch({ type: 'DELETE_WORKOUT', payload: { id } });

    setIsLoading(false);
  };

  return { deleteWorkout, isLoading, error };
};
