import { MESSAGES, URL } from '../consts';
import { type Character } from '../types';

async function getCharacter(
  id: string
): Promise<{ char: Character | undefined; message: string | undefined }> {
  let char: Character | undefined;
  let message: string | undefined;

  await fetch(`${URL.people}/${id}`)
    .then((res) => {
      if (res.ok) return res.json();
      if (res.status === 404) message = MESSAGES.charNotFound;
      else message = MESSAGES.somethingWrong;

      return undefined;
    })
    .then((data: Character | undefined) => (char = data));

  return { char, message };
}

export default getCharacter;
