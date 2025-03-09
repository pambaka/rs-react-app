import { type Character } from '@/types';
import { type ReactNode } from 'react';
import Card from './card';
import getCharId from '@/utils/get-character-id';

const Cards = ({ people }: { people: Character[] | undefined }): ReactNode => {
  return (
    <>
      {people &&
        people.map((char: Character) => (
          <Card char={char} key={getCharId(char.url)} />
        ))}
    </>
  );
};

export default Cards;
