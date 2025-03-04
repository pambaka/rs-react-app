import { MESSAGES, URL } from '@/consts';
import { Character, CharResponse } from '@/types';

const getCharacter = async (charId: string): Promise<CharResponse> => {
  let character: Character | null = null;
  let message: string | null = null;

  if (charId)
    await fetch(`${URL.people}/${charId}`)
      .then((res) => {
        if (res.ok) return res.json();

        if (res.status === 404) message = MESSAGES.notFound;
        else message = MESSAGES.somethingWrong;

        return null;
      })
      .then((data: Character | null) => (character = data));

  return { character, message };
};

export default getCharacter;
