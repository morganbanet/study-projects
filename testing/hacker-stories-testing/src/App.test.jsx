import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

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

describe('Item', () => {
  it('renders all properties', () => {
    // Render a component to test, and pass in a prop
    render(<Item item={storyOne} />);

    expect(screen.getByText('Jordan Walke')).toBeInTheDocument();
    expect(screen.getByText('React')).toHaveAttribute(
      'href',
      'https://reactjs.org/'
    );

    // Output what has been rendered in jsdoms environment
    screen.debug();
  });
});
