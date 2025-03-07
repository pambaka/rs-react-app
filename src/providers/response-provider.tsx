'use client';

import ResponseContext from '@/context/response-context';
import { Response } from '@/types';
import { ReactNode } from 'react';

const ResponseProvider = ({
  response,
  children,
}: {
  response: Response;
  children: ReactNode;
}): ReactNode => {
  return (
    <ResponseContext.Provider value={response}>
      {children}
    </ResponseContext.Provider>
  );
};

export default ResponseProvider;
