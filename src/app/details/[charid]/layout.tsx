import { ReactNode } from 'react';

export const metadata = {
  title: 'SW React app | Details',
};

const DetailsLayout = ({ children }: { children: ReactNode }): ReactNode => {
  return <>{children}</>;
};

export default DetailsLayout;
