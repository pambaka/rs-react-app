import './footer.css';

import { Component, ReactNode } from 'react';
import ErrorButton from '../error-button/error-button';

class Footer extends Component {
  render(): ReactNode {
    return (
      <div className="footer">
        <ErrorButton></ErrorButton>
      </div>
    );
  }
}

export default Footer;
