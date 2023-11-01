import { useState } from 'react';
import { useAuthContext } from '../auth/useAuthContext';
import { useWorkoutsContext } from './useWorkoutsContext';

export const useCreateWorkout = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const { userInfo } = useAuthContext();
  const { dispatch } = useWorkoutsContext();

  const createWorkout = async (title, load, reps, files) => {
    setIsLoading(true);

    if (!userInfo) {
      setError({ message: 'You must be logged in' });
      setIsLoading(false);
      return;
    }

    // multipart/form-data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('load', load), formData.append('reps', reps);

    // Append multiple images to formData
    for (let x = 0; x < files.length; x++) {
      formData.append('images', files[x]);
    }

    const response = await fetch('/api/workouts/', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data);
      return;
    }

    dispatch({
      type: 'CREATE_WORKOUT',
      payload: data.data,
    });

    setIsLoading(false);
    setError(null);
  };

  return { createWorkout, isLoading, error };
};
