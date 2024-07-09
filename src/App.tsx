import './App.css';
import { Dispatch, ReactNode, useEffect, useState } from 'react';
import SearchSection from './search-section/search-section';
import ResultsSection from './results-section/results-section';
import { SEARCH_VALUE, URL } from './consts';
import { Character } from './types';
import Loader from './loader/loader';
import ErrorBoundary from './error-boundary';
import FallbackUi from './fallback-ui/fallback-ui';
import Footer from './footer/footer';

function App(): ReactNode {
  const [people, setPeople]: [
    Character[] | undefined,
    Dispatch<Character[] | undefined>,
  ] = useState<Character[] | undefined>(undefined);
  const [isLoading, setIsLoading]: [boolean, Dispatch<boolean>] =
    useState(true);

  const getPeople = async (searchValue: string | null = '') => {
    const searchQuery = searchValue ? `/?search=${searchValue.trim()}` : '';

    try {
      setIsLoading(true);

      await fetch(`${URL.people}${searchQuery}`)
        .then((res) => {
          if (!res.ok) return undefined;
          return res.json();
        })
        .then((data: { results: Character[] } | undefined) => {
          if (data) setPeople(data.results);
        })
        .catch((error) => {
          console.error(error);
        });
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
      <ErrorBoundary fallback={<FallbackUi />}>
        <SearchSection fetchData={getPeople} />
        <ResultsSection results={people} />
        <Footer />
        <Loader isLoading={isLoading} />
      </ErrorBoundary>
    </>
  );
}

export default App;
