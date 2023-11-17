import { render, screen } from '@testing-library/react';
import App from '../App';

// prettier-ignore
describe('App component', () => {

  /** -- Test Anatomy --
   * Tests can take up to three arguments. The name of the test, the
   * function, and an optional timeout argument (how long to wait before
   * aborting the test). */

  it('render the text "App"', () => {
    render(<App />);
    const wordApp = screen.getByText(/App/i); // i = case insensitive
    expect(wordApp).toBeInTheDocument(); // "matcher function" assertion
  });
});

/** -- What to test? --
 * Test component renders
 * Test component renders with props
 * Test component renders in different states (ie, navbar login button)
 * Test component reacts to events (ie, button clicks, key presses, etc)
 */

/**
 * -- What not to test? --
 * Implementation details (test the behaviour, not how it's implemented)
 * Third party code (external libraries)
 * Code that is not important from a user point of view
 */
