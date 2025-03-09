import styles from './main-page.module.css';
import { ReactNode, useEffect, useState } from 'react';
import SearchSection from '@/components/search-section';
import ResultsSection from '@/components/results-section';
import Pagination from '@/components/pagination';
import Loader from '@/components/loader';
import Flyout from '@/components/flyout';
import ThemeButton from '@/components/theme-button';
import { useRouter } from 'next/router';
import getSearchQuery from '@/utils/get-search-query';
import useLoader from '@/hooks/use-loader';

const MainPage = (): ReactNode => {
  const router = useRouter();
  const [isOutletOpen, setIsOutletOpen] = useState(
    router.pathname.includes('details')
  );
  const [isLoading] = useLoader();

  useEffect(() => {
    if (router.pathname.includes('details')) setIsOutletOpen(true);
    else setIsOutletOpen(false);
  }, [router.pathname]);

  const closeOutlet = (): void => {
    router.push(`/${getSearchQuery({ ...router.query })}`);
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
      <ResultsSection />
      <Pagination />
      <Flyout />
      {isLoading && <Loader />}
    </section>
  );
};

export default MainPage;
