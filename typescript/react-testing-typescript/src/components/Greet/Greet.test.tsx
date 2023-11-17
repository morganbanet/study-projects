import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Greet from './Greet';

/** -- Test Suite Description --
 * Greet should render the text "Hello" and if a name is passed into the
 * component it should render Hello followed by the name.
 */

describe('Greet', () => {
  it('Render the text "Hello"', () => {
    render(<Greet />);
    const textElement = screen.getByText(/hello/i);
    expect(textElement).toBeInTheDocument();
  });

  it('Renders with a name', () => {
    render(<Greet name="John Doe" />);
    const textElement = screen.getByText(/Hello John Doe/i);
    expect(textElement).toBeInTheDocument();
  });
});
