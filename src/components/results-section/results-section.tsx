import './results-section.css';
import Cards from '../cards/cards';
import { Character } from '../../types';
import { ReactNode } from 'react';
import { MESSAGES } from '../../consts';

function ResultsSection({
  results,
  message,
}: {
  results: Character[] | undefined;
  message?: string;
}): ReactNode {
  function renderContent(res: Character[] | undefined): ReactNode {
    if (!res && message) return <div className="message">{message}</div>;

    if (!res) return;

    if (res && res.length === 0)
      return <div className="message">{MESSAGES.notFound}</div>;

    return <Cards people={results}></Cards>;
  }

  return (
    <section className="results-section">{renderContent(results)}</section>
  );
}

export default ResultsSection;
