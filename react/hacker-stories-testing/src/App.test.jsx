import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
vi.mock("axios");

import App, {
  storiesReducer,
  Item,
  List,
  SearchForm,
  InputWithLabel,
} from "./App";

const storyOne = {
  title: "React",
  url: "https://reactjs.org/",
  author: "Jordan Walke",
  num_comments: 3,
  points: 4,
  objectID: 0,
};

const storyTwo = {
  title: "Redux",
  url: "https://redux.js.org/",
  author: "Dan Abramov, Andrew Clark",
  num_comments: 2,
  points: 5,
  objectID: 1,
};

const stories = [storyOne, storyTwo];

describe("storiesReducer", () => {
  it("sets loading to true when fetching stories", () => {
    const action = { type: "STORIES_FETCH_INIT" };
    const state = { data: [], isLoading: false, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [],
      isLoading: true,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it("sets stories data and sets loading to false", () => {
    const action = { type: "STORIES_FETCH_SUCCESS", payload: stories };
    const state = { data: [], isLoading: false, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: stories,
      isLoading: false,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it("sets isError to true if the fetch fails", () => {
    const action = { type: "STORIES_FETCH_FAILURE" };
    const state = { data: [], isLoading: false, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [],
      isLoading: false,
      isError: true,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  it("removes a story from all stories", () => {
    const action = { type: "REMOVE_STORY", payload: storyOne };
    const state = { data: stories, isLoading: false, isError: false };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [storyTwo],
      isLoading: false,
      isError: false,
    };

    expect(newState).toStrictEqual(expectedState);
  });
});

describe("Item", () => {
  it("renders all properties", () => {
    render(<Item item={storyOne} />);

    expect(screen.getByText("Jordan Walke")).toBeInTheDocument();
    expect(screen.getByText("React")).toHaveAttribute(
      "href",
      "https://reactjs.org/"
    );
  });

  it("renders a clickable dismiss button", () => {
    render(<Item item={storyOne} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("clicking the dismiss button calls the callback handler", () => {
    // vi.fn() creates a mock function
    // Returns undefined if no function given

    // arrange
    const handleRemoveItem = vi.fn();
    render(<Item item={storyOne} onRemoveItem={handleRemoveItem} />);

    // act
    fireEvent.click(screen.getByRole("button"));

    // assert
    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
  });
});

describe("SearchForm", () => {
  const searchFormProps = {
    searchTerm: "React",
    onSearchInput: vi.fn(),
    onSearchSubmit: vi.fn(),
  };

  it("renders the input field with its value", () => {
    render(<SearchForm {...searchFormProps} />);
    expect(screen.getByDisplayValue("React")).toBeInTheDocument();
  });

  it("renders the correct label", () => {
    render(<SearchForm {...searchFormProps} />);
    expect(screen.getByLabelText(/Search/)).toBeInTheDocument();
  });

  it("calls onSearchInput when the input field changes", () => {
    render(<SearchForm {...searchFormProps} />);

    // Change the search form value from 'React' to 'Redux'
    fireEvent.change(screen.getByDisplayValue("React"), {
      target: { value: "Redux" },
    });

    expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
  });

  it("calls onSearchSubmit when submit button is clicked", () => {
    render(<SearchForm {...searchFormProps} />);

    // Submit the form by clicking the form button
    fireEvent.submit(screen.getByRole("button"));

    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
  });
});

describe("App", () => {
  it("succeeds fetching data", () => {
    const promise = Promise.resolve({
      data: {
        hits: stories,
      },
    });
    axios.get.mockImplementationOnce(() => promise);
    render(<App />);
    screen.debug();
  });
});
