import MainPage from '../components/pages/main-page/main-page';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Main page component', () => {
  it('Render test', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(4);
  });
});
