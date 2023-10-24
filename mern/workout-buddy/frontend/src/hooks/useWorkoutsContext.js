import { useContext } from 'react';
import { WorkoutsContext } from '../context/workouts/WorkoutsContext';

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw new Error('useWorkouts must be used within WorkoutsProvider');
  }

  return context;
};
