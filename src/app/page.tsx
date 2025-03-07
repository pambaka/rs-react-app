import { ReactNode } from 'react';
import MainPage from '@/components/pages/main-page';
import getCharacters from '@/api/get-characters';
import Head from 'next/head';
import { SearchParam } from '@/types';
import ResponseProvider from '@/providers/response-provider';

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: SearchParam }>;
}): Promise<ReactNode> => {
  const { search, page } = await searchParams;
  const response = await getCharacters(search, page);

  return (
    <>
      <Head>
        <title>SW React app</title>
      </Head>
      <ResponseProvider response={response}>
        <MainPage />
      </ResponseProvider>
    </>
  );
};

export default Page;
