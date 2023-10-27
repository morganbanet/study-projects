import { useState } from 'react';
import { useCreateWorkout } from '../hooks/workouts/useCreateWorkout';

function WorkoutForm() {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');

  const { createWorkout, isLoading, error } = useCreateWorkout();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createWorkout(title, load, reps);

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

      <label>Reps:</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={error && error.emptyFields.includes('reps') ? 'error' : ''}
      />

      <button disabled={isLoading}>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
export default WorkoutForm;
