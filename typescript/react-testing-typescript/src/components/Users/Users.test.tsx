import { render, screen } from '@testing-library/react';
import Users from './Users';

// Real APIs are primarily used for end to end tests, and not for unit
// or functional tests.

// - We don't have to ensure the server is up and running to test whether
// the component is rendering as intended.

// - Since these tests are quite often, it is not feasable to use real
// APIs which may even charge based on a number of requests. We will
// need to mock the number of requests in our tests.

// We mock the number of requests in our tests for a list of users or an
// error.

// Mock Service Worker is usually the recommended library to use with
// RTL. MSW is an API mocking library that uses a service worker API to
// intercept actual requests. It's the closes thing to a working server
// without actually having to create one.

describe('Users', () => {
  it('renders correctly', () => {
    render(<Users />);
    const textElement = screen.getByText('Users');
    expect(textElement).toBeInTheDocument();
  });

  it('renders a list of users', async () => {
    render(<Users />);

    // RTL findAllBy queries are async
    const users = await screen.findAllByRole('listitem');

    expect(users).toHaveLength(3);
  });
});
