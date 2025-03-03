import styles from './pagination.module.css';
import { ReactNode, useContext, useEffect, useState } from 'react';
import Button from '@/components/button';
import changeCurrentPageNumber from './change-current-page-number';
import { PageAction } from '@/types';
import { PARAMS } from '@/consts';
import getValidPageNumber from '@/utils/get-valid-page-number';
import { useRouter } from 'next/router';
import assertString from '@/utils/assert-string';
import getSearchQuery from '@/utils/get-search-query';
import getPath from '@/utils/get-path';
import { ResponseContext } from '@/context/response-context';
import isPageButtonDisabled from './is-page-button-disabled';

const Pagination = (): ReactNode => {
  const router = useRouter();
  const page = assertString(router.query[PARAMS.page]);
  const [currentPageNumber, setCurrentPageNumber] = useState(() =>
    getValidPageNumber(page)
  );
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const { swResponse } = useContext(ResponseContext);

  useEffect(() => {
    setIsNextDisabled(isPageButtonDisabled(swResponse?.next));
    setIsPrevDisabled(isPageButtonDisabled(swResponse?.previous));
  }, [swResponse]);

  const updatePageNumber = async (action: PageAction) => {
    const newPageNumber = changeCurrentPageNumber(currentPageNumber, action);
    if (newPageNumber === currentPageNumber) return;

    const search = assertString(router.query[PARAMS.search]);

    router.push(
      getPath(router.query.charid) +
        getSearchQuery({ search, page: String(newPageNumber) })
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
