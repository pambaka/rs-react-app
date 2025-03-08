'use client';

import styles from './pagination.module.css';
import { ReactNode, useContext, useEffect, useState } from 'react';
import Button from '@/components/button';
import changeCurrentPageNumber from './change-current-page-number';
import { PageAction } from '@/types';
import { PARAMS } from '@/consts';
import getValidPageNumber from '@/utils/get-valid-page-number';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import getSearchQuery from '@/utils/get-search-query';
import ResponseContext from '@/context/response-context';
import isPageButtonDisabled from './is-page-button-disabled';
import { LoaderContext } from '@/providers/loader-provider';

const Pagination = (): ReactNode => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get(PARAMS.page);
  const [currentPageNumber, setCurrentPageNumber] = useState(() =>
    getValidPageNumber(page)
  );
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const { swResponse } = useContext(ResponseContext);
  const { changeIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    setIsNextDisabled(isPageButtonDisabled(swResponse?.next));
    setIsPrevDisabled(isPageButtonDisabled(swResponse?.previous));
  }, [swResponse]);

  const updatePageNumber = async (action: PageAction) => {
    const newPageNumber = changeCurrentPageNumber(currentPageNumber, action);
    if (newPageNumber === currentPageNumber) return;

    changeIsLoading(true);

    const search = searchParams.get(PARAMS.search) ?? '';

    router.push(
      pathname + getSearchQuery({ search, page: String(newPageNumber) })
    );
  };

  useEffect(() => {
    setCurrentPageNumber(getValidPageNumber(page));
  }, [page]);

  return (
    <div className={styles.pagination}>
      <Button
        buttonText="<"
        onClick={(event) => {
          event.stopPropagation();
          updatePageNumber('decrement');
        }}
        isDisabled={isPrevDisabled}
      />
      <p>{currentPageNumber}</p>
      <Button
        buttonText=">"
        onClick={(event) => {
          event.stopPropagation();
          updatePageNumber('increment');
        }}
        isDisabled={isNextDisabled}
      />
    </div>
  );
};

export default Pagination;
