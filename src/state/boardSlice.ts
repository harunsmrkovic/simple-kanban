import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './';
import { BoardCard } from './types';
import { nanoid } from 'nanoid';

export interface BoardColumn {
  id: string;
  name: string;
  cards: BoardCard[];
}

interface BoardState {
  columns: BoardColumn[];
}

const MAX_CARDS_PER_COLUMN = 100;
const INITIAL_COLUMNS = {
  todo: 'To Do',
  inProgress: 'In Progress',
  done: 'Done',
};

const initialState: BoardState = {
  columns: Object.keys(INITIAL_COLUMNS).map((id) => ({
    id,
    name: INITIAL_COLUMNS[id as keyof typeof INITIAL_COLUMNS],
    cards: [],
  })),
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
        column.cards = cards.slice(0, MAX_CARDS_PER_COLUMN);
      }
    },
    addTask: (
      state,
      action: PayloadAction<{ columnId: string; card: Omit<BoardCard, 'id'> }>,
    ) => {
      const { columnId, card } = action.payload;
      const column = state.columns.find((column) => column.id === columnId);
      if (column && column.cards.length < MAX_CARDS_PER_COLUMN) {
        const id = nanoid();
        column.cards.unshift({ ...card, id });
      }
    },
  },
});

export const { updateColumn, addTask } = boardSlice.actions;

export const selectAllColumns = (state: RootState) => state.board.columns;

export const selectColumn = createSelector([selectAllColumns], (columns) => {
  return (columnId: string) =>
    columns.find((column) => column.id === columnId) ?? null;
});

export default boardSlice.reducer;
