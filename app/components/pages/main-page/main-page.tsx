import './main-page.css';
import { useEffect, useState } from 'react';
import SearchSection from '@/components/search-section';
import ResultsSection from '@/components/results-section';
import Pagination, { isPageButtonDisabled } from '@/components/pagination';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import Flyout from '@/components/flyout';
import ThemeButton from '@/components/theme-button';
import type { SwResponse } from '@/types';

const MainPage = ({
  response,
  message,
}: {
  response: SwResponse | undefined;
  message: string | undefined;
}) => {
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOutletOpen, setIsOutletOpen] = useState(
    location.pathname.includes('details')
  );

  useEffect(() => {
    setIsNextDisabled(isPageButtonDisabled(response?.next));
    setIsPrevDisabled(isPageButtonDisabled(response?.previous));
  }, [response]);

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
    </section>
  );
};

export default MainPage;
