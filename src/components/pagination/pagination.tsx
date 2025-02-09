import './pagination.css';
import { ReactNode, useEffect, useState } from 'react';
import Button from '../button/button';
import changeCurrentPageNumber from './change-current-page-number';
import { PageAction } from '../../types';
import { PARAMS } from '../../consts';
import { useSearchParams } from 'react-router-dom';
import getValidPageNumber from '../../utils/get-valid-page-number';

function Pagination(props: {
  fetchData: (searchValue: string, pageNumber?: number) => Promise<void>;
  isNextDisabled: boolean;
  isPrevDisabled: boolean;
}): ReactNode {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [currentPageNumber, setCurrentPageNumber] = useState(() => {
    const page = searchParams.get(PARAMS.page);
    return getValidPageNumber(page);
  });
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  async function updateCurrentPage(action: PageAction) {
    const newPageNumber = changeCurrentPageNumber(currentPageNumber, action);
    if (newPageNumber === currentPageNumber) return;

    setIsButtonPressed(true);

    const searchValue = searchParams.get(PARAMS.search) ?? '';
    setSearchParams({
      [PARAMS.search]: searchValue,
      [PARAMS.page]: `${newPageNumber}`,
    });

    await props.fetchData(searchValue, newPageNumber).then(() => {
      setCurrentPageNumber(newPageNumber);
    });
  }

  useEffect(() => {
    if (isButtonPressed) {
      setIsButtonPressed(false);
      return;
    }

    const page = searchParams.get(PARAMS.page);
    setCurrentPageNumber(getValidPageNumber(page));
  }, [searchParams]);

  return (
    <div className="pagination">
      <Button
        buttonText="<"
        callback={(event) => {
          event.stopPropagation();
          updateCurrentPage('decrement');
        }}
        isDisabled={props.isPrevDisabled}
      />
      <p>{currentPageNumber}</p>
      <Button
        buttonText=">"
        callback={(event) => {
          event.stopPropagation();
          updateCurrentPage('increment');
        }}
        isDisabled={props.isNextDisabled}
      />
    </div>
  );
}

export default Pagination;
