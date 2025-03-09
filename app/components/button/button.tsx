import './button.css';
import { type ReactNode } from 'react';

const Button = ({
  buttonText,
  onClick,
  isDisabled = false,
}: {
  buttonText: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  isDisabled?: boolean;
}): ReactNode => {
  return (
    <button className="button" onClick={onClick} disabled={isDisabled}>
      <span>{buttonText}</span>
    </button>
  );
};

export default Button;
