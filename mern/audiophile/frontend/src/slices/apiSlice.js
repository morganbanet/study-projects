import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants.js';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,

  // Types of data to fetch from the api
  tagTypes: ['Product', 'Order', 'User'],

  // Create endpoints to fetch data from
  endpoints: (builder) => ({}),
});
