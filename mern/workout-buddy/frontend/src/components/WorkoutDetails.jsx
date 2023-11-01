import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useDeleteWorkout } from '../hooks/workouts/useDeleteWorkout';

function WorkoutDetails({ workout }) {
  const { deleteWorkout, isLoading, error } = useDeleteWorkout();

  const handleClick = async () => {
    await deleteWorkout(workout._id);
  };

  return (
    <div className="workout-details">
      <div className="details">
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
          {formatDistanceToNow(new Date(workout.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>

      <div className="workout-images">
        {workout.images.map((image) => (
          <img src={image.url} key={image._id} />
        ))}
      </div>

      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
}
export default WorkoutDetails;
