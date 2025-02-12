import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PARAMS, URL } from '../consts';
import { Character, SwResponse } from '../types';

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: URL.people }),
  endpoints: (builder) => ({
    getCharacter: builder.query<Character | undefined, string | undefined>({
      query: (id) => `/${id}`,
    }),
    getSearched: builder.query<
      SwResponse | undefined,
      { searchValue: string | null; pageNumber?: string | null }
    >({
      query: ({ searchValue, pageNumber }) => {
        const searchQueryArr: string[] = [];

        if (searchValue)
          searchQueryArr.push(`${PARAMS.search}=${searchValue.trim()}`);
        if (pageNumber) searchQueryArr.push(`${PARAMS.page}=${pageNumber}`);

        return searchQueryArr.length > 0 ? `/?${searchQueryArr.join('&')}` : '';
      },
    }),
  }),
});

export default api;
