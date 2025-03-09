import ThemeButton from '@/components/theme-button';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const toggleTheme = vi.fn();

vi.mock('react', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useContext: () => ({
      isLightThemeSet: true,
      toggleTheme,
    }),
  };
});

describe('Theme button component', () => {
  render(<ThemeButton />);

  it('Theme buttons are rendered', () => {
    const lightButton = screen.getByRole('radio', {
      name: 'light theme button',
    });
    expect(lightButton).toBeInstanceOf(HTMLInputElement);
    if (lightButton instanceof HTMLInputElement)
      expect(lightButton.checked).toBe(true);
  });

  it('Clicking an unchecked button changes the theme', () => {
    const darkButton = screen.getByRole('radio', {
      name: 'dark theme button',
    });
    expect(darkButton).toBeInstanceOf(HTMLInputElement);
    if (darkButton instanceof HTMLInputElement)
      expect(darkButton.checked).toBe(false);

    fireEvent.click(darkButton);
    expect(toggleTheme).toHaveBeenCalled();
  });
});
