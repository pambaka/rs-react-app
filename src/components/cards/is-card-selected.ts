import { Character } from '../../types';
import getCharId from '../../utils/get-character-id';

const isCardSelected = (
  selectedCards: Character[],
  charId: string
): boolean => {
  return selectedCards.map((char) => getCharId(char.url)).includes(charId);
};

export default isCardSelected;
