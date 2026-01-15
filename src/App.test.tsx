import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main page title', () => {
  render(<App />);
  expect(screen.getByText(/design buro/i)).toBeInTheDocument();
});
