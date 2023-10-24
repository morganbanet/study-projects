import { useEffect, useState } from 'react';

import WorkoutDetails from '../components/WorkoutDetails';

function HomeScreen() {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts');
      const { data } = await response.json();

      // Bad server response
      if (!response.ok) {
        const message = `Resource not found`;
        throw new Error(message);
      }

      setWorkouts(data);
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
    </div>
  );
}
export default HomeScreen;
