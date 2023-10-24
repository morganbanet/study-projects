export const getWorkouts = async () => {
  const response = await fetch('/api/workouts');
  const data = await response.json();

  if (!response.ok) {
    return { error: data };
  }

  return { workouts: data.data, count: data.count };
};

export const createWorkout = async (body) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  const response = await fetch('/api/workouts', options);
  const data = await response.json();

  if (!response.ok) {
    return { error: data };
  }

  return { workout: data.data };
};

export const deleteWorkout = async (id) => {
  const options = {
    method: 'DELETE',
  };

  const response = await fetch(`/api/workouts/${id}`, options);
  const data = await response.json();

  if (!response.ok) {
    return { error: data };
  }

  return { workout: data.data };
};
