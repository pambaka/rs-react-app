'use client';

import { useContext, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { LoaderContext } from './providers/loader-provider';

export function NavigationEvents() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const { changeIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    changeIsLoading(false);
  }, [params.charid, searchParams]);

  return null;
}
