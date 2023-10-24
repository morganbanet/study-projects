const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'GET_WORKOUTS':
      return {
        ...state,
        isLoading: false,
        error: null,
        workouts: action.payload,
      };
    case 'CREATE_WORKOUT':
      return {
        isLoading: false,
        error: null,
        workouts: [action.payload, ...state.workouts],
      };
    case 'DELETE_WORKOUT':
      return {
        isLoading: false,
        error: null,
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export default workoutsReducer;
