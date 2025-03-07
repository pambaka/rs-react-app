'use client';

import { Response } from '@/types';
import { createContext } from 'react';

const ResponseContext = createContext<Response>({
  swResponse: null,
  message: null,
});

export default ResponseContext;
