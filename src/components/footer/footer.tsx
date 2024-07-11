import './footer.css';

import { ReactNode } from 'react';
import ErrorButton from '../error-button/error-button';

function Footer(): ReactNode {
  return (
    <div className="footer">
      <ErrorButton />
    </div>
  );
}

export default Footer;
