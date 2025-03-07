'use client';

import styles from './card.module.css';
import { ReactNode } from 'react';
import CardDetails from '@/components/card-details';
import { useRouter, useSearchParams } from 'next/navigation';

const Card = (): ReactNode => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const closeCard = () => {
    router.push(`/?${searchParams.toString()}`);
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
