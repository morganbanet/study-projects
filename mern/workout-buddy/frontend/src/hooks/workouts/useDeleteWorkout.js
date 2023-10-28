import { useState } from 'react';
import { useAuthContext } from '../auth/useAuthContext';
import { useWorkoutsContext } from './useWorkoutsContext';

export const useDeleteWorkout = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const { userInfo } = useAuthContext();
  const { dispatch } = useWorkoutsContext();

  const deleteWorkout = async (id) => {
    setIsLoading(true);
    setError(null);

    if (!userInfo) {
      setError('You must be logged in');
      setIsLoading(false);
      return;
    }

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
