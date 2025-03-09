import { configureStore } from '@reduxjs/toolkit';
import { selectedCardsSlice } from './selected-cards-slice';

const store = configureStore({
  reducer: {
    selectedCards: selectedCardsSlice.reducer,
  },
});

export default store;

export type StoreRootState = ReturnType<typeof store.getState>;
