'use client';

import { useContext, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { LoaderContext } from '../providers/loader-provider';

export function NavigationEvents() {
  const params = useParams();
  const searchParams = useSearchParams();

  const { changeIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    changeIsLoading(false);
  }, [params, searchParams]);

  return null;
}
