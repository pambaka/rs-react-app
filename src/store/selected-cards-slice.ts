import { createSlice } from '@reduxjs/toolkit';
import { Character } from '../types';
import getCharId from '../utils/get-character-id';

const initialState: { cards: Character[] } = { cards: [] };

export const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    addToSelected(state, action: { payload: { char: Character } }) {
      const newChar = action.payload.char;
      state.cards = [...state.cards, newChar];
    },
    removeFromSelected(state, action: { payload: { id: string } }) {
      const charId = action.payload.id;

      const charIndex: number = state.cards.findIndex(
        (char) => getCharId(char.url) === charId
      );
      if (charIndex === -1) return;

      const updatedCards = [...state.cards];
      updatedCards.splice(charIndex, 1);
      state.cards = updatedCards;
    },
  },
});

export const { addToSelected, removeFromSelected } = selectedCardsSlice.actions;
