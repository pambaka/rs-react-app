import './pagination.css';
import { type ReactNode, useEffect, useState } from 'react';
import Button from '../button';
import changeCurrentPageNumber from './change-current-page-number';
import { type PageAction } from '@/types';
import { PARAMS } from '@/consts';
import { useSearchParams } from 'react-router';
import getValidPageNumber from '@/utils/get-valid-page-number';

const Pagination = ({
  isNextDisabled,
  isPrevDisabled,
}: {
  isNextDisabled: boolean;
  isPrevDisabled: boolean;
}): ReactNode => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [currentPageNumber, setCurrentPageNumber] = useState(() => {
    const page = searchParams.get(PARAMS.page);
    return getValidPageNumber(page);
  });

  const updatePageNumber = async (action: PageAction) => {
    const newPageNumber = changeCurrentPageNumber(currentPageNumber, action);
    if (newPageNumber === currentPageNumber) return;

    const searchValue = searchParams.get(PARAMS.search) ?? '';
    setSearchParams({
      [PARAMS.search]: searchValue,
      [PARAMS.page]: `${newPageNumber}`,
    });
  };

  useEffect(() => {
    const page = searchParams.get(PARAMS.page);
    setCurrentPageNumber(getValidPageNumber(page));
  }, [searchParams]);

  return (
    <div className="pagination">
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
