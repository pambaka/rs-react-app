import { configureStore } from '@reduxjs/toolkit';
import { selectedCardsSlice } from './selected-cards-slice';
import api from '../api/api';

const store = configureStore({
  reducer: {
    selectedCards: selectedCardsSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

export type StoreRootState = ReturnType<typeof store.getState>;
