import '../styles/index.css';
import '../styles/App.css';
import { ReactNode, useState } from 'react';
import { AppProps } from 'next/app';
import ThemeContext from '@/context/theme-context';
import ErrorBoundary from '@/error-boundary';
import FallbackUi from '@/components/fallback-ui';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps): ReactNode => {
  const [isLightThemeSet, setIsLightThemeSet] = useState(true);

  const toggleTheme = () => {
    setIsLightThemeSet(!isLightThemeSet);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ThemeContext.Provider value={{ isLightThemeSet, toggleTheme }}>
        <ErrorBoundary fallback={<FallbackUi />}>
          <div className={`${isLightThemeSet ? 'app' : 'app dark-theme'}`}>
            <Component {...pageProps} />
          </div>
        </ErrorBoundary>
      </ThemeContext.Provider>
    </>
  );
};

export default MyApp;
