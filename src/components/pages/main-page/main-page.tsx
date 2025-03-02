import styles from './main-page.module.css';
import { ReactNode, useEffect, useState } from 'react';
import SearchSection from '@/components/search-section';
import ResultsSection from '@/components/results-section';
import Pagination, { isPageButtonDisabled } from '@/components/pagination';
// import Loader from '@/components/loader';
// import Flyout from '@/components/flyout';
import ThemeButton from '@/components/theme-button';
import { SwResponse } from '@/types';
import { useRouter } from 'next/router';
import getSearchQuery from '@/utils/get-search-query';

const MainPage = ({
  swResponse,
}: {
  swResponse: SwResponse | undefined;
}): ReactNode => {
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const router = useRouter();
  const [isOutletOpen, setIsOutletOpen] = useState(
    router.pathname.includes('details')
  );
  const [message] = useState('');

  useEffect(() => {
    setIsNextDisabled(isPageButtonDisabled(swResponse?.next));
    setIsPrevDisabled(isPageButtonDisabled(swResponse?.previous));
  }, [swResponse]);

  useEffect(() => {
    if (router.pathname.includes('details')) setIsOutletOpen(true);
    else setIsOutletOpen(false);
  }, [router.pathname]);

  const closeOutlet = (): void => {
    router.push(`${getSearchQuery({ ...router.query })}`);
  };

  return (
    <section
      className={
        isOutletOpen
          ? `${styles['main-section']} ${styles.interactive}`
          : styles['main-section']
      }
      onClick={isOutletOpen ? closeOutlet : undefined}
    >
      <ThemeButton />
      <SearchSection />
      <ResultsSection results={swResponse?.results} message={message} />
      <Pagination
        isNextDisabled={isNextDisabled}
        isPrevDisabled={isPrevDisabled}
      />
      {/* <Flyout />
      {isFetching && <Loader />} */}
    </section>
  );
};

export default MainPage;
