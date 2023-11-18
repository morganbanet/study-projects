import { render, screen } from '@testing-library/react';
import Skills from './Skills';

describe('Skills', () => {
  /** --- RTL TextMatch ---
   * The first argument in an RTL query is not a type of string. It is
   * called a TextMatch. It represents a type which can be either a
   * string, regex, or function.
   */

  const skills = ['HTML', 'CSS', 'JavaScript'];

  it('Renders correctly', () => {
    render(<Skills skills={skills} />);
    const listElement = screen.getByRole('list'); // Get ul tag
    expect(listElement).toBeInTheDocument();
  });

  it('renders a list of skills', () => {
    render(<Skills skills={skills} />);

    // getByRole throws an error if multiple elements are found. The
    // getAllByRole can be useful here.
    const listItemElements = screen.getAllByRole('listitem'); // Get li

    // Assert against length of array we are using to test
    // Don't use hardcoded values inside toHaveLength
    expect(listItemElements).toHaveLength(skills.length);
  });
});
