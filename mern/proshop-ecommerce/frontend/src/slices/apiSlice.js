import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,

  // Types of data we will be fetching from our API
  tagTypes: ['Product', 'Order', 'User'],

  // We don't have to manually fetch our data with this
  endpoints: (builder) => ({}),
});

export default apiSlice;
