import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './';
import { BoardCard } from './types';

export interface BoardColumn {
  id: string;
  name: string;
  cards: BoardCard[];
}

interface BoardState {
  columns: BoardColumn[];
}

const INITIAL_COLUMNS = ['todo', 'inProgress', 'done'];

const initialState: BoardState = {
  columns: [
    {
      id: 'todo',
      name: 'To Do',
      cards: [
        {
          id: '2',
          text: 'Have a call with a Close Engineering Manager.',
          email: 'hakazvaka@gmail.com',
          title: 'Technical Call 2',
        },
      ],
    },
    {
      id: 'inProgress',
      name: 'In Progress',
      cards: [
        { id: '1', text: '123', email: 'hakazvaka@gmail.com', title: 'test' },
        {
          id: '3',
          text: 'Learn about Close’s culture with Harmonie, from the People Ops team.',
          email: 'hakazvaka@gmail.com',
          title: 'Culture Call',
        },
        ...Array.from({ length: 10 }).map((_, index) => ({
          id: `${20 + index}`,
          text: 20 + index + '123',
          email: 'hakazvaka@gmail.com',
          title: `in prog ${index}`,
        })),
      ],
    },
    {
      id: 'done',
      name: 'Done',
      cards: [
        { id: '4', text: '123', email: 'hakazvaka@gmail.com', title: 'done 1' },
        { id: '5', text: '123', email: 'hakazvaka@gmail.com', title: 'done 2' },
      ],
    },
  ],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    updateColumn: (
      state,
      action: PayloadAction<{ columnId: string; cards: BoardCard[] }>,
    ) => {
      const { columnId, cards } = action.payload;
      const column = state.columns.find((column) => column.id === columnId);
      if (column) {
        column.cards = cards;
      }
    },
  },
});

export const { updateColumn } = boardSlice.actions;

export const selectAllColumns = (state: RootState) => state.board.columns;

export const selectColumn = createSelector([selectAllColumns], (columns) => {
  return (columnId: string) =>
    columns.find((column) => column.id === columnId) ?? null;
});

export default boardSlice.reducer;
