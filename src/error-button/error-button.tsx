import { ReactNode } from 'react';
import Button from '../button/button';

class ErrorButton extends Button {
  state = { hasError: false };

  render(): ReactNode {
    if (this.state.hasError) throw new Error('This is a fallback UI test');
    else
      return (
        <Button
          buttonText="Throw&nbsp;error"
          callback={() => this.setState({ hasError: true })}
        ></Button>
      );
  }
}

export default ErrorButton;
