import styles from './fallback-ui.module.css';
import { ReactNode } from 'react';

const FallbackUi = (): ReactNode => {
  return (
    <p className={styles['fallback-text']}>
      Something went wrong, please reload the page
    </p>
  );
};

export default FallbackUi;
