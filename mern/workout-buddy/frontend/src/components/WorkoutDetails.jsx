import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { deleteWorkout } from '../context/workouts/workoutsActions';

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    dispatch({ type: 'SET_LOADING' });
    const data = await deleteWorkout(workout._id);

    if (data.error) {
      return dispatch({ type: 'SET_ERROR', payload: data.error });
    }

    dispatch({ type: 'DELETE_WORKOUT', payload: workout });
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>

      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
}
export default WorkoutDetails;
