import './flyout.css';
import { useSelector } from 'react-redux';
import { ReactNode } from 'react';
import { StoreRootState } from '../../store/store';
import { Character } from '../../types';

const Flyout = (): ReactNode => {
  const selectedCards = useSelector<StoreRootState, Character[]>(
    (state) => state.selectedCards.cards
  );
  const isFlyoutVisible = Boolean(selectedCards.length);

  if (isFlyoutVisible)
    return (
      <div className="flyout">
        <p>
          Selected cards: <span>{selectedCards.length}</span>
        </p>
      </div>
    );
  else return null;
};
export default Flyout;
