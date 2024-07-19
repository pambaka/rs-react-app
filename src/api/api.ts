import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from '../consts';
import { Character } from '../types';

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: URL.people }),
  endpoints: (builder) => ({
    getCharacter: builder.query<Character | undefined, string | undefined>({
      query: (id) => `/${id}`,
    }),
  }),
});

export default api;
