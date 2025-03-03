import { MESSAGES, URL } from '@/consts';
import { Response, SwResponse } from '@/types';
import getSearchQuery from '@/utils/get-search-query';

const getCharacters = async (
  search: string | undefined,
  page: string | undefined
): Promise<Response> => {
  let swResponse: SwResponse | null = null;
  let message: string | null = null;

  await fetch(`${URL.people}/${getSearchQuery({ search, page })}`)
    .then((res) => {
      if (res.ok) return res.json();

      if (res.status === 404) message = MESSAGES.notFound;
      else message = MESSAGES.somethingWrong;

      return null;
    })
    .then((data: SwResponse | null) => (swResponse = data));

  return { swResponse, message };
};

export default getCharacters;
