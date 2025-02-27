import './theme-button.css';
import ThemeContext from '@/context/theme-context';
import { ReactNode, useContext } from 'react';
import { MoonIcon, SunIcon } from '../icons';

const ThemeButton = (): ReactNode => {
  const { isLightThemeSet, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className="theme-button"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <label title="light theme" aria-label="light theme button">
        <input
          type="radio"
          name="theme"
          value="light"
          checked={isLightThemeSet}
          onChange={toggleTheme}
        />
        <SunIcon />
      </label>
      <label title="dark theme" aria-label="dark theme button">
        <input type="radio" name="theme" value="dark" onChange={toggleTheme} />
        <MoonIcon />
      </label>
    </div>
  );
};

export default ThemeButton;
