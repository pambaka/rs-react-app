'use client';

import { CharResponseContext } from '@/context/char-response-context';
import { CharResponse } from '@/types';
import { ReactNode } from 'react';

const CharResponseProvider = ({
  charResponse,
  children,
}: {
  charResponse: CharResponse;
  children: ReactNode;
}): ReactNode => {
  return (
    <CharResponseContext.Provider value={charResponse}>
      {children}
    </CharResponseContext.Provider>
  );
};

export default CharResponseProvider;
