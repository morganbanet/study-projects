import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import AppProviders from './providers/AppProviders';

// Returns the render function from RTL with our own wrappers
// (AppProviders here) in place.
const customRender = (
  ui: ReactElement, // Component we want to render
  options?: Omit<RenderOptions, 'wrapper'>

  // If there are multiple providers, provide as per the hierarchy.
) => render(ui, { wrapper: AppProviders, ...options });

export * from '@testing-library/react'; // Export everything from RTL
export { customRender as render }; // Export our custom render as render

// Custom render function will allow a single provider to be wrapped
// around all tests. Can use the code from the RTL docs:
// https://testing-library.com/docs/react-testing-library/setup#custom-render
