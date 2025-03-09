import styles from './search-section.module.css';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import Button from '../button';
import useLocalStorage from '@/hooks/use-local-storage';
import { PARAMS } from '@/consts';
import { useRouter } from 'next/router';
import getSearchQuery from '@/utils/get-search-query';
import assertString from '@/utils/assert-string';
import isValidPageNumber from '@/utils/is-valid-page-number';
import getPath from '@/utils/get-path';

const SearchSection = (): ReactNode => {
  const [searchValue, setSearchValue] = useLocalStorage();
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const search = assertString(router.query.search);
    const page = assertString(router.query[PARAMS.page]);

    const path = getPath(router.query.charid);
    let searchParams: { search?: string; page?: string } = {};

    if (search || isValidPageNumber(page)) {
      setInputValue(search);
      searchParams = { search, page };
    } else if (searchValue) {
      setInputValue(searchValue);
      searchParams = { search: searchValue };
    } else if (!search && !searchValue) searchParams = { search: '' };

    router.push(path + getSearchQuery(searchParams));
  }, []);

  const handleClick = async () => {
    const trimValue = inputValue.trim();
    setSearchValue(trimValue);
    router.push(
      getPath(router.query.charid) + getSearchQuery({ search: trimValue })
    );
  };

  const handleChange = (event: ChangeEvent) => {
    if (event.target instanceof HTMLInputElement)
      setInputValue(event.target.value);
  };

  return (
    <>
      <section className={styles['search-section']}>
        <input
          className={styles['search-input']}
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
