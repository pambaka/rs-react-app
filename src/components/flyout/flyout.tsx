import './flyout.css';
import { useDispatch, useSelector } from 'react-redux';
import { ReactNode } from 'react';
import { StoreRootState } from '../../store/store';
import { Character } from '../../types';
import Button from '../button/button';
import { unselectAll } from '../../store/selected-cards-slice';
import { Link } from 'react-router-dom';
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
      <div className="flyout">
        <div>
          <p>
            Selected&nbsp;cards: <span>{selectedCards.length}</span>
          </p>
          <Button
            buttonText="Unselect&nbsp;all"
            callback={(event) => {
              event.stopPropagation();
              dispatch(unselectAll());
            }}
          />
          <Link
            to={getUrl()}
            download={`${selectedCards.length}_characters.csv`}
          >
            <Button
              buttonText="Download"
              callback={(event) => {
                event.stopPropagation();
              }}
            />
          </Link>
        </div>
      </div>
    );
  else return null;
};
export default Flyout;
