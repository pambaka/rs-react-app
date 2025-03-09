import './search-section.css';
import { type ChangeEvent, type ReactNode, useState } from 'react';
import Button from '../button';
import { useSearchParams } from 'react-router';
import { PARAMS } from '@/consts';
import isValidPageNumber from '@/utils/is-valid-page-number';

const SearchSection = (): ReactNode => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get(PARAMS.search) ?? ''
  );
  const [inputValue, setInputValue] = useState(() => {
    const search = searchParams.get(PARAMS.search);
    const page = searchParams.get(PARAMS.page);
    if (!search && !isValidPageNumber(page)) return searchValue;
    return search ?? '';
  });

  const handleClick = async () => {
    setSearchValue(inputValue);
    setSearchParams({ search: inputValue });
  };

  const handleChange = (event: ChangeEvent) => {
    if (event.target instanceof HTMLInputElement)
      setInputValue(event.target.value);
  };

  return (
    <>
      <section className="search-section">
        <input
          className="search-input"
          type="text"
          value={inputValue}
          onChange={handleChange}
          onClick={(event) => {
            event.stopPropagation();
          }}
        ></input>
        <Button
          buttonText={'Search'}
          onClick={(event) => {
            event.stopPropagation();
            handleClick();
          }}
        />
      </section>
    </>
  );
};

export default SearchSection;
