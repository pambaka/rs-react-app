import MainPage from '@/components/pages/main-page';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/store/store';

vi.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '',
    query: {},
    push: vi.fn(),
    events: { on: vi.fn(), off: vi.fn() },
  }),
}));

describe('Main page component', () => {
  it('Render test', () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(3);
  });
});
