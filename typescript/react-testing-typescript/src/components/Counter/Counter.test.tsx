import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Counter } from './Counter';

/** --- user-event ---
 * A companion library for Testing Library that simulates user
 * interactions by dispatching the events that would happen if the
 * interaction took place in a browser. It's the recommended way to test
 * user interactions with RTL.
 */

/** --- fireEvent vs user-event
 * fireEvent is a method from RTL which is used to dispatch DOM events.
 * user-events simulates full interactions which may fire multiple
 * events and do additional checks along the way.
 *
 * For example, we can dispatch the change event on an input field using
 * fireEvent, but the browser usually does multiple events for one
 * interaction, so it's not very realistic. In this example the element
 * has to be focused, then the keyboard and input events are fired,
 * and the selection and value on the element are manipulated as they
 * type into the input field.
 *
 * user-event allows you to describe a full user interaction instead of
 * a concrete event. It adds visibility and interactability checks along
 * the way and manipulates the DOM just like a user interaction in the
 * browser would. It factors in that the browser wouldn't let a user
 * click a hidden element or type in a disabled check box for example.
 */

describe('Counter', () => {
  it('Renders correctly', () => {
    render(<Counter />);

    const countElement = screen.getByRole('heading');
    expect(countElement).toBeInTheDocument();

    const incrementButton = screen.getByRole('button', { name: 'Increment' });
    expect(incrementButton).toBeInTheDocument();
  });

  it('Render a count of 0', () => {
    render(<Counter />);
    const countElement = screen.getByRole('heading');
    expect(countElement).toHaveTextContent('0');
  });

  it('Render a count of 1 after clicking the increment button', async () => {
    user.setup(); // Create an instance of user-event
    render(<Counter />);

    // Simulate a user clicking the button once
    const incrementButton = screen.getByRole('button', { name: 'Increment' });
    await user.click(incrementButton);

    // Heading should now render the text content of 1
    const countElement = screen.getByRole('heading');
    expect(countElement).toHaveTextContent('1');
  });

  it('Renders a count of 2 after clicking the increment button twice', async () => {
    user.setup();
    render(<Counter />);

    const incrementButton = screen.getByRole('button', { name: 'Increment' });

    // Click the increment button twice
    for (let x = 0; x < 2; x++) await user.click(incrementButton);

    const countElement = screen.getByRole('heading');
    expect(countElement).toHaveTextContent('2');
  });

  it('Renders a count of 10 after clicking the set button', async () => {
    user.setup();
    render(<Counter />);

    const amountInput = screen.getByRole('spinbutton'); // Number input
    await user.type(amountInput, '10'); // Type the number 10
    expect(amountInput).toHaveValue(10); // Assert input value is 10

    const setButton = screen.getByRole('button', { name: 'Set' });
    await user.click(setButton); // Click the button to set amount to 10

    const countElement = screen.getByRole('heading');
    expect(countElement).toHaveTextContent('10');
  });

  it('Elements are focused in the right order', async () => {
    user.setup();
    render(<Counter />);

    const incrementButton = screen.getByRole('button', { name: 'Increment' });
    const amountInput = screen.getByRole('spinbutton');
    const setButton = screen.getByRole('button', { name: 'Set' });

    await user.tab();
    expect(incrementButton).toHaveFocus();

    await user.tab();
    expect(amountInput).toHaveFocus();

    await user.tab();
    expect(setButton).toHaveFocus();
  });
});

/** --- Pointer Interactions (user-event library) ---
 ** Convenience APIs - What is typically used when writing tests. These
 * methods internally calls the Pointer API (ie, click() is a
 * convenience API that internally calls the pointer API).
 *
 * The convenience APIs should always be used over the pointer APIs as
 * they are easier to read and write. Also note that all APIs from
 * user-event are asynchronous.
 *
 * click()
 * dblClick()
 * tripleClick()
 * hover() - Testing tooltips or styles when hovering over an element
 * unhover() - Same testing as hover()
 *
 * Pointer APIs - Lower level API, expects an object as an argument
 * which describes the action to simulate.
 *
 * pointer({keys: '[MouseLeft]'}) - Simulate single
 * pointer({keys: '[MouseLeft][MouseRight]'}) - Simulate in order
 * pointer('[MouseLeft][MouseRight]'}) - Pass string if keys is the only arg
 * pointer('[MouseLeft>]') - Click & hold
 * pointer('[/MouseLeft]') - Release held button
 */

/** --- Keyboard Interactions ---
 ** Utility APIs **
 * type()
 * clear() - Used to clear an editable element
 * selectOptions() - Select elements in a dropdown or listbox
 * deselectOptions() - Deselect elements in a dropdown or listbox
 * upload() - Simulate clicking a file input field and selecting a file
 *
 * * Convienience APIs **
 * tab() - The only Convenience API for keyboard interactions
 *
 * * Clipboard APIs **
 * copy()
 * cut()
 * paste()
 *
 * * Keyboard APIs **
 * The keyboard APIs accept a string describing the key actions
 * keyboard('foo') // translates to: f, o, o
 * keyboard('{Shift>}A{/Shift}') // translates to: Shift(down), A, Shift(up)
 */
