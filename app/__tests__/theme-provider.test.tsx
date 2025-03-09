import ThemeContext from '@/context/theme-context';
import ThemeProvider from '@/providers/theme-provider';
import { fireEvent, render, screen } from '@testing-library/react';
import { type ReactNode, useContext } from 'react';
import { describe, expect, it } from 'vitest';

const Component = (): ReactNode => {
  const { isLightThemeSet, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      className={isLightThemeSet ? 'light' : 'dark'}
      onClick={toggleTheme}
    ></button>
  );
};

describe('Theme Provider', () => {
  render(
    <ThemeProvider>
      <Component></Component>
    </ThemeProvider>
  );

  const button = screen.getByRole('button');
  it('Light theme is set by default', () => {
    expect(button).toBeDefined();
    expect(button.className).toBe('light');
  });

  it('The theme can be changed', () => {
    fireEvent.click(button);
    expect(button.className).toBe('dark');
  });
});
