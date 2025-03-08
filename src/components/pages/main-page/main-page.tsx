'use client';

import styles from './main-page.module.css';
import { ReactNode, useContext, useEffect, useState } from 'react';
import SearchSection from '@/components/search-section';
import ResultsSection from '@/components/results-section';
import Pagination from '@/components/pagination';
import Flyout from '@/components/flyout';
import ThemeButton from '@/components/theme-button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LoaderContext } from '@/providers/loader-provider';

const MainPage = (): ReactNode => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOutletOpen, setIsOutletOpen] = useState(
    pathname.includes('details')
  );
  const { changeIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    if (pathname.includes('details')) setIsOutletOpen(true);
    else setIsOutletOpen(false);
  }, [pathname]);

  const closeOutlet = (): void => {
    changeIsLoading(true);
    router.push(`/?${searchParams.toString()}`);
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
    </section>
  );
};

export default MainPage;
