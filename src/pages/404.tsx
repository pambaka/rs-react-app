import Head from 'next/head';
import { ReactNode } from 'react';

const Page = (): ReactNode => {
  return (
    <>
      <Head>
        <title>SW Page not found</title>
      </Head>
      <h1 className="message">Page not found</h1>
    </>
  );
};

export default Page;
