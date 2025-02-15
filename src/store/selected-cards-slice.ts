import { createSlice } from '@reduxjs/toolkit';
import { Character } from '../types';

const initialState: { cards: Character[] } = { cards: [] };

export const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    addToSelected(state, action: { payload: { char: Character } }) {
      const newChar = action.payload.char;
      state.cards = [...state.cards, newChar];
    },
  },
});

export const { addToSelected } = selectedCardsSlice.actions;
