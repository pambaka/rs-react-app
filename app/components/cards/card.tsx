import './card.css';
import { type ReactNode, useContext, useEffect, useState } from 'react';
import { type Character } from '@/types';
import getCharId from '@/utils/get-character-id';
import HeartIcon from '../icons/heart-icon';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToSelected,
  removeFromSelected,
} from '@/store/selected-cards-slice';
import { type StoreRootState } from '@/store/store';
import isCardSelected from './is-card-selected';
import { LoaderContext } from '@/providers/loader-provider';

const Card = ({ char }: { char: Character }): ReactNode => {
  const charId = getCharId(char.url);
  const selectedCards = useSelector<StoreRootState, Character[]>(
    (state) => state.selectedCards.cards
  );
  const [isSelected, setIsSelected] = useState(() =>
    isCardSelected(selectedCards, charId)
  );
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const dispatch = useDispatch();
  const { changeIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    setIsSelected(isCardSelected(selectedCards, charId));
  }, [selectedCards, charId]);

  const showDetails = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (charId !== params.charid) changeIsLoading(true);
    navigate(`details/${charId}/?${searchParams.toString()}`);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(!isSelected);

    if (event.currentTarget.checked) dispatch(addToSelected({ char }));
    else dispatch(removeFromSelected({ id: charId }));
  };

  return (
    <div id={charId} className="card" key={charId} onClick={showDetails}>
      <h2 className="card__title">{char.name}</h2>
      <div className="card__description">
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
          className="card__checkbox"
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
