import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

function WorkoutForm() {
  const { dispatch, isLoading, error } = useWorkoutsContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: 'SET_LOADING' });

    const workout = { title, load, reps };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workout),
    };

    const response = await fetch('/api/workouts', options);
    const data = await response.json();

    // Bad server response
    if (!response.ok) {
      dispatch({ type: 'SET_ERROR', payload: data.message });
      throw new Error(data.message);
    }

    // Update global workouts state
    dispatch({ type: 'CREATE_WORKOUT', payload: data.data });

    // Reset form and wipe any errors
    setTitle('');
    setLoad('');
    setReps('');

    // Logging for dev
    console.log(data);
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add New Workout</h3>

      <label>Workout Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />

      <label>Workout Reps:</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />

      {!isLoading && <button>Add Workout</button>}
      {isLoading && <button disabled>Adding...</button>}

      {error && <div className="error">{error}</div>}
    </form>
  );
}
export default WorkoutForm;
