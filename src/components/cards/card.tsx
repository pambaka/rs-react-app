import { ReactNode, useState } from 'react';
import { Character } from '../../types';
import './card.css';
import getCharId from '../../utils/get-character-id';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  addToSelected,
  removeFromSelected,
} from '../../store/selected-cards-slice';
import HeartIcon from '../icons/heart-icon';
import store from '../../store/store';

const Card = ({ char }: { char: Character }): ReactNode => {
  const charId = getCharId(char.url);
  const selectedCards = store.getState().selectedCards.cards;
  const [isCardSelected, setIsCardSelected] = useState(() => {
    return selectedCards.map((char) => getCharId(char.url)).includes(charId);
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const showDetails = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    navigate(`details/${charId}/?${searchParams.toString()}`);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCardSelected(!isCardSelected);

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
          checked={isCardSelected}
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
