import { apiSlice } from './apiSlice';
import { CATEGORIES_URL } from '../constants';

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories
    getCategories: builder.query({
      query: (query) => ({
        url: `${CATEGORIES_URL}${query ? query : ''}`,
      }),
    }),

    // Get single category
    getCategory: builder.query({
      query: (categoryId) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryQuery } =
  categoriesApiSlice;
