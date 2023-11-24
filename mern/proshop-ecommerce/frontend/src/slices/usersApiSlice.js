import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

// For making requests to the server/API
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login user
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),

    // Logout user
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),

    // Register user
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  usersApiSlice;
