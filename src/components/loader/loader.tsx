'use client';

import { LoaderContext } from '@/providers/loader-provider';
import styles from './loader.module.css';
import { ReactNode, useContext } from 'react';

const Loader = (): ReactNode => {
  const { isLoading } = useContext(LoaderContext);

  if (!isLoading) return null;

  return (
    <div className={styles['loader-backdrop']}>
      <div className={styles.loader} data-testid="loader"></div>
    </div>
  );
};

export default Loader;
