import styles from './results-section.module.css';
import { Cards } from '@/components/cards';
import { Character } from '@/types';
import { ReactNode, useContext } from 'react';
import { MESSAGES } from '@/consts';
import ResponseContext from '@/context/response-context';

const ResultsSection = (): ReactNode => {
  const { swResponse, message } = useContext(ResponseContext);

  const renderContent = (res: Character[] | undefined): ReactNode => {
    if (!res && message) return <div className={styles.message}>{message}</div>;

    if (!res) return;

    if (res && res.length === 0)
      return <div className="message">{MESSAGES.notFound}</div>;

    return <Cards people={res}></Cards>;
  };

  return (
    <section className={styles['results-section']}>
      {renderContent(swResponse?.results)}
    </section>
  );
};

export default ResultsSection;
