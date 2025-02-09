import { ReactNode } from 'react';
import { Character } from '../../types';

function CardDetails({ char }: { char: Character | undefined }): ReactNode {
  if (!char) return <div></div>;

  if (!char.name) return <div className="message">Character is not found</div>;

  return (
    <>
      <h2 className="card__title">{char.name}</h2>
      <div className="card__description">
        <p>
          height: <span>{char.height}</span>
        </p>
        <p>
          mass: <span>{char.mass}</span>
        </p>
        <p>
          hair: <span>{char.hair_color}</span>
        </p>
        <p>
          skin: <span>{char.skin_color}</span>
        </p>
        <p>
          eyes: <span>{char.eye_color}</span>
        </p>
      </div>
    </>
  );
}

export default CardDetails;
