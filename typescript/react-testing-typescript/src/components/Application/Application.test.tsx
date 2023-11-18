import { render, screen } from '@testing-library/react';
import Application from './Application';

describe('Application', () => {
  it('Renders correctly', () => {
    /** --- RTL queries in priority order ----
     * getByRole (aria attributes, can use name option)
     * getByLabelText (find element associated with a label)
     * getByPlaceHolderText (find element by it's placeholder text)
     * getByText (find paragraphs, divs, and spans)
     * getByDisplayValue (find input, textarea, or select elements)
     * getByAltTextText (find img, input, and area by their alt text)
     * getByTitle (find element by title attribute)
     * getByTestId (find element by testid attribute)
     *
     * getByRole should be your first go-to method
     * May of these also accept an options argument (ie, name, selector)
     */

    /** --- RTL getAllBy queries
     * getAllBy return an array of all matching nodes for a query, and
     * throws an error if no elements match. Use this with the RTL
     * queries above.
     */

    render(<Application />);

    const pageHeading = screen.getByRole('heading', { level: 1 });
    expect(pageHeading).toBeInTheDocument();

    const sectionHeading = screen.getByRole('heading', { level: 2 });
    expect(sectionHeading).toBeInTheDocument();

    const paragraphElement = screen.getByText(
      (content) => content.startsWith('All') // Custom function
    );
    expect(paragraphElement).toBeInTheDocument();

    const closeElement = screen.getByTitle('close');
    expect(closeElement).toBeInTheDocument();

    const imageElement = screen.getByAltText('a person with a laptop');
    expect(imageElement).toBeInTheDocument();

    const customElement = screen.getByTestId('custom-element');
    expect(customElement).toBeInTheDocument();

    const nameElement = screen.getByRole('textbox', { name: 'Name' });
    expect(nameElement).toBeInTheDocument();

    const nameElement2 = screen.getByLabelText('Name', { selector: 'input' });
    expect(nameElement2).toBeInTheDocument();

    const nameElement3 = screen.getByPlaceholderText('Fullname');
    expect(nameElement3).toBeInTheDocument();

    const nameElement4 = screen.getByDisplayValue('John Doe');
    expect(nameElement4).toBeInTheDocument();

    const bioElement = screen.getByRole('textbox', { name: 'Bio' });
    expect(bioElement).toBeInTheDocument();

    const jobLocationElement = screen.getByRole('combobox');
    expect(jobLocationElement).toBeInTheDocument();

    const termsElement = screen.getByRole('checkbox');
    expect(termsElement).toBeInTheDocument();

    const termsElement2 = screen.getByLabelText(
      'I agree to the terms and conditions'
    );
    expect(termsElement2).toBeInTheDocument();

    const submitButtonElement = screen.getByRole('button');
    expect(submitButtonElement).toBeInTheDocument();
  });
});
