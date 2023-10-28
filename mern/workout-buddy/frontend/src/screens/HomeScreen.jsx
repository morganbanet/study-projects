import { useEffect } from 'react';

import { useAuthContext } from '../hooks/auth/useAuthContext';
import { useWorkoutsContext } from '../hooks/workouts/useWorkoutsContext';

import { useGetWorkouts } from '../hooks/workouts/useGetWorkouts';

import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

function HomeScreen() {
  const { getWorkouts } = useGetWorkouts();

  const { workouts } = useWorkoutsContext();
  const { userInfo } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => await getWorkouts();

    fetchWorkouts();
  }, [userInfo]);

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
