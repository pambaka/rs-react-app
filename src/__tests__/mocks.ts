import { configureStore, createSlice } from '@reduxjs/toolkit';
import { URL } from '../consts';
import { Character, SwResponse } from '../types';

export const mockChar: Character = {
  name: 'someName',
  height: 'someHeight',
  mass: 'someMass',
  hair_color: 'someColor',
  eye_color: 'someColor',
  skin_color: 'someColor',
  url: `${URL.people}/${100}`,
};

export function getChar(id: number): Character {
  return {
    name: 'someName',
    height: 'someHeight',
    mass: 'someMass',
    hair_color: 'someColor',
    eye_color: 'someColor',
    skin_color: 'someColor',
    url: `${URL.people}/${id}`,
  };
}

const initialState: { cards: Character[] } = { cards: [mockChar] };
const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {},
});

export const mockStore = configureStore({
  reducer: {
    selectedCards: selectedCardsSlice.reducer,
  },
});

export const mockEmptySwResponse: SwResponse = {
  next: null,
  previous: null,
  results: [],
};
