import { ReactNode } from 'react';
import { GetServerSideProps } from 'next';
import { CharResponse, Response } from '@/types';
import MainPage from '@/components/pages/main-page';
import assertString from '@/utils/assert-string';
import { useRouter } from 'next/router';
import Card from '@/components/card';
import getCharacters from '@/api/get-characters';
import getCharacter from '@/api/get-character';
import { ResponseContext } from '@/context/response-context';
import { CharResponseContext } from '@/context/char-response-context';
import Head from 'next/head';
import StoreProvider from '@/providers/store-provider';

export const getServerSideProps = (async (context) => {
  const search = assertString(context.query.search);
  const page = assertString(context.query.page);
  const response = await getCharacters(search, page);

  const charId = assertString(context.params?.charid);
  const charResponse = await getCharacter(charId);

  return { props: { response, charResponse } };
}) satisfies GetServerSideProps<{
  response: Response;
  charResponse: CharResponse;
}>;

const Page = ({
  response,
  charResponse,
}: {
  response: Response;
  charResponse: CharResponse;
}): ReactNode => {
  const router = useRouter();
  const details = assertString(router.pathname).includes('details');

  return (
    <>
      <Head>
        <title>SW React app | Details</title>
      </Head>
      <StoreProvider>
        <ResponseContext.Provider value={response}>
          <MainPage />
        </ResponseContext.Provider>
        {details && (
          <CharResponseContext.Provider value={charResponse}>
            <Card />
          </CharResponseContext.Provider>
        )}
      </StoreProvider>
    </>
  );
};

export default Page;
