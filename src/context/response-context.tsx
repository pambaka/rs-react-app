import { Response } from '@/types';
import { createContext } from 'react';

export const ResponseContext = createContext<Response>({
  swResponse: null,
  message: null,
});
