import './button.css';
import { ReactNode } from 'react';

function Button({
  buttonText,
  callback,
  isDisabled = false,
}: {
  buttonText: string;
  callback: (event: React.MouseEvent<HTMLElement>) => void;
  isDisabled?: boolean;
}): ReactNode {
  return (
    <button className="button" onClick={callback} disabled={isDisabled}>
      <span>{buttonText}</span>
    </button>
  );
}

export default Button;
