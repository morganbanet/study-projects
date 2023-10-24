import { useEffect } from 'react';

import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

function HomeScreen() {
  const { workouts, isLoading, error, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      dispatch({ type: 'SET_LOADING' });

      const response = await fetch('/api/workouts');
      const data = await response.json();

      // Bad server response
      if (!response.ok) {
        dispatch({ type: 'SET_ERROR', payload: data.message });
        throw new Error(data.message);
      }

      dispatch({ type: 'SET_WORKOUTS', payload: data.data });
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>

      <WorkoutForm />
    </div>
  );
}
export default HomeScreen;
