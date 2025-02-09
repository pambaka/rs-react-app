import './cards.css';
import { Character } from '../../types';
import { ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Cards({ people }: { people: Character[] | undefined }): ReactNode {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function addCard(char: Character): ReactNode {
    function getCharId(url: string): string {
      const id: string = url.split('people/')[1].replace('/', '');
      return id;
    }

    function showDetails(event: React.MouseEvent<HTMLElement>) {
      event.stopPropagation();
      navigate(`details/${getCharId(char.url)}/?${searchParams.toString()}`);
    }

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
      </div>
    );
  }

  return <>{people && people.map((char: Character) => addCard(char))}</>;
}

export default Cards;
