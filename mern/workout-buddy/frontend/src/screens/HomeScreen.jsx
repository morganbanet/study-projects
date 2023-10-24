import { useEffect } from 'react';

import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { getWorkouts } from '../context/workouts/workoutsActions';

import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

function HomeScreen() {
  const { workouts, isLoading, error, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      dispatch({ type: 'SET_LOADING' });
      const data = await getWorkouts();

      if (data.error) {
        return dispatch({ type: 'SET_ERROR', payload: data.error });
      }

      dispatch({ type: 'GET_WORKOUTS', payload: data.workouts });
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
