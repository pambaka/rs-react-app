import './main-page.css';
import { ReactNode, useEffect, useState } from 'react';
import { MESSAGES, PARAMS, SEARCH_VALUE } from '@/consts';
import SearchSection from '@/components/search-section';
import ResultsSection from '@/components/results-section';
import Pagination, { isPageButtonDisabled } from '@/components/pagination';
import Loader from '@/components/loader';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import isValidPageNumber from '@/utils/is-valid-page-number';
import api from '@/api/api';
import Flyout from '@/components/flyout';
import ThemeButton from '@/components/theme-button';

const MainPage = (): ReactNode => {
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [isPageReloaded, setIsPageReloaded] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOutletOpen, setIsOutletOpen] = useState(
    location.pathname.includes('details')
  );
  const [message, setMessage] = useState('');
  const {
    data: response,
    error,
    isFetching,
  } = api.useGetSearchedQuery({
    searchValue: searchParams.get(PARAMS.search),
    pageNumber: searchParams.get(PARAMS.page),
  });

  useEffect(() => {
    setIsNextDisabled(isPageButtonDisabled(response?.next));
    setIsPrevDisabled(isPageButtonDisabled(response?.previous));

    if (error && 'status' in error && error.status === 404)
      setMessage(MESSAGES.notFound);
    else if (error) setMessage(MESSAGES.somethingWrong);
  }, [response, error]);

  useEffect(() => {
    if (isPageReloaded) return;
    setIsPageReloaded(true);

    let searchValue: string | undefined;
    const search = searchParams.get(PARAMS.search) ?? '';
    const page = searchParams.get(PARAMS.page);

    if (!isValidPageNumber(page)) {
      searchParams.delete(PARAMS.page);
      setSearchParams(searchParams);
    }

    if (!search && !page) {
      searchValue = localStorage.getItem(SEARCH_VALUE) ?? '';
      if (searchValue) setSearchParams({ [PARAMS.search]: searchValue });
    }
  }, [isPageReloaded, searchParams, setSearchParams]);

  useEffect(() => {
    if (location.pathname.includes('details')) setIsOutletOpen(true);
    else setIsOutletOpen(false);
  }, [location.pathname]);

  const closeOutlet = (): void => {
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <section
      className={isOutletOpen ? `main-section interactive` : 'main-section'}
      onClick={isOutletOpen ? closeOutlet : undefined}
    >
      <ThemeButton />
      <SearchSection />
      <ResultsSection results={response?.results} message={message} />
      <Pagination
        isNextDisabled={isNextDisabled}
        isPrevDisabled={isPrevDisabled}
      />
      <Flyout />
      {isFetching && <Loader />}
    </section>
  );
};

export default MainPage;
