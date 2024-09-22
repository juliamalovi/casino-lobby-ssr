import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import gameSlice from './gameSlice';

const store = configureStore({
  reducer: { games: gameSlice, [api.reducerPath]: api.reducer, }, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootStateType = ReturnType<typeof store.getState>;

export default store;
