'use client';

import ThemeContext from '@/context/theme-context';
import { ReactNode, useState } from 'react';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isLightThemeSet, setIsLightThemeSet] = useState(true);

  const toggleTheme = () => {
    setIsLightThemeSet((isLightThemeSet) => !isLightThemeSet);
  };

  return (
    <ThemeContext.Provider value={{ isLightThemeSet, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
