import './pagination.css';
import { ReactNode, useState } from 'react';
import Button from '../button/button';
import changeCurrentPageNumber from './change-current-page-number';
import { PageAction } from '../../types';
import { SEARCH_VALUE } from '../../consts';

function Pagination(props: {
  fetchData: (searchValue: string, pageNumber?: number) => Promise<void>;
  isNextDisabled: boolean;
  isPrevDisabled: boolean;
}): ReactNode {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  async function updateCurrentPage(action: PageAction) {
    const newPageNumber = changeCurrentPageNumber(currentPageNumber, action);
    if (newPageNumber === currentPageNumber) return;

    const searchValue = localStorage.getItem(SEARCH_VALUE) ?? '';
    await props
      .fetchData(searchValue, newPageNumber)
      .then(() => setCurrentPageNumber(newPageNumber));
  }

  return (
    <div className="pagination">
      <Button
        buttonText="<"
        callback={() => updateCurrentPage('decrement')}
        isDisabled={props.isPrevDisabled}
      />
      <p>{currentPageNumber}</p>
      <Button
        buttonText=">"
        callback={() => updateCurrentPage('increment')}
        isDisabled={props.isNextDisabled}
      />
    </div>
  );
}

export default Pagination;
