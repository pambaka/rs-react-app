import Card from '@/components/cards/card';
import { describe, expect, it, Mock, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { getChar, mockChar, mockStore } from './mocks';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const id = 2;
const testId = 'testId';

describe('Card component', () => {
  const mockRouter = {
    query: {},
    push: vi.fn(() => new Promise(() => {})),
  };
  (useRouter as Mock).mockReturnValue(mockRouter);

  render(
    <Provider store={mockStore}>
      <div data-testid={testId}>
        <Card char={getChar(id)} />
      </div>
    </Provider>
  );

  it('The card component renders the relevant card data', () => {
    const title = screen.getByText(mockChar.name);
    expect(title).toBeDefined();
  });

  it('Clicking on a card opens a detailed card component', () => {
    const div = screen.getByTestId(testId);
    const card = div.firstElementChild;
    expect(card).toBeInstanceOf(HTMLDivElement);

    if (card instanceof HTMLDivElement) {
      fireEvent.click(card);
      expect(mockRouter.push).toBeCalledWith(`/details/${id}?page=1`);
    }
  });
});
