'use client';

import styles from './card.module.css';
import { ReactNode, useContext } from 'react';
import CardDetails from '@/components/card-details';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoaderContext } from '@/providers/loader-provider';

const Card = (): ReactNode => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { changeIsLoading } = useContext(LoaderContext);

  const closeCard = () => {
    changeIsLoading(true);
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
