import { screen } from '@testing-library/react';

import App from './App';
import { renderWithProviders } from '../test/render';

it('renders page title', () => {
  renderWithProviders(<App />);
  const titleElement = screen.getByText(/Simple Kanban/i);
  expect(titleElement).toBeInTheDocument();
});
