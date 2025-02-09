import { URL } from '../consts';
import { SwResponse } from '../types';

async function fetchPeople(
  searchValue: string | null = '',
  pageNumber?: number
): Promise<SwResponse | undefined> {
  let response: SwResponse | undefined;
  let searchQuery = searchValue ? `/?search=${searchValue.trim()}` : '/?';

  searchQuery += pageNumber ? `&page=${pageNumber}` : '';

  await fetch(`${URL.people}${searchQuery}`)
    .then((res) => {
      if (!res.ok) {
        if (res.status === 404)
          return { results: [], next: null, previous: null };
        return undefined;
      }
      return res.json();
    })
    .then((data: SwResponse | undefined) => {
      if (data) response = data;
    })
    .catch((error) => {
      console.error(error);
    });

  return response;
}

export default fetchPeople;
