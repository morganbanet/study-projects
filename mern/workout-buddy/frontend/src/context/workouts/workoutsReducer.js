const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'GET_WORKOUTS':
      return {
        workouts: action.payload,
      };
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default workoutsReducer;
