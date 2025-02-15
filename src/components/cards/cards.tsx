import './cards.css';
import { Character } from '../../types';
import { ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HeartIcon from '../icons/heart-icon';
import { useDispatch } from 'react-redux';
import {
  addToSelected,
  removeFromSelected,
} from '../../store/selected-cards-slice';
import getCharId from '../../utils/get-character-id';

const Cards = ({ people }: { people: Character[] | undefined }): ReactNode => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addCard = (char: Character): ReactNode => {
    const charId = getCharId(char.url);

    const showDetails = (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      navigate(`details/${charId}/?${searchParams.toString()}`);
    };

    const handleCheckboxClick = (event: React.MouseEvent<HTMLInputElement>) => {
      event.stopPropagation();

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
            onClick={handleCheckboxClick}
          ></input>
          <HeartIcon />
        </label>
      </div>
    );
  };

  return <>{people && people.map((char: Character) => addCard(char))}</>;
};

export default Cards;
