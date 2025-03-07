import { ReactNode } from 'react';

export const metadata = {
  title: 'SW Page not found',
};

const NotFoundLayout = ({ children }: { children: ReactNode }): ReactNode => {
  return <>{children}</>;
};

export default NotFoundLayout;
