import { ReactNode } from 'react';
import { GetServerSideProps } from 'next';
import { SwResponse } from '@/types';
import { URL } from '@/consts';
import { Provider } from 'react-redux';
import store from '@/store/store';
import MainPage from '@/components/pages/main-page';
import assertString from '@/utils/assert-string';
import getSearchQuery from '@/utils/get-search-query';

export const getServerSideProps = (async (context) => {
  const search = assertString(context.query.search);
  const page = assertString(context.query.page);

  let swResponse: SwResponse | null = null;
  await fetch(`${URL.people}/${getSearchQuery({ search, page })}`)
    .then((res) => {
      if (res.ok) return res.json();
      else return null;
    })
    .then((data: SwResponse | null) => (swResponse = data));
  return { props: { swResponse } };
}) satisfies GetServerSideProps<{ swResponse: SwResponse | null }>;

const Page = ({ swResponse }: { swResponse: SwResponse }): ReactNode => {
  return (
    <Provider store={store}>
      <MainPage swResponse={swResponse} />
    </Provider>
  );
};

export default Page;
