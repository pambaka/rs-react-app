import './fallback-ui.css';
import { type ReactNode } from 'react';

const FallbackUi = (): ReactNode => {
  return (
    <p className="fallback-text">
      Something went wrong, please reload the page
    </p>
  );
};

export default FallbackUi;
