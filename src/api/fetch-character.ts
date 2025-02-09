import { URL } from '../consts';
import { Character } from '../types';

async function fetchCharacter(id: string): Promise<Character | undefined> {
  let response: Character | undefined;

  await fetch(`${URL.people}/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((data: Character | undefined) => {
      response = data;
    })
    .catch((error) => console.error(error));

  return response;
}

export default fetchCharacter;
