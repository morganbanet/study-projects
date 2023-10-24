import { useState } from 'react';

import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { createWorkout } from '../context/workouts/workoutsActions';

function WorkoutForm() {
  const { dispatch, isLoading, error } = useWorkoutsContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: 'SET_LOADING' });
    const data = await createWorkout({ title, load, reps });

    if (data.error) {
      console.log(data);
      return dispatch({ type: 'SET_ERROR', payload: data.error });
    }

    dispatch({ type: 'CREATE_WORKOUT', payload: data.workout });

    setTitle('');
    setLoad('');
    setReps('');
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add New Workout</h3>

      <label>Workout Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={error && error.emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className={error && error.emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Workout Reps:</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={error && error.emptyFields.includes('reps') ? 'error' : ''}
      />

      {!isLoading && <button>Add Workout</button>}
      {error && <div className="error">{error.message}</div>}
    </form>
  );
}
export default WorkoutForm;
