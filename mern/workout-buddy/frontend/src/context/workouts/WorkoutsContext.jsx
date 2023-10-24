import { createContext, useReducer } from 'react';
import workoutsReducer from './workoutsReducer';

const WorkoutsContext = createContext();

function WorkoutsProvider({ children }) {
  const initialState = {
    workouts: null,
    isLoading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(workoutsReducer, initialState);

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
}
export { WorkoutsProvider, WorkoutsContext };
