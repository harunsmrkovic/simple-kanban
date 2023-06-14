import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  createStateSyncMiddleware,
  initMessageListener,
} from 'redux-state-sync';

import boardSlice from './boardSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedBoardReducer = persistReducer(persistConfig, boardSlice);

export const store = configureStore({
  reducer: {
    board: persistedBoardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      createStateSyncMiddleware({
        blacklist: [PERSIST, REHYDRATE],
      }),
    ),
});

// Set up sync between tabs
initMessageListener(store);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
