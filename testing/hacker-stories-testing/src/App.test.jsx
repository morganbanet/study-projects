import React from 'react';
import { describe, it, expect } from 'vitest';

import { storiesReducer, Item, List, SearchForm, InputWithLabel } from './App';

const storyOne = {
  title: 'React',
  url: 'https://reactjs.org/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0,
};

const storyTwo = {
  title: 'Redux',
  url: 'https://reduxjs.org/',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 3,
  points: 5,
  objectID: 1,
};

const stories = [storyOne, storyTwo];

describe('storiesReducer', () => {
  it('removes a story from all stories', () => {
    const state = { data: stories, isLoading: false, isError: false };
    const action = { type: 'REMOVE_STORY', payload: storyOne };

    const newState = storiesReducer(state, action);

    // newState object should be this
    const expectedState = {
      data: [storyTwo],
      isLoading: false,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it('sets an error when fetching fails', () => {
    const state = { data: {}, isLoading: false, isError: false };
    const action = { type: 'STORIES_FETCH_FAILURE' };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: {},
      isLoading: false,
      isError: true,
    };

    expect(newState).toStrictEqual(expectedState);
  });
});
