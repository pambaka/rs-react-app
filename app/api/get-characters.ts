import { MESSAGES, URL } from '../consts';
import { type SwResponse } from '../types';

async function getCharacters(
  search: string,
  page: string
): Promise<{ response: SwResponse | undefined; message: string | undefined }> {
  let swResponse: SwResponse | undefined;
  let message: string | undefined;

  await fetch(`${URL.people}/?search=${search}&page=${page}`)
    .then((res) => {
      if (res.ok) return res.json();
      if (res.status === 404) message = MESSAGES.notFound;
      else message = MESSAGES.somethingWrong;

      return undefined;
    })
    .then((data: SwResponse | undefined) => (swResponse = data));

  return { response: swResponse, message };
}

export default getCharacters;
