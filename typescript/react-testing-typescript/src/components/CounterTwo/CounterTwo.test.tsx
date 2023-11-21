import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import CounterTwo from './CounterTwo';

describe('CounterTwo', () => {
  it('renders correctly', () => {
    render(<CounterTwo count={0} />);
    const textElement = screen.getByText('Counter Two');
    expect(textElement).toBeInTheDocument();
  });

  it('handlers are called', async () => {
    user.setup();

    // Jest mock functions. This will allow the two buttons to be
    // rendered so we can proceed to get them by role.
    const handleIncrement = jest.fn();
    const handleDecrement = jest.fn();

    render(
      <CounterTwo
        count={0}
        handleIncrement={handleIncrement} // Pass in the mock functions
        handleDecrement={handleDecrement}
      />
    );

    const incrementButton = screen.getByRole('button', { name: 'Increment' });
    const decrementButton = screen.getByRole('button', { name: 'Decrement' });

    // Simulate clicking the increment & decrement buttons
    await user.click(incrementButton);
    await user.click(decrementButton);

    // Assert that the increment & decrement mock functions were called.
    expect(handleIncrement).toHaveBeenCalledTimes(1);
    expect(handleDecrement).toHaveBeenCalledTimes(1);
  });
});
