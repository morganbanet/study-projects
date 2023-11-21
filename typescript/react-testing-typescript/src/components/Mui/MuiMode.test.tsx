import { render, screen } from '../../TestUtils'; // Import our customRender
import MuiMode from './MuiMode';

describe('MuiMode', () => {
  // RTL provides a wrapper option when rendering. This can be useful
  // for providers but would be better if we wrap all our tests with
  // a single provider. We can do this with a customRender function.

  // Custom render function will allow a single provider to be wrapped
  // around all tests. Can use the code from the RTL docs:
  // https://testing-library.com/docs/react-testing-library/setup#custom-render
  // See TestUtils.tsx in the src folder for the code

  it('renders text correctly', () => {
    // RTL wrapper function is passed as second argument to render
    // render(<MuiMode />, { wrapper: AppProviders });

    render(<MuiMode />); // Now using customRender function
    const headingElement = screen.getByRole('heading');
    expect(headingElement).toHaveTextContent('dark mode');
  });
});
