import styles from '../cards/card.module.css';
import { ReactNode, useContext } from 'react';
import { MESSAGES } from '@/consts';
import { CharResponseContext } from '@/context/char-response-context';

const CardDetails = (): ReactNode => {
  const { character: char, message } = useContext(CharResponseContext);
  if (!char && message) return <div className="message">{message}</div>;

  if (!char) return;

  if (!char.name) return <div className="message">{MESSAGES.charNotFound}</div>;

  return (
    <>
      <h2 className={styles['card__title']}>{char.name}</h2>
      <div className={styles['card__description']}>
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
