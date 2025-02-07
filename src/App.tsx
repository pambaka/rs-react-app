import './App.css';
import { Dispatch, ReactNode, useEffect, useState } from 'react';
import SearchSection from './components/search-section/search-section';
import ResultsSection from './components/results-section/results-section';
import { SEARCH_VALUE } from './consts';
import { Character } from './types';
import Loader from './components/loader/loader';
import ErrorBoundary from './error-boundary';
import FallbackUi from './components/fallback-ui/fallback-ui';
import Footer from './components/footer/footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import fetchPeople from './api/fetch-people';
import isPageButtonDisabled from './components/pagination/is-page-button-disabled';
import Pagination from './components/pagination/pagination';

function App(): ReactNode {
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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary fallback={<FallbackUi />}>
              <SearchSection fetchData={getPeople} />
              <ResultsSection results={people} />
              <Pagination
                fetchData={getPeople}
                isNextDisabled={isNextDisabled}
                isPrevDisabled={isPrevDisabled}
              />
              <Footer />
              <Loader isLoading={isLoading} />
            </ErrorBoundary>
          }
        />
        <Route
          path="*"
          element={<h1 className="message">Page is not found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
