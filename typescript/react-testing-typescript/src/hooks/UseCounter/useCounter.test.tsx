import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';

describe('useCounter', () => {
  it('render the initial count', () => {
    // Hook does not return JSX, and cannot be called outside of a
    // function component. RTL provides a renderHook method to fix this.

    // Hooks do not have DOM elements, so cannot use the screen method.
    // Instead renderHook wraps the hook in a function component,
    // invokes it, and returns and object where a "result" property can
    // be destructured from it.
    const { result } = renderHook(useCounter);

    // The current property on result will contain all the return values
    // from the custom hook (ie, count, increment, decrement).
    expect(result.current.count).toBe(0);
  });

  // Testing the arguments/props passed into our custom hook.
  it('accepts the initial count & renders it correctly', () => {
    // Use initialProps to specify which props to pass into our custom
    // hook. We assign an object to it as our CounterProps is an object.
    const { result } = renderHook(useCounter, {
      initialProps: {
        initialCount: 10, // Set initialCount to be 10
      },
    });

    // Expect the count state to be 10
    expect(result.current.count).toBe(10);
  });

  // Testing code that causes state updates should be wrapped in "act()".
  // This helper function offered by react-dom/test-utils (or RTL) makes
  // sure all updates have been process and applied to the DOM before
  // making any assertions.
  it('increments the count', () => {
    const { result } = renderHook(useCounter);

    // Call the increment function on our custom setCounter hook,
    // wrapping it in the act function to ensure the change in state
    // happens and is applied to DOM before making the assertion below.
    act(() => result.current.increment());

    expect(result.current.count).toBe(1);
  });

  // When testing custom hooks that update state, use the act function
  // offered by RTL on the appropiate functions.
  it('decrements the count', () => {
    const { result } = renderHook(useCounter);
    act(() => result.current.decrement()); // Causes state update, use act
    expect(result.current.count).toBe(-1);
  });
});
