import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './';
import { BoardCard } from './types';

interface BoardColumn {
  name: string;
  cards: BoardCard[];
}

interface BoardState {
  columns: Record<string, BoardColumn>;
}

const initialState: BoardState = {
  columns: {
    todo: {
      name: 'To Do',
      cards: [{ id: 2, title: 'todo test' }],
    },
    inProgress: {
      name: 'In Progress',
      cards: [
        { id: 1, title: 'test' },
        { id: 3, title: 'in prog 2' },
      ],
    },
    done: {
      name: 'Done',
      cards: [
        { id: 4, title: 'done 1' },
        { id: 5, title: 'done 2' },
      ],
    },
  },
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    registerColumn: (state, action: PayloadAction<number>) => {},
  },
});

export const { registerColumn } = boardSlice.actions;

export const selectColumnIds = (state: RootState) =>
  Object.keys(state.board.columns);

export const selectColumn = (state: RootState) => (columnId: string) =>
  state.board.columns[columnId];

export default boardSlice.reducer;
