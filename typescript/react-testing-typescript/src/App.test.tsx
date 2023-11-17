import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import App from './App';

// Both test and expect are methods from Jest. In CRA, these are
// globablly provided for the developer. In Vite however, we should
// import jest-dom at the top.

describe('App component', () => {
  // Tests can take 3 arguments. The name (or what the test does), the
  // function, and lastly an optional timeout argument (how long to wait
  // before aborting the test)
  it('render the text "App"', () => {
    render(<App />);

    const wordApp = screen.getByText(/App/i); // i = case insensitive

    expect(wordApp).toBeInTheDocument(); // "matcher function" assertion
  });
});
