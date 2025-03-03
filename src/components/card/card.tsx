import styles from './card.module.css';
import { ReactNode } from 'react';
import CardDetails from '@/components/card-details';
import { useRouter } from 'next/router';
import getSearchQuery from '@/utils/get-search-query';

const Card = (): ReactNode => {
  const router = useRouter();

  const closeCard = () => {
    router.push(`/${getSearchQuery({ ...router.query })}`);
  };

  return (
    <>
      <div className={styles['card-detailed']} data-testid="detailedCard">
        <CardDetails />
        <button
          className={styles['close-button']}
          aria-label="Close card button"
          title="close"
          onClick={closeCard}
        ></button>
      </div>
    </>
  );
};

export default Card;
