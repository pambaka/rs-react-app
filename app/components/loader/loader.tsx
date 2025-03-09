import './loader.css';
import { type ReactNode } from 'react';

const Loader = (): ReactNode => {
  return (
    <div className="loader-backdrop">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
