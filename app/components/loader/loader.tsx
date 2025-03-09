import { LoaderContext } from '@/providers/loader-provider';
import './loader.css';
import { useContext, type ReactNode } from 'react';

const Loader = (): ReactNode => {
  const { isLoading } = useContext(LoaderContext);

  if (!isLoading) return null;

  return (
    <div className="loader-backdrop" data-testid="loader">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
