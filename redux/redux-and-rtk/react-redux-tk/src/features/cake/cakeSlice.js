import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  numOfCakes: 10,
};

// Create slice automatically generated action creators and returns them
// using the same names as the reducer functions we have written inside.
// It also returns the main reducer function which we can provide to our
// Redux store.

// Reducers from this slice will only respond to action creators
// generated from this specific slice.
const cakeSlice = createSlice({
  name: 'cake',
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfCakes--;
    },
    restocked: (state, action) => {
      state.numOfCakes += action.payload;
    },
  },
});

// Must be default export. This is how we combine and set up our
// reducers from this slice in our app/store.js file
export default cakeSlice.reducer;

// Should be named export. This is how we dispatch actions from around
// our application
export const { ordered, restocked } = cakeSlice.actions;
