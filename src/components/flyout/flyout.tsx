import './flyout.css';
import { useDispatch, useSelector } from 'react-redux';
import { ReactNode } from 'react';
import { StoreRootState } from '../../store/store';
import { Character } from '../../types';
import Button from '../button/button';
import { unselectAll } from '../../store/selected-cards-slice';

const Flyout = (): ReactNode => {
  const selectedCards = useSelector<StoreRootState, Character[]>(
    (state) => state.selectedCards.cards
  );
  const isFlyoutVisible = Boolean(selectedCards.length);
  const dispatch = useDispatch();

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
          ></Button>
        </div>
      </div>
    );
  else return null;
};
export default Flyout;
