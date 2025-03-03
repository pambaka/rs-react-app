import { ReactNode } from 'react';
import { GetServerSideProps } from 'next';
import { Response } from '@/types';
import { Provider } from 'react-redux';
import store from '@/store/store';
import MainPage from '@/components/pages/main-page';
import assertString from '@/utils/assert-string';
import getCharacter from '@/api/get-characters';
import { ResponseContext } from '@/context/response-context';

export const getServerSideProps = (async (context) => {
  const search = assertString(context.query.search);
  const page = assertString(context.query.page);

  const response = await getCharacter(search, page);

  return { props: { response } };
}) satisfies GetServerSideProps<{ response: Response }>;

const Page = ({ response }: { response: Response }): ReactNode => {
  return (
    <Provider store={store}>
      <ResponseContext.Provider value={response}>
        <MainPage />
      </ResponseContext.Provider>
    </Provider>
  );
};

export default Page;
