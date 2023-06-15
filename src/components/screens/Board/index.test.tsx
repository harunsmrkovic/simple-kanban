import { renderWithProviders } from '../../../test/render';
import { act, fireEvent, screen, within } from '@testing-library/react';

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

describe('adding task', () => {
  it('adds task to the proper column on form submit', () => {
    renderWithProviders(<Board />, { preloadedState: { board: boardMock } });
    const todoColumn = screen.getByRole('list', { name: /To Do/ });

    act(() => {
      within(todoColumn)
        .getByRole('button', {
          name: /Add task to To Do/,
        })
        .click();
    });

    const todoInput = within(todoColumn).getByRole('textbox', {
      name: /Title/,
    });

    todoInput.focus();
    fireEvent.change(todoInput, { target: { value: 'New Task 1' } });

    act(() => {
      within(todoColumn)
        .getByRole('button', {
          name: /Save Task/,
        })
        .click();
    });

    expect(
      within(todoColumn).getByRole('listitem', {
        name: /New Task 1/,
      }),
    ).toBeInTheDocument();
  });

  it('does not add task if title is empty', () => {
    renderWithProviders(<Board />, { preloadedState: { board: boardMock } });
    const todoColumn = screen.getByRole('list', { name: /To Do/ });

    act(() => {
      within(todoColumn)
        .getByRole('button', {
          name: /Add task to To Do/,
        })
        .click();
    });

    const todoInput = within(todoColumn).getByRole('textbox', {
      name: /Title/,
    });

    todoInput.focus();
    fireEvent.change(todoInput, { target: { value: '' } });

    act(() => {
      within(todoColumn)
        .getByRole('button', {
          name: /Save Task/,
        })
        .click();
    });

    expect(
      within(todoColumn).queryByRole('listitem', {
        name: /New Task 1/,
      }),
    ).not.toBeInTheDocument();
  });

  it('closes the input form without adding the task if cancel button is clicked', () => {
    renderWithProviders(<Board />, { preloadedState: { board: boardMock } });
    const todoColumn = screen.getByRole('list', { name: /To Do/ });

    act(() => {
      within(todoColumn)
        .getByRole('button', {
          name: /Add task to To Do/,
        })
        .click();
    });

    act(() => {
      within(todoColumn)
        .getByRole('button', {
          name: /Cancel/,
        })
        .click();
    });

    const todoInput = within(todoColumn).queryByRole('textbox', {
      name: /Title/,
    });

    expect(todoInput).not.toBeInTheDocument();

    expect(
      within(todoColumn).queryByRole('listitem', {
        name: /New Task 1/,
      }),
    ).not.toBeInTheDocument();
  });
});
