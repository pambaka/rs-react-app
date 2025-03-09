import styles from './flyout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { ReactNode } from 'react';
import { StoreRootState } from '@/store/store';
import { Character } from '@/types';
import Button from '@/components/button';
import { unselectAll } from '@/store/selected-cards-slice';
import getBlobParts from './get-blob-parts';

const Flyout = (): ReactNode => {
  const selectedCards = useSelector<StoreRootState, Character[]>(
    (state) => state.selectedCards.cards
  );
  const isFlyoutVisible = Boolean(selectedCards.length);
  const dispatch = useDispatch();

  const getUrl = (): string => {
    const csvData = getBlobParts(selectedCards);
    const blob = new Blob(['\uFEFF', ...csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    return url;
  };

  if (isFlyoutVisible)
    return (
      <div
        className={styles.flyout}
        onClick={(event) => event.stopPropagation()}
      >
        <div>
          <p>
            Selected&nbsp;cards: <span>{selectedCards.length}</span>
          </p>
          <Button
            buttonText="Unselect&nbsp;all"
            onClick={(event) => {
              event.stopPropagation();
              dispatch(unselectAll());
            }}
          />
          <a
            href={getUrl()}
            download={`${selectedCards.length}_characters.csv`}
          >
            <Button
              buttonText="Download"
              onClick={(event) => {
                event.stopPropagation();
              }}
            />
          </a>
        </div>
      </div>
    );

  return null;
};

export default Flyout;
