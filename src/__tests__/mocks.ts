import { URL } from '../consts';
import { Character } from '../types';

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
