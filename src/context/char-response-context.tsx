import { CharResponse } from '@/types';
import { createContext } from 'react';

export const CharResponseContext = createContext<CharResponse>({
  character: null,
  message: null,
});
