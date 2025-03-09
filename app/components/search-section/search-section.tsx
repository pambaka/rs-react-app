import './search-section.css';
import { type ChangeEvent, type ReactNode, useContext, useState } from 'react';
import Button from '../button';
import { useSearchParams } from 'react-router';
import { PARAMS } from '@/consts';
import { LoaderContext } from '@/providers/loader-provider';

const SearchSection = (): ReactNode => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(() => {
    return searchParams.get(PARAMS.search) ?? '';
  });
  const { changeIsLoading } = useContext(LoaderContext);

  const handleClick = async () => {
    const trimValue = inputValue.trim();
    if (trimValue !== searchParams.get(PARAMS.search)) changeIsLoading(true);
    setSearchParams({ search: trimValue });
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
