import { ReactNode } from 'react';
import { GetServerSideProps } from 'next';
import { Response } from '@/types';
import MainPage from '@/components/pages/main-page';
import assertString from '@/utils/assert-string';
import getCharacters from '@/api/get-characters';
import { ResponseContext } from '@/context/response-context';
import Head from 'next/head';
import StoreProvider from '@/providers/store-provider';

export const getServerSideProps = (async (context) => {
  const search = assertString(context.query.search);
  const page = assertString(context.query.page);

  const response = await getCharacters(search, page);

  return { props: { response } };
}) satisfies GetServerSideProps<{ response: Response }>;

const Page = ({ response }: { response: Response }): ReactNode => {
  return (
    <>
      <Head>
        <title>SW React app</title>
      </Head>
      <StoreProvider>
        <ResponseContext.Provider value={response}>
          <MainPage />
        </ResponseContext.Provider>
      </StoreProvider>
    </>
  );
};

export default Page;
