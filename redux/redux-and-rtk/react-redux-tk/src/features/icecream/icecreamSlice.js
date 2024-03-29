import { createSlice } from '@reduxjs/toolkit';
import { ordered as cakeOrdered } from '../cake/cakeSlice.js';

const initialState = { numOfIcecreams: 20 };

const icecreamSlice = createSlice({
  name: 'icecream',
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfIcecreams--;
    },
    restocked: (state, action) => {
      state.numOfIcecreams += action.payload;
    },
  },

  // Extra reducers are additional reducers seperate from the ones
  // generated by this createSlice method. These reducers can be used
  // in other slices.
  extraReducers: (builder) => {
    builder.addCase(cakeOrdered, (state) => {
      state.numOfIcecreams--;
    });
  },

  // Old way, does not work anymore
  // extraReducers: {
  //   ['cake/ordered']: (state) => {
  //     state.numOfIcecreams--;
  //   },
  // },
});

export default icecreamSlice.reducer;
export const { ordered, restocked } = icecreamSlice.actions;
