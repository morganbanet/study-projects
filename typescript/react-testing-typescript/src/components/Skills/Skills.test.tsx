import { render, screen, logRoles } from '@testing-library/react';
import Skills from './Skills';

// --- RTL Queries ---
// getBy & getAllBy
// queryBy & queryAllBy
// findBy & findAllBy

describe('Skills', () => {
  /** --- RTL TextMatch ---
   * The first argument in an RTL query is not a type of string. It is
   * called a TextMatch. It represents a type which can be either a
   * string, regex, or function.
   */

  const skills = ['HTML', 'CSS', 'JavaScript'];

  it('Render correctly', () => {
    render(<Skills skills={skills} />);
    const listElement = screen.getByRole('list'); // Get ul tag
    expect(listElement).toBeInTheDocument();
  });

  it('Render a list of skills', () => {
    render(<Skills skills={skills} />);

    // getByRole throws an error if multiple elements are found. The
    // getAllByRole can be useful here.
    const listItemElements = screen.getAllByRole('listitem'); // Get li

    // Assert against length of array we are using to test
    // Don't use hardcoded values inside toHaveLength
    expect(listItemElements).toHaveLength(skills.length);
  });

  it('Render the Login button', () => {
    render(<Skills skills={skills} />);
    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toBeInTheDocument();
  });

  // --- queryBy & queryAllBy ---
  // Returns a matching node for a query, and null if no match
  // Useful for asserting elements currently not present
  // Throws an error if more than one match is found
  // queryAllBy returns an array of all matching nodes
  // queryAllBy returns an empty array if no matching nodes.
  it('Does not render the Start Learning button', () => {
    render(<Skills skills={skills} />);

    // queryByRole will return null here as there is no match
    const startLearningButton = screen.queryByRole('button', {
      name: 'Start learning',
    });

    // "not" will assert that toBeInTheDocument should be falsy
    expect(startLearningButton).not.toBeInTheDocument();
  });

  // --- findBy & findAllBy ---
  // findBy returns a promise which resolves when an element
  // is found matching the query. The promise is rejected after a
  // default of 1000ms (1s), or if no element is found, or multiple
  // elements are found. FindAllBy will resolve to an array or matching
  // elements.

  // **
  // These queries are useful for instance if elements are not in the
  // DOM to begin with but will render after some time. For instance,
  // data fetched from a server wil be rendered after a few milliseconds

  // --- Manual Queries ---
  // It is possible to use the regular querySelector DOM API to find
  // elements. This is not recommend however, as the attributes used
  // to make these queries are not visible to the user. Always try to
  // query by using the three query types offered by RTL (see top
  // comment).

  // Both of these require async/await as they return a promise
  // They can take a third argument to extend the timeout
  it('Display the start learning button eventually', async () => {
    const view = render(<Skills skills={skills} />);

    // View list of aria roles currently in the DOM
    logRoles(view.container);

    // visualize the DOM before Start Learning button is present
    // screen.debug();

    const startLearningButton = await screen.findByRole(
      'button',
      {
        name: 'Start learning',
      },
      { timeout: 2000 } // Extend the default timeout
    );

    // Visualize the DOM after Start Learning button is present
    // screen.debug();

    expect(startLearningButton).toBeInTheDocument();
  });
});
