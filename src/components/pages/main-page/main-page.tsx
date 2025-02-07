import { Dispatch, ReactNode, useEffect, useState } from 'react';
import { Character } from '../../../types';
import fetchPeople from '../../../api/fetch-people';
import isPageButtonDisabled from '../../pagination/is-page-button-disabled';
import { SEARCH_VALUE } from '../../../consts';
import SearchSection from '../../search-section/search-section';
import ResultsSection from '../../results-section/results-section';
import Pagination from '../../pagination/pagination';
import Footer from '../../footer/footer';
import Loader from '../../loader/loader';

function MainPage(): ReactNode {
  const [people, setPeople]: [
    Character[] | undefined,
    Dispatch<Character[] | undefined>,
  ] = useState<Character[] | undefined>(undefined);
  const [isLoading, setIsLoading]: [boolean, Dispatch<boolean>] =
    useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);

  const getPeople = async (
    searchValue: string | null = '',
    pageNumber?: number
  ) => {
    try {
      setIsLoading(true);

      const response = await fetchPeople(searchValue, pageNumber);

      setIsNextDisabled(isPageButtonDisabled(response?.next));
      setIsPrevDisabled(isPageButtonDisabled(response?.previous));

      const people = response?.results ?? undefined;
      setPeople(people);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const searchValue: string | null = localStorage.getItem(SEARCH_VALUE);
    getPeople(searchValue).catch(() => {});
  }, []);

  return (
    <>
      <SearchSection fetchData={getPeople} />
      <ResultsSection results={people} />
      <Pagination
        fetchData={getPeople}
        isNextDisabled={isNextDisabled}
        isPrevDisabled={isPrevDisabled}
      />
      <Footer />
      <Loader isLoading={isLoading} />
    </>
  );
}

export default MainPage;
