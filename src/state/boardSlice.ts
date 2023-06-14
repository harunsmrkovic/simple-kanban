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
          text: '123',
          email: 'hakazvaka@gmail.com',
          title: 'todo test',
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
          text: '123',
          email: 'hakazvaka@gmail.com',
          title: 'in prog 2',
        },
        ...Array.from({ length: 10 }).map((_, index) => ({
          id: `${index}`,
          text: '123',
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
