import ResultsSection from '@/components/results-section';
import { Character } from '@/types';
import { cleanup, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { getChar, mockEmptySwResponse, mockStore } from './mocks';
import { MESSAGES } from '@/consts';
import { Provider } from 'react-redux';
import { useContext } from 'react';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('react', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useContext: vi.fn(),
  };
});

describe('Results section component', () => {
  beforeEach(() => {
    cleanup();
  });

  it('An appropriate message is displayed if no cards are present', () => {
    const mockResponseContext = {
      swResponse: mockEmptySwResponse,
      message: null,
    };
    (useContext as Mock).mockReturnValue(mockResponseContext);

    render(<ResultsSection />);

    const message = screen.getByText(MESSAGES.notFound);
    expect(message).toBeInstanceOf(HTMLDivElement);
  });

  it('The component renders the specified number of cards', () => {
    const results: Character[] = [];
    const numberOfChar = Math.ceil(Math.random() * 10);

    for (let i = 0; i < numberOfChar; i += 1) {
      results.push(getChar(i));
    }

    const mockResponseContext = {
      swResponse: { next: null, previous: null, results },
      message: null,
    };
    (useContext as Mock).mockReturnValue(mockResponseContext);

    render(
      <Provider store={mockStore}>
        <ResultsSection />
      </Provider>
    );

    const cards = screen.getAllByText('someName');
    expect(cards.length).toBe(numberOfChar);
  });
});
