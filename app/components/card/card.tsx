import './card.css';
import { useNavigate, useSearchParams } from 'react-router';
import { useContext, type ReactNode } from 'react';
import { type Character } from '@/types';
import CardDetails from '@/components/card-details';
import { LoaderContext } from '@/providers/loader-provider';

const Card = ({
  char,
  message,
}: {
  char: Character | undefined;
  message: string | undefined;
}): ReactNode => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { changeIsLoading } = useContext(LoaderContext);

  const closeCard = () => {
    changeIsLoading(true);
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <>
      <div className="card-detailed" data-testid="detailedCard">
        <CardDetails char={char} message={message} />
        <button
          className="close-button"
          aria-label="Close card button"
          title="close"
          onClick={closeCard}
        ></button>
      </div>
    </>
  );
};

export default Card;
