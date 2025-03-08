'use client';

import { ReactNode, createContext, useState } from 'react';

export const LoaderContext = createContext({
  isLoading: false,
  changeIsLoading: (_isLoading: boolean): void => {},
});

const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const changeIsLoading = (isDataLoading: boolean) => {
    setIsLoading(isDataLoading);
  };
  return (
    <LoaderContext.Provider value={{ isLoading, changeIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
