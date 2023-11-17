import { render, screen } from '@testing-library/react';
import App from './App';

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
