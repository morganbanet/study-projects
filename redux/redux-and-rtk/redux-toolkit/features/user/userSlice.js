import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  users: [],
  error: '',
};

// createAsyncThunk method implements the creation and dispatching of
// asynchronous actions. "users/fetchUsers" is the action.type and the
// second argument is a callback function to create the action.payload.

// Generates pending, fulfilled, and rejected action types. We can
// listen to the action types with a reducer function, and perform the
// necessary state transitions.

// The reducers here are generated by this createAsyncThunk method and
// not by the slice, and have to be added as extra reducers in the slice
// instead.
const fetchUsers = createAsyncThunk('users/fetchUsers', () => {
  return axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.data.map((user) => user.id));

  // We do not need a catch block as the error is handled already by
  // createAsyncThunk method.

  // ** We can listen to the promise lifecycle using extra reducers in
  // the slice (pending, fulfilled, rejected), and then act on them
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = '';
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
export { fetchUsers }; // ??? Why export fetchUsers?
