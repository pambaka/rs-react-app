import './cards.css';
import { Character } from '../../types';
import { ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import HeartIcon from '../icons/heart-icon';
import { useDispatch } from 'react-redux';
import { addToSelected } from '../../store/selected-cards-slice';

const Cards = ({ people }: { people: Character[] | undefined }): ReactNode => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addCard = (char: Character): ReactNode => {
    const getCharId = (url: string): string => {
      const id: string = url.split('people/')[1].replace('/', '');
      return id;
    };

    const showDetails = (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      navigate(`details/${getCharId(char.url)}/?${searchParams.toString()}`);
    };

    const handleLabelClick = (event: React.MouseEvent<HTMLLabelElement>) => {
      event.stopPropagation();
      dispatch(addToSelected({ char }));
    };

    return (
      <div
        id={getCharId(char.url)}
        className="card"
        key={getCharId(char.url)}
        onClick={showDetails}
      >
        <h2 className="card__title">{char.name}</h2>
        <div className="card__description">
          <p>
            height: <span>{char.height}</span>
          </p>
          <p>
            eyes: <span>{char.eye_color}</span>
          </p>
        </div>
        <label onClick={handleLabelClick}>
          <input
            className="card__checkbox"
            type="checkbox"
            onClick={(event) => {
              event.stopPropagation();
            }}
          ></input>
          <HeartIcon />
        </label>
      </div>
    );
  };

  return <>{people && people.map((char: Character) => addCard(char))}</>;
};

export default Cards;
