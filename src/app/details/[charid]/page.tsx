import { ReactNode } from 'react';
import { Response, SearchParam } from '@/types';
import MainPage from '@/components/pages/main-page';
import Card from '@/components/card';
import getCharacters from '@/api/get-characters';
import getCharacter from '@/api/get-character';
import Head from 'next/head';
import ResponseProvider from '@/providers/response-provider';
import CharResponseProvider from '@/providers/char-response-provider';

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ charid: string }>;
  searchParams: Promise<{ [key: string]: SearchParam }>;
}): Promise<ReactNode> => {
  const { search, page } = await searchParams;
  const response: Response = await getCharacters(search, page);

  const { charid } = await params;
  const charResponse = await getCharacter(charid);

  return (
    <>
      <Head>
        <title>SW React app | Details</title>
      </Head>
      <ResponseProvider response={response}>
        <MainPage />
      </ResponseProvider>
      {charid && (
        <CharResponseProvider charResponse={charResponse}>
          <Card />
        </CharResponseProvider>
      )}
    </>
  );
};

export default Page;
