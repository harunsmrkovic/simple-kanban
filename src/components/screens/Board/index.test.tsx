import { renderWithProviders } from '../../../test/render';
import { screen, within } from '@testing-library/react';

import Board from '.';
import { boardMock } from '../../../test/mocks';

it('renders columns', () => {
  renderWithProviders(<Board />, { preloadedState: { board: boardMock } });
  expect(screen.getByText(/To Do/)).toBeInTheDocument();
  expect(screen.getByText(/In Progress/)).toBeInTheDocument();
  expect(screen.getByText(/Done/)).toBeInTheDocument();
});

it('renders cards within proper columns', () => {
  renderWithProviders(<Board />, { preloadedState: { board: boardMock } });
  const todoColumn = screen.getByRole('list', { name: /To Do/ });
  const inProgressColumn = screen.getByRole('list', { name: /In Progress/ });

  const taskInTodo = within(todoColumn).getByRole('listitem', {
    name: /Technical Call 2/,
  });
  expect(taskInTodo).toBeInTheDocument();

  const todoTaskInProgress = within(inProgressColumn).queryByRole('listitem', {
    name: /Technical Call 2/,
  });

  expect(todoTaskInProgress).not.toBeInTheDocument();

  const taskInProgress = within(inProgressColumn).getByRole('listitem', {
    name: /Culture Call/,
  });

  expect(taskInProgress).toBeInTheDocument();
});
