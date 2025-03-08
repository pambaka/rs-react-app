import { ReactNode } from 'react';
import MainPage from '@/components/pages/main-page';
import getCharacters from '@/api/get-characters';
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
      <ResponseProvider response={response}>
        <MainPage />
      </ResponseProvider>
    </>
  );
};

export default Page;
