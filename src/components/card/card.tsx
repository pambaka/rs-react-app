import './card.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Character } from '@/types';
import Loader from '@/components/loader';
import CardDetails from '@/components/card-details';
import api from '@/api/api';
import { MESSAGES } from '@/consts';

const Card = (): ReactNode => {
  const { charId } = useParams();
  const [charData, setCharData]: [
    Character | undefined,
    Dispatch<SetStateAction<Character | undefined>>,
  ] = useState();
  const [message, setMessage] = useState('');
  const { data, error, isFetching } = api.useGetCharacterQuery(charId);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (data) setCharData(data);

    if (error && 'status' in error && error.status === 404)
      setMessage(MESSAGES.charNotFound);
    else if (error) setMessage(MESSAGES.somethingWrong);
  }, [data, error]);

  const closeCard = () => {
    navigate(`/?${searchParams.toString()}`);
  };

  return (
    <>
      <div className="card-detailed" data-testid="detailedCard">
        <CardDetails char={charData} message={message} />
        <button
          className="close-button"
          aria-label="Close card button"
          title="close"
          onClick={closeCard}
        ></button>
        {isFetching && <Loader />}
      </div>
    </>
  );
};

export default Card;
