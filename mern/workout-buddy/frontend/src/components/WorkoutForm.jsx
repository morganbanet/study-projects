import { useState } from 'react';
import { useCreateWorkout } from '../hooks/workouts/useCreateWorkout';

function WorkoutForm() {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [files, setFiles] = useState(null);

  const { createWorkout, isLoading, error } = useCreateWorkout();

  const handleSubmit = (e) => {
    e.preventDefault();

    createWorkout(title, load, reps, files);

    if (title && load && reps) {
      setTitle('');
      setLoad('');
      setReps('');
    }

    setFiles(null);
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add New Workout</h3>

      <label>Workout Title:</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={error?.emptyFields?.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        name="load"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className={error?.emptyFields?.includes('load') ? 'error' : ''}
      />

      <label>Reps:</label>
      <input
        type="number"
        name="reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={error?.emptyFields?.includes('reps') ? 'error' : ''}
      />

      <label>Images (max 3):</label>
      <input
        type="file"
        name="images"
        onChange={(e) => setFiles(e.target.files)}
        multiple // Add on 'multiple' attribute for multiple images
      />

      {!isLoading && <button>Add Workout</button>}
      {isLoading && <span>Submitting...</span>}

      {error && <div className="error">{error.message}</div>}
    </form>
  );
}
export default WorkoutForm;
