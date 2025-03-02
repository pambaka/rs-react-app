import styles from './results-section.module.css';
import { Cards } from '@/components/cards';
import { Character } from '@/types';
import { ReactNode } from 'react';
import { MESSAGES } from '@/consts';

const ResultsSection = ({
  results,
  message,
}: {
  results: Character[] | undefined;
  message?: string;
}): ReactNode => {
  const renderContent = (res: Character[] | undefined): ReactNode => {
    if (!res && message) return <div className={styles.message}>{message}</div>;

    if (!res) return;

    if (res && res.length === 0)
      return <div className={styles.message}>{MESSAGES.notFound}</div>;

    return <Cards people={results}></Cards>;
  };

  return (
    <section className={styles['results-section']}>
      {renderContent(results)}
    </section>
  );
};

export default ResultsSection;
