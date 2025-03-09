import styles from './loader.module.css';
import { ReactNode } from 'react';

const Loader = (): ReactNode => {
  return (
    <div className={styles['loader-backdrop']}>
      <div className={styles.loader} data-testid="loader"></div>
    </div>
  );
};

export default Loader;
