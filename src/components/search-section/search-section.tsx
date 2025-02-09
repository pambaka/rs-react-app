import './search-section.css';
import { ChangeEvent, ReactNode, useState } from 'react';
import Button from '../button/button';
import useLocalStorage from '../../hooks/use-local-storage';
import { useSearchParams } from 'react-router-dom';
import { PARAMS } from '../../consts';
import isValidPageNumber from '../../utils/is-valid-page-number';

function SearchSection(props: {
  fetchData: (value: string | undefined) => Promise<void>;
}): ReactNode {
  const [searchValue, setSearchValue] = useLocalStorage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(() => {
    const search = searchParams.get(PARAMS.search);
    const page = searchParams.get(PARAMS.page);

    if (!search && !isValidPageNumber(page)) return searchValue;

    return search ?? '';
  });

  const handleClick = async () => {
    setSearchValue(inputValue);
    setSearchParams({ search: inputValue });

    await props.fetchData(inputValue);
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
          callback={(event) => {
            event.stopPropagation();
            handleClick();
          }}
        />
      </section>
    </>
  );
}

export default SearchSection;
