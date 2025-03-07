'use client';

import { createContext } from 'react';

const ThemeContext = createContext({
  isLightThemeSet: true,
  toggleTheme: () => {},
});

export default ThemeContext;
