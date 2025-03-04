import Card from '@/components/card/';
import { describe, expect, it, Mock, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const search = ':)';
const page = '2';

describe('Detailed card component', () => {
  const mockRouter = {
    query: { search, page, charid: 1 },
    push: vi.fn(() => new Promise(() => {})),
  };
  (useRouter as Mock).mockReturnValue(mockRouter);

  render(
    <Provider store={store}>
      <Card />
    </Provider>
  );

  it('Renders detailed card component', () => {
    const card = screen.getByTestId('detailedCard');
    expect(card).toBeDefined();
  });

  it('Close the card on close button click', () => {
    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInstanceOf(HTMLButtonElement);
    fireEvent.click(closeButton);
    expect(mockRouter.push).toBeCalledWith(`/?search=${search}&page=${page}`);
  });
});
