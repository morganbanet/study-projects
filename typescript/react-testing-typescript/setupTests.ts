import '@testing-library/jest-dom'; // Extends Jest with DOM methods
import 'cross-fetch/polyfill'; // Remove "fetch undefined" error in Jest

// Fix Text encoder error
import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextDecoder, TextEncoder });

import { server } from './src/mocks/server';

// Establish a request interception instance before all test are run
// using the beforeAll method from Jest
beforeAll(() => server.listen());

// Remove any request handlers that were added at runtime after each test
afterEach(() => server.resetHandlers());

// After all tests stop the request interception.
afterAll(() => server.close());
