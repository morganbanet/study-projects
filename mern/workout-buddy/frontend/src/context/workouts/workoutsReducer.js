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
    case 'SET_WORKOUTS':
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
    default:
      return state;
  }
};

export default workoutsReducer;
