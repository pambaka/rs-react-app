import MainPage from '../components/pages/main-page/main-page';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';

describe('Main page component', () => {
  it('Render test', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(3);
  });
});
