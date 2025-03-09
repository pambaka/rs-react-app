'use client';

import styles from './search-section.module.css';
import { ChangeEvent, ReactNode, useContext, useEffect, useState } from 'react';
import Button from '../button';
import useLocalStorage from '@/hooks/use-local-storage';
import { PARAMS } from '@/consts';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import getSearchQuery from '@/utils/get-search-query';
import isValidPageNumber from '@/utils/is-valid-page-number';
import { SearchParam } from '@/types';
import { LoaderContext } from '@/providers/loader-provider';

const SearchSection = (): ReactNode => {
  const [searchValue, setSearchValue] = useLocalStorage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [inputValue, setInputValue] = useState('');
  const { changeIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    const search = searchParams.get(PARAMS.search) ?? '';
    const page = searchParams.get(PARAMS.page) ?? '';

    let queryParams: { search?: SearchParam; page?: SearchParam } = {};

    if (search || isValidPageNumber(page)) {
      setInputValue(search);
      queryParams = { search, page };
    } else if (searchValue) {
      setInputValue(searchValue);
      queryParams = { search: searchValue };
    } else if (!search && !searchValue) queryParams = { search: '' };

    router.push(pathname + getSearchQuery(queryParams));
  }, []);

  const handleClick = async () => {
    changeIsLoading(true);
    const trimValue = inputValue.trim();
    setSearchValue(trimValue);
    router.push(pathname + getSearchQuery({ search: trimValue }));
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
