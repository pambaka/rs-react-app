import { ReactNode } from 'react';
import { Character } from '@/types';
import { MESSAGES } from '@/consts';

const CardDetails = ({
  char,
  message,
}: {
  char: Character | undefined;
  message?: string;
}): ReactNode => {
  if (!char && message) return <div className="message">{message}</div>;

  if (!char) return;

  if (!char.name) return <div className="message">{MESSAGES.charNotFound}</div>;

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
};

export default CardDetails;
