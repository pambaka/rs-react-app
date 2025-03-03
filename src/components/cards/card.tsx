import styles from './card.module.css';
import { ReactNode, useEffect, useState } from 'react';
import { Character } from '@/types';
import getCharId from '@/utils/get-character-id';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToSelected,
  removeFromSelected,
} from '@/store/selected-cards-slice';
import { HeartIcon } from '@/components/icons';
import { StoreRootState } from '@/store/store';
import isCardSelected from './is-card-selected';
import { useRouter } from 'next/router';
import getSearchQuery from '@/utils/get-search-query';

const Card = ({ char }: { char: Character }): ReactNode => {
  const charId = getCharId(char.url);
  const selectedCards = useSelector<StoreRootState, Character[]>(
    (state) => state.selectedCards.cards
  );
  const [isSelected, setIsSelected] = useState(() =>
    isCardSelected(selectedCards, charId)
  );
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsSelected(isCardSelected(selectedCards, charId));
  }, [selectedCards, charId]);

  const showDetails = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    router.push(`/details/${charId}/${getSearchQuery({ ...router.query })}`);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(!isSelected);

    if (event.currentTarget.checked) dispatch(addToSelected({ char }));
    else dispatch(removeFromSelected({ id: charId }));
  };

  return (
    <div id={charId} className={styles.card} key={charId} onClick={showDetails}>
      <h2 className={styles['card__title']}>{char.name}</h2>
      <div className={styles['card__description']}>
        <p>
          height: <span>{char.height}</span>
        </p>
        <p>
          eyes: <span>{char.eye_color}</span>
        </p>
      </div>
      <label
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <input
          className={styles['card__checkbox']}
          type="checkbox"
          checked={isSelected}
          onClick={(event) => {
            event.stopPropagation();
          }}
          onChange={handleCheckboxChange}
        ></input>
        <HeartIcon />
      </label>
    </div>
  );
};

export default Card;
